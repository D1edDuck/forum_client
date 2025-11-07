import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setValue, setValuePatch } from "../repairSlice";

export const useInputForm = () => {
  const formData = useAppSelector((state) => state.repair.formValue);
  const formPatch = useAppSelector((state) => state.repair.formValuePatch);
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    patch: boolean | undefined
  ) => {
    const { name, value } = e.target;
    if (patch) {
      dispatch(setValuePatch({ field: name, value: value }));
    } else {
      dispatch(
        setValue({
          field: name,
          value: value,
        })
      );
    }
  };

  return { formData, formPatch, handleChange, dispatch };
};
