import s from "./index.module.css";

type Props = {
  title: string;
  primary: "hard" | "soft";
};

const ButtonConnect = ({ title, primary }: Props) => {
  return (
    <button
      className={`${s.btn_connect} ${primary == "hard" ? s.hard : primary == "soft" ? s.soft : ""}`}
    >
      {title}
    </button>
  );
};

export default ButtonConnect;
