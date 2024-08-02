// Navbar.js
import React from 'react';
import { Nav, TopBar, BottomBar, Logo, Menu, NavItem, UserProfile, Divider } from './NavbarStyles';
import icon from '../../assets/images/icon.png';

const Navbar = () => {
    return (
        <Nav>
            <TopBar>
                <div>MMP</div>
                <UserProfile>
                    <span>조예림 인턴 님 [직원]</span>
                    <a id="logout">로그아웃</a>
                </UserProfile>
            </TopBar>
            <Divider />
            <BottomBar>
                <Logo>
                    <a href="/">엄김조</a>
                </Logo>
                <Menu>
                    <NavItem href="/">
                        <img src={icon} alt="대시보드" /> 대시보드
                    </NavItem>
                    <NavItem href="/commute">
                        <img src={icon} alt="통근관리" /> 통근관리
                    </NavItem>
                </Menu>
            </BottomBar>
        </Nav>
    );
};

export default Navbar;
