import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download, Search } from "lucide-react";
import { api } from "@/lib/api/client";
import { fieldLabel, type WorkspaceData } from "@/lib/api/original-workspace";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QueryState, StatusPill } from "./ui";

function display(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return value.toLocaleString();
  if (Array.isArray(value)) return value.map(display).join(" · ");
  if (typeof value === "object") return Object.entries(value).map(([k, v]) => `${fieldLabel(k)}: ${display(v)}`).join(" · ");
  return String(value);
}

export function WorkspaceView({ role, page, label }: { role: string; page: string; label: string }) {
  const [search, setSearch] = useState("");
  const q = useQuery({ queryKey: ["workspace", role, page], queryFn: () => api.get<WorkspaceData>(`/workspaces/${role}/${page}`) });
  const collections = q.data?.collections ?? [];
  function exportRecords() {
    const csv = collections.flatMap((c) => [c.title, ...c.rows.map((r) => Object.entries(r).map(([k, v]) => `"${`${fieldLabel(k)}: ${display(v)}`.replace(/"/g, '""')}"`).join(",")), ""]).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = `${role}-${page}.csv`; a.click(); URL.revokeObjectURL(url);
  }
  return <div className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-bold text-navy">{label}</h1><div className="flex max-w-full items-center gap-2"><div className="relative min-w-0"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input aria-label="Search records" placeholder="Search records" value={search} onChange={(e) => setSearch(e.target.value)} className="w-48 max-w-full pl-9" /></div><Button variant="outline" size="icon" aria-label="Export records" title="Export records" disabled={!collections.length} onClick={exportRecords}><Download /></Button></div></div>
    <QueryState isLoading={q.isLoading} error={q.error}>
      {q.data?.originalPlaceholder && <div className="border-l-4 border-warning bg-warning-soft p-4 text-sm">This page was a placeholder in the original dashboard. No records or connected workflow are available yet.</div>}
      {collections.map((c) => {
        const rows = c.rows.filter((r) => display(r).toLowerCase().includes(search.toLowerCase()));
        const fields = [...new Set(c.rows.flatMap(Object.keys))].filter((k) => k !== "id");
        return <section key={c.title} className="min-w-0 space-y-3"><div className="flex items-baseline gap-3"><h2 className="font-semibold text-navy">{c.title}</h2><span className="text-xs text-muted-foreground">{rows.length} records</span></div><div className="overflow-x-auto rounded-md border bg-card"><Table><TableHeader><TableRow>{fields.map((f) => <TableHead key={f} className="whitespace-nowrap">{fieldLabel(f)}</TableHead>)}</TableRow></TableHeader><TableBody>{rows.map((r, i) => <TableRow key={String(r.id ?? i)}>{fields.map((f) => <TableCell key={f} className="min-w-28 max-w-80 whitespace-normal break-words align-top">{f === "status" ? <StatusPill value={display(r[f])} /> : display(r[f])}</TableCell>)}</TableRow>)}</TableBody></Table>{rows.length === 0 && <p className="p-4 text-sm text-muted-foreground">No matching records.</p>}</div></section>;
      })}
    </QueryState>
  </div>;
}