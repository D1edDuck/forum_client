import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, IUserWithToken } from "@/api/type";
import { apiClient } from "@/app/apiClient";

interface UserState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const loginUser = createAsyncThunk<
  IUserWithToken,
  { phone: string; password: string },
  { rejectValue: string }
>("users/login", async (body, thunkAPI) => {
  try {
    return await apiClient<IUserWithToken, typeof body>(
      "users/login",
      "POST",
      body
    );
  } catch (err: unknown) {
    if (err instanceof Error) return thunkAPI.rejectWithValue(err.message);
    return thunkAPI.rejectWithValue("Неизвестная ошибка");
  }
});

export const registerUser = createAsyncThunk<
  IUserWithToken,
  { phone: string; password: string; name: string; email?: string },
  { rejectValue: string }
>("users/register", async (body, thunkAPI) => {
  try {
    return await apiClient<IUserWithToken, typeof body>(
      "users/register",
      "POST",
      body
    );
  } catch (err: unknown) {
    if (err instanceof Error) return thunkAPI.rejectWithValue(err.message);
    return thunkAPI.rejectWithValue("Неизвестная ошибка");
  }
});

export const fetchProfile = createAsyncThunk<
  IUser,
  void,
  { state: { user: UserState }; rejectValue: string }
>("users/fetchProfile", async (_, thunkAPI) => {
  const token = thunkAPI.getState().user.token;
  if (!token) return thunkAPI.rejectWithValue("Нет токена");

  try {
    return await apiClient<IUser>("users/me", "GET", undefined, {
      Authorization: `Bearer ${token}`,
    });
  } catch (err: unknown) {
    if (err instanceof Error) return thunkAPI.rejectWithValue(err.message);
    return thunkAPI.rejectWithValue("Неизвестная ошибка");
  }
});
