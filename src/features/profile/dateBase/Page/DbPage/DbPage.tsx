import { useParams } from "react-router-dom";
import useClients from "../../hooks/useClients";
import Table from "../../UI/Table/Table";
import { ICatalog, IClient, IProduct, IRepair } from "@/api/type";
import s from "./index.module.css";

type TableType = "client" | "repair" | "product" | "category";

const DbPage = () => {
  const { users, repairs, products, category } = useClients();
  const { type } = useParams<{ type: TableType }>();

  const tableType: TableType = type ?? "client";

  const tableData: Array<IClient | IRepair | IProduct | ICatalog> = (() => {
    switch (tableType) {
      case "client":
        return users.clients.users;
      case "repair":
        return repairs.repairs;
      case "product":
        return products.products;
      case "category":
        return category.category;
      default:
        return [];
    }
  })();

  return (
    <div className={`${s.content} gap dlex`}>
      <div className={`${s.header} dlex gap`}>
        <h2 className={s.title}>
          {tableType.charAt(0).toUpperCase() + tableType.slice(1)}s
        </h2>
      </div>
      <Table data={tableData} />
    </div>
  );
};

export default DbPage;
