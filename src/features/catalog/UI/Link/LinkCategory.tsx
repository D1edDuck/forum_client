import { Link } from "react-router-dom";
import s from "./index.module.css";
import { ICatalog } from "@/api/type";
import Arrow from "@/UI/Arrow/Arrow";

interface IProps {
  cat: ICatalog;
}

const LinkCategory = ({ cat }: IProps) => {
  return (
    <div className={s.category} key={cat.id}>
      <p>{cat.name}</p>
      <div className={s.arr}>
        <Link to={`${cat.id}/${cat.slug}`}>
          {<Arrow color="w" size="l" side="r" />}
        </Link>
      </div>
    </div>
  );
};

export default LinkCategory;
