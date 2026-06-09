import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import FormLayout from "../FormLayout/FormLayout";
import { IFields } from "../FormRegistration/FormRegistration";
import { inputValue, validateForm } from "../../userSlice";
import { loginUser } from "../../userThunk";

const loginFields: IFields[] = [
  { name: "phone", type: "tel", required: true, label: "Номер телефона" },
  { name: "password", type: "password", required: true, label: "Пароль" },
];

const FormAuthorization = () => {
  const dispatch = useAppDispatch();

  const { formValue, loading, error, validationErrors, isFormValid } =
    useAppSelector((state) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(inputValue({ id: name, value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(validateForm("login"));

    if (loading) return;

    if (formValue.phone && formValue.password) {
      await dispatch(loginUser(formValue));
    }
  };

  const getFieldError = (fieldName: string) => {
    return validationErrors.find((err) => err.field === fieldName)?.message;
  };

  return (
    <FormLayout
      fields={loginFields}
      buttonText="Войти"
      linkBefore="Нет аккаунта?"
      linkText="Регистрация"
      linkTo="/registration"
      formData={formValue}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      getFieldError={getFieldError}
      isFormValid={isFormValid}
    />
  );
};

export default FormAuthorization;
