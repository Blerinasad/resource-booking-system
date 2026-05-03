import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";
import NotFoundPage from "../pages/errors/NotFoundPage.jsx";
import UnauthorizedPage from "../pages/errors/UnauthorizedPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
  { path: "/unauthorized", element: <UnauthorizedPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
