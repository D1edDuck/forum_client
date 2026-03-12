import s from "./index.module.css";
import { logout } from "../../userSlice";
import useEditAccount from "../../hooks/useEditAccount";
import { formatPhoneNumber } from "@/app/hooks/formatPhone";

const PersonalAccount = () => {
  const {
    dispatch,
    edit,
    setEdit,
    formData,
    handleChange,
    handleSave,
    handleCancel,
    user,
  } = useEditAccount();

  if (!user) {
    return (
      <div className={s.block}>
        <p className={s.info}>Вы не авторизованы</p>
      </div>
    );
  }

  return (
    <div className={s.block}>
      <h3 className={s.title}>Мой профиль</h3>
      <div className={s.grid}>
        <p className={s.gridText}>Имя Фамилия</p>
        {edit ? (
          <input
            type="text"
            className={s.input}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введите имя и фамилию"
          />
        ) : (
          <p className={s.info}>{user.name || "Не указано"}</p>
        )}

        <hr className={s.hr} />
        <p className={s.gridText}>Номер телефона</p>
        {edit ? (
          <input
            type="tel"
            className={s.input}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Введите номер телефона"
          />
        ) : (
          <p className={s.info}>
            {formatPhoneNumber(user.phone) || "Не указано"}
          </p>
        )}

        <hr className={s.hr} />
        <p className={s.gridText}>Email</p>
        {edit ? (
          <input
            type="email"
            className={s.input}
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введите email"
          />
        ) : (
          <p className={s.info}>{user.email || "Не указано"}</p>
        )}
      </div>

      <div className={s.btns}>
        {edit ? (
          <>
            <button className={s.edit} onClick={handleSave}>
              Сохранить
            </button>
            <button className={s.logout} onClick={handleCancel}>
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
