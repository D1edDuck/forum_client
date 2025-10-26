import { useAppSelector } from "@/app/hooks/useAppSelector";
import s from "./index.module.css";
import CardRepair from "../CardRepair/CardRepair";
import fieldList from "./FieldList";
import FilterButton from "../../repairs/UI/FilterButton/FilterButton";
import FilterForm from "../../repairs/UI/FilterForm/FilterForm";

const Repairs = () => {
  const { repairs } = useAppSelector((state) => state.repair);
  const role = useAppSelector((state) => state.user.user?.role);

  return (
    <div className={s.block}>
      <h3 className={s.title}>
        {role == "user" ? `Мои заявки` : `Заявки пользователей`}
      </h3>
      {role === "admin" && (
        <>
          <p>Фильтр заявок</p>
          <div className={s.filter}>
            {fieldList.map((list) => (
              <FilterButton title={list.title}>
                <FilterForm inputs={list.inputs} key={list.title} />
              </FilterButton>
            ))}
          </div>
        </>
      )}
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
