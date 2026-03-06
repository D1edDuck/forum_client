import { useEffect, useRef } from "react";
import ButtonConnect from "../../../UI/ButtonConnect/ButtonConnect";
import ServiceCard from "../../Service/ServiceCard/ServiceCard";
import s from "./index.module.css";
import { Link } from "react-router-dom";

export interface ServiceInfo {
  name: string;
  path: string;
  description: string;
  image: string;
  icon: string;
  stats: string;
}

const service: ServiceInfo = {
  name: "Сервис",
  path: "service/repair",
  description: "Профессиональный ремонт любой сложности",
  image: "/img/card-1.png",
  icon: "🔧",
  stats: "1500+ ремонтов",
};

const booking: ServiceInfo = {
  name: "Запись",
  path: "booking",
  description: "Удобная онлайн-запись на ремонт",
  image: "/img/card-2.png",
  icon: "📅",
  stats: "24/7 бронирование",
};

const catalog: ServiceInfo = {
  name: "Каталог",
  path: "catalog",
  description: "Комплектующие и периферия",
  image: "/img/card-3.png",
  icon: "📦",
  stats: "5000+ товаров",
};

const about: ServiceInfo = {
  name: "О нас",
  path: "about",
  description: "15 лет опыта и 5000+ клиентов",
  image: "/img/card-4.png",
  icon: "⭐",
  stats: "98% довольных",
};

const ListServiceHome = () => {
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
    <section ref={sectionRef} className={s.section}>
      <div className={s.decorDot} />
      <div className={s.decorDot} />

      <div className="container">
        <h2 className={s.title}>Наши услуги</h2>

        <div className={`grid ${s.gridCart}`}>
          <ServiceCard info={service} />
          <ServiceCard info={booking} />
          <ServiceCard info={catalog} />
          <ServiceCard info={about} />
        </div>

        <div className={s.stats}>
          <div className={s.statItem}>
            <div className={s.statValue}>15+</div>
            <div className={s.statLabel}>лет опыта</div>
          </div>
          <div className={s.statItem}>
            <div className={s.statValue}>5000+</div>
            <div className={s.statLabel}>клиентов</div>
          </div>
          <div className={s.statItem}>
            <div className={s.statValue}>98%</div>
            <div className={s.statLabel}>довольных</div>
          </div>
        </div>

        <div className={s.divider} />

        <div className={`grid aic ${s.grid}`}>
          <div className={s.glass}>
            <p className={s.text}>
              Вы можете быть уверены в восстановлении работоспособности вашей
              техники.
            </p>
          </div>
          <div className={s.feedback}>
            <p className={s.text}>
              Есть вопросы?
              <br />
              <span
                style={{
                  color: "var(--accent-blue)",
                  fontSize: "2.4rem",
                  fontWeight: 700,
                }}
              >
                <Link to="/booking">Спросите нас!</Link>
              </span>
            </p>
            <p className={s.btn}>
              <Link to="/booking">
                <ButtonConnect title="Связаться с нами" primary="soft" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListServiceHome;
