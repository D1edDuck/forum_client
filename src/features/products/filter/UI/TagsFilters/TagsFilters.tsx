import { RootState } from "@/app/store";
import s from "./index.module.css";
import ResetFilters from "../ResetFilters/ResetFilters";
import { useAppSelector } from "@/app/hooks/useAppSelector";

const TagsFilters = () => {
  const { brand, stock, minValue, maxValue, search } = useAppSelector(
    (state: RootState) => state.filter,
  );

  const renderStockTag = (name: string, i: number) => {
    const label =
      name === "Да" ? "В наличии" : name === "Нет" ? "Нет в наличии" : name;
    return (
      <div key={`stock-${i}`} className={`${s.tag} ${s.stock}`}>
        <span>{label}</span>
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
    <div className={s.container}>
      {brand.map((name, i) => (
        <div key={`brand-${i}`} className={`${s.tag} ${s.brand}`}>
          <span>{name}</span>
        </div>
      ))}

      {stock.map((name, i) => renderStockTag(name, i))}

      {minValue !== 0 && (
        <div className={`${s.tag} ${s.price}`}>
          <span>от {minValue} ₽</span>
        </div>
      )}

      {maxValue !== 0 && (
        <div className={`${s.tag} ${s.price}`}>
          <span>до {maxValue} ₽</span>
        </div>
      )}

      {search !== "" && (
        <div className={`${s.tag} ${s.search}`}>
          <span>Поиск: {search}</span>
        </div>
      )}

      <ResetFilters />
    </div>
  );
};

export default TagsFilters;
