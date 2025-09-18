import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  minValue: number | null;
  maxValue: number | null;
  brand: string[];
  stock: string[];
}

const initialState: IState = {
  minValue: null,
  maxValue: null,
  brand: [],
  stock: [],
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
    resetFilters(state) {
      state.brand = [];
      state.stock = [];
      state.minValue = null;
      state.maxValue = null;
    },
  },
});

export default catalogSlice.reducer;
export const { inputMin, inputMax, setBrand, setStock, resetFilters } =
  catalogSlice.actions;
