import AddForm from "../../UI/AddForm/AddForm";
import { useParams } from "react-router-dom";
import { ICatalog, IProduct, IRepair } from "@/api/type";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { createProduct } from "@/features/products/productsThunks";
import { createRepair } from "@/features/profile/repairs/repairThunk";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useEffect } from "react";
import { createCategory, fetchCatalog } from "@/features/catalog/catalogThunk";

export type FormType = "product" | "repair" | "category";

export type FormDataMap = {
  product: IProduct;
  repair: IRepair;
  category: ICatalog;
};

const AddPage = () => {
  const { type } = useParams<{ type: FormType }>();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user?.id);
  const categories = useAppSelector((state) => state.catalog.category);
  const catalogState = useAppSelector((state) => state.catalog);
  const productState = useAppSelector((state) => state.products);
  const repairState = useAppSelector((state) => state.repairs);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCatalog());
    }
  }, [dispatch, categories.length]);

  if (!type) return <div>Тип не указан</div>;

  const { loading, error } = (() => {
    switch (type) {
      case "product":
        return { loading: productState.loading, error: productState.error };
      case "repair":
        return { loading: repairState.loading, error: repairState.error };
      case "category":
        return { loading: catalogState.loading, error: catalogState.error };
    }
  })();

  const handleSubmit = <T extends FormType>(data: FormDataMap[T]) => {
    switch (type) {
      case "product":
        dispatch(createProduct(data as IProduct));
        break;
      case "repair":
        dispatch(
          createRepair({
            ...data,
            userId,
          } as Omit<IRepair, "id" | "created_at" | "user">),
        );
        break;
      case "category":
        dispatch(createCategory(data as Omit<ICatalog, "id">));
        break;
    }
  };

  return (
    <AddForm
      type={type}
      onSubmit={handleSubmit}
      categories={categories}
      loading={loading}
      error={error}
    />
  );
};
export default AddPage;
