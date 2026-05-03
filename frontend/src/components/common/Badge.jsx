export default function Badge({ children, tone = "cyan" }) {
  const tones = {
    cyan: "border-cyan-300/20 bg-cyan-400/10 text-cyan-200",
    violet: "border-violet-300/20 bg-violet-400/10 text-violet-200",
    green: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
    red: "border-red-300/20 bg-red-400/10 text-red-200",
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}
