import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { filterData } from "@/features/products/productsSlice";
import { IFilter } from "@/api/type";

export const useFilterProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const options = useSelector((state: RootState) => state.catalog);

  const applyFilter = (customFilters?: Partial<IFilter>) => {
    const filters = {
      brand: customFilters?.brand ?? options.brand,
      stock: customFilters?.stock ?? options.stock,
      minValue: customFilters?.minValue ?? options.minValue ?? 0,
      maxValue: customFilters?.maxValue ?? options.maxValue ?? 0,
    };

    dispatch(filterData(filters)); // фильтруем продукты
  };

  const resetFilters = () => {
    dispatch(
      filterData({ brand: [], stock: [], minValue: 0, maxValue: 0 }) // сброс фильтров
    );
  };

  return { applyFilter, resetFilters };
};
