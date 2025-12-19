import useClients from "../../hooks/useClients";
import s from "./index.module.css";

const Clients = () => {
  const { clients } = useClients();

  const handleEdit = (id: string) => {
    console.log("Редактируем пользователя:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Удаляем пользователя:", id);
  };

  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.th}>ID</th>
            <th className={s.th}>Name</th>
            <th className={s.th}>Email</th>
            <th className={s.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.users.map((user) => (
            <tr key={user.id} className={s.tr}>
              <td className={s.td}>{user.id}</td>
              <td className={s.td}>{user.name}</td>
              <td className={s.td}>{user.email}</td>
              <td className={s.tdActions}>
                <button
                  className={s.editBtn}
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className={s.deleteBtn}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {clients.users.length === 0 && (
            <tr>
              <td colSpan={4} className={s.tdEmpty}>
                Нет пользователей
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
