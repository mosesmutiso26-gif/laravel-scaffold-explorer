import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Award, Bell, Briefcase, Calendar, CheckCircle2, ChevronDown, ClipboardList, Crown, FileText, Flag, GraduationCap, HelpCircle, LayoutDashboard, LogOut, Medal, Menu, MoreHorizontal, Plus, RotateCcw, Search, Settings, ShieldAlert, ShieldCheck, Trophy, Users, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/prefect.css';
import { prefectDemo, usePrefectDemo, type AppointmentStatus, type DutyStatus, type IncidentCategory, type IncidentStatus, type IncidentUrgency, type TaskPriority, type TaskStatus } from '@/data/prefectDemo';

type PfNav = { label: string; path: string; icon: LucideIcon; group: string };
const pfNav: PfNav[] = [
  { label: 'Dashboard', path: '/prefect/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Positions', path: '/prefect/positions', icon: Award, group: 'Configuration' },
  { label: 'Appointments', path: '/prefect/appointments', icon: Crown, group: 'Configuration' },
  { label: 'Duty roster', path: '/prefect/duties', icon: Calendar, group: 'Operations' },
  { label: 'Duty types', path: '/prefect/duty-types', icon: ClipboardList, group: 'Operations' },
  { label: 'Tasks', path: '/prefect/tasks', icon: CheckCircle2, group: 'Operations' },
  { label: 'Incident reports', path: '/prefect/incidents', icon: ShieldAlert, group: 'Safeguarding' },
  { label: 'Training', path: '/prefect/training', icon: GraduationCap, group: 'Operations' },
  { label: 'Announcements', path: '/prefect/announcements', icon: Flag, group: 'Communication' },
  { label: 'Notifications', path: '/prefect/notifications', icon: Bell, group: 'Communication' },
  { label: 'Reports', path: '/prefect/reports', icon: FileText, group: 'Controls' },
  { label: 'Audit history', path: '/prefect/audit', icon: FileText, group: 'Controls' },
  { label: 'Settings', path: '/prefect/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Configuration', 'Operations', 'Safeguarding', 'Communication', 'Controls', 'Account'];

export function PrefectPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = usePrefectDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const current = pfNav.find((item) => location.pathname.startsWith(item.path)) ?? pfNav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const activeCount = demo.appointments.filter((a) => a.status === 'Active').length;
  const pendingReview = demo.appointments.filter((a) => a.status === 'Under Review' || a.status === 'Nominated').length;
  const overdueTasks = demo.tasks.filter((t) => t.status === 'Overdue' || (t.status !== 'Completed' && t.status !== 'Reviewed' && new Date(t.dueDate.split(' ').reverse().join('-')) < new Date('2026-10-16'))).length;
  const openIncidents = demo.incidents.filter((i) => i.status !== 'Closed').length;
  const unreadCount = demo.notifications.filter((n) => n.unread).length;
  return <div className="pf-app">
    <aside className={`pf-sidebar ${mobile ? 'open' : ''}`}><div className="pf-brand"><div className="pf-brand-mark"><Crown size={21} /></div><div><strong>Riverside</strong><span>Prefect Engine</span></div><button className="pf-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div><div className="pf-demo-pill"><span className="pf-demo-dot" /> DEMO MODE <span>•</span> October 2026</div><div className="pf-school"><div>RA</div><span><strong>Riverside Academy</strong><small>Student Leadership</small></span><ChevronDown size={15} /></div><nav className="pf-nav">{groups.map((group) => <div className="pf-nav-group" key={group}><p>{group}</p>{pfNav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={`pf-nav-item${current.path === path || (path !== '/prefect/dashboard' && location.pathname.startsWith(path)) ? ' active' : ''}`} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Appointments' && pendingReview > 0 && <em>{pendingReview}</em>}{label === 'Tasks' && overdueTasks > 0 && <em className="badge-red">{overdueTasks}</em>}{label === 'Incident reports' && openIncidents > 0 && <em>{openIncidents}</em>}{label === 'Notifications' && unreadCount > 0 && <em>{unreadCount}</em>}</button>)}</div>)}</nav><div className="pf-sidebar-footer"><button onClick={() => navigateTo('/prefect/settings')}><HelpCircle size={16} /> Help centre</button><div className="pf-user"><div className="pf-avatar">MK</div><span><strong>Mr. Kiprop</strong><small>Teacher in Charge</small></span><MoreHorizontal size={16} /></div></div></aside>
    {mobile && <button className="pf-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="pf-main"><header className="pf-topbar"><button className="pf-menu-button" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="pf-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="pf-top-actions"><div className="pf-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search prefects, duties..." /></div><button className="pf-icon-button" onClick={() => navigateTo('/prefect/notifications')} aria-label="Open notifications"><Bell size={18} />{unreadCount > 0 && <i />}</button><div className="pf-profile-wrap"><button className="pf-profile" onClick={() => setProfileOpen(!profileOpen)}><div className="pf-avatar">MK</div><span>Kiprop</span><ChevronDown size={15} /></button>{profileOpen && <div className="pf-profile-menu"><strong>Mr. Kiprop</strong><small>Teacher in Charge</small><button onClick={() => navigateTo('/prefect/settings')}><Settings size={14} /> Settings</button><button onClick={() => prefectDemo.reset()}><RotateCcw size={14} /> Reset demo data</button><button onClick={() => navigateTo('/')}><LogOut size={14} /> Exit portal</button></div>}</div></div></header><div className="pf-content"><div className="pf-context"><div><span className="pf-kicker"><ShieldCheck size={14} /> Prefect Engine <b>•</b> 2026 · Term 3</span><h1>{current.label}</h1><p>{pfDescription(location.pathname)}</p></div><div className="pf-context-actions">{(current.path === '/prefect/appointments' || current.path === '/prefect/dashboard') && <button className="pf-button primary" onClick={() => navigateTo('/prefect/appointments')}><Plus size={15} /> Nominate prefect</button>}{current.path === '/prefect/duties' && <button className="pf-button primary" onClick={() => navigateTo('/prefect/duties')}><Plus size={15} /> Assign duty</button>}{current.path === '/prefect/tasks' && <button className="pf-button primary" onClick={() => navigateTo('/prefect/tasks')}><Plus size={15} /> Create task</button>}{current.path === '/prefect/incidents' && <button className="pf-button primary" onClick={() => navigateTo('/prefect/incidents')}><Plus size={15} /> Report incident</button>}</div></div><PfRoute path={location.pathname} demo={demo} navigateTo={navigateTo} /></div></main>
  </div>;
}

function pfDescription(path: string): string {
  if (path.includes('dashboard')) return 'Student leadership overview — active appointments, today\'s duties, pending tasks and safeguarding alerts.';
  if (path.includes('positions')) return 'Configurable prefect positions and responsibilities. Set exclusivity and assignment scope.';
  if (path.includes('appointment')) return 'Full appointment lifecycle — nomination, review, approval, activation, renewal and handover.';
  if (path.includes('duty-types')) return 'Define recurring duty types by shift, location and description.';
  if (path.includes('duties')) return 'Assign and manage prefect duties. Overlapping assignments are detected automatically.';
  if (path.includes('task')) return 'Create, track and review prefect tasks with priority and lifecycle management.';
  if (path.includes('incident')) return 'Restricted incident reporting — safeguarding concerns, hazards and welfare reports.';
  if (path.includes('training')) return 'Leadership training sessions and attendance records.';
  if (path.includes('announcement')) return 'Announcements from authorized supervising staff to prefects.';
  if (path.includes('notification')) return 'System notifications for duty assignments, task updates and incidents.';
  if (path.includes('report')) return 'Performance and appointment reports with filters and drill-downs.';
  if (path.includes('audit')) return 'Every significant action is logged with actor, target and timestamp.';
  return 'Prefect engine and student leadership management.';
}

function PfRoute({ path, demo, navigateTo }: { path: string; demo: ReturnType<typeof usePrefectDemo>; navigateTo: (p: string) => void }) {
  if (path === '/prefect/dashboard' || path === '/prefect') return <PfDashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/prefect/positions')) return <PositionsView demo={demo} />;
  if (path.startsWith('/prefect/appointments')) return <AppointmentsView demo={demo} />;
  if (path.startsWith('/prefect/duty-types')) return <DutyTypesView demo={demo} />;
  if (path.startsWith('/prefect/duties')) return <DutiesView demo={demo} />;
  if (path.startsWith('/prefect/tasks')) return <TasksView demo={demo} />;
  if (path.startsWith('/prefect/incidents')) return <IncidentsView demo={demo} />;
  if (path.startsWith('/prefect/training')) return <TrainingView demo={demo} />;
  if (path.startsWith('/prefect/announcements')) return <AnnouncementsView demo={demo} />;
  if (path.startsWith('/prefect/notifications')) return <NotificationsView demo={demo} />;
  if (path.startsWith('/prefect/reports')) return <ReportsView demo={demo} />;
  if (path.startsWith('/prefect/audit')) return <AuditView demo={demo} />;
  return <SettingsView />;
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return <div className="pf-panel"><div className="pf-panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>{children}</div>;
}
function PfMetric({ icon: Icon, label, value, detail, tone, onClick }: { icon: LucideIcon; label: string; value: string; detail: string; tone?: string; onClick: () => void }) {
  return <button className="pf-metric" onClick={onClick}><div className={`pf-metric-icon ${tone ?? ''}`}><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></button>;
}
function QuickAction({ label, icon: Icon, onClick }: { label: string; icon: LucideIcon; onClick: () => void }) {
  return <button className="pf-quick" onClick={onClick}><Icon size={16} /> {label}</button>;
}

function PfDashboard({ demo, navigateTo }: { demo: ReturnType<typeof usePrefectDemo>; navigateTo: (p: string) => void }) {
  const active = demo.appointments.filter((a) => a.status === 'Active');
  const pending = demo.appointments.filter((a) => a.status === 'Nominated' || a.status === 'Under Review');
  const todayDuties = demo.duties.filter((d) => d.date === '16 Oct 2026');
  const overdueTasks = demo.tasks.filter((t) => t.status !== 'Completed' && t.status !== 'Reviewed');
  const openIncidents = demo.incidents.filter((i) => i.status !== 'Closed');
  const confidentialIncidents = demo.incidents.filter((i) => i.confidential && i.status !== 'Closed');
  return <><div className="pf-kpi-grid">
    <PfMetric icon={Crown} label="Active prefects" value={String(active.length)} detail={`${pending.length} pending review`} onClick={() => navigateTo('/prefect/appointments')} />
    <PfMetric icon={Calendar} label="Today's duties" value={String(todayDuties.length)} detail={`${todayDuties.filter((d) => d.status === 'Completed').length} completed`} tone="teal" onClick={() => navigateTo('/prefect/duties')} />
    <PfMetric icon={CheckCircle2} label="Open tasks" value={String(overdueTasks.length)} detail={`${overdueTasks.filter((t) => t.status === 'Overdue').length} overdue`} tone="gold" onClick={() => navigateTo('/prefect/tasks')} />
    <PfMetric icon={ShieldAlert} label="Open incidents" value={String(openIncidents.length)} detail={`${confidentialIncidents.length} confidential`} tone="red" onClick={() => navigateTo('/prefect/incidents')} />
  </div>
  {confidentialIncidents.length > 0 && <div className="pf-confidential-banner"><ShieldAlert size={18} /><div><strong>Confidential safeguarding reports active</strong><small>{confidentialIncidents.length} report(s) under restricted access — visible only to designated staff</small></div></div>}
  <div className="pf-main-grid">
    <Panel title="Today's duty roster" subtitle={`${todayDuties.length} duty assignment(s) for 16 Oct 2026`}>
      <div className="pf-record-list">{todayDuties.map((d) => <div className="pf-record-row" key={d.id}><div><strong>{d.dutyName}</strong><span>{d.startTime}–{d.endTime} · {d.location} · {d.prefectName}</span></div><span className={`pf-status ${d.status === 'Completed' ? 'good' : d.status === 'Incomplete' ? 'bad' : d.status === 'In Progress' ? 'info' : 'warning'}`}>{d.status}</span></div>)}</div>
    </Panel>
    <Panel title="Pending reviews" subtitle="Appointments and tasks awaiting action">
      <div className="pf-task-list">
        {pending.map((a) => <button key={a.id} className="pf-task" onClick={() => navigateTo('/prefect/appointments')}><div className="pf-task-icon"><Crown size={14} /></div><div><strong>{a.studentName} — {a.positionTitle}</strong><small>Nominated {a.startDate} · Status: {a.status}</small></div><b>Review</b></button>)}
        {overdueTasks.filter((t) => t.status === 'Overdue').map((t) => <button key={t.id} className="pf-task" onClick={() => navigateTo('/prefect/tasks')}><div className="pf-task-icon"><CheckCircle2 size={14} /></div><div><strong>{t.title}</strong><small>Overdue · {t.prefectName} · Due {t.dueDate}</small></div><b>Follow up</b></button>)}
        {pending.length === 0 && overdueTasks.filter((t) => t.status === 'Overdue').length === 0 && <button className="pf-task"><div className="pf-task-icon"><CheckCircle2 size={14} /></div><div><strong>All clear</strong><small>No pending reviews</small></div></button>}
      </div>
    </Panel>
  </div>
  <div className="pf-main-grid pf-lower-grid">
    <Panel title="Recent incidents" subtitle="Latest reported incidents and safeguarding concerns">
      <div className="pf-record-list">{demo.incidents.slice(0, 5).map((i) => <div className="pf-record-row" key={i.id}><div><strong>{i.reference} · {i.category}</strong><span>{i.date} {i.time} · {i.location}{i.confidential ? ' · CONFIDENTIAL' : ''}</span></div><span className={`pf-status ${i.status === 'Closed' ? 'good' : i.status === 'Escalated' ? 'bad' : i.status === 'Actioned' ? 'info' : 'warning'}`}>{i.status}</span></div>)}</div>
    </Panel>
    <Panel title="Quick actions" subtitle="Common operations">
      <div className="pf-quick-grid">
        <QuickAction label="Nominate prefect" icon={Crown} onClick={() => navigateTo('/prefect/appointments')} />
        <QuickAction label="Assign duty" icon={Calendar} onClick={() => navigateTo('/prefect/duties')} />
        <QuickAction label="Create task" icon={CheckCircle2} onClick={() => navigateTo('/prefect/tasks')} />
        <QuickAction label="Report incident" icon={ShieldAlert} onClick={() => navigateTo('/prefect/incidents')} />
      </div>
    </Panel>
  </div></>;
}

function PositionsView({ demo }: { demo: ReturnType<typeof usePrefectDemo> }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [exclusive, setExclusive] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = prefectDemo.addPosition(title, category || 'General', description, exclusive, '');
    if (r.ok) { setSuccess('Position created.'); setError(''); setTitle(''); setCategory(''); setDescription(''); setExclusive(false); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  return <><Panel title="Add prefect position" subtitle="Create configurable leadership positions">
    <form className="pf-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Position title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Head Prefect" /></label>
        <label>Category<input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. School Leadership" /></label>
      </div>
      <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Role description and responsibilities" /></label>
      <label style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}><input type="checkbox" checked={exclusive} onChange={(e) => setExclusive(e.target.checked)} /> Exclusive position (only one active appointment)</label>
      <button className="pf-button primary" type="submit" disabled={!title.trim()}><Plus size={15} /> Create position</button>
      {error && <span className="pf-form-error">{error}</span>}
      {success && <span className="pf-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Position register" subtitle={`${demo.positions.length} position(s) configured`}>
    <div className="pf-table-wrap"><table className="pf-table"><thead><tr><th>Title</th><th>Category</th><th>Exclusive</th><th>Active appointments</th><th>Status</th><th>Action</th></tr></thead>
    <tbody>{demo.positions.map((p) => { const count = demo.appointments.filter((a) => a.positionId === p.id && a.status === 'Active').length; return <tr key={p.id}><td><strong>{p.title}</strong><br /><small style={{ color: '#a1adb1' }}>{p.description}</small></td><td>{p.category}</td><td>{p.exclusive ? 'Yes' : 'No'}</td><td>{count}</td><td><span className={`pf-status ${p.status === 'Active' ? 'good' : 'neutral'}`}>{p.status}</span></td><td><button className="pf-link" onClick={() => { const r = prefectDemo.togglePositionStatus(p.id); if (!r.ok) alert(r.error); }}>{p.status === 'Active' ? 'Deactivate' : 'Activate'}</button></td></tr>; })}</tbody></table></div>
  </Panel></>;
}

function AppointmentsView({ demo }: { demo: ReturnType<typeof usePrefectDemo> }) {
  const [positionId, setPositionId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [house, setHouse] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedApt, setSelectedApt] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!positionId || !studentName.trim()) { setError('Position and student name are required.'); return; }
    const sid = `stu-${Date.now()}`;
    const r = prefectDemo.nominateForPosition(positionId, sid, studentName, className, house, supervisor, reason);
    if (r.ok) { setSuccess('Nomination submitted.'); setError(''); setPositionId(''); setStudentName(''); setClassName(''); setHouse(''); setSupervisor(''); setReason(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  const appt = demo.appointments.find((a) => a.id === selectedApt);
  const statusColor = (s: AppointmentStatus) => s === 'Active' ? 'good' : s === 'Completed' || s === 'Renewed' ? 'info' : s === 'Ended' ? 'neutral' : s === 'Under Review' ? 'warning' : s === 'Draft' ? 'neutral' : 'info';
  return <><Panel title="Nominate prefect" subtitle="Nominate a student for a prefect position">
    <form className="pf-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Position<select value={positionId} onChange={(e) => setPositionId(e.target.value)}><option value="">Select position...</option>{demo.positions.filter((p) => p.status === 'Active').map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select></label>
        <label>Student name<input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Daniel Mwangi" /></label>
        <label>Class<input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="e.g. Form 4 — Athi" /></label>
        <label>House<input value={house} onChange={(e) => setHouse(e.target.value)} placeholder="e.g. Cedar House" /></label>
        <label>Supervising staff<input value={supervisor} onChange={(e) => setSupervisor(e.target.value)} placeholder="e.g. Mr. Kiprop" /></label>
      </div>
      <label>Reason for nomination<textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Why this student is being nominated" /></label>
      <button className="pf-button primary" type="submit" disabled={!positionId || !studentName.trim()}><Plus size={15} /> Nominate</button>
      {error && <span className="pf-form-error">{error}</span>}
      {success && <span className="pf-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Appointment register" subtitle={`${demo.appointments.length} appointment(s) — full lifecycle`}>
    <div className="pf-record-list">{demo.appointments.map((a) => <div className="pf-record-row" key={a.id}><div><strong>{a.studentName} — {a.positionTitle}</strong><span>{a.className} · {a.house} · {a.startDate}{a.endDate ? ` to ${a.endDate}` : ''} · Supervisor: {a.supervisor}{a.probation ? ' · Probation' : ''}</span></div><span className={`pf-status ${statusColor(a.status)}`}>{a.status}</span><div className="pf-row-actions"><button className="pf-link" onClick={() => setSelectedApt(a.id)}>View</button>{a.status === 'Nominated' && <button className="pf-link" onClick={() => { const r = prefectDemo.advanceAppointment(a.id, 'Under Review', 'Mr. Kiprop', 'Moved to review'); if (!r.ok) alert(r.error); }}>Review</button>}{a.status === 'Under Review' && <button className="pf-link" onClick={() => { const r = prefectDemo.advanceAppointment(a.id, 'Approved', 'Principal', 'Approved by principal'); if (!r.ok) alert(r.error); }}>Approve</button>}{a.status === 'Approved' && <button className="pf-link" onClick={() => { const r = prefectDemo.advanceAppointment(a.id, 'Active', 'Mr. Kiprop', 'Activated'); if (!r.ok) alert(r.error); }}>Activate</button>}{a.status === 'Active' && <button className="pf-link" onClick={() => { const r = prefectDemo.endAppointment(a.id, 'Term ended', 'Mr. Kiprop'); if (!r.ok) alert(r.error); }}>End</button>}</div></div>)}</div>
  </Panel>
  {appt && <Panel title={`Appointment history — ${appt.studentName}`} subtitle={`${appt.positionTitle} · ${appt.status}`}>
    <div className="pf-history">{appt.history.map((h, i) => <div className="pf-history-item" key={i}><div><strong>{h.action}</strong><span>{h.date} · {h.actor} · {h.note}</span></div></div>)}</div>
  </Panel>}</>;
}

function DutyTypesView({ demo }: { demo: ReturnType<typeof usePrefectDemo> }) {
  return <Panel title="Duty types" subtitle={`${demo.dutyTypes.length} configured duty type(s)`}>
    <div className="pf-table-wrap"><table className="pf-table"><thead><tr><th>Name</th><th>Shift</th><th>Location</th><th>Recurring</th><th>Description</th></tr></thead>
    <tbody>{demo.dutyTypes.map((d) => <tr key={d.id}><td><strong>{d.name}</strong></td><td><span className="pf-soft-tag">{d.shift}</span></td><td>{d.location}</td><td>{d.recurring ? 'Yes' : 'No'}</td><td>{d.description}</td></tr>)}</tbody></table></div>
  </Panel>;
}

function DutiesView({ demo }: { demo: ReturnType<typeof usePrefectDemo> }) {
  const [dutyTypeId, setDutyTypeId] = useState('');
  const [prefectId, setPrefectId] = useState('');
  const [date, setDate] = useState('16 Oct 2026');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [team, setTeam] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const activePrefects = demo.appointments.filter((a) => a.status === 'Active');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dutyTypeId || !prefectId || !startTime || !endTime) { setError('Duty type, prefect and times are required.'); return; }
    const appt = activePrefects.find((a) => a.studentId === prefectId);
    if (!appt) { setError('Selected student has no active appointment.'); return; }
    const teamArr = team ? team.split(',').map((t) => t.trim()) : [appt.studentName];
    const r = prefectDemo.assignDuty(dutyTypeId, prefectId, appt.studentName, date, startTime, endTime, supervisor, teamArr);
    if (r.ok) { setSuccess('Duty assigned.'); setError(''); setDutyTypeId(''); setPrefectId(''); setStartTime(''); setEndTime(''); setSupervisor(''); setTeam(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  const statusColor = (s: DutyStatus) => s === 'Completed' ? 'good' : s === 'Incomplete' || s === 'Cancelled' ? 'bad' : s === 'In Progress' ? 'info' : 'warning';
  return <><Panel title="Assign duty" subtitle="Create a duty assignment for an active prefect">
    <form className="pf-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Duty type<select value={dutyTypeId} onChange={(e) => setDutyTypeId(e.target.value)}><option value="">Select duty...</option>{demo.dutyTypes.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select></label>
        <label>Prefect<select value={prefectId} onChange={(e) => setPrefectId(e.target.value)}><option value="">Select active prefect...</option>{activePrefects.map((a) => <option key={a.id} value={a.studentId}>{a.studentName} — {a.positionTitle}</option>)}</select></label>
        <label>Date<input value={date} onChange={(e) => setDate(e.target.value)} placeholder="16 Oct 2026" /></label>
        <label>Supervisor<input value={supervisor} onChange={(e) => setSupervisor(e.target.value)} placeholder="e.g. Mr. Kiprop" /></label>
        <label>Start time<input value={startTime} onChange={(e) => setStartTime(e.target.value)} type="time" /></label>
        <label>End time<input value={endTime} onChange={(e) => setEndTime(e.target.value)} type="time" /></label>
      </div>
      <label>Team members (comma-separated)<input value={team} onChange={(e) => setTeam(e.target.value)} placeholder="e.g. Daniel Mwangi, Esther Nyambura" /></label>
      <button className="pf-button primary" type="submit" disabled={!dutyTypeId || !prefectId || !startTime || !endTime}><Plus size={15} /> Assign duty</button>
      {error && <span className="pf-form-error">{error}</span>}
      {success && <span className="pf-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Duty roster" subtitle={`${demo.duties.length} duty assignment(s) — overlap detection active`}>
    <div className="pf-table-wrap"><table className="pf-table"><thead><tr><th>Duty</th><th>Prefect</th><th>Date</th><th>Time</th><th>Location</th><th>Supervisor</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>{demo.duties.map((d) => <tr key={d.id}><td>{d.dutyName}</td><td>{d.prefectName}{d.replacementName && <><br /><small style={{ color: '#a1adb1' }}>Replaced by: {d.replacementName}</small></>}</td><td>{d.date}</td><td>{d.startTime}–{d.endTime}</td><td>{d.location}</td><td>{d.supervisor}</td><td><span className={`pf-status ${statusColor(d.status)}`}>{d.status}</span></td><td><div className="pf-row-actions">{d.status === 'Scheduled' && <button className="pf-link" onClick={() => { const r = prefectDemo.completeDuty(d.id, 'Duty completed.'); if (!r.ok) alert(r.error); }}>Complete</button>}{d.status === 'Scheduled' && <button className="pf-link" onClick={() => { const r = prefectDemo.markDutyIncomplete(d.id, 'Unable to complete'); if (!r.ok) alert(r.error); }}>Mark incomplete</button>}</div></td></tr>)}</tbody></table></div>
  </Panel></>;
}

function TasksView({ demo }: { demo: ReturnType<typeof usePrefectDemo> }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prefectId, setPrefectId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Normal');
  const [location, setLocation] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const activePrefects = demo.appointments.filter((a) => a.status === 'Active');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !prefectId) { setError('Title and responsible prefect are required.'); return; }
    const appt = activePrefects.find((a) => a.studentId === prefectId);
    if (!appt) { setError('Invalid prefect selection.'); return; }
    const r = prefectDemo.createTask(title, description, prefectId, appt.studentName, dueDate, priority, location, instructions, 'Mr. Kiprop');
    if (r.ok) { setSuccess('Task created and assigned.'); setError(''); setTitle(''); setDescription(''); setPrefectId(''); setDueDate(''); setLocation(''); setInstructions(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  const statusColor = (s: TaskStatus) => s === 'Completed' ? 'good' : s === 'Overdue' || s === 'Returned' ? 'bad' : s === 'Submitted' || s === 'Reviewed' ? 'info' : 'warning';
  return <><Panel title="Create task" subtitle="Assign a task to an active prefect">
    <form className="pf-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Prepare assembly seating plan" /></label>
        <label>Responsible prefect<select value={prefectId} onChange={(e) => setPrefectId(e.target.value)}><option value="">Select prefect...</option>{activePrefects.map((a) => <option key={a.id} value={a.studentId}>{a.studentName} — {a.positionTitle}</option>)}</select></label>
        <label>Due date<input value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="e.g. 20 Oct 2026" /></label>
        <label>Priority<select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}><option>Low</option><option>Normal</option><option>High</option><option>Urgent</option></select></label>
        <label>Location<input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Assembly Hall" /></label>
      </div>
      <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task description" /></label>
      <label>Instructions<textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Detailed instructions for the prefect" /></label>
      <button className="pf-button primary" type="submit" disabled={!title.trim() || !prefectId}><Plus size={15} /> Create task</button>
      {error && <span className="pf-form-error">{error}</span>}
      {success && <span className="pf-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Task list" subtitle={`${demo.tasks.length} task(s) — full lifecycle tracking`}>
    <div className="pf-record-list">{demo.tasks.map((t) => <div className="pf-record-row" key={t.id}><div><strong>{t.title}</strong><span>{t.prefectName} · Due {t.dueDate} · {t.location} · Priority: {t.priority}{t.submittedNote ? ` · Submitted: ${t.submittedNote}` : ''}{t.reviewNote ? ` · Review: ${t.reviewNote}` : ''}</span></div><span className={`pf-status ${statusColor(t.status)}`}>{t.status}</span><div className="pf-row-actions">{t.status === 'Assigned' && <button className="pf-link" onClick={() => { const r = prefectDemo.advanceTask(t.id, 'Acknowledged', '', t.prefectName); if (!r.ok) alert(r.error); }}>Acknowledge</button>}{t.status === 'Acknowledged' && <button className="pf-link" onClick={() => { const r = prefectDemo.advanceTask(t.id, 'In Progress', '', t.prefectName); if (!r.ok) alert(r.error); }}>Start</button>}{t.status === 'In Progress' && <button className="pf-link" onClick={() => { const r = prefectDemo.advanceTask(t.id, 'Submitted', 'Task submitted for review', t.prefectName); if (!r.ok) alert(r.error); }}>Submit</button>}{t.status === 'Submitted' && <button className="pf-link" onClick={() => { const r = prefectDemo.advanceTask(t.id, 'Reviewed', 'Good work', 'Mr. Kiprop'); if (!r.ok) alert(r.error); }}>Review</button>}{t.status === 'Reviewed' && <button className="pf-link" onClick={() => { const r = prefectDemo.advanceTask(t.id, 'Completed', 'Task completed', 'Mr. Kiprop'); if (!r.ok) alert(r.error); }}>Complete</button>}{t.status === 'Reviewed' && <button className="pf-link" onClick={() => { const r = prefectDemo.advanceTask(t.id, 'Returned', 'Needs revision', 'Mr. Kiprop'); if (!r.ok) alert(r.error); }}>Return</button>}</div></div>)}</div>
  </Panel></>;
}

function IncidentsView({ demo }: { demo: ReturnType<typeof usePrefectDemo> }) {
  const [category, setCategory] = useState<IncidentCategory>('Duty issue');
  const [urgency, setUrgency] = useState<IncidentUrgency>('Low');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [reporterRole, setReporterRole] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [confidential, setConfidential] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description.trim() || !reportedBy.trim()) { setError('Description and reporter name are required.'); return; }
    const r = prefectDemo.submitIncident(category, urgency, description, location, reportedBy, reporterRole || 'Prefect', assignedTo || 'Mr. Kiprop', confidential);
    if (r.ok) { setSuccess('Incident report submitted.'); setError(''); setDescription(''); setLocation(''); setReportedBy(''); setReporterRole(''); setAssignedTo(''); setConfidential(false); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  const statusColor = (s: IncidentStatus) => s === 'Closed' ? 'good' : s === 'Escalated' ? 'bad' : s === 'Actioned' ? 'info' : 'warning';
  return <><div className="pf-confidential-banner"><ShieldAlert size={18} /><div><strong>Safeguarding notice</strong><small>Prefects are student leaders, not trained staff. Sensitive reports go directly to designated staff. Confidential reports are not visible to other prefects or students.</small></div></div>
  <Panel title="Report incident" subtitle="Submit a factual observation or welfare concern">
    <form className="pf-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Category<select value={category} onChange={(e) => setCategory(e.target.value as IncidentCategory)}><option>Duty issue</option><option>Damaged facility</option><option>Safety hazard</option><option>Bullying concern</option><option>Lost property</option><option>Welfare concern</option><option>Request for assistance</option></select></label>
        <label>Urgency<select value={urgency} onChange={(e) => setUrgency(e.target.value as IncidentUrgency)}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></label>
        <label>Location<input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Cedar Dormitory A, Room 4" /></label>
        <label>Reported by<input value={reportedBy} onChange={(e) => setReportedBy(e.target.value)} placeholder="Prefect name" /></label>
        <label>Reporter role<input value={reporterRole} onChange={(e) => setReporterRole(e.target.value)} placeholder="e.g. Boarding Prefect" /></label>
        <label>Assign to<input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="e.g. Mr. Kiprop" /></label>
      </div>
      <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Factual description of the observation" /></label>
      <label style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}><input type="checkbox" checked={confidential} onChange={(e) => setConfidential(e.target.checked)} /> Confidential — restrict to designated staff only</label>
      <button className="pf-button primary" type="submit" disabled={!description.trim() || !reportedBy.trim()}><Plus size={15} /> Submit report</button>
      {error && <span className="pf-form-error">{error}</span>}
      {success && <span className="pf-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Incident register" subtitle={`${demo.incidents.length} report(s) — restricted access`}>
    <div className="pf-record-list">{demo.incidents.map((i) => <div className="pf-record-row" key={i.id}><div><strong>{i.reference} · {i.category}</strong><span>{i.date} {i.time} · {i.location} · By {i.reportedBy}{i.confidential ? ' · CONFIDENTIAL' : ''} · Assigned: {i.assignedTo}{i.resolution ? ` · Resolution: ${i.resolution}` : ''}</span></div><span className={`pf-status ${statusColor(i.status)}`}>{i.status}</span><div className="pf-row-actions">{i.status === 'Submitted' && <button className="pf-link" onClick={() => { const r = prefectDemo.advanceIncident(i.id, 'Under Review', 'Under review', 'Mr. Kiprop'); if (!r.ok) alert(r.error); }}>Review</button>}{i.status === 'Under Review' && <button className="pf-link" onClick={() => { const r = prefectDemo.advanceIncident(i.id, 'Actioned', 'Action taken', i.assignedTo); if (!r.ok) alert(r.error); }}>Action</button>}{i.status === 'Under Review' && i.urgency === 'Critical' && <button className="pf-link" onClick={() => { const r = prefectDemo.advanceIncident(i.id, 'Escalated', 'Escalated to safeguarding', 'Ms. Wairimu'); if (!r.ok) alert(r.error); }}>Escalate</button>}{i.status !== 'Closed' && <button className="pf-link" onClick={() => { const r = prefectDemo.advanceIncident(i.id, 'Closed', 'Resolved', i.assignedTo); if (!r.ok) alert(r.error); }}>Close</button>}</div></div>)}</div>
  </Panel></>;
}

function TrainingView({ demo }: { demo: ReturnType<typeof usePrefectDemo> }) {
  return <Panel title="Training sessions" subtitle={`${demo.trainingSessions.length} session(s)`}>
    <div className="pf-record-list">{demo.trainingSessions.map((t) => <div className="pf-record-row" key={t.id}><div><strong>{t.title}</strong><span>{t.date} · {t.time} · {t.location} · {t.attendees.length} attendees</span></div><span className={`pf-status ${t.status === 'Completed' ? 'good' : t.status === 'Cancelled' ? 'bad' : 'warning'}`}>{t.status}</span></div>)}</div>
  </Panel>;
}

function AnnouncementsView({ demo }: { demo: ReturnType<typeof usePrefectDemo> }) {
  return <Panel title="Announcements" subtitle={`${demo.announcements.length} announcement(s) from supervising staff`}>
    <div className="pf-record-list">{demo.announcements.map((a) => <div className="pf-record-row" key={a.id}><div><strong>{a.title}</strong><span>{a.detail}</span><span style={{ fontSize: 10, color: '#a1adb1' }}>Posted by {a.postedBy} · {a.date} · {a.audience}</span></div></div>)}</div>
  </Panel>;
}

function NotificationsView({ demo }: { demo: ReturnType<typeof usePrefectDemo> }) {
  return <Panel title="Notifications" subtitle={`${demo.notifications.length} notification(s)`}>
    <div className="pf-record-list">{demo.notifications.map((n) => <div className="pf-record-row" key={n.id}><div><strong>{n.title}</strong><span>{n.detail} · {n.date} · To: {n.recipient}</span></div><span className={`pf-status ${n.unread ? 'warning' : 'neutral'}`}>{n.unread ? 'Unread' : 'Read'}</span><div className="pf-row-actions">{n.unread && <button className="pf-link" onClick={() => prefectDemo.markNotificationRead(n.id)}>Mark read</button>}</div></div>)}</div>
  </Panel>;
}

function ReportsView({ demo }: { demo: ReturnType<typeof usePrefectDemo> }) {
  const active = demo.appointments.filter((a) => a.status === 'Active');
  const completedDuties = demo.duties.filter((d) => d.status === 'Completed');
  const totalDuties = demo.duties.filter((d) => d.status !== 'Cancelled' && d.status !== 'Rescheduled');
  const completionRate = totalDuties.length > 0 ? Math.round((completedDuties.length / totalDuties.length) * 100) : 0;
  const completedTasks = demo.tasks.filter((t) => t.status === 'Completed');
  const openIncidents = demo.incidents.filter((i) => i.status !== 'Closed');
  return <><div className="pf-kpi-grid">
    <PfMetric icon={Crown} label="Active appointments" value={String(active.length)} detail={`${demo.appointments.length} total`} onClick={() => {}} />
    <PfMetric icon={Calendar} label="Duty completion" value={`${completionRate}%`} detail={`${completedDuties.length}/${totalDuties.length} duties`} tone="teal" onClick={() => {}} />
    <PfMetric icon={CheckCircle2} label="Tasks completed" value={String(completedTasks.length)} detail={`${demo.tasks.length} total tasks`} tone="gold" onClick={() => {}} />
    <PfMetric icon={ShieldAlert} label="Open incidents" value={String(openIncidents.length)} detail={`${demo.incidents.length} total reports`} tone="red" onClick={() => {}} />
  </div>
  <Panel title="Appointment register" subtitle="All appointments by status">
    <div className="pf-table-wrap"><table className="pf-table"><thead><tr><th>Student</th><th>Position</th><th>House</th><th>Start</th><th>End</th><th>Status</th><th>Supervisor</th></tr></thead>
    <tbody>{demo.appointments.map((a) => <tr key={a.id}><td>{a.studentName}</td><td>{a.positionTitle}</td><td>{a.house}</td><td>{a.startDate}</td><td>{a.endDate ?? '—'}</td><td><span className={`pf-status ${a.status === 'Active' ? 'good' : a.status === 'Completed' || a.status === 'Ended' ? 'neutral' : 'warning'}`}>{a.status}</span></td><td>{a.supervisor}</td></tr>)}</tbody></table></div>
  </Panel>
  <Panel title="Duty completion by prefect" subtitle="Performance calculated from recorded events">
    <div className="pf-table-wrap"><table className="pf-table"><thead><tr><th>Prefect</th><th>Assigned</th><th>Completed</th><th>Incomplete</th><th>Rate</th></tr></thead>
    <tbody>{active.map((a) => { const duties = demo.duties.filter((d) => d.prefectId === a.studentId); const comp = duties.filter((d) => d.status === 'Completed'); const inc = duties.filter((d) => d.status === 'Incomplete'); const rate = duties.length > 0 ? Math.round((comp.length / duties.length) * 100) : 0; return <tr key={a.id}><td>{a.studentName}</td><td>{duties.length}</td><td>{comp.length}</td><td>{inc.length}</td><td>{rate}%</td></tr>; })}</tbody></table></div>
  </Panel></>;
}

function AuditView({ demo }: { demo: ReturnType<typeof usePrefectDemo> }) {
  return <Panel title="Audit history" subtitle={`${demo.audit.length} recorded action(s)`}>
    <div className="pf-record-list">{demo.audit.map((a) => <div className="pf-record-row" key={a.id}><div><strong>{a.action}</strong><span>{a.target} · By {a.actor} · {a.timestamp}</span></div></div>)}</div>
  </Panel>;
}

function SettingsView() {
  return <Panel title="Settings" subtitle="Prefect engine configuration">
    <div className="pf-form">
      <label>Teacher in charge<input defaultValue="Mr. Kiprop" /></label>
      <label>Default probation period (days)<input type="number" defaultValue={30} /></label>
      <label>Review cycle<select><option>Monthly</option><option>Termly</option><option>Annual</option></select></label>
      <button className="pf-button primary">Save settings</button>
    </div>
  </Panel>;
}
