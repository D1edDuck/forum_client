import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { fetchProducts } from "../productsThunks";
import { hideLoading, showLoading } from "@/UI/Loader/loaderSlice";

export const useProductCatalog = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showLoading("Загрузка продуктов..."));
        if (id) {
          await dispatch(fetchProducts(id)).unwrap();
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(hideLoading());
      }
    };

    fetchData();
  }, [dispatch, id]);

  const { products } = useAppSelector((state) => state.product);

  return { products };
};
