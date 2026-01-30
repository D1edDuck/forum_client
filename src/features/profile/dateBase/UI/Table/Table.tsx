import { formatDate } from "@/app/hooks/formatDate";
import s from "./index.module.css";

type TableProps<T> = {
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
            {/* <th className={s.th}>ACTIONS</th> */}
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

                    if (key === "imageUrl") {
                      return (
                        <a
                          href={`${import.meta.env.VITE_API_URL_IMAGE}${value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${value ? s.link : ""}`}
                        >
                          {value ? "Смотреть фото" : "No Image"}
                        </a>
                      );
                    }
                    return String(value);
                  })()}
                </td>
              ))}
              {/* <td className={s.tdActions}>
                <button className={s.editBtn}>Edit</button>
                <button className={s.deleteBtn}>Delete</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
