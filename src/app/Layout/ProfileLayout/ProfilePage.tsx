import NavigateLine from "@/UI/NavigateLine/NavigateLine";
import SideBar from "../../../features/profile/UI/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import s from "./index.module.css";

const ProfilePage = () => {
  return (
    <div>
      <div className="container pb fled mb">
        <NavigateLine />
        <h2 className="title">Личный кабинет</h2>
        <div className={s.flex}>
          <SideBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
