import s from "./index.module.css";

interface IProps {
  size: "s" | "l";
  color: "w" | "b";
  open: boolean;
}

const Arrow = ({ size, color, open }: IProps) => {
  const upClass = `${s["up" + size + color]}`;
  const downClass = `${s["down" + size + color]}`;
  const blockClass = `${s["block"]} ${open ? s.open : s.close}`;

  return (
    <div className={blockClass}>
      <div className={upClass}></div>
      <div className={downClass}></div>
    </div>
  );
};

export default Arrow;
