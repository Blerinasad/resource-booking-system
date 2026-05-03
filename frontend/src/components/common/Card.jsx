export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}
