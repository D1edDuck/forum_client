import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetOptions } from "@/features/catalog/catalogSlice";

const useResetFilters = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetOptions()); //сбрасываем фильтры при переходах страницы
  }, [location.pathname, dispatch]);
};

export default useResetFilters;
