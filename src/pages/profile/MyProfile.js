import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import UserProfileTableComponent from '../../components/table/UserProfileTable';
import { useAuth } from '../../AuthContext';
import { Title, SubTitle, Divider } from '../../styles/common/Typography';

const MyProfile = () => {
    const { user, apiClient } = useAuth();
    console.log('apiClient:', apiClient);
    const [profile, setProfile] = useState({
        userId: '',
        name: '',
        phone: '',
        email: '',
        position: '',
        role: '', 
    });

    const fetchProfileData = async () => {
        try {
            const response = await apiClient.get('/profile/me');
            console.log('API Response:', response); // API 응답 로그
            setProfile(response.data); // 응답 데이터를 상태로 설정
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
            <UserProfileTableComponent user={profile} role={profile.role} /> {/* role을 전달 */}
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default MyProfile;
