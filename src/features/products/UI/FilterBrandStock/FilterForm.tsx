import { useFilterForm } from "@/features/products/hooks/useFilterForm";
import s from "./index.module.css";

interface IProps {
  toggle: () => void;
  names: string[];
  variant: "brand" | "stock";
}

const FilterForm = ({ toggle, names, variant }: IProps) => {
  const { select, addFilter, handleSubmit } = useFilterForm({
    toggle,
    variant,
  });

  return (
    <div className={s.form}>
      <ul className={s.ul}>
        {names.length === 0 && <li className={s.item}>Нет опций</li>}

        {names.map((name, idx) => {
          const safeId = `filter-${variant}-${idx}`;
          return (
            <li key={safeId} className={s.item}>
              <input
                id={safeId}
                type="checkbox"
                className={s.checkbox}
                checked={select.includes(name)}
                onChange={() => addFilter(name)}
              />
              <label htmlFor={safeId} className={s.label}>
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
  );
};

export default FilterForm;
