import { ICategory, IProduct } from "@/api/type";
import { apiClient } from "@/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk<ICategory, string>(
  "products/fetchProducts",
  async (id) => {
    const res = await apiClient<ICategory>(`category/${id}`);
    return res;
  }
);

export const fetchProductsSearch = createAsyncThunk<IProduct[], string>(
  "products/fetchProductsSearch",
  async (q) => {
    const res = await apiClient<IProduct[]>(`products/search?q=${q}`);
    return res;
  }
);
