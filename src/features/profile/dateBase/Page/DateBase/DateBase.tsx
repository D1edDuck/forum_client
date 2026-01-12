import { Link } from "react-router-dom";
import s from "./index.module.css";
import Arrow from "@/UI/Arrow/Arrow";
import useClients from "../../hooks/useClients";

const DateBase = () => {
  const {
    users: {
      clients: { count: countU },
    },
    products: { count: countP },
    repairs: { count: countR },
    category: { count: countC },
  } = useClients();

  const cards = [
    {
      title: "Клиенты",
      count: countU,
      link: "client",
      add: "/profile/add/user",
    },
    {
      title: "Заявки",
      count: countR,
      link: "repair",
      add: "/profile/add/repair",
    },
    {
      title: "Товары",
      count: countP,
      link: "product",
      add: "/profile/add/product",
    },
    {
      title: "Категории",
      count: countC,
      link: "category",
      add: "/profile/add/category",
    },
  ];
  return (
    <div className={s.flex}>
      {cards.map(({ title, count, link, add }) => (
        <div className={s.card} key={title}>
          <div className={s.box}>
            <p className={s.logo}>logo</p>
            <p className={s.title}>{title}</p>
            <p className={s.count}>{count}</p>
          </div>

          <div className={s.hr}></div>

          <div className={s.more}>
            <div className={s.link}>
              <Link to={link}>Подробнее</Link>
              <Arrow color="w" size="s" open={false} />
            </div>

            <div>
              <Link to={add}>
                <div className={s.link}>
                  <p>Создать</p>

                  <div className={s.plus}>
                    <span className={s.vert}></span>
                    <span className={s.horiz}></span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DateBase;
