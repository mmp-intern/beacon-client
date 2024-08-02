import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

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
    background-color: #f2f2f2; /* 기본 회색 */
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #007bff; /* 커서가 있을 때 파란색 */
        color: white; /* 텍스트 색상 변경 */
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
