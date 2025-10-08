import s from "./inedx.module.css";
import { Link } from "react-router-dom";

interface IFields {
  name: string;
  type: string;
  required: boolean;
  label: string;
  placeholder?: string;
}

interface IProps {
  fields: IFields[];
  buttonText: string;
  linkBefore: string;
  linkText: string;
  linkTo: string;
}

const FormLayout = ({
  fields,
  buttonText,
  linkBefore,
  linkText,
  linkTo,
}: IProps) => {
  function handleSubmit() {
    alert("Отправлено");
  }
  return (
    <div className={s.form}>
      <h3 className={s.title}>{buttonText}</h3>
      <form onSubmit={handleSubmit}>
        <div className={s.flex}>
          {fields.map((field) => (
            <div key={field.name} className={s.calpe}>
              <label htmlFor={field.name} className={s.label}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                required={field.required}
                placeholder={field.placeholder}
                className={s.input}
              />
            </div>
          ))}
        </div>
        <button type="submit" className={s.button}>
          {buttonText}
        </button>
      </form>
      <div className={s.links}>
        <p>{linkBefore}</p>
        <Link to={linkTo}>
          <span className={s.link}>{linkText}</span>
        </Link>
      </div>
    </div>
  );
};

export default FormLayout;
