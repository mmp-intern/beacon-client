import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import CommuteDetailTable from '../../components/table/CommuteDetailTable';
import { Title, SubTitle, Divider, StyledNavLink, Button, ButtonContainer } from '../../styles/common/Typography';
import apiClient from '../../apiClient';
import { useAuth } from '../../AuthContext';

const CommuteDetail = () => {
    const { commuteId } = useParams();
    const [detail, setDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

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

    useEffect(() => {
        if (!isLoading && isError) {
            alert('상세 데이터를 불러올 수 없습니다. 이전 페이지로 돌아갑니다.');
            navigate(-1);
        }
    }, [isLoading, isError, navigate]);

    const handleEdit = () => {
        navigate(`/commute/${commuteId}/edit`);
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
            <Title>근태 상세 정보</Title>
            <CommuteDetailTable detail={detail} />
            {user && (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') && (
                <ButtonContainer>
                    <Button onClick={handleEdit}>수정</Button>
                </ButtonContainer>
            )}
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default CommuteDetail;
