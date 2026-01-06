import { formatDate } from "@/app/hooks/formatDate";
import s from "./index.module.css";

type TableProps<T extends { id: string | number }> = {
  data: T[];
};

function Table<T extends { id: number | string }>({ data }: TableProps<T>) {
  if (!data || data.length === 0) {
    return <p className={s.tdEmpty}>Нет данных</p>;
  }

  const head = Object.keys(data[0]) as (keyof T)[];

  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={String(h)} className={s.th}>
                {String(h).toUpperCase()}
              </th>
            ))}
            <th className={s.th}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id} className={s.tr}>
              {Object.entries(d).map(([key, value]) => (
                <td key={key} className={s.td}>
                  {(() => {
                    if (typeof value === "object" && value !== null) {
                      return Object.values(value)
                        .filter((v) => typeof v !== "object")
                        .map(String)
                        .join(" / ");
                    }

                    if (key.toLowerCase().includes("created")) {
                      return formatDate(String(value));
                    }

                    return String(value);
                  })()}
                </td>
              ))}
              <td className={s.tdActions}>
                <button className={s.editBtn}>Edit</button>
                <button className={s.deleteBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
