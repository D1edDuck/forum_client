import { useCategories } from "@/app/hooks/useCategories";
import { Link } from "react-router-dom";
import s from "./index.module.css";

const SelectMenu = () => {
  const { data: catalog, loading, error } = useCategories();

  return (
    <div className={s.grid}>
      {loading && <p className={s.loading}>Загрузка категорий…</p>}
      {error && <p>Ошибка: {error}</p>}
      {!loading && !error && catalog.length === 0 && (
        <p>Категории не найдены.</p>
      )}

      {!loading &&
        !error &&
        catalog.map((cat) => (
          <div className={s.category} key={cat.id}>
            <p>{cat.name}</p>
            <Link to={`${cat.id}/${cat.slug}`}>{">"}</Link>
          </div>
        ))}
    </div>
  );
};

export default SelectMenu;
