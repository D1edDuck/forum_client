import NavigateLine from "@/components/UI/NavigateLine/NavigateLine";
import PersonalAccount from "@/features/profile/UI/PersonalAccount/PersonalAccount";

const ProfilePage = () => {
  return (
    <div>
      <div className="container pb fled mb">
        <NavigateLine />
        <h2 className="title">Личный кабинет</h2>
        <PersonalAccount />
      </div>
    </div>
  );
};

export default ProfilePage;
