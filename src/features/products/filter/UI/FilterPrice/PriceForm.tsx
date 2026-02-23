import s from "./index.module.css";
import { usePriceForm } from "@/features/products/filter/hooks/usePriceForm";

export const PriceForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { min, max, setMin, setMax, handleSubmit } = usePriceForm({ onSubmit });

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <form
      className={`${s.form} filterForm`}
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={s.formHeader}>
        <h4>Выберите цену</h4>
        <button type="button" onClick={onSubmit} aria-label="Закрыть">
          ×
        </button>
      </div>

      <div className={s.inputGroup}>
        <div className={s.inputWrapper}>
          <label>Минимальная</label>
          <div className={s.inputField} onClick={handleInputClick}>
            <span>₽</span>
            <input
              type="number"
              className={s.input}
              value={min}
              onChange={(e) => setMin(e.target.value)}
              placeholder="0"
              min="0"
              onClick={handleInputClick}
            />
          </div>
        </div>

        <div className={s.inputWrapper}>
          <label>Максимальная</label>
          <div className={s.inputField} onClick={handleInputClick}>
            <span>₽</span>
            <input
              type="number"
              className={s.input}
              value={max}
              onChange={(e) => setMax(e.target.value)}
              placeholder="100000"
              min="0"
              onClick={handleInputClick}
            />
          </div>
        </div>
      </div>

      <div className={s.rangeInfo}>
        <span>Диапазон:</span>
        {min || max ? (
          <span>
            {min || 0} ₽ - {max || "∞"} ₽
          </span>
        ) : (
          <span>Не выбрано</span>
        )}
      </div>

      <button
        className={s.button}
        type="submit"
        onClick={(e) => e.stopPropagation()}
      >
        Применить
      </button>
    </form>
  );
};
