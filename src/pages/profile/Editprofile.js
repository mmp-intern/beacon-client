import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider, StyledNavLink, TopContainer, BackButton } from '../../styles/common/Typography';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../apiClient';
import { Label, Input, FormRow, FormWrapper, InfoText } from '../../components/register/AdminStyles';
import { ButtonContainer, Button } from '../../styles/common/ButtonStyles';
import Select from 'react-select';
import { useAuth } from '../../AuthContext'; 

const EditProfile = () => {
    const { userId } = useParams();
    const { user: authUser } = useAuth(); 
    const [user, setUser] = useState({
        userId: '',
        name: '',
        phone: '',
        email: '',
        position: '',
        macAddr: [],
        password: '', 
    });

    const [beacons, setBeacons] = useState([]); 
    const navigate = useNavigate();

    const formatPhoneNumber = (phoneNumber) => {
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        if (phoneNumber.length <= 3) return phoneNumber;
        if (phoneNumber.length <= 7) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
    };

    const fetchUserData = useCallback(async () => {
        try {
            const response = await apiClient.get(`/profile/${userId}`);
            const userData = response.data;
            setUser({
                ...userData,
                macAddr: userData.macAddr ? userData.macAddr.map(mac => ({ value: mac, label: mac })) : [],
                password: '', 
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('사용자 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }, [userId]);

    const fetchBeacons = useCallback(async () => {
        try {
            const response = await apiClient.get('/beacons'); 
            setBeacons(response.data.content || []);
        } catch (error) {
            console.error('Error fetching beacons:', error);
            alert('비콘 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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

    // 비밀번호 필드가 비어 있으면 해당 필드를 제외합니다.
    const updatedUser = {
        ...user,
        macAddr: user.macAddr.map(option => option.value),
    };

    // 만약 비밀번호가 비어 있지 않다면, updatedUser에 포함시킵니다.
    if (user.password) {
        updatedUser.password = user.password;
    } else {
        delete updatedUser.password; // 비어 있는 경우 아예 필드를 제거합니다.
    }

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

    const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
     };

    useEffect(() => {
        fetchUserData();
        fetchBeacons(); 
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
            <TopContainer>
                <BackButton onClick={handleBack} /> 
                <Title>프로필 수정</Title>
            </TopContainer>
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
                            type="password"  
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            placeholder="변경하지 않으려면 입력란를 비워두세요."
                        />
                        <InfoText> 5자 이상 ~ 16자 이내 입력. 영문 대문자, 소문자, 숫자 중 2종류 혼합</InfoText>
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
