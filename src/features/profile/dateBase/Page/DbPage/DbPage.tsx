import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback } from "react";
import useClients from "../../hooks/useClients";
import Table from "../../UI/Table/Table";
import { ICatalog, IClient, IProduct, IRepair } from "@/api/type";
import s from "./index.module.css";
import {
  deletedCategory,
  deletedProduct,
  deletedUser,
  updateCategory,
  updateProduct,
  updateUser,
} from "../../dbThunks";
import { deletedRepairs } from "@/features/profile/repairs/repairThunk";
import { editStatus } from "@/features/profile/repairs/repairThunk";
import ConfirmModal from "@/UI/ConfirmModal/ConfirmModal";

type TableType = "client" | "repair" | "product" | "category";

const DbPage = () => {
  const navigate = useNavigate();
  const { users, repairs, products, category, dispatch } = useClients();
  const { type } = useParams<{ type: TableType }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

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
    category: (id: number) => setConfirmDeleteId(id),
  };

  const updateActions: Record<TableType, (item: any) => Promise<void>> = {
    client: async (item: IClient) => {
      await dispatch(
        updateUser({ id: item.id, data: item as Partial<IClient> }),
      ).unwrap();
    },
    product: async (item: IProduct) => {
      await dispatch(
        updateProduct({ id: item.id, data: item as Partial<IProduct> }),
      ).unwrap();
    },
    category: async (item: ICatalog) => {
      await dispatch(
        updateCategory({ id: item.id, data: item as Partial<ICatalog> }),
      ).unwrap();
    },
    repair: async (item: IRepair) => {
      await dispatch(
        editStatus({ id: item.id, status: item.status }),
      ).unwrap();
    },
  };

  const handleConfirmDelete = useCallback(() => {
    if (confirmDeleteId) {
      dispatch(deletedCategory({ id: confirmDeleteId }));
      setConfirmDeleteId(null);
    }
  }, [confirmDeleteId, dispatch]);

  const handleCancelDelete = useCallback(() => {
    setConfirmDeleteId(null);
  }, []);

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

  const handleExport = useCallback(() => {
    const json = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tableType}_export.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filteredData, tableType]);

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
          <button className={s.actionButton} onClick={handleExport}>Экспорт</button>
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
            onUpdate={(item) => updateActions[tableType](item)}
          />
        </div>
      ) : (
        <div className={s.emptyState}>
          <div className={s.emptyStateIcon}>{emptyState.icon}</div>
          <h3 className={s.emptyStateTitle}>{emptyState.title}</h3>
          <p className={s.emptyStateText}>{emptyState.text}</p>
          {!searchQuery && (
            <button
              className={s.emptyStateButton}
              onClick={() => navigate(`/profile/add/${type}`)}
            >
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

      <ConfirmModal
        isOpen={confirmDeleteId !== null}
        title="Удаление категории"
        message="Вы уверены, что хотите удалить категорию? Все товары внутри неё будут безвозвратно удалены."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default DbPage;
