import { useState } from "react";

function useModalForm<T extends { id: number | string }>() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<T | null>(null);

  const handleEdit = (item: T) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const closeEdit = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };

  return {
    isModalOpen,
    editItem,
    handleEdit,
    closeEdit,
  };
}

export default useModalForm;
