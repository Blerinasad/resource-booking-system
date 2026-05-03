import { useEffect, useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import Modal from '../common/Modal.jsx'
import Input from '../common/Input.jsx'
import { Select, Textarea } from '../common/FormElements.jsx'
import Button from '../common/Button.jsx'
import { bookingService, resourceService } from '../../services/index.js'

const toLocalDateTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

export default function BookingForm({ open, onClose, onSuccess, preselectedResource }) {
  const [form, setForm] = useState({
    resourceId: '',
    startTime: '',
    endTime: '',
    notes: '',
  })
  const [resources, setResources] = useState([])
  const [errors, setErrors]       = useState({})
  const [loading, setLoading]     = useState(false)
  const [loadingRes, setLoadingRes] = useState(true)

  useEffect(() => {
    if (!open) return
    setForm({ resourceId: preselectedResource?.id?.toString() || '', startTime: '', endTime: '', notes: '' })
    setErrors({})
    setLoadingRes(true)
    resourceService.getAll({ limit: 100, status: 'available' })
      .then((res) => {
        const list = res?.data?.resources || res?.data || res || []
        setResources(Array.isArray(list) ? list : [])
      })
      .catch(() => setResources([]))
      .finally(() => setLoadingRes(false))
  }, [open])

  const onChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setErrors(p => ({ ...p, [e.target.name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.resourceId)                              e.resourceId = 'Select a resource'
    if (!form.startTime)                               e.startTime  = 'Start time is required'
    if (!form.endTime)                                 e.endTime    = 'End time is required'
    if (form.startTime && form.endTime && form.endTime <= form.startTime)
      e.endTime = 'End time must be after start time'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await bookingService.create({
        resourceId: Number(form.resourceId),
        startTime:  new Date(form.startTime).toISOString(),
        endTime:    new Date(form.endTime).toISOString(),
        notes:      form.notes,
      })
      onSuccess?.()
      onClose()
    } catch (err) {
      setErrors({ api: err?.response?.data?.message || 'Failed to create booking.' })
    } finally {
      setLoading(false)
    }
  }

  const resourceOptions = [
    { value: '', label: loadingRes ? 'Loading resources...' : 'Select a resource' },
    ...resources.map(r => ({ value: r.id, label: `${r.name} — ${r.location} (${r.type})` })),
  ]

  return (
    <Modal open={open} onClose={onClose} title="New Booking" size="md">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {errors.api && (
          <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20 text-sm text-red-400">
            {errors.api}
          </div>
        )}

        <Select
          label="Resource"
          name="resourceId"
          value={form.resourceId}
          onChange={onChange}
          options={resourceOptions}
          error={errors.resourceId}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Start time"
            name="startTime"
            type="datetime-local"
            value={form.startTime}
            onChange={onChange}
            icon={Calendar}
            error={errors.startTime}
          />
          <Input
            label="End time"
            name="endTime"
            type="datetime-local"
            value={form.endTime}
            onChange={onChange}
            icon={Clock}
            error={errors.endTime}
          />
        </div>

        <Textarea
          label="Notes (optional)"
          name="notes"
          value={form.notes}
          onChange={onChange}
          placeholder="Any additional information..."
        />

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <Button type="submit" loading={loading} className="flex-1">
            Create Booking
          </Button>
        </div>
      </form>
    </Modal>
  )
}
