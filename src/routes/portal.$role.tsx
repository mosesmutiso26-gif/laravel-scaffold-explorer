import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { api } from "@/lib/api/client";
import { getSession } from "@/lib/api/config";
import { roleByKey } from "@/lib/roles";
import { Kpi, Panel, QueryState } from "@/components/portal/ui";
import { ApiError } from "@/lib/api/errors";

type Dash = { kpis: { label: string; value: string; source: string }[]; charts: { title: string; type: "bar" | "line"; source: string; series: { name: string; value: number }[] }[] };

export const Route = createFileRoute("/portal/$role")({ component: RoleDashboard });

function RoleDashboard() {
  const { role } = Route.useParams();
  const session = getSession();
  const allowed = session?.role === role || session?.role === "admin";
  const cfg = roleByKey(role);
  // Contract: GET /dashboards/{role} — role-scoped summary aggregated server-side from owning modules.
  const q = useQuery({ queryKey: ["dashboard", role], queryFn: () => api.get<Dash>(`/dashboards/${role}`), enabled: allowed && !!cfg });
  if (!cfg) return <QueryState isLoading={false} error={new ApiError(404, "Unknown portal.")}>{null}</QueryState>;
  if (!allowed) return <QueryState isLoading={false} error={new ApiError(403, "This dashboard belongs to another role.")}>{null}</QueryState>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-navy">{cfg.label} dashboard</h1><p className="text-sm text-muted-foreground">Summary for the current term.</p></div>
      <QueryState isLoading={q.isLoading} error={q.error}>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{q.data?.kpis.map((k) => <Kpi key={k.label} label={k.label} value={k.value} hint={k.source} />)}</div>
        <div className="grid gap-4 lg:grid-cols-2">
          {q.data?.charts.map((c) => (
            <Panel key={c.title} title={c.title}>
              <div className="h-64">
                <ResponsiveContainer>
                  {c.type === "bar" ? (
                    <BarChart data={c.series}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="name" fontSize={11} /><YAxis fontSize={11} /><Tooltip /><Bar dataKey="value" fill="var(--chart-1)" radius={[6, 6, 0, 0]} /></BarChart>
                  ) : (
                    <LineChart data={c.series}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="name" fontSize={11} /><YAxis fontSize={11} domain={[60, 100]} /><Tooltip /><Line dataKey="value" stroke="var(--chart-2)" strokeWidth={3} dot /></LineChart>
                  )}
                </ResponsiveContainer>
              </div>
              <p className="text-[11px] text-muted-foreground">Source: {c.source}</p>
            </Panel>
          ))}
        </div>
      </QueryState>
    </div>
  );
}
