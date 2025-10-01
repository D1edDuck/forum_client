import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resetOptions } from "@/features/catalog/catalogSlice";
import { useAppDispatch } from "./useAppDispatch";

const useResetFilters = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetOptions()); //сбрасываем фильтры при переходах страницы
  }, [location.pathname, dispatch]);
};

export default useResetFilters;
