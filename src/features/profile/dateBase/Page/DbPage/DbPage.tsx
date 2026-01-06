import { useParams } from "react-router-dom";
import useClients from "../../hooks/useClients";
import Table from "../Table/Table";
import { IProduct, IRepair } from "@/api/type";

type TableType = "client" | "repair" | "product";

const DbPage = () => {
  const { users, repairs, products } = useClients();
  const { type } = useParams<{ type: TableType }>();

  const tableType: TableType = type ?? "client";

  const tableData: Array<
    | { id: string; name: string; email: string; phone: number }
    | IRepair
    | IProduct
  > = (() => {
    switch (tableType) {
      case "client":
        return users.clients.users;
      case "repair":
        return repairs.repairs;
      case "product":
        return products.products;
      default:
        return [];
    }
  })();

  return <Table data={tableData} />;
};

export default DbPage;
