import s from "./index.module.css";
import ButtonLink from "../../../../UI/ButtonLink/ButtonLink";
import { IProduct } from "@/api/type";
interface Props {
  product: IProduct;
}

const API_URL = import.meta.env.VITE_API_URL_IMAGE;

const ProductCard = ({ product }: Props) => {
  return (
    <article className={s.card}>
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
      <div className={s.content}>
        <h3 className={s.price}>{product.price} ₽</h3>
        <p className={s.desc}>
          {product.name} - {product.description ?? "Описание отсутствует"}
          <br />В наличии {product.stock}
        </p>
      </div>
      <ButtonLink title="О товаре" variant="aboutProduct" />
    </article>
  );
};

export default ProductCard;
