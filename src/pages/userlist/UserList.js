import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import UserListTable from '../../components/table/UserListTable'; // 새로운 유저 리스트 테이블 컴포넌트
import SearchBar from '../../components/searchbar/SearchBar'; // 새로운 검색 바 컴포넌트
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
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState({ totalPages: 1, content: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('id'); // 검색 기준을 'id'로 설정
    const [pageSize, setPageSize] = useState(10);

    const fetchData = async () => {
        try {
            const response = await apiClient.get(
                `/getusers?page=${currentPage}&size=${pageSize}&searchTerm=${searchTerm}&searchBy=${searchBy}`
            );
    
            console.log('Fetched data:', response.data);
    
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // 페이지나 페이지 크기가 변경될 때만 데이터를 다시 가져옵니다.
    }, [currentPage, pageSize]);

    const handleSearch = () => {
        setCurrentPage(0); // 검색 시 첫 페이지로 이동
        fetchData(); // 검색 버튼을 클릭했을 때만 데이터 요청
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(0);
    };

    const leftContent = (
        <div>
            <SubTitle>관리자 메뉴</SubTitle>
            <Divider />
            <StyledNavLink to="/userlist" activeClassName="active">
                회원 목록 조회
            </StyledNavLink>
            <StyledNavLink to="/users" activeClassName="active">
                사용자 계정 생성
            </StyledNavLink>
            <StyledNavLink to="/admin" activeClassName="active">
                관리자 계정 생성
            </StyledNavLink>
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
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                pageSize={pageSize}
            />
        </div>
    );

    return <Layout leftContent={leftContent} mainContent={mainContent} />;
};

export default UserListPage;
