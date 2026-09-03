// ============================================
// REDUX STORE CONFIGURATION
// Register all your slice reducers here.
// ============================================

import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../component/cart/reducer/cartReduxReducer'

export default configureStore({
    reducer: {
        cart: cartReducer,
        // Add more slices here as needed:
        // user: userReducer,
        // recipe: recipeReducer,
    },
})
