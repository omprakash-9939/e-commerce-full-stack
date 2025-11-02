import { createSlice, createAsyncThunk, type PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import type { Product, ProductState } from "../types/product";
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};
// Fatch API Data 
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  console.log("check backend link", backendURL)
  const response = await axios.get(backendURL + "/api/product/list");
  console.log("check data in browser console", response.data.products)
  return response.data.products; 
});
// Fetch filtered products
export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFiltered",
  async (
    params: { category: string[]; subCategory: string[]; sort: string; search: string },
    { rejectWithValue }
  ) => {
    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const query = new URLSearchParams();
      if (params.category.length > 0) query.append("category", params.category.join(","));
      if (params.subCategory.length > 0) query.append("subCategory", params.subCategory.join(","));
      if (params.sort) query.append("sort", params.sort);
      if (params.search) query.append("search", params.search);
      const response = await axios.get(backendURL + `/api/product/filter?${query.toString()}`);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error || "Failed to fetch filtered products");
    }
  }
);
// Create Product Slice 
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      // Filtered Products
    .addCase(fetchFilteredProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(fetchFilteredProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
