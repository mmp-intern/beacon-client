import styled from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 50px;
    font-size: 24px;
    color: #333;
`;

export const SubTitle = styled.h2`
    text-align: center;
    font-size: 20px;
    color: #555;
    margin-bottom: 10px;
`;

export const Paragraph = styled.p`
    font-size: 16px;
    color: #666;
    line-height: 1.5;
    margin-bottom: 10px;
`;

export const Divider = styled.hr`
    margin: 20px 0;
    border: none;
    border-top: 1px solid #e0e0e0;
`;

export const PageSizeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start; /* 왼쪽 정렬 */
    margin-bottom: 10px;
`;

export const PageSizeLabel = styled.span`
    margin-right: 5px;
`;

export const PageSizeSelect = styled.select`
    margin-right: 5px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

export const StyledNavLink = styled(RouterNavLink)`
    display: block;
    margin: 10px 0;
    font-size: 1em;
    text-decoration: none;
    padding: 10px;
    border-radius: 4px;
    color: #000;

    &.active {
        background-color: #e0e0e0;
        color: #333;
    }

    &:hover {
        background-color: #e0e0e0;
        color: #333;
    }
`;

export const ButtonContainer = styled.div`
    text-align: center;
    margin-top: 20px;
`;

export const Button = styled.button`
    padding: 10px 20px;
    background-color: #f2f2f2;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #007bff;
        color: white;
    }
`;
