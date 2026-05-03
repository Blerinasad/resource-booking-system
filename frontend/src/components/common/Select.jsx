export default function Select({ label, children, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>}
      <select
        className={`w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-400/10 ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
