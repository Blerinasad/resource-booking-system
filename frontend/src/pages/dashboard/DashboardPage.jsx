import { Activity, BarChart3, CalendarCheck, Database, Server, ShieldCheck, Zap } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import PageHeader from "../../components/common/PageHeader";

const stats = [
  { title: "Security", value: "JWT + RBAC", icon: ShieldCheck, tone: "cyan" },
  { title: "Architecture", value: "Microservices", icon: Server, tone: "violet" },
  { title: "Storage", value: "MySQL + Mongo", icon: Database, tone: "green" },
  { title: "Events", value: "Kafka Ready", icon: Zap, tone: "cyan" },
];

const phases = ["Auth service healthy", "Resource service healthy", "Booking analytics healthy", "API Gateway healthy"];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="animate-fadeIn">
      <PageHeader
        eyebrow="Control Center"
        title="Smart Resource Booking"
        description="A premium dashboard shell for your Dockerized microservices backend. Phase 1 covers auth, routing, layout and API connection."
      />

      <div className="mb-8 flex flex-wrap gap-3">
        <Badge tone="cyan">Logged as {user?.role || "user"}</Badge>
        <Badge tone="violet">API Gateway: localhost:5000</Badge>
        <Badge tone="green">Frontend Phase 1</Badge>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="animate-slideUp transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]" style={{ animationDelay: `${index * 80}ms` }}>
              <div className="mb-5 flex items-center justify-between">
                <div className="grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-200">
                  <Icon size={24} />
                </div>
                <Activity className="text-slate-600" size={18} />
              </div>
              <p className="text-sm text-slate-400">{item.title}</p>
              <h3 className="mt-2 text-2xl font-black text-white">{item.value}</h3>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white">System Overview</h2>
              <p className="mt-1 text-sm text-slate-400">Backend services are prepared for resource, booking and analytics modules.</p>
            </div>
            <BarChart3 className="text-cyan-300" />
          </div>
          <div className="h-64 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-900 to-violet-500/10 p-5">
            <div className="flex h-full items-end gap-3">
              {[52, 72, 44, 88, 66, 92, 74, 58, 84].map((height, idx) => (
                <div key={idx} className="flex flex-1 items-end">
                  <div className="w-full rounded-t-2xl bg-gradient-to-t from-cyan-500 to-violet-400 opacity-80 transition hover:opacity-100" style={{ height: `${height}%` }} />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-black text-white">Launch Checklist</h2>
          <div className="mt-6 space-y-4">
            {phases.map((phase) => (
              <div key={phase} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]" />
                <span className="text-sm font-semibold text-slate-200">{phase}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
