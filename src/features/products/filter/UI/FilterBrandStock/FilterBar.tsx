import { useMemo } from "react";
import s from "./index.module.css";
import { useOpenFilter } from "@/features/products/filter/hooks/useOpenFilter";
import FilterForm from "./FilterForm";
import { IProduct } from "@/api/type";
import Arrow from "@/UI/Arrow/Arrow";

interface IProps {
  title: string;
  products: IProduct[];
  variant: "brand" | "stock";
}

const optionsMap = {
  brand: (products: IProduct[]) =>
    Array.from(new Set(products.map((p) => p.brand))),
  stock: () => ["Да", "Нет"],
};

const FilterBar = ({ title, products, variant }: IProps) => {
  const { open, toggle, ref } = useOpenFilter();

  const names = useMemo(() => {
    const getOptions = optionsMap[variant];
    return getOptions ? getOptions(products) : [];
  }, [products, variant]);

  return (
    <div className={s.block} ref={ref}>
      <div className={`${s.filter} ${open ? s.open : ""}`} onClick={toggle}>
        <button type="button">
          <span>{title}</span>
          <span className={s.arr}>
            <Arrow color="w" size="s" open={open} />
          </span>
        </button>
      </div>

      {open && (
        <div className={s.formContainer}>
          <FilterForm toggle={toggle} names={names} variant={variant} />
        </div>
      )}
    </div>
  );
};

export default FilterBar;
