import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ScrollToTop from "@/app/hooks/ScrollToTop";

const Layout = () => {
  return (
    <div>
      <Header />
      <div>
        <ScrollToTop />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
