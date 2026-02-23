import { useState, useRef } from "react";
import s from "./index.module.css";

type Props = {
  title: string;
  primary: "hard" | "soft" | "gradient";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  pulse?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const ButtonConnect = ({
  title,
  primary = "hard",
  size = "medium",
  fullWidth = false,
  loading = false,
  disabled = false,
  pulse = false,
  icon,
  iconPosition = "right",
  onClick,
  type = "button",
  className = "",
}: Props) => {
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleIdRef = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = { x, y, id: rippleIdRef.current++ };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }

    onClick?.(e);
  };

  const buttonClasses = [
    s.btn_connect,
    primary === "hard" && s.hard,
    primary === "soft" && s.soft,
    primary === "gradient" && s.gradientBorder,
    size === "small" && s.small,
    size === "large" && s.large,
    fullWidth && s.fullWidth,
    loading && s.loading,
    pulse && s.pulse,
    disabled && s.disabled,
    icon && iconPosition === "left" && s.iconLeft,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={buttonRef}
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={s.ripple}
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}

      {loading && <span className={s.spinner} />}

      {icon && iconPosition === "left" && (
        <span className={s.icon}>{icon}</span>
      )}

      <span>{title}</span>

      {icon && iconPosition === "right" && (
        <span className={s.icon}>{icon}</span>
      )}
    </button>
  );
};

export default ButtonConnect;
