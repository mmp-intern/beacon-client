import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import CommuteTable from '../../components/table/CommuteTable';
import SearchBarWithDate from '../../components/searchbar/SearchBarWithDate';
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

const Commute = () => {
    const getCurrentDate = () => {
        const now = new Date();
        return now.toISOString().split('T')[0];
    };

    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState({ totalPages: 1, content: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('id');
    const [date, setDate] = useState(getCurrentDate());
    const [pageSize, setPageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState({ column: null, direction: null });

    const fetchData = async () => {
        const { column, direction } = sortConfig;
        const sortParam = column && direction ? `&sort=${column},${direction}` : '';

        try {
            const response = await apiClient.get(
                `/commutes/daliy?date=${date}&searchTerm=${searchTerm}&searchBy=${searchBy}&page=${currentPage}&size=${pageSize}${sortParam}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Fetched data:', result);
            setData(result);
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
            if (sortConfig.direction === 'asc') {
                direction = 'desc';
            } else {
                column = null;
                direction = null;
            }
        }
        setSortConfig({ column, direction });
        setCurrentPage(0);
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
            <Title>특정 날짜 근태</Title>
            <SearchBarWithDate
                searchBy={searchBy}
                setSearchBy={setSearchBy}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                date={date}
                setDate={setDate}
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
            <CommuteTable
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

export default Commute;
