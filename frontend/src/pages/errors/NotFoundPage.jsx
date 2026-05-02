import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-slate-400 mt-3">Page not found.</p>
        <Link to="/dashboard" className="text-cyan-300 mt-6 inline-block">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}