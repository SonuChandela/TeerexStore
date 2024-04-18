import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// product interface
export interface Product {
    id: number;
    imageURL: string;
    name: string;
    type: string;
    price: number;
    currency: string;
    color: string;
    gender: string;
    quantity: number;
}

// product state interface
interface ProductState {
    products: Product[],
    searchResults: Product[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error?: string | null,
}

// intialState
const initialState: ProductState = {
    products: [],
    searchResults: [],
    status: 'idle',
    error: null,
};

// Define action payload type
export interface FilterPayload {
    colors: string[],
    types: string[],
    gender: string[],
    price: string[]
}

// api call for product data
export const fetchProducts = createAsyncThunk('teerexstore', async () => {
    try {
        const response = await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
        if (!response.ok) {
            throw new Error('Failed to fetch products data');
        }
        const result = await response.json();
        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Check if error is an instance of Error
            return error.message ?? 'An unknown error occurred';
        }
    }
})

// product slice
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // 
        showProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
            state.status = 'succeeded';
        },
        // set search product data and set into searchResult state 
        setSearchResults: (state, action: PayloadAction<string>) => {
            const searchTerm = action.payload.toLowerCase();

            // If searchTerm is empty, return an empty array for search results
            if (!searchTerm.trim()) {
                state.searchResults = [];
                return;
            }

            // if searchresult is empty state them search from products state 
            const searchType = state.searchResults.length > 0 ? state.searchResults : state.products;

            state.searchResults = searchType.filter((item) => {
                const { type, name, color, gender } = item;
                return (
                    name.toLowerCase().includes(searchTerm) ||
                    type.toLowerCase().includes(searchTerm) ||
                    color.toLowerCase().includes(searchTerm) ||
                    gender.toLowerCase().includes(searchTerm)
                );
            });
        },
        setFilteredProduct: (state, action: PayloadAction<FilterPayload>) => {
            const { colors, types, gender, price } = action.payload;
            // Check if any price filters are applied
            const isPriceFiltered = price.length > 0;

            state.searchResults = state.products.filter(item => {
                // filter item on color
                const matchesColorFilter = colors.includes(item.color.toLowerCase());
                // filter item on type
                const matchesTypeFilter = types.includes(item.type.toLowerCase());
                // filter item on gender
                const matchesGenderFilter = gender.includes(item.gender.toLowerCase());
                // check item on price cap
                const matchesPriceFilter =
                    (price.includes('250') && item.price <= 250) ||
                    (price.includes('251') && item.price > 250 && item.price <= 450) ||
                    (price.includes('450') && item.price > 450);

                if (!isPriceFiltered && (matchesColorFilter || matchesTypeFilter || matchesGenderFilter)) {
                    return item;
                } else if (matchesPriceFilter && (matchesColorFilter || matchesTypeFilter || matchesGenderFilter)) {
                    return item;
                } else if (matchesPriceFilter) {
                    return item;
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'An error occurred';
            });
    },
});

export const { showProducts, setSearchResults, setFilteredProduct } = productSlice.actions;
export default productSlice.reducer;