import { useAppSelector } from "@/app/hooks/useAppSelector";
import { logout } from "../../userSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import s from "./index.module.css";

const PersonalAccount = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  if (!user) {
    return <p>Вы не авторизированны</p>;
  }

  return (
    <div className={s.block}>
      <h3 className={s.title}>Мой профиль</h3>
      <div className={s.grid}>
        <p>Имя Фамилия</p>
        <p className={s.info}>{user.name}</p>
        <hr className={s.hr} />
        <p>Номер телефона</p>
        <p className={s.info}>{user.phone}</p>
        <hr className={s.hr} />
        {user.email && (
          <>
            <p>Email</p>
            <p className={s.info}>{user.email}</p>
          </>
        )}
      </div>
      <div className={s.btns}>
        <button onClick={() => dispatch(logout())} className={s.log}>
          Выйти
        </button>
        <button className={s.edit}>Редактировать</button>
      </div>
    </div>
  );
};

export default PersonalAccount;
