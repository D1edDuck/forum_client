import s from "./index.module.css";
import ProductCard from "@/features/products/UI/ProductCard/ProductCard";
import LoadingError from "@/components/UI/LoadingError/LoadingError";
import { RootState } from "@/app/store";
import useResetFilters from "@/app/hooks/useResetFilters";
import { useAppSelector } from "@/app/hooks/useAppSelector";

const ProductMenu = () => {
  const { filterProducts, error, loading, count, name } = useAppSelector(
    (state: RootState) => state.product
  );

  useResetFilters(); // сброс фильтров

  return (
    <div className="mb">
      <div className="flex aic gap">
        <h2 className={s.title}>{name ?? "Категория"}</h2>
        <p className={s.count}>{count.products} товаров найдено</p>
      </div>

      <LoadingError loading={loading} error={error} />

      {filterProducts.length === 0 && !loading ? (
        <p className={s.list}>Продукты не найдены</p>
      ) : (
        <div className={s.grid}>
          {filterProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductMenu;
