export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  icon: Icon,
  iconRight: IconRight,
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    ghost:     'btn-ghost',
    danger:    'bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 hover:border-red-500/40 px-5 py-2.5',
    success:   'bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 border border-brand-500/20 hover:border-brand-500/40 px-5 py-2.5',
  }

  const sizes = {
    sm:  'px-3.5 py-1.5 text-xs',
    md:  'px-5 py-2.5 text-sm',
    lg:  'px-6 py-3 text-base',
  }

  const sizeClass = variant === 'primary' || variant === 'secondary' ? '' : sizes[size]

  return (
    <button
      className={`${base} ${variants[variant]} ${sizeClass} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon size={16} />
      ) : null}
      {children}
      {IconRight && !loading && <IconRight size={16} />}
    </button>
  )
}
