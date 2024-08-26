import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import { Table } from './TableStyles'; // 정렬 관련 컴포넌트 제거
import Pagination from '../pagination/Pagination';
import RegisterButton from '../Beaconbutton/RegisterButton';
import styled from 'styled-components'; 

const UserListTable = ({ data, currentPage, handlePageChange, pageSize }) => { 
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null);

    const currentData = data.content;

    const columns = [
        { key: 'id', label: '번호' },
        { key: 'userId', label: '아이디' },
        { key: 'name', label: '사원명' },
        { key: 'email', label: '이메일' },
        { key: 'phone', label: '전화번호' },
        { key: 'position', label: '직책' },
    ];

    const handleRegisterClick = () => {
        navigate('/users'); 
    };

    const handleRowClick = (id) => {
        if (selectedRow === id) {
            setSelectedRow(null);
        } else {
            setSelectedRow(id);
        }
    };

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
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
                            onClick={() => handleRowClick(item.id)}
                            style={{
                                backgroundColor: selectedRow === item.id ? '#f0f0f0' : 'transparent',
                                cursor: 'pointer',
                            }}
                            
                        >
                            <td>{index + 1 + currentPage * pageSize}</td>
                            <td 
                                style={{ cursor: 'pointer', color: 'blue' }} 
                                onClick={() => handleUserClick(item.userId)}
                            >
                                {item.userId || '-'}
                            </td>
                            <td>{item.name || '-'}</td>
                            <td>{item.email || '-'}</td>
                            <td>{item.phone || '-'}</td>
                            <td>{item.position || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />
            <ButtonContainer>
                <RegisterButton onClick={handleRegisterClick} />
            </ButtonContainer>
        </div>
    );
};

export default UserListTable;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;
