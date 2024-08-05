import React from 'react';
import { PageButton, PaginationContainer, PageText } from './PaginationStyles';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <PaginationContainer>
            <PageText onClick={() => onPageChange(0)} disabled={currentPage === 0}>
                &laquo;
            </PageText>
            <PageText onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>
                이전
            </PageText>
            {pageNumbers.map((number) => (
                <PageButton key={number} onClick={() => onPageChange(number - 1)} active={number === currentPage + 1}>
                    {number}
                </PageButton>
            ))}
            <PageText onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                다음
            </PageText>
            <PageText onClick={() => onPageChange(totalPages - 1)} disabled={currentPage === totalPages - 1}>
                &raquo;
            </PageText>
        </PaginationContainer>
    );
};

export default Pagination;
