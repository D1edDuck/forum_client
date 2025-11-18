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
      Сбросить
    </button>
  );
};

export default ButtonReset;
