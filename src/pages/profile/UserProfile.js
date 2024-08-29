import styled from 'styled-components';
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/layout/Layout';
import UserProfileTableComponent from '../../components/table/UserProfileTable';
import { Title, SubTitle, Divider, StyledNavLink, TopContainer, BackButton } from '../../styles/common/Typography';
import { useParams, useNavigate } from 'react-router-dom'; 
import apiClient from '../../apiClient';
import DeleteButton from '../../components/Beaconbutton/DeleteButton'; 
import AdminDeleteButton from '../../components/Beaconbutton/AdminDeleteButton'; // AdminDeleteButton 임포트
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

    const handleBack = () => {
        navigate(-1); 
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

    const title = user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? '관리자 상세 정보' : '직원 상세 정보';

    const mainContent = (
        <div>
            <TopContainer>
                <BackButton onClick={handleBack} /> {/* BackButton 추가 */}
                <Title>{title}</Title>
            </TopContainer>
            <UserProfileTableComponent user={user} />
            {(authUser && (authUser.role === 'SUPER_ADMIN' || authUser.role === 'ADMIN')) && (
                <ButtonContainer>
                    {/* user.role이 ADMIN 또는 SUPER_ADMIN이 아닌 경우에만 수정 버튼을 표시 */}
                    {user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN' && (
                        <Button onClick={handleEditClick}>수정</Button>
                    )}
                    {user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? (
                        <AdminDeleteButton userId={user.userId} /> 
                    ) : (
                        <DeleteButton userId={user.userId} />
                    )}
                </ButtonContainer>
            )}
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default UserProfile;
