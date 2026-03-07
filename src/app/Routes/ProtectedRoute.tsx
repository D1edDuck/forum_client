import { Navigate } from "react-router-dom";
import { JSX, useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
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

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
