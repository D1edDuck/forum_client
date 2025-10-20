import { useState } from "react";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { fetchProductsSearch } from "../../productsThunks";
import { setSearch } from "../filterSlice";
import { hideLoading, showLoading } from "@/UI/Loader/loaderSlice";

export const useFindProduct = () => {
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      dispatch(showLoading("Поиск товара.."));
      dispatch(setSearch(query));
      await dispatch(fetchProductsSearch(query)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  }

  return { handleSubmit, query, setQuery };
};
