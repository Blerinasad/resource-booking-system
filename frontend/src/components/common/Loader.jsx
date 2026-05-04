export default function Loader({ fullscreen = false }) {
  const wrapper = fullscreen
    ? 'fixed inset-0 flex items-center justify-center bg-surface-950 z-50'
    : 'flex items-center justify-center p-12'

  return (
    <div className={wrapper}>
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-brand-500/20 border-t-brand-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border border-brand-500/10 animate-pulse" />
      </div>
    </div>
  )
}
