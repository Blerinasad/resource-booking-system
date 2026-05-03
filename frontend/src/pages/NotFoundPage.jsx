import { Link } from 'react-router-dom'
import { Home, AlertTriangle } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="font-display text-[8rem] font-bold text-gradient opacity-20 leading-none select-none">
          404
        </div>
        <AlertTriangle size={40} className="mx-auto text-amber-400 mb-4 -mt-4" />
        <h1 className="font-display text-2xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-slate-500 mb-8 text-sm">The page you're looking for doesn't exist.</p>
        <Link to="/dashboard" className="btn-primary inline-flex items-center gap-2">
          <Home size={16} /> Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
