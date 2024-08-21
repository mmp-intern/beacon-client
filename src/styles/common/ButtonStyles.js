import styled from 'styled-components';

const primaryHoverColor = '#0056d2'; // 버튼 호버 색상

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
