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
        margin-right: 10px;
        font-weight: bold; 
        font-size: 15px; 
    }
`;


export const Divider = styled.div`
    height: 0.5px;
    background-color: black;
`;

export const LogoutButton = styled.button`
    padding: 10px 20px;
    border: none; /* 경계를 없앰 */
    border-radius: 4px;
    background-color: transparent; /* 배경색을 투명하게 설정 */
    color: rgba(255, 255, 255, 0.6); /* 텍스트 색상: 비활성화된 것처럼 보이게 하기 위해 불투명하게 설정 */
    font-size: 15px; 
    margin-right: 10px;
    transition: color 0.3s ease, background-color 0.3s ease; /* 색상과 배경색 전환에 애니메이션 적용 */

    &:hover {
        color: white; /* 호버 시 텍스트를 완전히 하얗게 */
        background-color: rgba(255, 255, 255, 0.1); /* 호버 시 약간의 투명도 있는 배경 */
    }
`;

