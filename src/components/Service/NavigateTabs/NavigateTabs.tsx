import ButtonLink from "@/components/UI/ButtonLink/ButtonLink";
import s from "./index.module.css";

const NavigateTabs = () => {
  return (
    <div className={`flex gap ${s.border}`}>
      <ButtonLink path={"/service/repair"} title="ремонт" variant="primary" />
      <ButtonLink
        path={"/service/cleaning"}
        title="профчистка"
        variant="primary"
      />
      <ButtonLink
        path={"/service/refilling"}
        title="Заправка картриджей"
        variant="primary"
      />
      <ButtonLink
        path={"/service/consultation"}
        title="консультация"
        variant="primary"
      />
      <ButtonLink
        path={"/service/modernization"}
        title="модернизация"
        variant="primary"
      />
    </div>
  );
};

export default NavigateTabs;
