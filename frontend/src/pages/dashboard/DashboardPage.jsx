import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarCheck, Database, CheckCircle, Clock,
  XCircle, TrendingUp, ArrowRight, Activity
} from 'lucide-react'
import { StatCard } from '../../components/common/Card.jsx'
import { StatusBadge } from '../../components/common/Badge.jsx'
import { analyticsService, bookingService } from '../../services/index.js'
import Loader from '../../components/common/Loader.jsx'

export default function DashboardPage() {
  const [stats, setStats]       = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [s, b] = await Promise.allSettled([
          analyticsService.summary(),
          bookingService.getAll({ limit: 6, sort: 'desc' }),
        ])
        if (s.status === 'fulfilled') setStats(s.value?.data || s.value)
        if (b.status === 'fulfilled') {
          const raw = b.value?.data?.bookings || b.value?.data || b.value || []
          setBookings(Array.isArray(raw) ? raw.slice(0, 6) : [])
        }
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <Loader />

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Total Bookings" value={stats?.totalBookings ?? 0}     icon={CalendarCheck} color="brand"  delay={0}   />
        <StatCard label="Pending"        value={stats?.pendingBookings ?? 0}   icon={Clock}         color="amber"  delay={50}  />
        <StatCard label="Approved"       value={stats?.approvedBookings ?? 0}  icon={CheckCircle}   color="brand"  delay={100} />
        <StatCard label="Completed"      value={stats?.completedBookings ?? 0} icon={TrendingUp}    color="blue"   delay={150} />
        <StatCard label="Cancelled"      value={stats?.cancelledBookings ?? 0} icon={XCircle}       color="red"    delay={200} />
        <StatCard label="No-show"        value={stats?.noShowBookings ?? 0}    icon={Activity}      color="slate"  delay={250} />
      </div>

      {/* Recent bookings table */}
      <div className="card animate-fade-in-delay-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-bold text-white">Recent Bookings</h3>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">Latest reservation activity</p>
          </div>
          <Link
            to="/dashboard/bookings"
            className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-semibold transition-colors"
          >
            View all <ArrowRight size={13} />
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <CalendarCheck size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No bookings yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {['ID', 'Resource', 'User', 'Start', 'End', 'Status'].map(h => (
                    <th key={h} className="text-left pb-3 text-xs font-mono text-slate-500 uppercase tracking-wider pr-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {bookings.map((b) => (
                  <tr key={b.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-4 font-mono text-xs text-slate-500">#{b.id}</td>
                    <td className="py-3 pr-4 text-slate-200 font-semibold">{b.resourceId ?? '—'}</td>
                    <td className="py-3 pr-4 text-slate-400">{b.userId ?? '—'}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-slate-400">
                      {b.startTime ? new Date(b.startTime).toLocaleString() : '—'}
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs text-slate-400">
                      {b.endTime ? new Date(b.endTime).toLocaleString() : '—'}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-delay-2">
        {[
          { label: 'New Booking',   to: '/dashboard/bookings',  icon: CalendarCheck, desc: 'Reserve a resource'     },
          { label: 'Resources',     to: '/dashboard/resources', icon: Database,      desc: 'View all resources'     },
          { label: 'Analytics',     to: '/dashboard/analytics', icon: TrendingUp,    desc: 'Usage insights'         },
        ].map((a) => {
          const Icon = a.icon
          return (
            <Link
              key={a.to}
              to={a.to}
              className="card glass-hover group flex items-center gap-4"
            >
              <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 group-hover:bg-brand-500/15 transition-colors">
                <Icon size={20} className="text-brand-400" />
              </div>
              <div>
                <p className="font-semibold text-white">{a.label}</p>
                <p className="text-xs text-slate-500">{a.desc}</p>
              </div>
              <ArrowRight size={16} className="ml-auto text-slate-600 group-hover:text-brand-400 transition-colors" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
