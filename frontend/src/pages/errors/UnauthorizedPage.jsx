import { Link } from "react-router-dom";
import { ShieldOff } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-950 px-5 text-white">
      <div className="text-center animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <ShieldOff size={36} className="text-red-400" />
        </div>
        <h1 className="font-display text-2xl font-bold text-white mb-2">Unauthorized</h1>
        <p className="text-slate-400 text-sm mb-8">You do not have permission to access this page.</p>
        <Link
          to="/dashboard"
          className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
