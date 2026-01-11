import { ICatalog } from "@/api/type";
import { FormDataMap, FormType } from "../../Page/AddPage/AddPage";
import formConfig from "./fieldList";
import s from "./index.module.css";

interface IProps<T extends FormType> {
  type: T;
  onSubmit: (data: FormDataMap[T]) => void;
  categories?: ICatalog[];
}

const AddForm = <T extends FormType>({
  type,
  onSubmit,
  categories,
}: IProps<T>) => {
  const fields = formConfig[type].map((f) => {
    if (f.name === "categoryId" && categories) {
      return {
        ...f,
        options: categories.map((cat) => ({ label: cat.name, value: cat.id })),
      };
    }
    return f;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {} as FormDataMap[T];

    fields.forEach((f) => {
      const rawValue = formData.get(f.name);
      if (rawValue === null) return;

      const key = f.name as keyof FormDataMap[T];

      let value: FormDataMap[T][typeof key];

      switch (f.type) {
        case "number":
          value = Number(rawValue) as FormDataMap[T][typeof key];
          break;

        case "select":
          if (f.name === "categoryId") {
            value = Number(rawValue) as FormDataMap[T][typeof key];
          } else {
            value = rawValue as FormDataMap[T][typeof key];
          }
          break;

        default:
          value = rawValue as FormDataMap[T][typeof key];
      }

      data[key] = value;
    });

    onSubmit(data);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <h2 className={s.title}>{type}</h2>

        <form className={s.form} onSubmit={handleSubmit}>
          {fields.map((f) => {
            if (f.type === "select") {
              return (
                <div key={f.name} className={s.field}>
                  <label htmlFor={f.name} className={s.label}>
                    {f.label}
                  </label>
                  <select
                    id={f.name}
                    name={f.name}
                    required={f.required}
                    className={s.input}
                  >
                    <option disabled value="">
                      Выберите...
                    </option>
                    {f.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (f.type === "textarea") {
              return (
                <div key={f.name} className={s.field}>
                  <label htmlFor={f.name} className={s.label}>
                    {f.label}
                  </label>
                  <textarea
                    id={f.name}
                    name={f.name}
                    placeholder={f.placeholder}
                    className={`${s.input} ${s.area}`}
                  />
                </div>
              );
            }

            return (
              <div key={f.name} className={s.field}>
                <label htmlFor={f.name} className={s.label}>
                  {f.label}
                </label>
                <input
                  id={f.name}
                  type={f.type}
                  name={f.name}
                  required={f.required}
                  className={s.input}
                />
              </div>
            );
          })}

          <div className={s.actions}>
            <button type="submit" className={s.primary}>
              Создать
            </button>
            <button type="button" className={s.secondary}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
