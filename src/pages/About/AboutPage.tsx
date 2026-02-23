import s from "./index.module.css";
import NavigateLine from "@/UI/NavigateLine/NavigateLine";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className={s.page}>
      <div className={s.container}>
        <NavigateLine />

        <div className={s.hero}>
          <h1 className={s.title}>Форум.ру</h1>
          <p className={s.subtitle}>
            Ваш надежный партнер в мире компьютерной техники с 2010 года
          </p>
        </div>

        <div className={s.stats}>
          <div className={s.statCard}>
            <div className={s.statNumber}>15+</div>
            <div className={s.statLabel}>лет опыта</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statNumber}>5000+</div>
            <div className={s.statLabel}>довольных клиентов</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statNumber}>98%</div>
            <div className={s.statLabel}>положительных отзывов</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statNumber}>24/7</div>
            <div className={s.statLabel}>поддержка</div>
          </div>
        </div>

        <div className={s.aboutSection}>
          <div className={s.aboutContent}>
            <h2 className={s.sectionTitle}>О нашей компании</h2>
            <p className={s.aboutText}>
              Мы — команда профессионалов, которые любят свое дело. С 2010 года
              мы помогаем людям решать проблемы с компьютерной техникой, делая
              это быстро, качественно и с душой.
            </p>
            <ul className={s.aboutFeatures}>
              <li className={s.featureItem}>
                <span className={s.featureIcon}>✓</span>
                Бесплатная диагностика
              </li>
              <li className={s.featureItem}>
                <span className={s.featureIcon}>✓</span>
                Гарантия до 3 лет
              </li>
              <li className={s.featureItem}>
                <span className={s.featureIcon}>✓</span>
                Оригинальные запчасти
              </li>
              <li className={s.featureItem}>
                <span className={s.featureIcon}>✓</span>
                Выезд мастера на дом
              </li>
            </ul>
          </div>
          <div className={s.aboutImage}>
            <img src="/img/card-1.png" alt="Наша мастерская" />
          </div>
        </div>

        <div className={s.advantages}>
          <h2 className={s.advantagesTitle}>Почему выбирают нас</h2>
          <div className={s.advantagesGrid}>
            <div className={s.advantageCard}>
              <div className={s.advantageIcon}>🔧</div>
              <h3 className={s.advantageTitle}>Профессиональный подход</h3>
              <p className={s.advantageDesc}>
                Все мастера имеют профильное образование и регулярно проходят
                обучение
              </p>
            </div>
            <div className={s.advantageCard}>
              <div className={s.advantageIcon}>⚡</div>
              <h3 className={s.advantageTitle}>Быстрый ремонт</h3>
              <p className={s.advantageDesc}>
                Среднее время ремонта — 1-2 дня, срочный ремонт за несколько
                часов
              </p>
            </div>
            <div className={s.advantageCard}>
              <div className={s.advantageIcon}>💰</div>
              <h3 className={s.advantageTitle}>Прозрачные цены</h3>
              <p className={s.advantageDesc}>
                Фиксированная стоимость, которая не изменится в процессе ремонта
              </p>
            </div>
          </div>
        </div>

        <div className={s.cta}>
          <h2 className={s.ctaTitle}>Готовы начать?</h2>
          <p className={s.ctaText}>
            Оставьте заявку прямо сейчас, и мы свяжемся с вами в ближайшее время
          </p>
          <Link to="/booking" className={s.ctaButton}>
            Оставить заявку
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
