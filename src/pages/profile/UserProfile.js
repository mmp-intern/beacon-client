import styled from 'styled-components';

// 기존 코드
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/layout/Layout';
import UserProfileTableComponent from '../../components/table/UserProfileTable';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import { useParams, useNavigate } from 'react-router-dom'; 
import apiClient from '../../apiClient';
import DeleteButton from '../../components/Beaconbutton/DeleteButton'; 
import { useAuth } from '../../AuthContext';
import { Button } from '../../styles/common/ButtonStyles'; 

const UserProfile = () => {
    const { userId } = useParams();
    const { user: authUser } = useAuth();
    const [user, setUser] = useState({
        userId: '',
        name: '',
        phoneNumber: '',
        email: '',
        position: '',
        role: '', 
        macAddr:'',
    });

    const navigate = useNavigate(); 

    const fetchUserData = useCallback(async () => {
        try {
            const response = await apiClient.get(`/profile/${userId}`);
            console.log('API Response:', response); 
            setUser(response.data); 
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, [userId]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const handleEditClick = () => {
        navigate(`/profile/${userId}/edit`); 
    };

    const leftContent = (
        <div>
            <SubTitle>관리자 메뉴</SubTitle>
            <Divider />
            <StyledNavLink to="/userlist" activeClassName="active">
                직원 정보 관리
            </StyledNavLink>
            {authUser && authUser.role === 'SUPER_ADMIN' && (
                <>
                    <StyledNavLink to="/adminlist" activeClassName="active">
                        관리자 정보 관리
                    </StyledNavLink>
                </>
            )}
            <StyledNavLink to="/users" activeClassName="active">
                직원 계정 생성
            </StyledNavLink>
            {authUser && authUser.role === 'SUPER_ADMIN' && (
                <>
                    <StyledNavLink to="/admin" activeClassName="active">
                        관리자 계정 생성
                    </StyledNavLink>
                </>
            )}
        </div>
    );
    
    const ButtonContainer = styled.div`
        display: flex;
        justify-content: center; 
        gap: 10px; /* 버튼 간의 간격을 10px로 설정 */
    `;

    const mainContent = (
        <div>
            <Title>직원 상세 정보</Title>
            <UserProfileTableComponent user={user} />
            {(authUser && (authUser.role === 'SUPER_ADMIN' || authUser.role === 'ADMIN')) && (
                <ButtonContainer>
                    <Button onClick={handleEditClick}>수정</Button> 
                    <DeleteButton userId={user.userId} /> 
                </ButtonContainer>
            )}
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default UserProfile;
