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
        // 쿠키에서 토큰 제거
        removeCookie('access_token', { path: '/' });
        removeCookie('refresh_token', { path: '/' });
        // 로그아웃 후 리디렉션 (로그인 페이지로)
        window.location.href = '/login';
    };

    const handleMyPage = () => {
        navigate('/profile/me');
    };

    return (
        <Nav>
            <TopBar>
                <div>MMP</div>
                <UserProfile>
                    {profile ? (
                        <>
                            {profile.role === '슈퍼관리자' || profile.role === '관리자' ? (
                                <span onClick={handleMyPage} style={{ cursor: 'pointer' }}>
                                    {profile.role}
                                </span>
                            ) : (
                                <span onClick={handleMyPage} style={{ cursor: 'pointer' }}>
                                    {profile.name} {profile.role} 님
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
                    <a href="/">엄김조</a>
                </Logo>
                <Menu>
                    <NavItem href="/">
                        <img src={icon} alt="통근관리" /> 통근관리
                    </NavItem>

                    {profile && (profile.role === 'SUPER_ADMIN' || profile.role === 'ADMIN') && (
                        <NavItem href="/users">
                            <img src={icon} alt="회원관리" /> 회원관리
                        </NavItem>
                    )}
                </Menu>
            </BottomBar>
        </Nav>
    );
};

export default Navbar;
