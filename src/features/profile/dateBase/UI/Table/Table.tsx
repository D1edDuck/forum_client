import { formatDate } from "@/app/hooks/formatDate";
import s from "./index.module.css";
import ModalForm from "../ModalForm/ModalForm";
import useModalForm from "../../hooks/useModalForm";

type TableProps<T extends { id: number }> = {
  data: T[];
  handleDelete?: (id: number) => void;
};

function Table<T extends { id: number }>({
  data,
  handleDelete,
}: TableProps<T>) {
  const { isModalOpen, handleEdit, closeEdit, editItem } = useModalForm<T>();

  if (!data || data.length === 0) {
    return <p className={s.tdEmpty}>Нет данных</p>;
  }

  const columns = Object.keys(data[0]) as Array<keyof T>;

  const renderCellValue = (
    key: keyof T,
    value: T[keyof T],
  ): React.ReactNode => {
    if (value === null || value === undefined) {
      return "—";
    }

    if (typeof value === "object") {
      if (value !== null && !Array.isArray(value)) {
        const objectValues = Object.values(value)
          .filter(
            (v): v is string | number | boolean =>
              typeof v !== "object" && v !== null,
          )
          .map(String);

        return objectValues.length > 0 ? objectValues.join(" / ") : "{...}";
      }

      if (Array.isArray(value)) {
        return value.length > 0
          ? `[${value.map((v) => String(v)).join(", ")}]`
          : "[]";
      }
    }

    if (
      String(key).toLowerCase().includes("created") ||
      String(key).toLowerCase().includes("date")
    ) {
      return formatDate(String(value));
    }

    if (key === "imageUrl" || String(key).toLowerCase().includes("image")) {
      const imageUrl = String(value);
      if (!imageUrl) return "No Image";

      const fullUrl = `${import.meta.env.VITE_API_URL_IMAGE}${imageUrl}`;
      return (
        <a href={fullUrl} target="_blank" className={s.link}>
          Смотреть фото
        </a>
      );
    }

    if (typeof value === "boolean") {
      return value ? "✓" : "✕";
    }

    if (typeof value === "number") {
      if (value > 9999) {
        return value.toLocaleString();
      }
      if (String(key).toLowerCase().includes("price")) {
        return `${value.toLocaleString()} ₽`;
      }
    }

    return String(value);
  };

  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column)} className={s.th}>
                {String(column)
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())
                  .replace(/_/g, " ")}
              </th>
            ))}
            <th className={s.th}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className={s.tr}>
              {columns.map((column) => (
                <td key={String(column)} className={s.td}>
                  {renderCellValue(column, row[column])}
                </td>
              ))}
              <td className={s.tdActions}>
                <button
                  className={s.editBtn}
                  onClick={() => handleEdit(row)}
                  aria-label={`Редактировать запись ${row.id}`}
                >
                  <span className={s.btnIcon}>✎</span>
                  Изменить
                </button>
                <button
                  className={s.deleteBtn}
                  onClick={() => handleDelete?.(row.id)}
                  aria-label={`Удалить запись ${row.id}`}
                >
                  <span className={s.btnIcon}>🗑</span>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && editItem && (
        <ModalForm<T>
          closeEdit={closeEdit}
          item={editItem}
          onSave={(updatedItem) => {
            console.log("Saved:", updatedItem);
            closeEdit();
          }}
        />
      )}
    </div>
  );
}

export default Table;
