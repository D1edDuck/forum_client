import { useOpenFilter } from "@/features/products/filter/hooks/useOpenFilter";
import s from "./index.module.css";
import { PriceForm } from "./PriceForm";
import Arrow from "@/UI/Arrow/Arrow";

interface IProps {
  title: string;
}

const FilterPrice = ({ title }: IProps) => {
  const { open, toggle, ref } = useOpenFilter();

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={s.block} ref={ref}>
      <div className={`${s.filter} ${open ? s.open : ""}`} onClick={toggle}>
        <span>{title}</span>
        <div className={s.arr}>
          <Arrow size="s" color="w" open={open} />
        </div>
      </div>

      {open && (
        <div className={s.formContainer} onClick={handleFormClick}>
          <PriceForm onSubmit={toggle} />
        </div>
      )}
    </div>
  );
};

export default FilterPrice;
