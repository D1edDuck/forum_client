import { useEffect, useState } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import s from "./index.module.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  let linkText = "Личный кабинет";
  let linkTo = "/profile/me";

  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (
    pathname === "/registration" ||
    pathname === "/profile/me" ||
    pathname === "/profile/repairs" ||
    pathname === "/login"
  ) {
    linkText = "Главная";
    linkTo = "/";
  }

  const navLinks = [
    { to: "/service/repair", text: "Услуги" },
    { to: "/catalog", text: "Каталог" },
    { to: "/FAQ", text: "FAQ" },
    { to: "/about", text: "О нас" },
  ];

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ""}`}>
      <div className={`${s.flex} container`}>
        <span>
          <Link to={"/"} className={s.accent}>
            Форум.ру
          </Link>
        </span>

        <>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? `${s.active} font-semibold` : "font-semibold"
              }
            >
              {link.text}
            </NavLink>
          ))}
        </>

        <Link to={linkTo} className={s.profile}>
          <span>{linkText}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
