import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/Product/ProductSlice';
import cartReducer from  '../features/Cart/CartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
})