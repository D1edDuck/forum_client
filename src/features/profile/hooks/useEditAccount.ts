import { useState } from "react";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { editAccount } from "../userThunk";
import { IFormValue, resetValue } from "../userSlice";
import { openModal } from "@/UI/Modal/modalSlice";

type ErrorWithMessage = {
  message: string;
  errors?: Array<{ field: string; message: string }>;
};

const useEditAccount = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    id: user?.id || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    setEdit(false);
    dispatch(resetValue());
  };

  const handleSave = async () => {
    try {
      await dispatch(editAccount(formData as Partial<IFormValue>)).unwrap();

      setEdit(false);
      dispatch(
        openModal({
          tittle: "Успех",
          status: "fulfilled",
          text: `Данные успешно обновлены`,
        }),
      );
    } catch (error) {
      const typedError = error as ErrorWithMessage;

      if (typedError.errors && Array.isArray(typedError.errors)) {
        const errorsMap: Record<string, string> = {};
        typedError.errors.forEach((err) => {
          errorsMap[err.field] = err.message;
        });

        const errorMessages = Object.values(errorsMap).join("\n  ");

        dispatch(
          openModal({
            tittle: "Ошибка валидации",
            status: "error",
            text: errorMessages || "Ошибка валидации",
          }),
        );
      } else if (typedError.message) {
        dispatch(
          openModal({
            tittle: "Ошибка",
            status: "error",
            text: typedError.message,
          }),
        );
      } else {
        dispatch(
          openModal({
            tittle: "Ошибка",
            status: "error",
            text: "Неизвестная ошибка",
          }),
        );
      }
    }
  };

  return {
    edit,
    setEdit,
    formData,
    handleChange,
    handleSave,
    handleCancel,
    dispatch,
    user,
  };
};

export default useEditAccount;
