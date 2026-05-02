import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/navigation/Sidebar";
import Navbar from "../components/navigation/Navbar";

export default function DashboardLayout() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-h-screen">
          <Navbar user={user} />

          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}