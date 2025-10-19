import { useAppSelector } from "@/app/hooks/useAppSelector";
import s from "./index.module.css";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { logout } from "../../userSlice";
import { Link } from "react-router-dom";

const SideBar = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  if (!user) return <p>Вы не авторизированны</p>;

  return (
    <div className={s.card}>
      <h3>{user.name}</h3>
      <div className={s.links}>
        <hr className={s.hr} />
        <p>
          <Link to={"me"}>Профиль</Link>
        </p>
        <hr className={s.hr} />
        <p>
          <Link to={"repairs"}>Мои заявки</Link>
        </p>
        <hr className={s.hr} />
        <p>Настройки</p>
        <hr className={s.hr} />
      </div>
      <button onClick={() => dispatch(logout())} className={s.log}>
        Выйти
      </button>
    </div>
  );
};

export default SideBar;
