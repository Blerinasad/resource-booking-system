import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/navigation/Sidebar";
import Navbar from "../components/navigation/Navbar";
import Loader from "../components/common/Loader";

const PAGE_META = {
  '/dashboard':            { title: 'Dashboard',  subtitle: 'Overview of your resource system' },
  '/dashboard/bookings':   { title: 'Bookings',   subtitle: 'Manage all reservations' },
  '/dashboard/resources':  { title: 'Resources',  subtitle: 'Available spaces & equipment' },
  '/dashboard/analytics':  { title: 'Analytics',  subtitle: 'Usage insights & statistics' },
  '/dashboard/users':      { title: 'Users',      subtitle: 'Manage platform members' },
}

export default function DashboardLayout() {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const meta = PAGE_META[location.pathname] || { title: 'Dashboard', subtitle: '' };

  return (
    <div className="h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.09),transparent_24%)]" />
      <div className="relative flex h-full">
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto">
          <Navbar title={meta.title} subtitle={meta.subtitle} user={user} />
          <div className="p-5 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
