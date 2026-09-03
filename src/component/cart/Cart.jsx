// ============================================
// CART DRAWER COMPONENT
// ============================================
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, increment, decrement, remove, clearCart } from './reducer/cartReduxReducer';
import CustomButton from '../../reusable/CustomButton';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems, isCartOpen, total, totalItems } = useSelector(state => state.cart);

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => dispatch(toggleCart())}
            />

            {/* Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">

                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-150 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            🛒 Shopping Cart
                            <span className="text-sm font-normal text-gray-500">({totalItems} items)</span>
                        </h2>
                        <button
                            onClick={() => dispatch(toggleCart())}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.name} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                        <p className="text-sm font-bold text-blue-600 mt-2">
                                            {item.price.toLocaleString('vi-VN')} đ
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-between items-end">
                                        <button
                                            onClick={() => dispatch(remove(item.name))}
                                            className="text-red-500 hover:text-red-700 text-sm transition-colors cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                        <div className="flex items-center gap-2 mt-2 bg-white rounded-lg border border-gray-250 p-1">
                                            <button
                                                onClick={() => dispatch(decrement(item.name))}
                                                className="w-6 h-6 flex items-center justify-center font-bold hover:bg-gray-100 rounded text-gray-600 cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(increment(item.name))}
                                                className="w-6 h-6 flex items-center justify-center font-bold hover:bg-gray-100 rounded text-gray-600 cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                <p className="text-4xl">🛒</p>
                                <p className="mt-2 text-sm">Your cart is empty</p>
                            </div>
                        )}
                    </div>

                    {/* Footer Checkout Summary */}
                    {cartItems.length > 0 && (
                        <div className="border-t border-gray-150 p-6 bg-gray-50 space-y-4">
                            <div className="flex justify-between items-center text-base font-bold text-gray-900">
                                <span>Total Price:</span>
                                <span className="text-xl text-blue-600">{total.toLocaleString('vi-VN')} đ</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <CustomButton
                                    variant="outline"
                                    onClick={() => dispatch(clearCart())}
                                >
                                    Clear Cart
                                </CustomButton>
                                <CustomButton
                                    variant="primary"
                                    onClick={() => alert("Checkout integration placeholder!")}
                                >
                                    Checkout
                                </CustomButton>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Cart;
