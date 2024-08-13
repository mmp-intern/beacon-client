// src/components/deletebutton/DeleteButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../apiClient';
import { SearchButton } from '../searchbar/SearchBarStyles'; // 버튼 스타일 가져오기

const DeleteButton = ({ userId }) => {
    const navigate = useNavigate();

    const handleDeleteUser = async () => {
        const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
        if (!isConfirmed) return;

        try {
            const response = await apiClient.delete(`/users/${userId}`);
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('사용자 삭제 완료');
            navigate('/'); 
        } catch (error) {
            console.error('Error deleting user:', error);
            const errorMessage = error.response?.data?.message || error.message || '사용자 삭제에 실패했습니다.';
            alert(`사용자 삭제에 실패했습니다: ${errorMessage}`);
        }
    };

    return <SearchButton onClick={handleDeleteUser}>사용자 삭제</SearchButton>;
};

export default DeleteButton;