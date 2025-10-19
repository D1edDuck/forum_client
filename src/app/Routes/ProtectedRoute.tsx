import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token, loading, initialized } = useAppSelector((state) => state.user);

  if (!initialized || loading) return <p>Загрузка...</p>;

  if (!token) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
