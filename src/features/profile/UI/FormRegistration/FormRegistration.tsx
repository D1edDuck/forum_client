import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import {
  inputTerms,
  inputValue,
  resetValue,
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
  const navigate = useNavigate();

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
    console.log(terms, isFormValid);
    setTimeout(() => {
      if (isFormValid && terms) {
        const { ...dataToSend } = formValue;
        dispatch(registerUser(dataToSend)).then((res) => {
          if (res.type === "user/registerUser/fulfilled") {
            dispatch(resetValue());
            navigate("/profile");
          }
        });
      } else {
        console.log("Форма невалидна или не приняты условия");
      }
    }, 100);
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
