import SelectMenu from "@/features/catalog/UI/SelectMenu/SelectMenu";
import NavigateLine from "@/components/UI/NavigateLine/NavigateLine";

const CatalogPage: React.FC = () => {
  return (
    <section>
      <div className="container mb4 pb4">
        <NavigateLine />
        <SelectMenu />
      </div>
    </section>
  );
};

export default CatalogPage;
