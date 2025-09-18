import { createSlice } from "@reduxjs/toolkit";

interface IState {
  minValue: number | null;
  maxValue: number | null;
}

const initialState = {
  minValue: null,
  maxValue: null,
} as IState;

const catalogSlice = createSlice({
  name: "catalogSlice",
  initialState,
  reducers: {
    inputMin(state, action) {
      state.minValue = action.payload;
    },
    inputMax(state, action) {
      state.maxValue = action.payload;
    },
  },
});

export default catalogSlice.reducer;
export const { inputMin, inputMax } = catalogSlice.actions;
