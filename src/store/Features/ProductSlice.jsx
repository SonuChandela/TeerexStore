import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// fetch data use thunk middleware
export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (_, thunkAPI) => {
        try {
            const res = await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
            if (!res.ok) throw new Error('Failed to fetch products data');
            const result = await res.json();
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

const initialState = {
    products: null,
    filteredProducts: null,
    status: 'idle',
    error: null,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        filteredProduct(state, action) {
            
            const { colors, types, genders, priceRange } = action.payload;

            state.filteredProducts = state.products?.filter(item => {

                const matchColor = colors.includes(item.color.toLowerCase());

                const matchType = types.includes(item.type.toLowerCase());

                const matchGender = genders.includes(item.gender.toLowerCase());

                const priceFilter =
                    (priceRange.includes('250') && item.price <= 250) ||
                    (priceRange.includes('251') && item.price > 250 && item.price <= 450) ||
                    (priceRange.includes('450') && item.price > 450);


                if(matchColor || matchType || matchGender ){
                    return item;
                } 

            })

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export const { filteredProduct,searchProducts } = productSlice.actions;
export default productSlice.reducer;