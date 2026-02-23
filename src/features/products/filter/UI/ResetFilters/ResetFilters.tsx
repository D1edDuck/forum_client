import s from "./index.module.css";
import { useFilterProduct } from "@/features/products/filter/hooks/useFilterProduct";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { resetOptions } from "../../filterSlice";

const ResetFilters = () => {
  const dispatch = useAppDispatch();
  const { resetFilters } = useFilterProduct();

  function reset() {
    dispatch(resetOptions());
    resetFilters();
  }

  return (
    <button className={s.btn} onClick={() => reset()}>
      <svg
        className={s.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 6h18M9 12h6M7 18h10" />
        <circle cx="12" cy="6" r="2" />
        <circle cx="8" cy="12" r="2" />
        <circle cx="16" cy="18" r="2" />
      </svg>
      <span className={s.text}>Сбросить фильтр</span>
    </button>
  );
};

export default ResetFilters;
