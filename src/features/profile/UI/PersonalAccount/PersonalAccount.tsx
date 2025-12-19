import s from "./index.module.css";
import { logout } from "../../userSlice";
import useEditAccount from "../../hooks/useEditAccount";

const PersonalAccount = () => {
  const { dispatch, edit, setEdit, formData, handleChange, handleSave, user } =
    useEditAccount();

  if (!user) {
    return <p>Вы не авторизированны</p>;
  }

  return (
    <div className={s.block}>
      <h3 className={s.title}>Мой профиль</h3>
      <div className={s.grid}>
        <p>Имя Фамилия</p>
        {edit ? (
          <input
            type="text"
            className={s.input}
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        ) : (
          <p className={s.info}>{user.name}</p>
        )}

        <hr className={s.hr} />
        <p>Номер телефона</p>
        {edit ? (
          <input
            type="text"
            className={s.input}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        ) : (
          <p className={s.info}>{user.phone}</p>
        )}

        <hr className={s.hr} />
        <p>Email</p>
        {edit ? (
          <input
            type="email"
            className={s.input}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        ) : (
          <p className={s.info}>{user.email}</p>
        )}
      </div>

      <div className={s.btns}>
        {edit ? (
          <>
            <button className={s.edit} onClick={handleSave}>
              Сохранить
            </button>
            <button className={s.logout} onClick={() => setEdit(false)}>
              Отмена
            </button>
          </>
        ) : (
          <>
            <button className={s.edit} onClick={() => setEdit(true)}>
              Редактировать
            </button>
            <button onClick={() => dispatch(logout())} className={s.logout}>
              Выйти
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalAccount;
