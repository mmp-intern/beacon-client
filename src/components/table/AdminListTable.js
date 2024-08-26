import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from './TableStyles';
import Pagination from '../pagination/Pagination';
import RegisterButton from '../Beaconbutton/RegisterButton';
import AdminDeleteButton from '../Beaconbutton/AdminDeleteButton';
import styled from 'styled-components';
import apiClient from '../../apiClient';

const UserListTable = ({ data, currentPage, handlePageChange, pageSize }) => {
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null);

    const currentData = data.content;

    const columns = [
        { key: 'id', label: '번호' },
        { key: 'userId', label: '아이디' },
    ];

    const handleRegisterClick = () => {
        navigate('/admin');
    };

    const handleRowClick = (id) => {
        setSelectedRow(selectedRow === id ? null : id);
    };

    const handleDeleteClick = async (userId) => {
        if (!userId) return;

        try {
            const response = await apiClient.delete(`/users/${userId}`);
            if (response.status === 200) {
                alert('관리자 삭제 완료');
                setSelectedRow(null);
                window.location.reload(); 
            } else {
                alert('관리자 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('관리자 삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr
                            key={item.id}
                            onClick={() => handleRowClick(item.userId)} 
                            style={{
                                backgroundColor: selectedRow === item.userId ? '#f0f0f0' : 'transparent',
                                cursor: 'pointer',
                            }}
                        >
                            <td>{index + 1 + currentPage * pageSize}</td>
                            <td>{item.userId || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />
            <ButtonContainer>
                <RegisterButton onClick={handleRegisterClick} />
                <AdminDeleteButton 
                    userId={selectedRow} 
                    onDelete={handleDeleteClick} 
                    disabled={!selectedRow} 
                />
            </ButtonContainer>
        </div>
    );
};

export default UserListTable;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    & > *:not(:last-child) {
        margin-right: 10px;
    }
`;
