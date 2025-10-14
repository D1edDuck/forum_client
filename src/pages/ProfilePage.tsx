import NavigateLine from "@/components/UI/NavigateLine/NavigateLine";
import PersonalAccount from "@/features/profile/UI/PersonalAccount/PersonalAccount";
import Repairs from "@/features/profile/UI/Repairs/Repairs";

const ProfilePage = () => {
  return (
    <div>
      <div className="container pb fled mb">
        <NavigateLine />
        <h2 className="title">Личный кабинет</h2>
        <div className="flex gap">
          <PersonalAccount />
          <Repairs />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
