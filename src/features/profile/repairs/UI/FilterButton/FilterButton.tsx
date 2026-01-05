import { useOpenFilter } from "@/features/products/filter/hooks/useOpenFilter";
import { FC, ReactElement } from "react";
import s from "./index.module.css";
import React from "react";
import Arrow from "@/UI/Arrow/Arrow";

interface IProps {
  title: string;
  children: ReactElement<{ toggle: () => void }>;
}

const FilterButton: FC<IProps> = ({ title, children }) => {
  const { open, ref, toggle } = useOpenFilter();

  const clonedChildren = React.isValidElement(children)
    ? React.cloneElement(children, { toggle })
    : children;

  return (
    <div ref={ref} className={s.btn}>
      <button onClick={toggle} className={s.span}>
        <span>{title}</span>
        <span className={s.arr}>
          <Arrow size="s" color="w" open={open} />
        </span>
      </button>
      {open && clonedChildren}
    </div>
  );
};

export default FilterButton;
