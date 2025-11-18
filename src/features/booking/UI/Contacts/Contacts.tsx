import ButtonConnect from "@/UI/ButtonConnect/ButtonConnect";
import s from "./index.module.css";

const Contacts = () => {
  return (
    <div className={s.flex}>
      <h2 className={s.h}>Контакты</h2>
      <div className={s.head}>
        <div>
          <p>+7 (926) 36 4 42 04б</p>
          <p>+7 (925) 4 42 04 44</p>
        </div>

        <div>
          <p>
            г. Волоколамск <br /> ул.Парковая, дом 15{" "}
          </p>
          <p>
            <strong>
              <a href="mailto:test@example.com">forumcom@bk.ru</a>
            </strong>
          </p>
        </div>
      </div>

      <div className={s.map}>
        <iframe
          className={s.frame}
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A91677008f39a4178d5bba2b4ed40a45ae78c19e10b929179352d0f211580bc8d&source=constructor"
          title="Yandex Map"
        />
        <ButtonConnect title="Позвонить" primary="hard" />
      </div>
    </div>
  );
};

export default Contacts;
