import s from "./index.module.css";

interface IProps {
  size: "s" | "l";
  color: "w" | "b";
  side: "r" | "l";
}

const Arrow = ({ size, color, side = "r" }: IProps) => {
  const upClass = `${s["up" + size + color]}`;
  const downClass = `${s["down" + size + color]}`;
  const blockClass = `${s["block" + side]}`;

  return (
    <div className={blockClass}>
      <div className={upClass}></div>
      <div className={downClass}></div>
    </div>
  );
};

export default Arrow;
