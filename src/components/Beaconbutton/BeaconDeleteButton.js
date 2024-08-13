// BeaconDeleteButton.js
import React from 'react';
import { BeaconDeleteButtonStyle } from './ButtonStyles'; // 경로가 올바른지 확인

const BeaconDeleteButton = ({ userId, beaconId, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm(`정말로 사용자 ID: ${userId}와 비콘 ID: ${beaconId}의 매핑을 삭제하시겠습니까?`)) {
            onDelete(userId, beaconId);
        }
    };

    return (
        <BeaconDeleteButtonStyle onClick={handleDelete} disabled={!userId || !beaconId}>
            삭제
        </BeaconDeleteButtonStyle>
    );
};

export default BeaconDeleteButton;
