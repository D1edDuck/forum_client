import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@/app/Layout/Layout";
import HomePage from "@/features/Home/Page/HomePage";
import CatalogPage from "@/features/catalog/Page/CatalogPage";
import ProductPage from "@/pages/ProductPage";
import ServicePage from "@/features/Service/Page/ServicePage";
import BookingPage from "@/features/booking/Page/BookingPage";
import FaqPage from "@/features/faq/FaqPage";
import AboutPage from "@/pages/AboutPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductCatalogPage from "@/features/products/Page/ProductCatalogPage";
import ProfilePage from "@/app/Layout/ProfileLayout/ProfilePage";
import FormAuthorization from "@/features/profile/UI/FormAuthorization/FormAuthorization";
import FormRegistration from "@/features/profile/UI/FormRegistration/FormRegistration";
import LoginLayout from "@/app/Layout/LoginLayout/LoginLayout";
import ProtectedRoute from "./ProtectedRoute";
import Repairs from "@/features/profile/repairs/UI/Repairs/Repairs";
import PersonalAccount from "@/features/profile/UI/PersonalAccount/PersonalAccount";
import PublicRoute from "./PublicRoute";
import DateBase from "@/features/profile/dateBase/Page/DateBase/DateBase";
import Clients from "@/features/profile/dateBase/Page/Clients/Clients";

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
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="me" replace />,
          },
          {
            path: "repairs",
            element: <Repairs />,
          },
          {
            path: "me",
            element: <PersonalAccount />,
          },
          {
            path: "datebase",
            element: <DateBase />,
          },
          { path: "datebase/clients", element: <Clients /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
      {
        path: "/",
        element: <LoginLayout />,
        children: [
          {
            path: "registration",
            element: (
              <PublicRoute>
                <FormRegistration />
              </PublicRoute>
            ),
          },
          {
            path: "login",
            element: (
              <PublicRoute>
                <FormAuthorization />
              </PublicRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
