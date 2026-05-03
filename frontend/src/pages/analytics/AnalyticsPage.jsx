import { BarChart3 } from 'lucide-react'
export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in">
      <div className="card flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
          <BarChart3 size={28} className="text-violet-400" />
        </div>
        <h3 className="font-display text-xl font-bold text-white mb-2">Analytics Module</h3>
        <p className="text-slate-500 text-sm max-w-sm">
          Peak hours, most used resources, top users and trends with Recharts. Coming in <span className="text-brand-400 font-semibold">Phase 3</span>.
        </p>
        <div className="mt-6 flex gap-2 flex-wrap justify-center">
          {['Peak Hours Chart', 'Most Used Resources', 'Bookings by Day', 'Top Users', 'Usage Heatmap'].map(f => (
            <span key={f} className="badge bg-violet-500/5 border border-violet-500/15 text-violet-400 font-mono">{f}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
