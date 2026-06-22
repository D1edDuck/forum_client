import { Navigate } from "react-router-dom";
import { JSX, useRef } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, initialized } = useAppSelector((state) => state.user);
  const everInitialized = useRef(initialized);

  if (initialized) everInitialized.current = true;

  if (!everInitialized.current) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
