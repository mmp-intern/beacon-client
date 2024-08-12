import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import CommuteStatsTable from '../../components/table/CommuteStatsTable';
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

const CommuteStatistics = ({ period }) => {
    const getDateRange = () => {
        const now = new Date();
        let firstDay, lastDay;

        switch (period) {
            case 'week':
                firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
                lastDay = new Date(now.setDate(now.getDate() - now.getDay() + 6));
                break;
            case 'month':
                firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
                lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                break;
            case 'year':
                firstDay = new Date(now.getFullYear(), 0, 1);
                lastDay = new Date(now.getFullYear(), 11, 31);
                break;
            default:
                firstDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                lastDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                break;
        }

        return {
            firstDay: firstDay.toISOString().split('T')[0],
            lastDay: lastDay.toISOString().split('T')[0],
        };
    };

    const { firstDay, lastDay } = getDateRange();

    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState({ totalPages: 1, content: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('id');
    const [startDate, setStartDate] = useState(firstDay);
    const [endDate, setEndDate] = useState(lastDay);
    const [pageSize, setPageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState({ column: null, direction: null });

    const fetchData = async () => {
        const { column, direction } = sortConfig;
        const sortParam = column && direction ? `&sort=${column},${direction}` : '';

        try {
            const response = await apiClient.get(
                `/commutes/records?startDate=${startDate}&endDate=${endDate}&searchTerm=${searchTerm}&searchBy=${searchBy}&page=${currentPage}&size=${pageSize}${sortParam}`
            );

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

    const mainContent = (
        <div>
            <Title>{`${
                period === 'day' ? '일일' : period === 'week' ? '주간' : period === 'month' ? '월간' : '연간'
            }현황`}</Title>
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
