import { CheckCircle, XCircle, Ban, Eye } from 'lucide-react'
import { StatusBadge } from '../common/Badge.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const fmt = (dt) => dt ? new Date(dt).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' }) : '—'

export default function BookingTable({ bookings = [], onCancel, onApprove, onReject, onView, loading }) {
  const { isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-white/[0.02] rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (!bookings.length) {
    return (
      <div className="py-14 text-center text-slate-500">
        <p className="text-sm">No bookings found.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.05]">
            {['#', 'Resource', 'User', 'Start', 'End', 'Status', 'Actions'].map(h => (
              <th key={h} className="text-left pb-3 pr-4 text-xs font-mono text-slate-500 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.03]">
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-white/[0.02] transition-colors group">
              <td className="py-3 pr-4 font-mono text-xs text-slate-600">#{b.id}</td>
              <td className="py-3 pr-4 font-semibold text-slate-200">{b.resourceId}</td>
              <td className="py-3 pr-4 text-slate-400 font-mono text-xs">{b.userId}</td>
              <td className="py-3 pr-4 font-mono text-xs text-slate-400">{fmt(b.startTime)}</td>
              <td className="py-3 pr-4 font-mono text-xs text-slate-400">{fmt(b.endTime)}</td>
              <td className="py-3 pr-4"><StatusBadge status={b.status} /></td>
              <td className="py-3">
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {onView && (
                    <button
                      onClick={() => onView(b)}
                      title="View"
                      className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                    >
                      <Eye size={14} />
                    </button>
                  )}
                  {isAdmin && b.status === 'pending' && onApprove && (
                    <button
                      onClick={() => onApprove(b)}
                      title="Approve"
                      className="p-1.5 rounded-lg hover:bg-brand-500/10 text-slate-400 hover:text-brand-400 transition-colors"
                    >
                      <CheckCircle size={14} />
                    </button>
                  )}
                  {isAdmin && b.status === 'pending' && onReject && (
                    <button
                      onClick={() => onReject(b)}
                      title="Reject"
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <XCircle size={14} />
                    </button>
                  )}
                  {(b.status === 'pending' || b.status === 'approved') && onCancel && (
                    <button
                      onClick={() => onCancel(b)}
                      title="Cancel"
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Ban size={14} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
