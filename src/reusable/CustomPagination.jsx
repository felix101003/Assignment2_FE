// ============================================
// REUSABLE PAGINATION COMPONENT
// ============================================
import React from 'react';
import CustomButton from './CustomButton';

const CustomPagination = ({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    className = '',
}) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
            <CustomButton
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </CustomButton>

            {pages.map((page) => (
                <CustomButton
                    key={page}
                    variant={page === currentPage ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </CustomButton>
            ))}

            <CustomButton
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </CustomButton>
        </div>
    );
};

export default CustomPagination;
