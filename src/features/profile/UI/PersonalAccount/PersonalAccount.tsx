import { useAppSelector } from "@/app/hooks/useAppSelector";
import s from "./index.module.css";

const PersonalAccount = () => {
  const user = useAppSelector((state) => state.user.user);

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
        <p>Email</p>
        <p className={s.info}>{user.email || "Не указано"}</p>
      </div>
      <div className={s.btns}>
        <button className={s.edit}>Редактировать</button>
      </div>
    </div>
  );
};

export default PersonalAccount;
