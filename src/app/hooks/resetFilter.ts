import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetFilters } from "@/features/catalog/catalogSlice";

const useResetFiltersOnRouteChange = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilters());
  }, [location.pathname, dispatch]);
};

export default useResetFiltersOnRouteChange;
