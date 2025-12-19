import { useState } from "react";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { editAccount } from "../userThunk";
import { IFormValue } from "../userSlice";

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

  const handleSave = () => {
    dispatch(editAccount(formData as Partial<IFormValue>));
    setEdit(false);
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
