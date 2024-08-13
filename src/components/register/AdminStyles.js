import styled from 'styled-components';

// 버튼과 포커스 상태에서 사용할 색상
const buttonColor = '#0066ff'; 
const hoverColor = '#0056d2'; 
const borderColor = '#ddd';
const textColor = '#333';

// 검색 컨테이너와 폼 컨테이너에 동일한 폭을 적용
const containerWidth = '100%'; // 가로폭을 90%로 설정하여 화면의 대부분을 차지하도록
const containerMaxWidth = '1200px'; // 최대 가로폭을 1200px로 제한

// 전체 페이지 또는 폼을 감싸는 컨테이너
export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: ${containerWidth}; /* 가로폭을 설정하여 화면의 대부분을 차지하도록 */
    max-width: ${containerMaxWidth}; /* 최대 가로폭을 제한 */
    margin: 0 auto; /* 중앙 정렬 */
    padding: 20px; /* 여백 추가 */
    box-sizing: border-box; /* 패딩을 포함한 전체 너비 계산 */
`;

// 검색 컨테이너와 테이블 스타일 정의
export const SearchContainer = styled.div`
    width: ${containerWidth}; /* 가로폭을 설정하여 화면의 대부분을 차지하도록 */
    max-width: ${containerMaxWidth}; /* 최대 가로폭을 제한 */
    margin: 0 auto 20px auto; /* 중앙 정렬 및 아래 여백 추가 */
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

// InfoText 스타일 정의
export const InfoText = styled.p`
    font-size: 9px; 
    color: #777; 
    margin: 5px 0 15px;
    width: 100%;
    text-align: left;
`;

// 폼의 각 행
export const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px; /* 각 행 사이의 간격을 약간 늘림 */
`;

// 라벨
export const Label = styled.label`
    margin-bottom: 8px;
    font-weight: 600;
    color: ${textColor};
    font-size: 14px;
    text-align: left;
    width: 100%;
`;

// 인풋 필드
export const Input = styled.input`
    padding: 10px; /* 입력 필드 안의 내용과 테두리 사이의 여백을 늘림 */
    font-size: 14px; 
    border: 1px solid ${borderColor}; 
    border-radius: 8px; 
    width: 100%; 
    box-sizing: border-box; 

    &:focus {
        border: 2px solid ${buttonColor}; 
        outline: none; 
        box-shadow: 0 0 5px rgba(0, 102, 255, 0.5); 
    }

    &::placeholder {
        color: #aaa; 
        font-size: 12px; 
        font-style: italic; 
    }
`;

// 버튼 스타일
export const Button = styled.button`
    width: 100%;
    padding: 14px;
    background-color: ${buttonColor};
    color: white;
    border: none; 
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${hoverColor};
    }
`;

// 버튼 컨테이너
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
`;
