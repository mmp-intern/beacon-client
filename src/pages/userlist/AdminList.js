import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/layout/Layout';
import UserListTable from '../../components/table/AdminListTable'; // 재사용 가능한 테이블 컴포넌트
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

const AdminListPage = () => {
    const { user } = useAuth(); 
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState({ totalPages: 1, content: [] });
    const [pageSize, setPageSize] = useState(10);

    const fetchData = useCallback(async () => {
        try {
            const response = await apiClient.get(
                `/getadmins?page=${currentPage}&size=${pageSize}`
            );
    
            console.log('Fetched data:', response.data);
    
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [currentPage, pageSize]);

    useEffect(() => {
        fetchData(); 
    }, [fetchData, currentPage, pageSize]);

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
            <Title>관리자 정보 관리</Title>
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

export default AdminListPage;
