import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { FormWrapper, FormRow, Label, Input } from '../../styles/common/FormStyles';
import { Select } from '../../components/searchbar/SearchBarStyles';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import { ButtonContainer, Button } from '../../styles/common/ButtonStyles';
import apiClient from '../../apiClient';

const CommuteEdit = () => {
    const { commuteId } = useParams();
    const [formData, setFormData] = useState({
        date: '',
        startedAt: '',
        endedAt: '',
        attendanceStatus: '',
        workStatus: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    // 기존 근태 정보 로드
    const fetchCommuteDetail = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get(`/commutes/${commuteId}`);
            setFormData({
                date: response.data.commute.date,
                startedAt: response.data.commute.startedAt || '',
                endedAt: response.data.commute.endedAt || '',
                attendanceStatus: response.data.commute.attendanceStatus,
                workStatus: response.data.commute.workStatus,
            });
        } catch (error) {
            setIsError(true);
            console.error('Error fetching commute detail:', error);
        } finally {
            setIsLoading(false);
        }
    }, [commuteId]);

    useEffect(() => {
        fetchCommuteDetail();
    }, [fetchCommuteDetail]);

    // 인풋 필드 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('정말 수정하시겠습니까?');
        if (!isConfirmed) {
            return; // 사용자가 취소를 누르면 아무 작업도 하지 않음
        }
        try {
            await apiClient.patch(`/commutes/${commuteId}`, formData);
            alert('근태 정보가 성공적으로 수정되었습니다.');
            navigate(`/commute/${commuteId}`); // 수정 완료 후 상세 페이지로 이동
        } catch (error) {
            console.error('Error updating commute:', error);
            alert('근태 정보 수정에 실패했습니다.');
        }
    };

    // 출결 상태 및 업무 상태 맵핑
    const attendanceOptions = [
        { label: '출근', value: 'PRESENT' },
        { label: '지각', value: 'LATE' },
        { label: '결근', value: 'ABSENT' },
    ];

    const workStatusOptions = [
        { label: '업무 중', value: 'IN_OFFICE' },
        { label: '업무 외', value: 'OUT_OFF_OFFICE' },
    ];

    const leftContent = (
        <div>
            <SubTitle>통근 관리</SubTitle>
            <Divider />
            <StyledNavLink to="/" activeClassName="active">
                일일현황
            </StyledNavLink>
            <StyledNavLink to="/commute-week" activeClassName="active">
                주간현황
            </StyledNavLink>
            <StyledNavLink to="/commute-month" activeClassName="active">
                월간현황
            </StyledNavLink>
            <StyledNavLink to="/commute-year" activeClassName="active">
                연간현황
            </StyledNavLink>
        </div>
    );

    const mainContent = (
        <FormWrapper>
            <Title>근태 정보 수정</Title>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>근태 정보를 불러오는 데 실패했습니다.</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <FormRow>
                        <Label>날짜</Label>
                        <Input type="date" name="date" value={formData.date} disabled />
                    </FormRow>
                    <FormRow>
                        <Label>출근 시간</Label>
                        <Input type="time" name="startedAt" value={formData.startedAt} onChange={handleChange} />
                    </FormRow>
                    <FormRow>
                        <Label>퇴근 시간</Label>
                        <Input type="time" name="endedAt" value={formData.endedAt} onChange={handleChange} />
                    </FormRow>
                    <FormRow>
                        <Label>출결 상태</Label>
                        <Select name="attendanceStatus" value={formData.attendanceStatus} onChange={handleChange}>
                            {attendanceOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </FormRow>
                    <FormRow>
                        <Label>업무 상태</Label>
                        <Select name="workStatus" value={formData.workStatus} onChange={handleChange}>
                            {workStatusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </FormRow>
                    <ButtonContainer>
                        <Button type="submit">수정</Button>
                    </ButtonContainer>
                </form>
            )}
        </FormWrapper>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default CommuteEdit;
