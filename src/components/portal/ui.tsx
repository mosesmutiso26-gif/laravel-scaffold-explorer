import type { ReactNode } from "react";
import { AlertTriangle, Inbox, Lock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiError } from "@/lib/api/errors";

export function Panel({ title, action, children, className = "" }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border bg-card p-4 shadow-card ${className}`}>
      {(title || action) && <div className="mb-3 flex items-center justify-between gap-2"><h2 className="text-base font-semibold text-navy">{title}</h2>{action}</div>}
      {children}
    </section>
  );
}

export function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-card">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold text-navy">{value}</p>
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">Source: {hint}</p>}
    </div>
  );
}

const TONES: Record<string, string> = {
  good: "bg-success-soft text-success", warn: "bg-warning-soft text-warning", bad: "bg-destructive/10 text-destructive", info: "bg-info-soft text-info", neutral: "bg-muted text-muted-foreground",
};
export function statusTone(v: string) {
  const s = v.toLowerCase();
  if (/partially/.test(s)) return "warn";
  if (/(approved|active|paid|verified|published|completed|working|good|returned|closed|delivered|applied)/.test(s)) return "good";
  if (/(pending|draft|open|review|partially|marking|observed|new|contacted|booked|prepared)/.test(s)) return "warn";
  if (/(rejected|suspended|faulty|high|repair|sent home|referred|maintenance)/.test(s)) return "bad";
  if (/(issued|leave)/.test(s)) return "info";
  return "neutral";
}
export function StatusPill({ value }: { value: string }) {
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${TONES[statusTone(value)]}`}>{value}</span>;
}

export function QueryState({ isLoading, error, empty, children }: { isLoading: boolean; error: unknown; empty?: boolean; children: ReactNode }) {
  if (isLoading) return <div className="space-y-2"><Skeleton className="h-8" /><Skeleton className="h-8" /><Skeleton className="h-8" /></div>;
  if (error) {
    const e = error as ApiError;
    const forbidden = e.status === 403;
    return (
      <div className="flex items-start gap-3 rounded-lg border bg-muted/50 p-4 text-sm">
        {forbidden ? <Lock className="h-5 w-5 text-muted-foreground" /> : <AlertTriangle className="h-5 w-5 text-warning" />}
        <div><p className="font-semibold">{forbidden ? "You don't have permission to view this." : "Couldn't load this data."}</p><p className="text-muted-foreground">{e.message}</p></div>
      </div>
    );
  }
  if (empty) return <div className="flex items-center gap-2 p-6 text-sm text-muted-foreground"><Inbox className="h-5 w-5" />Nothing here yet.</div>;
  return <>{children}</>;
}
