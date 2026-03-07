import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ScrollToTop from "@/app/hooks/ScrollToTop";
import { useAppSelector } from "../hooks/useAppSelector";

const Layout = () => {
  const { initialized } = useAppSelector((state) => state.user);
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <main style={{ flex: 1, minHeight: "80vh" }}>
        <ScrollToTop />
        {initialized ? <Outlet /> : null}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
