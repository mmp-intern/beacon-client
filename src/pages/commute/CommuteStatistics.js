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
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState({ totalPages: 1, content: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('id');
    const [pageSize, setPageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState({ column: null, direction: null });

    const columnMapping = {
        'userInfo.id': 'id',
        'userInfo.userId': 'userId',
        'userInfo.name': 'name',
        'statistics.presentDays': 'presentDays',
        'statistics.lateDays': 'lateDays',
        'statistics.absentDays': 'absentDays',
        'statistics.totalDays': 'totalDays',
    };

    const getCurrentYearDates = () => {
        const now = new Date();
        const firstDay = new Date(Date.UTC(now.getUTCFullYear(), 0, 1)).toISOString().split('T')[0];
        const lastDay = new Date(Date.UTC(now.getUTCFullYear(), 11, 31)).toISOString().split('T')[0];
        return { firstDay, lastDay };
    };

    const getCurrentMonthDates = () => {
        const now = new Date();
        const firstDay = new Date(now.getUTCFullYear(), now.getUTCMonth(), 1).toISOString().split('T')[0];
        const lastDay = new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 0).toISOString().split('T')[0];
        return { firstDay, lastDay };
    };

    const calculateStartAndEndDate = (currentPeriod) => {
        const now = new Date();
        if (currentPeriod === 'week') {
            const currentDay = now.getUTCDay();
            const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
            const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + mondayOffset));
            const sunday = new Date(monday);
            sunday.setUTCDate(monday.getUTCDate() + 6);

            return {
                startDate: monday.toISOString().split('T')[0],
                endDate: sunday.toISOString().split('T')[0],
            };
        } else if (currentPeriod === 'month') {
            return getCurrentMonthDates();
        } else if (currentPeriod === 'year') {
            return getCurrentYearDates();
        }
    };

    const [startDateState, setStartDate] = useState('');
    const [endDateState, setEndDate] = useState('');

    useEffect(() => {
        const { startDate, endDate } = calculateStartAndEndDate(period);
        setStartDate(startDate);
        setEndDate(endDate);
        fetchData(startDate, endDate);
    }, [period]);

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
        fetchData(); // 검색 버튼을 눌렀을 때 데이터를 가져옴
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchData(); // 페이지가 변경될 때 데이터를 다시 가져옴
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(0);
        fetchData(); // 페이지 크기가 변경될 때 데이터를 다시 가져옴
    };

    const handleSort = (column) => {
        let direction = 'asc';
        if (sortConfig.column === column) {
            direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        }
        setSortConfig({ column, direction });
        setCurrentPage(0);
        fetchData(); // 정렬이 변경될 때 데이터를 다시 가져옴
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
                    startDate={startDateState}
                    setStartDate={setStartDate}
                    endDate={endDateState}
                    setEndDate={setEndDate}
                    handleSearch={handleSearch}
                />
            );
        } else if (period === 'month') {
            const selectedMonth = startDateState ? startDateState.slice(0, 7) : '';
            return (
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
                    }}
                    handleSearch={handleSearch}
                />
            );
        } else if (period === 'year') {
            const selectedYear = startDateState ? startDateState.slice(0, 4) : '';
            return (
                <SearchBarForYear
                    searchBy={searchBy}
                    setSearchBy={setSearchBy}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedYear={selectedYear}
                    setSelectedYear={(year) => {
                        const firstDay = new Date(Date.UTC(year, 0, 1)).toISOString().split('T')[0];
                        const lastDay = new Date(Date.UTC(year, 11, 31)).toISOString().split('T')[0];
                        setStartDate(firstDay);
                        setEndDate(lastDay);
                    }}
                    handleSearch={handleSearch}
                />
            );
        }
    };

    const mainContent = (
        <div>
            <Title>{period === 'week' ? '주간 현황' : period === 'month' ? '월간 현황' : '연간 현황'}</Title>
            {renderSearchBar()}
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

// Export가 코드 블록 내에 있으면 안 되므로 최상위 레벨에 위치시킵니다.
export default CommuteStatistics;
