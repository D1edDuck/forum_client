import ProductMenu from "@/features/products/UI/ProductMenu/ProductMenu";
import FilterBar from "@/features/products/UI/FilterBar/FilterBar";
import FilterList from "@/features/products/UI/FilterPrice/FilterPrice";
import FindProduct from "@/features/products/UI/FindProduct/FindProduct";
import NavigateLine from "@/components/UI/NavigateLine/NavigateLine";
import TagsFilters from "@/features/products/UI/TagsFilters/TagsFilters";
import { useParams } from "react-router-dom";
import { useProductsCategory } from "@/features/products/hooks/useProductsCategory";

const ProductCatalogPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product } = useProductsCategory(id);

  return (
    <div className="container pb4 mb">
      <NavigateLine />
      <div className="flex gap">
        <FilterList title="Цена" />
        <FilterBar title="Бренд" products={product} variant="brand" />
        <FilterBar title="В наличии" products={product} variant="stock" />
        <FindProduct />
      </div>

      <TagsFilters />

      <ProductMenu />
    </div>
  );
};

export default ProductCatalogPage;
