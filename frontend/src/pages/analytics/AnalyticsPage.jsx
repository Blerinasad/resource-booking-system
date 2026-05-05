import { useEffect, useState } from 'react'
import { analyticsService } from '../../services/index.js'
import { StatCard } from '../../components/common/Card.jsx'
import Loader from '../../components/common/Loader.jsx'
import {
  CalendarCheck, Clock, CheckCircle, TrendingUp, XCircle, Activity
} from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'

const COLORS = ['#f59e0b', '#15b07c', '#3b82f6', '#ef4444', '#64748b']

const getPayload = (res) =>
  res?.data?.data ||
  res?.data?.summary ||
  res?.data?.analytics ||
  res?.data ||
  res ||
  {}

const getArray = (res, keys = []) => {
  const data = getPayload(res)

  if (Array.isArray(data)) return data

  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key]
  }

  for (const key in data) {
    if (Array.isArray(data[key])) return data[key]
  }

  return []
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
    totalBookings: getNumber(data, ['totalBookings', 'total', 'bookingsTotal', 'bookingCount']),
    pendingBookings: getNumber(data, ['pendingBookings', 'pending']),
    approvedBookings: getNumber(data, ['approvedBookings', 'approved']),
    completedBookings: getNumber(data, ['completedBookings', 'completed']),
    cancelledBookings: getNumber(data, ['cancelledBookings', 'cancelled', 'canceled']),
    noShowBookings: getNumber(data, ['noShowBookings', 'noShow', 'no_show', 'no-show']),
  }
}

const normalizeByDay = (res) =>
  getArray(res, ['bookingsByDay', 'byDay', 'daily', 'data']).map((x) => ({
    day: x.day || x.date || x._id || x.label || '—',
    count: Number(x.count || x.bookingCount || x.total || x.value || 0),
  }))

const normalizeMostUsed = (res) =>
  getArray(res, ['mostUsed', 'resources', 'mostUsedResources', 'data']).map((x) => ({
    resourceName: x.resourceName || x.name || x.resource?.name || `Resource #${x.resourceId || x.id || '—'}`,
    bookingCount: Number(x.bookingCount || x.count || x.total || x.value || 0),
  }))

const normalizePeakHours = (res) =>
  getArray(res, ['peakHours', 'hours', 'data']).map((x) => ({
    hour: x.hour !== undefined ? `${String(x.hour).padStart(2, '0')}:00` : (x.label || x.time || '—'),
    count: Number(x.count || x.bookingCount || x.total || x.value || 0),
  }))

const normalizeTopUsers = (res) =>
  getArray(res, ['topUsers', 'users', 'data']).map((x) => ({
    userId: x.userId || x.id || x.user?.id,
    userName: x.userName || x.name || x.user?.name || `User #${x.userId || x.id || '—'}`,
    bookingCount: Number(x.bookingCount || x.count || x.total || x.value || 0),
  }))

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-surface-800 border border-white/10 rounded-xl px-4 py-3 shadow-xl">
      {label && <p className="text-xs font-mono text-slate-400 mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: p.color || '#15b07c' }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const [summary, setSummary]   = useState(null)
  const [byDay, setByDay]       = useState([])
  const [mostUsed, setMostUsed] = useState([])
  const [peakHours, setPeakHours] = useState([])
  const [topUsers, setTopUsers] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [s, d, m, p, u] = await Promise.allSettled([
          analyticsService.summary(),
          analyticsService.bookingsByDay(),
          analyticsService.mostUsedResources(),
          analyticsService.peakHours(),
          analyticsService.topUsers(),
        ])

        if (s.status === 'fulfilled') setSummary(normalizeSummary(s.value))
        if (d.status === 'fulfilled') setByDay(normalizeByDay(d.value))
        if (m.status === 'fulfilled') setMostUsed(normalizeMostUsed(m.value))
        if (p.status === 'fulfilled') setPeakHours(normalizePeakHours(p.value))
        if (u.status === 'fulfilled') setTopUsers(normalizeTopUsers(u.value))
      } catch (err) {
        console.error('Failed to load analytics:', err)
        setSummary(null)
        setByDay([])
        setMostUsed([])
        setPeakHours([])
        setTopUsers([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) return <Loader />

  const statusData = summary ? [
    { name: 'Pending', value: summary.pendingBookings ?? 0 },
    { name: 'Approved', value: summary.approvedBookings ?? 0 },
    { name: 'Completed', value: summary.completedBookings ?? 0 },
    { name: 'Cancelled', value: summary.cancelledBookings ?? 0 },
    { name: 'No-show', value: summary.noShowBookings ?? 0 },
  ] : []

  const chartConfig = {
    cartesianGrid: { strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.04)' },
    xAxis: { tick: { fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono' }, axisLine: false, tickLine: false },
    yAxis: { tick: { fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono' }, axisLine: false, tickLine: false },
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Total Bookings" value={summary?.totalBookings ?? 0} icon={CalendarCheck} color="brand" delay={0} />
        <StatCard label="Pending" value={summary?.pendingBookings ?? 0} icon={Clock} color="amber" delay={50} />
        <StatCard label="Approved" value={summary?.approvedBookings ?? 0} icon={CheckCircle} color="brand" delay={100} />
        <StatCard label="Completed" value={summary?.completedBookings ?? 0} icon={TrendingUp} color="blue" delay={150} />
        <StatCard label="Cancelled" value={summary?.cancelledBookings ?? 0} icon={XCircle} color="red" delay={200} />
        <StatCard label="No-show" value={summary?.noShowBookings ?? 0} icon={Activity} color="slate" delay={250} />
      </div>

      {/* Main charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings by day */}
        <div className="card lg:col-span-2">
          <h3 className="font-display font-bold text-white mb-1">Bookings by Day</h3>
          <p className="text-xs text-slate-500 font-mono mb-5">Last 7 days activity</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byDay.length ? byDay : [
              { day: 'Mon', count: 0 },
              { day: 'Tue', count: 0 },
              { day: 'Wed', count: 0 },
              { day: 'Thu', count: 0 },
              { day: 'Fri', count: 0 },
              { day: 'Sat', count: 0 },
              { day: 'Sun', count: 0 },
            ]}>
              <CartesianGrid {...chartConfig.cartesianGrid} />
              <XAxis dataKey="day" {...chartConfig.xAxis} />
              <YAxis {...chartConfig.yAxis} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#15b07c" radius={[4, 4, 0, 0]} fillOpacity={0.85} name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status breakdown */}
        <div className="card">
          <h3 className="font-display font-bold text-white mb-1">Status Breakdown</h3>
          <p className="text-xs text-slate-500 font-mono mb-5">Booking distribution</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-col gap-1.5 mt-2">
            {statusData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-slate-400 font-mono">{d.name}</span>
                </div>
                <span className="font-semibold text-slate-200">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most used resources */}
        <div className="card">
          <h3 className="font-display font-bold text-white mb-1">Most Used Resources</h3>
          <p className="text-xs text-slate-500 font-mono mb-5">Top 5 by booking count</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart layout="vertical" data={mostUsed.length ? mostUsed : []}>
              <CartesianGrid {...chartConfig.cartesianGrid} />
              <XAxis type="number" {...chartConfig.xAxis} />
              <YAxis dataKey="resourceName" type="category" width={120} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="bookingCount" fill="#3b82f6" radius={[0, 4, 4, 0]} fillOpacity={0.85} name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Peak hours */}
        <div className="card">
          <h3 className="font-display font-bold text-white mb-1">Peak Hours</h3>
          <p className="text-xs text-slate-500 font-mono mb-5">Bookings by hour of day</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={peakHours.length ? peakHours : []}>
              <CartesianGrid {...chartConfig.cartesianGrid} />
              <XAxis dataKey="hour" {...chartConfig.xAxis} />
              <YAxis {...chartConfig.yAxis} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 3 }} name="Bookings" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top users */}
      {topUsers.length > 0 && (
        <div className="card animate-fade-in-delay-1">
          <h3 className="font-display font-bold text-white mb-1">Top Users</h3>
          <p className="text-xs text-slate-500 font-mono mb-5">Most active bookers</p>
          <div className="space-y-3">
            {topUsers.slice(0, 5).map((u, i) => (
              <div key={u.userId || i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500/40 to-emerald-600/40 border border-brand-500/20 flex items-center justify-center text-xs font-bold text-brand-300 shrink-0">
                  {u.userName?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-slate-200 truncate">{u.userName}</span>
                    <span className="text-xs font-mono text-slate-400">{u.bookingCount} bookings</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-400"
                      style={{ width: `${Math.min(100, (u.bookingCount / (topUsers[0]?.bookingCount || 1)) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}