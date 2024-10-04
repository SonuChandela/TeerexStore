import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        // action for add product and increment cart quantity of product
        addToCart:(state,action) => {

            let { id, name } = action.payload;

            const existedItem = state.items.find(item => item.id === id);

            if (existedItem && existedItem.cartQuantity >= existedItem.quantity) {
                alert(`${name} is out of stock.`);
                return
            }

            if (existedItem && existedItem.cartQuantity < existedItem.quantity) {
                existedItem.cartQuantity += 1;
            }

            if(!existedItem){
                state.items.push({ 
                    ...action.payload,    
                    cartQuantity:1,
                });
            }
        },
        // action for subtract product quantity
        subtract: (state, action) => {
            const productId = action.payload;
            const existedItem = state.items.find(item => item.id === productId);
            const existedItemIndex = state.items.findIndex(item => item.id === productId);
            (existedItem?.cartQuantity > 1) ? existedItem.cartQuantity -= 1: state.items.splice(existedItemIndex, 1);
        },
        // remove item from cart
        removeItem(state, action) {
            const productId = action.payload;
            state.items = state.items.filter(item => item.id !== productId);
        },
    }
});


const selectCartItems = (state) => state.cart.items;

export const totalAmount = createSelector(
    [selectCartItems],
    items => {
        return items?.reduce((total, item) => {
            const quantity = item.cartQuantity ?? 0;
            return total + (item.price * quantity);
        }, 0);

    }
);

export const { addToCart,subtract,removeItem} = CartSlice.actions;
export default CartSlice.reducer;

