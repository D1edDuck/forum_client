import NavigateLine from "@/UI/NavigateLine/NavigateLine";
import SideBar from "../../../features/profile/UI/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import s from "./index.module.css";

const ProfilePage = () => {
  return (
    <div className={s.page}>
      <div className={s.container}>
        <NavigateLine />
        <h2 className={s.title}>Личный кабинет</h2>
        <div className={s.flex}>
          <SideBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
