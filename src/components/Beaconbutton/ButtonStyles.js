import styled from 'styled-components';

// 이미지에서 추출된 색상 코드 (예: #2c559c)
const buttonColor = '#2c559c';

// 공통 버튼 스타일
export const ActionButton = styled.button`
    padding: 10px 20px;
    margin-left: 10px; /* 버튼 사이에 간격 추가 */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    color: white;

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

// 등록 버튼 스타일
export const RegisterButtonStyle = styled(ActionButton)`
    background-color: ${buttonColor};

    &:hover {
        background-color: #1e3b6b; /* 호버 시 약간 어두운 톤 */
    }
`;

// 수정 버튼 스타일
export const EditButtonStyle = styled(ActionButton)`
    background-color: ${buttonColor};

    &:hover {
        background-color: #1e3b6b;
    }
`;

// 삭제 버튼 스타일
export const BeaconDeleteButtonStyle = styled(ActionButton)`
    background-color: ${buttonColor};

    &:hover {
        background-color: #1e3b6b;
    }
`;
