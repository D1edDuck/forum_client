import { IUserWithToken } from "@/api/type";
import { apiClient } from "@/app/apiClient";
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
      data
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
      data
    );
    return res;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(message);
  }
});
