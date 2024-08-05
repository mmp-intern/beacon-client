import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    th,
    td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }
    th {
        background-color: #f2f2f2;
        cursor: pointer;
        position: relative;
    }
    tbody tr:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

export const SortArrows = styled.div`
    display: inline-flex;
    flex-direction: column;
    margin-left: 5px;
    align-items: center;
    justify-content: center;
`;

export const SortArrowUp = styled.div`
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${({ active }) => (active ? '#000' : '#ccc')};
    opacity: ${({ active }) => (active ? 1 : 0.5)};
    transition: border-bottom-color 0.3s, opacity 0.3s;
    margin-bottom: 2px;
`;

export const SortArrowDown = styled.div`
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${({ active }) => (active ? '#000' : '#ccc')};
    opacity: ${({ active }) => (active ? 1 : 0.5)};
    transition: border-top-color 0.3s, opacity 0.3s;
    margin-top: 2px;
`;
