import { useInputForm } from "../../hooks/useInputForm";
import s from "./index.module.css";

interface IInput {
  type: string;
  id: string;
  name: string;
  value?: string;
  label?: string;
}

export interface IFilterData {
  [key: string]: string | number | undefined;
  status?: string;
  date?: string;
  id?: string;
}

interface IProps {
  inputs: IInput[];
  variant: "left" | "right";
  defaultValue?: string;
  tittleBtn?: string;
  formKey?: number;
  patch?: boolean;
  onSubmit: (data: IFilterData) => void;
  toggle?: () => void;
}

const FilterForm = ({
  inputs,
  variant,
  defaultValue,
  tittleBtn,
  formKey,
  patch,
  onSubmit,
  toggle,
}: IProps) => {
  const { data, handleChange, handleSubmit } = useInputForm(
    onSubmit,
    toggle,
    patch,
  );

  return (
    <form
      className={`${s.form} ${variant && s[variant]}`}
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      {inputs.map((i) => (
        <label htmlFor={i.id} className={s.label} key={`${formKey}-${i.id}`}>
          {i.label}

          <input
            type={i.type}
            id={i.id}
            name={i.name}
            value={
              i.type === "radio" ? i.value || data[i.name] : data[i.name] || ""
            }
            checked={
              i.type === "radio"
                ? (data[i.name] ?? defaultValue) === i.value
                : undefined
            }
            onChange={(e) => handleChange(e, patch)}
            onClick={(e) => e.stopPropagation()}
          />
        </label>
      ))}

      <button
        className={s.btn}
        type="submit"
        onClick={(e) => e.stopPropagation()}
      >
        {tittleBtn || "Найти"}
      </button>
    </form>
  );
};

export default FilterForm;
