import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import CommuteStatsTable from '../../components/table/CommuteStatsTable';
import SearchBarForMonth from '../../components/searchbar/SearchBarForMonth';
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

const CommuteMonthlyStats = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState({ totalPages: 1, content: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('id');
    const [pageSize, setPageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState({ column: null, direction: null });
    const [startDateState, setStartDate] = useState('');
    const [endDateState, setEndDate] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const columnMapping = {
        'userInfo.id': 'id',
        'userInfo.userId': 'userId',
        'userInfo.name': 'name',
        'statistics.presentDays': 'presentDays',
        'statistics.lateDays': 'lateDays',
        'statistics.absentDays': 'absentDays',
        'statistics.totalDays': 'totalDays',
    };

    const getCurrentMonthDates = () => {
        const now = new Date();
        const firstDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString().split('T')[0];
        const lastDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)).toISOString().split('T')[0];
        return { firstDay, lastDay };
    };

    useEffect(() => {
        const { firstDay, lastDay } = getCurrentMonthDates();
        setStartDate(firstDay);
        setEndDate(lastDay);
        setSelectedMonth(firstDay.slice(0, 7));
        fetchData(firstDay, lastDay);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (startDate = startDateState, endDate = endDateState) => {
        const { column, direction } = sortConfig;
        const sortParam = column && direction ? `&sort=${columnMapping[column] || column},${direction}` : '';

        try {
            const response = await apiClient.get(
                `/commutes/statistics?startDate=${startDate}&endDate=${endDate}&searchTerm=${searchTerm}&searchBy=${searchBy}&page=${currentPage}&size=${pageSize}${sortParam}`
            );
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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

    const handleSort = (column) => {
        let direction = 'asc';
        if (sortConfig.column === column) {
            direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        }
        setSortConfig({ column, direction });
        setCurrentPage(0);
        fetchData(startDateState, endDateState);
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
            <Title>월간 현황</Title>
            <SearchBarForMonth
                searchBy={searchBy}
                setSearchBy={setSearchBy}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedMonth={selectedMonth}
                setSelectedMonth={(month) => {
                    const [year, monthNum] = month.split('-');
                    const firstDay = new Date(Date.UTC(year, monthNum - 1, 1)).toISOString().split('T')[0];
                    const lastDay = new Date(Date.UTC(year, monthNum, 0)).toISOString().split('T')[0];
                    setStartDate(firstDay);
                    setEndDate(lastDay);
                    setSelectedMonth(month);
                }}
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

export default CommuteMonthlyStats;
