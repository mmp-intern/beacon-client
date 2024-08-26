import styled from 'styled-components';

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #5A6973;
`;

export const LoginTitle = styled.h1`
    margin-bottom: 20px;
    font-size: 36px;
    color: #C5D0DB; /* 이미지와 동일한 텍스트 색상 */
`;

export const LoginInput = styled.input`
    width: 300px;
    padding: 15px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    background-color: rgba(252, 255, 255, 0.2);
    color: #D9DEE5; /* 이미지에서 추출한 텍스트 색상으로 설정 */
    font-size: 16px;

    &::placeholder {
        color: rgba(255, 255, 255, 0.6);
    }

    &:focus {
        outline: none;
        background-color: rgba(255, 255, 255, 0.3);
    }
`;


export const LoginButton = styled.button`
    width: 330px;
    padding: 15px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    background: linear-gradient(to bottom, #4fc3ff, #1aa3ff); 
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background: linear-gradient(to bottom, #3394e6, #0073e6); 
    }
`;
