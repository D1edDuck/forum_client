import { RootState } from "@/app/store";
import s from "./index.module.css";
import ResetFilters from "../ResetFilters/ResetFilters";
import { useAppSelector } from "@/app/hooks/useAppSelector";

const TagsFilters = () => {
  const { brand, stock, minValue, maxValue, search } = useAppSelector(
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

      {search !== "" && <div className={s.tag}>{search}</div>}

      <ResetFilters />
    </div>
  );
};

export default TagsFilters;
