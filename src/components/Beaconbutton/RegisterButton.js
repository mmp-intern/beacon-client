import React from 'react';
import { RegisterButtonStyle } from './ButtonStyles'; // 등록 버튼 스타일 임포트

const RegisterButton = ({ onClick, disabled }) => {
    return (
        <RegisterButtonStyle onClick={onClick} disabled={disabled}>
            등록
        </RegisterButtonStyle>
    );
};

export default RegisterButton;
