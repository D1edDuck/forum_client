import { useParams } from "react-router-dom";
import s from "./index.module.css";
import ProductCard from "@/features/products/UI/ProductCard/ProductCard";
import LoadingError from "@/components/UI/LoadingError/LoadingError";
import { RootState } from "@/app/store";
import useResetFilters from "@/app/hooks/useResetFilters";
import { useProductsCategory } from "../../hooks/useProductsCategory";
import { useAppSelector } from "@/app/hooks/useAppSelector";

const ProductMenu = () => {
  const { id } = useParams<{ id: string }>();
  const { category, count, loading, error } = useProductsCategory(id); // получение категории и товаров из нее

  const filteredProducts = useAppSelector(
    (state: RootState) => state.product.filterProducts
  );
  useResetFilters(); // сброс фильтров

  return (
    <div className="mb">
      <div className="flex aic gap">
        <h2 className={s.title}>{category?.name ?? "Категория"}</h2>
        <p className={s.count}>{count} товаров найдено</p>
      </div>

      <LoadingError loading={loading} error={error} />

      {filteredProducts.length === 0 && !loading ? (
        <p className={s.list}>Продукты не найдены</p>
      ) : (
        <div className={s.grid}>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductMenu;
