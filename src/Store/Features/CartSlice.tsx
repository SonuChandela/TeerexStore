import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from '../store';
import { Product } from "./ProductSlice";

// cart product interface
export interface CartItem extends Product {
    cartQuantity?: number;
}

// cart state interface
export interface CartItemScema {
    items: CartItem[]
}

// cart initilstate
const initialState: CartItemScema = {
    items: [],
};

// cart slice 
const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // action for add product and increment cart quantity of product
        addToCart: (state, action: PayloadAction<CartItem>) => {
            // distructure id from payload
            const { id, name } = action.payload;
            // check product is already exit in cart state
            const existingProduct = state.items.find(item => item.id === id);
            if (existingProduct && existingProduct.quantity === existingProduct.cartQuantity) {
                alert(`Maximum Stock of Product is Added. ${name} Quantity limit is Execeeded.`);
                return
            }
            if (existingProduct && existingProduct.cartQuantity !== undefined && existingProduct.quantity > existingProduct.cartQuantity) {
                // if product exit in cart state then increment value of cart quantity
                existingProduct.cartQuantity += 1;
            } else if (existingProduct === undefined) {
                // add product into cart state and also add cart quantity into cart product
                state.items.push({ ...action.payload, cartQuantity: 1 });
            }
        },
        // action for subtract product quantity
        subtract: (state, action: PayloadAction<CartItem['id']>) => {
            const productId = action.payload;
            const existingProduct = state.items.find(item => item.id === productId);
            // product exist in cart state then subtract by one 
            (existingProduct && existingProduct.cartQuantity !== undefined && existingProduct.cartQuantity > 0) ? existingProduct.cartQuantity -= 1 : null;
        },
        // remover product from cart state
        removeFromCart(state, action: PayloadAction<CartItem['id']>) {
            const productId = action.payload;
            state.items = state.items.filter(item => item.id !== productId);
        },
    }
})

// select cart items
const selectCartItems = (state: RootState) => state.cart.items;
// create a selector for calcuate total amount 
export const selectSubtotal = createSelector(
    [selectCartItems],
    items => {
        return items?.reduce((total, item) => {
            const quantity = item.cartQuantity ?? 0;
            return total + (item.price * quantity);
        }, 0);

    }
);

export const { addToCart, subtract, removeFromCart } = CartSlice.actions;
export default CartSlice.reducer;