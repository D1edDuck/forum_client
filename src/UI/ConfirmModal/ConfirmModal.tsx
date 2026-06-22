import { useCallback, useEffect, useRef } from "react";
import s from "./index.module.css";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Удалить",
  cancelText = "Отмена",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    onCancel();
  }, [onCancel]);

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

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div
      className={s.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={s.modal} ref={modalRef} tabIndex={-1}>
        <div className={s.header}>
          <h3 className={s.title}>{title}</h3>
          <button
            className={s.closeBtn}
            onClick={close}
            aria-label="Закрыть"
            type="button"
          >
            ✕
          </button>
        </div>
        <hr className={s.hr} />
        <div className={s.message}>{message}</div>
        <div className={s.actions}>
          <button
            className={s.cancelBtn}
            onClick={close}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className={s.confirmBtn}
            onClick={onConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
