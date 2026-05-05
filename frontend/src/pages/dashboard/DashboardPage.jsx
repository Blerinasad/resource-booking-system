import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarCheck, Database, CheckCircle, Clock,
  XCircle, TrendingUp, ArrowRight, Activity
} from 'lucide-react'
import { StatCard } from '../../components/common/Card.jsx'
import { StatusBadge } from '../../components/common/Badge.jsx'
import { analyticsService, bookingService } from '../../services/index.js'
import { useAuth } from '../../context/AuthContext.jsx'
import Loader from '../../components/common/Loader.jsx'

const fmt = (dt) =>
  dt ? new Date(dt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '—'

const getPayload = (res) =>
  res?.data?.data ||
  res?.data?.summary ||
  res?.data ||
  res ||
  {}

const getBookingsList = (res) => {
  const data = getPayload(res)

  const list =
    data?.bookings ||
    data?.rows ||
    data?.items ||
    data?.results ||
    data ||
    []

  return Array.isArray(list) ? list : []
}

const getNumber = (obj, keys, fallback = 0) => {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null) {
      return Number(obj[key]) || fallback
    }
  }

  return fallback
}

const normalizeSummary = (res) => {
  const data = getPayload(res)

  return {
    totalBookings: getNumber(data, ['totalBookings', 'total', 'count', 'bookingCount']),
    pendingBookings: getNumber(data, ['pendingBookings', 'pending']),
    approvedBookings: getNumber(data, ['approvedBookings', 'approved']),
    completedBookings: getNumber(data, ['completedBookings', 'completed']),
    cancelledBookings: getNumber(data, ['cancelledBookings', 'cancelled', 'canceled']),
    noShowBookings: getNumber(data, ['noShowBookings', 'noShow', 'no_show', 'no-show']),
  }
}

const buildSummaryFromBookings = (bookings) => ({
  totalBookings: bookings.length,
  pendingBookings: bookings.filter(b => b.status === 'pending').length,
  approvedBookings: bookings.filter(b => b.status === 'approved').length,
  completedBookings: bookings.filter(b => b.status === 'completed').length,
  cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
  noShowBookings: bookings.filter(b => b.status === 'no-show').length,
})

const isEmptySummary = (summary) => {
  if (!summary) return true

  return (
    Number(summary.totalBookings || 0) === 0 &&
    Number(summary.pendingBookings || 0) === 0 &&
    Number(summary.approvedBookings || 0) === 0 &&
    Number(summary.completedBookings || 0) === 0 &&
    Number(summary.cancelledBookings || 0) === 0 &&
    Number(summary.noShowBookings || 0) === 0
  )
}

export default function DashboardPage() {
  const { user, isAdmin } = useAuth()

  const [stats, setStats] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        let summaryData = null
        let bookingList = []

        if (isAdmin) {
          const [s, b] = await Promise.allSettled([
            analyticsService.summary(),
            bookingService.adminAll({ limit: 1000, sort: 'desc' }),
          ])

          if (s.status === 'fulfilled') {
            summaryData = normalizeSummary(s.value)
          }

          if (b.status === 'fulfilled') {
            bookingList = getBookingsList(b.value)
          }
        } else {
          const b = await bookingService.getAll({ limit: 1000, sort: 'desc' })
          bookingList = getBookingsList(b)
        }

        if (isEmptySummary(summaryData)) {
          summaryData = buildSummaryFromBookings(bookingList)
        }

        setStats(summaryData)
        setBookings(bookingList.slice(0, 6))
      } catch (err) {
        console.error('Failed to load dashboard:', err)
        setStats({
          totalBookings: 0,
          pendingBookings: 0,
          approvedBookings: 0,
          completedBookings: 0,
          cancelledBookings: 0,
          noShowBookings: 0,
        })
        setBookings([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [isAdmin])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  if (loading) return <Loader />

  const quickActions = [
    {
      label: 'New Booking',
      to: '/dashboard/bookings',
      icon: CalendarCheck,
      desc: 'Reserve a resource',
    },
    {
      label: 'Resources',
      to: '/dashboard/resources',
      icon: Database,
      desc: 'View available resources',
    },
    ...(isAdmin
      ? [
          {
            label: 'Analytics',
            to: '/dashboard/analytics',
            icon: TrendingUp,
            desc: 'Usage insights',
          },
        ]
      : []),
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Greeting */}
      <div className="mb-2">
        <h2 className="font-display text-2xl font-bold text-white">
          {greeting}, {user?.name?.split(' ')[0]}
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          {isAdmin
            ? "Here's what's happening with all resources today"
            : "Here's what's happening with your bookings today"}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          label={isAdmin ? 'Total Bookings' : 'My Bookings'}
          value={stats?.totalBookings ?? 0}
          icon={CalendarCheck}
          color="brand"
          delay={0}
        />

        <StatCard
          label="Pending"
          value={stats?.pendingBookings ?? 0}
          icon={Clock}
          color="amber"
          delay={50}
        />

        <StatCard
          label="Approved"
          value={stats?.approvedBookings ?? 0}
          icon={CheckCircle}
          color="brand"
          delay={100}
        />

        <StatCard
          label="Completed"
          value={stats?.completedBookings ?? 0}
          icon={TrendingUp}
          color="blue"
          delay={150}
        />

        <StatCard
          label="Cancelled"
          value={stats?.cancelledBookings ?? 0}
          icon={XCircle}
          color="red"
          delay={200}
        />

        <StatCard
          label="No-show"
          value={stats?.noShowBookings ?? 0}
          icon={Activity}
          color="slate"
          delay={250}
        />
      </div>

      {/* Recent bookings table */}
      <div className="card animate-fade-in-delay-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-bold text-white">
              {isAdmin ? 'Recent Bookings' : 'My Recent Bookings'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">
              {isAdmin ? 'Latest reservation activity' : 'Your latest reservation activity'}
            </p>
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
            <p className="text-sm">
              {isAdmin ? 'No bookings yet' : 'You have no bookings yet'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {['#', 'Resource', ...(isAdmin ? ['User'] : []), 'Start', 'End', 'Status'].map(h => (
                    <th
                      key={h}
                      className="text-left pb-3 text-xs font-mono text-slate-500 uppercase tracking-wider pr-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.03]">
                {bookings.map((b) => (
                  <tr key={b.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-4 font-mono text-xs text-slate-500">
                      #{b.id}
                    </td>

                    <td className="py-3 pr-4 text-slate-200 font-semibold">
                      {b.resourceName ?? b.resource?.name ?? b.resourceId ?? '—'}
                    </td>

                    {isAdmin && (
                      <td className="py-3 pr-4 text-slate-400">
                        {b.userName ?? b.user?.name ?? b.userId ?? '—'}
                      </td>
                    )}

                    <td className="py-3 pr-4 font-mono text-xs text-slate-400">
                      {fmt(b.startTime)}
                    </td>

                    <td className="py-3 pr-4 font-mono text-xs text-slate-400">
                      {fmt(b.endTime)}
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
        {quickActions.map((a) => {
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

              <ArrowRight
                size={16}
                className="ml-auto text-slate-600 group-hover:text-brand-400 transition-colors"
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}