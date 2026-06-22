import { IUserWithToken } from "@/api/type";
import { apiClient } from "@/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFormValue } from "./userSlice";

export const registerUser = createAsyncThunk<
  IUserWithToken,
  IFormValue,
  { rejectValue: string }
>("user/register", async (data, { rejectWithValue }) => {
  try {
    const res = await apiClient<IUserWithToken, IFormValue>(
      "users/register",
      "POST",
      data,
    );
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
      data,
    );
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
    const res = await apiClient<IUserWithToken>("users/me");
    return res;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("user/logout", async (_, { rejectWithValue }) => {
  try {
    await apiClient<void>("users/logout", "POST");
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(message);
  }
});

export const editAccount = createAsyncThunk<
  IUserWithToken,
  { id: number; data: Partial<IFormValue> },
  { rejectValue: string }
>("user/editAccount", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await apiClient<IUserWithToken, Partial<IFormValue>>(
      `users/edit/${id}`,
      "PATCH",
      data,
    );
    return res;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(message);
  }
});
