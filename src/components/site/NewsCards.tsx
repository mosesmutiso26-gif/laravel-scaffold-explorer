import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowRight } from "lucide-react";
import { api } from "@/lib/api/client";
import { Skeleton } from "@/components/ui/skeleton";
import campus from "@/assets/campus.jpg";
import science from "@/assets/science.jpg";
import sports from "@/assets/sports.jpg";

const IMG: Record<string, string> = { campus, science, sports };
type News = { id: number; title: string; date: string; excerpt: string; image?: string };

/** Public news, sourced from the CMS announcements endpoint (GET /cms-announcements). */
export function NewsCards({ limit = 3 }: { limit?: number }) {
  const q = useQuery({ queryKey: ["cms-announcements"], queryFn: () => api.get<News[]>("/cms-announcements") });
  if (q.isLoading) return <div className="grid gap-4 md:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-32" />)}</div>;
  if (q.isError) return <p className="rounded-lg border bg-muted p-4 text-sm text-muted-foreground">News is unavailable right now: {(q.error as Error).message}</p>;
  if (!q.data?.length) return <p className="text-sm text-muted-foreground">No news published yet.</p>;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {q.data.slice(0, limit).map((n, i) => (
        <article key={n.id} className="flex gap-3 rounded-xl border bg-card p-2 shadow-card">
          <img src={IMG[n.image ?? ""] ?? [science, sports, campus][i % 3]} alt="" loading="lazy" width={1024} height={640} className="h-28 w-36 rounded-lg object-cover" />
          <div className="py-1">
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground"><Calendar className="h-3 w-3 text-highlight" />{new Date(n.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
            <h3 className="mt-1 text-sm font-bold text-navy">{n.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{n.excerpt}</p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary">Read More <ArrowRight className="h-3 w-3" /></span>
          </div>
        </article>
      ))}
    </div>
  );
}
