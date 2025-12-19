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

    if (path === "datebase") {
      return currentPath.includes("/datebase");
    }
    return false;
  };

  if (!user) return <p>Вы не авторизированны</p>;

  return (
    <div
      className={`${s.card} ${location.pathname === "/profile/repairs" ? s.border : ""}`}
    >
      <h3>{user.name}</h3>
      <div className={s.links}>
        <Link to={"me"} className={isActive("me") ? s.active : ""}>
          Профиль
        </Link>

        <Link to={"repairs"} className={isActive("repairs") ? s.active : ""}>
          Заявки
        </Link>

        <Link to={"settings"}>Настройки</Link>

        {user?.role == "admin" && (
          <Link
            to={"datebase"}
            className={isActive("datebase") ? s.active : ""}
          >
            База данных
          </Link>
        )}
      </div>
      <button onClick={() => dispatch(logout())} className={s.log}>
        Выйти
      </button>
    </div>
  );
};

export default SideBar;
