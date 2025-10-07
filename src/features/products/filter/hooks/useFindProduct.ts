import { useState } from "react";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { fetchProductsSearch } from "../../productsThunks";
import { setSearch } from "../filterSlice";

export const useFindProduct = () => {
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query.trim()) return;

    dispatch(setSearch(query));
    dispatch(fetchProductsSearch(query));
  }

  return { handleSubmit, query, setQuery };
};
