import ProductMenu from "@/components/Catalog/ProductMenu/ProductMenu";
import NavigateLine from "@/components/UI/NavigateLine/NavigateLine";

const ProductCatalogPage = () => {
  return (
    <div className="container">
      <NavigateLine />
      <ProductMenu />
    </div>
  );
};

export default ProductCatalogPage;
