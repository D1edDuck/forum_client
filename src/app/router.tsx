import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import ProductPage from "@/pages/ProductPage";
import ServicePage from "@/pages/ServicePage";
import BookingPage from "@/pages/BookingPage";
import FaqPage from "@/pages/FaqPage";
import AboutPage from "@/pages/AboutPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductCatalogPage from "@/pages/ProductCatalogPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/catalog/:id/:slug", element: <ProductCatalogPage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "/service/:name", element: <ServicePage /> },
      { path: "/service", element: <ServicePage /> },
      { path: "/booking", element: <BookingPage /> },
      { path: "/FAQ", element: <FaqPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
