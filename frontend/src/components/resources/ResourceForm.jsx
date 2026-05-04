import { useEffect, useState } from 'react'
import { MapPin, Users, Tag, FileText } from 'lucide-react'
import Modal from '../common/Modal.jsx'
import Input from '../common/Input.jsx'
import { Select, Textarea } from '../common/FormElements.jsx'
import Button from '../common/Button.jsx'
import { resourceService } from '../../services/index.js'

const TYPE_OPTIONS = [
  { value: 'room',      label: '🏢 Meeting Room' },
  { value: 'lab',       label: '🔬 Laboratory' },
  { value: 'equipment', label: '🖥 Equipment' },
  { value: 'workspace', label: '💺 Workspace' },
]

const STATUS_OPTIONS = [
  { value: 'available',    label: '✅ Available' },
  { value: 'unavailable',  label: '⛔ Unavailable' },
  { value: 'maintenance',  label: '🔧 Maintenance' },
]

const empty = { name: '', type: 'room', location: '', capacity: '', status: 'available', description: '' }

export default function ResourceForm({ open, onClose, onSuccess, resource }) {
  const isEdit = Boolean(resource)
  const [form, setForm] = useState(empty)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return
    setForm(resource ? {
      name:        resource.name        || '',
      type:        resource.type        || 'room',
      location:    resource.location    || '',
      capacity:    resource.capacity    ?? '',
      status:      resource.status      || 'available',
      description: resource.description || '',
    } : empty)
    setErrors({})
  }, [open, resource])

  const onChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setErrors(p => ({ ...p, [e.target.name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())     e.name     = 'Name is required'
    if (!form.location.trim()) e.location = 'Location is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const payload = {
        ...form,
        capacity: form.capacity ? Number(form.capacity) : null,
      }
      if (isEdit) await resourceService.update(resource.id, payload)
      else        await resourceService.create(payload)
      onSuccess?.()
      onClose()
    } catch (err) {
      setErrors({ api: err?.response?.data?.message || 'Operation failed.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Edit Resource' : 'New Resource'} size="md">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {errors.api && (
          <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20 text-sm text-red-400">
            {errors.api}
          </div>
        )}

        <Input
          label="Resource name"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="e.g. Conference Room A"
          icon={Tag}
          error={errors.name}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select label="Type"   name="type"   value={form.type}   onChange={onChange} options={TYPE_OPTIONS} />
          <Select label="Status" name="status" value={form.status} onChange={onChange} options={STATUS_OPTIONS} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Location"
            name="location"
            value={form.location}
            onChange={onChange}
            placeholder="e.g. Building A, 2nd floor"
            icon={MapPin}
            error={errors.location}
          />
          <Input
            label="Capacity (optional)"
            name="capacity"
            type="number"
            min="1"
            value={form.capacity}
            onChange={onChange}
            placeholder="e.g. 20"
            icon={Users}
          />
        </div>

        <Textarea
          label="Description (optional)"
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Describe this resource..."
          rows={2}
        />

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          <Button type="submit" loading={loading} className="flex-1">
            {isEdit ? 'Save Changes' : 'Create Resource'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
