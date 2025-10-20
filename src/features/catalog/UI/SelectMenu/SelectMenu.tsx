import s from "./index.module.css";
import LinkCategory from "../Link/LinkCategory";
import { useMenu } from "../../hooks/useMenu";

const SelectMenu = () => {
  const { loading, error, category } = useMenu();

  return (
    <div className={s.grid}>
      {!loading && !error && category.map((cat) => <LinkCategory cat={cat} />)}
    </div>
  );
};

export default SelectMenu;
