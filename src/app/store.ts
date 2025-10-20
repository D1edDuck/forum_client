import { configureStore } from "@reduxjs/toolkit";
import CatalogSlice from "@/features/catalog/catalogSlice";
import productSlice from "@/features/products/productsSlice";
import bookingSlice from "@/features/booking/bookingSlice";
import filterSlice from "@/features/products/filter/filterSlice";
import userSlice from "@/features/profile/userSlice";
import modalSlice from "@/UI/Modal/modalSlice";

const store = configureStore({
  reducer: {
    catalog: CatalogSlice,
    product: productSlice,
    booking: bookingSlice,
    filter: filterSlice,
    user: userSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
