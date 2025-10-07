import s from "./index.module.css";
import ButtonLink from "../../UI/ButtonLink/ButtonLink";

interface IInfo {
  path: string;
  name: string;
  description: string;
  image?: string;
}

interface IProps {
  info: IInfo;
}

const ServiceCard = ({ info }: IProps) => {
  const { path, name, description, image } = info;
  return (
    <article className={s.card} tabIndex={0} aria-labelledby={`title-${path}`}>
      <div className={s.media}>
        <img
          className={s.image}
          src={
            image ??
            "https://avatars.mds.yandex.net/i?id=125a409c6a33eb90e3edb2543a912fd2838481b8-16307997-images-thumbs&n=13"
          }
          alt={name}
          loading="lazy"
        />
      </div>

      <div className={s.content}>
        <h3 id={`title-${path}`} className={s.title}>
          {name}
        </h3>
        <p className={s.desc}>{description}</p>

        <ButtonLink path={path} title={name} variant="blue_small" />
      </div>
    </article>
  );
};

export default ServiceCard;
