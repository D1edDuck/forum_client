import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { setBrand, setStock } from "@/features/catalog/catalogSlice";
import { useFilterProduct } from "./useFilterProduct";

interface IUseFilterFormProps {
  toggle: () => void;
  variant: "brand" | "stock";
}

export const useFilterForm = ({ toggle, variant }: IUseFilterFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const values = useSelector((state: RootState) => state.catalog[variant]);
  const [select, setSelect] = useState<string[]>(values);
  const { applyFilter } = useFilterProduct();

  useEffect(() => {
    setSelect(values);
  }, [values]);

  function addFilter(name: string) {
    setSelect((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }

  function handleSubmit() {
    if (variant === "brand") {
      dispatch(setBrand(select));
    } else {
      dispatch(setStock(select));
    }
    applyFilter({ brand: select });
    toggle();
  }

  return { select, addFilter, handleSubmit };
};
