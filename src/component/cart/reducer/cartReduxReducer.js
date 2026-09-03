// ============================================
// CART REDUX SLICE
// Full implementation: add, increment, decrement, remove, clearCart, toggleCart
// ============================================

import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',

    initialState: {
        cartItems: [],
        isCartOpen: false,
        total: 0,
        totalItems: 0
    },

    reducers: {

        addToCart: (state, action) => {
            const product = action.payload
            let updatedItems = []

            const isFound = state.cartItems.filter(
                obj => obj.name === product.name
            )

            if (isFound.length > 0) {
                // Product already in cart -> increase quantity
                updatedItems = state.cartItems.map(item =>
                    item.name === product.name
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            } else {
                // Product not in cart -> add with quantity 1
                updatedItems = [
                    ...state.cartItems,
                    { ...product, quantity: 1 }
                ]
            }

            return {
                ...state,
                totalItems: calculateTotalCartItemQty(updatedItems),
                cartItems: updatedItems,
                total: calculateTotalCartPrice(updatedItems)
            }
        },

        increment: (state, action) => {
            const itemName = action.payload
            const updatedItems = modifyItemQty(state.cartItems, itemName, 1)
            return {
                ...state,
                cartItems: updatedItems,
                totalItems: calculateTotalCartItemQty(updatedItems),
                total: calculateTotalCartPrice(updatedItems)
            }
        },

        decrement: (state, action) => {
            const itemName = action.payload
            const item = state.cartItems.find(i => i.name === itemName)
            if (!item) return state

            let updatedItems
            if (item.quantity === 1) {
                // Remove item entirely if quantity would go to 0
                updatedItems = state.cartItems.filter(i => i.name !== itemName)
            } else {
                updatedItems = modifyItemQty(state.cartItems, itemName, -1)
            }

            return {
                ...state,
                cartItems: updatedItems,
                totalItems: calculateTotalCartItemQty(updatedItems),
                total: calculateTotalCartPrice(updatedItems)
            }
        },

        remove: (state, action) => {
            const itemName = action.payload
            const updatedItems = state.cartItems.filter(i => i.name !== itemName)
            return {
                ...state,
                cartItems: updatedItems,
                totalItems: calculateTotalCartItemQty(updatedItems),
                total: calculateTotalCartPrice(updatedItems)
            }
        },

        clearCart: (state) => {
            return {
                ...state,
                cartItems: [],
                totalItems: 0,
                total: 0
            }
        },

        toggleCart: (state) => {
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            }
        },
    }
})

// ============================================
// HELPER FUNCTIONS
// ============================================

function calculateTotalCartPrice(items) {
    return items.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    )
}

function calculateTotalCartItemQty(items) {
    return items.reduce(
        (sum, item) => sum + item.quantity,
        0
    )
}

function modifyItemQty(items, itemName, qty) {
    return items.map(item =>
        item.name === itemName
            ? { ...item, quantity: item.quantity + qty }
            : item
    )
}

// Export action creators
export const {
    increment,
    decrement,
    addToCart,
    remove,
    clearCart,
    toggleCart,
} = cartSlice.actions

// Export reducer
export default cartSlice.reducer
