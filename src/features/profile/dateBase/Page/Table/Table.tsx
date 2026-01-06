import { formatDate } from "@/app/hooks/formatDate";
import useClients from "../../hooks/useClients";
import s from "./index.module.css";

const Table = () => {
  const {
    // users: {
    //   clients: { users },
    // },
    // repairs: users,
    products: users,
  } = useClients();

  const head = Object.keys(users[0]);
  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead>
          <tr>
            {head.map((h) => {
              h = h.toLocaleUpperCase();
              return <th className={s.th}>{h}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={s.tr}>
              {Object.entries(user).map(([key, value]) => (
                <td className={s.td} key={key}>
                  {(() => {
                    if (typeof value === "object" && value !== null) {
                      return Object.values(value)
                        .filter((val) => typeof val !== "object")
                        .join(" / ");
                    }

                    if (key.includes("created")) {
                      return formatDate(value);
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
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className={s.tdEmpty}>
                Нет данных
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
