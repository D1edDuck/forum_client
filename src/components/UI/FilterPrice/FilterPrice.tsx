import { useOpenFilter } from "@/app/hooks/useOpenFilter";
import s from "./index.module.css";
import { PriceForm } from "./PriceForm";

interface IProps {
  title: string;
}

const FilterPrice = ({ title }: IProps) => {
  const { open, toggle, ref } = useOpenFilter();

  return (
    <div className={s.block} ref={ref}>
      <div className={s.filter}>
        <div className="flex gap" onClick={toggle}>
          <p>{title}</p>
          <p>{open ? "▴" : "▾"}</p>
        </div>
        {open && <PriceForm onSubmit={toggle} />}
      </div>
    </div>
  );
};

export default FilterPrice;
