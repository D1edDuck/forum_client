import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { JSX, useEffect, useState } from "react";
import { hideLoading, showLoading } from "@/UI/Loader/loaderSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { token, loading, initialized } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    dispatch(showLoading("Проверка авторизации..."));

    if (initialized && !loading) {
      dispatch(hideLoading());
      setChecked(true);
    }
  }, [dispatch, initialized, loading]);

  if (!checked) return null;

  if (token) return <Navigate to="/profile/me" replace />;

  return children;
};
export default PublicRoute;
