import type { FC } from "react";
import type { Info } from "@/api/mockProducts";
import s from "./index.module.css";
import ButtonLink from "@/UI/ButtonLink/ButtonLink";

type Props = { data: Info; path: string };

const ServiceBlock: FC<Props> = ({ data, path }) => {
  return (
    <div className={s.cardBlock}>
      <h1 className={s.titleBlock}>{data.title}</h1>

      <div className={s.text}>
        <img src={data.img} alt={data.title} className={s.imgBlock} />
        {data.description.map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}
      </div>

      <div className={s.btn}>
        <ButtonLink
          title="Оставить заявку"
          variant="active"
          path={`/booking/?cause=${path}`}
        ></ButtonLink>
      </div>
    </div>
  );
};

export default ServiceBlock;
