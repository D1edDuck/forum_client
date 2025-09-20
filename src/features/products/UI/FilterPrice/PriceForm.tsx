import s from "./index.module.css";
import { usePriceForm } from "@/features/products/hooks/usePriceForm";

export const PriceForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { min, max, setMax, setMin, handleSubmit } = usePriceForm({ onSubmit });

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.formInput}>
        <p>от</p>
        <input
          type="number"
          className={s.input}
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
      </div>
      <div>
        <p>до</p>
        <input
          type="number"
          className={s.input}
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
      </div>
      <button className={s.button} type="submit">
        Готово
      </button>
    </form>
  );
};
