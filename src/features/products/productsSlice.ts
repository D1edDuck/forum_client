import { ICategory, IProduct } from "@/api/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchProductById,
  fetchProducts,
  fetchProductsFilter,
  fetchProductsSearch,
  IProductsResponse,
} from "./productsThunks";

interface IProductData {
  products: IProduct[];
  currentProduct: IProduct | null;
  count: {
    products: number;
  };
  loading: boolean;
  currentLoading: boolean;
  error: null | string;
  currentError: null | string;
}

const initialState: IProductData = {
  count: {
    products: 0,
  },
  products: [],
  currentProduct: null,
  loading: false,
  currentLoading: false,
  error: null,
  currentError: null,
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
        state.error = (action.payload as string) ?? action.error.message ?? "Ошибка загрузки";
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
        state.error = (action.payload as string) ?? action.error.message ?? "Ошибка загрузки";
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
        state.error = (action.payload as string) ?? action.error.message ?? "Ошибка фильтрации";
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.loading = false;
          state.products.push(action.payload);
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Ошибка создания продукта";
      });

    builder
      .addCase(fetchProductById.pending, (state) => {
        state.currentLoading = true;
        state.currentError = null;
        state.currentProduct = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.currentLoading = false;
          state.currentProduct = action.payload;
        },
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.currentLoading = false;
        state.currentError =
          (action.payload as string) || "Ошибка загрузки товара";
      });
  },
});

export default productSlice.reducer;
