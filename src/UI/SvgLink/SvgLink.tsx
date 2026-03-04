import type { FC } from "react";
import s from "./index.module.css";
interface IChild {
  name: string;
  size: "small" | "large" | "big";
}

const SvgLink: FC<IChild> = ({ name, size }) => {
  const icon_size = [
    s.icon_contact,
    size === "small" && s.icon_small,
    size === "large" && s.icon_large,
    size === "big" && s.icon_big,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={icon_size}>
      <svg className={s.icon}>
        <use href={`/icons/symbol-defs.svg#icon-${name}`}></use>
      </svg>
    </div>
  );
};

export default SvgLink;
