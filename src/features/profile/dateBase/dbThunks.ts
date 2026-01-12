import { apiClient } from "@/api/apiClient";
import { ICatalog, IClient, IProduct } from "@/api/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const TOKEN_KEY = "jwt";

export interface IUsersAll {
  count: number;
  users: IClient[];
}

export interface IProductAll {
  count: number;
  products: IProduct[];
}

export interface ICategoryAll {
  count: number;
  category: ICatalog[];
}

export interface IDbAllState {
  clients: IUsersAll;
  products: IProductAll;
  category: ICategoryAll;
  loading: boolean;
  error: string | null;
}

export const fetchUsersAll = createAsyncThunk<
  IUsersAll,
  void,
  { rejectValue: string }
>("db/fetchUsersAll", async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get(TOKEN_KEY);
    if (!token) return rejectWithValue("Нет токена");
    const res = await apiClient<IUsersAll>("users/all", "GET", undefined, {
      Authorization: `Bearer ${token}`,
    });
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    if (message === "Unauthorized" || message.includes("401")) {
      Cookies.remove(TOKEN_KEY);
    }

    return rejectWithValue(message);
  }
});

export const fetchProductsAll = createAsyncThunk<
  IProductAll,
  void,
  { rejectValue: string }
>("db/fetchProductsAll", async (_, { rejectWithValue }) => {
  try {
    const res = await apiClient<IProductAll>("products", "GET");
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    if (message === "Unauthorized" || message.includes("401")) {
      Cookies.remove(TOKEN_KEY);
    }

    return rejectWithValue(message);
  }
});

export const fetchCategoryAll = createAsyncThunk<
  ICategoryAll,
  void,
  { rejectValue: string }
>("db/categoryAll", async (_, { rejectWithValue }) => {
  try {
    const res = await apiClient<ICategoryAll>("category/count", "GET");
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    return rejectWithValue(message);
  }
});
