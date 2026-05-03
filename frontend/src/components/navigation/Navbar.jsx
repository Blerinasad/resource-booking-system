import { Bell, LogOut, Search } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Button from "../common/Button";

export default function Navbar({ user }) {
  const { logoutUser } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/55 px-5 backdrop-blur-2xl md:px-8">
      <div className="hidden w-full max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-400 md:flex">
        <Search size={18} />
        <span className="text-sm">Search resources, bookings, users...</span>
      </div>
      <div className="flex items-center gap-4 md:ml-auto">
        <button className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-white/10">
          <Bell size={18} />
        </button>
        <div className="hidden text-right sm:block">
          <p className="font-bold text-white">{user?.name || "User"}</p>
          <p className="text-xs uppercase tracking-widest text-cyan-300">{user?.role || "member"}</p>
        </div>
        <Button variant="danger" onClick={logoutUser} className="flex items-center gap-2 py-2.5">
          <LogOut size={17} /> Logout
        </Button>
      </div>
    </header>
  );
}
