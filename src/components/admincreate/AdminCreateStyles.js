// AdminCreateStyles.js
import styled from 'styled-components';

export const AdminContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

export const AdminTitle = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

export const AdminForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

export const AdminInput = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

export const AdminButton = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    cursor: pointer;
    
    &:hover {
        background-color: #45a049;
    }
`;
