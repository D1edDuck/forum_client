import { useAppSelector } from "@/app/hooks/useAppSelector";
import NavigateLine from "@/components/UI/NavigateLine/NavigateLine";
import BookingForm from "@/features/booking/UI/BookingForm/BookingForm";
import Contacts from "@/features/booking/UI/Contacts/Contacts";

const BookingPage = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="container mb pb">
      <NavigateLine />
      <h2 className="title">Оставить заявку на услугу</h2>
      <div className="BookingPage">
        <BookingForm user={user} />
        <Contacts />
      </div>
    </div>
  );
};

export default BookingPage;
