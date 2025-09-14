import { useParams } from "react-router-dom";
import { useCategory } from "@/app/hooks/useCategory";
import s from "./index.module.css";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import LoadingError from "@/components/UI/LoadingError/LoadingError";

const ProductMenu = () => {
  const { id } = useParams<{ id: string }>();
  const { category, products, count, loading, error } = useCategory(id);

  return (
    <div className="mb">
      <div className="flex aie gap">
        <h2 className={s.title}>{category?.name ?? "Категория"}</h2>
        <p className={s.count}>{count} товаров найдено</p>
      </div>

      <LoadingError loading={loading} error={error} />

      {products.length === 0 && !loading ? (
        <p className={s.list}>Продукты не найдены</p>
      ) : (
        <div className={s.grid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductMenu;
