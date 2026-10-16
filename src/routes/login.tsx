import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_BASE_URL, getMode, saveSession, setMode, type DataMode } from "@/lib/api/config";
import { apiRequest } from "@/lib/api/client";
import { ROLES } from "@/lib/roles";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Portal Login — Riverside Academy" },
      { name: "description", content: "Sign in to the Riverside Academy staff, parent and student portals." },
      { property: "og:title", content: "Portal Login — Riverside Academy" },
      { property: "og:description", content: "Sign in to the school portals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [mode, setM] = useState<DataMode>("demo");
  const [role, setRole] = useState("teacher");
  const [busy, setBusy] = useState(false);
  useEffect(() => setM(getMode()), []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMode(mode);
    const fd = new FormData(e.currentTarget);
    if (mode === "demo") {
      const r = ROLES.find((x) => x.key === role)!;
      saveSession({ token: "demo", role, name: `Demo ${r.label}`, email: `${role}@demo.riverside`, mode });
      nav({ to: "/portal" });
      return;
    }
    setBusy(true);
    try {
      const res = await apiRequest<{ token: string; user: { name: string; email: string; roles?: (string | { name: string })[] } }>("POST", "/auth/login", { email: fd.get("email"), password: fd.get("password") });
      const first = res.user.roles?.[0];
      const roleKey = typeof first === "string" ? first : first?.name ?? "teacher";
      saveSession({ token: res.token, role: roleKey, name: res.user.name, email: res.user.email, mode });
      nav({ to: "/portal" });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-primary-soft px-4">
      <form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-2xl bg-card p-8 shadow-card">
        <Logo />
        <h1 className="text-2xl font-bold text-navy">Sign in to the portal</h1>
        <Tabs value={mode} onValueChange={(v) => setM(v as DataMode)}>
          <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="demo">Demo</TabsTrigger><TabsTrigger value="live">Laravel server</TabsTrigger></TabsList>
        </Tabs>
        {mode === "demo" ? (
          <div className="space-y-2">
            <Label>Explore as</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{ROLES.map((r) => <SelectItem key={r.key} value={r.key}>{r.label}</SelectItem>)}</SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Demo mode uses made-up sample records stored only in this browser tab.</p>
          </div>
        ) : (
          <>
            {!API_BASE_URL && <p className="rounded-md bg-warning-soft p-3 text-xs">The Laravel server address hasn't been set yet, so live sign-in won't work until it is.</p>}
            <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required className="mt-1" /></div>
            <div><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" required className="mt-1" /></div>
          </>
        )}
        <Button type="submit" className="w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</Button>
      </form>
    </div>
  );
}
