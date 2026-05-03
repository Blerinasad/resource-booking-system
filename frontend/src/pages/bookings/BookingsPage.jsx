import { useCallback, useEffect, useState } from 'react'
import { Plus, RefreshCw } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import BookingTable from '../../components/bookings/BookingTable.jsx'
import BookingForm  from '../../components/bookings/BookingForm.jsx'
import { ConfirmDialog, Pagination } from '../../components/common/FormElements.jsx'
import Button from '../../components/common/Button.jsx'
import Modal from '../../components/common/Modal.jsx'
import { StatusBadge } from '../../components/common/Badge.jsx'
import { bookingService } from '../../services/index.js'

const STATUSES = ['all', 'pending', 'approved', 'cancelled', 'completed', 'no-show']
const fmt = (dt) => dt ? new Date(dt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '—'

export default function BookingsPage() {
  const { isAdmin } = useAuth()

  const [bookings, setBookings]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [page, setPage]             = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatus]   = useState('all')

  const [showForm, setShowForm]           = useState(false)
  const [viewBooking, setViewBooking]     = useState(null)
  const [confirmCancel, setConfirmCancel] = useState(null)
  const [confirmApprove, setConfirmApprove] = useState(null)
  const [confirmReject, setConfirmReject]   = useState(null)
  const [actionLoading, setActionLoading]   = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page, limit: 10 }
      if (statusFilter !== 'all') params.status = statusFilter
      const res  = isAdmin
        ? await bookingService.adminAll(params)
        : await bookingService.getAll(params)
      const data = res?.data
      const list = data?.bookings || data?.rows || data || []
      setBookings(Array.isArray(list) ? list : [])
      setTotalPages(data?.totalPages || Math.ceil((data?.count || list.length) / 10) || 1)
    } catch {
      setBookings([])
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter, isAdmin])

  useEffect(() => { load() }, [load])

  const doCancel = async () => {
    setActionLoading(true)
    try { await bookingService.cancel(confirmCancel.id); load() } catch {}
    setActionLoading(false); setConfirmCancel(null)
  }
  const doApprove = async () => {
    setActionLoading(true)
    try { await bookingService.approve(confirmApprove.id); load() } catch {}
    setActionLoading(false); setConfirmApprove(null)
  }
  const doReject = async () => {
    setActionLoading(true)
    try { await bookingService.reject(confirmReject.id); load() } catch {}
    setActionLoading(false); setConfirmReject(null)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filters + actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => { setStatus(s); setPage(1) }}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                statusFilter === s
                  ? 'bg-brand-500/15 border-brand-500/30 text-brand-300'
                  : 'border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" icon={RefreshCw} onClick={load} className="text-xs">Refresh</Button>
          <Button icon={Plus} onClick={() => setShowForm(true)}>New Booking</Button>
        </div>
      </div>

      {/* Table card */}
      <div className="card">
        <BookingTable
          bookings={bookings}
          loading={loading}
          onView={setViewBooking}
          onCancel={(b) => setConfirmCancel(b)}
          onApprove={isAdmin ? (b) => setConfirmApprove(b) : null}
          onReject={isAdmin  ? (b) => setConfirmReject(b)  : null}
        />
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

      <BookingForm open={showForm} onClose={() => setShowForm(false)} onSuccess={load} />

      <Modal open={!!viewBooking} onClose={() => setViewBooking(null)} title="Booking Details">
        {viewBooking && (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            {[
              ['ID', `#${viewBooking.id}`],
              ['Status', <StatusBadge status={viewBooking.status} />],
              ['Resource ID', viewBooking.resourceId],
              ['User ID', viewBooking.userId],
              ['Start', fmt(viewBooking.startTime)],
              ['End', fmt(viewBooking.endTime)],
              ['Created', fmt(viewBooking.createdAt)],
              ['Updated', fmt(viewBooking.updatedAt)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-0.5">{k}</dt>
                <dd className="text-slate-200 font-semibold">{v}</dd>
              </div>
            ))}
            {viewBooking.notes && (
              <div className="col-span-2">
                <dt className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-0.5">Notes</dt>
                <dd className="text-slate-300">{viewBooking.notes}</dd>
              </div>
            )}
          </dl>
        )}
      </Modal>

      <ConfirmDialog open={!!confirmCancel}  onClose={() => setConfirmCancel(null)}  onConfirm={doCancel}  loading={actionLoading} title="Cancel Booking"  message={`Cancel booking #${confirmCancel?.id}?`}  confirmLabel="Cancel it" variant="danger" />
      <ConfirmDialog open={!!confirmApprove} onClose={() => setConfirmApprove(null)} onConfirm={doApprove} loading={actionLoading} title="Approve Booking" message={`Approve booking #${confirmApprove?.id}?`} confirmLabel="Approve"   variant="success" />
      <ConfirmDialog open={!!confirmReject}  onClose={() => setConfirmReject(null)}  onConfirm={doReject}  loading={actionLoading} title="Reject Booking"  message={`Reject booking #${confirmReject?.id}?`}  confirmLabel="Reject"    variant="danger" />
    </div>
  )
}
