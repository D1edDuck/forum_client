import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import FormLayout from "../FormLayout/FormLayout";
import { loginUser } from "../../userThunk";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";

const loginFields = [
  { name: "phone", type: "tel", required: true, label: "Номер телефона" },
  { name: "password", type: "password", required: true, label: "Пароль" },
];

const FormAuthorization = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({ phone: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ phone: formData.phone, password: formData.password }));
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
      loading={loading}
      error={error}
    />
  );
};

export default FormAuthorization;
