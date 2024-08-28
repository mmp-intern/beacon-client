import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/layout/Layout';
import UserProfileTableComponent from '../../components/table/UserProfileTable';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Title, SubTitle, Divider, TopContainer, BackButton } from '../../styles/common/Typography';

const MyProfile = () => {
    const { apiClient } = useAuth();  
    const navigate = useNavigate();
    console.log('apiClient:', apiClient);
    const [profile, setProfile] = useState({
        userId: '',
        name: '',
        phone: '',
        email: '',
        position: '',
        role: '', 
    });

    const fetchProfileData = useCallback(async () => {
        try {
            const response = await apiClient.get('/profile/me');
            console.log('API Response:', response); 
            setProfile(response.data); 
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    }, [apiClient]);  

    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);

    const handleBack = () => {
        navigate(-1);
    };

    const leftContent = (
        <div>
            <SubTitle>마이페이지</SubTitle>
            <Divider />
        </div>
    );

    const mainContent = (
        <div>
            <TopContainer>
                <BackButton onClick={handleBack} /> {/* BackButton 추가 */}
                <Title>마이페이지</Title>
            </TopContainer>
            <UserProfileTableComponent user={profile} role={profile.role} />
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default MyProfile;
