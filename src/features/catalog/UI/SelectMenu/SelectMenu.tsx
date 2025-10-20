import s from "./index.module.css";
import LinkCategory from "../Link/LinkCategory";
import { useMenu } from "../../hooks/useMenu";

const SelectMenu = () => {
  const { loading, error, category } = useMenu();

  return (
    <div className={s.grid}>
      {loading &&
        Array(5)
          .fill(0)
          .map((_, i) => <div key={i} className={s.skeleton}></div>)}
      {!loading && !error && category.map((cat) => <LinkCategory cat={cat} />)}
    </div>
  );
};

export default SelectMenu;
