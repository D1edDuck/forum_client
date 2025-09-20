import { IProduct } from "@/api/fetchCategory";
import s from "./index.module.css";
import ButtonLink from "../../../../components/UI/ButtonLink/ButtonLink";
interface Props {
  product: IProduct;
}

const ProductCard = ({ product }: Props) => {
  return (
    <article className={s.card}>
      <div className={s.img} />
      <div className={s.content}>
        <h3 className={s.price}>{product.price ?? "Цена не указана"}₽</h3>
        <p className={s.desc}>
          {product.name} - {product.description ?? "Описание отсутствует"}{" "}
          <br />В наличии {product.stock ?? 0}
        </p>
      </div>
      <ButtonLink title="О товаре" variant="aboutProduct" />
    </article>
  );
};

export default ProductCard;
