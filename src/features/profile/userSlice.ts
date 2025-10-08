import { IUser } from "@/api/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUser = {
  id: null,
  name: null,
  phone: null,
  email: null,
  role: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
