import { ICatalog } from "@/api/type";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCatalog } from "./catalogThunk";

interface IState {
  category: ICatalog[];
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  category: [],
  loading: false,
  error: null,
};

const catalogSlice = createSlice({
  name: "catalogSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Неизвестная ошибка";
      });
  },
});

export default catalogSlice.reducer;
