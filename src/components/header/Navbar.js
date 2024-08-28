// Navbar.js
import React, { useEffect, useState } from 'react';
import { removeCookie } from '../../cookie'; // 쿠키 제거 함수를 불러옵니다.
import { Nav, TopBar, BottomBar, Logo, Menu, NavItem, UserProfile, Divider, LogoutButton } from './NavbarStyles';
import icon from '../../assets/images/icon.png';
import apiClient from '../../apiClient';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

const Navbar = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiClient.get('/profile/me');
                console.log(response.data);

                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
        if (confirmLogout) { 
            removeCookie('access_token', { path: '/' });
            removeCookie('refresh_token', { path: '/' });
            window.location.href = '/login';
        }
    };

    const handleMyPage = () => {
        navigate('/profile/me');
    };

    const getRoleInKorean = (role) => {
        switch (role) {
            case 'SUPER_ADMIN':
                return '슈퍼관리자';
            case 'ADMIN':
                return '관리자';
            case 'USER':
                return '직원';
            default:
                return role;
        }
    };

    return (
        <Nav>
            <TopBar>
                <div></div>
                <UserProfile>
                    {profile ? (
                        <>
                            {profile.role === 'SUPER_ADMIN' || profile.role === 'ADMIN' ? (
                                <span onClick={handleMyPage} style={{ cursor: 'pointer' }}>
                                    {getRoleInKorean(profile.role)}님
                                </span>
                            ) : (
                                <span onClick={handleMyPage} style={{ cursor: 'pointer' }}>
                                      {profile.name} [{getRoleInKorean(profile.role)}]님
                                </span>
                            )}
                            <LogoutButton id="logout" onClick={handleLogout}>
                                로그아웃
                            </LogoutButton>
                        </>
                    ) : (
                        <span>Loading...</span>
                    )}
                </UserProfile>
            </TopBar>
            <Divider />
            <BottomBar>
                <Logo>
                    <a href="/">MKM</a>
                </Logo>
                <Menu>
                    <NavItem href="/">
                        <img src={icon} alt="통근관리" /> 통근관리
                    </NavItem>
                    {profile && (profile.role === 'SUPER_ADMIN' || profile.role === 'ADMIN') && (
                        <NavItem href="/userlist">
                            <img src={icon} alt="회원관리" /> 회원관리
                        </NavItem>
                    )}
                    {(profile && (profile.role === 'SUPER_ADMIN' || profile.role === 'ADMIN')) && (
                        <NavItem href="/beacon">
                            <img src={icon} alt="비콘관리" /> 비콘관리
                        </NavItem>
                    )}
                </Menu>
            </BottomBar>
        </Nav>
    );
};

export default Navbar;
