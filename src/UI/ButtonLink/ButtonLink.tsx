import { NavLink } from "react-router-dom";
import s from "./index.module.css";
import type { FC } from "react";

type path = {
  path?: string;
  title: string;
  variant: string;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const ButtonLink: FC<path> = ({
  path,
  title,
  variant,
  size = "medium",
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
}) => {
  const buttonClasses = [
    s.cta,
    s[variant],
    s[size],
    fullWidth && s.fullWidth,
    loading && s.loading,
    disabled && s.disabled,
  ]
    .filter(Boolean)
    .join(" ");

  if (path) {
    return (
      <div className={s.box}>
        <NavLink className={buttonClasses} to={path} onClick={onClick}>
          {loading && <span className={s.spinner} />}
          {title}
        </NavLink>
      </div>
    );
  }

  return (
    <div className={s.box}>
      <button
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {loading && <span className={s.spinner} />}
        {title}
      </button>
    </div>
  );
};

export default ButtonLink;
