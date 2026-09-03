// ============================================
// REUSABLE LOADING SPINNER COMPONENT
// ============================================
import React from 'react';

const CustomSpinner = ({
    size = 'md',
    label = 'Loading...',
    fullScreen = false,
    className = '',
}) => {
    const sizes = {
        sm: 'h-6 w-6 border-2',
        md: 'h-10 w-10 border-4',
        lg: 'h-14 w-14 border-4',
    };

    const spinner = (
        <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
            <div
                className={`animate-spin rounded-full border-blue-600 border-t-transparent ${sizes[size]}`}
                role="status"
                aria-label={label}
            />
            {label && <p className="text-gray-500 text-base">{label}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                {spinner}
            </div>
        );
    }

    return spinner;
};

export default CustomSpinner;
