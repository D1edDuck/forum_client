import { useAppSelector } from "@/app/hooks/useAppSelector";
import s from "./index.module.css";
import CardRepair from "../CardRepair/CardRepair";

const Repairs = () => {
  const repairs = useAppSelector((state) => state.user.repairs);

  return (
    <div className={s.block}>
      <h3 className={s.title}>Мои заявки</h3>
      <div className={s.reps}>
        {repairs.length ? (
          repairs.map((rep, idx) => <CardRepair key={idx} {...rep} />)
        ) : (
          <div className={s.not}>Заявок нет</div>
        )}
      </div>
    </div>
  );
};

export default Repairs;
