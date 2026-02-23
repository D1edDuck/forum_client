import { useFindProduct } from "../../hooks/useFindProduct";
import s from "./index.module.css";

const FindProduct = () => {
  const { handleSubmit, query, setQuery } = useFindProduct();

  const clearInput = () => {
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.inputWrapper}>
        <svg
          className={s.searchIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={s.input}
          placeholder="Поиск товаров..."
        />

        {query && (
          <button
            type="button"
            className={s.clearButton}
            onClick={clearInput}
            aria-label="Очистить поиск"
          >
            ×
          </button>
        )}
      </div>

      <button className={s.find} type="submit">
        Найти
      </button>
    </form>
  );
};

export default FindProduct;
