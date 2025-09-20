import type { FC } from "react";
import type { Info } from "@/api/mockProducts";
import s from "./index.module.css";

type Props = { data: Info };

const ServiceBlock: FC<Props> = ({ data }) => {
  return (
    <div className={s.cardBlock}>
      <h1 className={s.titleBlock}>{data.title}</h1>
      <img src={data.img} alt={data.title} className={s.imgBlock} />
      {data.description.map((item, idx) => (
        <p key={idx}>{item}</p>
      ))}
    </div>
  );
};

export default ServiceBlock;
