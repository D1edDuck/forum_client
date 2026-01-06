import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsAll, fetchUsersAll, IDbAllState } from "./dbThunks";

const initialState: IDbAllState = {
  clients: { count: 0, users: [] },
  products: { count: 0, products: [] },
  loading: false,
  error: null,
};

export const dbSlice = createSlice({
  name: "dbSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка при загрузке данных";
      })
      .addCase(fetchUsersAll.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductsAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка при загрузке данных";
      })
      .addCase(fetchProductsAll.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
});

export default dbSlice.reducer;
