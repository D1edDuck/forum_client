import CatalogService from "@/components/Home/CatalogService/CatalogProduct";
import InfoHome from "@/components/Home/InfoHome/InfoHome";
import ListServiceHome from "@/components/Home/ListServiceHome/ListServiceHome";

const HomePage = () => {
  return (
    <main>
      <InfoHome />
      <ListServiceHome />
      <CatalogService />
    </main>
  );
};

export default HomePage;
