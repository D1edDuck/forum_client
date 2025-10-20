import s from "./index.module.css";
import { IRepair } from "@/api/type";

const CardRepair = (rep: IRepair) => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return s.pending;
      case "repair":
        return s.repair;
      case "done":
        return s.done;
      default:
        return "";
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);

    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={s.card}>
      <div className={s.title}>Заявка #{rep.id}</div>

      <div className={s.grid}>
        <span className={s.key}>Причина</span>
        <span className={s.value}>{rep.cause}</span>

        <span className={s.key}>Комментарий</span>
        <span className={s.value}>{rep.comment}</span>

        <span className={s.key}>Дата</span>
        <span className={s.value}>{formatDate(rep.created_at)}</span>
      </div>

      <div className={s.statusContainer}>
        <span className={s.key}>Статус</span>
        <span className={`${s.statusBadge} ${getStatusClass(rep.status)}`}>
          {rep.status}
        </span>
      </div>
    </div>
  );
};

export default CardRepair;
