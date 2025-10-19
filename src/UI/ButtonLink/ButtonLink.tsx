import { NavLink } from "react-router-dom";
import s from "./index.module.css";
import type { FC } from "react";

type path = {
  path?: string;
  title: string;
  variant: string;
};

const ButtonLink: FC<path> = ({ path, title, variant }) => {
  return (
    <div>
      {path ? (
        <NavLink className={`${s.cta} ${variant}`} to={`${path}`}>
          {title}
        </NavLink>
      ) : (
        <button className={`${s.cta} ${variant}`}>{title}</button>
      )}
    </div>
  );
};

export default ButtonLink;
