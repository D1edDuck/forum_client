import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { resetForm } from "../../repairSlice";
import { repairAdmin } from "../../repairThunk";

const ButtonReset = () => {
  const dispatch = useAppDispatch();
  return (
    <button
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
