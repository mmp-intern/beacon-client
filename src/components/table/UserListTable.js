import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import { Table, SortArrows, SortArrowUp, SortArrowDown } from './TableStyles';
import Pagination from '../pagination/Pagination';
import RegisterButton from '../Beaconbutton/RegisterButton';
import styled from 'styled-components'; 

const UserListTable = ({ data, sortConfig, handleSort, currentPage, handlePageChange, pageSize }) => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const currentData = data.content;

    const columns = [
        { key: 'id', label: '번호' },
        { key: 'userId', label: '아이디' },
        { key: 'name', label: '사원명' },
        { key: 'email', label: '이메일' },
        { key: 'phoneNumber', label: '전화번호' },
        { key: 'position', label: '직책' },
        { key: 'role', label: '역할' },
    ];

    const handleRegisterClick = () => {
        navigate('/users'); // 사용자 계정 생성 페이지로 리다이렉트
    };

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
                        <tr key={item.userId}>
                            <td>{index + 1 + currentPage * pageSize}</td>
                            <td>{item.userId}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.position}</td>
                            <td>{item.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />
            <ButtonContainer>
                <RegisterButton onClick={handleRegisterClick} /> {/* 비콘 등록 버튼을 사용자 계정 생성 버튼으로 사용 */}
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
