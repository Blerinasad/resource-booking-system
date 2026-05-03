export default function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-8 animate-slideUp">
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/80">{eyebrow}</p>}
      <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-slate-400">{description}</p>}
    </div>
  );
}
