import { Link } from "react-router-dom";
import s from "./index.module.css";
import { ICatalog } from "@/api/type";
import Arrow from "@/UI/Arrow/Arrow";

interface IProps {
  cat: ICatalog;
}

const LinkCategory = ({ cat }: IProps) => {
  return (
    <Link to={`${cat.id}/${cat.slug}`}>
      <div className={s.category} key={cat.id}>
        <div>{cat.name}</div>
        <div className={s.arr}>
          <Arrow color="w" size="l" open={false} />
        </div>
      </div>
    </Link>
  );
};

export default LinkCategory;
