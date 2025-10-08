import FormLayout from "../FormLayout/FormLayout";

const registerFields = [
  { name: "name", type: "text", required: true, label: "Имя" },
  { name: "email", type: "email", required: false, label: "Email" },
  { name: "phone", type: "tel", required: true, label: "Номер телефона" },
  { name: "password", type: "password", required: true, label: "Пароль" },
];

const FormRegistration = () => (
  <FormLayout
    fields={registerFields}
    buttonText="Зарегистрироваться"
    linkBefore="Уже есть аккаунт?"
    linkText="Войти"
    linkTo="/login"
  />
);

export default FormRegistration;
