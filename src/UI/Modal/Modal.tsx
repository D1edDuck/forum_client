import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import s from "./index.module.css";
import { toggleEvent } from "./modalSlice";

const Modal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.open);
  const data = useAppSelector((state) => state.modal.data);

  if (!isOpen || !data) return null;

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) dispatch(toggleEvent());
  };

  const modalStatus = data.status ? s[data.status] : "";

  return (
    <div className={s.main} onClick={handleClose}>
      <div className={`${s.modal} ${modalStatus}`}>
        <div className={s.header}>
          <h3 className={s.tittle}>{data.tittle}</h3>
          <button onClick={() => dispatch(toggleEvent())}>X</button>
        </div>
        <hr className={s.hr} />
        <div className={s.text}>{data.text}</div>
        <button className={s.btn} onClick={() => dispatch(toggleEvent())}>
          Ок
        </button>
      </div>
    </div>
  );
};

export default Modal;
