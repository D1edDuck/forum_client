import { ICatalog } from "@/api/type";
import { apiClient } from "@/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCatalog = createAsyncThunk<ICatalog[], void, { rejectValue: string }>(
  "catalog/fetchCatalog",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient<ICatalog[]>(`category`);
      return res;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(message);
    }
  },
);

export const createCategory = createAsyncThunk<
  ICatalog,
  Omit<ICatalog, "id">,
  { rejectValue: string }
>("db/createCategory", async (data, { rejectWithValue }) => {
  try {
    const res = await apiClient<ICatalog, Omit<ICatalog, "id">>(
      "category",
      "POST",
      data,
    );
    return res;
  } catch (error: unknown) {
    let message = "Неизвестная ошибка";

    if (error instanceof Error) {
      message = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    return rejectWithValue(message);
  }
});
