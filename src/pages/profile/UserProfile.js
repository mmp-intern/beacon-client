import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import UserProfileTableComponent from '../../components/table/UserProfileTable';
import { Title, SubTitle, Divider } from '../../styles/common/Typography';
import { useParams } from 'react-router-dom';
import apiClient from '../../apiClient';
import DeleteButton from '../../components/deletebutton/DeleteButton'; 
import { useAuth } from '../../AuthContext';
import { SearchContainer } from '../../components/searchbar/SearchBarStyles';

const UserProfile = () => {
    const { userId } = useParams();
    const { user: authUser, apiClient } = useAuth();
    const [user, setUser] = useState({
        userId: '',
        name: '',
        phoneNumber: '',
        email: '',
        position: '',
        role: '', // 사용자 역할 추가
    });

    const fetchUserData = async () => {
        try {
            const response = await apiClient(`/profile/${userId}`);
            console.log('API Response:', response); // 응답 로그 확인
            setUser(response.data); // 응답 데이터를 상태로 설정
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const leftContent = (
        <div>
            <SubTitle>회원 정보 조회</SubTitle>
            <Divider />
        </div>
    );

    const mainContent = (
        <div>
            <Title>회원 정보 조회</Title>
            <UserProfileTableComponent user={user} />
            {(authUser && (authUser.role === 'SUPER_ADMIN' || authUser.role === 'ADMIN')) && (
            <SearchContainer>
            <DeleteButton userId={user.userId} /> {/* 삭제 버튼 중앙에 배치 */}
            </SearchContainer>
            )}
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default UserProfile;
