import { apiClient } from "@/api/apiClient";
import { IRepair } from "@/api/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const TOKEN_KEY = "jwt";

export const repairsUser = createAsyncThunk<
  IRepair[],
  number,
  { rejectValue: string }
>("user/repair", async (user, { rejectWithValue }) => {
  try {
    const repairs = await apiClient<IRepair[]>("repair/me", "GET", undefined, {
      user: user.toString(),
    });

    return repairs;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Ошибка загрузки заявок";
    return rejectWithValue(message);
  }
});

export const repairAdmin = createAsyncThunk<
  IRepair[],
  void,
  { rejectValue: string }
>("user/adminRepairs", async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get(TOKEN_KEY);
    if (!token) return rejectWithValue("Нет токена");

    const res = await apiClient<IRepair[]>("repair", "GET", undefined, {
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
