import React from 'react';
import { AdminDeleteButtonStyle } from './ButtonStyles';

const AdminDeleteButton = ({ userId, onDelete, disabled }) => {
    const handleDelete = () => {
        if (window.confirm(`"${userId}" 사용자를 삭제하시겠습니까?`)) {
            onDelete(userId);
        }
    };

    return (
        <AdminDeleteButtonStyle onClick={handleDelete} disabled={disabled}>
            삭제
        </AdminDeleteButtonStyle>
    );
};

export default AdminDeleteButton;
