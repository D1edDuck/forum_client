import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import FormLayout from "../FormLayout/FormLayout";
import { IFormValue, inputValue, resetValue } from "../../userSlice";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { registerUser } from "../../userThunk";

export interface IFields {
  name: string;
  type: string;
  required: boolean;
  label: string;
  placeholder?: string;
}

const registrationFields: IFields[] = [
  { name: "name", type: "text", required: true, label: "Имя" },
  { name: "email", type: "email", required: false, label: "Email" },
  { name: "phone", type: "tel", required: true, label: "Номер телефона" },
  { name: "password", type: "password", required: true, label: "Пароль" },
];

const FormRegistration = () => {
  const formData = useAppSelector((state) => state.user.formValue);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof IFormValue;
    dispatch(inputValue({ id: fieldName, value: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(registerUser(formData));
    dispatch(resetValue());
  };

  return (
    <FormLayout
      fields={registrationFields}
      buttonText="Зарегистрироваться"
      linkBefore="Есть аккаунт?"
      linkText="Войти"
      linkTo="/login"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
    />
  );
};

export default FormRegistration;
