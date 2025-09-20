import { useMemo } from "react";
import NavigateTabs from "@/components/Service/NavigateTabs/NavigateTabs";
import NavigateLine from "@/components/UI/NavigateLine/NavigateLine";
import ServiceBlock from "@/components/Service/ServiceBlock/ServiceBlock";
import { useParams } from "react-router-dom";
import { services } from "@/api/mockProducts";
import type { ServiceI } from "@/api/mockProducts";
import FeedBack from "@/components/Service/FeedBackForm/FeedBack";

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
      <div className={`container serviceFlex pb`}>
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
