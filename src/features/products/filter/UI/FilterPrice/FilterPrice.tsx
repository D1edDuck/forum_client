import { useOpenFilter } from "@/features/products/filter/hooks/useOpenFilter";
import s from "./index.module.css";
import { PriceForm } from "./PriceForm";
import Arrow from "@/UI/Arrow/Arrow";

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
          <p className={s.arr}>
            {open ? (
              <Arrow color="w" size="s" side="l" />
            ) : (
              <Arrow color="w" size="s" side="r" />
            )}
          </p>
        </div>
        {open && <PriceForm onSubmit={toggle} />}
      </div>
    </div>
  );
};

export default FilterPrice;
