import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import apiClient from '../../apiClient';
import { Label, Input, Button } from '../../components/register/AdminStyles';
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
        setUserData({
            ...userData,
            [name]: value,
        });
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
        }  catch (error) {
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
        <div>
            <Title>사용자 계정 생성</Title>
            <form onSubmit={handleSubmit}>
            
                <div>
                    <Label>사용자 ID</Label>
                    <Input
                        type="text"
                        name="userId"
                        value={userData.userId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label>비밀번호</Label>
                    <Input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label>이름</Label>
                    <Input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label>이메일</Label>
                    <Input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label>전화번호</Label>
                    <Input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label>직책</Label>
                    <Input
                        type="text"
                        name="position"
                        value={userData.position}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label>회사</Label>
                    <Input
                        type="text"
                        name="company"
                        value={userData.company}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit">계정 생성</Button>
            </form>
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default CreateUser;
