import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "../../UI/Humburger/Hamburger";
import s from "./index.module.css";

const Header = () => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setMenu(newWidth > 768);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={s.header}>
      <div className={`${s.flex} container`}>
        <span>
          <Link to={"/"} className={s.accent}>
            Форум.ру
          </Link>
        </span>
        {menu ? (
          <>
            <Link to={"/service/repair"} className="font-semibold">
              Услуги
            </Link>
            <Link to={"/FAQ"} className="font-semibold">
              FAQ
            </Link>
            <Link to={"/catalog"} className="font-semibold">
              Каталог
            </Link>
            <Link to={"/about"} className="font-semibold">
              О нас
            </Link>
          </>
        ) : (
          <Hamburger />
        )}
        <svg className={`${s.icon}`}>
          <use xlinkHref="src/assets/icons/symbol-defs.svg#icon-logo"></use>
        </svg>
      </div>
    </header>
  );
};

export default Header;
