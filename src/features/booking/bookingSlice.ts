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
  },
});

export default bookingSlice.reducer;
export const { inputValue } = bookingSlice.actions;
