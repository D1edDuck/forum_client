import { useMemo } from "react";
import s from "./index.module.css";
import { useOpenFilter } from "@/features/products/filter/hooks/useOpenFilter";
import FilterForm from "./FilterForm";
import { IProduct } from "@/api/type";

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
      <div className={s.filter}>
        <button
          type="button"
          className="flex gap items-center"
          onClick={toggle}
        >
          <span>{title}</span>
          <span>{open ? "▴" : "▾"}</span>
        </button>

        {open && <FilterForm toggle={toggle} names={names} variant={variant} />}
      </div>
    </div>
  );
};

export default FilterBar;
