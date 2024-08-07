import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import UserProfileTableComponent from '../../components/table/UserProfileTable';
import { useAuth } from '../../AuthContext';
import { Title, SubTitle, Divider } from '../../styles/common/Typography';

const MyProfile = () => {
    const { user, apiClient } = useAuth();
    const [profile, setProfile] = useState({
        userId: '',
        name: '',
        phoneNumber: '',
        email: '',
        position: '',
    });

    const fetchProfileData = async () => {
        try {
            const response = await apiClient.get('/profile/me');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setProfile(result);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const leftContent = (
        <div>
            <SubTitle>마이페이지</SubTitle>
            <Divider />
        </div>
    );

    const mainContent = (
        <div>
            <Title>마이페이지</Title>
            <UserProfileTableComponent user={profile} />
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default MyProfile;