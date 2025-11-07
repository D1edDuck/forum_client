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
  variant: string;
  defaultValue?: string;
  tittleBtn?: string;
  formKey?: number;
}

const FilterForm = ({
  inputs,
  variant,
  defaultValue,
  tittleBtn,
  formKey,
}: IProps) => {
  const { formData, handleChange } = useInputForm();

  return (
    <form className={`${s.form} ${variant && s[variant]}`}>
      {inputs.map((i) => (
        <label htmlFor={i.id} className={s.label} key={`${formKey}-${i.id}`}>
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
              i.type === "radio"
                ? (formData[i.name] ?? defaultValue) === i.value
                : undefined
            }
            onChange={handleChange}
          />
        </label>
      ))}
      <button className={s.btn}>{tittleBtn || "Найти"}</button>
    </form>
  );
};

export default FilterForm;
