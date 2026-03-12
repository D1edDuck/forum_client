import { IFormValue } from "../../userSlice";
import { IFields } from "../FormRegistration/FormRegistration";
import s from "./index.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

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
  validationErrors?: Record<string, string>;
  getFieldError?: (fieldName: string) => string | undefined;
  isFormValid?: boolean;
  terms?: boolean;
  termsChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  getFieldError,
  isFormValid,
  terms,
  termsChange,
}: IProps) => {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {},
  );

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const isPasswordField = (fieldType: string, fieldName: string) => {
    return (
      fieldType === "password" || fieldName.toLowerCase().includes("password")
    );
  };

  return (
    <div className={s.form}>
      <h3 className={s.title}>{buttonText}</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className={s.flex}>
          {fields.map((field) => {
            const fieldError = getFieldError?.(field.name);
            const isPassword = isPasswordField(field.type, field.name);
            const inputType = isPassword
              ? showPasswords[field.name]
                ? "text"
                : "password"
              : field.type;

            return (
              <div key={field.name} className={s.calpe}>
                <label htmlFor={field.name} className={s.label}>
                  {field.label}
                  {field.required && <span className={s.required}>*</span>}
                </label>

                <div className={s.inputWrapper}>
                  <input
                    type={inputType}
                    name={field.name}
                    id={field.name}
                    required={field.required}
                    placeholder={
                      field.placeholder ||
                      `Введите ${field.label.toLowerCase()}`
                    }
                    className={`${s.input} ${fieldError ? s.error : ""} ${isPassword ? s.passwordInput : ""}`}
                    value={formData[field.name] ?? ""}
                    onChange={handleChange}
                    disabled={loading}
                    autoComplete={isPassword ? "current-password" : "off"}
                  />

                  {isPassword && (
                    <button
                      type="button"
                      className={s.eyeButton}
                      onClick={() => togglePasswordVisibility(field.name)}
                      aria-label={
                        showPasswords[field.name]
                          ? "Скрыть пароль"
                          : "Показать пароль"
                      }
                    >
                      {showPasswords[field.name] ? (
                        <svg viewBox="0 0 24 24" width="20" height="20">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="20" height="20">
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>

                {fieldError && (
                  <span className={s.errorMessage}>{fieldError}</span>
                )}
              </div>
            );
          })}
        </div>
        {terms !== undefined && (
          <div className={s.checkboxWrapper}>
            <label className={s.checkboxLabel}>
              <input
                type="checkbox"
                className={`${s.checkbox} ${getFieldError?.("terms") ? s.error : ""}`}
                name="terms"
                id="terms"
                required
                checked={terms}
                onChange={termsChange}
                disabled={loading}
              />
              <span className={s.checkboxText}>
                Я принимаю условия{" "}
                <Link to="/terms" target="_blank" className={s.termsLink}>
                  пользовательского соглашения
                </Link>
                <span className={s.required}>*</span>
              </span>
            </label>
            {getFieldError?.("terms") && (
              <span className={s.errorMessage}>{getFieldError("terms")}</span>
            )}
          </div>
        )}
        {error && <p className={s.errorMessage}>{error}</p>}
        <button
          type="submit"
          className={s.button}
          disabled={loading || !isFormValid}
        >
          {loading ? "Загрузка..." : buttonText}
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
