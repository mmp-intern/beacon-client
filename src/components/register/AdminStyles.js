import styled from 'styled-components';

// 버튼과 포커스 상태에서 사용할 색상
const buttonColor = '#0066ff';
const hoverColor = '#0056d2';
const borderColor = '#ddd';
const textColor = '#333';
const focusColor = '#007bff'; // 포커스 상태의 색상 통일 (변수 정의)

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

// Select 스타일 정의
export const Select = styled.select`
    width: 100%;
    padding: 12px; // padding을 Input과 일치시킴
    border: 1px solid ${borderColor};
    border-radius: 4px;
    font-size: 14px;
    background-color: #fff;
    margin-top: 8px;
    margin-bottom: 16px;
    box-sizing: border-box;

    &:focus {
        border-color: ${focusColor}; // 포커스 시 테두리 색상 통일
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.3); // 그림자 효과 약간 줄임
    }
`;

