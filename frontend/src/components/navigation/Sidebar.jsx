import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, CalendarCheck, Database,
  BarChart3, Users, LogOut, Zap, Settings
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

const navItems = [
  { label: 'Dashboard',  to: '/dashboard',            icon: LayoutDashboard },
  { label: 'Bookings',   to: '/dashboard/bookings',   icon: CalendarCheck },
  { label: 'Resources',  to: '/dashboard/resources',  icon: Database },
  { label: 'Analytics',  to: '/dashboard/analytics',  icon: BarChart3 },
  { label: 'Users',      to: '/dashboard/users',      icon: Users },
]

export default function Sidebar() {
  const { user, logoutUser, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutUser()
    navigate('/login')
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-surface-900 border-r border-white/[0.05] p-5 sticky top-0 animate-slide-left">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-emerald-500 flex items-center justify-center shadow-glow-sm animate-pulse-glow">
            <Zap size={18} className="text-white" />
          </div>
        </div>
        <div>
          <h1 className="font-display font-bold text-white text-sm leading-none">Smart Booking</h1>
          <p className="text-[10px] text-slate-500 mt-0.5 font-mono uppercase tracking-wider">Resource Manager</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest px-3 mb-2">Navigation</p>
        {navItems.map((item) => {
          const Icon = item.icon
          if (item.label === 'Users' && !isAdmin) return null
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`
              }
            >
              <Icon size={17} className="shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* User card */}
      <div className="mt-4 pt-4 border-t border-white/[0.05]">
        <div className="glass rounded-xl p-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-500 truncate font-mono">{user?.role || 'user'}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="sidebar-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/5"
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  )
}
