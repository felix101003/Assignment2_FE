// ============================================
// REUSABLE RADIO GROUP COMPONENT
// ============================================
import React from 'react';

const CustomRadio = ({
    label = '',
    name,
    options = [],
    value,
    onChange,
    direction = 'vertical',
    disabled = false,
    className = '',
}) => {
    const layout = direction === 'horizontal'
        ? 'flex flex-wrap gap-6'
        : 'flex flex-col gap-3';

    return (
        <fieldset className={`flex flex-col gap-3 w-full ${className}`} disabled={disabled}>
            {label && (
                <legend className="text-sm font-semibold text-gray-700">{label}</legend>
            )}

            <div className={layout}>
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={`inline-flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                            disabled={disabled}
                            className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-base text-gray-700">{option.label}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
};

export default CustomRadio;
