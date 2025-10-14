import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { resetValue } from "../../userSlice";
import FormLayout from "../FormLayout/FormLayout";
import { loginUser } from "../../userThunk";
import { IFields } from "../FormRegistration/FormRegistration";
import { useNavigate } from "react-router-dom";
import { useFormInput } from "../../hooks/useFormInput";

const loginFields: IFields[] = [
  { name: "phone", type: "tel", required: true, label: "Номер телефона" },
  { name: "password", type: "password", required: true, label: "Пароль" },
];

const FormAuthorization = () => {
  const navigate = useNavigate();
  const formData = useAppSelector((state) => state.user.formValue);
  const dispatch = useAppDispatch();

  const { handleChange } = useFormInput();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(formData)).unwrap();
      dispatch(resetValue());
      navigate("/profile");
    } catch (err) {
      console.error("Ошибка авторизации:", err);
    }
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
