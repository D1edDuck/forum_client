import { Link } from "react-router-dom";
import s from "./index.module.css";
import Arrow from "@/UI/Arrow/Arrow";
import useClients from "../../hooks/useClients";

const DateBase = () => {
  const { users: clients } = useClients();
  return (
    <div className={s.flex}>
      <div className={s.card}>
        <div className={s.box}>
          <p className={s.logo}>logo</p>
          <p className={s.title}>Клиенты</p>
          <p className={s.count}>{clients.clients.count}</p>
        </div>
        <div className={s.hr}></div>
        <div className={s.link}>
          <Link to={"clients"}>Подробнее</Link>
          <Arrow color="w" size="s" open={false} />
        </div>
      </div>
      <div className={s.card}>
        <div className={s.box}>
          <p className={s.logo}>logo</p>
          <p className={s.title}>Заявки</p>
          <p className={s.count}>102</p>
        </div>
        <div className={s.hr}></div>
        <div className={s.link}>
          <Link to={"/profile/repairs"}>Подробнее</Link>
          <Arrow color="w" size="s" open={false} />
        </div>
      </div>
      <div className={s.card}>
        <div className={s.box}>
          <p className={s.logo}>logo</p>
          <p className={s.title}>Каталог</p>
          <p className={s.count}>102</p>
        </div>
        <div className={s.hr}></div>
        <div className={s.link}>
          <Link to={"/catalog"}>Подробнее</Link>
          <Arrow color="w" size="s" open={false} />
        </div>
      </div>
    </div>
  );
};

export default DateBase;
