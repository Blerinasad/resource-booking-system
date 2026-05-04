import { Bell, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Navbar({ title, subtitle }) {
  const { user } = useAuth()

  return (
    <header className="h-16 border-b border-white/[0.05] flex items-center justify-between px-6 bg-surface-950/80 backdrop-blur-md sticky top-0 z-30">
      <div>
        {title && <h2 className="font-display font-bold text-white text-lg leading-none">{title}</h2>}
        {subtitle && <p className="text-xs text-slate-500 mt-0.5 font-mono">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <button className="btn-ghost p-2 rounded-lg text-slate-400 hover:text-white">
          <Search size={18} />
        </button>
        <button className="btn-ghost p-2 rounded-lg text-slate-400 hover:text-white relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-400 rounded-full" />
        </button>
        <div className="ml-1 w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xs cursor-pointer">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
      </div>
    </header>
  )
}
