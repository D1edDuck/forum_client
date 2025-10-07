import s from "./index.module.css";
import LoadingError from "@/components/UI/LoadingError/LoadingError";
import LinkCategory from "../Link/LinkCategory";
import { useEffect } from "react";
import { fetchCatalog } from "../../catalogThunk";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";

const SelectMenu = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  const { loading, error, category } = useAppSelector((state) => state.catalog);

  return (
    <div className={s.grid}>
      <LoadingError loading={loading} error={error} />

      {!loading && !error && category.map((cat) => <LinkCategory cat={cat} />)}
    </div>
  );
};

export default SelectMenu;
