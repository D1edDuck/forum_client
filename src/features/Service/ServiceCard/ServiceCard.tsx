import { Link } from "react-router-dom";
import s from "./index.module.css";
import { ServiceInfo } from "@/features/Home/ListServiceHome/ListServiceHome";

const ServiceCard = ({ info }: { info: ServiceInfo }) => {
  return (
    <Link to={`/${info.path}`} className={s.card}>
      <div className={s.box}>
        <div className={s.imageWrapper}>
          <img src={info.image} alt={info.name} className={s.image} />
          <div className={s.overlay}>
            <span className={s.icon}>{info.icon}</span>
          </div>
        </div>

        <div className={s.content}>
          <h3 className={s.title}>{info.name}</h3>
          <p className={s.description}>{info.description}</p>
          {info.stats && (
            <div className={s.stats}>
              <span>{info.stats}</span>
            </div>
          )}
        </div>
      </div>

      <div className={s.arrow}>
        <svg viewBox="0 0 24 24">
          <path
            d="M5 12h14M12 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </Link>
  );
};

export default ServiceCard;
