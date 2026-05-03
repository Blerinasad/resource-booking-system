export default function Textarea({ label, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>}
      <textarea className={`w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300 ${className}`} {...props} />
    </label>
  );
}
