import { useDispatch, useSelector } from "react-redux";
import s from "./index.module.css";
import { AppDispatch, RootState } from "@/app/store";
import { setSearch } from "@/features/catalog/catalogSlice";
import { fetchJSON } from "@/api/fetchJSON";
import { getFindProducts } from "@/features/products/productsSlice";

const FindProduct = () => {
  const query = useSelector((state: RootState) => state.catalog.search);
  const dispatch = useDispatch<AppDispatch>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;

    const data = await fetchJSON(
      `/api/products/search?q=${encodeURIComponent(query)}`
    );

    dispatch(getFindProducts(data));
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap">
      <input
        type="text"
        value={query}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className={s.input}
        placeholder="Поиск"
      />
      <button className={s.find} type="submit">
        Найти
      </button>
    </form>
  );
};

export default FindProduct;
