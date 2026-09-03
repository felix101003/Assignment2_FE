// ============================================
// REUSABLE ALERT / TOAST COMPONENT
// ============================================
import React, { useEffect } from 'react';

const CustomAlert = ({
    message,
    title = '',
    variant = 'info',
    onClose,
    toast = false,
    autoDismiss = false,
    dismissAfter = 4000,
    className = '',
}) => {
    useEffect(() => {
        if (!autoDismiss || !onClose) return undefined;

        const timer = setTimeout(onClose, dismissAfter);
        return () => clearTimeout(timer);
    }, [autoDismiss, dismissAfter, onClose]);

    const variants = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-amber-50 border-amber-200 text-amber-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
    };

    return (
        <div
            className={`flex items-start gap-3 border rounded-lg px-5 py-4 shadow-sm
                ${variants[variant]}
                ${toast ? 'fixed top-6 right-6 z-50 max-w-sm w-full' : 'w-full'}
                ${className}`}
            role="alert"
        >
            <span className="text-lg font-bold leading-none mt-0.5">{icons[variant]}</span>

            <div className="flex-1">
                {title && <p className="font-bold mb-1">{title}</p>}
                <p className="text-sm">{message}</p>
            </div>

            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Dismiss alert"
                    className="text-current opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default CustomAlert;
