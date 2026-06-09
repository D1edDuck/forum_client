import { useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { fetchProductById } from "@/features/products/productsThunks";
import NavigateLine from "@/UI/NavigateLine/NavigateLine";
import ButtonLink from "@/UI/ButtonLink/ButtonLink";
import s from "./ProductPage.module.css";

const API_URL = import.meta.env.VITE_API_URL_IMAGE;

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentProduct, currentLoading, currentError } = useAppSelector(
    (state) => state.product,
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (id) dispatch(fetchProductById(Number(id)));
  }, [id, dispatch]);

  if (currentLoading) {
    return (
      <section className={s.page}>
        <div className={`container ${s.container}`}>
          <NavigateLine />
          <div className={s.loader}>
            <div className={s.spinner} />
            <p>Загрузка товара...</p>
          </div>
        </div>
      </section>
    );
  }

  if (currentError || !currentProduct) {
    return (
      <section className={s.page}>
        <div className={`container ${s.container}`}>
          <NavigateLine />
          <div className={s.notFound}>
            <h2>Товар не найден</h2>
            <p>{currentError || "Такого товара нет в каталоге"}</p>
            <Link to="/catalog" className={s.backLink}>
              Вернуться в каталог
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const p = currentProduct;

  const getStockBadgeClass = () => {
    if (p.stock <= 0) return s.outOfStock;
    if (p.stock < 5) return s.lowStock;
    return s.inStock;
  };

  const getStockText = () => {
    if (p.stock <= 0) return "Нет в наличии";
    if (p.stock < 5) return `Осталось ${p.stock} шт.`;
    return "В наличии";
  };

  return (
    <section className={s.page}>
      <div className={`container ${s.container}`}>
        <NavigateLine />

        <div className={s.detail}>
          <div className={s.imageSection}>
            <div className={s.imageWrapper}>
              <img
                className={s.image}
                src={
                  p.imageUrl
                    ? `${API_URL}${p.imageUrl}`
                    : `${API_URL}/uploads/products/xxx.png`
                }
                alt={p.name}
              />
            </div>
            <span className={`${s.stockBadge} ${getStockBadgeClass()}`}>
              {getStockText()}
            </span>
          </div>

          <div className={s.info}>
            <h1 className={s.name}>{p.name}</h1>

            <div className={s.specs}>
              <div className={s.specRow}>
                <span className={s.specLabel}>Модель</span>
                <span className={s.specValue}>{p.model}</span>
              </div>
              <div className={s.specRow}>
                <span className={s.specLabel}>Бренд</span>
                <span className={s.specValue}>{p.brand}</span>
              </div>
            </div>

            <p className={s.price}>{(p.price ?? 0).toLocaleString()} ₽</p>

            <div className={s.description}>
              <h3>Описание</h3>
              <p>{p.description || "Описание отсутствует"}</p>
            </div>

            <div className={s.actions}>
              <ButtonLink
                title="Назад"
                variant="secondary"
                size="large"
                onClick={goBack}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
