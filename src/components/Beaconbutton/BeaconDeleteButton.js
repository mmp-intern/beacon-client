// BeaconDeleteButton.js
import React from 'react';
import { BeaconDeleteButtonStyle } from './ButtonStyles';

const BeaconDeleteButton = ({ beaconId, macAddr, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm(`"${macAddr}" 비콘을 삭제하시겠습니까?`)) {
            onDelete(beaconId);
        }
    };

    return (
        <BeaconDeleteButtonStyle onClick={handleDelete} disabled={!beaconId}>
            삭제
        </BeaconDeleteButtonStyle>
    );
};

export default BeaconDeleteButton;
