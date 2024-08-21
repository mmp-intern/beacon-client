import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerticalTable } from './TableStyles';

const CommuteDetailTable = ({ detail, isLoading, isError }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && isError) {
            alert('상세 데이터를 불러올 수 없습니다. 이전 페이지로 돌아갑니다.');
            navigate(-1);
        }
    }, [isLoading, isError, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!detail) {
        return null;
    }

    const { user, commute } = detail;

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
        <VerticalTable>
            <tbody>
                <tr>
                    <th>아이디</th>
                    <td>{user.userId}</td>
                </tr>
                <tr>
                    <th>사원명</th>
                    <td>{user.name}</td>
                </tr>
                <tr>
                    <th>날짜</th>
                    <td>{commute.date}</td>
                </tr>
                <tr>
                    <th>출근 시간</th>
                    <td>{commute.startedAt || '-'}</td>
                </tr>
                <tr>
                    <th>퇴근 시간</th>
                    <td>{commute.endedAt || '-'}</td>
                </tr>
                <tr>
                    <th>상태</th>
                    <td>{mapAttendanceStatus(commute.attendanceStatus)}</td>
                </tr>
                <tr>
                    <th>업무 상태</th>
                    <td>{mapWorkStatus(commute.workStatus)}</td>
                </tr>
            </tbody>
        </VerticalTable>
    );
};

export default CommuteDetailTable;
