import { useDispatch, useSelector } from "react-redux";
import { useFilterProduct } from "../../../app/hooks/useFilterProduct";
import { AppDispatch, RootState } from "../../../app/store";
import { useState } from "react";
import { inputMax, inputMin } from "@/features/catalog/catalogSlice";

export const usePriceForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { applyFilter } = useFilterProduct();
  const dispatch = useDispatch<AppDispatch>();

  const options = useSelector((state: RootState) => state.catalog);

  const [min, setMin] = useState<string>(
    options.minValue !== null ? String(options.minValue) : ""
  );
  const [max, setMax] = useState<string>(
    options.maxValue !== null ? String(options.maxValue) : ""
  );

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    dispatch(inputMin(min === "" ? null : Number(min)));
    dispatch(inputMax(max === "" ? null : Number(max)));

    applyFilter({
      minValue: min === "" ? 0 : Number(min),
      maxValue: max === "" ? 0 : Number(max),
    });

    onSubmit();
  };

  return { min, max, setMax, setMin, handleSubmit };
};
