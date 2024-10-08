import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/layout/Layout';
import UserListTable from '../../components/table/UserListTable'; 
import SearchBar from '../../components/searchbar/SearchBarForUser'; 
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
import { useAuth } from '../../AuthContext'; 

const UserListPage = () => {
    const { user } = useAuth(); 
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState({ totalPages: 1, content: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('id'); 
    const [pageSize, setPageSize] = useState(10);

    const fetchData = useCallback(async () => {
        try {
            const response = await apiClient.get(
                `/getusers?page=${currentPage}&size=${pageSize}&searchTerm=${searchTerm}&searchBy=${searchBy}`
            );
    
            console.log('Fetched data:', response.data);
    
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [currentPage, pageSize, searchTerm, searchBy]);

  useEffect(() => {
    fetchData(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentPage, pageSize]);

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

    const leftContent = (
        <div>
            <SubTitle>관리자 메뉴</SubTitle>
            <Divider />
            <StyledNavLink to="/userlist" activeClassName="active">
                직원 정보 관리
            </StyledNavLink>
            {user && user.role === 'SUPER_ADMIN' && (
                <>
                    <StyledNavLink to="/adminlist" activeClassName="active">
                        관리자 정보 관리
                    </StyledNavLink>
                </>
            )}
            <StyledNavLink to="/users" activeClassName="active">
                직원 계정 생성
            </StyledNavLink>
            {user && user.role === 'SUPER_ADMIN' && (
                <>
                    <StyledNavLink to="/admin" activeClassName="active">
                        관리자 계정 생성
                    </StyledNavLink>
                </>
            )}
        </div>
    );
    

    const mainContent = (
        <div>
            <Title>직원 정보 관리</Title>
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
