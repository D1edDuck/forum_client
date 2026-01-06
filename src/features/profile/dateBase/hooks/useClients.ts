import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useEffect } from "react";
import { fetchProductsAll, fetchUsersAll } from "../dbThunks";
import { useAppSelector } from "@/app/hooks/useAppSelector";

const useClients = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.db);
  const repairs = useAppSelector((state) => state.repair.repairs);
  const products = useAppSelector((state) => state.db.products);

  useEffect(() => {
    dispatch(fetchUsersAll());
    dispatch(fetchProductsAll());
  }, [dispatch]);

  return { users, repairs, products };
};

export default useClients;
