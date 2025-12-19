import { configureStore } from "@reduxjs/toolkit";
import CatalogSlice from "@/features/catalog/catalogSlice";
import productSlice from "@/features/products/productsSlice";
import bookingSlice from "@/features/booking/bookingSlice";
import filterSlice from "@/features/products/filter/filterSlice";
import userSlice from "@/features/profile/userSlice";
import modalSlice from "@/UI/Modal/modalSlice";
import repairSlice from "@/features/profile/repairs/repairSlice";
import loadingSlice from "@/UI/Loader/loaderSlice";
import dbSlice from "@/features/profile/dateBase/dbSlice";

const store = configureStore({
  reducer: {
    catalog: CatalogSlice,
    product: productSlice,
    booking: bookingSlice,
    filter: filterSlice,
    user: userSlice,
    repair: repairSlice,
    modal: modalSlice,
    loading: loadingSlice,
    db: dbSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
