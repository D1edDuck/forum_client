import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import useClients from "../../hooks/useClients";
import Table from "../../UI/Table/Table";
import { ICatalog, IClient, IProduct, IRepair } from "@/api/type";
import s from "./index.module.css";
import { deletedCategory, deletedProduct, deletedUser } from "../../dbThunks";
import { deletedRepairs } from "@/features/profile/repairs/repairThunk";

type TableType = "client" | "repair" | "product" | "category";

const DbPage = () => {
  const { users, repairs, products, category, dispatch } = useClients();
  const { type } = useParams<{ type: TableType }>();
  const [searchQuery, setSearchQuery] = useState("");

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

    return data;
  }, [tableData, searchQuery]);

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
        <h2 className={s.title}>{getTableTitle()}</h2>

        <div className={s.tableStats}>
          <span className={s.statItem}>
            <span className={s.statDot}></span>
            <span className={s.statLabel}>Всего:</span>
            <span className={s.statValue}>{tableData.length}</span>
          </span>
          {filteredData.length !== tableData.length && (
            <span className={s.statItem}>
              <span className={s.statDot}></span>
              <span className={s.statLabel}>Найдено:</span>
              <span className={s.statValue}>{filteredData.length}</span>
            </span>
          )}
        </div>

        <div className={s.tableActions}>
          <button className={s.actionButton}>Экспорт</button>
        </div>
      </div>

      <div className={s.tableControls}>
        <div className={s.searchBox}>
          <svg
            className={s.searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            className={s.searchInput}
            placeholder={`Поиск по ${getTableTitle().toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
              Добавить {getTableTitle().slice(0, -1)}
            </button>
          )}
          {searchQuery && (
            <button
              className={s.emptyStateButton}
              onClick={() => setSearchQuery("")}
            >
              Очистить поиск
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DbPage;
