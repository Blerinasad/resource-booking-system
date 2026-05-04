import { MapPin, Users, Pencil, Trash2 } from 'lucide-react'
import { Badge } from '../common/Badge.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const TYPE_ICON = { room: '🏢', lab: '🔬', equipment: '🖥', workspace: '💺' }

const STATUS_COLOR = {
  available:   'active',
  unavailable: 'cancelled',
  maintenance: 'pending',
}

export default function ResourceCard({ resource, onEdit, onDelete, onBook }) {
  const { isAdmin } = useAuth()

  return (
    <div className="card glass-hover group flex flex-col gap-4 animate-fade-in">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center text-xl">
            {TYPE_ICON[resource.type] || '📦'}
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-sm leading-tight">{resource.name}</h3>
            <span className="text-xs text-slate-500 font-mono capitalize">{resource.type}</span>
          </div>
        </div>
        <Badge variant={STATUS_COLOR[resource.status] || 'default'}>
          {resource.status}
        </Badge>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1.5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-slate-600 shrink-0" />
          <span className="truncate">{resource.location}</span>
        </div>
        {resource.capacity && (
          <div className="flex items-center gap-2">
            <Users size={12} className="text-slate-600 shrink-0" />
            <span>Capacity: {resource.capacity}</span>
          </div>
        )}
      </div>

      {resource.description && (
        <p className="text-xs text-slate-500 line-clamp-2">{resource.description}</p>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-1 mt-auto">
        {resource.status === 'available' && (
          <button
            onClick={() => onBook?.(resource)}
            className="flex-1 text-xs py-2 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 hover:text-brand-300 border border-brand-500/20 font-semibold transition-all"
          >
            Book
          </button>
        )}
        {isAdmin && (
          <>
            <button
              onClick={() => onEdit?.(resource)}
              className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete?.(resource)}
              className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
