// ============================================
// REUSABLE CARD COMPONENT
// ============================================
import React from 'react';

const CustomCard = ({
    title = '',
    subtitle = '',
    children,
    footer,
    image = '',
    onClick,
    className = '',
}) => {
    const isClickable = typeof onClick === 'function';

    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden
                ${isClickable ? 'cursor-pointer hover:shadow-md hover:border-blue-200 transition-all' : ''}
                ${className}`}
        >
            {image && (
                <img src={image} alt={title || 'Card image'} className="w-full h-40 object-cover" />
            )}

            <div className="p-6 space-y-3">
                {title && <h3 className="text-xl font-bold text-gray-900">{title}</h3>}
                {subtitle && <p className="text-gray-500 text-base">{subtitle}</p>}
                {children}
            </div>

            {footer && (
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default CustomCard;
