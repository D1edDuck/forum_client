import { ICatalog } from "@/api/type";
import { apiClient } from "@/app/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCatalog = createAsyncThunk<ICatalog[], void>(
  "catalog/fetchCatalog",
  async () => {
    const res = await apiClient<ICatalog[]>(`category`);
    return res;
  }
);
