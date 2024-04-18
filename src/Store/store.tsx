import { configureStore } from "@reduxjs/toolkit";
import productReducer from './Features/ProductSlice';
import cartReducer from './Features/CartSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;