import ProductMenu from "@/features/products/UI/ProductMenu/ProductMenu";
import FilterBar from "@/features/products/filter/UI/FilterBrandStock/FilterBar";
import FilterList from "@/features/products/filter/UI/FilterPrice/FilterPrice";
import FindProduct from "@/features/products/filter/UI/FindProduct/FindProduct";
import NavigateLine from "@/UI/NavigateLine/NavigateLine";
import TagsFilters from "@/features/products/filter/UI/TagsFilters/TagsFilters";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { fetchProducts } from "@/features/products/productsThunks";

const ProductCatalogPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(fetchProducts(id));
  }, [dispatch, id]);

  const { products } = useAppSelector((state) => state.product);

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
