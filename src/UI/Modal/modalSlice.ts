import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IModal {
  tittle: string;
  status: "pending" | "error" | "fulfilled";
  text: string;
}

interface ModalState {
  open: boolean;
  data: IModal | null;
}

const initialState: ModalState = {
  open: false,
  data: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleEvent(state) {
      state.open = !state.open;
    },
    openModal(state, action: PayloadAction<IModal>) {
      state.open = true;
      state.data = action.payload;
    },
    closeModal(state) {
      state.open = false;
      state.data = null;
    },
  },
});

export default modalSlice.reducer;
export const { toggleEvent, openModal, closeModal } = modalSlice.actions;
