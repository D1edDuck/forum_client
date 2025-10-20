import s from "./index.module.css";
import { useAppSelector } from "@/app/hooks/useAppSelector";

const Loader = () => {
  const { isLoading, text } = useAppSelector((state) => state.loading);

  if (!isLoading) return null;

  return (
    <div className={s.overlay}>
      <div className={s.loader}>
        <div className={s.spinner}></div>
        <span className={s.text}>{text}</span>
      </div>
    </div>
  );
};

export default Loader;
