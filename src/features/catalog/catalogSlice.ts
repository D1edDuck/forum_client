import { IFilter } from "@/api/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IFilter = {
  minValue: null,
  maxValue: null,
  brand: [],
  stock: [],
  search: "",
};

const catalogSlice = createSlice({
  name: "catalogSlice",
  initialState,
  reducers: {
    inputMin(state, action: PayloadAction<number | null>) {
      state.minValue = action.payload;
    },
    inputMax(state, action: PayloadAction<number | null>) {
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
      state.minValue = null;
      state.maxValue = null;
      state.search = "";
    },
  },
});

export default catalogSlice.reducer;
export const {
  inputMin,
  inputMax,
  setBrand,
  setStock,
  resetOptions,
  setSearch,
} = catalogSlice.actions;
