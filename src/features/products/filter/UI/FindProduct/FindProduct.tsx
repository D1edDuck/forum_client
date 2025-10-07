import { useFindProduct } from "../../hooks/useFindProduct";
import s from "./index.module.css";

const FindProduct = () => {
  const { handleSubmit, query, setQuery } = useFindProduct();

  return (
    <form onSubmit={handleSubmit} className="flex gap">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
