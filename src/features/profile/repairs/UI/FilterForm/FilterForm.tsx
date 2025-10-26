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
  return (
    <form className={s.form}>
      {inputs.map((i) => (
        <label htmlFor={i.id} className={s.label}>
          {i.label}
          <input type={i.type} id={i.id} name={i.name} value={i.value} />
        </label>
      ))}
      <button className={s.btn}>Найти</button>
    </form>
  );
};

export default FilterForm;
