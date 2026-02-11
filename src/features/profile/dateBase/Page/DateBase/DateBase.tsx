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
      gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
    },
    {
      title: "Заявки",
      count: countR,
      link: "repair",
      add: "/profile/add/repair",
      gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    },
    {
      title: "Товары",
      count: countP,
      link: "product",
      add: "/profile/add/product",
      gradient: "linear-gradient(135deg, #10b981, #059669)",
    },
    {
      title: "Категории",
      count: countC,
      link: "category",
      add: "/profile/add/category",
      gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    },
  ];

  return (
    <div className={s.flex}>
      {cards.map(({ title, count, link, add, gradient }) => (
        <div className={s.card} key={title}>
          <div className={s.box}>
            <div className={s.logo} style={{ background: gradient }} />
            <p className={s.title}>{title}</p>
            <p className={s.count}>{count}</p>
          </div>

          <div className={s.hr} />

          <div className={s.more}>
            <div>
              <Link to={link} className={s.link}>
                <span>Подробнее</span>
                <Arrow color="w" size="s" open={false} />
              </Link>
            </div>

            <div>
              <Link to={add} className={s.link}>
                <span>Создать</span>
                <div className={s.plus}>
                  <span className={s.vert}></span>
                  <span className={s.horiz}></span>
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
