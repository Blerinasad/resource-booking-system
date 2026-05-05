import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-950 px-5 text-white">
      <div className="text-center animate-fade-in">
        <div className="font-display font-bold text-[8rem] leading-none text-gradient opacity-20 select-none mb-4">404</div>
        <h1 className="font-display text-2xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-slate-400 text-sm mb-8">The page you requested does not exist.</p>
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
