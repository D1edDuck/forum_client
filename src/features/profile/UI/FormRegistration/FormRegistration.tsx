import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import FormLayout from "../FormLayout/FormLayout";
import { registerUser } from "../../userThunk";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";

const registrationFields = [
  { name: "name", type: "text", required: true, label: "Имя" },
  { name: "email", type: "email", required: false, label: "Email" },
  { name: "phone", type: "tel", required: true, label: "Номер телефона" },
  { name: "password", type: "password", required: true, label: "Пароль" },
];

const FormRegistration = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: formData.name,
        password: formData.password,
        phone: formData.phone,
        email: formData.email,
      })
    );
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
      loading={loading}
      error={error}
    />
  );
};

export default FormRegistration;
