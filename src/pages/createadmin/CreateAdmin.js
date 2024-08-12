import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import apiClient from '../../apiClient';
import { Label, Input, Button, ButtonContainer, FormContainer } from '../../components/register/AdminStyles';

const CreateAdmin = () => {
    const [adminData, setAdminData] = useState({
        userId: '',
        password: '',
        company: '', // 회사 필드 추가
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
            <StyledNavLink to="/users" activeClassName="active">
                사용자 계정 생성
            </StyledNavLink>
            <StyledNavLink to="/admin" activeClassName="active">
                관리자 계정 생성
            </StyledNavLink>
        </div>
    );

    const mainContent = (
        <FormContainer>
            <Title>관리자 계정 생성</Title>
            <form onSubmit={handleSubmit}>
                <Label>사용자 ID</Label>
                <Input
                    type="text"
                    name="userId"
                    value={adminData.userId}
                    onChange={handleChange}
                    required
                />
                <Label>비밀번호</Label>
                <Input
                    type="password"
                    name="password"
                    value={adminData.password}
                    onChange={handleChange}
                    required
                />
                <Label>회사</Label>
                <Input
                    type="text"
                    name="company"
                    value={adminData.company}
                    onChange={handleChange}
                    required
                />
                <ButtonContainer>
                    <Button type="submit">계정 생성</Button>
                </ButtonContainer>
            </form>
        </FormContainer>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default CreateAdmin;
