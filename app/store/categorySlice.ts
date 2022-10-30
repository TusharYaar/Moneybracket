import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {Category} from "../realm/Category";

export interface CateogryState {
  category: Category[];
}

const initialState: CateogryState = {
  category: [],
};

export const CateogrySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category[]>) => {
      state.category = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCategory} = CateogrySlice.actions;

export default CateogrySlice.reducer;
