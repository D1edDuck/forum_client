import { IBooking, IRepair } from "@/api/type";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { inputValue } from "../bookingSlice";
import { apiClient } from "@/app/apiClient";

const useForm = () => {
  const dispatch = useAppDispatch();
  const { name, comment, email, phone, cause } = useAppSelector(
    (state) => state.booking
  );

  function setValue(id: keyof IBooking, e: string) {
    dispatch(inputValue({ id: id, value: e }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const repair: IRepair = { cause, comment, status: "pending", userId: 1 }; // ИЗМЕНИТЬ USERID, ВРЕМЕННАЯ КОНСТАНТА
    apiClient("repair", "POST", repair);
  }

  return {
    name,
    cause,
    comment,
    email,
    phone,
    onSubmit,
    setValue,
  };
};

export default useForm;
