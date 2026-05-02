import { ShieldCheck, Database, CalendarCheck, BarChart3 } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  const cards = [
    {
      title: "Authentication",
      value: "JWT + RBAC",
      icon: ShieldCheck,
    },
    {
      title: "Resources",
      value: "Rooms & Labs",
      icon: Database,
    },
    {
      title: "Bookings",
      value: "Conflict Safe",
      icon: CalendarCheck,
    },
    {
      title: "Analytics",
      value: "Usage Insights",
      icon: BarChart3,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Smart Resource Booking
        </h1>
        <p className="text-slate-400 mt-2">
          Logged in as <span className="text-cyan-300">{user?.role}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl hover:bg-white/10 transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-300 flex items-center justify-center mb-5">
                <Icon />
              </div>

              <h3 className="text-slate-300 text-sm">{card.title}</h3>
              <p className="text-2xl font-bold text-white mt-2">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}