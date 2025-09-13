import SelectMenu from "@/components/Catalog/SelectMenu/SelectMenu";
import NavigateLine from "@/components/UI/NavigateLine/NavigateLine";

const CatalogPage: React.FC = () => {
  return (
    <section>
      <div className="container">
        <NavigateLine />
        <SelectMenu />
      </div>
    </section>
  );
};

export default CatalogPage;
