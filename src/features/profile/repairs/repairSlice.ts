import { IRepair } from "@/api/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { repairAdmin, repairFilter, repairsUser } from "./repairThunk";

export interface IValue {
  [fieldName: string]: string | number | undefined;
}

interface IState {
  loading: boolean;
  error: string | null;
  repairs: IRepair[];
  formValue: IValue;
  formValuePatch: IValue;
}

const initialState: IState = {
  loading: false,
  error: null,
  repairs: [],
  formValue: {},
  formValuePatch: {},
};

const repairSlice = createSlice({
  name: "repairs",
  initialState,
  reducers: {
    setValue(
      state: IState,
      action: PayloadAction<{
        field: string;
        value: string | number | undefined;
      }>
    ) {
      state.formValue[action.payload.field] = action.payload.value;
    },
    setValuePatch(
      state: IState,
      action: PayloadAction<{
        field: string;
        value: string | number | undefined;
      }>
    ) {
      state.formValuePatch[action.payload.field] = action.payload.value;
    },
    resetForm(state: IState) {
      state.formValue = {};
    },
  },
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
      })
      .addCase(repairFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(repairFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.repairs = action.payload;
      })
      .addCase(repairFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная ошибка";
      });
  },
});

export default repairSlice.reducer;
export const { resetForm, setValue, setValuePatch } = repairSlice.actions;
