import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setValue, setValuePatch } from "../repairSlice";
import { IFilterData } from "../UI/FilterForm/FilterForm";
import { openModal } from "@/UI/Modal/modalSlice";

export const useInputForm = (
  onSubmit: (data: IFilterData) => void,
  variant: "left" | "right",
  toggle?: () => void,
  patch?: boolean
) => {
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
  const data = patch ? formPatch : formData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(data);
      if (variant == "left")
        dispatch(
          openModal({
            status: "fulfilled",
            text: `Статус заявки успешно изменен`,
            tittle: "Успешно",
          })
        );
    }
    if (toggle) toggle();
  };

  return { data, handleChange, handleSubmit, dispatch };
};
