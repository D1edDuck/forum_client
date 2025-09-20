import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import s from "./index.module.css";
import ResetFilters from "../ResetFilters/ResetFilters";

const TagsFilters = () => {
  const { brand, stock, minValue, maxValue, search } = useSelector(
    (state: RootState) => state.catalog
  );

  const renderStockTag = (name: string, i: number) => {
    const label =
      name === "Да" ? "В наличии" : name === "Нет" ? "Нет в наличии" : name;
    return (
      <div key={i} className={s.tag}>
        {label}
      </div>
    );
  };

  if (
    brand.length === 0 &&
    stock.length === 0 &&
    minValue === 0 &&
    maxValue === 0 &&
    search === ""
  )
    return null;

  return (
    <div className="flex gap">
      {brand.map((name, i) => (
        <div key={`brand-${i}`} className={s.tag}>
          {name}
        </div>
      ))}

      {stock.map((name, i) => renderStockTag(name, i))}

      {minValue !== 0 && <div className={s.tag}>{minValue} ₽</div>}
      {maxValue !== 0 && <div className={s.tag}>{maxValue} ₽</div>}

      <div className={s.tag}>{search}</div>

      <ResetFilters />
    </div>
  );
};

export default TagsFilters;
