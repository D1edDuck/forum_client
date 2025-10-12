import { IFormValue } from "../../userSlice";
import { IFields } from "../FormRegistration/FormRegistration";
import s from "./index.module.css";
import { Link } from "react-router-dom";

interface IProps {
  fields: IFields[];
  buttonText: string;
  linkBefore: string;
  linkText: string;
  linkTo: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: IFormValue;
  loading?: boolean;
  error?: string | null;
}

const FormLayout = ({
  fields,
  buttonText,
  linkBefore,
  linkText,
  linkTo,
  formData,
  handleChange,
  handleSubmit,
  error,
  loading,
}: IProps) => {
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
                value={formData[field.name] ?? ""}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <button type="submit" className={s.button} disabled={loading}>
          {loading ? "Загрузка..." : buttonText}
        </button>
      </form>
      <div className={s.links}>
        <p>{linkBefore}</p>
        <Link to={linkTo}>
          <span className={s.link}>{linkText}</span>
        </Link>
      </div>
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
};

export default FormLayout;
