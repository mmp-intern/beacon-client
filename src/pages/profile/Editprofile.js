import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../apiClient';
import { Label, Input, FormRow, FormWrapper, InfoText } from '../../components/register/AdminStyles';
import { ButtonContainer, Button } from '../../styles/common/ButtonStyles';
import Select from 'react-select';
import { useAuth } from '../../AuthContext'; // useAuth 추가

const EditProfile = () => {
    const { userId } = useParams();
    const { user: authUser } = useAuth(); // 현재 로그인한 사용자 정보 가져오기
    const [user, setUser] = useState({
        userId: '',
        name: '',
        phone: '',
        email: '',
        position: '',
        macAddr: [],
        password: '',  // 비밀번호 필드 추가
    });

    const [beacons, setBeacons] = useState([]); // 비콘 목록을 저장할 상태 추가
    const navigate = useNavigate();

    // 전화번호 포맷팅 함수
    const formatPhoneNumber = (phoneNumber) => {
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        if (phoneNumber.length <= 3) return phoneNumber;
        if (phoneNumber.length <= 7) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
    };

    // 사용자 데이터를 가져오는 함수
    const fetchUserData = useCallback(async () => {
        try {
            const response = await apiClient.get(`/profile/${userId}`);
            const userData = response.data;
            setUser({
                ...userData,
                macAddr: userData.macAddr ? userData.macAddr.map(mac => ({ value: mac, label: mac })) : [],
                password: '', // 비밀번호는 초기화 상태로 설정
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('사용자 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }, [userId]);

    // 비콘 데이터를 가져오는 함수
    const fetchBeacons = useCallback(async () => {
        try {
            const response = await apiClient.get('/beacons'); // 비콘 목록 가져오기
            setBeacons(response.data.content || []);
        } catch (error) {
            console.error('Error fetching beacons:', error);
            alert('비콘 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }, []);

    // 입력 값 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // 휴대폰 번호일 경우 포맷 적용
        const formattedValue = name === 'phone' ? formatPhoneNumber(value) : value;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: formattedValue,
        }));
    };

    const handleMacAddrChange = (selectedOptions) => {
        setUser((prevUser) => ({
            ...prevUser,
            macAddr: selectedOptions || [],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form is being submitted');

        const updatedUser = {
            ...user,
            macAddr: user.macAddr.map(option => option.value),
        };

        console.log('Submitting form with data:', updatedUser);

        try {
            const response = await apiClient.put(`/profile/${userId}`, updatedUser);
            console.log('API response:', response);

            if (response.status === 200) {
                alert('프로필이 성공적으로 수정되었습니다.');
                navigate(`/profile/${userId}`);
            } else {
                alert('프로필 정확히 입력해주세요.');
                console.log('Response status:', response.status);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('프로필 수정 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchBeacons(); // 비콘 데이터를 가져옵니다.
    }, [fetchUserData, fetchBeacons]);

    const leftContent = (
        <div>
            <SubTitle>관리자 메뉴</SubTitle>
            <Divider />
            <StyledNavLink to="/userlist" activeClassName="active">
                직원 정보 관리
            </StyledNavLink>
            {authUser && authUser.role === 'SUPER_ADMIN' && (
                <>
                    <StyledNavLink to="/adminlist" activeClassName="active">
                        관리자 정보 관리
                    </StyledNavLink>
                </>
            )}
            <StyledNavLink to="/users" activeClassName="active">
                직원 계정 생성
            </StyledNavLink>
            {authUser && authUser.role === 'SUPER_ADMIN' && (
                <>
                    <StyledNavLink to="/admin" activeClassName="active">
                        관리자 계정 생성
                    </StyledNavLink>
                </>
            )}
        </div>
    );

    const mainContent = (
        <div>
            <Title>프로필 수정</Title>
            <FormWrapper onSubmit={handleSubmit}>
                <FormRow>
                    <Label htmlFor="userId">아이디</Label>
                    <Input
                        type="text"
                        id="userId"
                        name="userId"
                        value={user.userId}
                        disabled
                    />
                </FormRow>
                <FormRow>
                    <Label htmlFor="password">비밀번호 변경 (선택사항)</Label>
                    <div style={{ position: 'relative' }}>
                        <Input
                            type="password"  // 비밀번호 필드를 항상 숨김 상태로 유지
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            placeholder="변경할 비밀번호를 입력하세요"
                        />
                        <InfoText>변경하지 않으려면 입력란를 비워두세요.</InfoText>
                    </div>
                </FormRow>
                <FormRow>
                    <Label htmlFor="name">이름</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                    />
                </FormRow>
                <FormRow>
                    <Label htmlFor="phone">휴대폰 번호</Label>
                    <Input
                        type="text"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                    />
                </FormRow>
                <FormRow>
                    <Label htmlFor="email">이메일</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                </FormRow>
                <FormRow>
                    <Label htmlFor="position">직책</Label>
                    <Input
                        type="text"
                        id="position"
                        name="position"
                        value={user.position}
                        onChange={handleInputChange}
                    />
                </FormRow>
                <FormRow>
                    <Label htmlFor="macAddr">비콘 (다수 선택 가능)</Label>
                    <Select
                        isMulti
                        id="macAddr"
                        name="macAddr"
                        options={beacons.map(beacon => ({
                            value: beacon.macAddr,
                            label: beacon.macAddr,
                        }))}
                        value={user.macAddr}
                        onChange={handleMacAddrChange}
                    />
                </FormRow>
                <ButtonContainer>
                    <Button onClick={handleSubmit}>수정</Button>
                </ButtonContainer>
            </FormWrapper>
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default EditProfile;
