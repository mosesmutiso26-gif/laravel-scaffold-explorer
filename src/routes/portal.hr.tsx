import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Banknote, Bandage, History, Pencil, Trash2, Check, X, Plus } from "lucide-react";
import { api } from "@/lib/api/client";
import { getSession } from "@/lib/api/config";
import { ApiError } from "@/lib/api/errors";
import { Panel, QueryState, StatusPill } from "@/components/portal/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type Leave = { id: number; staff: string; type: string; start: string; end: string; days: number; status: string; detail: string };
type Run = { id: number; period: string; status: "draft" | "prepared" | "approved" | "paid"; employees: { id: number; name: string; position: string; gross: number; deductions: number }[] };
type Slip = { id: number; name: string; position: string; payments: { id: number; label: string; qty: number; amount: number }[]; deductions: { id: number; label: string; amount: number }[] };

export const Route = createFileRoute("/portal/hr")({ component: HrPage });

const money = (n: number) => n.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const leaveIcon = (t: string) => (/sick/i.test(t) ? Bandage : /overtime/i.test(t) ? History : Banknote);

function HrPage() {
  const s = getSession();
  const canPayroll = s?.role === "hr" || s?.role === "admin";
  const canView = canPayroll || s?.role === "directors";
  const qc = useQueryClient();
  const leave = useQuery({ queryKey: ["hr-leave"], queryFn: () => api.get<Leave[]>("/hr-leave-requests"), enabled: canView });
  // Directors see staffing only — individual salaries are restricted to HR/payroll.
  const run = useQuery({ queryKey: ["payroll-run"], queryFn: () => api.get<Run>("/hr-payroll-runs/current"), enabled: canPayroll });
  const [emp, setEmp] = useState<number | null>(null);
  useEffect(() => { if (run.data && emp === null) setEmp(run.data.employees[0]?.id ?? null); }, [run.data, emp]);
  const slip = useQuery({ queryKey: ["payslip", emp], queryFn: () => api.get<Slip>(`/hr-payroll-runs/${run.data!.id}/employees/${emp}`), enabled: canPayroll && !!run.data && emp !== null });

  const onErr = (e: Error) => toast.error(e.message);
  const leaveAct = useMutation({
    mutationFn: ({ id, action }: { id: number; action: "approve" | "reject" | "delete" }) => action === "delete" ? api.del(`/hr-leave-requests/${id}`) : api.post(`/hr-leave-requests/${id}/${action}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["hr-leave"] }); toast.success("Leave request updated"); }, onError: onErr,
  });
  const workflow = useMutation({
    mutationFn: (step: "prepare" | "approve" | "mark-paid") => api.post(`/hr-payroll-runs/${run.data!.id}/${step}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["payroll-run"] }); toast.success("Payroll status updated"); }, onError: onErr,
  });
  const addLine = useMutation({
    mutationFn: (v: { kind: "payments" | "deductions"; label: string; qty: number; amount: number }) => api.post(`/hr-payroll-runs/${run.data!.id}/employees/${emp}/${v.kind}`, v),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["payslip", emp] }); qc.invalidateQueries({ queryKey: ["payroll-run"] }); toast.success("Line added"); }, onError: onErr,
  });

  if (!canView) return <QueryState isLoading={false} error={new ApiError(403, "HR and payroll are restricted to HR staff.")}>{null}</QueryState>;
  const gross = slip.data?.payments.reduce((t, p) => t + p.qty * p.amount, 0) ?? 0;
  const locked = run.data?.status !== "draft";

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-navy">HR & Payroll</h1>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <section className="rounded-2xl bg-muted p-4 shadow-card">
          <h2 className="mb-3 font-display text-3xl font-bold text-navy/80">HR</h2>
          <QueryState isLoading={leave.isLoading} error={leave.error} empty={leave.data?.length === 0}>
            <div className="divide-y rounded-lg border bg-card">
              {leave.data?.map((l) => {
                const I = leaveIcon(l.type);
                return (
                  <div key={l.id} className="flex gap-4 p-4">
                    <I className="h-10 w-10 shrink-0 text-muted-foreground" strokeWidth={1.4} />
                    <div className="min-w-0 flex-1">
                      <p className="text-lg font-semibold text-info">{l.type}</p>
                      <p className="text-sm text-foreground/80">{l.start} – {l.end}{l.days ? ` (${l.days} days)` : ""}</p>
                      {l.detail && <p className="text-sm text-muted-foreground">{l.detail}</p>}
                      <p className="text-xs text-muted-foreground">{l.staff}</p>
                      <div className="mt-2"><StatusPill value={l.status} /></div>
                    </div>
                    {canPayroll && (
                      <div className="flex items-start gap-1">
                        {l.status === "Pending" ? (
                          <>
                            <Button size="icon" variant="ghost" aria-label="Approve" onClick={() => leaveAct.mutate({ id: l.id, action: "approve" })}><Check className="text-success" /></Button>
                            <Button size="icon" variant="ghost" aria-label="Reject" onClick={() => leaveAct.mutate({ id: l.id, action: "reject" })}><X className="text-destructive" /></Button>
                          </>
                        ) : <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => toast.info("Editing approved leave requires reopening it in the HR module.")}><Pencil className="text-info" /></Button>}
                        <AlertDialog>
                          <AlertDialogTrigger asChild><Button size="icon" variant="ghost" aria-label="Delete"><Trash2 className="text-info" /></Button></AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader><AlertDialogTitle>Delete this leave record?</AlertDialogTitle></AlertDialogHeader>
                            <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => leaveAct.mutate({ id: l.id, action: "delete" })}>Delete</AlertDialogAction></AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </QueryState>
        </section>

        <section className="rounded-2xl bg-muted p-4 shadow-card">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-3xl font-bold text-navy/80">Payroll</h2>
            {run.data && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{run.data.period}</span><StatusPill value={run.data.status} />
                {run.data.status === "draft" && <Button size="sm" onClick={() => workflow.mutate("prepare")}>Prepare</Button>}
                {run.data.status === "prepared" && <Button size="sm" onClick={() => workflow.mutate("approve")}>Approve</Button>}
                {run.data.status === "approved" && <Button size="sm" variant="outline" onClick={() => workflow.mutate("mark-paid")}>Record payment confirmation</Button>}
              </div>
            )}
          </div>
          {!canPayroll ? (
            <p className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">Individual salaries are restricted to HR and payroll staff. Directors see staffing summaries only.</p>
          ) : (
            <QueryState isLoading={run.isLoading} error={run.error}>
              <div className="grid gap-4 lg:grid-cols-[180px_1fr]">
                <ul className="max-h-[420px] space-y-1 overflow-y-auto">
                  {run.data?.employees.map((e) => (
                    <li key={e.id}><button onClick={() => setEmp(e.id)} className={`w-full rounded-md px-3 py-2 text-left text-sm ${emp === e.id ? "bg-card font-semibold shadow-card" : "hover:bg-card/60"}`}>{e.name}<span className="block text-[11px] text-muted-foreground">Gross {money(e.gross)}</span></button></li>
                  ))}
                </ul>
                <div className="rounded-lg bg-card p-5">
                  <QueryState isLoading={slip.isLoading} error={slip.error}>
                    {slip.data && (
                      <>
                        <p className="text-muted-foreground">{slip.data.name}</p>
                        <table className="mt-3 w-full text-sm">
                          <thead><tr className="font-semibold"><td>Payment</td><td className="text-right">Qty</td><td className="text-right">Amount</td><td className="text-right">Total</td></tr></thead>
                          <tbody>
                            {slip.data.payments.map((p, i) => (
                              <tr key={p.id} className={i > 0 ? "[&>td]:bg-success-soft [&>td:first-child]:rounded-l-full [&>td:last-child]:rounded-r-full" : ""}>
                                <td className="px-2 py-1">{p.label}</td><td className="px-2 text-right">{p.qty}</td><td className="px-2 text-right">{money(p.amount)}</td><td className="px-2 text-right">{money(p.qty * p.amount)}</td>
                              </tr>
                            ))}
                            <tr className="font-semibold"><td className="px-2 py-1">Total Gross Pay</td><td /><td /><td className="px-2 text-right">{money(gross)}</td></tr>
                          </tbody>
                        </table>
                        <div className="mt-3 flex justify-end"><LineDialog kind="payments" disabled={locked} onSave={(v) => addLine.mutate({ kind: "payments", ...v })} /></div>
                        <table className="ml-auto mt-6 w-full max-w-xs text-sm">
                          <thead><tr className="font-semibold"><td>Deduction</td><td className="text-right">Amount</td></tr></thead>
                          <tbody>
                            {slip.data.deductions.length === 0 && <tr><td colSpan={2} className="py-1 text-muted-foreground">No deductions configured for this period.</td></tr>}
                            {slip.data.deductions.map((x) => <tr key={x.id}><td className="py-0.5">{x.label}</td><td className="text-right">{money(x.amount)}</td></tr>)}
                          </tbody>
                        </table>
                        <div className="mt-3 flex justify-end"><LineDialog kind="deductions" disabled={locked} onSave={(v) => addLine.mutate({ kind: "deductions", ...v })} /></div>
                        {locked && <p className="mt-3 text-xs text-muted-foreground">This payroll period is locked. Changes need a correction entry.</p>}
                      </>
                    )}
                  </QueryState>
                </div>
              </div>
            </QueryState>
          )}
        </section>
      </div>
    </div>
  );
}

function LineDialog({ kind, disabled, onSave }: { kind: "payments" | "deductions"; disabled: boolean; onSave: (v: { label: string; qty: number; amount: number }) => void }) {
  const [open, setOpen] = useState(false);
  const label = kind === "payments" ? "Add payment" : "Add deduction";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="outline" size="sm" disabled={disabled} className="border-2 border-chart-5 text-chart-5 hover:bg-chart-5/10 hover:text-chart-5"><Plus />{label}</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{label}</DialogTitle></DialogHeader>
        <form id={`f-${kind}`} className="space-y-3" onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const v = { label: String(fd.get("label")).trim(), qty: Number(fd.get("qty") || 1), amount: Number(fd.get("amount")) };
          if (!v.label || !v.amount) { toast.error("Enter a description and a non-zero amount."); return; }
          onSave(v); setOpen(false);
        }}>
          <div><Label htmlFor="label">Description</Label><Input id="label" name="label" maxLength={80} className="mt-1" /></div>
          {kind === "payments" && <div><Label htmlFor="qty">Quantity</Label><Input id="qty" name="qty" type="number" min={1} defaultValue={1} className="mt-1" /></div>}
          <div><Label htmlFor="amount">Amount (KES)</Label><Input id="amount" name="amount" type="number" step="0.01" className="mt-1" /></div>
        </form>
        <DialogFooter><Button type="submit" form={`f-${kind}`}>Save</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
