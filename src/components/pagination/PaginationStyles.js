import styled from 'styled-components';

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const PageButton = styled.button`
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    background-color: ${({ active }) => (active ? '#ccc' : 'white')};
    color: ${({ active }) => (active ? 'black' : '#333')};
    cursor: pointer;

    &:disabled {
        background-color: #f0f0f0;
        cursor: not-allowed;
    }
`;

export const PageText = styled.span`
    margin: 0 5px;
    color: #333;
    cursor: pointer;

    &:hover {
        color: #007bff;
    }

    ${({ disabled }) =>
        disabled &&
        `
        color: #ccc;
        cursor: not-allowed;
    `}
`;
