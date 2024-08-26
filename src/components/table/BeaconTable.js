import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Table } from './TableStyles';
import Pagination from '../pagination/Pagination';
import RegisterButton from '../Beaconbutton/RegisterButton';
import EditButton from '../Beaconbutton/EditButton';
import BeaconDeleteButton from '../Beaconbutton/BeaconDeleteButton';
import apiClient from '../../apiClient';

const BeaconTable = ({
    data,
    currentPage,
    handlePageChange,
    pageSize,
    handleRegister,
    handleEdit,
}) => {
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null);

    const currentData = data.content;

    const handleEditClick = () => {
        const selectedMacAddr = currentData.find(item => item.id === selectedRow)?.macAddr;
        navigate('/editbeacon', { state: { selectedMacAddr } });
    };

    const handleRowClick = (id) => {
        if (selectedRow === id) {
            setSelectedRow(null);
        } else {
            setSelectedRow(id);
        }
    };

    const handleDelete = async (beaconId) => {
        try {
            const response = await apiClient.delete(`/beacons/${beaconId}`);
            if (response.status === 204) {
                alert('비콘이 성공적으로 삭제되었습니다.');
                window.location.reload();  
            } else {
                alert('비콘 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error deleting beacon:', error);
            alert('비콘 삭제 중 오류가 발생했습니다.');
        }
    };
    

    const columns = [
        { key: 'id', label: '번호' },
        { key: 'userId', label: '아이디' },
        { key: 'name', label: '사원명' },
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
                            onClick={() => handleRowClick(item.id)}
                            style={{
                                backgroundColor: selectedRow === item.id ? '#f0f0f0' : 'transparent',
                                cursor: 'pointer',
                            }}
                        >
                            <td>{index + 1 + currentPage * pageSize}</td>
                            <td>{item.userId || '-'}</td>
                            <td>{item.userName || '-'}</td>
                            <td>{item.macAddr || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />
            <ButtonContainer>
                <RegisterButton onClick={handleRegister} />
                <EditButton onClick={handleEditClick} />
                <BeaconDeleteButton
                    onDelete={handleDelete}
                    beaconId={selectedRow}
                    macAddr={currentData.find(item => item.id === selectedRow)?.macAddr}
                    disabled={!selectedRow}
                />
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
