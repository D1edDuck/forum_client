import { RootState } from "@/app/store";
import useResetFilters from "@/features/products/filter/hooks/useResetFilters";
import { useAppSelector } from "@/app/hooks/useAppSelector";

const useProductMenu = () => {
  const { filterProducts, loading, count, name } = useAppSelector(
    (state: RootState) => state.product
  );

  useResetFilters(); // сброс фильтров

  return { filterProducts, loading, count, name };
};

export default useProductMenu;
