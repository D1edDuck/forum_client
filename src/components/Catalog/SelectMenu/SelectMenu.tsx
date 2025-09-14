import { useCategories } from "@/app/hooks/useCategories";
import { Link } from "react-router-dom";
import s from "./index.module.css";
import LoadingError from "@/components/UI/LoadingError/LoadingError";

const SelectMenu = () => {
  const { data: catalog, loading, error } = useCategories();

  return (
    <div className={s.grid}>
      <LoadingError loading={loading} error={error} />

      {!loading &&
        !error &&
        catalog.map((cat) => (
          <div className={s.category} key={cat.id}>
            <p>{cat.name}</p>
            <Link to={`${cat.id}/${cat.slug}`}>{">"}</Link>
          </div>
        ))}
    </div>
  );
};

export default SelectMenu;
