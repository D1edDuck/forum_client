import { IRepair } from "@/api/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRepair,
  deletedRepairs,
  editStatus,
  repairAdmin,
  repairFilter,
  repairsUser,
} from "./repairThunk";

export interface IValue {
  [fieldName: string]: string | number | undefined;
}

interface IState {
  loading: boolean;
  error: string | null;
  repairs: IRepair[];
  formValue: IValue;
  formValuePatch: IValue;
  count: number;
}

const initialState: IState = {
  loading: false,
  error: null,
  repairs: [],
  formValue: {},
  formValuePatch: {},
  count: 0,
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
        state.repairs = action.payload.repairs;
        state.count = action.payload.count;
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
      })
      .addCase(
        editStatus.fulfilled,
        (state, action: PayloadAction<IRepair>) => {
          const updatedRepair = action.payload;
          const index = state.repairs.findIndex(
            (r) => r.id === updatedRepair.id
          );
          if (index !== -1) {
            state.repairs[index] = updatedRepair;
          }
        }
      )
      .addCase(
        createRepair.fulfilled,
        (state, action: PayloadAction<IRepair>) => {
          state.repairs.push(action.payload);
        }
      )
      .addCase(deletedRepairs.fulfilled, (state, action) => {
        state.repairs = state.repairs.filter(
          (repair) => repair.id !== action.payload.id
        );
      })
      .addCase(deletedRepairs.rejected, (state, action) => {
        state.error = action.payload || "Ошибка при удалении ремонта";
      })
      .addCase(deletedRepairs.pending, (state) => {
        state.error = null;
      });
  },
});

export default repairSlice.reducer;
export const { resetForm, setValue, setValuePatch } = repairSlice.actions;
