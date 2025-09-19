import { AppDispatch } from "@/app/store";
import { resetOptions } from "@/features/catalog/catalogSlice";
import { useDispatch } from "react-redux";
import s from "./index.module.css";
import { useFilterProduct } from "@/app/hooks/useFilterProduct";

const ResetFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { resetFilters } = useFilterProduct();

  function reset() {
    dispatch(resetOptions());
    resetFilters();
  }

  return (
    <button className={s.btn} onClick={() => reset()}>
      Сбросить фильтр
    </button>
  );
};

export default ResetFilters;
