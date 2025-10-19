import SvgLink from "@/UI/SvgLink/SvgLink";
import ButtonConnect from "../../../UI/ButtonConnect/ButtonConnect";
import s from "./index.module.css";

const InfoHome = () => {
  return (
    <section className={s.hidden}>
      <div className={`container ${s.relative} ${s.pb}`}>
        <h1 className={s.text1}>Форум.ру</h1>
        <p className={s.text_sm}>
          Продажа и ремонт
          <br />
          компьютерной техники
        </p>
        <div className={`${s.buttons} ${s.btn_connect_anim}`}>
          <ButtonConnect title="Связаться с нами" primary="soft" />
          <SvgLink name={"mop"} />
          <SvgLink name={"contacts"} />
        </div>
        <img
          src="src/assets/img/computer.png"
          alt="computer"
          className={s.comp}
        />
        <img
          src="src/assets/img/laptop.png"
          alt="laptop"
          className={s.laptop}
        />
        <svg className={`${s.icon_small} ${s.printer}`}>
          <use xlinkHref="src/assets/icons/symbol-defs.svg#icon-Printer"></use>
        </svg>
        <svg className={`${s.icon_small} ${s.cpu}`}>
          <use xlinkHref="src/assets/icons/symbol-defs.svg#icon-CPU"></use>
        </svg>
        <svg className={`${s.icon_small} ${s.laptopIcon}`}>
          <use xlinkHref="src/assets/icons/symbol-defs.svg#icon-Laptop"></use>
        </svg>
        <svg className={`${s.icon_small} ${s.save}`}>
          <use xlinkHref="src/assets/icons/symbol-defs.svg#icon-Save"></use>
        </svg>
        <svg className={`${s.icon_small} ${s.display}`}>
          <use xlinkHref="src/assets/icons/symbol-defs.svg#icon-Display"></use>
        </svg>
      </div>
    </section>
  );
};

export default InfoHome;
