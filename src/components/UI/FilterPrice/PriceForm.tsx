import { useDispatch, useSelector } from "react-redux";
import { inputMax, inputMin } from "@/features/catalog/catalogSlice";
import type { RootState, AppDispatch } from "@/app/store";
import s from "./index.module.css";

export const PriceForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const minValue = useSelector((state: RootState) => state.catalog.minValue);
  const maxValue = useSelector((state: RootState) => state.catalog.maxValue);

  return (
    <form
      className={s.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={s.formInput}>
        <p>от</p>
        <input
          type="number"
          className={s.input}
          value={minValue ?? ""}
          onChange={(e) => dispatch(inputMin(Number(e.target.value)))}
        />
      </div>
      <div>
        <p>до</p>
        <input
          type="number"
          className={s.input}
          value={maxValue ?? ""}
          onChange={(e) => dispatch(inputMax(Number(e.target.value)))}
        />
      </div>
      <button className={s.button} type="submit">
        Готово
      </button>
    </form>
  );
};
