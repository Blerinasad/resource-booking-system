import useAuth from "../../hooks/useAuth";

export default function Navbar({ user }) {
  const { logoutUser } = useAuth();

  return (
    <header className="h-20 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl px-6 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <p className="text-sm text-slate-400">Welcome back, {user?.name}</p>
      </div>

      <button
        onClick={logoutUser}
        className="rounded-xl bg-red-500/10 border border-red-400/20 px-4 py-2 text-red-300 hover:bg-red-500/20 transition"
      >
        Logout
      </button>
    </header>
  );
}