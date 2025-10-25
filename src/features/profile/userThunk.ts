import { IRepair, IUserWithToken } from "@/api/type";
import { apiClient } from "@/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFormValue } from "./userSlice";
import Cookies from "js-cookie";

const TOKEN_KEY = "jwt";

export const registerUser = createAsyncThunk<
  IUserWithToken,
  IFormValue,
  { rejectValue: string }
>("user/register", async (data, { rejectWithValue }) => {
  try {
    const res = await apiClient<IUserWithToken, IFormValue>(
      "users/register",
      "POST",
      data
    );

    Cookies.set(TOKEN_KEY, res.token, {
      expires: 2,
      secure: true,
      sameSite: "Strict",
      path: "/",
    });

    return res;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(message);
  }
});

export const loginUser = createAsyncThunk<
  IUserWithToken,
  IFormValue,
  { rejectValue: string }
>("user/login", async (data, { rejectWithValue }) => {
  try {
    const res = await apiClient<IUserWithToken, IFormValue>(
      "users/login",
      "POST",
      data
    );

    Cookies.set(TOKEN_KEY, res.token, {
      expires: 2,
      secure: true,
      sameSite: "Strict",
      path: "/",
    });

    return res;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(message);
  }
});

export const quickLogin = createAsyncThunk<
  IUserWithToken,
  void,
  { rejectValue: string }
>("user/quick", async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get(TOKEN_KEY);
    if (!token) return rejectWithValue("Нет токена");

    const res = await apiClient<IUserWithToken>("users/me", "GET", undefined, {
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
