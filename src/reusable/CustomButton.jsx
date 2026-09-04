// ============================================
// REUSABLE BUTTON COMPONENT
// ============================================
import React from 'react';

const CustomButton = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false
}) => {
    const baseStyle = "inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400",
        danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-blue-500",
        ghost: "bg-transparent hover:bg-gray-150 text-gray-700 focus:ring-gray-350"
    };

    const sizes = {
        sm: "px-6 py-3 text-sm",
        md: "px-8 py-4 text-base",
        lg: "px-10 py-5 text-lg"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
};

export default CustomButton;
