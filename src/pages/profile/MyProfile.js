import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/layout/Layout';
import UserProfileTableComponent from '../../components/table/UserProfileTable';
import { useAuth } from '../../AuthContext';
import { Title, SubTitle, Divider } from '../../styles/common/Typography';

const MyProfile = () => {
    const { apiClient } = useAuth();  
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

    const leftContent = (
        <div>
            <SubTitle>마이페이지</SubTitle>
            <Divider />
        </div>
    );

    const mainContent = (
        <div>
            <Title>마이페이지</Title>
            <UserProfileTableComponent user={profile} role={profile.role} /> 
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default MyProfile;
