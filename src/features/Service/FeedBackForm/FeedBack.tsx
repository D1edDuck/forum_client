import SvgLink from "@/UI/SvgLink/SvgLink";
import ButtonLink from "@/UI/ButtonLink/ButtonLink";
import s from "./index.module.css";
import { Link } from "react-router-dom";

const FeedBack = () => {
  return (
    <div className={s.grid}>
      <div className={s.mb}>
        <h2 className={s.title}>Форум.ру</h2>
        <p className={s.bottom}>
          Профессиональный ремонт и обслуживание компьютеров, ноутбуков и
          принтеров: быстрая диагностика, качественный ремонт, гарантия и
          удобные варианты доставки/выезда мастера. Оставьте заявку — ответим в
          течение рабочего дня.
        </p>
      </div>
      <div className={`${s.buttons} ${s.mb}`}>
        <div className={s.icons}>
          <SvgLink name="contacts" size="large" />
          <SvgLink name="mop" size="large" />
        </div>
        <div className={s.mb}>
          <Link to={"/booking"}>
            <ButtonLink
              title="Оставить заявку"
              variant="primary"
              size="medium"
            />
          </Link>
          <ButtonLink title="Позвоните нам" variant="secondary" size="medium" />
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
