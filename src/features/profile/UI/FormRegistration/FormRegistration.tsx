import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import FormLayout from "../FormLayout/FormLayout";
import { IFormValue, inputValue, resetValue } from "../../userSlice";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { registerUser } from "../../userThunk";
import { useNavigate } from "react-router-dom";

export interface IFields {
  name: string;
  type: string;
  required: boolean;
  label: string;
  placeholder?: string;
}

const registrationFields: IFields[] = [
  { name: "name", type: "text", required: true, label: "Имя" },
  { name: "email", type: "email", required: true, label: "Email" },
  { name: "phone", type: "tel", required: true, label: "Номер телефона" },
  { name: "password", type: "password", required: true, label: "Пароль" },
];

const FormRegistration = () => {
  const navigate = useNavigate();
  const formData = useAppSelector((state) => state.user.formValue);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof IFormValue;
    dispatch(inputValue({ id: fieldName, value: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(registerUser(formData)).unwrap();
      dispatch(resetValue());
      navigate("/profile");
    } catch (err) {
      console.error("Ошибка авторизации:", err);
    }
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
