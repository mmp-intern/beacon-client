// Dashboard.js
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Pagination from '../../components/pagination/Pagination';
import { Title, SubTitle, Divider } from '../../styles/common/Typography';
import {
    Table,
    SearchContainer,
    SearchTable,
    SearchButton,
    SearchInput,
    Select,
    PageSizeContainer,
    PageSizeSelect,
    PageSizeLabel,
    SortArrows,
    SortArrowUp,
    SortArrowDown,
} from './DashboardStyles';
import API_BASE_URL from '../../config';

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState({ totalPages: 1, content: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('id');
    const [date, setDate] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState({ column: null, direction: null });

    const fetchData = async () => {
        const { column, direction } = sortConfig;
        const sortParam = column && direction ? `&sort=${column},${direction}` : '';

        try {
            const response = await fetch(
                `${API_BASE_URL}/commutes/daliy?date=${date}&searchTerm=${searchTerm}&searchBy=${searchBy}&page=${currentPage}&size=${pageSize}${sortParam}`
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

    const currentData = data.content;

    const leftContent = (
        <div>
            <SubTitle>대시보드</SubTitle>
            <Divider />
        </div>
    );

    const mainContent = (
        <div>
            <Title>대시보드</Title>
            <SearchContainer>
                <SearchTable>
                    <colgroup>
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '75%' }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>검색어</th>
                            <td>
                                <Select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                                    <option value="id">ID</option>
                                    <option value="name">이름</option>
                                </Select>
                                <SearchInput
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>일자</th>
                            <td>
                                <SearchInput type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </SearchTable>
                <SearchButton onClick={handleSearch}>검색</SearchButton>
            </SearchContainer>
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
            <Table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>
                            번호
                            <SortArrows>
                                <SortArrowUp active={sortConfig.column === 'id' && sortConfig.direction === 'asc'} />
                                <SortArrowDown active={sortConfig.column === 'id' && sortConfig.direction === 'desc'} />
                            </SortArrows>
                        </th>
                        <th onClick={() => handleSort('userId')}>
                            아이디
                            <SortArrows>
                                <SortArrowUp
                                    active={sortConfig.column === 'userId' && sortConfig.direction === 'asc'}
                                />
                                <SortArrowDown
                                    active={sortConfig.column === 'userId' && sortConfig.direction === 'desc'}
                                />
                            </SortArrows>
                        </th>
                        <th onClick={() => handleSort('name')}>
                            사원명
                            <SortArrows>
                                <SortArrowUp active={sortConfig.column === 'name' && sortConfig.direction === 'asc'} />
                                <SortArrowDown
                                    active={sortConfig.column === 'name' && sortConfig.direction === 'desc'}
                                />
                            </SortArrows>
                        </th>
                        <th onClick={() => handleSort('startTime')}>
                            출근 시간
                            <SortArrows>
                                <SortArrowUp
                                    active={sortConfig.column === 'startTime' && sortConfig.direction === 'asc'}
                                />
                                <SortArrowDown
                                    active={sortConfig.column === 'startTime' && sortConfig.direction === 'desc'}
                                />
                            </SortArrows>
                        </th>
                        <th onClick={() => handleSort('endTime')}>
                            퇴근 시간
                            <SortArrows>
                                <SortArrowUp
                                    active={sortConfig.column === 'endTime' && sortConfig.direction === 'asc'}
                                />
                                <SortArrowDown
                                    active={sortConfig.column === 'endTime' && sortConfig.direction === 'desc'}
                                />
                            </SortArrows>
                        </th>
                        <th onClick={() => handleSort('attendanceStatus')}>
                            상태
                            <SortArrows>
                                <SortArrowUp
                                    active={sortConfig.column === 'attendanceStatus' && sortConfig.direction === 'asc'}
                                />
                                <SortArrowDown
                                    active={sortConfig.column === 'attendanceStatus' && sortConfig.direction === 'desc'}
                                />
                            </SortArrows>
                        </th>
                        <th onClick={() => handleSort('workStatus')}>
                            업무 상태
                            <SortArrows>
                                <SortArrowUp
                                    active={sortConfig.column === 'workStatus' && sortConfig.direction === 'asc'}
                                />
                                <SortArrowDown
                                    active={sortConfig.column === 'workStatus' && sortConfig.direction === 'desc'}
                                />
                            </SortArrows>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr key={item.user.id}>
                            <td>{index + 1 + currentPage * pageSize}</td>
                            <td>{item.user.userId}</td>
                            <td>{item.user.name}</td>
                            <td>{item.commute ? item.commute.startTime : '-'}</td>
                            <td>{item.commute ? item.commute.endTime : '-'}</td>
                            <td>{item.commute ? item.commute.attendanceStatus : '-'}</td>
                            <td>{item.commute ? item.commute.workStatus : '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={handlePageChange} />
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default Dashboard;
