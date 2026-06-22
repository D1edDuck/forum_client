import { JSX, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, initialized } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const everInitialized = useRef(initialized);

  if (initialized) everInitialized.current = true;

  useEffect(() => {
    if (everInitialized.current && user) {
      navigate("/profile/me", { replace: true });
    }
  }, [user, navigate]);

  if (!everInitialized.current) {
    return null;
  }

  return children;
};

export default PublicRoute;
