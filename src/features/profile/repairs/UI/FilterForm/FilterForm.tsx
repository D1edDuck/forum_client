import { useInputForm } from "../../hooks/useInputForm";
import s from "./index.module.css";

interface IInput {
  type: string;
  id: string;
  name: string;
  value?: string;
  label?: string;
}

interface IProps {
  inputs: IInput[];
}

const FilterForm = ({ inputs }: IProps) => {
  const { formData, handleChange } = useInputForm();

  return (
    <form className={s.form}>
      {inputs.map((i) => (
        <label htmlFor={i.id} className={s.label}>
          {i.label}
          <input
            type={i.type}
            id={i.id}
            name={i.name}
            value={
              i.type === "radio"
                ? i.value || formData[i.name]
                : formData[i.name] || ""
            }
            checked={
              i.type === "radio" ? formData[i.name] === i.value : undefined
            }
            onChange={handleChange}
          />
        </label>
      ))}
      <button className={s.btn}>Найти</button>
    </form>
  );
};

export default FilterForm;
