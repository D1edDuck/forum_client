import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { getFindProducts } from "../productsSlice";
import { fetchJSON } from "@/api/fetchJSON";
import { setSearch } from "@/features/catalog/catalogSlice";

export const useFindProduct = () => {
  const query = useSelector((state: RootState) => state.catalog.search);
  const dispatch = useDispatch<AppDispatch>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query.trim()) return;

    const data = await fetchJSON(
      `/api/products/search?q=${encodeURIComponent(query)}`
    );

    dispatch(getFindProducts(data));
  }

  function setValue(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearch(e.target.value));
  }

  return { handleSubmit, query, setValue };
};
