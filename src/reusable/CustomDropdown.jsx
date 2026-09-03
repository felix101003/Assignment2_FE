// ============================================
// REUSABLE DROPDOWN COMPONENT
// ============================================
import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({
    options = [],
    value,
    onChange,
    placeholder = "Select an option",
    label = "",
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div ref={dropdownRef} className={`relative flex flex-col gap-1 w-full max-w-xs ${className}`}>
            {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer text-left"
            >
                <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg className="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none top-full">
                    {options.map((option) => (
                        <li key={option.value}>
                            <button
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-2.5 text-sm text-left hover:bg-blue-50 hover:text-blue-900 cursor-pointer transition-colors ${value === option.value ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-700"
                                    }`}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
