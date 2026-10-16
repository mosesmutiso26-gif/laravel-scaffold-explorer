import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, BarChart3, Bell, BookOpen, Building2, Calendar, CheckCircle2, ChevronDown, ClipboardList, Clock3, FileText, Gavel, GraduationCap, LayoutDashboard, Menu, MoreHorizontal, Plus, Search, Settings, ShieldCheck, TrendingUp, Users, Wallet, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/directors.css';
import { useDirectorsDemo, type BoardResolution, type InstitutionalRisk } from '@/data/directorsDemo';

type Nav = { label: string; path: string; icon: LucideIcon; group: string };
const nav: Nav[] = [
  { label: 'Executive Overview', path: '/directors/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Notifications', path: '/directors/notifications', icon: Bell, group: 'Workspace' },
  { label: 'Strategic Scorecard', path: '/directors/scorecard', icon: TrendingUp, group: 'Strategy' },
  { label: 'Risk & Compliance', path: '/directors/risks', icon: ShieldCheck, group: 'Strategy' },
  { label: 'Academic Oversight', path: '/directors/academic', icon: BookOpen, group: 'Oversight' },
  { label: 'Enrollment & Attendance', path: '/directors/enrollment', icon: Users, group: 'Oversight' },
  { label: 'Financial Governance', path: '/directors/finance', icon: Wallet, group: 'Oversight' },
  { label: 'Procurement & Assets', path: '/directors/procurement', icon: ClipboardList, group: 'Oversight' },
  { label: 'Staffing', path: '/directors/staffing', icon: Users, group: 'Oversight' },
  { label: 'Student Welfare', path: '/directors/welfare', icon: ShieldCheck, group: 'Oversight' },
  { label: 'Infrastructure Projects', path: '/directors/projects', icon: Building2, group: 'Oversight' },
  { label: 'Board Meetings', path: '/directors/meetings', icon: Calendar, group: 'Governance' },
  { label: 'Decisions & Resolutions', path: '/directors/resolutions', icon: Gavel, group: 'Governance' },
  { label: 'Reports & Board Packs', path: '/directors/reports', icon: FileText, group: 'Governance' },
  { label: 'Audit History', path: '/directors/audit', icon: BarChart3, group: 'Controls' },
  { label: 'Settings', path: '/directors/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Strategy', 'Oversight', 'Governance', 'Controls', 'Account'];

export function DirectorsPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useDirectorsDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('Term 3, 2026');
  const current = nav.find((item) => location.pathname.startsWith(item.path)) ?? nav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const unreadNotifications = demo.notifications.filter((n) => n.unread);
  const pendingResolutions = demo.resolutions.filter((r) => r.status === 'Pending Review' || r.status === 'Clarification Requested');
  const criticalRisks = demo.risks.filter((r) => r.rating === 'Critical' && r.status !== 'Closed');
  const overdueCompliance = demo.compliance.filter((c) => c.status === 'Overdue');

  return <div className="dg-app">
    <aside className={`dg-sidebar ${mobile ? 'open' : ''}`}>
      <div className="dg-brand"><div className="dg-brand-mark"><GraduationCap size={21} /></div><div><strong>Riverside</strong><span>Board of Directors</span></div><button className="dg-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div>
      <div className="dg-demo-pill"><span className="dg-demo-dot" /> DEMO MODE <span>·</span> October 2026</div>
      <div className="dg-school"><div>RA</div><span><strong>Riverside Academy</strong><small>Board Governance Portal</small></span><ChevronDown size={15} /></div>
      <nav className="dg-nav">{groups.map((group) => <div className="dg-nav-group" key={group}><p>{group}</p>{nav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={`dg-nav-item${current.path === path || (path !== '/directors/dashboard' && location.pathname.startsWith(path)) ? ' active' : ''}`} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Notifications' && unreadNotifications.length > 0 && <em>{unreadNotifications.length}</em>}{label === 'Decisions & Resolutions' && pendingResolutions.length > 0 && <em>{pendingResolutions.length}</em>}{label === 'Risk & Compliance' && criticalRisks.length > 0 && <em className="badge-red" style={{ background: '#fce8e8', color: '#c44' }}>{criticalRisks.length}</em>}</button>)}</div>)}</nav>
      <div className="dg-sidebar-footer"><div className="dg-user"><div className="dg-avatar">WK</div><span><strong>Wanjiku Kamau</strong><small>Board Chair</small></span><MoreHorizontal size={16} /></div></div>
    </aside>
    {mobile && <button className="dg-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="dg-main"><header className="dg-topbar"><button className="dg-menu-button" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="dg-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="dg-top-actions"><div className="dg-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search risks, meetings, resolutions..." /></div><button className="dg-icon-button" onClick={() => navigateTo('/directors/notifications')} aria-label="Notifications"><Bell size={18} />{unreadNotifications.length > 0 && <i />}</button><button className="dg-profile" onClick={() => navigateTo('/directors/settings')}><div className="dg-avatar">WK</div><span>Wanjiku K.</span><ChevronDown size={15} /></button></div></header>
      <div className="dg-content"><div className="dg-context"><div><span className="dg-kicker"><ShieldCheck size={14} /> Directors' Governance Portal <b>•</b> 2026 · Term 3 · 16 Oct</span><h1>{current.label}</h1><p>{desc(location.pathname)}</p></div><div className="dg-period-selector"><select value={period} onChange={(e) => setPeriod(e.target.value)}><option>Term 3, 2026</option><option>Term 2, 2026</option><option>Term 1, 2026</option><option>Full Year 2026</option><option>Q4 2026</option></select></div></div><RouteView path={location.pathname} demo={demo} navigateTo={navigateTo} /></div></main>
  </div>;
}

function desc(path: string): string {
  if (path.includes('dashboard')) return 'Authoritative institutional indicators — students, staff, finance, risks and board actions at a glance.';
  if (path.includes('scorecard')) return 'Strategic performance scorecard across 10 institutional pillars with targets, actuals and corrective actions.';
  if (path.includes('risks')) return 'Institutional risk register and compliance items with mitigation tracking and review schedules.';
  if (path.includes('academic')) return 'Aggregate academic oversight — performance by subject, trends and completion rates.';
  if (path.includes('enrollment')) return 'Enrollment by section, retention, attendance trends and boarding capacity.';
  if (path.includes('finance')) return 'Read-only financial governance — budget vs actual, verified collections and expenditure.';
  if (path.includes('procurement')) return 'Procurement commitments, asset summaries and maintenance backlog.';
  if (path.includes('staffing')) return 'Staff establishment, gaps, appraisal completion and departmental coverage.';
  if (path.includes('welfare')) return 'Aggregate welfare indicators — boarding, transport, health, safeguarding and safety.';
  if (path.includes('projects')) return 'Strategic project portfolio — scope, budget, milestones and decisions needed.';
  if (path.includes('meeting')) return 'Board meeting lifecycle — agenda, attendees, minutes and action tracking.';
  if (path.includes('resolution')) return 'Board resolutions and delegated decisions with vote records and audit trails.';
  if (path.includes('report')) return 'Board-ready report generation with permission-checked sources and export tracking.';
  if (path.includes('notification')) return 'Executive briefing — critical risks, overdue decisions, meetings and compliance deadlines.';
  if (path.includes('audit')) return 'Audit trail of sensitive views, exports and governance decisions.';
  return 'Director portal settings — preferences, notification configuration and access management.';
}

function RouteView({ path, demo, navigateTo }: { path: string; demo: ReturnType<typeof useDirectorsDemo>; navigateTo: (p: string) => void }) {
  if (path === '/directors/dashboard' || path === '/directors') return <Dashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/directors/notifications')) return <NotificationsView demo={demo} />;
  if (path.startsWith('/directors/scorecard')) return <ScorecardView demo={demo} />;
  if (path.startsWith('/directors/risks')) return <RiskComplianceView demo={demo} />;
  if (path.startsWith('/directors/academic')) return <AcademicView demo={demo} />;
  if (path.startsWith('/directors/enrollment')) return <EnrollmentView demo={demo} />;
  if (path.startsWith('/directors/finance')) return <FinanceView demo={demo} />;
  if (path.startsWith('/directors/procurement')) return <ProcurementView demo={demo} />;
  if (path.startsWith('/directors/staffing')) return <StaffingView demo={demo} />;
  if (path.startsWith('/directors/welfare')) return <WelfareView demo={demo} />;
  if (path.startsWith('/directors/projects')) return <ProjectsView demo={demo} />;
  if (path.startsWith('/directors/meetings')) return <MeetingsView demo={demo} />;
  if (path.startsWith('/directors/resolutions')) return <ResolutionsView demo={demo} />;
  if (path.startsWith('/directors/reports')) return <ReportsView demo={demo} />;
  if (path.startsWith('/directors/audit')) return <AuditView demo={demo} />;
  if (path.startsWith('/directors/settings')) return <SettingsView demo={demo} />;
  return <SettingsView demo={demo} />;
}

function SettingsView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  const [message, setMessage] = useState('');
  return <>
    <Panel title="Director profile & preferences" subtitle="Account and notification preferences for the board governance portal.">
      <form className="dg-settings-form" onSubmit={(e) => { e.preventDefault(); setMessage('Demo: Preferences saved locally. In production, changes persist via the authenticated service.'); }}>
        <label>Display name<input defaultValue="Wanjiku Kamau" /></label>
        <label>Role<select defaultValue="Board Chair"><option>Board Chair</option><option>Director</option><option>Secretary</option></select></label>
        <label>Notification preference<select defaultValue="Critical only"><option>Critical only</option><option>All governance items</option><option>Weekly digest</option></select></label>
        <label>Default reporting period<select defaultValue="Term 3, 2026"><option>Term 3, 2026</option><option>Full Year 2026</option><option>Q4 2026</option></select></label>
        <button type="submit" className="dg-button primary">Save preferences</button>
        {message && <div className="dg-form-note" style={{ marginTop: 12 }}><CheckCircle2 size={16} /> {message}</div>}
      </form>
    </Panel>
    <Panel title="Security and access" subtitle="Board-level access controls and session management.">
      <div className="dg-record-list">
        <div className="dg-record-row"><div><strong>Password and active sessions</strong><span>Change password or review signed-in devices</span></div><button className="dg-button secondary" onClick={() => alert('Demo: Security settings would open here. In production, handled by the authentication service.')}>Open security</button></div>
        <div className="dg-record-row"><div><strong>Two-factor authentication</strong><span>Enhanced protection for governance actions</span></div><span className="dg-status warning">Not enabled</span><button className="dg-button secondary" onClick={() => alert('Demo: 2FA setup would begin here.')}>Enable</button></div>
        <div className="dg-record-row"><div><strong>Audit trail access</strong><span>Your governance actions are logged for compliance</span></div><span className="dg-status good">Active</span></div>
      </div>
    </Panel>
    <Panel title="Demo data controls" subtitle="Reset the demo workspace to its initial state.">
      <div className="dg-record-list">
        <div className="dg-record-row"><div><strong>Reset all demo data</strong><span>Restores notifications, resolutions, risks and meetings to defaults</span></div><button className="dg-button secondary" onClick={() => { demo.reset(); setMessage('Demo data has been reset to defaults.'); }}>Reset data</button></div>
      </div>
    </Panel>
  </>;
}

function Panel({ title, subtitle, children, action }: { title: string; subtitle?: string; children: ReactNode; action?: ReactNode }) {
  return <div className="dg-panel"><div className="dg-panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>{children}</div>;
}
function Metric({ icon: Icon, label, value, detail, tone, trend, trendValue, onClick }: { icon: LucideIcon; label: string; value: string; detail: string; tone?: string; trend?: 'up' | 'down' | 'flat' | 'none'; trendValue?: string; onClick?: () => void }) {
  return <button className="dg-metric" onClick={onClick}><div className={`dg-metric-icon ${tone ?? 'navy'}`}><Icon size={18} /></div><span>{label}</span><strong>{value}</strong>{trend && trend !== 'none' && <span className={`trend-${trend}`}>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}</span>}<small>{detail}</small></button>;
}

function Dashboard({ demo, navigateTo }: { demo: ReturnType<typeof useDirectorsDemo>; navigateTo: (p: string) => void }) {
  const pendingRes = demo.resolutions.filter((r) => r.status === 'Pending Review' || r.status === 'Clarification Requested');
  const overdueRes = demo.resolutions.filter((r) => r.status === 'Deferred' && r.deadline < '2026-10-28');
  const criticalRisks = demo.risks.filter((r) => r.rating === 'Critical' && r.status !== 'Closed');
  const upcomingMeeting = demo.meetings.find((m) => m.status === 'Published' || m.status === 'Scheduled');
  return <>
    <div className="dg-kpi-grid">
      <Metric icon={Users} label="Enrolled students" value="1,248" detail="96% capacity · Target: 1,300" trend="up" trendValue="+6.8%" tone="blue" onClick={() => navigateTo('/directors/enrollment')} />
      <Metric icon={CheckCircle2} label="Attendance rate" value="94.2%" detail="1,176 present · 14 unexplained" trend="up" trendValue="+1.4%" tone="green" onClick={() => navigateTo('/directors/enrollment')} />
      <Metric icon={Wallet} label="Fee collection" value="KES 18.4M" detail="79.3% · Outstanding: KES 4.8M" trend="up" trendValue="+8.4%" tone="teal" onClick={() => navigateTo('/directors/finance')} />
      <Metric icon={TrendingUp} label="School mean score" value="68.4%" detail="Target: 72% · Baseline: 64.2%" trend="up" trendValue="+2.1%" tone="navy" onClick={() => navigateTo('/directors/academic')} />
    </div>
    <div className="dg-kpi-grid">
      <Metric icon={ShieldCheck} label="Open risks" value={String(demo.risks.filter((r) => r.status !== 'Closed').length)} detail={`${criticalRisks.length} critical · 3 high`} trend="down" trendValue="-2" tone="red" onClick={() => navigateTo('/directors/risks')} />
      <Metric icon={Gavel} label="Pending decisions" value={String(pendingRes.length)} detail={`${overdueRes.length} overdue`} trend="none" tone="gold" onClick={() => navigateTo('/directors/resolutions')} />
      <Metric icon={Calendar} label="Next board meeting" value="28 Oct" detail={upcomingMeeting?.title ?? 'Not scheduled'} trend="none" tone="blue" onClick={() => navigateTo('/directors/meetings')} />
      <Metric icon={AlertTriangle} label="Overdue compliance" value={String(demo.compliance.filter((c) => c.status === 'Overdue').length)} detail="Fire safety · Boarding license" trend="none" tone="red" onClick={() => navigateTo('/directors/risks')} />
    </div>
    <div className="dg-main-grid">
      <Panel title="Executive briefing — 16 October 2026" subtitle={`${demo.notifications.filter((n) => n.unread).length} unread item(s)`} action={<button className="dg-link" onClick={() => navigateTo('/directors/notifications')}>View all</button>}>
        <div className="dg-record-list">{demo.notifications.filter((n) => n.unread).slice(0, 5).map((n) => <div className="dg-record-row" key={n.id}>
          <div><strong>{n.title}</strong><span>{n.message}</span><small>{n.category} · {n.time}</small></div>
          <span className={`dg-badge ${n.severity === 'Critical' ? 'critical' : n.severity === 'Warning' ? 'warning' : 'info'}`}>{n.severity}</span>
        </div>)}</div>
      </Panel>
      <Panel title="Pending board resolutions" subtitle={`${pendingRes.length} awaiting decision`} action={<button className="dg-link" onClick={() => navigateTo('/directors/resolutions')}>Open centre</button>}>
        <div className="dg-record-list">{pendingRes.slice(0, 4).map((r) => <div className="dg-record-row" key={r.id}>
          <div><strong>{r.ref} — {r.title}</strong><span>Submitted by {r.submittedBy} · Deadline: {r.deadline}</span></div>
          <span className={`dg-status ${r.status === 'Pending Review' ? 'warning' : 'info'}`}>{r.status}</span>
        </div>)}</div>
      </Panel>
    </div>
    <div className="dg-main-grid">
      <Panel title="Critical risks" subtitle={`${criticalRisks.length} critical risk(s) requiring attention`}>
        <div className="dg-record-list">{criticalRisks.map((r) => <div className="dg-record-row" key={r.id}>
          <div><strong>{r.ref} — {r.title}</strong><span>Owner: {r.owner} · Review: {r.reviewDate}</span></div>
          <span className="dg-badge critical">{r.rating}</span>
          <span className={`dg-status ${r.status === 'Open' ? 'bad' : 'warning'}`}>{r.status}</span>
        </div>)}</div>
      </Panel>
      <Panel title="Strategic projects at risk" subtitle="Projects requiring board decisions">
        <div className="dg-record-list">{demo.projects.filter((p) => p.status === 'At Risk' || p.status === 'Delayed').map((p) => <div className="dg-record-row" key={p.id}>
          <div><strong>{p.name}</strong><span>{p.completion}% complete · {p.milestones}</span><small>{p.decisionNeeded}</small></div>
          <span className={`dg-status ${p.status === 'Delayed' ? 'bad' : 'warning'}`}>{p.status}</span>
        </div>)}</div>
      </Panel>
    </div>
    <Panel title="Budget vs actual — Term 3 2026" subtitle="Authoritative figures from finance module — verified receipts only" action={<button className="dg-link" onClick={() => navigateTo('/directors/finance')}>Full breakdown</button>}>
      <div className="dg-table-wrap"><table className="dg-table"><thead><tr><th>Category</th><th>Budget</th><th>Actual</th><th>Variance</th><th>Var %</th><th>Status</th></tr></thead>
      <tbody>{demo.financials.slice(0, 5).map((f) => <tr key={f.id}><td><strong>{f.category}</strong></td><td>{f.budget}</td><td>{f.actual}</td><td>{f.variance}</td><td>{f.variancePct}</td><td><span className={`dg-status ${f.status === 'Favourable' ? 'good' : f.status === 'Unfavourable' ? 'bad' : 'neutral'}`}>{f.status}</span></td></tr>)}</tbody></table></div>
    </Panel>
  </>;
}

function NotificationsView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  return <Panel title="Executive briefing centre" subtitle={`${demo.notifications.length} notification(s) — ${demo.notifications.filter((n) => n.unread).length} unread`}>
    <div className="dg-record-list">{demo.notifications.map((n) => <div className="dg-record-row" key={n.id}>
      <div><strong>{n.title}</strong><span>{n.message}</span><small>{n.category} · {n.time}</small></div>
      <span className={`dg-badge ${n.severity === 'Critical' ? 'critical' : n.severity === 'Warning' ? 'warning' : 'info'}`}>{n.severity}</span>
      <span className={`dg-status ${n.unread ? 'warning' : 'neutral'}`}>{n.unread ? 'New' : 'Read'}</span>
      <div className="dg-row-actions">{n.unread && <button className="dg-link" onClick={() => demo.markNotificationRead(n.id)}>Mark read</button>}</div>
    </div>)}</div>
  </Panel>;
}

function ScorecardView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  const statusColor = (s: string) => s === 'On Track' ? 'good' : s === 'Exceeded' ? 'good' : s === 'At Risk' ? 'warning' : s === 'Behind' ? 'bad' : 'neutral';
  return <Panel title="Strategic performance scorecard" subtitle="10 institutional pillars with versioned targets and verified actuals">
    {demo.scorecard.map((s) => <div className="dg-scorecard-item" key={s.id}>
      <div className="dg-scorecard-pillar">{s.pillar}</div>
      <div className="dg-scorecard-objective">{s.objective}</div>
      <div className="dg-scorecard-meta">
        <span>KPI<b>{s.kpi}</b></span>
        <span>Baseline<b>{s.baseline}</b></span>
        <span>Target<b>{s.target}</b></span>
        <span>Actual<b>{s.actual}</b></span>
        <span>Period<b>{s.period}</b></span>
        <span>Owner<b>{s.owner}</b></span>
      </div>
      <div className="dg-scorecard-targets">
        <div className="target-item">Due: <b>{s.dueDate}</b></div>
        <div className="target-item">Evidence: <b>{s.evidence}</b></div>
        <span className={`dg-status ${statusColor(s.status)}`}>{s.status}</span>
      </div>
      {s.correctiveAction !== 'No action required' && <div style={{ marginTop: 8, fontSize: 11, color: '#ad8320' }}>Corrective action: {s.correctiveAction}</div>}
    </div>)}
  </Panel>;
}

function RiskComplianceView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  const [tab, setTab] = useState<'risks' | 'compliance'>('risks');
  const [filter, setFilter] = useState('All');
  const filteredRisks = filter === 'All' ? demo.risks : demo.risks.filter((r) => r.status === filter);
  const riskColor = (r: string) => r === 'Critical' ? 'bad' : r === 'High' ? 'warning' : r === 'Medium' ? 'info' : 'neutral';
  return <>
    <div className="dg-filterbar">
      <button className={`dg-button ${tab === 'risks' ? 'primary' : ''}`} onClick={() => setTab('risks')} style={{ padding: '4px 14px', fontSize: 11 }}>Risk Register</button>
      <button className={`dg-button ${tab === 'compliance' ? 'primary' : ''}`} onClick={() => setTab('compliance')} style={{ padding: '4px 14px', fontSize: 11 }}>Compliance Register</button>
    </div>
    {tab === 'risks' && <>
      <div className="dg-filterbar">{['All', 'Open', 'Mitigating', 'Monitoring', 'Closed'].map((f) => <button key={f} className={`dg-button ${filter === f ? 'primary' : ''}`} onClick={() => setFilter(f)} style={{ padding: '4px 12px', fontSize: 11 }}>{f}</button>)}</div>
      <Panel title="Institutional risk register" subtitle={`${demo.risks.length} risk(s) — scored using approved likelihood × impact matrix`}>
        <div className="dg-table-wrap"><table className="dg-table"><thead><tr><th>Ref</th><th>Title</th><th>Category</th><th>L</th><th>I</th><th>Rating</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead>
        <tbody>{filteredRisks.map((r) => <tr key={r.id}><td><strong>{r.ref}</strong></td><td>{r.title}</td><td>{r.category}</td><td>{r.likelihood}</td><td>{r.impact}</td><td><span className={`dg-badge ${riskColor(r.rating)}`}>{r.rating}</span></td><td>{r.owner}</td><td>{r.dueDate}</td><td><span className={`dg-status ${r.status === 'Closed' ? 'good' : r.status === 'Open' ? 'bad' : 'warning'}`}>{r.status}</span></td></tr>)}</tbody></table></div>
      </Panel>
      <Panel title="Risk mitigation details" subtitle="Mitigation actions and review schedules">
        <div className="dg-record-list">{filteredRisks.map((r) => <div className="dg-record-row" key={r.id}>
          <div><strong>{r.ref} — {r.title}</strong><span>Mitigation: {r.mitigation}</span><small>Review date: {r.reviewDate}</small></div>
        </div>)}</div>
      </Panel>
    </>}
    {tab === 'compliance' && <Panel title="Compliance register" subtitle={`${demo.compliance.length} item(s) — configurable requirements and deadlines`}>
      <div className="dg-table-wrap"><table className="dg-table"><thead><tr><th>Requirement</th><th>Authority</th><th>Deadline</th><th>Status</th><th>Evidence</th><th>Reviewed by</th><th>Review date</th></tr></thead>
      <tbody>{demo.compliance.map((c) => <tr key={c.id}><td><strong>{c.requirement}</strong></td><td>{c.authority}</td><td>{c.deadline}</td><td><span className={`dg-status ${c.status === 'Compliant' ? 'good' : c.status === 'Overdue' ? 'bad' : c.status === 'Pending' ? 'warning' : 'info'}`}>{c.status}</span></td><td>{c.evidence}</td><td>{c.reviewedBy}</td><td>{c.reviewDate}</td></tr>)}</tbody></table></div>
    </Panel>}
  </>;
}

function AcademicView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  return <>
    <div className="dg-kpi-grid">
      <Metric icon={BookOpen} label="Total assessments" value="48" detail="Term 3 · 12 pending" tone="navy" />
      <Metric icon={TrendingUp} label="School mean" value="68.4%" detail="Target: 72%" trend="up" trendValue="+2.1%" tone="green" />
      <Metric icon={CheckCircle2} label="Mark entry" value="94%" detail="112 marks missing" tone="teal" />
      <Metric icon={AlertTriangle} label="Intervention plans" value="3" detail="2 active · 1 proposed" tone="gold" />
    </div>
    <Panel title="Performance by subject" subtitle="Aggregate results — Term 3 2026. Population, assessment and grading scale shown per subject.">
      <div className="dg-table-wrap"><table className="dg-table"><thead><tr><th>Subject</th><th>Average</th><th>Pass rate</th><th>Trend</th><th>Completion</th><th>Source</th></tr></thead>
      <tbody>{demo.academic.map((a) => <tr key={a.id}><td><strong>{a.subject}</strong></td><td>{a.average}</td><td>{a.passRate}</td><td><span className={`dg-status ${a.trend === 'up' ? 'good' : a.trend === 'down' ? 'bad' : 'neutral'}`}>{a.trend === 'up' ? '↑' : a.trend === 'down' ? '↓' : '→'} {a.trendValue}</span></td><td>{a.completion}</td><td><span className="dg-source-tag">{a.source}</span></td></tr>)}</tbody></table></div>
    </Panel>
    <div className="dg-data-unavailable"><AlertTriangle size={16} /> Curriculum coverage data is not yet configured. The academic module does not currently report lesson-by-lesson coverage. Gap documented for backend team.</div>
  </>;
}

function EnrollmentView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  return <>
    <div className="dg-kpi-grid">
      <Metric icon={Users} label="Total enrolled" value="1,248" detail="Target: 1,300 · 96% capacity" trend="up" trendValue="+6.8%" tone="blue" />
      <Metric icon={CheckCircle2} label="Retention rate" value="93.2%" detail="86 withdrawals this year" trend="flat" trendValue="0%" tone="teal" />
      <Metric icon={TrendingUp} label="Attendance" value="94.2%" detail="14 unexplained absences" trend="up" trendValue="+1.4%" tone="green" />
      <Metric icon={AlertTriangle} label="Chronic absenteeism" value="4.2%" detail="52 students flagged" trend="down" trendValue="-1.6%" tone="gold" />
    </div>
    <Panel title="Enrollment by school section" subtitle="Day vs boarding breakdown with capacity and retention">
      <div className="dg-table-wrap"><table className="dg-table"><thead><tr><th>Section</th><th>Enrolled</th><th>Capacity</th><th>Fill rate</th><th>Boarding</th><th>Day</th><th>Retention</th></tr></thead>
      <tbody>{demo.enrollment.map((e) => <tr key={e.id}><td><strong>{e.section}</strong></td><td>{e.enrolled}</td><td>{e.capacity}</td><td>{Math.round((e.enrolled / e.capacity) * 100)}%</td><td>{e.boarding}</td><td>{e.day}</td><td><span className="dg-status good">{e.retention}</span></td></tr>)}</tbody></table></div>
    </Panel>
    <div className="dg-data-unavailable"><AlertTriangle size={16} /> Enrollment forecast is not available — no documented forecasting method configured. Gap documented for backend team.</div>
  </>;
}

function FinanceView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  return <>
    <div className="dg-kpi-grid">
      <Metric icon={Wallet} label="Verified collections" value="KES 18.4M" detail="Term 3 to date — verified only" trend="up" trendValue="+8.4%" tone="green" />
      <Metric icon={AlertTriangle} label="Outstanding" value="KES 4.8M" detail="184 accounts · 12 critical" trend="down" trendValue="-6.2%" tone="gold" />
      <Metric icon={TrendingUp} label="Collection rate" value="79.3%" detail="Target: 85%" trend="up" trendValue="+8.4%" tone="teal" />
      <Metric icon={CheckCircle2} label="Budget utilisation" value="67%" detail="KES 12.2M of KES 18.2M" trend="flat" tone="navy" />
    </div>
    <Panel title="Budget vs actual — Term 3 2026" subtitle="Every figure from finance module — verified receipts only. Pending payments excluded from collections.">
      <div className="dg-table-wrap"><table className="dg-table"><thead><tr><th>Category</th><th>Budget</th><th>Actual</th><th>Variance</th><th>Var %</th><th>Status</th><th>Source</th></tr></thead>
      <tbody>{demo.financials.map((f) => <tr key={f.id}><td><strong>{f.category}</strong></td><td>{f.budget}</td><td>{f.actual}</td><td>{f.variance}</td><td>{f.variancePct}</td><td><span className={`dg-status ${f.status === 'Favourable' ? 'good' : f.status === 'Unfavourable' ? 'bad' : 'neutral'}`}>{f.status}</span></td><td><span className="dg-source-tag">{f.source}</span></td></tr>)}</tbody></table></div>
    </Panel>
    <div className="dg-form-note"><ShieldCheck size={16} /> Read-only financial oversight. Directors cannot initiate payments. All figures are from verified, reconciled finance records. Pending payments are not counted as collections.</div>
  </>;
}

function ProcurementView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  return <>
    <div className="dg-kpi-grid">
      <Metric icon={ClipboardList} label="Approved POs" value="14" detail="Term 3 — KES 1.65M committed" tone="navy" />
      <Metric icon={AlertTriangle} label="Pending governance review" value="2" detail="Above KES 100,000 threshold" tone="gold" />
      <Metric icon={Building2} label="Asset register" value="412 items" detail="86% operational" tone="teal" />
      <Metric icon={AlertTriangle} label="Maintenance backlog" value="8 items" detail="3 critical" tone="red" />
    </div>
    <Panel title="Procurement summary" subtitle="Approved procurement budget vs commitments — from procurement module">
      <div className="dg-table-wrap"><table className="dg-table"><thead><tr><th>Category</th><th>Budget</th><th>Committed</th><th>Variance</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>Teaching materials</td><td>KES 450,000</td><td>KES 380,000</td><td>+KES 70,000</td><td><span className="dg-status good">Favourable</span></td></tr>
        <tr><td>Lab equipment</td><td>KES 680,000</td><td>KES 540,000</td><td>+KES 140,000</td><td><span className="dg-status good">Favourable</span></td></tr>
        <tr><td>Sports equipment</td><td>KES 220,000</td><td>KES 195,000</td><td>+KES 25,000</td><td><span className="dg-status neutral">On Budget</span></td></tr>
        <tr><td>Maintenance</td><td>KES 350,000</td><td>KES 385,000</td><td>-KES 35,000</td><td><span className="dg-status bad">Unfavourable</span></td></tr>
      </tbody></table></div>
    </Panel>
    <Panel title="Critical stock shortages" subtitle="Items below reorder threshold">
      <div className="dg-record-list">
        <div className="dg-record-row"><div><strong>Lab chemicals — Hydrochloric acid</strong><span>2 bottles remaining · Reorder at 5</span></div><span className="dg-badge critical">Critical</span></div>
        <div className="dg-record-row"><div><strong>A4 paper reams</strong><span>8 reams remaining · Reorder at 15</span></div><span className="dg-badge warning">Low</span></div>
        <div className="dg-record-row"><div><strong>First aid supplies</strong><span>3 kits remaining · Reorder at 5</span></div><span className="dg-badge warning">Low</span></div>
      </div>
    </Panel>
  </>;
}

function StaffingView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  const totalEstablished = demo.staffing.reduce((s, d) => s + d.established, 0);
  const totalCurrent = demo.staffing.reduce((s, d) => s + d.current, 0);
  const totalGap = demo.staffing.reduce((s, d) => s + d.gap, 0);
  return <>
    <div className="dg-kpi-grid">
      <Metric icon={Users} label="Established posts" value={String(totalEstablished)} detail="Across all departments" tone="navy" />
      <Metric icon={CheckCircle2} label="Filled" value={String(totalCurrent)} detail={`${Math.round((totalCurrent / totalEstablished) * 100)}% of establishment`} tone="green" />
      <Metric icon={AlertTriangle} label="Staffing gaps" value={String(totalGap)} detail="Maths · Sciences · Technical" tone="red" />
      <Metric icon={TrendingUp} label="Appraisal completion" value="62%" detail="53 of 86 completed" tone="gold" />
    </div>
    <Panel title="Staffing by department" subtitle="Establishment vs current — aggregate data from HR module. Individual records restricted.">
      <div className="dg-table-wrap"><table className="dg-table"><thead><tr><th>Department</th><th>Established</th><th>Current</th><th>Gap</th><th>Appraisal completion</th><th>Source</th></tr></thead>
      <tbody>{demo.staffing.map((s) => <tr key={s.id}><td><strong>{s.department}</strong></td><td>{s.established}</td><td>{s.current}</td><td>{s.gap > 0 ? <span className="dg-status bad">{s.gap} gap</span> : <span className="dg-status good">Full</span>}</td><td>{s.appraisalCompletion}</td><td><span className="dg-source-tag">{s.source}</span></td></tr>)}</tbody></table></div>
    </Panel>
    <div className="dg-form-note"><ShieldCheck size={16} /> Confidential HR cases, medical details and individual payroll breakdowns are restricted. This view shows aggregate data only.</div>
  </>;
}

function WelfareView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  const statusColor = (s: string) => s === 'Good' ? 'good' : s === 'Warning' ? 'warning' : s === 'Critical' ? 'bad' : 'neutral';
  return <>
    <div className="dg-kpi-grid">
      <Metric icon={CheckCircle2} label="Boarding occupancy" value="96%" detail="180 of 188 beds" tone="green" />
      <Metric icon={AlertTriangle} label="Transport routes" value="12/14" detail="2 suspended" tone="gold" />
      <Metric icon={ShieldCheck} label="Open cases" value="2" detail="1 overdue follow-up" tone="red" />
      <Metric icon={AlertTriangle} label="Safety inspections" value="3" detail="2 overdue" tone="red" />
    </div>
    <Panel title="Welfare indicators" subtitle="Aggregate indicators from boarding, transport, health, safeguarding and safety modules. No individual case data.">
      <div className="dg-table-wrap"><table className="dg-table"><thead><tr><th>Area</th><th>Indicator</th><th>Value</th><th>Status</th><th>Detail</th><th>Source</th></tr></thead>
      <tbody>{demo.welfare.map((w) => <tr key={w.id}><td><strong>{w.area}</strong></td><td>{w.indicator}</td><td>{w.value}</td><td><span className={`dg-status ${statusColor(w.status)}`}>{w.status}</span></td><td>{w.detail}</td><td><span className="dg-source-tag">{w.source}</span></td></tr>)}</tbody></table></div>
    </Panel>
    <div className="dg-form-note"><ShieldCheck size={16} /> Safeguarding and health details are restricted to authorized users. This dashboard shows aggregate counts only — no individual student data.</div>
  </>;
}

function ProjectsView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  const statusColor = (s: string) => s === 'Completed' ? 'good' : s === 'On Track' ? 'good' : s === 'At Risk' ? 'warning' : s === 'Delayed' ? 'bad' : 'info';
  const progressColor = (p: number) => p === 100 ? '#3d9a67' : p >= 60 ? '#1a5276' : p >= 30 ? '#bb922a' : '#c44';
  return <>
    <div className="dg-kpi-grid">
      <Metric icon={Building2} label="Active projects" value={String(demo.projects.filter((p) => p.status !== 'Completed').length)} detail="2 at risk · 1 delayed" tone="navy" />
      <Metric icon={Wallet} label="Total budget" value="KES 8.33M" detail="Across all projects" tone="blue" />
      <Metric icon={TrendingUp} label="Spent to date" value="KES 4.47M" detail="54% of total budget" tone="teal" />
      <Metric icon={AlertTriangle} label="Decisions needed" value={String(demo.projects.filter((p) => p.decisionNeeded !== 'None' && !p.decisionNeeded.includes('closed')).length)} detail="Awaiting board approval" tone="gold" />
    </div>
    <Panel title="Strategic project portfolio" subtitle="Progress calculated from recorded milestones — not decorative counters">
      <div className="dg-record-list">{demo.projects.map((p) => <div className="dg-record-row" key={p.id} style={{ flexWrap: 'wrap' }}>
        <div style={{ minWidth: '300px' }}>
          <strong>{p.name}</strong>
          <span>{p.scope}</span>
          <small>Owner: {p.owner} · Budget: {p.budget} · Spent: {p.spent}</small>
          <div className="dg-progress-bar"><div className="dg-progress-fill" style={{ width: `${p.completion}%`, background: progressColor(p.completion) }} /></div>
          <small style={{ marginTop: 4 }}>{p.milestones} · {p.completion}% complete</small>
          {p.risks !== 'None' && <small style={{ color: '#c44', marginTop: 4 }}>Risk: {p.risks}</small>}
          {p.decisionNeeded !== 'None' && !p.decisionNeeded.includes('closed') && <small style={{ color: '#bb922a', marginTop: 4 }}>Decision needed: {p.decisionNeeded}</small>}
        </div>
        <span className={`dg-status ${statusColor(p.status)}`}>{p.status}</span>
      </div>)}</div>
    </Panel>
  </>;
}

function MeetingsView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  const selected = demo.meetings.find((m) => m.id === selectedMeeting);
  const selectedAgenda = demo.agenda.filter((a) => a.meetingId === selectedMeeting);
  const statusColor = (s: string) => s === 'Completed' || s === 'Archived' ? 'good' : s === 'Published' ? 'info' : s === 'Scheduled' ? 'info' : s === 'Draft' ? 'neutral' : s === 'Minutes Pending' ? 'warning' : 'warning';
  return <>
    <Panel title="Board meetings" subtitle={`${demo.meetings.length} meeting(s) — full lifecycle from draft to archived`}>
      <div className="dg-record-list">{demo.meetings.map((m) => <div className="dg-meeting-card" key={m.id} onClick={() => setSelectedMeeting(m.id)}>
        <strong>{m.title}</strong>
        <span>{m.date} at {m.time} · {m.venue} · {m.type}</span>
        <div className="dg-meeting-meta">
          <span className="dg-status neutral">{m.attendees} attendees</span>
          <span className="dg-status info">{m.agendaItems} agenda items</span>
          <span className="dg-status good">{m.resolutions} resolutions</span>
          {m.actionsOverdue > 0 && <span className="dg-status bad">{m.actionsOverdue} overdue</span>}
          <span className={`dg-status ${statusColor(m.status)}`}>{m.status}</span>
        </div>
      </div>)}</div>
    </Panel>
    {selected && <Panel title={selected.title} subtitle={`${selected.date} at ${selected.time} — ${selected.venue}`} action={<button className="dg-button" onClick={() => demo.advanceMeeting(selected.id)}><Clock3 size={14} /> Advance lifecycle</button>}>
      <div className="dg-record-list">{selectedAgenda.map((a) => <div className="dg-record-row" key={a.id}>
        <div><strong>{a.order}. {a.title}</strong><span>Presenter: {a.presenter} · {a.duration} · {a.type}</span></div>
        <span className="dg-status info">{a.attachments} attachment(s)</span>
        <span className={`dg-status ${a.status === 'Pending' ? 'warning' : a.status === 'Adopted' ? 'good' : a.status === 'Rejected' ? 'bad' : 'neutral'}`}>{a.status}</span>
      </div>)}</div>
    </Panel>}
  </>;
}

function ResolutionsView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  const [filter, setFilter] = useState('All');
  const [reviewId, setReviewId] = useState('');
  const [decision, setDecision] = useState<BoardResolution['status']>('Approved');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const filtered = filter === 'All' ? demo.resolutions : demo.resolutions.filter((r) => r.status === filter);
  const submitDecision = () => {
    const res = demo.resolutions.find((r) => r.id === reviewId);
    if (!res) return;
    if (res.selfApproveBlocked && decision === 'Approved' && res.submittedBy === 'Operations') { setError('Self-approval blocked by policy — separation of duties.'); return; }
    if ((decision === 'Rejected' || decision === 'Deferred') && !reason.trim()) { setError('A reason is required for rejection or deferral.'); return; }
    demo.decideResolution(reviewId, decision);
    setSuccess(`Resolution ${res.ref} marked as ${decision}.`); setError(''); setReviewId(''); setReason('');
  };
  const statusColor = (s: string) => s === 'Approved' ? 'good' : s === 'Rejected' ? 'bad' : s === 'Implemented' ? 'good' : s === 'Deferred' ? 'warning' : s === 'Clarification Requested' ? 'info' : 'warning';
  return <>
    <div className="dg-filterbar">{['All', 'Pending Review', 'Clarification Requested', 'Approved', 'Rejected', 'Deferred', 'Implemented'].map((f) => <button key={f} className={`dg-button ${filter === f ? 'primary' : ''}`} onClick={() => setFilter(f)} style={{ padding: '4px 12px', fontSize: 11 }}>{f}</button>)}</div>
    <Panel title="Board resolutions & decisions" subtitle={`${demo.resolutions.length} resolution(s) — audit trail preserved for all decisions`}>
      <div className="dg-record-list">{filtered.map((r) => <div className="dg-record-row" key={r.id}>
        <div><strong>{r.ref} — {r.title}</strong><span>Origin: {r.originModule} · Submitted by {r.submittedBy} · Type: {r.type}</span><small>Justification: {r.justification}</small>{r.decisionDate && <small>Decided: {r.decisionDate} · Vote: {r.voteFor}-{r.voteAgainst}-{r.abstentions}</small>}{r.selfApproveBlocked && <small style={{ color: '#bb922a' }}>Self-approval blocked — separation of duties</small>}</div>
        <span className={`dg-status ${statusColor(r.status)}`}>{r.status}</span>
        <div className="dg-row-actions">{(r.status === 'Pending Review' || r.status === 'Clarification Requested') && <button className="dg-link" onClick={() => setReviewId(r.id)}>Review</button>}</div>
      </div>)}</div>
    </Panel>
    {reviewId && <Panel title="Record decision" subtitle="Maker-checker: you cannot approve your own submission. A reason is required for rejection or deferral.">
      <div className="dg-form">
        <label>Decision<select value={decision} onChange={(e) => setDecision(e.target.value as BoardResolution['status'])}><option>Approved</option><option>Rejected</option><option>Deferred</option></select></label>
        {(decision === 'Rejected' || decision === 'Deferred') && <label>Reason (required)<textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Explain the reason for this decision" /></label>}
        <div className="dg-row-actions"><button className="dg-button primary" onClick={submitDecision}><Gavel size={15} /> Submit decision</button><button className="dg-link" onClick={() => { setReviewId(''); setError(''); setReason(''); }}>Cancel</button></div>
        {error && <span className="dg-form-error">{error}</span>}
        {success && <span className="dg-form-message">{success}</span>}
      </div>
    </Panel>}
  </>;
}

function ReportsView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  const [generating, setGenerating] = useState('');
  const [generated, setGenerated] = useState('');
  const generate = (title: string, status: string) => {
    if (status === 'Unavailable') { setGenerated(`${title}: Data unavailable — source module not configured.`); return; }
    setGenerating(title);
    setTimeout(() => { setGenerating(''); setGenerated(`${title} generated successfully${status === 'Partial' ? ' — some sections unavailable' : ''}.`); }, 800);
  };
  return <>
    {generated && <div className="dg-form-note"><CheckCircle2 size={16} /> {generated}</div>}
    <Panel title="Board-ready reports" subtitle="Generated from actual data — permission-checked and audit-logged">
      <div className="dg-record-list">{demo.reports.map((r) => <div className="dg-record-row" key={r.id}>
        <div><strong>{r.title}</strong><span>{r.description}</span><small>Last generated: {r.lastGenerated} · {r.availableSections}/{r.sections} sections available</small><span className="dg-source-tag">Source: {r.source}</span></div>
        <span className={`dg-status ${r.status === 'Ready' ? 'good' : r.status === 'Partial' ? 'warning' : 'bad'}`}>{r.status}</span>
        <div className="dg-row-actions"><button className="dg-button" onClick={() => generate(r.title, r.status)} disabled={generating === r.title}>{generating === r.title ? 'Generating...' : 'Generate'}</button></div>
      </div>)}</div>
    </Panel>
    <div className="dg-form-note"><ShieldCheck size={16} /> All report generation and downloads are audit-logged. Permissions are enforced on both generation and file access. Partial reports show which sections are unavailable.</div>
  </>;
}

function AuditView({ demo }: { demo: ReturnType<typeof useDirectorsDemo> }) {
  const severityColor = (s: string) => s === 'Critical' ? 'bad' : s === 'Warning' ? 'warning' : 'info';
  return <Panel title="Audit history" subtitle={`${demo.auditEvents.length} event(s) — sensitive views, exports and governance decisions`}>
    <div className="dg-record-list">{demo.auditEvents.map((e) => <div className="dg-record-row" key={e.id}>
      <div><strong>{e.actor}</strong><span>{e.action}</span><small>{e.resource} · {e.timestamp}</small><small>{e.detail}</small></div>
      <span className={`dg-badge ${e.severity === 'Critical' ? 'critical' : e.severity === 'Warning' ? 'warning' : 'info'}`}>{e.severity}</span>
    </div>)}</div>
  </Panel>;
}
