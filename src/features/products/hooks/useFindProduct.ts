import { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { getFindProducts } from "../productsSlice";
import { fetchJSON } from "@/api/fetchJSON";
import { setSearch } from "@/features/catalog/catalogSlice";
import { useState } from "react";

export const useFindProduct = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [query, setQuery] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query.trim()) return;

    const data = await fetchJSON(
      `/api/products/search?q=${encodeURIComponent(query)}`
    );

    dispatch(setSearch(query));
    dispatch(getFindProducts(data));
  }

  return { handleSubmit, query, setQuery };
};
