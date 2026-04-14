import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { JSX, useEffect, useState } from "react";

export const RoleCheck = ({ children }: { children: JSX.Element }) => {
  const { user, initialized } = useAppSelector((state) => state.user);
  const location = useLocation();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (initialized) {
      const timer = setTimeout(() => setIsReady(true), 50);
      return () => clearTimeout(timer);
    }
  }, [initialized]);

  if (!isReady) return null;

  if (user?.role !== "admin") {
    return <Navigate to={location.state?.from || "/profile/me"} replace />;
  }

  return children;
};
