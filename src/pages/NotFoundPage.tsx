import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <section className={s.page}>
      <div className={`container ${s.container}`}>
        <div className={s.code}>404</div>
        <h1 className={s.title}>Страница не найдена</h1>
        <p className={s.text}>
          Возможно, она была удалена или вы перешли по неверной ссылке
        </p>
        <Link to="/" className={s.link}>
          На главную
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
