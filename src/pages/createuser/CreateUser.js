import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import apiClient from '../../apiClient';
import { Label, Input, FormRow, FormWrapper, InfoText } from '../../components/register/AdminStyles';
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
        company: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            // 전화번호 입력 시 하이픈 자동 추가
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

    // 전화번호 포맷팅 함수
    const formatPhoneNumber = (phoneNumber) => {
        phoneNumber = phoneNumber.replace(/[^0-9]/g, ''); // 숫자만 남기기
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

            // 성공 시 처리
            alert('사용자 계정 생성 완료');
            setUserData({
                userId: '',
                name: '',
                email: '',
                phone: '',
                position: '',
                password: '',
                company: '',
            });
        } catch (error) {
            console.error('Error creating admin account:', error);
            if (error.response && error.response.status === 400 && error.response.data.includes('중복')) {
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
            <StyledNavLink to="/profile/${userId}" activeClassName="active">
                회원 프로필 조회
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
            <Title>사용자 계정 생성</Title> {/* 타이틀은 기존 그대로 유지 */}
            <FormWrapper>
                {' '}
                {/* 폼을 전체적으로 감싸는 컨테이너 */}
                <form onSubmit={handleSubmit}>
                    <FormRow>
                        {' '}
                        {/* 각 필드를 세로 정렬로 감싸는 컨테이너 */}
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
                        <InfoText>5자 이상 ~ 16자 이내 입력. 영문 대문자, 소문자, 숫자 중 2종류 혼합 </InfoText>
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
                        <Label>회사</Label>
                        <Input
                            type="text"
                            name="company"
                            value={userData.company}
                            onChange={handleChange}
                            placeholder="예): ABC Corp"
                            required
                        />
                    </FormRow>
                    <ButtonContainer>
                        {' '}
                        {/* 계정 생성 버튼을 폼 내부로 이동 */}
                        <Button type="submit">계정 생성</Button>
                    </ButtonContainer>
                </form>
            </FormWrapper>
        </>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default CreateUser;
