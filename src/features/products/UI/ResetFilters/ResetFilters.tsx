import { resetOptions } from "@/features/catalog/catalogSlice";
import s from "./index.module.css";
import { useFilterProduct } from "@/app/hooks/useFilterProduct";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";

const ResetFilters = () => {
  const dispatch = useAppDispatch();
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
