import { useAppSelector } from "@/app/hooks/useAppSelector";
import s from "./index.module.css";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { logout } from "../../userSlice";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isActive = (path: string) => {
    const currentPath = location.pathname;

    if (path === "me") {
      return (
        currentPath.endsWith("/me") ||
        (currentPath.endsWith("/profile") &&
          !currentPath.includes("/repairs") &&
          !currentPath.includes("/settings"))
      );
    }

    if (path === "repairs") {
      return currentPath.includes("/repairs");
    }

    if (path === "settings") {
      return currentPath.includes("/settings");
    }
    return false;
  };

  if (!user) return <p>Вы не авторизированны</p>;

  return (
    <div className={s.card}>
      <h3>{user.name}</h3>
      <div className={s.links}>
        <p>
          <Link to={"me"} className={isActive("me") ? s.active : ""}>
            Профиль
          </Link>
        </p>
        <hr className={s.hr} />

        <p>
          <Link to={"repairs"} className={isActive("repairs") ? s.active : ""}>
            Мои заявки
          </Link>
        </p>
        <hr className={s.hr} />

        <p className={isActive("settings") ? s.active : ""}>
          <Link to={"settings"}>Настройки</Link>
        </p>
        <hr className={s.hr} />
      </div>
      <button onClick={() => dispatch(logout())} className={s.log}>
        Выйти
      </button>
    </div>
  );
};

export default SideBar;
