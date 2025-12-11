import { useAppSelector } from "@/app/hooks/useAppSelector";
import s from "./index.module.css";

const TagsFilter = () => {
  const filters = useAppSelector((state) => state.repair.formValue);

  if (Object.keys(filters).length === 0) return null;

  return (
    <div className={s.box}>
      {Object.values(filters).map((value, index) => (
        <div className={s.tag} key={index}>
          {value == "fulfilled"
            ? "Готово"
            : value == "pending"
              ? "В процессе"
              : value}
        </div>
      ))}
    </div>
  );
};

export default TagsFilter;
