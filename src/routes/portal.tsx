import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Search, Bell, Menu, PanelLeftClose, PanelLeftOpen, ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/site/SiteLayout";
import { clearSession, getSession, type Session } from "@/lib/api/config";
import { DashboardIcon, HrIcon, roleByKey, ROLES, SECTIONS } from "@/lib/roles";
import { WORKSPACE_PAGES } from "@/lib/workspace-pages";

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
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const nav = useNavigate();
  useEffect(() => { if (session === null) nav({ to: "/login" }); }, [session, nav]);
  useEffect(() => { setSearch(""); setMobileOpen(false); }, [pathname]);
  if (!session) return null;
  const workspaceRole = pathname.match(/^\/portal\/workspace\/([^/]+)/)?.[1];
  const dashboardRole = pathname.match(/^\/portal\/([^/]+)$/)?.[1];
  const activeRole = session.role === "admin" ? roleByKey(workspaceRole ?? dashboardRole ?? "") ?? roleByKey("admin") : roleByKey(session.role);
  const role = activeRole;
  const pages = WORKSPACE_PAGES[role?.key ?? ""];
  const groups = [...new Set(pages?.map((p) => p.group) ?? [])];
  const matchesSearch = (label: string) => label.toLowerCase().includes(search.toLowerCase());
  const cls = "flex min-w-0 items-center gap-3 rounded-md border-l-4 border-transparent px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent data-[status=active]:border-primary data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-accent-foreground";
  const isMini = collapsed && !mobileOpen;

  const Sidebar = (
    <nav aria-label="Portal navigation" className="flex flex-col gap-0.5 p-3">
      {!isMini && <><div className="mb-4 px-2"><Logo /></div><div className="relative mb-4"><Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" /><Input aria-label="Search pages" placeholder="Search pages" value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 pl-8" /></div></>}
      {session.role === "admin" && role?.key !== "admin" && <Link to="/portal/$role" params={{ role: "admin" }} className={cls} title="All portals"><ArrowLeft className="h-4 w-4 shrink-0" />{!isMini && <span>All portals</span>}</Link>}
      {pages && role ? groups.map((group) => {
        const items = pages.filter((p) => p.group === group && matchesSearch(p.label));
        if (!items.length) return null;
        return <div key={group} className="mb-2">{!isMini && <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase text-muted-foreground">{group}</p>}{items.map((p) => {
          const content = <><p.icon className="h-4 w-4 shrink-0" />{!isMini && <span className="min-w-0 break-words">{p.label}</span>}</>;
          if (p.key === "dashboard") {
            if (role.dashboardPath === "/portal/teacher" || role.dashboardPath === "/portal/hr") return <Link key={p.key} to={role.dashboardPath} activeOptions={{ exact: true, includeSearch: true }} className={cls} title={p.label}>{content}</Link>;
            return <Link key={p.key} to="/portal/$role" params={{ role: role.key }} activeOptions={{ exact: true }} className={cls} title={p.label}>{content}</Link>;
          }
          if (role.key === "hr" && ["leave", "payroll", "payslips", "approvals"].includes(p.key)) return <Link key={p.key} to="/portal/hr" search={{ view: p.key === "leave" || p.key === "approvals" ? "leave" : "payroll" }} activeOptions={{ exact: true, includeSearch: true }} className={cls} title={p.label}>{content}</Link>;
          if (role.key === "teacher" && ["students", "attendance", "assessments", "notifications"].includes(p.key)) return <Link key={p.key} to="/portal/section/$key" params={{ key: p.key }} className={cls} title={p.label}>{content}</Link>;
          return <Link key={p.key} to="/portal/workspace/$role/$page" params={{ role: role.key, page: p.key }} className={cls} title={p.label}>{content}</Link>;
        })}</div>;
      }) : <>
        <NavLink to={role?.dashboardPath ?? "/portal/$role"} role={session.role} icon={DashboardIcon} label="Dashboard" exact />
        {(session.role === "admin" || session.role === "directors") && <NavLink to="/portal/hr" icon={HrIcon} label="HR & Payroll" />}
        {role?.sections.filter((k) => matchesSearch(SECTIONS[k]?.title ?? "")).map((k) => { const s = SECTIONS[k]; if (!s) return null; return <NavLink key={k} to="/portal/section/$key" sectionKey={k} icon={s.icon} label={s.title} />; })}
      </>}
      {(role?.key === "admin" || role?.key === "deputy" || role?.key === "admissions") && <>
        {!isMini && <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase text-muted-foreground">School operations</p>}
        {[{ key: "teacher", page: "classes", label: "Academics", icon: DashboardIcon }, { key: "finance", page: "dashboard", label: "Finance", icon: DashboardIcon }, { key: "directors", page: "reports", label: "Reports", icon: DashboardIcon }].filter((p) => matchesSearch(p.label)).map((p) => role?.key === "admin" ? <Link key={p.label} to="/portal/workspace/$role/$page" params={{ role: p.key, page: p.page }} className={cls}><p.icon className="h-4 w-4 shrink-0" />{!isMini && p.label}</Link> : null)}
      </>}
      {session.role === "admin" && <details open className="mt-3"><summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground"><ChevronDown className="h-4 w-4" />{!isMini && "Portals"}</summary>{ROLES.filter((r) => r.key !== "admin" && matchesSearch(r.label)).map((r) => {
        const I = SECTIONS[r.sections[0] ?? ""]?.icon ?? DashboardIcon;
        const content = <><I className="h-4 w-4 shrink-0" />{!isMini && <span className="min-w-0 break-words">{r.label}</span>}</>;
        if (r.dashboardPath === "/portal/teacher" || r.dashboardPath === "/portal/hr") return <Link key={r.key} to={r.dashboardPath} className={cls} title={r.label}>{content}</Link>;
        return <Link key={r.key} to="/portal/$role" params={{ role: r.key }} className={cls} title={r.label}>{content}</Link>;
      })}</details>}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-muted">
      <aside className={`sticky top-0 hidden h-screen shrink-0 overflow-y-auto border-r bg-sidebar lg:block ${collapsed ? "w-20" : "w-72"}`}>{Sidebar}</aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-card px-4">
          <Button size="icon" variant="ghost" className="hidden lg:inline-flex" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} title={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={() => setCollapsed(!collapsed)}>{collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}</Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild><Button size="icon" variant="ghost" className="lg:hidden" aria-label="Open menu"><Menu /></Button></SheetTrigger>
            <SheetContent side="left" className="w-72 overflow-y-auto p-0">{Sidebar}</SheetContent>
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
