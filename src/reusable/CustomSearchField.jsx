// ============================================
// REUSABLE SEARCH FIELD COMPONENT
// ============================================
import React from 'react';

const CustomSearchField = ({
    value = '',
    onChange,
    onSearch,
    placeholder = 'Search...',
    label = '',
    size = 'md',
    className = '',
    disabled = false,
    showClearButton = true,
}) => {
    const sizes = {
        sm: 'px-4 py-2.5 text-sm',
        md: 'px-5 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSearch) {
            onSearch(value.trim());
        }
    };

    const handleClear = () => {
        onChange('');
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-2 ${className} content-center`}
        >
            {label && (
                <label className="text-sm font-semibold text-gray-700">
                    {label}
                </label>
            )}

            <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400 pointer-events-none">
                    <svg
                        className={iconSizes[size]}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                        />
                    </svg>
                </span>

                <input
                    type="search"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full pl-12 pr-12 bg-white border border-gray-300 rounded-lg shadow-sm
                        text-gray-900 placeholder:text-gray-400
                        hover:border-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                        ${sizes[size]}`}
                />

                {showClearButton && value && !disabled && (
                    <button
                        type="button"
                        onClick={handleClear}
                        aria-label="Clear search"
                        className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <svg
                            className={iconSizes[size]}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </form>
    );
};

export default CustomSearchField;
