import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import apiClient from '../../apiClient';

const CreateUser = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        position: '',
        password: '',
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


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // 성공 시 처리
            alert('User account created successfully!');
            setUserData({
                name: '',
                email: '',
                phoneNumber: '',
                position: '',
                password: '',
            });
        } catch (error) {
            console.error('Error creating user account:', error);
            alert('Failed to create user account.');
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
        <div>
            <Title>사용자 계정 생성</Title>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>이메일</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>전화번호</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>직위</label>
                    <input
                        type="text"
                        name="position"
                        value={userData.position}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">계정 생성</button>
            </form>
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default CreateUser;
