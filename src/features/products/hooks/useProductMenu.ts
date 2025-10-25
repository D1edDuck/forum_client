import { RootState } from "@/app/store";
import useResetFilters from "@/features/products/filter/hooks/useResetFilters";
import { useAppSelector } from "@/app/hooks/useAppSelector";

const useProductMenu = () => {
  const { products, loading, count } = useAppSelector(
    (state: RootState) => state.product
  );

  useResetFilters(); // сброс фильтров

  return { products, loading, count };
};

export default useProductMenu;
