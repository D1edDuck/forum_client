import SelectMenu from "@/features/catalog/UI/SelectMenu/SelectMenu";
import NavigateLine from "@/UI/NavigateLine/NavigateLine";
import s from "./index.module.css";

const CatalogPage = () => {
  return (
    <section className={s.page}>
      <div className={`container ${s.content}`}>
        <NavigateLine />

        <div className={s.header}>
          <h1 className={s.title}>Каталог товаров</h1>
        </div>

        <SelectMenu />
      </div>
    </section>
  );
};

export default CatalogPage;
