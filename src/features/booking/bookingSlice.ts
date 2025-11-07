import { IBooking } from "@/api/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IBooking = {
  name: "",
  phone: "",
  email: "",
  cause: "",
  comment: "",
};

const bookingSlice = createSlice({
  name: "Booking",
  initialState,
  reducers: {
    inputValue(
      state,
      action: PayloadAction<{ id: keyof IBooking; value: string }>
    ) {
      const { id, value } = action.payload;
      state[id] = value;
    },

    resetValue(state) {
      state.name = "";
      state.cause = "";
      state.comment = "";
      state.email = "";
      state.phone = "";
    },
  },
});

export default bookingSlice.reducer;
export const { inputValue, resetValue } = bookingSlice.actions;
