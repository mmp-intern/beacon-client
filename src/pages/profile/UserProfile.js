import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import UserProfileTableComponent from '../../components/table/UserProfileTable';
import { Title, SubTitle, Divider } from '../../styles/common/Typography';
import { useParams } from 'react-router-dom';
import apiClient from '../../apiClient';

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({
        userId: '',
        name: '',
        phoneNumber: '',
        email: '',
        position: '',
    });

    const fetchUserData = async () => {
        try {
            const response = await apiClient(`/profile/${userId}`);
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
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default UserProfile;
