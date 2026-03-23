import s from "./index.module.css";
import ButtonLink from "../../../../UI/ButtonLink/ButtonLink";
import { IProduct } from "@/api/type";

interface Props {
  product: IProduct;
}

const API_URL = import.meta.env.VITE_API_URL_IMAGE;

const ProductCard = ({ product }: Props) => {
  const getStockBadgeClass = () => {
    if (product.stock <= 0) return s.outOfStock;
    if (product.stock < 5) return s.lowStock;
    return "";
  };

  const getStockText = () => {
    if (product.stock <= 0) return "Нет в наличии";
    if (product.stock < 5) return `Осталось ${product.stock} шт.`;
    return `В наличии ${product.stock} шт.`;
  };

  return (
    <article className={s.card}>
      <div className={s.imgWrapper}>
        <img
          className={s.img}
          src={
            product.imageUrl
              ? `${API_URL}${product.imageUrl}`
              : `${API_URL}/uploads/products/xxx.png`
          }
          alt={product.name}
          loading="lazy"
        />
        <span className={`${s.stockBadge} ${getStockBadgeClass()}`}>
          {getStockText()}
        </span>
      </div>
      <div className={s.content}>
        <h3 className={s.price}>{product.price.toLocaleString()} ₽</h3>
        <h4 className={s.name}>{product.name}</h4>
        <p className={s.desc}>
          {product.description || "Описание отсутствует"}
        </p>
        <div className={s.buttonWrapper}>
          <ButtonLink title="О товаре" variant="secondary" size="medium" />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
