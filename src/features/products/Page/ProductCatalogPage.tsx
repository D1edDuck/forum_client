import ProductMenu from "@/features/products/UI/ProductMenu/ProductMenu";
import FilterBar from "@/features/products/filter/UI/FilterBrandStock/FilterBar";
import FilterList from "@/features/products/filter/UI/FilterPrice/FilterPrice";
import FindProduct from "@/features/products/filter/UI/FindProduct/FindProduct";
import NavigateLine from "@/UI/NavigateLine/NavigateLine";
import TagsFilters from "@/features/products/filter/UI/TagsFilters/TagsFilters";
import { useProductCatalog } from "../hooks/useProductCatalog";
import s from "./index.module.css";

const ProductCatalogPage = () => {
  const { products } = useProductCatalog();

  return (
    <div className={s.page}>
      <div className={`container ${s.content}`}>
        <NavigateLine />

        <div className={s.header}>
          <h1 className={s.title}>Каталог продуктов</h1>
        </div>

        <div className={s.filterWrapper}>
          <div className={s.filterRow}>
            <FilterList title="Цена" />
            <FilterBar title="Бренд" products={products} variant="brand" />
            <FilterBar title="В наличии" products={products} variant="stock" />
            <FindProduct />
          </div>
        </div>

        <TagsFilters />

        <ProductMenu />
      </div>
    </div>
  );
};

export default ProductCatalogPage;
