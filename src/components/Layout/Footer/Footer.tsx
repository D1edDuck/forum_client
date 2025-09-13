import s from "./index.module.css";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={`container pb ${s.grid}`}>
        <h1 className={s.title}>Контакты</h1>

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
          <p className={s.accent}>
            +7 (926) 36 4 42 04б <br /> +7 (925) 4 42 04 44{" "}
          </p>
          <p>Россия, г. Волоколамск, ул.Парковая, дом 15 </p>
          <p>forumcom@bk.ru </p>
        </div>
        <div className={s.map}>
          <iframe
            className={s.frame}
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A91677008f39a4178d5bba2b4ed40a45ae78c19e10b929179352d0f211580bc8d&source=constructor"
            title="Yandex Map"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
