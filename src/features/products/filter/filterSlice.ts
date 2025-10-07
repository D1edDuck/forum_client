import { IFilter } from "@/api/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IFilter = {
  minValue: 0,
  maxValue: 0,
  brand: [],
  stock: [],
  search: "",
  loading: false,
  error: null,
};

const filterSlice = createSlice({
  name: "catalogSlice",
  initialState,
  reducers: {
    inputMin(state, action: PayloadAction<number>) {
      state.minValue = action.payload;
    },
    inputMax(state, action: PayloadAction<number>) {
      state.maxValue = action.payload;
    },
    setBrand(state, action: PayloadAction<string[]>) {
      state.brand = action.payload;
    },
    setStock(state, action: PayloadAction<string[]>) {
      state.stock = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    resetOptions(state) {
      state.brand = [];
      state.stock = [];
      state.minValue = 0;
      state.maxValue = 0;
      state.search = "";
    },
  },
});

export default filterSlice.reducer;
export const {
  inputMin,
  inputMax,
  setBrand,
  setStock,
  resetOptions,
  setSearch,
} = filterSlice.actions;
