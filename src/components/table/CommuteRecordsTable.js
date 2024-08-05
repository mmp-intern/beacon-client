import React from 'react';
import { Table, SortArrows, SortArrowUp, SortArrowDown } from './TableStyles';
import Pagination from '../pagination/Pagination';

const CommuteRecordsTable = ({ data, sortConfig, handleSort, currentPage, handlePageChange, pageSize }) => {
    const currentData = data.content;

    const columns = [
        { key: 'id', label: '번호' },
        { key: 'userId', label: '아이디' },
        { key: 'name', label: '사원명' },
        { key: 'date', label: '날짜' },
        { key: 'startTime', label: '출근 시간' },
        { key: 'endTime', label: '퇴근 시간' },
        { key: 'attendanceStatus', label: '상태' },
        { key: 'workStatus', label: '업무 상태' },
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
                        <tr key={item.user.id}>
                            <td>{index + 1 + currentPage * pageSize}</td>
                            <td>{item.user.userId}</td>
                            <td>{item.user.name}</td>
                            <td>{item.commute ? item.commute.date : '-'}</td>
                            <td>{item.commute ? item.commute.startTime : '-'}</td>
                            <td>{item.commute ? item.commute.endTime : '-'}</td>
                            <td>{item.commute ? item.commute.attendanceStatus : '-'}</td>
                            <td>{item.commute ? item.commute.workStatus : '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default CommuteRecordsTable;
