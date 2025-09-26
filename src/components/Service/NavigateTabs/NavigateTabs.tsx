import ButtonLink from "@/components/UI/ButtonLink/ButtonLink";
import s from "./index.module.css";

const NavigateTabs = () => {
  return (
    <div className={`flex gap ${s.border}`}>
      <ButtonLink path={"/service/repair"} title="Ремонт" variant="primary" />
      <ButtonLink
        path={"/service/cleaning"}
        title="Профчистка"
        variant="primary"
      />
      <ButtonLink
        path={"/service/refilling"}
        title="Заправка картриджей"
        variant="primary"
      />
      <ButtonLink
        path={"/service/consultation"}
        title="Консультация"
        variant="primary"
      />
      <ButtonLink
        path={"/service/modernization"}
        title="Модернизация"
        variant="primary"
      />
    </div>
  );
};

export default NavigateTabs;
