import React from 'react';
import { Table, SortArrows, SortArrowUp, SortArrowDown } from './TableStyles';
import Pagination from '../pagination/Pagination';

const CommuteStatsTable = ({ data, sortConfig, handleSort, currentPage, handlePageChange, pageSize }) => {
    const currentData = data.content;

    const columns = [
        { key: 'id', label: '번호' },
        { key: 'userInfo.userId', label: '아이디' },
        { key: 'userInfo.name', label: '사원명' },
        { key: 'statistics.presentDays', label: '출근 일수' },
        { key: 'statistics.lateDays', label: '지각 일수' },
        { key: 'statistics.absentDays', label: '결근 일수' },
        { key: 'statistics.totalDays', label: '총 근무 일수' },
    ];

    const getValueByKey = (obj, key) => {
        const value = key.split('.').reduce((acc, part) => acc && acc[part], obj);
        return value === undefined || value === null ? '-' : value === 0 ? '0' : value;
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
                        <tr key={item.userInfo.id}>
                            <td>{index + 1 + currentPage * pageSize}</td>
                            <td>{item.userInfo.userId}</td>
                            <td>{item.userInfo.name}</td>
                            <td>{getValueByKey(item, 'statistics.presentDays')}</td>
                            <td>{getValueByKey(item, 'statistics.lateDays')}</td>
                            <td>{getValueByKey(item, 'statistics.absentDays')}</td>
                            <td>{getValueByKey(item, 'statistics.totalDays')}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default CommuteStatsTable;
