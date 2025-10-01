import { filterData } from "@/features/products/productsSlice";
import { IFilter } from "@/api/type";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";

export const useFilterProduct = () => {
  const dispatch = useAppDispatch();
  const options = useAppSelector((state) => state.catalog);

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
