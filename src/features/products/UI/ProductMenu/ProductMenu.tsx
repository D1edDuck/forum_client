import useProductMenu from "../../hooks/useProductMenu";
import s from "./index.module.css";
import ProductCard from "@/features/products/UI/ProductCard/ProductCard";

const ProductMenu = () => {
  const { products, loading, count } = useProductMenu();

  if (loading) {
    return (
      <div className={s.loader}>
        <div className={s.spinner} />
        <p>Загрузка товаров...</p>
      </div>
    );
  }

  return (
    <div className={s.menu}>
      <div className={`flex aic gap20 ${s.flex}`}>
        <h2 className={s.title}>Категория</h2>
        <p className={s.count}>{count.products} товаров найдено</p>
      </div>

      {products.length === 0 ? (
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
