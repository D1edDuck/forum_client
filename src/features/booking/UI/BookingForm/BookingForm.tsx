import { IUser } from "@/api/type";
import useForm from "../../hooks/useForm";
import s from "./index.module.css";

export interface IProps {
  user: IUser | null;
}

const BookingForm = ({ user }: IProps) => {
  const { name, cause, comment, email, phone, onSubmit, setValue } = useForm({
    user,
  });

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <div className="dlex">
        <label htmlFor="name">Имя и Фамилия</label>
        <input
          type="text"
          id="name"
          className={s.input}
          placeholder="Имя Фамилия"
          required
          value={name}
          onChange={(e) => setValue("name", e.target.value)}
        />
      </div>

      <div className="dlex">
        <label htmlFor="phone">Номер телефона</label>
        <input
          type="tel"
          id="phone"
          className={s.input}
          placeholder="+7 000 000 00 00"
          required
          value={phone}
          onChange={(e) => setValue("phone", e.target.value)}
        />
      </div>

      <div className="dlex">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className={s.input}
          placeholder="template@domain.com"
          value={email}
          onChange={(e) => setValue("email", e.target.value)}
        />
      </div>

      <div className="dlex">
        <label htmlFor="cause">Причина обращения</label>
        <select
          id="cause"
          defaultValue=""
          className={s.input}
          required
          onChange={(e) => setValue("cause", e.target.value)}
          value={cause}
        >
          <option value="" disabled>
            Выберите причину
          </option>
          <option value="repair">Ремонт компьютера</option>
          <option value="cartridge">Заправка картриджа</option>
        </select>
      </div>

      <div className="dlex">
        <label htmlFor="comment">Комментарий</label>
        <textarea
          name="text"
          id="comment"
          placeholder="Кратко опишите проблему или пожелания"
          className={`${s.input} ${s.area}`}
          value={comment}
          onChange={(e) => setValue("comment", e.target.value)}
        ></textarea>
      </div>

      <button className={s.button}>Отправить заявку</button>
    </form>
  );
};

export default BookingForm;
