import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import CommuteDetailTable from '../../components/table/CommuteDetailTable';
import { Title, SubTitle, Divider, StyledNavLink, TopContainer, BackButton } from '../../styles/common/Typography';
import { Button, ButtonContainer } from '../../styles/common/ButtonStyles';
import apiClient from '../../apiClient';

const CommuteDetail = () => {
    const { commuteId } = useParams();
    const [detail, setDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    const fetchCommuteDetail = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get(`/commutes/${commuteId}`);
            setDetail(response.data);
        } catch (error) {
            setIsError(true);
            console.error('Error fetching commute detail:', error);
        } finally {
            setIsLoading(false);
        }
    }, [commuteId]);

    const fetchProfile = async () => {
        try {
            const response = await apiClient.get('/profile/me');
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    useEffect(() => {
        fetchCommuteDetail();
        fetchProfile();
    }, [fetchCommuteDetail]);

    useEffect(() => {
        if (!isLoading && isError) {
            alert('상세 데이터를 불러올 수 없습니다. 이전 페이지로 돌아갑니다.');
            navigate(-1);
        }
    }, [isLoading, isError, navigate]);

    const handleEdit = () => {
        navigate(`/commute/${commuteId}/edit`);
    };

    const handleBack = () => {
        navigate(-1);
    };

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
        <div>
            <TopContainer>
                <BackButton onClick={handleBack} />
                <Title>근태 상세 정보</Title>
            </TopContainer>

            <CommuteDetailTable detail={detail} />
            {profile && (profile.role === 'SUPER_ADMIN' || profile.role === 'ADMIN') && (
                <ButtonContainer>
                    <Button onClick={handleEdit}>수정</Button>
                </ButtonContainer>
            )}
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default CommuteDetail;
