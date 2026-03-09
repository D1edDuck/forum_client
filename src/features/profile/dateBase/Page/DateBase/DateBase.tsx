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
            <p className={s.title}>{title}</p>
            <p className={s.count}>{count}</p>
          </div>

          <hr className={s.hr} />

          <div className={s.more}>
            <div>
              <Link to={link} className={s.link}>
                <span>Подробнее</span>
                <div className={s.arr}>
                  <Arrow color="w" size="s" open={false} />
                </div>
              </Link>
            </div>
            {add && (
              <div>
                <Link to={add} className={s.link}>
                  <p>Создать</p>
                  <div className={s.plus}>
                    <span className={s.vert}></span>
                    <span className={s.horiz}></span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DateBase;
