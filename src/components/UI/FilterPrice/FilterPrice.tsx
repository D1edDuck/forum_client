import { useState } from "react";
import s from "./index.module.css";

interface IProps {
  title: string;
}

const FilterPrice = ({ title }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);

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
          <form className={s.form}>
            <div className={s.formInput}>
              <p>от</p>
              <input type="number" className={s.input} />
            </div>
            <div>
              <p>до</p>
              <input type="number" className={s.input} />
            </div>
            <button className={s.button} onClick={handleSubmit}>
              Готово
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FilterPrice;
