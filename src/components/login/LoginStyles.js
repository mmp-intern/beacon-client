import styled from 'styled-components';

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #2e3b4e;
`;

export const LoginTitle = styled.h1`
    margin-bottom: 20px;
    font-size: 36px;
    color: white;
`;

export const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 40px;
    border-radius: 10px;
`;

export const LoginInput = styled.input`
    width: 300px;
    padding: 15px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
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
    width: 100%;
    padding: 15px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    background-color: #1e90ff;
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #1c7ed6;
    }
`;

