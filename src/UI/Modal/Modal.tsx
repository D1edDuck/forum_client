import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import s from "./index.module.css";
import { toggleEvent } from "./modalSlice";

const Modal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.open);
  const data = useAppSelector((state) => state.modal.data);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    dispatch(toggleEvent());
  }, [dispatch]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocus.current = document.activeElement as HTMLElement;
    const timer = setTimeout(() => {
      modalRef.current?.focus();
    }, 0);

    return () => {
      clearTimeout(timer);
      previousFocus.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }

      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen || !data) return null;

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };

  const modalStatus = data.status ? s[data.status] : "";

  return (
    <div
      className={s.main}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={data.tittle}
    >
      <div className={`${s.modal} ${modalStatus}`} ref={modalRef} tabIndex={-1}>
        <div className={s.header}>
          <h3 className={s.tittle}>{data.tittle}</h3>
          <button onClick={close} aria-label="Закрыть">
            ✕
          </button>
        </div>
        <hr className={s.hr} />
        <div className={s.text}>{data.text}</div>
        <button className={s.btn} onClick={close}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
