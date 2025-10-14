import NavigateLine from "@/components/UI/NavigateLine/NavigateLine";
import PersonalAccount from "@/features/profile/UI/PersonalAccount/PersonalAccount";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Repairs from "@/features/profile/UI/Repairs/Repairs";

const ProfilePage = () => {
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromCookie = Cookies.get("jwt");
    if (!token && !tokenFromCookie) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <div className="container pb fled mb">
        <NavigateLine />
        <h2 className="title">Личный кабинет</h2>
        <div className="flex gap">
          <PersonalAccount />
          <Repairs />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
