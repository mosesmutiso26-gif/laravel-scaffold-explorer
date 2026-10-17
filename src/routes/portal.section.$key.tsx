import { createFileRoute } from "@tanstack/react-router";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowUpDown, Download, Search } from "lucide-react";
import { api } from "@/lib/api/client";
import { getSession } from "@/lib/api/config";
import { ApiError } from "@/lib/api/errors";
import { roleByKey, SECTIONS } from "@/lib/roles";
import { Panel, QueryState, StatusPill } from "@/components/portal/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Page = { data: Record<string, string | number | boolean>[]; meta: { current_page: number; last_page: number; total: number } };

export const Route = createFileRoute("/portal/section/$key")({
  head: ({ params }) => {
    const title = `${SECTIONS[params.key]?.title ?? "Records"} — Riverside Academy`;
    const description = `Riverside Academy ${SECTIONS[params.key]?.title ?? "school"} records.`;
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] };
  },
  component: SectionPage,
});

function SectionPage() {
  const { key } = Route.useParams();
  const sec = SECTIONS[key];
  const session = getSession();
  const allowed = !!sec && (session?.role === "admin" || !!roleByKey(session?.role ?? "")?.sections.includes(key));
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ k: string; d: "asc" | "desc" } | null>(null);
  const qs = new URLSearchParams({ page: String(page), per_page: "10", ...(search ? { search } : {}), ...(sort ? { sort: sort.k, direction: sort.d } : {}) });
  const q = useQuery({ queryKey: [key, page, search, sort], queryFn: () => { if (!sec) throw new ApiError(404, "Unknown section."); return api.get<Page>(`${sec.endpoint}?${qs}`); }, enabled: allowed, placeholderData: keepPreviousData });
  const qc = useQueryClient();
  const markRead = useMutation({ mutationFn: (id: number) => api.patch(`/notifications/${id}/read`), onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }) });

  if (!sec) return <QueryState isLoading={false} error={new ApiError(404, "Unknown section.")}>{null}</QueryState>;
  if (!allowed) return <QueryState isLoading={false} error={new ApiError(403, "Your role can't open this section.")}>{null}</QueryState>;

  function exportCsv() {
    if (!sec) return;
    const rows = q.data?.data ?? [];
    const csv = [sec.columns.map((c) => c.label).join(","), ...rows.map((r) => sec.columns.map((c) => `"${String(r[c.key] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `${key}-page${page}.csv`;
    a.click();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-navy">{sec.title}</h1>
      <Panel
        title={<span className="text-sm font-normal text-muted-foreground">{q.data ? `${q.data.meta.total} records` : " "}</span>}
        action={
          <div className="flex gap-2">
            <div className="relative"><Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" /><Input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search…" className="h-9 w-48 pl-8" /></div>
            <Button variant="outline" size="sm" onClick={exportCsv} disabled={!q.data?.data.length}><Download />Export</Button>
          </div>
        }
      >
        <QueryState isLoading={q.isLoading} error={q.error} empty={q.data?.data.length === 0}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {sec.columns.map((c) => (
                    <TableHead key={c.key}>
                      <Button variant="ghost" size="sm" className="px-0" onClick={() => setSort({ k: c.key, d: sort?.k === c.key && sort.d === "asc" ? "desc" : "asc" })}>{c.label}<ArrowUpDown className="h-3 w-3" /></Button>
                    </TableHead>
                  ))}
                  {key === "notifications" && <TableHead />}
                </TableRow>
              </TableHeader>
              <TableBody>
                {q.data?.data.map((r) => (
                  <TableRow key={String(r["id"])}>
                    {sec.columns.map((c) => (
                      <TableCell key={c.key}>{c.key === "status" ? <StatusPill value={String(r[c.key])} /> : typeof r[c.key] === "boolean" ? (r[c.key] ? "Yes" : "No") : typeof r[c.key] === "number" ? Number(r[c.key]).toLocaleString() : String(r[c.key] ?? "—")}</TableCell>
                    ))}
                    {key === "notifications" && <TableCell>{!r["read"] && <Button size="sm" variant="ghost" onClick={() => markRead.mutate(Number(r["id"]))}>Mark read</Button>}</TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-3 flex items-center justify-end gap-2 text-sm">
            <span className="text-muted-foreground">Page {q.data?.meta.current_page} of {q.data?.meta.last_page}</span>
            <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button>
            <Button size="sm" variant="outline" disabled={page >= (q.data?.meta.last_page ?? 1)} onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </QueryState>
      </Panel>
    </div>
  );
}
