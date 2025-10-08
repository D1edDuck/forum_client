import FormLayout from "../FormLayout/FormLayout";

const loginFields = [
  { name: "phone", type: "tel", required: true, label: "Номер телефона" },
  { name: "password", type: "password", required: true, label: "Пароль" },
];

const FormAuthorization = () => {
  return (
    <FormLayout
      fields={loginFields}
      buttonText="Войти"
      linkBefore="Нет аккаунта?"
      linkText="Регистрация"
      linkTo="/registration"
    />
  );
};

export default FormAuthorization;
