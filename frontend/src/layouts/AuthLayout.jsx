export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(167,139,250,0.2),transparent_28%),radial-gradient(circle_at_50%_90%,rgba(59,130,246,0.12),transparent_35%)]" />
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 animate-pulseGlow rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden flex-col justify-between p-12 lg:flex">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 shadow-glow">
              <span className="text-xl font-black text-cyan-200">SB</span>
            </div>
            <div>
              <p className="font-bold">Smart Booking</p>
              <p className="text-sm text-slate-400">Microservices Dashboard</p>
            </div>
          </div>
          <div className="max-w-xl animate-slideUp">
            <div className="mb-8 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-200 backdrop-blur-xl">
              Docker • Kafka • MySQL • MongoDB • JWT
            </div>
            <h1 className="text-6xl font-black leading-tight tracking-tight">
              Book resources with a dashboard that feels premium.
            </h1>
            <p className="mt-6 text-lg text-slate-400">
              A clean frontend for your distributed backend: secure auth, modern UI, and ready for analytics.
            </p>
          </div>
          <p className="text-sm text-slate-500">Built with React, Vite and Tailwind CSS.</p>
        </section>
        <section className="flex items-center justify-center px-5 py-10">
          <div className="w-full max-w-md animate-slideUp rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 shadow-2xl backdrop-blur-2xl md:p-9">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black tracking-tight">{title}</h2>
              <p className="mt-2 text-slate-400">{subtitle}</p>
            </div>
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
