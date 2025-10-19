import { IBooking, IRepair } from "@/api/type";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { inputValue } from "../bookingSlice";
import { apiClient } from "@/api/apiClient";
import { IProps } from "../UI/BookingForm/BookingForm";
import { useEffect } from "react";
import { repairsUser } from "@/features/profile/userThunk";

const useForm = ({ user }: IProps) => {
  const dispatch = useAppDispatch();
  const { name, comment, email, phone, cause } = useAppSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (user) {
      if (user.name) dispatch(inputValue({ id: "name", value: user.name }));
      if (user.email) dispatch(inputValue({ id: "email", value: user.email }));
      if (user.phone) dispatch(inputValue({ id: "phone", value: user.phone }));
    } else {
      dispatch(inputValue({ id: "name", value: "" }));
      dispatch(inputValue({ id: "email", value: "" }));
      dispatch(inputValue({ id: "phone", value: "" }));
    }
  }, [user, dispatch]);

  function setValue(id: keyof IBooking, e: string) {
    dispatch(inputValue({ id: id, value: e }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user && user.id !== null) {
      const repair: Omit<IRepair, "id"> = {
        cause,
        comment,
        status: "pending",
        userId: user.id,
      };
      apiClient("repair", "POST", repair);
      dispatch(repairsUser(user.id));
    }
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
