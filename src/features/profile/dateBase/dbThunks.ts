import { apiClient } from "@/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const TOKEN_KEY = "jwt";

export interface IUsersAllResponse {
  count: number;
  users: { id: string; name: string; email: string }[];
}

export interface IUsersAllState {
  clients: {
    count: number;
    users: { id: string; name: string; email: string }[];
  };
  loading: boolean;
  error: string | null;
}

export const fetchUsersAll = createAsyncThunk<
  IUsersAllResponse,
  void,
  { rejectValue: string }
>("db/fetchUsersAll", async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get(TOKEN_KEY);
    if (!token) return rejectWithValue("Нет токена");
    const res = await apiClient<IUsersAllResponse>(
      "users/all",
      "GET",
      undefined,
      {
        Authorization: `Bearer ${token}`,
      }
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
