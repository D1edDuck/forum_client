import { Link } from "react-router-dom";
import s from "./index.module.css";
import { ICatalog } from "@/api/type";

interface IProps {
  cat: ICatalog;
}

const LinkCategory = ({ cat }: IProps) => {
  return (
    <div className={s.category} key={cat.id}>
      <p>{cat.name}</p>
      <Link to={`${cat.id}/${cat.slug}`}>{">"}</Link>
    </div>
  );
};

export default LinkCategory;
