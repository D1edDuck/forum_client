import { configureStore } from "@reduxjs/toolkit";
import CatalogSlice from "@/features/catalog/catalogSlice";

const store = configureStore({ reducer: { catalog: CatalogSlice } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
