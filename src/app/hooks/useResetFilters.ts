import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "./useAppDispatch";
import { resetOptions } from "@/features/products/filter/filterSlice";

const useResetFilters = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetOptions()); //сбрасываем фильтры при переходах страницы
  }, [location.pathname, dispatch]);
};

export default useResetFilters;
