import { useParams } from "react-router-dom";
import { useCategory } from "@/app/hooks/useCategory";
import s from "./index.module.css";
import ProductCard from "@/components/UI/ProductCard/ProductCard";
import LoadingError from "@/components/UI/LoadingError/LoadingError";
import { useSelector } from "react-redux";
import { selectFilteredProducts } from "@/features/catalog/catalogSelector";
import { RootState } from "@/app/store";
import useResetFiltersOnRouteChange from "@/app/hooks/resetFilter";

const ProductMenu = () => {
  const { id } = useParams<{ id: string }>();
  const { category, products, count, loading, error } = useCategory(id);
  const filteredProducts = useSelector((state: RootState) =>
    selectFilteredProducts(state, products)
  );
  useResetFiltersOnRouteChange();

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
