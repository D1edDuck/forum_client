import s from "./index.module.css";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

const Hamburger = ({ isOpen, onToggle }: Props) => {
  return (
    <button
      className={`${s.hamburger} ${isOpen ? s.open : ""}`}
      onClick={onToggle}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={isOpen}
    >
      <span />
      <span />
      <span />
    </button>
  );
};

export default Hamburger;
