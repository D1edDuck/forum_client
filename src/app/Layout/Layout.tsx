import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ScrollToTop from "@/app/hooks/ScrollToTop";
import { useAppSelector } from "../hooks/useAppSelector";
import { useMemo } from "react";

const Layout = () => {
  const { initialized } = useAppSelector((state) => state.user);

  const memoizedHeader = useMemo(() => <Header />, []);
  const memoizedFooter = useMemo(() => <Footer />, []);

  const mainContent = useMemo(() => {
    return initialized ? <Outlet /> : null;
  }, [initialized]);

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {memoizedHeader}
      <main style={{ flex: 1, minHeight: "80vh" }}>
        <ScrollToTop />
        {mainContent}
      </main>
      {memoizedFooter}
    </div>
  );
};

export default Layout;
