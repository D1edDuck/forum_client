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

export const createProduct = createAsyncThunk<IProduct, Partial<IProduct>>(
  "products/createProduct",
  async (productData) => {  
    const res = await apiClient<IProduct, Partial<IProduct>>("products", "POST", productData);
    return res;
  }
);

export const fetchProductsFilter = createAsyncThunk<
  IProductsResponse,
  IFilterWithCategory
>("products/fetchProductsFilter", async (filter) => {
  const params = new URLSearchParams();

  params.append("categoryId", filter.categoryId);

  if (filter.brand?.length) params.append("brand", filter.brand.join(","));
  if (filter.stock?.length) params.append("stock", filter.stock.join(","));
  if (filter.minValue) params.append("minValue", filter.minValue.toString());
  if (filter.maxValue) params.append("maxValue", filter.maxValue.toString());

  const res = await apiClient<IProductsResponse>(
    `products/filter?${params.toString()}`
  );
  return res;
});
