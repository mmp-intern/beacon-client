import React, { useState } from 'react';
import styled from 'styled-components'; 
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import { Table, SortArrows, SortArrowUp, SortArrowDown } from './TableStyles';
import Pagination from '../pagination/Pagination';
import RegisterButton from '../Beaconbutton/RegisterButton';
import EditButton from '../Beaconbutton/EditButton';
import BeaconDeleteButton from '../Beaconbutton/BeaconDeleteButton';

const BeaconTable = ({ data, sortConfig, handleSort, currentPage, handlePageChange, pageSize, handleRegister, handleEdit, handleDelete }) => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const currentData = data.content;

    const handleEditClick = () => {
        navigate('/editbeacon'); // 비콘 수정 페이지로 리다이렉트
    };

    const columns = [
        { key: 'id', label: '번호' },
        { key: 'userId', label: '아이디' },
        { key: 'name', label: '사원명' },
        { key: 'beacon', label: '비콘' },
    ];

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} onClick={() => handleSort(column.key)}>
                                {column.label}
                                <SortArrows>
                                    <SortArrowUp
                                        active={sortConfig.column === column.key && sortConfig.direction === 'asc'}
                                    />
                                    <SortArrowDown
                                        active={sortConfig.column === column.key && sortConfig.direction === 'desc'}
                                    />
                                </SortArrows>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr
                            key={item.userId}
                            style={{
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                            }}
                        >
                            <td>{index + 1 + currentPage * pageSize}</td>
                            <td>{item.userId}</td>
                            <td>{item.name}</td>
                            <td>{item.beacon}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />
            <ButtonContainer>
                <RegisterButton onClick={handleRegister} />
                <EditButton onClick={handleEditClick} />
                <BeaconDeleteButton onClick={() => handleDelete()} />
            </ButtonContainer>
        </div>
    );
};

export default BeaconTable;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end; 

    margin-top: 20px;
`;
