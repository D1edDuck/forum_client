import { useAppSelector } from "@/app/hooks/useAppSelector";
import NavigateLine from "@/UI/NavigateLine/NavigateLine";
import BookingForm from "@/features/booking/UI/BookingForm/BookingForm";
import Contacts from "@/features/booking/UI/Contacts/Contacts";
import s from "./index.module.css";

const BookingPage = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className={s.page}>
      <div className={s.container}>
        <NavigateLine />
        <h1 className={s.title}>Оставить заявку на услугу</h1>
        <div className={s.bookingPage}>
          <BookingForm user={user} key={`Booking-${user?.id}`} />
          <Contacts key={`Contacts=${user?.id}`} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
