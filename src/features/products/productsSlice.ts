import { ICategory, IProduct } from "@/api/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductsFilter,
  fetchProductsSearch,
  IProductsResponse,
} from "./productsThunks";

interface IProductData {
  products: IProduct[];
  count: {
    products: number;
  };
  loading: boolean;
  error: null | string;
}

const initialState: IProductData = {
  count: {
    products: 0,
  },
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.loading = false;
          state.products = action.payload.products;
          state.count.products = action.payload?._count?.products ?? 0;
          state.products = action.payload.products; // сразу показываем все
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Ошибка загрузки";
      });

    builder
      .addCase(fetchProductsSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsSearch.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.loading = false;
          state.products = action.payload; // сразу показываем все
        }
      )
      .addCase(fetchProductsSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Ошибка загрузки";
      });

    builder
      .addCase(fetchProductsFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsFilter.fulfilled,
        (state, action: PayloadAction<IProductsResponse>) => {
          state.loading = false;
          state.products = action.payload.products;
          state.count.products = action.payload.count;
        }
      )
      .addCase(fetchProductsFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message as string) || "Ошибка фильтрации";
      });
  },
});

export default productSlice.reducer;
