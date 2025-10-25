import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsFilter } from "../productsThunks";
import { IFilter } from "@/api/type";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";

export const useProductCatalog = (filters?: Partial<IFilter>) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const memoizedFilters = useMemo(
    () => ({
      brand: filters?.brand ?? [],
      stock: filters?.stock ?? [],
      minValue: filters?.minValue ?? 0,
      maxValue: filters?.maxValue ?? 0,
      search: filters?.search ?? "",
    }),
    [
      filters?.brand,
      filters?.stock,
      filters?.minValue,
      filters?.maxValue,
      filters?.search,
    ]
  );

  useEffect(() => {
    if (!id) return;

    const finalFilters = {
      categoryId: id,
      ...memoizedFilters,
    };

    dispatch(fetchProductsFilter(finalFilters));
  }, [dispatch, id, memoizedFilters]);

  const { products, loading, error } = useAppSelector((state) => state.product);

  return { products, loading, error };
};
