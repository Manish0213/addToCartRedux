import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// First, create the thunk
export const fetchproducts = createAsyncThunk('fetchproducts', async () => {
    const response = await fetch(`http://localhost:5000/product/getallproducts`);
    return response.json();
  });

const initialState = {
  products: [],
  loading: false,
  isError: false
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  
  extraReducers: (builder) => {
    builder.addCase(fetchproducts.pending, (state, action) => {
        state.loading = true;
    });
    builder.addCase(fetchproducts.fulfilled, (state, action) => {
        state.loading = false;
        // state.entities.push(action.payload)
        state.products = action.payload;
    });
    builder.addCase(fetchproducts.rejected, (state, action) => {
        state.isError = true;
    });
  },
})

export default productSlice.reducer