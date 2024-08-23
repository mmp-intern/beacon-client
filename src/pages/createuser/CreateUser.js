import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import apiClient from '../../apiClient';
import { Label, Input, Select, FormRow, FormWrapper, InfoText } from '../../components/register/AdminStyles'; // Option을 제외
import { ButtonContainer, Button } from '../../styles/common/ButtonStyles';
import { useAuth } from '../../AuthContext';

const CreateUser = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState({
        userId: '',
        name: '',
        email: '',
        phone: '',
        position: '',
        password: '',
        beaconId: '',  // 비콘 ID를 저장할 상태
    });

    const [beacons, setBeacons] = useState([]);

    // 비콘 목록을 서버에서 불러오는 함수
    useEffect(() => {
        const fetchBeacons = async () => {
            try {
                const response = await apiClient.get('/beacons');
                setBeacons(response.data.content || []);  // API 응답 데이터를 배열로 저장
            } catch (error) {
                console.error('Error fetching beacons:', error);
                setBeacons([]);  // 오류 발생 시 빈 배열로 설정
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

            alert('사용자 계정 생성 완료');
            setUserData({
                userId: '',
                name: '',
                email: '',
                phone: '',
                position: '',
                password: '',
                beaconId: '',  // 비콘 ID 초기화
            });
        } catch (error) {
            console.error('Error creating user account:', error);
            if (error.response && error.response.status === 400 && typeof error.response.data === 'string' && error.response.data.includes('중복')) {
                alert('중복된 아이디입니다. 다른 아이디를 사용하세요.');
            } else {
                alert('사용자 계정 생성에 실패했습니다.');
            }
        }
    };

    const leftContent = (
        <div>
            <SubTitle>관리자 메뉴</SubTitle>
            <Divider />
            <StyledNavLink to="/userlist" activeClassName="active">
                회원 목록 조회
            </StyledNavLink>
            <StyledNavLink to="/users" activeClassName="active">
                사용자 계정 생성
            </StyledNavLink>
            {user && user.role === 'SUPER_ADMIN' && (
                <StyledNavLink to="/admin" activeClassName="active">
                    관리자 계정 생성
                </StyledNavLink>
            )}
        </div>
    );

    const mainContent = (
        <>
            <Title>사용자 계정 생성</Title>
            <FormWrapper>
                <form onSubmit={handleSubmit}>
                    <FormRow>
                        <Label>사용자 ID</Label>
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
                        <Label>비밀번호</Label>
                        <Input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            placeholder="비밀번호 입력 (예: P@ssw0rd)"
                            required
                        />
                        <InfoText>5자 이상 ~ 16자 이내 입력. 영문 대문자, 소문자, 숫자 중 2종류 혼합</InfoText>
                    </FormRow>
                    <FormRow>
                        <Label>이름</Label>
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
                        <Label>이메일</Label>
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
                        <Label>전화번호</Label>
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
                        <Label>직책</Label>
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
                        <Label>비콘 선택</Label>
                        <Select name="macAddr" value={userData.beaconId} onChange={handleChange} required>
                            <option value="">비콘을 선택하세요</option>
                            {beacons.map((beacon) => (
                                <option key={beacon.id} value={beacon.id}>
                                    {beacon.macAddr}
                                </option>
                            ))}
                        </Select>
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
