import { useAppSelector } from "@/app/hooks/useAppSelector";

const TagsFilter = () => {
  const filters = useAppSelector((state) => state.repair.formValue);

  if (!filters) return null;

  return (
    <div>
      {Object.values(filters).map((value, index) => (
        <div key={index}>{value}</div>
      ))}
    </div>
  );
};

export default TagsFilter;
