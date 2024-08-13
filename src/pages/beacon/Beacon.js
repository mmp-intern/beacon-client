import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import Layout from '../../components/layout/Layout';
import BeaconTable from '../../components/table/BeaconTable'; // 비콘 테이블 컴포넌트
import SearchBar from '../../components/searchbar/SearchBar'; // 검색 바 컴포넌트
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
    const [sortConfig, setSortConfig] = useState({ column: null, direction: null });

    const navigate = useNavigate(); // useNavigate 훅 사용

    const fetchData = useCallback(async () => {
        const { column, direction } = sortConfig;
        const sortParam = column && direction ? `&sort=${column},${direction}` : '';

        try {
            const response = await apiClient.get(
                `/beacons?searchTerm=${searchTerm}&searchBy=${searchBy}&page=${currentPage}&size=${pageSize}${sortParam}`
            );

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [sortConfig, searchTerm, searchBy, currentPage, pageSize]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSearch = () => {
        setCurrentPage(0);
        fetchData();
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(0);
    };

    const handleSort = (column) => {
        let direction = 'asc';
        if (sortConfig.column === column) {
            direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        }
        setSortConfig({ column, direction });
        setCurrentPage(0);
    };

    const handleRegister = (userId, beaconId) => {
        if (!userId || !beaconId) return;
        console.log(`Registering beacon ${beaconId} for user ID: ${userId}`);
        // 비콘과 userId 매칭 로직 추가
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
        navigate('/registerBeacon'); // 등록 버튼 클릭 시 비콘 등록 페이지로 이동
    };

    const leftContent = (
        <div>
            <SubTitle>비콘 관리</SubTitle>
            <Divider />
            <StyledNavLink to="/beacon" activeClassName="active">
                비콘 리스트 조회
            </StyledNavLink>
            <StyledNavLink to="/registerBeacon" activeClassName="active">
                비콘 정보 등록
            </StyledNavLink>
            <StyledNavLink to="/registerbeacon" activeClassName="active">
                비콘 정보 수정
            </StyledNavLink>
        </div>
    );

    const mainContent = (
        <div>
            <Title>비콘 리스트 조회</Title>
            <SearchBar
                searchBy={searchBy}
                setSearchBy={setSearchBy}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
            />
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
                sortConfig={sortConfig}
                handleSort={handleSort}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                pageSize={pageSize}
                handleRegister={handleRegisterClick} // 등록 버튼 클릭 시 리다이렉트
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default BeaconManagementPage;
