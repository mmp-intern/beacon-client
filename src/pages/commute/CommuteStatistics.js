import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import CommuteStatsTable from '../../components/table/CommuteStatsTable';
import SearchBarForWeek from '../../components/searchbar/SearchBarForWeek';
import SearchBarForMonth from '../../components/searchbar/SearchBarForMonth';
import SearchBarForYear from '../../components/searchbar/SearchBarForYear';
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

const CommuteStatistics = ({ period }) => {
    const now = new Date();
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState({ totalPages: 1, content: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('id');
    const [pageSize, setPageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState({ column: null, direction: null });

    // 주간, 월간, 연간 설정에 따른 기본 날짜 또는 연도
    const [startDate, setStartDate] = useState(
        () => new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString().split('T')[0]
    );
    const [endDate, setEndDate] = useState(
        () => new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 6).toISOString().split('T')[0]
    );
    const [selectedMonth, setSelectedMonth] = useState(
        () => `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    );
    const [selectedYear, setSelectedYear] = useState(() => now.getFullYear());

    const fetchData = async () => {
        const { column, direction } = sortConfig;
        const sortParam = column && direction ? `&sort=${column},${direction}` : '';

        try {
            let response;
            if (period === 'week') {
                response = await apiClient.get(
                    `/commutes/records?startDate=${startDate}&endDate=${endDate}&searchTerm=${searchTerm}&searchBy=${searchBy}&page=${currentPage}&size=${pageSize}${sortParam}`
                );
            } else if (period === 'month') {
                response = await apiClient.get(
                    `/commutes/records?month=${selectedMonth}&searchTerm=${searchTerm}&searchBy=${searchBy}&page=${currentPage}&size=${pageSize}${sortParam}`
                );
            } else if (period === 'year') {
                response = await apiClient.get(
                    `/commutes/records?year=${selectedYear}&searchTerm=${searchTerm}&searchBy=${searchBy}&page=${currentPage}&size=${pageSize}${sortParam}`
                );
            }
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize, sortConfig]);

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

    const renderSearchBar = () => {
        if (period === 'week') {
            return (
                <SearchBarForWeek
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
            );
        } else if (period === 'month') {
            return (
                <SearchBarForMonth
                    searchBy={searchBy}
                    setSearchBy={setSearchBy}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    handleSearch={handleSearch}
                />
            );
        } else if (period === 'year') {
            return (
                <SearchBarForYear
                    searchBy={searchBy}
                    setSearchBy={setSearchBy}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    handleSearch={handleSearch}
                />
            );
        }
    };

    const mainContent = (
        <div>
            <Title>{`${
                period === 'day' ? '일일' : period === 'week' ? '주간' : period === 'month' ? '월간' : '연간'
            } 현황`}</Title>
            {renderSearchBar()}
            <PageSizeContainer>
                <PageSizeLabel>페이지당</PageSizeLabel>
                <PageSizeSelect value={pageSize} onChange={handlePageSizeChange}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50}</option>
                    <option value={100}>100</option>
                </PageSizeSelect>
                <PageSizeLabel>개씩 보기</PageSizeLabel>
            </PageSizeContainer>
            <CommuteStatsTable
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

export default CommuteStatistics;
