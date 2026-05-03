export default function EmptyState({ title = "No data yet", description = "Once data exists, it will appear here." }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-slate-300">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}
