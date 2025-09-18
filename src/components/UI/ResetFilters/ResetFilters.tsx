import { AppDispatch } from "@/app/store";
import { resetFilters } from "@/features/catalog/catalogSlice";
import { useDispatch } from "react-redux";
import s from "./index.module.css";

const ResetFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <button className={s.btn} onClick={() => dispatch(resetFilters())}>
      Сбросить фильтр
    </button>
  );
};

export default ResetFilters;
