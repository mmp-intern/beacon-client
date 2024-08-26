import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import apiClient from '../../apiClient';
import { Label, Input, FormRow, FormWrapper, InfoText } from '../../components/register/AdminStyles';
import { ButtonContainer, Button } from '../../styles/common/ButtonStyles';
import { useAuth } from '../../AuthContext';
import Select from 'react-select';

const CreateUser = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState({
        userId: '',
        name: '',
        email: '',
        phone: '',
        position: '',
        password: '',
        beaconIds: [],
    });

    const [beacons, setBeacons] = useState([]);

    useEffect(() => {
        const fetchBeacons = async () => {
            try {
                const response = await apiClient.get('/beacons');
                const availableBeacons = response.data.content.filter(beacon => !beacon.userId);
                setBeacons(availableBeacons || []);
            } catch (error) {
                console.error('Error fetching beacons:', error);
                setBeacons([]);
            }
        };

        fetchBeacons();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const formattedPhone = formatPhoneNumber(value);
            setUserData({
                ...userData,
                [name]: formattedPhone,
            });
        } else {
            setUserData({
                ...userData,
                [name]: value,
            });
        }
    };

    const handleBeaconChange = (selectedOptions) => {
        setUserData({
            ...userData,
            beaconIds: selectedOptions ? selectedOptions.map(option => option.value) : [],
        });
    };

    const formatPhoneNumber = (phoneNumber) => {
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        if (phoneNumber.length <= 3) return phoneNumber;
        if (phoneNumber.length <= 7) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post(`/users`, userData);

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert('직원 계정 생성 완료');
            setUserData({
                userId: '',
                name: '',
                email: '',
                phone: '',
                position: '',
                password: '',
                beaconIds: [],
            });
        } catch (error) {
            console.error('Error creating user account:', error);
            if (error.response && error.response.status === 400 && typeof error.response.data === 'string' && error.response.data.includes('중복')) {
                alert('중복된 아이디입니다. 다른 아이디를 사용하세요.');
            } else {
                alert('직원 계정 생성에 실패했습니다.');
            }
        }
    };

    const leftContent = (
        <div>
            <SubTitle>관리자 메뉴</SubTitle>
            <Divider />
            <StyledNavLink to="/userlist" activeClassName="active">
                직원 정보 관리
            </StyledNavLink>
            {user && user.role === 'SUPER_ADMIN' && (
                <>
                    <StyledNavLink to="/adminlist" activeClassName="active">
                        관리자 정보 관리
                    </StyledNavLink>
                </>
            )}
            <StyledNavLink to="/users" activeClassName="active">
                직원 계정 생성
            </StyledNavLink>
            {user && user.role === 'SUPER_ADMIN' && (
                <>
                    <StyledNavLink to="/admin" activeClassName="active">
                        관리자 계정 생성
                    </StyledNavLink>
                </>
            )}
        </div>
    );

    const mainContent = (
        <>
            <Title>직원 계정 생성</Title>
            <FormWrapper>
                <form onSubmit={handleSubmit}>
                    <FormRow>
                        <Label>사용자 ID <span style={{ color: 'red' }}>*</span></Label>
                        <Input
                            type="text"
                            name="userId"
                            value={userData.userId}
                            onChange={handleChange}
                            placeholder="아이디 입력 (예: user123)"
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <Label>비밀번호 <span style={{ color: 'red' }}>*</span></Label>
                        <div style={{ position: 'relative' }}>
                            <Input
                                type="password"  
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                placeholder="비밀번호 입력 (예: P@ssw0rd)"
                                required
                            />
                        </div>
                        <InfoText>16자 이내 입력. 영문 대문자, 소문자, 숫자 중 2종류 혼합</InfoText>
                    </FormRow>
                    <FormRow>
                        <Label>이름 <span style={{ color: 'red' }}>*</span></Label>
                        <Input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            placeholder="예): 홍길동"
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <Label>이메일 <span style={{ color: 'red' }}>*</span></Label>
                        <Input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            placeholder="예): example@email.com"
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <Label>전화번호 <span style={{ color: 'red' }}>*</span></Label>
                        <Input
                            type="text"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            placeholder="-없이 입력"
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <Label>직책 <span style={{ color: 'red' }}>*</span></Label>
                        <Input
                            type="text"
                            name="position"
                            value={userData.position}
                            onChange={handleChange}
                            placeholder="예): 팀장"
                            required
                        />
                    </FormRow>
                    <FormRow>
                        <Label>비콘 (다수 선택 가능)</Label>
                        <Select
                            isMulti
                            name="beacons"
                            options={beacons.map(beacon => ({
                                value: beacon.id,
                                label: beacon.macAddr,
                            }))}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleBeaconChange}
                            value={userData.beaconIds.map(id => ({
                                value: id,
                                label: beacons.find(beacon => beacon.id === id)?.macAddr || id,
                            }))}
                        />
                    </FormRow>
                    <ButtonContainer>
                        <Button type="submit">계정 생성</Button>
                    </ButtonContainer>
                </form>
            </FormWrapper>
        </>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default CreateUser;
