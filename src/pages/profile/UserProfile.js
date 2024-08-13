import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import UserProfileTableComponent from '../../components/table/UserProfileTable';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import { useParams } from 'react-router-dom';
import apiClient from '../../apiClient';
import DeleteButton from '../../components/Beaconbutton/DeleteButton'; 
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
        role: '',
    });

    const fetchUserData = async () => {
        try {
            const response = await apiClient.get(`/profile/${userId}`);
            console.log('API Response:', response); 
            setUser(response.data); 
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [userId]);

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
