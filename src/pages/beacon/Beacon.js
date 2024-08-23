import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import BeaconTable from '../../components/table/BeaconTable';
import SearchBar from '../../components/searchbar/SearchBar';
import {
    Title,
    SubTitle,
    Divider,
    PageSizeContainer,
    PageSizeLabel,
    PageSizeSelect,
    StyledNavLink,
} from '../../styles/common/Typography';
import apiClient from '../../apiClient';

const BeaconManagementPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState({ totalPages: 1, content: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('id');
    const [pageSize, setPageSize] = useState(10);

    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            const response = await apiClient.get(
                `/beacons?page=${currentPage}&size=${pageSize}&searchTerm=${searchTerm}&searchBy=${searchBy}`
            );

            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [searchTerm, searchBy, currentPage, pageSize]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSearch = () => {
        setCurrentPage(0);
        fetchData();
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchData();
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(0);
        fetchData();
    };

    const handleRegister = (userId, beaconId) => {
        if (!userId || !beaconId) return;
        console.log(`Registering beacon ${beaconId} for user ID: ${userId}`);
    };

    const handleEdit = (userId) => {
        if (!userId) return;
        console.log(`Edit beacon for user ID: ${userId}`);
        // 비콘 수정 로직 추가
    };

    const handleDelete = (userId) => {
        if (!userId) return;
        console.log(`Delete beacon for user ID: ${userId}`);
        // 비콘 삭제 로직 추가
    };

    const handleRegisterClick = () => {
        navigate('/registerBeacon');
    };

    const leftContent = (
        <div>
            <SubTitle>비콘 관리</SubTitle>
            <Divider />
            <StyledNavLink to="/beacon" activeClassName="active">
                비콘 목록 조회
            </StyledNavLink>
            <StyledNavLink to="/registerBeacon" activeClassName="active">
                비콘 정보 등록
            </StyledNavLink>
            <StyledNavLink to="/editbeacon" activeClassName="active">
                비콘 정보 수정
            </StyledNavLink>
        </div>
    );

    const mainContent = (
        <div>
            <Title>비콘 목록 조회</Title>
            <PageSizeContainer>
                <PageSizeLabel>페이지당</PageSizeLabel>
                <PageSizeSelect value={pageSize} onChange={handlePageSizeChange}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </PageSizeSelect>
                <PageSizeLabel>개씩 보기</PageSizeLabel>
            </PageSizeContainer>
            <BeaconTable
                data={data}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                pageSize={pageSize}
                handleRegister={handleRegisterClick}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default BeaconManagementPage;
