import { useParams } from "react-router-dom";
import { useCategory } from "@/app/hooks/useCategory";
import s from "./index.module.css";

const ProductMenu = () => {
  const { id } = useParams<{ id: string }>();
  const { category, products, count, loading, error } = useCategory(id);

  return (
    <div>
      <h2 className={s.title}>{category?.name ?? "Категория"}</h2>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}

      <p>{count} товаров найдено</p>

      <div className={s.grid}>
        {products.map((p) => (
          <article key={p.id} className={s.card}>
            <h3 className={s.price}>
              {p.price != null ? `${p.price}₽` : "Цена не указана"}
            </h3>
            <p>
              {p.name} — {p.description ?? "Описание отсутствует"}
              <br />В наличии: {p.stock ?? 0}
            </p>
            <p>{p.attributes?.character}</p>
          </article>
        ))}
      </div>

      {products.length === 0 && !loading && <p>Продукты не найдены</p>}
    </div>
  );
};

export default ProductMenu;
