import { useCallback, useEffect, useState } from 'react'
import { Plus, RefreshCw, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import ResourceCard from '../../components/resources/ResourceCard.jsx'
import ResourceForm from '../../components/resources/ResourceForm.jsx'
import BookingForm  from '../../components/bookings/BookingForm.jsx'
import { ConfirmDialog, Select } from '../../components/common/FormElements.jsx'
import Button from '../../components/common/Button.jsx'
import Input  from '../../components/common/Input.jsx'
import Loader from '../../components/common/Loader.jsx'
import { resourceService } from '../../services/index.js'

const TYPE_OPTS = [
  { value: '',          label: 'All types' },
  { value: 'room',      label: '🏢 Room' },
  { value: 'lab',       label: '🔬 Lab' },
  { value: 'equipment', label: '🖥 Equipment' },
  { value: 'workspace', label: '💺 Workspace' },
]
const STATUS_OPTS = [
  { value: '',             label: 'All statuses' },
  { value: 'available',    label: 'Available' },
  { value: 'unavailable',  label: 'Unavailable' },
  { value: 'maintenance',  label: 'Maintenance' },
]

export default function ResourcesPage() {
  const { isAdmin } = useAuth()

  const [resources, setResources] = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [typeFilter, setType]     = useState('')
  const [statusFilter, setStatus] = useState('')

  const [showForm, setShowForm]         = useState(false)
  const [editRes, setEditRes]           = useState(null)
  const [deleteRes, setDeleteRes]       = useState(null)
  const [bookRes, setBookRes]           = useState(null)
  const [deleting, setDeleting]         = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = { limit: 100 }
      if (typeFilter)   params.type   = typeFilter
      if (statusFilter) params.status = statusFilter
      const res  = await resourceService.getAll(params)
      const list = res?.data?.resources || res?.data || res || []
      setResources(Array.isArray(list) ? list : [])
    } catch {
      setResources([])
    } finally {
      setLoading(false)
    }
  }, [typeFilter, statusFilter])

  useEffect(() => { load() }, [load])

  const filtered = resources.filter(r =>
    !search || r.name?.toLowerCase().includes(search.toLowerCase()) || r.location?.toLowerCase().includes(search.toLowerCase())
  )

  const doDelete = async () => {
    setDeleting(true)
    try { await resourceService.delete(deleteRes.id); load() } catch {}
    setDeleting(false); setDeleteRes(null)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-48">
          <Input
            placeholder="Search resources..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            icon={Search}
          />
        </div>
        <div className="w-44">
          <Select
            value={typeFilter}
            onChange={e => setType(e.target.value)}
            options={TYPE_OPTS}
          />
        </div>
        <div className="w-44">
          <Select
            value={statusFilter}
            onChange={e => setStatus(e.target.value)}
            options={STATUS_OPTS}
          />
        </div>
        <Button variant="ghost" icon={RefreshCw} onClick={load} className="text-xs">Refresh</Button>
        {isAdmin && (
          <Button icon={Plus} onClick={() => { setEditRes(null); setShowForm(true) }}>
            New Resource
          </Button>
        )}
      </div>

      {/* Count */}
      <p className="text-xs font-mono text-slate-500">
        {filtered.length} resource{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <div className="card py-16 text-center text-slate-500 text-sm">No resources found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(r => (
            <ResourceCard
              key={r.id}
              resource={r}
              onEdit={isAdmin ? (res) => { setEditRes(res); setShowForm(true) } : null}
              onDelete={isAdmin ? (res) => setDeleteRes(res) : null}
              onBook={(res) => setBookRes(res)}
            />
          ))}
        </div>
      )}

      <ResourceForm
        open={showForm}
        onClose={() => { setShowForm(false); setEditRes(null) }}
        onSuccess={load}
        resource={editRes}
      />

      <BookingForm
        open={!!bookRes}
        onClose={() => setBookRes(null)}
        onSuccess={load}
        preselectedResource={bookRes}
      />

      <ConfirmDialog
        open={!!deleteRes}
        onClose={() => setDeleteRes(null)}
        onConfirm={doDelete}
        loading={deleting}
        title="Delete Resource"
        message={`Permanently delete "${deleteRes?.name}"? All related bookings may be affected.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  )
}
