import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import CommuteRecordsTable from '../../components/table/CommuteRecordsTable';
import SearchBarWithPeriod from '../../components/searchbar/SearchBarWithPeriod';
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

const CommuteRecords = () => {
    const getCurrentMonthDates = () => {
        const now = new Date();
        const firstDay = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1)).toISOString().split('T')[0];
        const lastDay = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 0)).toISOString().split('T')[0];
        return { firstDay, lastDay };
    };

    const { firstDay, lastDay } = getCurrentMonthDates();

    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState({ totalPages: 1, content: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('id');
    const [startDate, setStartDate] = useState(firstDay);
    const [endDate, setEndDate] = useState(lastDay);
    const [pageSize, setPageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState({ column: null, direction: null });

    const fetchData = async (newPage = currentPage) => {
        const { column, direction } = sortConfig;
        const sortParam = column && direction ? `&sort=${column},${direction}` : '';

        try {
            const response = await apiClient.get(
                `/commutes/records?startDate=${startDate}&endDate=${endDate}&searchTerm=${searchTerm}&searchBy=${searchBy}&page=${newPage}&size=${pageSize}${sortParam}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Fetched data:', result);
            setData(result); // 새로운 데이터로 덮어씌우기
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(0); // 페이지를 변경할 때 데이터를 새로 가져오도록 설정
    }, [searchTerm, searchBy, startDate, endDate, pageSize, sortConfig]);

    useEffect(() => {
        fetchData(); // 페이지 변경 시 데이터를 새로 가져오도록 설정
    }, [currentPage]);

    const handleSearch = () => {
        setCurrentPage(0);
        fetchData(0); // 검색 시 첫 페이지의 데이터를 가져오도록 설정
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchData(newPage); // 페이지 변경 시 해당 페이지의 데이터를 가져오도록 설정
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(0);
        fetchData(0); // 페이지 크기 변경 시 첫 페이지의 데이터를 가져오도록 설정
    };

    const handleSort = (column) => {
        let direction = 'asc';
        if (sortConfig.column === column) {
            if (sortConfig.direction === 'asc') {
                direction = 'desc';
            } else {
                column = null;
                direction = null;
            }
        }
        setSortConfig({ column, direction });
        setCurrentPage(0);
        fetchData(0); // 정렬 변경 시 첫 페이지의 데이터를 가져오도록 설정
    };

    const leftContent = (
        <div>
            <SubTitle>통근 관리</SubTitle>
            <Divider />
            <StyledNavLink to="/commute" activeClassName="active">
                특정 날짜 근태
            </StyledNavLink>
            <StyledNavLink to="/commute-records" activeClassName="active">
                특정 기간 근태
            </StyledNavLink>
            <StyledNavLink to="/statistics" activeClassName="active">
                특정 기간 근태 통계
            </StyledNavLink>
        </div>
    );

    const mainContent = (
        <div>
            <Title>특정 기간 근태</Title>
            <SearchBarWithPeriod
                searchBy={searchBy}
                setSearchBy={setSearchBy}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
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
            <CommuteRecordsTable
                data={data}
                sortConfig={sortConfig}
                handleSort={handleSort}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                pageSize={pageSize}
            />
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default CommuteRecords;
