import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface SearchState {
  search: string;
  showSearch: boolean;
}
const initialState: SearchState = {
  search: "",
  showSearch: false,
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setShowSearch: (state, action: PayloadAction<boolean>) => {
      state.showSearch = action.payload;
    },
  },
});
export const { setSearch, setShowSearch } = searchSlice.actions;
export default searchSlice.reducer;
