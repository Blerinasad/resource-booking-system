import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../navigation/Sidebar.jsx'
import Navbar  from '../navigation/Navbar.jsx'

const PAGE_META = {
  '/dashboard':            { title: 'Dashboard',  subtitle: 'Overview of all activity' },
  '/dashboard/bookings':   { title: 'Bookings',   subtitle: 'Manage resource reservations' },
  '/dashboard/resources':  { title: 'Resources',  subtitle: 'Manage available resources' },
  '/dashboard/analytics':  { title: 'Analytics',  subtitle: 'Usage insights and statistics' },
  '/dashboard/users':      { title: 'Users',      subtitle: 'Manage platform users' },
}

export default function DashboardLayout() {
  const { pathname } = useLocation()
  const meta = PAGE_META[pathname] || {}

  return (
    <div className="flex min-h-screen">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/[0.06] rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-emerald-500/[0.04] rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-brand-600/[0.05] rounded-full blur-3xl" />
      </div>

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
