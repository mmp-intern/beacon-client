// NavbarStyles.js
import styled from 'styled-components';

export const Nav = styled.nav`
    background-color: #2f5a98;
    color: white;
`;

export const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    align-items: center;
`;

export const BottomBar = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    align-items: center;
`;

export const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;

    a {
        color: white;
        text-decoration: none;
    }
`;

export const Menu = styled.div`
    display: flex;
    align-items: center;
`;

export const NavItem = styled.a`
    color: white;
    text-decoration: none;
    margin-right: 20px;
    padding: 10px;
    display: flex;
    align-items: center;

    img {
        margin-right: 8px;
        width: 100px;
        height: 100px;
    }

    &:hover {
        background-color: #1f4c89;
    }
`;

export const UserProfile = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    span {
        margin-right: 20px;
    }
`;

export const Divider = styled.div`
    height: 0.5px;
    background-color: black;
`;
