import { createSlice } from "@reduxjs/toolkit";
import {
  deletedCategory,
  deletedProduct,
  deletedUser,
  fetchCategoryAll,
  fetchProductsAll,
  fetchUsersAll,
  IDbAllState,
} from "./dbThunks";

const initialState: IDbAllState = {
  clients: { count: 0, users: [] },
  products: { count: 0, products: [] },
  category: { count: 0, category: [] },
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
      })
      .addCase(fetchCategoryAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryAll.rejected, (state, action) => {
        state.error = action.payload || "ошибка при загрузке данных";
        state.loading = false;
      })
      .addCase(fetchCategoryAll.fulfilled, (state, action) => {
        state.category = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(deletedProduct.fulfilled, (state, action) => {
        state.products.products = state.products.products.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(deletedProduct.rejected, (state, action) => {
        state.error = action.payload || "Ошибка при удалении продукта";
      })
      .addCase(deletedProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(deletedCategory.fulfilled, (state, action) => {
        state.category.category = state.category.category.filter(
          (cat) => cat.id !== action.payload.id
        );
      })
      .addCase(deletedCategory.rejected, (state, action) => {
        state.error = action.payload || "Ошибка при удалении категории";
      })
      .addCase(deletedCategory.pending, (state) => {
        state.error = null;
      })
      .addCase(deletedUser.fulfilled, (state, action) => {
        state.clients.users = state.clients.users.filter(
          (user) => user.id !== action.payload.id
        );
      })
      .addCase(deletedUser.rejected, (state, action) => {
        state.error = action.payload || "Ошибка при удалении пользователя";
      })
      .addCase(deletedUser.pending, (state) => {
        state.error = null;
      });
  },
});

export default dbSlice.reducer;
