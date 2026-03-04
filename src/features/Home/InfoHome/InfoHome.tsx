import SvgLink from "@/UI/SvgLink/SvgLink";
import ButtonConnect from "../../../UI/ButtonConnect/ButtonConnect";
import s from "./index.module.css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const InfoHome = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.visible);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={s.hero}>
      <div className={`container ${s.container}`}>
        <div className={s.content}>
          <div className={s.badge}> Сервисный центр</div>

          <h1 className={s.title}>
            <span className={s.titleGradient}>Форум.ру</span>
            <span className={s.titleSub}>ремонтируем технику с душой</span>
          </h1>

          <p className={s.description}>
            Профессиональный ремонт и продажа компьютерной техники
            <br />
            <span className={s.highlight}>Бесплатная диагностика</span> и
            гарантия до 3 лет
          </p>

          <div className={s.stats}>
            <div className={s.statItem}>
              <span className={s.statNumber}>15+</span>
              <span className={s.statLabel}>лет опыта</span>
            </div>
            <div className={s.statDivider} />
            <div className={s.statItem}>
              <span className={s.statNumber}>5000+</span>
              <span className={s.statLabel}>клиентов</span>
            </div>
            <div className={s.statDivider} />
            <div className={s.statItem}>
              <span className={s.statNumber}>98%</span>
              <span className={s.statLabel}>довольных</span>
            </div>
          </div>

          <div className={s.actions}>
            <Link to="/booking">
              <ButtonConnect title="Связаться с нами" primary="hard" />
            </Link>
            <Link to={"/about"}>
              <ButtonConnect title="О нас" primary="soft" />
            </Link>
          </div>

          <div className={s.socialLinks}>
            <span className={s.socialText}>Мы в соцсетях</span>
            <div className={s.socialIcons}>
              <a
                href="https://t.me/avofe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SvgLink name={"telegram"} size="large" />
              </a>
              <a
                href="https://github.com/D1edDuck/forum_client"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SvgLink name={"github"} size="large" />
              </a>
            </div>
          </div>
        </div>

        <div className={s.visual}>
          <div className={s.imageContainer}>
            <div className={s.imageGlow} />
            <img
              src="/img/computer.png"
              alt="computer"
              className={s.computerImg}
            />
            <img src="/img/laptop.png" alt="laptop" className={s.laptopImg} />

            <div className={`${s.floatingIcon} ${s.printer}`}>
              <svg>
                <use xlinkHref="/icons/symbol-defs.svg#icon-Printer"></use>
              </svg>
            </div>
            <div className={`${s.floatingIcon} ${s.cpu}`}>
              <svg>
                <use xlinkHref="/icons/symbol-defs.svg#icon-CPU"></use>
              </svg>
            </div>
            <div className={`${s.floatingIcon} ${s.laptopIcon}`}>
              <svg>
                <use xlinkHref="/icons/symbol-defs.svg#icon-Laptop"></use>
              </svg>
            </div>
            <div className={`${s.floatingIcon} ${s.save}`}>
              <svg>
                <use xlinkHref="/icons/symbol-defs.svg#icon-Save"></use>
              </svg>
            </div>
            <div className={`${s.floatingIcon} ${s.display}`}>
              <svg>
                <use xlinkHref="/icons/symbol-defs.svg#icon-Display"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={s.gradientOrb} />
      <div className={s.gradientOrb2} />
    </section>
  );
};

export default InfoHome;
