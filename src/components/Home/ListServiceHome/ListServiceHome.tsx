import ButtonConnect from "../../UI/ButtonConnect/ButtonConnect";
import ServiceCard from "../../UI/ServiceCard/ServiceCard";
import s from "./index.module.css";

const service = {
  name: "Сервис",
  path: "service/repair",
  description: "текст про наш сервис",
  image: "src/assets/img/card-1.png",
};
const booking = {
  name: "Запись",
  path: "booking",
  description: "текст про наш сервис",
  image: "src/assets/img/card-2.png",
};
const catalog = {
  name: "Каталог",
  path: "catalog",
  description: "текст про наш сервис",
  image: "src/assets/img/card-3.png",
};
const about = {
  name: "О нас",
  path: "about",
  description: "текст про наш сервис",
  image: "src/assets/img/card-4.png",
};

const ListServiceHome = () => {
  return (
    <section className={s.section}>
      <div className="container pb mb">
        <h2 className={s.title}>Список наших услуг</h2>
        <div className={`grid ${s.gridCart}`}>
          <ServiceCard info={service} />
          <ServiceCard info={booking} />
          <ServiceCard info={catalog} />
          <ServiceCard info={about} />
        </div>
        <div className={`grid aic ${s.grid}`}>
          <div className={s.glass}>
            <p className={s.text}>
              Обращаясь в наш сервисный центр, вы можете быть уверенны в
              успешном восстановлении работоспособности вашего ноутбука или
              компьютера.
            </p>
          </div>
          <p className={s.text}>Есть вопросы?</p>
          <ButtonConnect />
        </div>
      </div>
    </section>
  );
};
export default ListServiceHome;
