import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Table, SortArrows, SortArrowUp, SortArrowDown } from './TableStyles';
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
        navigate('/editbeacon', { state: { selectedMacAddr } }); // MAC 주소를 state로 전달
    };

    const handleRowClick = (id) => {
        // 동일한 행을 클릭하면 선택 해제, 그렇지 않으면 선택된 행으로 설정
        if (selectedRow === id) {
            setSelectedRow(null);
        } else {
            setSelectedRow(id);
        }
    };

    const handleDelete = async (beaconId) => {
        try {
            const response = await apiClient.delete(`/beacons/${beaconId}`);
            if (response.status === 204) {  // HTTP 204 No Content 성공 상태 확인
                alert('비콘이 성공적으로 삭제되었습니다.');
                // 삭제 후 데이터를 다시 불러오거나 상태를 갱신하는 로직 추가
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
                            <td>{item.userId || '-'}</td>  {/* userId가 null일 경우 '-' 표시 */}
                            <td>{item.userName || '-'}</td>  {/* userName이 null일 경우 '-' 표시 */}
                            <td>{item.macAddr || '-'}</td>  {/* macAddr이 null일 경우 '-' 표시 */}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />
            <ButtonContainer>
                <RegisterButton onClick={handleRegister} />
                <EditButton onClick={handleEditClick} />
                <BeaconDeleteButton 
                    onDelete={handleDelete}  // onDelete를 prop으로 전달
                    beaconId={selectedRow}   // 선택된 행의 ID를 beaconId로 전달
                    macAddr={currentData.find(item => item.id === selectedRow)?.macAddr} // 선택된 행의 MAC 주소를 macAddr로 전달
                    disabled={!selectedRow}  // 선택된 행이 없으면 비활성화
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