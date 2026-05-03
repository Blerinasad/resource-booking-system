import { Link } from "react-router-dom";
import { BarChart3, CalendarCheck, Database, LayoutDashboard, Sparkles, Users } from "lucide-react";

const items = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, active: true },
  { label: "Resources", to: "/dashboard", icon: Database },
  { label: "Bookings", to: "/dashboard", icon: CalendarCheck },
  { label: "Analytics", to: "/dashboard", icon: BarChart3 },
  { label: "Users", to: "/dashboard", icon: Users },
];

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-white/10 bg-slate-950/70 p-5 backdrop-blur-2xl lg:block">
      <div className="mb-10 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 shadow-glow">
          <Sparkles className="text-white" size={22} />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight">Smart Booking</h1>
          <p className="text-xs text-slate-400">Resource analytics</p>
        </div>
      </div>
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                item.active
                  ? "border border-cyan-300/20 bg-cyan-400/10 text-cyan-200 shadow-glow"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={19} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
        <p className="text-sm font-bold text-white">Backend status</p>
        <p className="mt-2 text-xs text-slate-400">Connected through API Gateway on port 5000.</p>
        <div className="mt-4 h-2 rounded-full bg-slate-800">
          <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
        </div>
      </div>
    </aside>
  );
}
