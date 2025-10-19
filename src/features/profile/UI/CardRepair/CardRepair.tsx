import { IRepair } from "@/api/type";
import s from "./index.module.css";

const CardRepair = (rep: IRepair) => {
  return (
    <div className={s.card}>
      <h4 className={s.tittle}>Заявка #{rep.id}</h4>
      <div className={s.flex}>
        <div className={s.info}>
          <p>Причина</p>
          <p className={s.text}>{rep.cause}</p>
        </div>
        <hr className={s.hr} />
        <div className={s.info}>
          <p>Комментарий</p>
          <p className={s.text}>{rep.comment}</p>
        </div>
        <hr className={s.hr} />
        <div className={s.info}>
          <p>Статус</p>
          <p className={s.text}>{rep.status}</p>
        </div>
      </div>
    </div>
  );
};

export default CardRepair;
