import CatalogService from "@/features/Home/CatalogService/CatalogProduct";
import InfoHome from "@/features/Home/InfoHome/InfoHome";
import ListServiceHome from "@/features/Home/ListServiceHome/ListServiceHome";

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
