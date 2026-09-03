// ============================================
// REUSABLE CHECKBOX COMPONENT
// ============================================
import React from 'react';

const CustomCheckbox = ({
    label,
    checked,
    onChange,
    disabled = false,
    name = '',
    className = '',
}) => {
    return (
        <label className={`inline-flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            {label && <span className="text-base text-gray-700">{label}</span>}
        </label>
    );
};

export default CustomCheckbox;
