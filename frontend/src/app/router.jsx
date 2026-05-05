import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";
import BookingsPage from "../pages/bookings/BookingsPage.jsx";
import ResourcesPage from "../pages/resources/ResourcesPage.jsx";
import AnalyticsPage from "../pages/analytics/AnalyticsPage.jsx";
import UsersPage from "../pages/users/UsersPage.jsx";
import NotFoundPage from "../pages/errors/NotFoundPage.jsx";
import UnauthorizedPage from "../pages/errors/UnauthorizedPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "bookings", element: <BookingsPage /> },
      { path: "resources", element: <ResourcesPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "users", element: <UsersPage /> },
    ],
  },
  { path: "/unauthorized", element: <UnauthorizedPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
