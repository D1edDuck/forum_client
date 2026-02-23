import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { resetForm } from "../../repairSlice";
import { repairAdmin } from "../../repairThunk";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import s from "./index.module.css";

const ButtonReset = () => {
  const filters = useAppSelector((state) => state.repair.formValue);
  const dispatch = useAppDispatch();

  if (Object.keys(filters).length === 0) return null;

  return (
    <button
      className={s.btn}
      onClick={() => {
        dispatch(resetForm());
        dispatch(repairAdmin());
      }}
    >
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
      <span className={s.text}>Сбросить</span>
    </button>
  );
};

export default ButtonReset;
