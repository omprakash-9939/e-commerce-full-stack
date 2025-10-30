import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import searchReducer from './searchSlice'
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    search: searchReducer,
    cart: cartReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




// store.getState
// Redux store me ek method hota hai getState().
// Ye tumhare poore store ka current state object return karta hai.


// RootState ek type hai jo tumhare Redux store ke poore state ka shape represent karta hai.
// Ye store.getState() se automatically nikala jata hai, taaki manually likhne ki zaroorat na ho.

// ReturnType<typeof store.getState>

// TypeScript utility type hai → ReturnType<T> jo automatically kisi function ke return ka type nikalta hai.


// AppDispatch ek type hai jo Redux store ke dispatch function se liya gaya hai, taaki tum TypeScript ke sath safe aur accurate dispatch use kar sako.