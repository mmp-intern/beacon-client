import styled from 'styled-components';

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Label = styled.label`
    margin-bottom: 10px;
    font-weight: bold;
    color: #333;
    font-size: 14px;
    padding-right: 10px; /* 텍스트와 라벨 사이의 패딩 간격을 크게 늘림 */
    
`;

export const Input = styled.input`
    margin-bottom: 20px;
    padding: 12px 15px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

export const Button = styled.button`
    padding: 10px 20px;
    background-color: #f2f2f2;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #007bff;
        color: white;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;
