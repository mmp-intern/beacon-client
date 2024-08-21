import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import CommuteDetailTable from '../../components/table/CommuteDetailTable';
import { Title, SubTitle, Divider, StyledNavLink } from '../../styles/common/Typography';
import apiClient from '../../apiClient';

const CommuteDetailPage = () => {
    const { commuteId } = useParams();
    const [detail, setDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchCommuteDetail = async () => {
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
    };

    useEffect(() => {
        fetchCommuteDetail();
    }, [commuteId]);

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
            <Title>근태 상세 정보</Title>
            <CommuteDetailTable detail={detail} isLoading={isLoading} isError={isError} />
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default CommuteDetailPage;
