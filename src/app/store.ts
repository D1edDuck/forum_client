import { configureStore } from "@reduxjs/toolkit";
import CatalogSlice from "@/features/catalog/catalogSlice";
import productSlice from "@/features/products/productsSlice";

const store = configureStore({
  reducer: { catalog: CatalogSlice, product: productSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
