import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  isLoading: boolean;
  text?: string;
}

const initialState: LoadingState = {
  isLoading: false,
  text: "Загрузка...",
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    showLoading(state, action: PayloadAction<string | undefined>) {
      state.isLoading = true;
      if (action.payload) state.text = action.payload;
    },
    hideLoading(state) {
      state.isLoading = false;
      state.text = "Загрузка...";
    },
  },
});

export default loadingSlice.reducer;
export const { showLoading, hideLoading } = loadingSlice.actions;
