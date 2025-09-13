import type { FC } from "react";

interface IChild {
  name: string;
}

const SvgLink: FC<IChild> = ({ name }) => {
  return (
    <div className={`icon_contact`}>
      <svg className={`icon`}>
        <use href={`../src/assets/icons/symbol-defs.svg#icon-${name}`}></use>
      </svg>
    </div>
  );
};

export default SvgLink;
