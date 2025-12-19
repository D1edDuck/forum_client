import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersAll, IUsersAllState } from "./dbThunks";

const initialState: IUsersAllState = {
  clients: { count: 0, users: [] },
  loading: false,
  error: null,
};

export const dbSlice = createSlice({
  name: "dbSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAll.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log(initialState);
      })
      .addCase(fetchUsersAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка при загрузке данных";
      })
      .addCase(fetchUsersAll.fulfilled, (state, action) => {
        console.log(action.payload);
        state.clients = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
});

export default dbSlice.reducer;
