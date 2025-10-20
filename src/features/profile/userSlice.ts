import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRepair, IUser } from "@/api/type";
import { loginUser, quickLogin, registerUser, repairsUser } from "./userThunk";
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
  token: string | undefined;
  initialized: boolean;
  loading: boolean;
  error: string | null;
  formValue: IFormValue;
  repairs: IRepair[];
}

const initialState: UserState = {
  user: null,
  token: undefined,
  initialized: true,
  loading: false,
  error: null,
  formValue: {
    name: "",
    password: "",
    phone: "",
    email: "",
  },
  repairs: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = undefined;
      state.error = null;
      state.loading = false;
      state.initialized = true;

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
        state.initialized = false;
      })
      .addCase(quickLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.user = action.payload.user;
        state.token = Cookies.get("jwt");
      })
      .addCase(quickLogin.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.user = null;
        state.token = undefined;
      })
      .addCase(repairsUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(repairsUser.fulfilled, (state, action) => {
        state.loading = false;
        state.repairs = action.payload;
      })
      .addCase(repairsUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная ошибка";
      });
  },
});

export const { logout, inputValue, resetValue } = userSlice.actions;
export default userSlice.reducer;
