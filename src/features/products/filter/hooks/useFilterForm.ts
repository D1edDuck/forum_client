import { useEffect, useState } from "react";
import { RootState } from "@/app/store";
import { useFilterProduct } from "./useFilterProduct";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setBrand, setStock } from "../filterSlice";

interface IProps {
  toggle: () => void;
  variant: "brand" | "stock";
}

export const useFilterForm = ({ toggle, variant }: IProps) => {
  const dispatch = useAppDispatch();
  const values = useAppSelector((state: RootState) => state.filter[variant]);
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
      applyFilter({ brand: select });
    } else {
      dispatch(setStock(select));
      applyFilter({ stock: select });
    }
    toggle();
  }

  return { select, addFilter, handleSubmit };
};
