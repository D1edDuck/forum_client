import { useCategories } from "@/features/catalog/hooks/useCategories";
import s from "./index.module.css";
import LoadingError from "@/components/UI/LoadingError/LoadingError";
import LinkCategory from "../Link/LinkCategory";

const SelectMenu = () => {
  const { data: catalog, loading, error } = useCategories();

  return (
    <div className={s.grid}>
      <LoadingError loading={loading} error={error} />

      {!loading && !error && catalog.map((cat) => <LinkCategory cat={cat} />)}
    </div>
  );
};

export default SelectMenu;
