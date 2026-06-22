import { useNavigate } from "react-router-dom";
import { ICatalog } from "@/api/type";
import { FormDataMap, FormType } from "../../Page/AddPage/AddPage";
import formConfig from "./fieldList";
import s from "./index.module.css";
import React from "react";

interface IProps<T extends FormType> {
  type: T;
  onSubmit: (data: FormDataMap[T]) => void;
  categories?: ICatalog[];
  loading?: boolean;
  error?: string | null;
}

type FieldValue = string | number | File;

const AddForm = <T extends FormType>({
  type,
  onSubmit,
  categories,
  loading = false,
  error = null,
}: IProps<T>) => {
  const navigate = useNavigate();
  const formRef = React.useRef<HTMLFormElement>(null);
  const prevLoading = React.useRef(false);

  const fields = formConfig[type].map((f) => {
    if (f.name === "categoryId" && categories) {
      return {
        ...f,
        options: categories.map((cat) => ({ label: cat.name, value: cat.id })),
      };
    }
    return f;
  });

  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (prevLoading.current && !loading && !error) {
      formRef.current?.reset();
      setPreview(null);
    }
    prevLoading.current = loading;
  }, [loading, error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {} as FormDataMap[T];

    fields.forEach((f) => {
      const rawValue = formData.get(f.name);
      if (rawValue === null) return;

      const key = f.name as keyof FormDataMap[T];

      let value: FieldValue;

      switch (f.type) {
        case "file":
          if (rawValue instanceof File) value = rawValue;
          else return;
          break;

        case "number":
          value = Number(rawValue);
          break;

        case "select":
          value =
            f.name === "categoryId" ? Number(rawValue) : (rawValue as string);
          break;

        default:
          value = rawValue as string;
      }

      data[key] = value as FormDataMap[T][typeof key];
    });

    onSubmit(data);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <h2 className={s.title}>{type}</h2>

        <form className={s.form} onSubmit={handleSubmit} ref={formRef}>
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

            if (f.type === "file") {
              return (
                <div key={f.name} className={s.field}>
                  <label htmlFor={f.name} className={s.label}>
                    {f.label}
                  </label>
                  <input
                    type="file"
                    id={f.name}
                    name={f.name}
                    accept={f.accept || "image/*"}
                    required={f.required}
                    className={s.input}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  {preview && (
                    <img src={preview} alt="preview" className={s.preview} />
                  )}
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

          {error && <p className={s.error}>{error}</p>}

          <div className={s.actions}>
            <button type="submit" disabled={loading} className={s.primary}>
              {loading ? "Загрузка..." : "Добавить"}
            </button>
            <button
              type="button"
              className={s.secondary}
              onClick={() => navigate(-1)}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
