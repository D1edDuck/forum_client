import { useOpenFilter } from "@/features/products/filter/hooks/useOpenFilter";
import { FC, ReactElement } from "react";
import s from "./index.module.css";
import React from "react";

interface IProps {
  title: string;
  children: ReactElement<{ toggle: () => void }>; // Указываем, что `children` должен быть компонентом с пропсом `toggle`
}

const FilterButton: FC<IProps> = ({ title, children }) => {
  const { open, ref, toggle } = useOpenFilter();

  const clonedChildren = React.isValidElement(children)
    ? React.cloneElement(children, { toggle })
    : children;

  return (
    <div ref={ref} className={s.btn}>
      <button onClick={toggle}>
        <span>{title}</span>
        <span>{open ? "▴" : "▾"}</span>
      </button>
      {open && clonedChildren}
    </div>
  );
};

export default FilterButton;
