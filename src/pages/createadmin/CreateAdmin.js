import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import apiClient from '../../apiClient';
import { Label, Input, FormRow, FormWrapper, InfoText } from '../../components/register/AdminStyles';
import { ButtonContainer, Button } from '../../styles/common/ButtonStyles';

const CreateAdmin = () => {
    const [adminData, setAdminData] = useState({
        userId: '',
        password: '',
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
        console.log('Submitting adminData:', adminData); 
        try {
            const response = await apiClient.post(`/admin`, adminData);
    
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = response.data;
            console.log(result);
    
            alert('관리자 생성 완료');
            setAdminData({
                userId: '',
                password: '',
            });
        } catch (error) {
            console.error('Error creating admin account:', error);
            if (error.response && error.response.status === 400) {
                const responseData = error.response.data;
                if (typeof responseData === 'string' && responseData.includes('중복')) {
                    alert('중복된 아이디입니다. 다른 아이디를 사용하세요.');
                } else if (responseData.message && responseData.message.includes('중복')) {
                    alert('중복된 아이디입니다. 다른 아이디를 사용하세요.');
                } else {
                    alert('관리자 계정 생성에 실패했습니다.');
                }
            } else {
                alert('관리자 계정 생성에 실패했습니다.');
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
            <StyledNavLink to="/adminlist" activeClassName="active">
                관리자 정보 관리
            </StyledNavLink>
            <StyledNavLink to="/users" activeClassName="active">
                직원 계정 생성
            </StyledNavLink>
            <StyledNavLink to="/admin" activeClassName="active">
                관리자 계정 생성
            </StyledNavLink>
        </div>
    );

    const mainContent = (
        <>
            <Title>관리자 계정 생성</Title> 
            <FormWrapper>
                <form onSubmit={handleSubmit}>
                    <FormRow>
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
                        <InfoText>16자 이내 입력. 영문 대문자, 소문자, 숫자 중 2종류 혼합</InfoText>
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

export default CreateAdmin;
