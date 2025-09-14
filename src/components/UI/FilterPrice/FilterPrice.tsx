import { useState } from "react";
import s from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { inputMin } from "@/features/catalog/catalogSlice";
import type { RootState, AppDispatch } from "@/app/store";

interface IProps {
  title: string;
}

const FilterPrice = ({ title }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const minValue = useSelector((state: RootState) => state.catalog.minValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toggle();
  }

  function toggle() {
    setOpen((prev) => !prev);
  }

  return (
    <div className={s.block}>
      <div className={s.filter}>
        <div className="flex gap" onClick={toggle}>
          <p>{title}</p>
          <p>{open ? "▴" : "▾"}</p>
        </div>
        {open && (
          <form className={s.form} onSubmit={handleSubmit}>
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
              <input type="number" className={s.input} />
            </div>
            <button className={s.button} type="submit">
              Готово
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FilterPrice;
