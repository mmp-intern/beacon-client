import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import UserProfileTableComponent from '../../components/table/UserProfileTable';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
import apiClient from '../../apiClient';
import DeleteButton from '../../components/Beaconbutton/DeleteButton'; 
import { useAuth } from '../../AuthContext';
import { SearchContainer } from '../../components/searchbar/SearchBarStyles';
import { Button } from '../../styles/common/ButtonStyles'; // ButtonStyles에서 Button 가져오기

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

    const navigate = useNavigate(); // useNavigate 사용

    const fetchUserData = async () => {
        try {
            const response = await apiClient.get(`/profile/${userId}`);
            console.log('API Response:', response); // 응답 로그 확인
            setUser(response.data); // 응답 데이터를 상태로 설정
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const handleEditClick = () => {
        // 여기에 넘어갈 페이지가 'EditProfile' 페이지인지 확인
        navigate(`/profile/${userId}/edit`); // 수정 버튼 클릭 시 EditProfile 페이지로 이동
    };

    const leftContent = (
        <div>
            <SubTitle>관리자 메뉴</SubTitle>
            <Divider />
            <StyledNavLink to="/userlist" activeClassName="active">
                회원 목록 조회
            </StyledNavLink>
            <StyledNavLink to="/users" activeClassName="active">
                사용자 계정 생성
            </StyledNavLink>
            <StyledNavLink to="/admin" activeClassName="active">
                관리자 계정 생성
            </StyledNavLink>
        </div>
    );

    const mainContent = (
        <div>
            <Title>회원 정보 조회</Title>
            <UserProfileTableComponent user={user} />
            {(authUser && (authUser.role === 'SUPER_ADMIN' || authUser.role === 'ADMIN')) && (
                <SearchContainer>
                    <Button onClick={handleEditClick}>수정</Button> {/* 수정 버튼 추가 */}
                    <DeleteButton userId={user.userId} /> {/* 삭제 버튼 중앙에 배치 */}
                </SearchContainer>
            )}
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default UserProfile;
