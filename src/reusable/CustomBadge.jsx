// ============================================
// REUSABLE BADGE / STATUS TAG COMPONENT
// ============================================
import React from 'react';

const CustomBadge = ({
    children,
    variant = 'neutral',
    size = 'md',
    className = '',
}) => {
    const variants = {
        success: 'bg-green-100 text-green-700 border-green-200',
        warning: 'bg-amber-100 text-amber-700 border-amber-200',
        danger: 'bg-red-100 text-red-700 border-red-200',
        info: 'bg-blue-100 text-blue-700 border-blue-200',
        neutral: 'bg-gray-100 text-gray-700 border-gray-200',
    };

    const sizes = {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    return (
        <span
            className={`inline-flex items-center font-bold rounded-full border
                ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </span>
    );
};

export default CustomBadge;
