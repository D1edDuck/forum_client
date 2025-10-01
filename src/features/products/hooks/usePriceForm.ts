import { useFilterProduct } from "@/app/hooks/useFilterProduct";
import { RootState } from "@/app/store";
import { useState } from "react";
import { inputMax, inputMin } from "@/features/catalog/catalogSlice";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";

export const usePriceForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { applyFilter } = useFilterProduct();
  const dispatch = useAppDispatch();

  const options = useAppSelector((state: RootState) => state.catalog);

  const [min, setMin] = useState<string>(
    options.minValue !== 0 ? String(options.minValue) : ""
  );
  const [max, setMax] = useState<string>(
    options.maxValue !== 0 ? String(options.maxValue) : ""
  );

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    dispatch(inputMin(min === "" ? 0 : Number(min)));
    dispatch(inputMax(max === "" ? 0 : Number(max)));

    applyFilter({
      minValue: min === "" ? 0 : Number(min),
      maxValue: max === "" ? 0 : Number(max),
    });

    onSubmit();
  };

  return { min, max, setMax, setMin, handleSubmit };
};
