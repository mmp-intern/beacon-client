import styled from 'styled-components';

export const SearchContainer = styled.div`
    margin-bottom: 20px;
    text-align: center;
`;

export const SearchTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    colgroup col:first-child {
        width: 25%;
    }
    th,
    td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }
    th {
        background-color: #f2f2f2;
    }
`;

export const SearchButton = styled.button`
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

export const SearchInput = styled.input`
    width: calc(100% - 150px);
    padding: 8px;
    margin-left: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

export const Select = styled.select`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;
