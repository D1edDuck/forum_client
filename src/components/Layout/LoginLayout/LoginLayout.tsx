import NavigateLine from "@/components/UI/NavigateLine/NavigateLine";
import { Outlet } from "react-router-dom";
import s from "./index.module.css";

const LoginLayout = () => {
  return (
    <div>
      <div className="container mb pb">
        <NavigateLine />
        <h2 className={s.title}>Личный кабинет</h2>
        <div className={s.block}>
          <div className={s.form}>
            <Outlet />
          </div>
          <div className={s.right}>
            <p className={s.forum}>Форум</p>
            <p className={s.service}>Сервисный центр</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
