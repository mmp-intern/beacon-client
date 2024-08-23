import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import apiClient from '../../apiClient';
import { FormWrapper, FormRow, Label, Input } from '../../styles/common/FormStyles';
import { ButtonContainer, Button } from '../../styles/common/ButtonStyles';

const EditProfile = () => {
    const { userId } = useParams(); // URL에서 userId를 가져옵니다.
    const { user: authUser } = useAuth();
    const [user, setUser] = useState({
        userId: '',
        name: '',
        phone: '',
        email: '',
        position: '',
        macAddr: '',
    });

    const navigate = useNavigate();

    // 사용자 데이터를 가져오는 함수
    const fetchUserData = async () => {
        try {
            const response = await apiClient.get(`/profile/${userId}`); // 템플릿 리터럴 사용
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('사용자 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    };

    // 입력 값 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form is being submitted');  // 폼이 제출되었는지 확인
        console.log('Submitting form with data:', user);  // 전송될 데이터를 출력
    
        try {
            const response = await apiClient.put(`/profile/${userId}`, user); // 템플릿 리터럴 사용
            console.log('API response:', response);  // 응답 로그 출력
    
            if (response.status === 200) {
                alert('프로필이 성공적으로 수정되었습니다.');
                navigate(`/profile/${userId}`);
            } else {
                alert('프로필 수정 중 오류가 발생했습니다.');
                console.log('Response status:', response.status);  // 응답 상태 출력
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('프로필 수정 중 오류가 발생했습니다.');
        }
    };
    
    

    // 컴포넌트가 마운트될 때 사용자 데이터를 가져옵니다.
    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const leftContent = (
        <div>
            <SubTitle>관리자 메뉴</SubTitle>
            <Divider />
            <StyledNavLink to="/userlist">
                회원 목록 조회
            </StyledNavLink>
            <StyledNavLink to="/users">
                사용자 계정 생성
            </StyledNavLink>
            <StyledNavLink to="/admin">
                관리자 계정 생성
            </StyledNavLink>
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
                    <Label htmlFor="macAddr">Mac주소</Label>
                    <Input
                        type="text"
                        id="macAddr"
                        name="macAddr"
                        value={user.macAddr}
                        onChange={handleInputChange}
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
