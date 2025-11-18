import { useOpenFilter } from "@/features/products/filter/hooks/useOpenFilter";
import { FC, ReactNode } from "react";
import s from "./index.module.css";

interface IProps {
  title: string;
  children: ReactNode;
}

const FilterButton: FC<IProps> = ({ title, children }) => {
  const { open, ref, toggle } = useOpenFilter();
  return (
    <div ref={ref} className={s.btn}>
      <button onClick={toggle}>
        <span>{title}</span>
        <span>{open ? "▴" : "▾"}</span>
      </button>
      {open && children}
    </div>
  );
};

export default FilterButton;
