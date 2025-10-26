import { IRepair } from "@/api/type";
import { createSlice } from "@reduxjs/toolkit";
import { repairAdmin, repairsUser } from "./repairThunk";

interface IState {
  loading: boolean;
  error: string | null;
  repairs: IRepair[];
}

const initialState: IState = {
  loading: false,
  error: null,
  repairs: [],
};

const repairSlice = createSlice({
  name: "repairs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(repairAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(repairAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.repairs = action.payload;
      })
      .addCase(repairAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная ошибка";
      });
  },
});

export default repairSlice.reducer;
