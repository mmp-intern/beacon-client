import React, { useState } from 'react';
import styled from 'styled-components';
import { Table } from './TableStyles';
import Pagination from '../pagination/Pagination';
import BeaconDeleteButton from '../Beaconbutton/BeaconDeleteButton';
import apiClient from '../../apiClient';

const BeaconListTable = ({
    data,
    currentPage,
    handlePageChange,
    pageSize,
}) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const currentData = data.content;

    const handleCheckboxChange = (id) => {
        setSelectedRows(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(rowId => rowId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAllClick = () => {
        if (selectedRows.length === currentData.length) {
            setSelectedRows([]); // 모든 선택 취소
        } else {
            setSelectedRows(currentData.map(item => item.id)); // 모든 항목 선택
        }
    };

    const handleDeleteSelected = async () => {
        try {
            const deletePromises = selectedRows.map(beaconId =>
                apiClient.delete(`/beacons/${beaconId}`)
            );
            await Promise.all(deletePromises);
            alert('선택된 비콘들이 성공적으로 삭제되었습니다.');
            window.location.reload();  
        } catch (error) {
            console.error('Error deleting beacons:', error);
            alert('비콘 삭제 중 오류가 발생했습니다.');
        }
    };

    const columns = [
        { key: 'checkbox', label: <input type="checkbox" onChange={handleSelectAllClick} checked={selectedRows.length === currentData.length && selectedRows.length > 0} /> },
        { key: 'id', label: '번호' },
        { key: 'macAddr', label: 'MAC 주소' },
    ];

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
                            style={{
                                backgroundColor: selectedRows.includes(item.id) ? '#f0f0f0' : 'transparent',
                                cursor: 'pointer',
                            }}
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(item.id)}
                                    onChange={() => handleCheckboxChange(item.id)}
                                />
                            </td>
                            <td>{index + 1 + currentPage * pageSize}</td>
                            <td>{item.macAddr || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />
            <ButtonContainer>
                <BeaconDeleteButton
                    onDelete={handleDeleteSelected}
                    disabled={selectedRows.length === 0}
                />
            </ButtonContainer>
        </div>
    );
};

export default BeaconListTable;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;
