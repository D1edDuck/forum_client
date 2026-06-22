import { ICategory, IFilter, IProduct } from "@/api/type";
import { apiClient } from "@/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IFilterWithCategory extends Omit<IFilter, "loading" | "error"> {
  categoryId: string;
}

export interface IProductsResponse {
  products: IProduct[];
  count: number;
}

export const fetchProducts = createAsyncThunk<ICategory, string, { rejectValue: string }>(
  "products/fetchProducts",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiClient<ICategory>(`category/${id}`);
      return res;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(message);
    }
  },
);

export const fetchProductsSearch = createAsyncThunk<IProduct[], string, { rejectValue: string }>(
  "products/fetchProductsSearch",
  async (q, { rejectWithValue }) => {
    try {
      const res = await apiClient<IProduct[]>(`products/search?q=${q}`);
      return res;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(message);
    }
  },
);

export const createProduct = createAsyncThunk<IProduct, Partial<IProduct>, { rejectValue: string }>(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const fd = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (value !== undefined) fd.append(key, value as any);
      });

      const res = await apiClient<IProduct, FormData>("products", "POST", fd);
      return res;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(message);
    }
  },
);

export const fetchProductById = createAsyncThunk<IProduct, number, { rejectValue: string }>(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiClient<IProduct>(`products/${id}`);
      return res;
    } catch {
      return rejectWithValue("Товар не найден");
    }
  },
);

export const fetchProductsFilter = createAsyncThunk<
  IProductsResponse,
  IFilterWithCategory,
  { rejectValue: string }
>("products/fetchProductsFilter", async (filter, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams();

    params.append("categoryId", filter.categoryId);

    if (filter.brand?.length) params.append("brand", filter.brand.join(","));
    if (filter.stock?.length) params.append("stock", filter.stock.join(","));
    if (filter.minValue) params.append("minValue", filter.minValue.toString());
    if (filter.maxValue) params.append("maxValue", filter.maxValue.toString());

    const res = await apiClient<IProductsResponse>(
      `products/filter?${params.toString()}`,
    );
    return res;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(message);
  }
});
