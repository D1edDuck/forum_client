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
  stats: string;
  icon?: React.ReactNode;
}

const service: ServiceInfo = {
  name: "Сервис",
  path: "service/repair",
  description: "Профессиональный ремонт ",
  image: "/img/card-1.png",
  stats: "1500+ ремонтов",
};

const booking: ServiceInfo = {
  name: "Запись",
  path: "booking",
  description: "Удобная онлайн-запись",
  image: "/img/card-2.png",
  stats: "24/7 бронирование",
};

const catalog: ServiceInfo = {
  name: "Каталог",
  path: "catalog",
  description: "Комплектующие и периферия",
  image: "/img/card-3.png",
  stats: "5000+ товаров",
};

const about: ServiceInfo = {
  name: "О нас",
  path: "about",
  description: "15 лет опыта и 5000+ клиентов",
  image: "/img/card-4.png",
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
        <div className={s.feed}>
          <div className={`grid aic ${s.grid}`}>
            <div className={s.glass}>
              <p className={s.text}>
                Вы можете быть уверены в восстановлении работоспособности вашей
                техники.
              </p>
            </div>
            <div className={s.feedback}>
              <div className={s.text}>
                <span>Есть вопросы?</span>
                <span>
                  <Link to="/booking">Спросите нас!</Link>
                </span>
              </div>
              <p className={s.btn}>
                <Link to="/booking">
                  <ButtonConnect title="Написать" primary="soft" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListServiceHome;
