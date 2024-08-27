import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from './TableStyles';
import Pagination from '../pagination/Pagination';

const UserListTable = ({ data, currentPage, handlePageChange, pageSize }) => {
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null);

    const currentData = data.content;

    const columns = [
        { key: 'id', label: '번호' },
        { key: 'userId', label: '아이디' },
    ];

    const handleRowClick = (userId) => {
        setSelectedRow(selectedRow === userId ? null : userId);
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
        </div>
    );
};

export default UserListTable;
