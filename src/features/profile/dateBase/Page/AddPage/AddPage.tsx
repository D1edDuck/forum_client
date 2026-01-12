import AddForm from "../../UI/AddForm/AddForm";
import { useParams } from "react-router-dom";
import { ICatalog, IProduct, IRepair } from "@/api/type";
import { registerUser } from "@/features/profile/userThunk";
import { IFormValue } from "@/features/profile/userSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { createProduct } from "@/features/products/productsThunks";
import { createRepair } from "@/features/profile/repairs/repairThunk";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useEffect } from "react";
import { createCategory, fetchCatalog } from "@/features/catalog/catalogThunk";

export type FormType = "product" | "repair" | "user" | "category";

export type FormDataMap = {
  product: IProduct;
  repair: IRepair;
  user: IFormValue;
  category: ICatalog;
};

const AddPage = () => {
  const { type } = useParams<{ type: FormType }>();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user?.id);
  const categories = useAppSelector((state) => state.catalog.category);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCatalog());
    }
  }, [dispatch, categories.length]);

  if (!type) return <div>Тип не указан</div>;

  const handleSubmit = <T extends FormType>(data: FormDataMap[T]) => {
    switch (type) {
      case "product":
        dispatch(createProduct(data as IProduct));
        break;
      case "repair":
        console.log(data);
        dispatch(
          createRepair({
            ...data,
            userId,
          } as Omit<IRepair, "id" | "created_at" | "user">)
        );
        break;
      case "user":
        dispatch(registerUser(data as IFormValue));
        break;
      case "category":
        dispatch(createCategory(data as Omit<ICatalog, "id">));
        break;
    }
  };

  return (
    <AddForm type={type} onSubmit={handleSubmit} categories={categories} />
  );
};
export default AddPage;
