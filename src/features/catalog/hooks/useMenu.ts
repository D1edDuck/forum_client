import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { fetchCatalog } from "../catalogThunk";

export const useMenu = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCatalog()).unwrap();
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [dispatch]);

  const { loading, error, category } = useAppSelector((state) => state.catalog);

  return { loading, error, category };
};
