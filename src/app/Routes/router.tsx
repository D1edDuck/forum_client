import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import Layout from "@/app/Layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import SuspenseWrapper from "./SuspenseWrapper";

const HomePage = lazy(() => import("@/features/Home/Page/HomePage"));
const CatalogPage = lazy(() => import("@/features/catalog/Page/CatalogPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const ServicePage = lazy(() => import("@/features/Service/Page/ServicePage"));
const BookingPage = lazy(() => import("@/features/booking/Page/BookingPage"));
const FaqPage = lazy(() => import("@/features/faq/FaqPage"));
const AboutPage = lazy(() => import("@/pages/About/AboutPage"));
const ProductCatalogPage = lazy(
  () => import("@/features/products/Page/ProductCatalogPage"),
);
const ProfilePage = lazy(
  () => import("@/app/Layout/ProfileLayout/ProfilePage"),
);
const FormAuthorization = lazy(
  () => import("@/features/profile/UI/FormAuthorization/FormAuthorization"),
);
const FormRegistration = lazy(
  () => import("@/features/profile/UI/FormRegistration/FormRegistration"),
);
const LoginLayout = lazy(() => import("@/app/Layout/LoginLayout/LoginLayout"));
const Repairs = lazy(
  () => import("@/features/profile/repairs/UI/Repairs/Repairs"),
);
const PersonalAccount = lazy(
  () => import("@/features/profile/UI/PersonalAccount/PersonalAccount"),
);
const DateBase = lazy(
  () => import("@/features/profile/dateBase/Page/DateBase/DateBase"),
);
const DbPage = lazy(
  () => import("@/features/profile/dateBase/Page/DbPage/DbPage"),
);
const AddPage = lazy(
  () => import("@/features/profile/dateBase/Page/AddPage/AddPage"),
);
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/catalog",
        element: (
          <SuspenseWrapper>
            <CatalogPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/catalog/:id/:slug",
        element: (
          <SuspenseWrapper>
            <ProductCatalogPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/product",
        element: (
          <SuspenseWrapper>
            <ProductPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/service/:name",
        element: (
          <SuspenseWrapper>
            <ServicePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/service",
        element: (
          <SuspenseWrapper>
            <ServicePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/booking",
        element: (
          <SuspenseWrapper>
            <BookingPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/FAQ",
        element: (
          <SuspenseWrapper>
            <FaqPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/about",
        element: (
          <SuspenseWrapper>
            <AboutPage />
          </SuspenseWrapper>
        ),
      },
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
            element: (
              <SuspenseWrapper>
                <Repairs />
              </SuspenseWrapper>
            ),
          },
          {
            path: "me",
            element: (
              <SuspenseWrapper>
                <PersonalAccount />
              </SuspenseWrapper>
            ),
          },
          {
            path: "datebase",
            element: (
              <SuspenseWrapper>
                <DateBase />
              </SuspenseWrapper>
            ),
          },
          {
            path: "add/:type",
            element: (
              <SuspenseWrapper>
                <AddPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: "datebase/:type",
            element: (
              <SuspenseWrapper>
                <DbPage />
              </SuspenseWrapper>
            ),
          },
        ],
      },
      {
        path: "*",
        element: (
          <SuspenseWrapper>
            <NotFoundPage />
          </SuspenseWrapper>
        ),
      },

      {
        path: "/",
        element: (
          <SuspenseWrapper>
            <LoginLayout />
          </SuspenseWrapper>
        ),
        children: [
          {
            path: "registration",
            element: (
              <PublicRoute>
                <SuspenseWrapper>
                  <FormRegistration />
                </SuspenseWrapper>
              </PublicRoute>
            ),
          },
          {
            path: "login",
            element: (
              <PublicRoute>
                <SuspenseWrapper>
                  <FormAuthorization />
                </SuspenseWrapper>
              </PublicRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
