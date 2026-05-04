import { ChevronDown } from 'lucide-react'

export function Select({ label, error, options = [], className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-slate-300">{label}</label>}
      <div className="relative">
        <select
          className={`input-field appearance-none pr-10 ${error ? 'border-red-500/50' : ''} ${className}`}
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-surface-800">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-slate-300">{label}</label>}
      <textarea
        className={`input-field resize-none ${error ? 'border-red-500/50' : ''} ${className}`}
        rows={3}
        {...props}
      />
      {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
          <Icon size={24} className="text-slate-500" />
        </div>
      )}
      <p className="font-semibold text-slate-300">{title}</p>
      {description && <p className="text-sm text-slate-500 mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', variant = 'danger', loading = false }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-surface-800 border border-white/10 rounded-2xl shadow-2xl animate-fade-in p-6">
        <h3 className="font-display font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="btn-secondary text-sm px-4 py-2">Cancel</button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`text-sm px-4 py-2 rounded-xl font-semibold transition-all disabled:opacity-50 ${
              variant === 'danger'
                ? 'bg-red-500 hover:bg-red-400 text-white'
                : 'bg-brand-500 hover:bg-brand-400 text-white'
            }`}
          >
            {loading ? <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="btn-secondary text-xs px-3 py-1.5 disabled:opacity-30"
      >
        ← Prev
      </button>
      <span className="font-mono text-xs text-slate-400">
        {page} / {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="btn-secondary text-xs px-3 py-1.5 disabled:opacity-30"
      >
        Next →
      </button>
    </div>
  )
}
