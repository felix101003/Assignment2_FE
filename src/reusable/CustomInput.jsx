// ============================================
// REUSABLE INPUT / TEXT FIELD COMPONENT
// ============================================
import React from 'react';

const CustomInput = ({
    label = '',
    type = 'text',
    value,
    onChange,
    placeholder = '',
    error = '',
    helperText = '',
    size = 'md',
    disabled = false,
    required = false,
    name = '',
    className = '',
}) => {
    const sizes = {
        sm: 'px-4 py-2.5 text-sm',
        md: 'px-5 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
    };

    return (
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            {label && (
                <label className="text-sm font-semibold text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`w-full bg-white border rounded-lg shadow-sm text-gray-900 placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                    ${error ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-300 hover:border-gray-400'}
                    ${sizes[size]}`}
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
            {!error && helperText && <p className="text-sm text-gray-500">{helperText}</p>}
        </div>
    );
};

export default CustomInput;
