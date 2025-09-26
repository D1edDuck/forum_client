import SvgLink from "@/components/UI/SvgLink/SvgLink";
import ButtonLink from "@/components/UI/ButtonLink/ButtonLink";
import s from "./index.module.css";

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
          <SvgLink name="contacts" />
          <SvgLink name="mop" />
        </div>
        <div className={s.mb}>
          <ButtonLink title="Оставить заявку" variant="active" />
          <ButtonLink title="Позвоните нам" variant="spooky" />
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
