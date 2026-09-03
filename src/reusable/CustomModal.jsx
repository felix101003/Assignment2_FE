// ============================================
// REUSABLE MODAL / DIALOG COMPONENT
// ============================================
import React, { useEffect } from 'react';
import CustomButton from './CustomButton';

const CustomModal = ({
    isOpen,
    onClose,
    title = '',
    children,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    showActions = true,
    size = 'md',
}) => {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
                type="button"
                aria-label="Close modal overlay"
                onClick={onClose}
                className="absolute inset-0 bg-black/50 cursor-pointer"
            />

            <div className={`relative w-full ${sizes[size]} bg-white rounded-xl shadow-xl border border-gray-200`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                <div className="px-6 py-5 text-gray-700">{children}</div>

                {showActions && (
                    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
                        <CustomButton variant="outline" size="sm" onClick={onClose}>
                            {cancelLabel}
                        </CustomButton>
                        {onConfirm && (
                            <CustomButton variant="primary" size="sm" onClick={onConfirm}>
                                {confirmLabel}
                            </CustomButton>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomModal;
