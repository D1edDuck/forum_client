import { useState } from "react";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { editAccount } from "../userThunk";
import { IFormValue } from "../userSlice";
import { openModal } from "@/UI/Modal/modalSlice";

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

  const handleSave = async () => {
    try {
      const result = await dispatch(
        editAccount(formData as Partial<IFormValue>),
      ).unwrap();

      setEdit(false);

      dispatch(
        openModal({
          tittle: "Успех",
          status: "fulfilled",
          text: `Данные успешно обновлены: ${result}`,
        }),
      );
    } catch (error) {
      dispatch(
        openModal({
          tittle: "Ошибка",
          status: "error",
          text: `${error}`,
        }),
      );
    }
  };

  return {
    edit,
    setEdit,
    formData,
    handleChange,
    handleSave,
    dispatch,
    user,
  };
};

export default useEditAccount;
