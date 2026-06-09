import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import {
  inputTerms,
  inputValue,
  validateForm,
} from "../../userSlice";
import { registerUser } from "../../userThunk";
import FormLayout from "../FormLayout/FormLayout";

export interface IFields {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}

const FormRegistration = () => {
  const dispatch = useAppDispatch();

  const { formValue, loading, error, validationErrors, isFormValid, terms } =
    useAppSelector((state) => state.user);

  const fields: IFields[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "example@mail.com",
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
      required: true,
      placeholder: "********",
    },
    {
      name: "confirmPassword",
      label: "Подтверждение пароля",
      type: "password",
      required: true,
      placeholder: "********",
    },
    {
      name: "name",
      label: "Имя и фамилия",
      type: "text",
      required: true,
      placeholder: "Иван Иванов",
    },
    {
      name: "phone",
      label: "Телефон",
      type: "tel",
      required: true,
      placeholder: "+7 (999) 999-99-99",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      inputValue({
        id: name,
        value: value,
      }),
    );
  };

  const termsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(inputTerms(e.target.checked));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(validateForm("register"));

    if (loading) return;

    const hasRequired =
      formValue.email &&
      formValue.password &&
      formValue.name &&
      formValue.phone &&
      formValue.password === formValue.confirmPassword &&
      terms;

    if (hasRequired) {
      await dispatch(registerUser(formValue));
    }
  };

  const getFieldError = (fieldName: string) => {
    return validationErrors.find((err) => err.field === fieldName)?.message;
  };

  return (
    <FormLayout
      fields={fields}
      buttonText="Зарегистрироваться"
      linkBefore="Уже есть аккаунт?"
      linkText="Войти"
      linkTo="/login"
      formData={formValue}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      getFieldError={getFieldError}
      isFormValid={isFormValid}
      terms={terms}
      termsChange={termsChange}
    />
  );
};

export default FormRegistration;
