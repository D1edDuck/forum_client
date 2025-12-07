import { useAppSelector } from "@/app/hooks/useAppSelector";
import s from "./index.module.css";
import fieldList from "./FieldList";
import FilterButton from "../FilterButton/FilterButton";
import FilterForm from "../FilterForm/FilterForm";
import TagsFilter from "../TagsFilter/TagsFilter";
import ButtonReset from "../ButtonReset/ButtonReset";
import CardRepair from "../CardRepair/CardRepair";
import { repairFilter } from "../../repairThunk";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";

const Repairs = () => {
  const dispatch = useAppDispatch();
  const { repairs } = useAppSelector((state) => state.repair);
  const role = useAppSelector((state) => state.user.user?.role);

  return (
    <div className={s.block}>
      <h3 className={s.title}>
        {role == "user" ? `Мои заявки` : `Заявки пользователей`}
      </h3>
      {role === "admin" && (
        <>
          <p className={`${s.filterTittle} ${s.noSelect}`}>Фильтр заявок</p>
          <div className={s.filter}>
            {fieldList.map((list) => (
              <FilterButton title={list.title} key={list.title}>
                <FilterForm
                  variant="right"
                  inputs={list.inputs}
                  onSubmit={(data) => dispatch(repairFilter(data))}
                />
              </FilterButton>
            ))}
          </div>
          <div className="flex gap20">
            <TagsFilter />
            <ButtonReset />
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
