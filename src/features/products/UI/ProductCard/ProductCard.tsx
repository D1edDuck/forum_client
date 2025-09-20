import s from "./index.module.css";
import ButtonLink from "../../../../components/UI/ButtonLink/ButtonLink";
import { IProduct } from "@/api/type";
interface Props {
  product: IProduct;
}

const ProductCard = ({ product }: Props) => {
  return (
    <article className={s.card}>
      <div className={s.img} />
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
