import { IUserWithToken } from "@/api/type";
import { apiClient } from "@/app/apiClient";
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

    const res = await apiClient<IUserWithToken>("users/me", "GET", undefined, {
      Authorization: `Bearer ${token}`,
    });

    return res;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(message);
  }
});
