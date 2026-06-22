import { apiClient } from "@/api/apiClient";
import { IRepair } from "@/api/type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IValue } from "./repairSlice";

export interface IRepairAll {
  count: number;
  repairs: IRepair[];
}

export const repairsUser = createAsyncThunk<
  IRepair[],
  number,
  { rejectValue: string }
>("repair/get", async (_user, { rejectWithValue }) => {
  try {
    const repairs = await apiClient<IRepair[]>("repair/me");
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
    const res = await apiClient<IRepairAll>("repair");
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

export const repairFilter = createAsyncThunk<
  IRepair[],
  IValue,
  { rejectValue: string }
>("repair/filter", async (filter, { rejectWithValue }) => {
  try {
    const res = await apiClient<IRepair[], IValue>(
      "repair/filter",
      "POST",
      filter,
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

export const editStatus = createAsyncThunk<
  IRepair,
  { id: number; status: string },
  { rejectValue: string }
>("repair/editStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const res = await apiClient<IRepair, { status: string }>(
      `repair/status/${id}`,
      "PATCH",
      { status },
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
      const err = error as any;
      message = err.response?.data?.message || message;
    }

    return rejectWithValue(message);
  }
});

export const deletedRepairs = createAsyncThunk<
  { id: number },
  { id: number },
  { rejectValue: string }
>("db/deletedRepairs", async ({ id }, { rejectWithValue }) => {
  try {
    await apiClient<void>(`repair/${id}`, "DELETE");
    return { id };
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
