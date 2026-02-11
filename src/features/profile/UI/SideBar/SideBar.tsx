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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navItems = [
    { path: "me", label: "Профиль", icon: "👤", adminOnly: false },
    { path: "repairs", label: "Заявки", icon: "🔧", adminOnly: false },
    { path: "settings", label: "Настройки", icon: "⚙️", adminOnly: false },
    { path: "datebase", label: "База данных", icon: "🗄️", adminOnly: true },
  ];

  if (!user) return <p>Вы не авторизированны</p>;

  return (
    <div className={`${s.card} ${s.border}`}>
      <div className={s.userHeader}>
        <div className={s.avatar}>{getInitials(user.name as string)}</div>
        <div className={s.userInfo}>
          <h3 className={s.userName}>{user.name}</h3>
          <span className={s.userRole}>
            {user.role === "admin" ? "Администратор" : "Пользователь"}
          </span>
        </div>
      </div>

      <div className={s.links}>
        {navItems.map(({ path, label, icon, adminOnly }) => {
          if (adminOnly && user.role !== "admin") return null;

          return (
            <div key={path} className={s.linkItem}>
              <Link to={path} className={isActive(path) ? s.active : ""}>
                <span className={s.linkIcon}>{icon}</span>
                <span>{label}</span>
                {adminOnly && user.role === "admin" && (
                  <span className={s.adminBadge}>Admin</span>
                )}
              </Link>
            </div>
          );
        })}
      </div>

      <button onClick={() => dispatch(logout())} className={s.logoutBtn}>
        <span>Выйти</span>
        <span className={s.logoutIcon}>→</span>
      </button>
    </div>
  );
};

export default SideBar;
