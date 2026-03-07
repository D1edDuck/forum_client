import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { JSX, useEffect, useState } from "react";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { token, initialized } = useAppSelector((state) => state.user);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (initialized) {
      const timer = setTimeout(() => setIsReady(true), 50);
      return () => clearTimeout(timer);
    }
  }, [initialized]);

  if (!isReady) {
    return null;
  }

  if (token) {
    return <Navigate to="/profile/me" replace />;
  }

  return children;
};

export default PublicRoute;
