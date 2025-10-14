import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { inputValue } from "../userSlice";

export const useFormInput = () => {
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    dispatch(inputValue({ id: fieldName, value: e.target.value }));
  };

  return { handleChange };
};
