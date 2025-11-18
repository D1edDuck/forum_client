import { useAppSelector } from "@/app/hooks/useAppSelector";
import s from "./index.module.css";
import { IRepair } from "@/api/type";
import { useOpenFilter } from "@/features/products/filter/hooks/useOpenFilter";
import FilterForm from "../FilterForm/FilterForm";

const CardRepair = (rep: IRepair) => {
  const { open, ref, toggle } = useOpenFilter();
  const role = useAppSelector((state) => state.user.user?.role);

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return s.pending;
      case "repair":
        return s.repair;
      case "fulfilled":
        return s.fulfilled;
      default:
        return "";
    }
  };

  const status = [
    {
      value: "pending",
      label: "Ожидание",
    },
    {
      value: "fulfilled",
      label: "Готово",
    },
  ];

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
        {role === "admin" && (
          <>
            <span className={s.key}>Имя клиента</span>
            <span className={s.value}>{rep.user.name}</span>

            <span className={s.key}>Номер телефона</span>
            <span className={s.value}>{rep.user.phone}</span>

            <span className={s.key}>Почта</span>
            <span className={s.value}>{rep.user.email}</span>
          </>
        )}

        <span className={s.key}>Причина</span>
        <span className={s.value}>{rep.cause}</span>

        <span className={s.key}>Комментарий</span>
        <span className={s.value}>{rep.comment}</span>

        <span className={s.key}>Дата</span>
        <span className={s.value}>{formatDate(rep.created_at)}</span>
      </div>

      <div className={s.statusContainer}>
        <span className={s.key}>Статус</span>
        {role === "user" ? (
          <span className={`${s.statusBadge} ${getStatusClass(rep.status)}`}>
            {status.find((st) => st.value === rep.status)?.label || rep.status}
          </span>
        ) : (
          <div
            className={`${s.statusBadge} ${getStatusClass(rep.status)}`}
            ref={ref}
          >
            <span onClick={toggle}>
              {status.find((st) => st.value === rep.status)?.label ||
                rep.status}
              {">"}
            </span>
            {open && (
              <FilterForm
                key={`filter-${rep.id}`}
                formKey={rep.id}
                variant="left"
                inputs={status.map((st) => ({
                  type: "radio",
                  id: `${st.value}-${rep.id}`,
                  name: ` $status-${rep.id}`,
                  label: st.label,
                  value: st.value,
                }))}
                defaultValue={rep.status}
                tittleBtn="Изменить"
                patch={true}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardRepair;
