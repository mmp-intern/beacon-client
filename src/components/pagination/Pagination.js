import React from 'react';
import { PageButton, PaginationContainer, PageText } from './PaginationStyles';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <PaginationContainer>
            <PageText
                onClick={() => handlePageChange(0)}
                disabled={currentPage === 0}
                style={{ cursor: currentPage === 0 ? 'not-allowed' : 'pointer', opacity: currentPage === 0 ? 0.5 : 1 }}
            >
                &laquo;
            </PageText>
            <PageText
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                style={{ cursor: currentPage === 0 ? 'not-allowed' : 'pointer', opacity: currentPage === 0 ? 0.5 : 1 }}
            >
                이전
            </PageText>
            {pageNumbers.map((number) => (
                <PageButton
                    key={number}
                    onClick={() => handlePageChange(number - 1)}
                    active={number === currentPage + 1}
                    style={{ cursor: number === currentPage + 1 ? 'not-allowed' : 'pointer' }}
                    disabled={number === currentPage + 1}
                >
                    {number}
                </PageButton>
            ))}
            <PageText
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                style={{
                    cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === totalPages - 1 ? 0.5 : 1,
                }}
            >
                다음
            </PageText>
            <PageText
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
                style={{
                    cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === totalPages - 1 ? 0.5 : 1,
                }}
            >
                &raquo;
            </PageText>
        </PaginationContainer>
    );
};

export default Pagination;
