import { IFilter } from "@/api/type";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useParams } from "react-router-dom";
import { fetchProductsFilter } from "../../productsThunks";

export const useFilterProduct = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filter);
  const { id } = useParams<{ id: string }>();

  const applyFilter = (customFilters?: Partial<IFilter>) => {
    if (!id) return;

    const finalFilters = {
      categoryId: id,
      brand: customFilters?.brand ?? filters.brand ?? [],
      stock: customFilters?.stock ?? filters.stock ?? [],
      minValue: customFilters?.minValue ?? filters.minValue ?? 0,
      maxValue: customFilters?.maxValue ?? filters.maxValue ?? 0,
    };

    dispatch(fetchProductsFilter(finalFilters));
  };

  const resetFilters = () => {
    if (!id) return;

    dispatch(
      fetchProductsFilter({
        categoryId: id,
        brand: [],
        stock: [],
        minValue: 0,
        maxValue: 0,
      })
    );
  };

  return { applyFilter, resetFilters };
};
