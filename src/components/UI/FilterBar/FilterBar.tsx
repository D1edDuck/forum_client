import { useMemo } from "react";
import s from "./index.module.css";
import { IProduct } from "@/api/category";
import { useFilterPrice } from "@/app/hooks/useFilterPrice";
import FilterForm from "./FilterForm";

interface IProps {
  title: string;
  products: IProduct[];
  variant: string;
}

const FilterBar = ({ title, products, variant }: IProps) => {
  const { open, toggle, ref } = useFilterPrice();

  const names = useMemo(() => {
    if (variant === "brand") {
      return Array.from(new Set(products.map((p) => p.brand)));
    }
    if (variant === "stock") {
      return ["Да", "Нет"];
    }
    return [];
  }, [products, variant]);

  return (
    <div className={s.block} ref={ref}>
      <div className={s.filter}>
        <div className="flex gap" onClick={toggle}>
          <p>{title}</p>
          <p>{open ? "▴" : "▾"}</p>
        </div>

        {open && (
          <FilterForm handleSubmit={toggle} names={names} variant={variant} />
        )}
      </div>
    </div>
  );
};

export default FilterBar;
