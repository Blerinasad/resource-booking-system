export function Card({ children, className = '', hover = false }) {
  return (
    <div className={`card ${hover ? 'glass-hover cursor-pointer' : ''} ${className}`}>
      {children}
    </div>
  )
}

export function StatCard({ label, value, icon: Icon, trend, color = 'brand', delay = 0 }) {
  const colors = {
    brand:  { icon: 'text-brand-400',  bg: 'bg-brand-500/10',  ring: 'border-brand-500/20' },
    amber:  { icon: 'text-amber-400',  bg: 'bg-amber-500/10',  ring: 'border-amber-500/20' },
    blue:   { icon: 'text-blue-400',   bg: 'bg-blue-500/10',   ring: 'border-blue-500/20'  },
    violet: { icon: 'text-violet-400', bg: 'bg-violet-500/10', ring: 'border-violet-500/20' },
    red:    { icon: 'text-red-400',    bg: 'bg-red-500/10',    ring: 'border-red-500/20'   },
    slate:  { icon: 'text-slate-400',  bg: 'bg-slate-500/10',  ring: 'border-slate-500/20' },
  }
  const c = colors[color]

  return (
    <div
      className={`stat-card animate-fade-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className={`p-2.5 rounded-xl ${c.bg} border ${c.ring}`}>
          {Icon && <Icon size={20} className={c.icon} />}
        </div>
        {trend !== undefined && (
          <span className={`font-mono text-xs ${trend >= 0 ? 'text-brand-400' : 'text-red-400'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold font-display tracking-tight text-white">
          {value ?? '—'}
        </p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
      </div>
    </div>
  )
}
