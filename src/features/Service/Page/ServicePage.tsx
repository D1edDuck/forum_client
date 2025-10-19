import { useMemo } from "react";
import NavigateTabs from "@/features/Service/NavigateTabs/NavigateTabs";
import NavigateLine from "@/UI/NavigateLine/NavigateLine";
import ServiceBlock from "@/features/Service/ServiceBlock/ServiceBlock";
import { useParams } from "react-router-dom";
import { services } from "@/api/mockProducts";
import type { ServiceI } from "@/api/mockProducts";
import FeedBack from "@/features/Service/FeedBackForm/FeedBack";
import s from "./index.module.css";

const ServicePage = () => {
  const { name } = useParams<{ name?: string }>();

  const selected: ServiceI | undefined = useMemo(
    () => services.find((item) => item.name === name),
    [name]
  );

  if (!selected) {
    return (
      <section>
        <div className="container">
          <NavigateLine />
          <NavigateTabs />
          <p>Список наших услуг</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className={`container ${s.serviceFlex} pb`}>
        <NavigateLine />
        <NavigateTabs />
        <div className="flex jcb gap20">
          {selected.info.map((item) => (
            <ServiceBlock key={item.title} data={item} />
          ))}
        </div>
        <FeedBack />
      </div>
    </section>
  );
};

export default ServicePage;
