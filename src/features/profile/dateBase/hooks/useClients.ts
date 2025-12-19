import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useEffect } from "react";
import { fetchUsersAll } from "../dbThunks";
import { useAppSelector } from "@/app/hooks/useAppSelector";

const useClients = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.db);

  useEffect(() => {
    dispatch(fetchUsersAll());
  }, [dispatch]);

  return users;
};

export default useClients;
