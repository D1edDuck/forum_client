import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setValue } from "../repairSlice";

export const useInputForm = () => {
  const formData = useAppSelector((state) => state.repair.formValue);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      setValue({
        field: name,
        value: value,
      })
    );
  };

  return { formData, handleChange, dispatch };
};
