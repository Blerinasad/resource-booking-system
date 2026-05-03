export default function Button({ children, className = "", variant = "primary", ...props }) {
  const variants = {
    primary: "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white shadow-glow hover:shadow-violetGlow",
    ghost: "bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10",
    danger: "bg-red-500/10 text-red-300 border border-red-400/20 hover:bg-red-500/20",
  };
  return (
    <button
      className={`rounded-2xl px-5 py-3 font-semibold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
