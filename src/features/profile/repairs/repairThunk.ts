import { apiClient } from "@/api/apiClient";
import { IRepair } from "@/api/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { IValue } from "./repairSlice";

const TOKEN_KEY = "jwt";

export interface IRepairAll {
  count: number;
  repairs: IRepair[];
}

export const repairsUser = createAsyncThunk<
  IRepair[],
  number,
  { rejectValue: string }
>("repair/get", async (user, { rejectWithValue }) => {
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
  IRepairAll,
  void,
  { rejectValue: string }
>("repair/getAdmin", async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get(TOKEN_KEY);
    if (!token) return rejectWithValue("Нет токена");

    const res = await apiClient<IRepairAll>("repair", "GET", undefined, {
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

export const repairFilter = createAsyncThunk<
  IRepair[],
  IValue,
  { rejectValue: string }
>("repair/filter", async (filter, { rejectWithValue }) => {
  try {
    const res = await apiClient<IRepair[], IValue>(
      "repair/filter",
      "POST",
      filter
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

export const editStatus = createAsyncThunk<
  IRepair,
  { id: number; status: string },
  { rejectValue: string }
>("repair/editStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const res = await apiClient<IRepair, { status: string }>(
      `repair/status/${id}`,
      "PATCH",
      { status }
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

export const createRepair = createAsyncThunk<
  IRepair,
  Omit<IRepair, "id" | "created_at" | "user">,
  { rejectValue: string }
>("repair/create", async (repairData, { rejectWithValue }) => {
  try {
    const res = await apiClient<
      IRepair,
      Omit<IRepair, "id" | "created_at" | "user">
    >("repair", "POST", repairData);

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
