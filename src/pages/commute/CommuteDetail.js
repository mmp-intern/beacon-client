import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import apiClient from '../../apiClient';

const CommuteDetail = () => {
    const { recordId } = useParams();
    const [record, setRecord] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchRecord = async () => {
        try {
            const response = await apiClient.get(`/commutes/${recordId}`);
            setRecord(response.data);
        } catch (error) {
            console.error('Error fetching commute record', error);
        }
    };

    useEffect(() => {
        fetchRecord();
    }, [recordId]);

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setRecord({ ...record, [field]: value });
    };

    const handleSave = async () => {
        try {
            await apiClient.put(`/commutes/${recordId}`, record);
            alert('수정이 완료되었습니다.');
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving commute record', error);
            alert('수정에 실패했습니다.');
        }
    };

    if (!record) return <div>Loading...</div>;

    return (
        <Layout>
            <h2>근태 기록 상세 정보</h2>
            <div>
                <label>ID: {record.userId}</label>
            </div>
            <div>
                <label>이름: {record.name}</label>
            </div>
            <div>
                <label>출근 시간:</label>
                {isEditing ? (
                    <input type="time" value={record.startedAt} onChange={(e) => handleInputChange(e, 'startedAt')} />
                ) : (
                    <span>{record.startedAt}</span>
                )}
            </div>
            <div>
                <label>퇴근 시간:</label>
                {isEditing ? (
                    <input type="time" value={record.endedAt} onChange={(e) => handleInputChange(e, 'endedAt')} />
                ) : (
                    <span>{record.endedAt}</span>
                )}
            </div>
            <div>
                <label>상태:</label>
                {isEditing ? (
                    <select value={record.status} onChange={(e) => handleInputChange(e, 'status')}>
                        <option value="PRESENT">출근</option>
                        <option value="ABSENT">결근</option>
                        <option value="LEAVE">휴가</option>
                    </select>
                ) : (
                    <span>{record.status}</span>
                )}
            </div>
            {isEditing ? (
                <button onClick={handleSave}>저장</button>
            ) : (
                <button onClick={() => setIsEditing(true)}>수정</button>
            )}
        </Layout>
    );
};

export default CommuteDetail;
