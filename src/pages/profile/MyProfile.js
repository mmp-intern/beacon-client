import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import UserProfileTableComponent from '../../components/table/UserProfileTable';
import API_BASE_URL from '../../config';
import { Title, SubTitle, Divider } from '../../styles/common/Typography';

const MyProfile = () => {
    const [user, setUser] = useState({
        userId: '',
        name: '',
        phoneNumber: '',
        email: '',
        position: '',
    });

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/profile/me`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setUser(result);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
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
            <UserProfileTableComponent user={user} />
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default MyProfile;
