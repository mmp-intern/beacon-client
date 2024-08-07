// AdminCreate.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AdminContainer, AdminTitle, AdminForm, AdminInput, AdminButton } from './AdminCreateStyles';
import apiClient from '../../apiClient';

const AdminCreate = () => {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleCreateAdmin = async () => {
        try {
            const response = await apiClient.post(`/admins`, {
                adminId,
                password,
                name,
                email,
            });

            if (response.data.success) {
                alert('관리자가 성공적으로 생성되었습니다.');
                navigate('/admin-list'); // 생성 후 관리자 목록 페이지로 이동
            } else {
                alert('관리자 생성 실패: ' + response.data.message);
            }
        } catch (error) {
            console.error('관리자 생성 실패', error);
            alert('관리자 생성 실패: 서버 오류');
        }
    };

    return (
        <AdminContainer>
            <AdminTitle>관리자 생성</AdminTitle>
            <AdminForm>
                <AdminInput
                    type="text"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="관리자 ID"
                />
                <AdminInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
                <AdminInput
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름"
                />
                <AdminInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                />
                <AdminButton type="button" onClick={handleCreateAdmin}>
                    생성
                </AdminButton>
            </AdminForm>
        </AdminContainer>
    );
};

export default AdminCreate;
