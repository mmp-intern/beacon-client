import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import UserListTable from '../../components/table/UserListTable'; // 새로운 유저 리스트 테이블 컴포넌트
import SearchBar from '../../components/searchbar/SearchBar'; // 새로운 검색 바 컴포넌트
import { useAuth } from '../../AuthContext';
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

const UserListPage = () => {
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState({ totalPages: 1, content: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('userId'); // 검색 기준 (예: userId, name 등)
    const [pageSize, setPageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState({ column: null, direction: null });

    const fetchData = async () => {
        const { column, direction } = sortConfig;
        const sortParam = column && direction ? `&sort=${column},${direction}` : '';

        try {
            const response = await apiClient.get(
                `/users?searchTerm=${searchTerm}&searchBy=${searchBy}&page=${currentPage}&size=${pageSize}${sortParam}`
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
            <SubTitle>관리자 메뉴</SubTitle>
            <Divider />
            <StyledNavLink to="/userlist" activeClassName="active">
                회원 목록 조회
            </StyledNavLink>
            <StyledNavLink to="/profile/${userId}" activeClassName="active">
                회원 프로필 조회
            </StyledNavLink>
            <StyledNavLink to="/users" activeClassName="active">
                사용자 계정 생성
            </StyledNavLink>
            
            {user && user.role === 'SUPER_ADMIN' && ( // 슈퍼관리자인 경우에만 링크 표시
                <StyledNavLink to="/admin" activeClassName="active">
                    관리자 계정 생성
                </StyledNavLink>
            )}
        </div>
    );

    const mainContent = (
        <div>
            <Title>회원 목록 조회</Title>
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
            <UserListTable
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

export default UserListPage;
