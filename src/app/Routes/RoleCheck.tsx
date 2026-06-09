import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { JSX, useRef } from "react";

export const RoleCheck = ({ children }: { children: JSX.Element }) => {
  const { user, initialized } = useAppSelector((state) => state.user);
  const location = useLocation();
  const everInitialized = useRef(initialized);

  if (initialized) everInitialized.current = true;

  if (!everInitialized.current) return null;

  if (user?.role !== "admin") {
    return <Navigate to={location.state?.from || "/profile/me"} replace />;
  }

  return children;
};

export default RoleCheck;
