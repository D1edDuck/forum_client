import s from "./index.module.css";

const BookingForm = () => {
  return (
    <form className={s.form}>
      <div className="dlex">
        <label htmlFor="name">Имя и Фамилия</label>
        <input
          type="text"
          id="name"
          className={s.input}
          placeholder="Имя Фамилия"
          required
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
        />
      </div>

      <div className="dlex">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className={s.input}
          placeholder="template@domain.com"
        />
      </div>

      <div className="dlex">
        <label htmlFor="cause">Причина обращения</label>
        <select id="cause" defaultValue="" className={s.input} required>
          <option value="" disabled>
            Выберите причину
          </option>
          <option value="repair">Ремонт компьютера</option>
          <option value="cartridge">Заправка картриджа</option>
        </select>
      </div>

      <div className="dlex">
        <label htmlFor="date">Дата</label>
        <input type="date" id="date" className={s.input} />
      </div>

      <div className="dlex">
        <label htmlFor="comment">Комментарий</label>
        <textarea
          name="text"
          id="comment"
          placeholder="Кратко опишите проблему или пожелания"
          className={`${s.input} ${s.area}`}
        ></textarea>
      </div>

      <button className={s.button}>Отправить заявку</button>
    </form>
  );
};

export default BookingForm;
