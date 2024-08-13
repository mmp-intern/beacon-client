import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import apiClient from '../../apiClient';
import { Label, Input, Button, ButtonContainer, FormRow, FormWrapper, InfoText } from '../../components/register/AdminStyles';

const CreateAdmin = () => {
    const [adminData, setAdminData] = useState({
        userId: '',
        password: '',
        company: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData({
            ...adminData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting adminData:', adminData); // 데이터 확인
        try {
            const response = await apiClient.post(`/admin`, adminData);

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = response.data;
            console.log(result);
    
            // 성공 시 처리
            alert('관리자 생성 완료');
            setAdminData({
                userId: '',
                password: '',
                company: '', // 회사 필드 초기화
            });
        } catch (error) {
            console.error('Error creating admin account:', error);
            if (error.response && error.response.status === 400 && error.response.data.includes('중복')) {
                alert('중복된 아이디입니다. 다른 아이디를 사용하세요.');
            } else {
                alert('관리자 계정 생성에 실패했습니다.');
            }
        }
    };

    const leftContent = (
        <div>
            <SubTitle>관리자 메뉴</SubTitle>
            <Divider />
            {/* 회원 프로필 조회 링크 - userId를 동적으로 포함 */}
            <StyledNavLink to="/userlist" activeClassName="active">
                회원 목록 조회
            </StyledNavLink>
            <StyledNavLink to="/profile/${userId}" activeClassName="active">
                회원 프로필 조회
            </StyledNavLink>
            <StyledNavLink to="/users" activeClassName="active">
                사용자 계정 생성
            </StyledNavLink>
            <StyledNavLink to="/admin" activeClassName="active">
                관리자 계정 생성
            </StyledNavLink>
            
        </div>
    );

    const mainContent = (
        <>
            <Title>관리자 계정 생성</Title> {/* 타이틀은 기존 그대로 유지 */}
            <FormWrapper> {/* 폼을 전체적으로 감싸는 컨테이너 */}
                <form onSubmit={handleSubmit}>
                    <FormRow> {/* 각 필드를 세로 정렬로 감싸는 컨테이너 */}
                        <Label>사용자 ID</Label>
                        <Input
                            type="text"
                            name="userId"
                            value={adminData.userId}
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
                            value={adminData.password}
                            onChange={handleChange}
                            placeholder="비밀번호 입력 (예: P@ssw0rd)"
                            required
                        />
                        <InfoText>5자 이상 ~ 16자 이내 입력. 영문 대문자, 소문자, 숫자 중 2종류 혼합</InfoText>
                    </FormRow>
                    <FormRow>
                        <Label>회사</Label>
                        <Input
                            type="text"
                            name="company"
                            value={adminData.company}
                            onChange={handleChange}
                            placeholder="회사 이름 입력"
                            required
                        />
                    </FormRow>
                    <ButtonContainer> {/* 계정 생성 버튼을 폼 내부에 포함 */}
                        <Button type="submit">계정 생성</Button>
                    </ButtonContainer>
                </form>
            </FormWrapper>
        </>
    );
    
    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default CreateAdmin;
