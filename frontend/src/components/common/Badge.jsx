// Badge component
const STATUS_STYLES = {
  pending:   'bg-amber-500/10 text-amber-300 border border-amber-500/20',
  approved:  'bg-brand-500/10 text-brand-300 border border-brand-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border border-red-500/20',
  completed: 'bg-blue-500/10 text-blue-300 border border-blue-500/20',
  'no-show': 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
  admin:     'bg-violet-500/10 text-violet-300 border border-violet-500/20',
  user:      'bg-slate-500/10 text-slate-400 border border-slate-500/20',
  active:    'bg-brand-500/10 text-brand-300 border border-brand-500/20',
  inactive:  'bg-slate-500/10 text-slate-400 border border-slate-500/20',
}

export function Badge({ children, variant = 'default', className = '' }) {
  const style = STATUS_STYLES[variant] || 'bg-white/5 text-slate-300 border border-white/10'
  return (
    <span className={`badge ${style} ${className}`}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }) {
  const labels = {
    pending:   '● Pending',
    approved:  '● Approved',
    cancelled: '● Cancelled',
    completed: '● Completed',
    'no-show': '● No-show',
  }
  return <Badge variant={status}>{labels[status] || status}</Badge>
}
