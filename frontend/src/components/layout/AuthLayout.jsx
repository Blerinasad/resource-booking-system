import { Zap } from 'lucide-react'

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-surface-900 border-r border-white/[0.05] p-12 relative overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-50" />
        {/* Glows */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-emerald-500/8 rounded-full blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-emerald-500 flex items-center justify-center shadow-glow animate-pulse-glow">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-white">Smart Booking</h1>
            <p className="text-xs text-slate-500 font-mono">Resource Management System</p>
          </div>
        </div>

        <div className="relative">
          {/* Big decorative number */}
          <div className="font-display font-bold text-[10rem] leading-none text-gradient opacity-10 select-none">
            SB
          </div>
          <div className="mt-6">
            <h2 className="font-display text-3xl font-bold text-white leading-tight">
              Manage resources<br />
              <span className="text-gradient">intelligently.</span>
            </h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-xs">
              Book meeting rooms, equipment and spaces — with real-time availability,
              analytics and role-based access control.
            </p>
          </div>
        </div>

        {/* Feature pills */}
        <div className="relative flex flex-wrap gap-2">
          {['Microservices', 'Kafka Events', 'JWT Auth', 'Analytics', 'Docker'].map((f) => (
            <span key={f} className="badge bg-white/[0.04] border border-white/10 text-slate-400 font-mono">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-[400px] animate-fade-in">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-emerald-500 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-white">Smart Booking</span>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-white">{title}</h2>
            {subtitle && <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
