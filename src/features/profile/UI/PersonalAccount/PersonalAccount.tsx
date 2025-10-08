import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PersonalAccount = () => {
  const { id } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (id === null) {
      navigate("/login");
    }
  }, [id, navigate]);

  return <div></div>;
};

export default PersonalAccount;
