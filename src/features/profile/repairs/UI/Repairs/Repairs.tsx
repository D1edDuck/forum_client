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
import { useRef } from "react";

const Repairs = () => {
  const dispatch = useAppDispatch();
  const { repairs } = useAppSelector((state) => state.repair);
  const role = useAppSelector((state) => state.user.user?.role);
  const repsRef = useRef<HTMLDivElement>(null);

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
                  variant={list.variant || "right"}
                  inputs={list.inputs}
                  onSubmit={(data) => dispatch(repairFilter(data))}
                />
              </FilterButton>
            ))}
          </div>

          <div>
            <TagsFilter />
            <ButtonReset />
          </div>
        </>
      )}

      <div className={s.reps} ref={repsRef}>
        {repairs.length ? (
          <>
            <div className={s.scrollInfo}>
              <div className={s.scrollIndicator}>
                <span className={s.scrollDot}></span>
                <span className={s.scrollText}>Всего заявок:</span>
              </div>
              <span className={s.scrollCount}>{repairs.length}</span>
            </div>

            {repairs.map((rep, idx) => (
              <CardRepair key={idx} {...rep} />
            ))}

            <div className={s.scrollHint}>
              <span>Конец списка</span>
            </div>
          </>
        ) : (
          <div className={s.not}>
            <p>Заявок нет</p>
            {role === "user" && (
              <div>
                <Link to={"/booking"}>Оставить заявку</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Repairs;
