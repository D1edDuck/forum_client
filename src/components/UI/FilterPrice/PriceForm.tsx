import { useDispatch, useSelector } from "react-redux";
import { inputMax, inputMin } from "@/features/catalog/catalogSlice";
import type { RootState, AppDispatch } from "@/app/store";
import s from "./index.module.css";
import { useState } from "react";

export const PriceForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const minValue = useSelector((state: RootState) => state.catalog.minValue);
  const maxValue = useSelector((state: RootState) => state.catalog.maxValue);

  const [min, setMin] = useState<string>(
    minValue !== null ? String(minValue) : ""
  );
  const [max, setMax] = useState<string>(
    maxValue !== null ? String(maxValue) : ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(inputMin(min === "" ? null : Number(min)));
    dispatch(inputMax(max === "" ? null : Number(max)));

    onSubmit();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.formInput}>
        <p>от</p>
        <input
          type="number"
          className={s.input}
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
      </div>
      <div>
        <p>до</p>
        <input
          type="number"
          className={s.input}
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
      </div>
      <button className={s.button} type="submit">
        Готово
      </button>
    </form>
  );
};
