import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PersonalAccount = () => {
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <div></div>;
};

export default PersonalAccount;
