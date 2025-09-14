import { useCallback, useMemo, useState } from "react";
import s from "./index.module.css";
import { IProduct } from "@/api/category";

interface IProps {
  title: string;
  products: IProduct[];
  variant: string;
}

const FilterBar = ({ title, products, variant }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const names = useMemo(() => {
    if (variant === "brand") {
      return Array.from(new Set(products.map((p) => p.brand)));
    }
    if (variant === "stock") {
      return ["Да", "Нет"];
    }
    return [];
  }, [products, variant]);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toggle();
  }

  return (
    <div className={s.block}>
      <div className={s.filter}>
        <div className="flex gap" onClick={toggle}>
          <p>{title}</p>
          <p>{open ? "▴" : "▾"}</p>
        </div>

        {open && (
          <div className={s.form}>
            <ul className={s.ul}>
              {names.length === 0 && <li className={s.item}>Нет опций</li>}

              {names.map((name, idx) => {
                const safeId = `filter-${variant}-${idx}`;

                return (
                  <li key={safeId} className={s.item}>
                    <input id={safeId} type="checkbox" className={s.checkbox} />
                    <label
                      htmlFor={safeId}
                      id={`label-${safeId}`}
                      className={s.label}
                    >
                      <span className={s.box} />
                      <span className={s.text}>{name}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <button className={s.button} onClick={handleSubmit}>
              Готово
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
