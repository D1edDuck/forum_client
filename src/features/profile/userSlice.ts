import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/api/type";
import { loginUser, quickLogin, registerUser } from "./userThunk";
import Cookies from "js-cookie";

export interface IFormValue {
  name: string;
  email: string;
  phone: string;
  password: string;
  [key: string]: string | undefined;
}

interface UserState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  formValue: IFormValue;
}

const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  formValue: {
    name: "",
    password: "",
    phone: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;

      Cookies.remove("jwt");
    },
    inputValue(
      state,
      action: PayloadAction<{ id: keyof IFormValue; value: string }>
    ) {
      const { id, value } = action.payload;
      state.formValue[id] = value;
    },
    resetValue(state) {
      state.formValue.email = "";
      state.formValue.name = "";
      state.formValue.password = "";
      state.formValue.phone = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная Ошибка";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная Ошибка";
      })
      .addCase(quickLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(quickLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(quickLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная Ошибка";
      });
  },
});

export const { logout, inputValue, resetValue } = userSlice.actions;
export default userSlice.reducer;
