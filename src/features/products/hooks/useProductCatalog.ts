import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsFilter } from "../productsThunks";
import { IFilter } from "@/api/type";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";

export const useProductCatalog = (filters?: Partial<IFilter>) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {
    brand = [],
    stock = [],
    minValue = 0,
    maxValue = 0,
    search = "",
  } = filters || {};

  useEffect(() => {
    if (!id) return;

    const finalFilters = {
      categoryId: id,
      brand,
      stock,
      minValue,
      maxValue,
      search,
    };

    dispatch(fetchProductsFilter(finalFilters));
  }, [dispatch, id, brand, stock, minValue, maxValue, search]);

  const { products, loading, error } = useAppSelector((state) => state.product);

  return { products, loading, error };
};
