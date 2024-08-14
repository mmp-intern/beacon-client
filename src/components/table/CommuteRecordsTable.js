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
        { key: 'startedAt', label: '출근 시간' },
        { key: 'endedAt', label: '퇴근 시간' },
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
                        // 사용되는 키를 item.commute.id로 변경하여 고유성 보장
                        <tr key={item.commute.id}>
                            <td>{index + 1 + currentPage * pageSize}</td>
                            <td>{item.user.userId}</td>
                            <td>{item.user.name}</td>
                            <td>{item.commute.date}</td>
                            <td>{item.commute.startedAt}</td>
                            <td>{item.commute.endedAt}</td>
                            <td>{item.commute.attendanceStatus}</td>
                            <td>{item.commute.workStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default CommuteRecordsTable;
