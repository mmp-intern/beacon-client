import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Title, SubTitle, Divider,StyledNavLink } from '../../styles/common/Typography';
import apiClient from '../../apiClient';



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
        try {
            const response = await apiClient.post(`/admin`, adminData);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);

            // 성공 시 처리
            alert('관리자 생성 완료');
            setAdminData({
                userId: '',
                password: '',
            });
        } catch (error) {
            console.error('Error creating admin account:', error);
            alert('Failed to create admin account.');
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
            <Title>관리자 계정 생성</Title>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>사용자 ID</label>
                    <input
                        type="text"
                        name="userId"
                        value={adminData.userId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        name="password"
                        value={adminData.password}
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

export default CreateAdmin;
