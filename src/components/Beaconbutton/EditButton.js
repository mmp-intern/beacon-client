import React from 'react';
import { EditButtonStyle } from './ButtonStyles'; // 수정 버튼 스타일 임포트

const EditButton = ({ onClick, disabled }) => {
    return (
        <EditButtonStyle onClick={onClick} disabled={disabled}>
            수정
        </EditButtonStyle>
    );
};

export default EditButton;
