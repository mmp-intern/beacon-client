import React from 'react';
import { BeaconDeleteButtonStyle } from './ButtonStyles';

const BeaconDeleteButton = ({ onDelete, disabled }) => {
    const handleDelete = () => {
        if (window.confirm('선택된 비콘들을 삭제하시겠습니까?')) {
            onDelete();
        }
    };

    return (
        <BeaconDeleteButtonStyle onClick={handleDelete} disabled={disabled}>
            삭제
        </BeaconDeleteButtonStyle>
    );
};

export default BeaconDeleteButton;
