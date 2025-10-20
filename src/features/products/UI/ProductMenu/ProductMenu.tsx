import useProductMenu from "../../hooks/useProductMenu";
import s from "./index.module.css";
import ProductCard from "@/features/products/UI/ProductCard/ProductCard";

const ProductMenu = () => {
  const { filterProducts, loading, count, name } = useProductMenu();

  return (
    <div className="mb">
      <div className="flex aic gap">
        <h2 className={s.title}>{name ?? "Категория"}</h2>
        <p className={s.count}>{count.products} товаров найдено</p>
      </div>

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
