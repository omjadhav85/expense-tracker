import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { AuthRedirect } from "./AuthRedirect";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { MainLayout } from "@/layouts/MainLayout";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() =>
  import("../pages/Dashboard").then((module) => ({ default: module.Dashboard }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <AuthRedirect />,
        children: [
          {
            path: "/",
            element: <LoginPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/signup",
            element: <SignupPage />,
          },
        ],
      },

      {
        path: "/",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/dashboard",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
