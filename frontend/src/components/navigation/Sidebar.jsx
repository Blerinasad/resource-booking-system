import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-72 min-h-screen border-r border-white/10 bg-slate-900/70 backdrop-blur-xl p-5">
      <div className="w-full">
        <div className="mb-10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Smart Booking
          </h1>
          <p className="text-sm text-slate-400 mt-1">Resource Analytics</p>
        </div>

        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
        </nav>
      </div>
    </aside>
  );
}