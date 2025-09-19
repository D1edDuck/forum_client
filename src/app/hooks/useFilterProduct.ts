import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { filterData } from "@/features/products/productsSlice";

export const useFilterProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const options = useSelector((state: RootState) => state.catalog);

  const applyFilter = (customFilters?: Partial<typeof options>) => {
    const filters = {
      brand: customFilters?.brand ?? options.brand,
      stock: customFilters?.stock ?? options.stock,
      minValue: customFilters?.minValue ?? options.minValue ?? 0,
      maxValue: customFilters?.maxValue ?? options.maxValue ?? Infinity,
    };

    dispatch(filterData(filters)); // фильтруем продукты
  };

  const resetFilters = () => {
    dispatch(
      filterData({ brand: [], stock: [], minValue: 0, maxValue: Infinity }) // сброс фильтров
    );
  };

  return { applyFilter, resetFilters };
};
