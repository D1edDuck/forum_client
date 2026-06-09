import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import Hamburger from "@/UI/Humburger/Hamburger";
import s from "./index.module.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen && mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector<HTMLElement>("a");
      firstLink?.focus();
    }
  }, [menuOpen]);

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

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ""}`}>
      <div className={`${s.flex} container`}>
        <Link to={"/"} className={s.accent}>
          Форум.ру
        </Link>

        <nav className={s.nav} aria-label="Основная навигация">
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
        </nav>

        <div className={s.actions}>
          <Link to={linkTo} className={s.profile}>
            <span>{linkText}</span>
          </Link>

          <Hamburger isOpen={menuOpen} onToggle={toggleMenu} />
        </div>
      </div>

      {menuOpen && (
        <>
          <div className={s.overlay} onClick={() => setMenuOpen(false)} />
          <div className={s.mobileMenu} ref={mobileMenuRef}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? `${s.mobileActive} font-semibold` : "font-semibold"
                }
              >
                {link.text}
              </NavLink>
            ))}
            <Link to={linkTo} className={s.mobileProfile}>
              {linkText}
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
