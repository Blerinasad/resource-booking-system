import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/navigation/Sidebar";
import Navbar from "../components/navigation/Navbar";
import Loader from "../components/common/Loader";

export default function DashboardLayout() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.13),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.14),transparent_24%)]" />
      <div className="relative flex">
        <Sidebar />
        <main className="min-h-screen flex-1">
          <Navbar user={user} />
          <div className="p-5 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
