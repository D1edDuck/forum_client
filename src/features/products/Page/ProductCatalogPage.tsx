import ProductMenu from "@/features/products/UI/ProductMenu/ProductMenu";
import FilterBar from "@/features/products/filter/UI/FilterBrandStock/FilterBar";
import FilterList from "@/features/products/filter/UI/FilterPrice/FilterPrice";
import FindProduct from "@/features/products/filter/UI/FindProduct/FindProduct";
import NavigateLine from "@/UI/NavigateLine/NavigateLine";
import TagsFilters from "@/features/products/filter/UI/TagsFilters/TagsFilters";
import { useProductCatalog } from "../hooks/useProductCatalog";

const ProductCatalogPage = () => {
  const { products } = useProductCatalog();

  return (
    <div className="container pb4 mb">
      <NavigateLine />

      <div className="flex gap">
        <FilterList title="Цена" />
        <FilterBar title="Бренд" products={products} variant="brand" />
        <FilterBar title="В наличии" products={products} variant="stock" />
        <FindProduct />
      </div>

      <TagsFilters />

      <ProductMenu />
    </div>
  );
};

export default ProductCatalogPage;
