import React from 'react';
import { Table, SortArrows, SortArrowUp, SortArrowDown } from './TableStyles';
import Pagination from '../pagination/Pagination';

const CommuteTable = ({ data, sortConfig, handleSort, currentPage, handlePageChange, pageSize, onRecordClick }) => {
    const currentData = data.content;

    const columns = [
        { key: 'id', label: '번호' },
        { key: 'userId', label: '아이디' },
        { key: 'name', label: '사원명' },
        { key: 'startedAt', label: '출근 시간' },
        { key: 'endedAt', label: '퇴근 시간' },
        { key: 'attendanceStatus', label: '상태' },
        { key: 'workStatus', label: '업무 상태' },
    ];

    const mapAttendanceStatus = (status) => {
        switch (status) {
            case 'PRESENT':
                return '출근';
            case 'LATE':
                return '지각';
            case 'ABSENT':
                return '결근';
            default:
                return '-';
        }
    };

    const mapWorkStatus = (status) => {
        switch (status) {
            case 'IN_OFFICE':
                return '업무 중';
            case 'OUT_OFF_OFFICE':
                return '업무 외';
            default:
                return '-';
        }
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
                    {currentData.map((item, index) => {
                        const commute = item.commute;
                        return (
                            <tr
                                key={item.user.id}
                                onClick={() => commute && onRecordClick(commute.id)}
                                style={{ cursor: commute ? 'pointer' : 'default' }}
                            >
                                <td>{index + 1 + currentPage * pageSize}</td>
                                <td>{item.user.userId}</td>
                                <td>{item.user.name}</td>
                                <td>{commute?.startedAt || '-'}</td>
                                <td>{commute?.endedAt || '-'}</td>
                                <td>{mapAttendanceStatus(commute?.attendanceStatus)}</td>
                                <td>{mapWorkStatus(commute?.workStatus)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default CommuteTable;
