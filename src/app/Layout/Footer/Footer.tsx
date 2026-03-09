import s from "./index.module.css";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={`container pb ${s.grid}`}>
        <h2 className={s.title}>Контакты</h2>

        <div>
          <p className={s.accent}>Время работы</p>
          <p>Понедельник - Пятница</p>
          <p>9:30 - 18:30</p>
          <p>Суббота - Воскресенье</p>
          <p>9:30 - 15:00</p>
        </div>

        <div>
          <hr className={s.hr} />
        </div>

        <div>
          <p className={s.accent}>+7 (926) 364 42 04</p>
          <p>+7 (925) 442 04 44</p>
          <p className={s.accent} style={{ marginTop: "2rem" }}>
            Адрес
          </p>
          <p>Россия, г. Волоколамск</p>
          <p>ул. Парковая, дом 15</p>
          <p className={s.accent} style={{ marginTop: "2rem" }}>
            Email
          </p>
          <p>forumcom@bk.ru</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
