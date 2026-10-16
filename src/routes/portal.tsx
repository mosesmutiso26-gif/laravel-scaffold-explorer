import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Search, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/site/SiteLayout";
import { clearSession, getSession, type Session } from "@/lib/api/config";
import { DashboardIcon, HrIcon, roleByKey, SECTIONS } from "@/lib/roles";

export const Route = createFileRoute("/portal")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Portal — Riverside Academy" },
      { name: "description", content: "Riverside Academy school management portal." },
      { property: "og:title", content: "Portal — Riverside Academy" },
      { property: "og:description", content: "School management portal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PortalLayout,
});

function PortalLayout() {
  const [session] = useState<Session | null>(() => getSession());
  const nav = useNavigate();
  useEffect(() => { if (session === null) nav({ to: "/login" }); }, [session, nav]);
  if (!session) return null;
  const role = roleByKey(session.role);

  const Sidebar = (
    <nav className="flex flex-col gap-0.5 p-3">
      <div className="mb-4 px-2"><Logo /></div>
      <div className="relative mb-4"><Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search" className="h-9 pl-8" /></div>
      <NavLink to={role?.dashboardPath ?? "/portal/$role"} role={session.role} icon={DashboardIcon} label="Dashboard" exact />
      {(session.role === "admin" || session.role === "directors") && <NavLink to="/portal/hr" icon={HrIcon} label="HR & Payroll" />}
      {role?.sections.map((k) => { const s = SECTIONS[k]; if (!s) return null; return <NavLink key={k} to="/portal/section/$key" sectionKey={k} icon={s.icon} label={s.title} />; })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-muted">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-r bg-sidebar lg:block">{Sidebar}</aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-card px-4">
          <Sheet>
            <SheetTrigger asChild><Button size="icon" variant="ghost" className="lg:hidden" aria-label="Open menu"><Menu /></Button></SheetTrigger>
            <SheetContent side="left" className="w-64 overflow-y-auto p-0">{Sidebar}</SheetContent>
          </Sheet>
          <div className="min-w-0 flex-1 truncate text-sm font-semibold text-navy">{role?.label ?? session.role} portal</div>
          {session.mode === "demo" && <span className="rounded-full bg-warning-soft px-3 py-1 text-xs font-semibold text-warning">Demo data</span>}
          <Button asChild size="icon" variant="ghost" aria-label="Notifications"><Link to="/portal/section/$key" params={{ key: "notifications" }}><Bell /></Link></Button>
          <div className="hidden text-right text-xs sm:block"><div className="font-semibold">{session.name}</div><div className="text-muted-foreground">{session.email}</div></div>
          <Button size="icon" variant="ghost" aria-label="Sign out" onClick={() => { clearSession(); nav({ to: "/login" }); }}><LogOut /></Button>
        </header>
        <main className="flex-1 p-4 md:p-6"><Outlet /></main>
      </div>
    </div>
  );
}

type NavProps = { icon: typeof DashboardIcon; label: string; exact?: boolean } & (
  | { to: "/portal/teacher" | "/portal/hr"; role?: string; sectionKey?: undefined }
  | { to: "/portal/$role"; role: string; sectionKey?: undefined }
  | { to: "/portal/section/$key"; sectionKey: string; role?: undefined }
);
function NavLink(p: NavProps) {
  const cls = "flex items-center gap-3 rounded-md border-l-4 border-transparent px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent data-[status=active]:border-primary data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-accent-foreground";
  const inner = <><p.icon className="h-4 w-4" />{p.label}</>;
  if (p.to === "/portal/section/$key") return <Link to={p.to} params={{ key: p.sectionKey }} className={cls}>{inner}</Link>;
  if (p.to === "/portal/$role") return <Link to={p.to} params={{ role: p.role }} className={cls}>{inner}</Link>;
  return <Link to={p.to} className={cls}>{inner}</Link>;
}
