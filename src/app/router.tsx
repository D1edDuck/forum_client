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
import ProfilePage from "@/pages/ProfilePage";
import FormAuthorization from "@/features/profile/UI/FormAuthorization/FormAuthorization";
import FormRegistration from "@/features/profile/UI/FormRegistration/FormRegistration";
import LoginLayout from "@/components/Layout/LoginLayout/LoginLayout";

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
      { path: "/profile", element: <ProfilePage /> },
      { path: "*", element: <NotFoundPage /> },
      {
        path: "/",
        element: <LoginLayout />,
        children: [
          { path: "registration", element: <FormRegistration /> },
          { path: "login", element: <FormAuthorization /> },
        ],
      },
    ],
  },
]);

export default router;
