import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { IFormValue, inputValue, resetValue } from "../../userSlice";
import FormLayout from "../FormLayout/FormLayout";
import { loginUser } from "../../userThunk";
import { IFields } from "../FormRegistration/FormRegistration";

const loginFields: IFields[] = [
  { name: "phone", type: "tel", required: true, label: "Номер телефона" },
  { name: "password", type: "password", required: true, label: "Пароль" },
];

const FormAuthorization = () => {
  const formData = useAppSelector((state) => state.user.formValue);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof IFormValue;
    dispatch(inputValue({ id: fieldName, value: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(loginUser(formData));
    dispatch(resetValue());
  };

  return (
    <FormLayout
      fields={loginFields}
      buttonText="Войти"
      linkBefore="Нет аккаунта?"
      linkText="Регистрация"
      linkTo="/registration"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
    />
  );
};

export default FormAuthorization;
