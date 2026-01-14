import { IUser } from "@/api/type";
import useForm from "../../hooks/useForm";
import s from "./index.module.css";
import { Link } from "react-router-dom";
import { causes } from "./causes";

export interface IProps {
  user: IUser | null;
}

const BookingForm = ({ user }: IProps) => {
  const { cause, comment, onSubmit, setValue, setCauseParams, urlCause } =
    useForm({
      user,
    });

  return (
    <div className={s.block}>
      {!user?.id && (
        <div className={s.noneAuth}>
          <h3 className={s.text}>Необходимо авторизоваться</h3>
          <Link to={"/login"} className={s.log}>
            Войти
          </Link>
        </div>
      )}
      <form
        className={`${s.form} ${!user?.id ? s.filter : ""}`}
        onSubmit={onSubmit}
      >
        <div className="dlex05">
          <label htmlFor="cause">Причина обращения</label>
          <select
            id="cause"
            defaultValue=""
            className={s.input}
            required
            onChange={(e) => {
              setValue("cause", e.target.value);
              setCauseParams({ cause: e.target.value });
            }}
            value={urlCause || cause}
          >
            {causes.map((c) => (
              <option value={c.value} disabled={c.disabled}>
                {c.text}
              </option>
            ))}
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
      </form>
    </div>
  );
};

export default BookingForm;
