import { useState } from "react";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import s from "./index.module.css";
import { IRepair } from "@/api/type";
import { useOpenFilter } from "@/features/products/filter/hooks/useOpenFilter";
import FilterForm from "../FilterForm/FilterForm";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { editStatus } from "../../repairThunk";
import Arrow from "@/UI/Arrow/Arrow";

const CardRepair = (rep: IRepair) => {
  const { open, ref, toggle } = useOpenFilter();
  const role = useAppSelector((state) => state.user.user?.role);
  const dispatch = useAppDispatch();
  const [hidden, setHidden] = useState(false);

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
      <div className={s.title}>
        <span>Заявка #{rep.id}</span>
        <div className={s.arr} onClick={() => setHidden((prev) => !prev)}>
          {hidden ? (
            <Arrow color="b" size="s" side="l" />
          ) : (
            <Arrow color="b" size="s" side="r" />
          )}
        </div>
      </div>

      <div className={`${s.grid} ${hidden ? s.open : s.closed}`}>
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

        <div className={s.hr}></div>
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
            <span onClick={toggle} className={s.btn}>
              {status.find((st) => st.value === rep.status)?.label ||
                rep.status}
              <span className={s.arr}>
                {open ? (
                  <Arrow color="w" size="s" side="l" />
                ) : (
                  <Arrow color="w" size="s" side="r" />
                )}
              </span>
            </span>
            {open && (
              <FilterForm
                key={`filter-${rep.id}`}
                formKey={rep.id}
                variant="left"
                inputs={status.map((st) => ({
                  type: "radio",
                  id: `${st.value}-${rep.id}`,
                  name: `status`,
                  label: st.label,
                  value: st.value,
                }))}
                defaultValue={rep.status}
                tittleBtn="Изменить"
                patch={true}
                onSubmit={(data) => {
                  dispatch(editStatus({ id: rep.id, status: data.status! }));
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardRepair;
