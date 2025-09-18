import { useCategory } from "@/app/hooks/useCategory";
import ProductMenu from "@/components/Catalog/ProductMenu/ProductMenu";
import FilterBar from "@/components/UI/FilterBar/FilterBar";
import FilterList from "@/components/UI/FilterPrice/FilterPrice";
import FindProduct from "@/components/UI/FindProduct/FindProduct";
import NavigateLine from "@/components/UI/NavigateLine/NavigateLine";
import TagsFilters from "@/components/UI/TagsFilters/TagsFilters";
import { useParams } from "react-router-dom";

const ProductCatalogPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useCategory(id);

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
