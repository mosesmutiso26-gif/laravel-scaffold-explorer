import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, Bell, BookOpen, Calendar, CheckCircle2, ChevronDown, ClipboardList, Clock3, FileText, GraduationCap, LayoutDashboard, Menu, MoreHorizontal, Plus, Search, Settings, ShieldCheck, TrendingUp, Users, Wallet, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/headteacher.css';
import { useHeadteacherDemo, type ApprovalRequest, type BriefingItem, type ExecutiveTask } from '@/data/headteacherDemo';

type Nav = { label: string; path: string; icon: LucideIcon; group: string };
const nav: Nav[] = [
  { label: 'Dashboard', path: '/headteacher/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Daily briefing', path: '/headteacher/briefing', icon: Calendar, group: 'Workspace' },
  { label: 'Action centre', path: '/headteacher/action-centre', icon: ClipboardList, group: 'Workspace' },
  { label: 'Approval centre', path: '/headteacher/approvals', icon: ShieldCheck, group: 'Governance' },
  { label: 'Academic performance', path: '/headteacher/academic', icon: TrendingUp, group: 'Academic' },
  { label: 'Interventions', path: '/headteacher/interventions', icon: GraduationCap, group: 'Academic' },
  { label: 'Lesson observations', path: '/headteacher/observations', icon: BookOpen, group: 'Academic' },
  { label: 'Staff overview', path: '/headteacher/staff', icon: Users, group: 'Operations' },
  { label: 'Finance overview', path: '/headteacher/finance', icon: Wallet, group: 'Operations' },
  { label: 'Reports', path: '/headteacher/reports', icon: FileText, group: 'Controls' },
  { label: 'Settings', path: '/headteacher/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Governance', 'Academic', 'Operations', 'Controls', 'Account'];

export function HeadteacherPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useHeadteacherDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const current = nav.find((item) => location.pathname.startsWith(item.path)) ?? nav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const pendingApprovals = demo.approvals.filter((a) => a.status === 'Pending');
  const overdueTasks = demo.tasks.filter((t) => t.status === 'Overdue');
  const urgentBriefing = demo.briefing.filter((b) => b.status === 'New' && (b.severity === 'Urgent' || b.severity === 'Warning'));

  return <div className="ht-app">
    <aside className={`ht-sidebar ${mobile ? 'open' : ''}`}>
      <div className="ht-brand"><div className="ht-brand-mark"><GraduationCap size={21} /></div><div><strong>Riverside</strong><span>Headteacher</span></div><button className="ht-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div>
      <div className="ht-demo-pill"><span className="ht-demo-dot" /> DEMO MODE <span>·</span> October 2026</div>
      <div className="ht-school"><div>RA</div><span><strong>Riverside Academy</strong><small>Executive Portal</small></span><ChevronDown size={15} /></div>
      <nav className="ht-nav">{groups.map((group) => <div className="ht-nav-group" key={group}><p>{group}</p>{nav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={`ht-nav-item${current.path === path || (path !== '/headteacher/dashboard' && location.pathname.startsWith(path)) ? ' active' : ''}`} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Approval centre' && pendingApprovals.length > 0 && <em>{pendingApprovals.length}</em>}{label === 'Action centre' && overdueTasks.length > 0 && <em className="badge-red" style={{ background: '#fce8e8', color: '#c44' }}>{overdueTasks.length}</em>}{label === 'Daily briefing' && urgentBriefing.length > 0 && <em>{urgentBriefing.length}</em>}</button>)}</div>)}</nav>
      <div className="ht-sidebar-footer"><div className="ht-user"><div className="ht-avatar">DM</div><span><strong>Dr. Mwangi</strong><small>Headteacher</small></span><MoreHorizontal size={16} /></div></div>
    </aside>
    {mobile && <button className="ht-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="ht-main"><header className="ht-topbar"><button className="ht-menu-button" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="ht-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="ht-top-actions"><div className="ht-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students, staff..." /></div><button className="ht-icon-button" onClick={() => navigateTo('/headteacher/briefing')} aria-label="Open briefing"><Bell size={18} />{urgentBriefing.length > 0 && <i />}</button><button className="ht-profile" onClick={() => navigateTo('/headteacher/settings')}><div className="ht-avatar">DM</div><span>Dr. Mwangi</span><ChevronDown size={15} /></button></div></header>
      <div className="ht-content"><div className="ht-context"><div><span className="ht-kicker"><ShieldCheck size={14} /> Executive Portal <b>•</b> 2026 · Term 3 · 16 Oct</span><h1>{current.label}</h1><p>{desc(location.pathname)}</p></div></div><RouteView path={location.pathname} demo={demo} navigateTo={navigateTo} /></div></main>
  </div>;
}

function desc(path: string): string {
  if (path.includes('dashboard')) return 'School-wide overview — students, staff, finance, attendance and approvals at a glance.';
  if (path.includes('briefing')) return 'Today\'s aggregated operational briefing from all modules.';
  if (path.includes('action-centre')) return 'Consolidated task list with priorities, due dates and delegation.';
  if (path.includes('approval')) return 'Unified approval workspace with maker-checker separation.';
  if (path.includes('academic')) return 'School-wide academic performance with drill-down.';
  if (path.includes('intervention')) return 'Academic intervention plans for students needing support.';
  if (path.includes('observation')) return 'Lesson observation schedules and feedback.';
  if (path.includes('staff')) return 'Staff attendance, workload and leave overview.';
  if (path.includes('finance')) return 'Fee collection, outstanding balances and finance approvals.';
  if (path.includes('report')) return 'Executive reports across all school departments.';
  return 'Headteacher executive portal settings.';
}

function RouteView({ path, demo, navigateTo }: { path: string; demo: ReturnType<typeof useHeadteacherDemo>; navigateTo: (p: string) => void }) {
  if (path === '/headteacher/dashboard' || path === '/headteacher') return <Dashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/headteacher/briefing')) return <BriefingView demo={demo} />;
  if (path.startsWith('/headteacher/action-centre')) return <ActionCentreView demo={demo} />;
  if (path.startsWith('/headteacher/approvals')) return <ApprovalsView demo={demo} />;
  if (path.startsWith('/headteacher/academic')) return <AcademicView />;
  if (path.startsWith('/headteacher/interventions')) return <InterventionsView demo={demo} />;
  if (path.startsWith('/headteacher/observations')) return <ObservationsView demo={demo} />;
  if (path.startsWith('/headteacher/staff')) return <StaffView />;
  if (path.startsWith('/headteacher/finance')) return <FinanceView />;
  if (path.startsWith('/headteacher/reports')) return <ReportsView />;
  return <div className="ht-empty">Settings page — dashboard configuration, notification preferences and approval policies.</div>;
}

function Panel({ title, subtitle, children, action }: { title: string; subtitle?: string; children: ReactNode; action?: ReactNode }) {
  return <div className="ht-panel"><div className="ht-panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>{children}</div>;
}
function Metric({ icon: Icon, label, value, detail, tone, onClick }: { icon: LucideIcon; label: string; value: string; detail: string; tone?: string; onClick: () => void }) {
  return <button className="ht-metric" onClick={onClick}><div className={`ht-metric-icon ${tone ?? ''}`}><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></button>;
}

function Dashboard({ demo, navigateTo }: { demo: ReturnType<typeof useHeadteacherDemo>; navigateTo: (p: string) => void }) {
  const pendingApprovals = demo.approvals.filter((a) => a.status === 'Pending');
  const overdueTasks = demo.tasks.filter((t) => t.status === 'Overdue');
  const urgentTasks = demo.tasks.filter((t) => t.priority === 'Urgent' && t.status !== 'Completed');
  const newBriefing = demo.briefing.filter((b) => b.status === 'New');
  return <><div className="ht-kpi-grid">
    <Metric icon={Users} label="Enrolled students" value="1,248" detail="94.2% present today" onClick={() => navigateTo('/headteacher/academic')} />
    <Metric icon={CheckCircle2} label="Attendance today" value="94.2%" detail="1,176 present · 30 absent" tone="green" onClick={() => navigateTo('/headteacher/dashboard')} />
    <Metric icon={ShieldCheck} label="Pending approvals" value={String(pendingApprovals.length)} detail="Awaiting your decision" tone="gold" onClick={() => navigateTo('/headteacher/approvals')} />
    <Metric icon={Wallet} label="Outstanding fees" value="KES 4.8M" detail="184 accounts with balances" tone="red" onClick={() => navigateTo('/headteacher/finance')} />
  </div>
  <div className="ht-kpi-grid">
    <Metric icon={Clock3} label="Overdue tasks" value={String(overdueTasks.length)} detail="Need immediate attention" tone="red" onClick={() => navigateTo('/headteacher/action-centre')} />
    <Metric icon={AlertTriangle} label="Urgent tasks" value={String(urgentTasks.length)} detail="High priority this week" tone="gold" onClick={() => navigateTo('/headteacher/action-centre')} />
    <Metric icon={Bell} label="Briefing items" value={String(newBriefing.length)} detail="New items today" tone="teal" onClick={() => navigateTo('/headteacher/briefing')} />
    <Metric icon={Users} label="Active staff" value="86" detail="78 teaching · 8 support" tone="blue" onClick={() => navigateTo('/headteacher/staff')} />
  </div>
  <div className="ht-main-grid">
    <Panel title="Daily briefing — today" subtitle={`${newBriefing.length} new item(s)`} action={<button className="ht-link" onClick={() => navigateTo('/headteacher/briefing')}>View all</button>}>
      <div className="ht-record-list">{demo.briefing.filter((b) => b.status === 'New').slice(0, 4).map((b) => <div className="ht-record-row" key={b.id}>
        <div><strong>{b.title}</strong><span>{b.category} · {b.time}</span></div>
        <span className={`ht-badge ${b.severity === 'Urgent' ? 'urgent' : b.severity === 'Warning' ? 'warning' : 'info'}`}>{b.severity}</span>
      </div>)}</div>
    </Panel>
    <Panel title="Pending approvals" subtitle={`${pendingApprovals.length} awaiting your decision`}>
      <div className="ht-record-list">{pendingApprovals.slice(0, 4).map((a) => <div className="ht-record-row" key={a.id}>
        <div><strong>{a.type}</strong><span>Requested by {a.requester} · {a.submittedDate}</span></div>
        <span className="ht-status warning">Pending</span>
        <div className="ht-row-actions"><button className="ht-link" onClick={() => navigateTo('/headteacher/approvals')}>Review</button></div>
      </div>)}</div>
    </Panel>
  </div>
  <div className="ht-main-grid">
    <Panel title="Overdue & urgent tasks" subtitle={`${overdueTasks.length + urgentTasks.length} task(s) need attention`}>
      <div className="ht-record-list">{[...overdueTasks, ...urgentTasks].slice(0, 5).map((t) => <div className="ht-record-row" key={t.id}>
        <div><strong>{t.title}</strong><span>Assigned to: {t.assignedTo} · Due: {t.dueDate}</span></div>
        <span className={`ht-status ${t.status === 'Overdue' ? 'bad' : 'warning'}`}>{t.status}</span>
      </div>)}</div>
    </Panel>
    <Panel title="Executive summary" subtitle="Key indicators across all modules">
      <div className="ht-record-list">
        <div className="ht-record-row"><div><strong>Boarding occupancy</strong><span>180 students · Dorm A–D</span></div><span className="ht-status good">96%</span></div>
        <div className="ht-record-row"><div><strong>Sports fixtures this week</strong><span>3 upcoming · 1 away match</span></div><span className="ht-status info">3</span></div>
        <div className="ht-record-row"><div><strong>Parent enquiries</strong><span>5 pending response</span></div><span className="ht-status warning">5</span></div>
        <div className="ht-record-row"><div><strong>Open safeguarding cases</strong><span>2 requiring action</span></div><span className="ht-status bad">2</span></div>
      </div>
    </Panel>
  </div></>;
}

function BriefingView({ demo }: { demo: ReturnType<typeof useHeadteacherDemo> }) {
  return <Panel title="Daily briefing — 16 October 2026" subtitle={`${demo.briefing.length} item(s) aggregated from all modules`}>
    <div className="ht-record-list">{demo.briefing.map((b) => <div className="ht-record-row" key={b.id}>
      <div><strong>{b.title}</strong><span>{b.category} · {b.time} · {b.description}</span></div>
      <span className={`ht-badge ${b.severity === 'Urgent' ? 'urgent' : b.severity === 'Warning' ? 'warning' : 'info'}`}>{b.severity}</span>
      <span className={`ht-status ${b.status === 'New' ? 'warning' : b.status === 'Reviewed' ? 'good' : 'info'}`}>{b.status}</span>
      <div className="ht-row-actions">{b.status === 'New' && <button className="ht-link" onClick={() => demo.reviewBriefingItem(b.id)}>Mark reviewed</button>}</div>
    </div>)}</div>
  </Panel>;
}

function ActionCentreView({ demo }: { demo: ReturnType<typeof useHeadteacherDemo> }) {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState<ExecutiveTask['priority']>('Medium');
  const [dueDate, setDueDate] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !assignedTo.trim()) return;
    demo.createTask(title, assignedTo, priority, dueDate || '2026-10-30');
    setSuccess('Task created.'); setTitle(''); setAssignedTo(''); setDueDate('');
  };
  const statusColor = (s: ExecutiveTask['status']) => s === 'Completed' ? 'good' : s === 'Overdue' ? 'bad' : s === 'In Progress' ? 'info' : 'warning';
  return <><Panel title="Create executive task" subtitle="Assign a task to staff">
    <form className="ht-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Task title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Review exam timetable" /></label>
        <label>Assign to<input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="e.g. Grace Wanjiru" /></label>
        <label>Priority<select value={priority} onChange={(e) => setPriority(e.target.value as ExecutiveTask['priority'])}><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select></label>
        <label>Due date<input value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="2026-10-25" /></label>
      </div>
      <button className="ht-button primary" type="submit" disabled={!title.trim() || !assignedTo.trim()}><Plus size={15} /> Create task</button>
      {success && <span className="ht-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="All tasks" subtitle={`${demo.tasks.length} task(s)`}>
    <div className="ht-record-list">{demo.tasks.map((t) => <div className="ht-record-row" key={t.id}>
      <div><strong>{t.title}</strong><span>Assigned to: {t.assignedTo} · Due: {t.dueDate} · Source: {t.source}</span></div>
      <span className={`ht-badge ${t.priority === 'Urgent' ? 'urgent' : t.priority === 'High' ? 'warning' : 'info'}`}>{t.priority}</span>
      <span className={`ht-status ${statusColor(t.status)}`}>{t.status}</span>
    </div>)}</div>
  </Panel></>;
}

function ApprovalsView({ demo }: { demo: ReturnType<typeof useHeadteacherDemo> }) {
  const [filter, setFilter] = useState('Pending');
  const [reviewedId, setReviewedId] = useState('');
  const [decision, setDecision] = useState<ApprovalRequest['status']>('Approved');
  const filtered = filter === 'All' ? demo.approvals : demo.approvals.filter((a) => a.status === filter);
  const submitReview = (id: string) => { demo.reviewApproval(id, decision); setReviewedId(''); };
  return <><Panel title="Approval centre" subtitle={`${demo.approvals.length} request(s) — maker-checker enforced`}>
    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
      {['Pending', 'Approved', 'Rejected', 'All'].map((f) => <button key={f} className={`ht-button ${filter === f ? 'primary' : ''}`} onClick={() => setFilter(f)} style={{ padding: '4px 12px', fontSize: 11 }}>{f}</button>)}
    </div>
    <div className="ht-record-list">{filtered.map((a) => <div className="ht-record-row" key={a.id}>
      <div><strong>{a.type}</strong><span>Requested by {a.requester} · {a.submittedDate} · {a.reason}</span><small style={{ color: '#bb922a', marginTop: 4 }}>{a.conflictWarnings}</small></div>
      <span className={`ht-status ${a.status === 'Approved' ? 'good' : a.status === 'Rejected' ? 'bad' : a.status === 'Pending' ? 'warning' : 'info'}`}>{a.status}</span>
      <div className="ht-row-actions">{a.status === 'Pending' && <button className="ht-link" onClick={() => setReviewedId(a.id)}>Review</button>}</div>
    </div>)}</div>
  </Panel>
  {reviewedId && <Panel title="Review decision" subtitle="Maker-checker: you cannot approve your own request">
    <div className="ht-form">
      <label>Decision<select value={decision} onChange={(e) => setDecision(e.target.value as ApprovalRequest['status'])}><option>Approved</option><option>Rejected</option><option>Returned for Correction</option><option>More Info Requested</option></select></label>
      <button className="ht-button primary" onClick={() => submitReview(reviewedId)}><ShieldCheck size={15} /> Submit decision</button>
      <button className="ht-link" onClick={() => setReviewedId('')}>Cancel</button>
    </div>
  </Panel>}</>;
}

function AcademicView() {
  return <><div className="ht-kpi-grid">
    <Metric icon={BookOpen} label="Total assessments" value="48" detail="Term 3 · 12 pending" />
    <Metric icon={TrendingUp} label="Average score" value="68.4%" detail="+2.1% from Term 2" tone="green" />
    <Metric icon={GraduationCap} label="Grades recorded" value="1,840" detail="94% completion rate" tone="teal" />
    <Metric icon={AlertTriangle} label="Missing marks" value="112" detail="6 assessments incomplete" tone="gold" />
  </div>
  <Panel title="Performance by class" subtitle="Top and bottom performing classes">
    <div className="ht-table-wrap"><table className="ht-table"><thead><tr><th>Class</th><th>Average</th><th>Pass rate</th><th>Trend</th></tr></thead>
    <tbody>
      <tr><td><strong>Form 4 — Athi</strong></td><td>74.2%</td><td>92%</td><td><span className="ht-status good">+3.1%</span></td></tr>
      <tr><td><strong>Form 3 — Sabaki</strong></td><td>71.8%</td><td>88%</td><td><span className="ht-status good">+1.5%</span></td></tr>
      <tr><td><strong>Year 8 — Acacia</strong></td><td>65.3%</td><td>79%</td><td><span className="ht-status warning">-0.8%</span></td></tr>
      <tr><td><strong>Form 2 — Tana</strong></td><td>58.1%</td><td>71%</td><td><span className="ht-status bad">-2.3%</span></td></tr>
    </tbody></table></div>
  </Panel></>;
}

function InterventionsView({ demo }: { demo: ReturnType<typeof useHeadteacherDemo> }) {
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [concern, setConcern] = useState('');
  const [staff, setStaff] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentName.trim() || !concern.trim()) return;
    demo.createIntervention(studentName, className, concern, staff);
    setSuccess('Intervention plan created.'); setStudentName(''); setClassName(''); setConcern(''); setStaff('');
  };
  const statusColor = (s: string) => s === 'Closed' ? 'good' : s === 'Active' ? 'info' : s === 'Escalated' ? 'bad' : 'warning';
  return <><Panel title="Create intervention plan" subtitle="Record an academic concern and assign support">
    <form className="ht-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Student name<input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Chloe Njeri" /></label>
        <label>Class<input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="e.g. Form 2 — Tana" /></label>
        <label>Responsible staff<input value={staff} onChange={(e) => setStaff(e.target.value)} placeholder="e.g. Mr. Samuel Kamau" /></label>
      </div>
      <label>Concern description<textarea value={concern} onChange={(e) => setConcern(e.target.value)} placeholder="Describe the academic concern and supporting evidence" /></label>
      <button className="ht-button primary" type="submit" disabled={!studentName.trim() || !concern.trim()}><Plus size={15} /> Create intervention</button>
      {success && <span className="ht-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Active interventions" subtitle={`${demo.interventions.length} plan(s)`}>
    <div className="ht-record-list">{demo.interventions.map((i) => <div className="ht-record-row" key={i.id}>
      <div><strong>{i.studentName}</strong><span>{i.className} · {i.concern} · Staff: {i.responsibleStaff} · Review: {i.reviewDate}</span></div>
      <span className={`ht-status ${statusColor(i.status)}`}>{i.status}</span>
      <div className="ht-row-actions">{i.status !== 'Closed' && <button className="ht-link" onClick={() => demo.closeIntervention(i.id)}>Close</button>}</div>
    </div>)}</div>
  </Panel></>;
}

function ObservationsView({ demo }: { demo: ReturnType<typeof useHeadteacherDemo> }) {
  return <Panel title="Lesson observations" subtitle={`${demo.observations.length} observation(s)`}>
    <div className="ht-table-wrap"><table className="ht-table"><thead><tr><th>Teacher</th><th>Observer</th><th>Class</th><th>Subject</th><th>Date</th><th>Rating</th><th>Status</th></tr></thead>
    <tbody>{demo.observations.map((o) => <tr key={o.id}><td><strong>{o.teacher}</strong></td><td>{o.observer}</td><td>{o.className}</td><td>{o.subject}</td><td>{o.date}</td><td>{o.rating}</td><td><span className={`ht-status ${o.status === 'Completed' ? 'good' : o.status === 'Scheduled' ? 'info' : 'neutral'}`}>{o.status}</span></td></tr>)}</tbody></table></div>
  </Panel>;
}

function StaffView() {
  return <><div className="ht-kpi-grid">
    <Metric icon={Users} label="Active staff" value="86" detail="78 teaching · 8 support" />
    <Metric icon={Calendar} label="On leave today" value="3" detail="8 lessons need cover" tone="gold" />
    <Metric icon={ClipboardList} label="Leave pending" value="6" detail="19 days requested" tone="teal" />
    <Metric icon={BookOpen} label="Lessons today" value="52" detail="3 uncovered" tone="red" />
  </div>
  <Panel title="Staff needing cover" subtitle="Teachers on leave with affected lessons">
    <div className="ht-record-list">
      <div className="ht-record-row"><div><strong>Mary Njoki</strong><span>English · 3 lessons uncovered · 20-22 Oct</span></div><span className="ht-status bad">3 uncovered</span><div className="ht-row-actions"><button className="ht-link" onClick={() => alert('Demo: A substitute teacher assignment form would open here. In production, this would check available staff and notify the assigned teacher.')}>Assign substitute</button></div></div>
      <div className="ht-record-row"><div><strong>James Miriti</strong><span>History · 1 lesson covered by Grace Wanjiru</span></div><span className="ht-status good">Covered</span></div>
    </div>
  </Panel></>;
}

function FinanceView() {
  return <><div className="ht-kpi-grid">
    <Metric icon={Wallet} label="Outstanding fees" value="KES 4.8M" detail="184 accounts" tone="red" />
    <Metric icon={CheckCircle2} label="Verified collections" value="KES 18.4M" detail="Term 3 to date" tone="green" />
    <Metric icon={TrendingUp} label="Collection rate" value="79.3%" detail="+8.4% from Term 2" tone="teal" />
    <Metric icon={AlertTriangle} label="Critical accounts" value="12" detail="Above KES 50,000" tone="gold" />
  </div>
  <Panel title="Fee collection summary" subtitle="Reconciled with finance ledger">
    <div className="ht-table-wrap"><table className="ht-table"><thead><tr><th>Category</th><th>Billed</th><th>Collected</th><th>Outstanding</th><th>Rate</th></tr></thead>
    <tbody>
      <tr><td>Tuition</td><td>KES 13.8M</td><td>KES 11.2M</td><td>KES 2.6M</td><td>81%</td></tr>
      <tr><td>Boarding</td><td>KES 2.9M</td><td>KES 2.4M</td><td>KES 0.5M</td><td>83%</td></tr>
      <tr><td>Transport</td><td>KES 1.7M</td><td>KES 1.2M</td><td>KES 0.5M</td><td>71%</td></tr>
      <tr><td>Other</td><td>KES 4.0M</td><td>KES 3.6M</td><td>KES 0.4M</td><td>90%</td></tr>
    </tbody></table></div>
  </Panel></>;
}

function ReportsView() {
  const reportItems = [
    { title: 'Academic performance report', desc: 'Assessments, grades and completion by class/subject', icon: TrendingUp, value: 'B+ avg' },
    { title: 'Attendance report', desc: 'Daily and period attendance with exceptions', icon: CheckCircle2, value: '94.2%' },
    { title: 'Finance reconciliation', desc: 'Fees, collections, balances and arrears', icon: Wallet, value: 'KES 18.4M' },
    { title: 'Staff attendance report', desc: 'Teaching coverage, leave and substitutes', icon: Users, value: '86 staff' },
    { title: 'Boarding & welfare summary', desc: 'Occupancy, roll calls and incidents', icon: ShieldCheck, value: '180 boarders' },
    { title: 'Parent engagement report', desc: 'Enquiries, meetings and complaints', icon: Bell, value: '5 pending' },
  ];
  return <div className="ht-kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>{reportItems.map(({ title, desc, icon: Icon, value }) => <button className="ht-metric" key={title} onClick={() => alert(`Demo: ${title} would be generated with current data. In production, a filtered PDF/Excel export would be produced.`)}><div className="ht-metric-icon blue"><Icon size={18} /></div><strong>{title}</strong><span>{desc}</span><small style={{ fontSize: 14, color: '#c4620d', fontWeight: 600 }}>{value}</small></button>)}</div>;
}
