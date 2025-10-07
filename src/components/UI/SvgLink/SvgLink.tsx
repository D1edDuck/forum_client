import type { FC } from "react";
import s from "./index.module.css";
interface IChild {
  name: string;
}

const SvgLink: FC<IChild> = ({ name }) => {
  return (
    <div className={s.icon_contact}>
      <svg className={s.icon}>
        <use href={`../src/assets/icons/symbol-defs.svg#icon-${name}`}></use>
      </svg>
    </div>
  );
};

export default SvgLink;
