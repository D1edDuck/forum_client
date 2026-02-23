import { useAppSelector } from "@/app/hooks/useAppSelector";
import s from "./index.module.css";

const TagsFilter = () => {
  const filters = useAppSelector((state) => state.repair.formValue);

  if (Object.keys(filters).length === 0) return null;

  const getTagType = (key: string) => {
    if (key.includes("status")) return "status";
    if (key.includes("date")) return "date";
    if (key.includes("id")) return "id";
    return "default";
  };

  const getDisplayValue = (key: string, value: any) => {
    if (value === "fulfilled") return "Готово";
    if (value === "pending") return "В процессе";
    if (key === "date") return new Date(value).toLocaleDateString("ru-RU");
    return value;
  };

  return (
    <div className={s.box}>
      {Object.entries(filters).map(([key, value], index) => (
        <div className={s.tag} key={index} data-type={getTagType(key)}>
          {getDisplayValue(key, value)}
        </div>
      ))}
    </div>
  );
};

export default TagsFilter;
