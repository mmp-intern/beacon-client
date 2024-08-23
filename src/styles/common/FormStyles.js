import styled from 'styled-components';

// 색상 변수 정의
const primaryColor = '#0066ff'; // 주 버튼 색상
const inputBorderColor = '#ddd'; // 인풋 필드 테두리 색상
const labelTextColor = '#333'; // 라벨 텍스트 색상
const placeholderColor = '#aaa'; // 플레이스홀더 텍스트 색상
const infoTextColor = '#777'; // 정보 텍스트 색상

// 공통적인 가로폭과 최대 가로폭 설정
const containerWidth = '100%';
const containerMaxWidth = '1200px';

// 전체 폼을 감싸는 컨테이너
export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: ${containerWidth};
    max-width: ${containerMaxWidth};
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
`;

// 정보 텍스트 스타일
export const InfoText = styled.p`
    font-size: 12px; /* 폰트 크기를 키워 가독성 향상 */
    color: ${infoTextColor};
    margin: 5px 0 15px;
    text-align: left;
`;

// 폼의 각 행 스타일
export const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px; /* 행 간의 여백을 늘림 */
`;

// 라벨 스타일
export const Label = styled.label`
    margin-bottom: 8px;
    font-weight: 600;
    color: ${labelTextColor};
    font-size: 15px; /* 라벨 폰트를 약간 더 키워 강조 */
    text-align: left;
`;

// 인풋 필드 스타일
export const Input = styled.input`
    padding: 12px; /* 인풋 필드 안의 여백을 늘려 터치 영역을 넓힘 */
    font-size: 14px;
    border: 1px solid ${inputBorderColor};
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        border: 2px solid ${primaryColor};
        outline: none;
    }

    &::placeholder {
        color: ${placeholderColor};
        font-size: 13px; /* 플레이스홀더 폰트 크기를 약간 증가 */
        font-style: italic;
    }
`;

// Select 스타일 정의
export const Select = styled.select`
    width: 100%;
    padding: 12px; /* padding을 Input과 일치시킴 */
    font-size: 14px;
    border: 1px solid ${inputBorderColor};
    border-radius: 8px;
    background-color: #fff;
    margin-top: 8px;
    margin-bottom: 16px;
    box-sizing: border-box;

    &:focus {
        border-color: ${primaryColor}; // 포커스 시 테두리 색상 통일
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.3); // 그림자 효과 약간 추가
    }
`;