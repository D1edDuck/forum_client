import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import useClients from "../../hooks/useClients";
import Table from "../../UI/Table/Table";
import { ICatalog, IClient, IProduct, IRepair, RepairStatus } from "@/api/type";
import s from "./index.module.css";
import { deletedCategory, deletedProduct, deletedUser } from "../../dbThunks";
import { deletedRepairs } from "@/features/profile/repairs/repairThunk";

type TableType = "client" | "repair" | "product" | "category";

const DbPage = () => {
  const { users, repairs, products, category, dispatch } = useClients();
  const { type } = useParams<{ type: TableType }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<RepairStatus | "all">("all");

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

  const actions = {
    client: (id: number) => dispatch(deletedUser({ id })),
    repair: (id: number) => dispatch(deletedRepairs({ id })),
    product: (id: number) => dispatch(deletedProduct({ id })),
    category: (id: number) => dispatch(deletedCategory({ id })),
  };

  const filteredData = useMemo(() => {
    let data = [...tableData];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter((item) => {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(query),
        );
      });
    }

    if (filterStatus !== "all") {
      data = data.filter((item) => {
        if ("status" in item && typeof item.status === "string") {
          return item.status === filterStatus;
        }
        return false;
      });
    }

    return data;
  }, [tableData, searchQuery, filterStatus]);

  const getTableTitle = () => {
    const titles = {
      client: "Клиенты",
      repair: "Ремонты",
      product: "Товары",
      category: "Категории",
    };
    return titles[tableType];
  };

  const getEmptyStateMessage = () => {
    if (searchQuery) {
      return {
        icon: "🔍",
        title: "Ничего не найдено",
        text: `По запросу "${searchQuery}" ничего не найдено`,
      };
    }

    const messages = {
      client: {
        icon: "👥",
        title: "Нет клиентов",
        text: "Добавьте первого клиента",
      },
      repair: {
        icon: "🔧",
        title: "Нет ремонтов",
        text: "Создайте новый ремонт",
      },
      product: {
        icon: "📦",
        title: "Нет товаров",
        text: "Добавьте товар в каталог",
      },
      category: {
        icon: "📁",
        title: "Нет категорий",
        text: "Создайте новую категорию",
      },
    };

    return messages[tableType];
  };

  const emptyState = getEmptyStateMessage();

  return (
    <div className={s.content}>
      <div className={s.header}>
        <h2 className={s.title} data-count={filteredData.length}>
          {getTableTitle()}
        </h2>

        <div className={s.tableStats}>
          <span className={s.statItem}>
            <span className={s.statDot}></span>
            <span className={s.statLabel}>Всего:</span>
            <span className={s.statValue}>{tableData.length}</span>
          </span>
          <span className={s.statItem}>
            <span className={s.statLabel}>Отображается:</span>
            <span className={s.statValue}>{filteredData.length}</span>
          </span>
        </div>

        <div className={s.tableActions}>
          <button className={`${s.actionButton} ${s.primary}`}>
            <span>➕</span>
            Добавить
          </button>
        </div>
      </div>

      <div className={s.tableControls}>
        <div className={s.searchBox}>
          <span className={s.searchIcon}>🔍</span>
          <input
            type="text"
            className={s.searchInput}
            placeholder={`Поиск по ${getTableTitle().toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={s.filterGroup}>
          <button
            className={`${s.filterButton} ${filterStatus === "all" ? s.active : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            Все
          </button>
          <button
            className={`${s.filterButton} ${filterStatus === "active" ? s.active : ""}`}
            onClick={() => setFilterStatus("active")}
          >
            Активные
          </button>
          <button
            className={`${s.filterButton} ${filterStatus === "archive" ? s.active : ""}`}
            onClick={() => setFilterStatus("archive")}
          >
            Архив
          </button>
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className={s.tableContainer}>
          <Table
            data={filteredData}
            handleDelete={(id) => actions[tableType](id)}
          />
        </div>
      ) : (
        <div className={s.emptyState}>
          <div className={s.emptyStateIcon}>{emptyState.icon}</div>
          <h3 className={s.emptyStateTitle}>{emptyState.title}</h3>
          <p className={s.emptyStateText}>{emptyState.text}</p>
          {!searchQuery && (
            <button className={s.emptyStateButton}>
              <span>➕</span>
              Добавить {getTableTitle().slice(0, -1)}
            </button>
          )}
          {searchQuery && (
            <button
              className={s.emptyStateButton}
              onClick={() => setSearchQuery("")}
            >
              <span>🗑</span>
              Очистить поиск
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DbPage;
