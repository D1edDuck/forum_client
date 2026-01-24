import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useEffect } from "react";
import { fetchCategoryAll, fetchProductsAll, fetchUsersAll } from "../dbThunks";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { repairAdmin } from "../../repairs/repairThunk";

const useClients = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.db);
  const repairs = useAppSelector((state) => state.repair);
  const products = useAppSelector((state) => state.db.products);
  const category = useAppSelector((state) => state.db.category);

  useEffect(() => {
    dispatch(fetchUsersAll());
    dispatch(fetchProductsAll());
    dispatch(repairAdmin());
    dispatch(fetchCategoryAll());
  }, [dispatch]);

  return { users, repairs, products, category, dispatch };
};

export default useClients;
