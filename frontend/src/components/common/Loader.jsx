export default function Loader({ label = "Loading experience..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-cyan-300/20 border-t-cyan-300" />
        <p className="mt-5 text-slate-300">{label}</p>
      </div>
    </div>
  );
}
