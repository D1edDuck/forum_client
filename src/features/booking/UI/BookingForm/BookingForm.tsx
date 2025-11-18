import { IUser } from "@/api/type";
import useForm from "../../hooks/useForm";
import s from "./index.module.css";

export interface IProps {
  user: IUser | null;
}

const BookingForm = ({ user }: IProps) => {
  const { cause, comment, onSubmit, setValue } = useForm({
    user,
  });

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <div className="dlex05">
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

      <div className="dlex05">
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

      <button className={s.button} disabled={!user?.id}>
        Отправить заявку
      </button>
      {!user?.id && <> Необходимо войти в свой аккаунт перед заявкой</>}
    </form>
  );
};

export default BookingForm;
