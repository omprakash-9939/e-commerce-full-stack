import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { RootState } from "./store";
import { cartApi } from "../api/cartApi";  
import type { Product } from "../types/product";
interface CartState {
  [itemId: string]: {
    [size: string]: number;
  };
}

const initialState: CartState = {};
//  Fetch cart from backend
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (token: string) => {
    const res = await cartApi.get(token);
    return res.data.cart as CartState;
  }
);
//  Add item on backend
export const addToCartServer = createAsyncThunk(
  "cart/addToCartServer",
  async ({ token, itemId, size }: { token: string; itemId: string; size: string }) => {
    if (!size) {
      toast.error("Select Product Size");
      return; 
    }
    const res = await cartApi.add(token, itemId, size);
    toast.success("Item added to cart");
    return res.data.cart as CartState;
  }
);
//  Update item on backend
export const updateCartServer = createAsyncThunk(
  "cart/updateCartServer",
  async ({ token, itemId, size, quantity }: 
    { token: string; itemId: string; size: string; quantity: number }) => {
    const res = await cartApi.update(token, itemId, size, quantity);
    // toast.success("Cart updated");
    return res.data.cart as CartState;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ itemId: string; size: string }>
    ) => {
      const { itemId, size } = action.payload;
      if (!size) {
        toast.error("Select Product Size");
        return;
      }
      if (!state[itemId]) state[itemId] = {};
      if (!state[itemId][size]) state[itemId][size] = 0;
      state[itemId][size] += 1;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ itemId: string; size: string; quantity: number }>
    ) => {
      const { itemId, size, quantity } = action.payload;
      if (state[itemId] && state[itemId][size] !== undefined) {
        if (quantity > 0) {
          state[itemId][size] = quantity;
        } else {
          delete state[itemId][size];
          if (Object.keys(state[itemId]).length === 0) {
            delete state[itemId];
          }
        }
      }
    },
      clearCart: () => {
      return {}; 
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (_state, action) => {
        return action.payload;
      })
      .addCase(addToCartServer.fulfilled, (_state, action) => {
        return action.payload;
      })
      .addCase(updateCartServer.fulfilled, (_state, action) => {
        return action.payload;
      });
  },
});
//  Selectors
export const selectCartCount = (state: RootState) => {
  let totalCount = 0;
  for (const itemId in state.cart) {
    for (const size in state.cart[itemId]) {
      totalCount += state.cart[itemId][size];
    }
  }
  return totalCount;
};

export const selectCartAmount = (state: RootState, products: Product[]) => {
  let totalAmount = 0;
  for (const itemId in state.cart) {
    const itemInfo = products.find((p) => p._id === itemId);
    if (!itemInfo) continue;
    for (const size in state.cart[itemId]) {
      totalAmount += itemInfo.price * state.cart[itemId][size];
    }
  }
  return totalAmount;
};

export const { addToCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
