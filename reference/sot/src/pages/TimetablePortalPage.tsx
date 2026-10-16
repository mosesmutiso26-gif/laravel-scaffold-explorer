import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Bell, Calendar, CheckCircle2, ChevronDown, ClipboardList, Clock3, FileText, HelpCircle, LayoutDashboard, LogOut, Menu, MoreHorizontal, Plus, RotateCcw, Search, Settings, ShieldCheck, UserCog, Users, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/timetable.css';
import { timetableDemo, useTimetableDemo, type AdjustmentStatus, type AdjustmentType, type Day } from '@/data/timetableDemo';

type TtNav = { label: string; path: string; icon: LucideIcon; group: string };
const ttNav: TtNav[] = [
  { label: 'Dashboard', path: '/timetable/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Weekly grid', path: '/timetable/grid', icon: Calendar, group: 'Views' },
  { label: 'Teacher timetable', path: '/timetable/teacher', icon: UserCog, group: 'Views' },
  { label: 'Class timetable', path: '/timetable/class', icon: Users, group: 'Views' },
  { label: 'Draft & publish', path: '/timetable/versions', icon: ClipboardList, group: 'Management' },
  { label: 'Conflict detection', path: '/timetable/conflicts', icon: AlertTriangle, group: 'Management' },
  { label: 'Adjustment centre', path: '/timetable/adjustments', icon: Clock3, group: 'Management' },
  { label: 'Substitute teacher', path: '/timetable/substitutes', icon: UserCog, group: 'Management' },
  { label: 'Teacher absences', path: '/timetable/absences', icon: FileText, group: 'Management' },
  { label: 'Notifications', path: '/timetable/notifications', icon: Bell, group: 'Communication' },
  { label: 'Audit history', path: '/timetable/audit', icon: FileText, group: 'Controls' },
  { label: 'Settings', path: '/timetable/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Views', 'Management', 'Communication', 'Controls', 'Account'];
const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export function TimetablePortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useTimetableDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const current = ttNav.find((item) => location.pathname.startsWith(item.path)) ?? ttNav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const openConflicts = demo.conflicts.filter((c) => c.status === 'Open' && c.severity === 'Hard');
  const pendingAdjustments = demo.adjustments.filter((a) => a.status === 'Awaiting Approval' || a.status === 'Approved');
  const unresolvedSubs = demo.substitutes.filter((s) => s.status === 'Unresolved');
  const uncoveredAbsences = demo.teacherAbsences.filter((a) => a.status === 'Uncovered');
  const unreadCount = demo.notifications.filter((n) => n.unread).length;
  return <div className="tt-app">
    <aside className={`tt-sidebar ${mobile ? 'open' : ''}`}><div className="tt-brand"><div className="tt-brand-mark"><Calendar size={21} /></div><div><strong>Riverside</strong><span>Timetable Centre</span></div><button className="tt-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div><div className="tt-demo-pill"><span className="tt-demo-dot" /> DEMO MODE <span>•</span> October 2026</div><div className="tt-school"><div>RA</div><span><strong>Riverside Academy</strong><small>Timetable Management</small></span><ChevronDown size={15} /></div><nav className="tt-nav">{groups.map((group) => <div className="tt-nav-group" key={group}><p>{group}</p>{ttNav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={`tt-nav-item${current.path === path || (path !== '/timetable/dashboard' && location.pathname.startsWith(path)) ? ' active' : ''}`} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Conflict detection' && openConflicts.length > 0 && <em className="badge-red">{openConflicts.length}</em>}{label === 'Adjustment centre' && pendingAdjustments.length > 0 && <em>{pendingAdjustments.length}</em>}{label === 'Substitute teacher' && unresolvedSubs.length > 0 && <em className="badge-red">{unresolvedSubs.length}</em>}{label === 'Notifications' && unreadCount > 0 && <em>{unreadCount}</em>}</button>)}</div>)}</nav><div className="tt-sidebar-footer"><button onClick={() => navigateTo('/timetable/settings')}><HelpCircle size={16} /> Help centre</button><div className="tt-user"><div className="tt-avatar">AD</div><span><strong>Administrator</strong><small>Timetable Admin</small></span><MoreHorizontal size={16} /></div></div></aside>
    {mobile && <button className="tt-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="tt-main"><header className="tt-topbar"><button className="tt-menu-button" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="tt-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="tt-top-actions"><div className="tt-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search classes, teachers..." /></div><button className="tt-icon-button" onClick={() => navigateTo('/timetable/notifications')} aria-label="Open notifications"><Bell size={18} />{unreadCount > 0 && <i />}</button><div className="tt-profile-wrap"><button className="tt-profile" onClick={() => setProfileOpen(!profileOpen)}><div className="tt-avatar">AD</div><span>Admin</span><ChevronDown size={15} /></button>{profileOpen && <div className="tt-profile-menu"><strong>Administrator</strong><small>Timetable Admin</small><button onClick={() => navigateTo('/timetable/settings')}><Settings size={14} /> Settings</button><button onClick={() => timetableDemo.reset()}><RotateCcw size={14} /> Reset demo data</button><button onClick={() => navigateTo('/')}><LogOut size={14} /> Exit portal</button></div>}</div></div></header><div className="tt-content"><div className="tt-context"><div><span className="tt-kicker"><ShieldCheck size={14} /> Timetable Centre <b>•</b> 2026 · Term 3</span><h1>{current.label}</h1><p>{ttDescription(location.pathname)}</p></div><div className="tt-context-actions">{current.path === '/timetable/adjustments' && <button className="tt-button primary" onClick={() => navigateTo('/timetable/adjustments')}><Plus size={15} /> New adjustment</button>}</div></div><TtRoute path={location.pathname} demo={demo} navigateTo={navigateTo} /></div></main>
  </div>;
}

function ttDescription(path: string): string {
  if (path.includes('dashboard')) return 'Timetable management overview — versions, conflicts, adjustments and substitute assignments.';
  if (path.includes('grid')) return 'Weekly timetable grid view for all classes and teachers.';
  if (path.includes('teacher')) return 'Teacher-specific timetable with substitution and conflict information.';
  if (path.includes('class')) return 'Class-specific timetable with subject, teacher and room assignments.';
  if (path.includes('version')) return 'Draft and published version management with publication controls.';
  if (path.includes('conflict')) return 'Server-side conflict detection — teacher, room and class double-booking.';
  if (path.includes('adjustment')) return 'Timetable adjustment centre — request, approve, apply and notify.';
  if (path.includes('substitute')) return 'Substitute teacher assignment for absent teachers.';
  if (path.includes('absence')) return 'Teacher absence records with affected lessons and coverage status.';
  if (path.includes('notification')) return 'Timetable change notifications to affected users.';
  if (path.includes('audit')) return 'Every timetable action is logged with actor, target and timestamp.';
  return 'Central timetable management and adjustment centre.';
}

function TtRoute({ path, demo, navigateTo }: { path: string; demo: ReturnType<typeof useTimetableDemo>; navigateTo: (p: string) => void }) {
  if (path === '/timetable/dashboard' || path === '/timetable') return <TtDashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/timetable/grid')) return <GridView demo={demo} />;
  if (path.startsWith('/timetable/teacher')) return <TeacherView demo={demo} />;
  if (path.startsWith('/timetable/class')) return <ClassView demo={demo} />;
  if (path.startsWith('/timetable/versions')) return <VersionsView demo={demo} />;
  if (path.startsWith('/timetable/conflicts')) return <ConflictsView demo={demo} />;
  if (path.startsWith('/timetable/adjustments')) return <AdjustmentsView demo={demo} />;
  if (path.startsWith('/timetable/substitutes')) return <SubstitutesView demo={demo} />;
  if (path.startsWith('/timetable/absences')) return <AbsencesView demo={demo} />;
  if (path.startsWith('/timetable/notifications')) return <NotificationsView demo={demo} />;
  if (path.startsWith('/timetable/audit')) return <AuditView demo={demo} />;
  return <SettingsView />;
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return <div className="tt-panel"><div className="tt-panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>{children}</div>;
}
function TtMetric({ icon: Icon, label, value, detail, tone, onClick }: { icon: LucideIcon; label: string; value: string; detail: string; tone?: string; onClick: () => void }) {
  return <button className="tt-metric" onClick={onClick}><div className={`tt-metric-icon ${tone ?? ''}`}><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></button>;
}

function TtDashboard({ demo, navigateTo }: { demo: ReturnType<typeof useTimetableDemo>; navigateTo: (p: string) => void }) {
  const hardConflicts = demo.conflicts.filter((c) => c.severity === 'Hard' && c.status === 'Open');
  const pendingAdj = demo.adjustments.filter((a) => a.status === 'Awaiting Approval' || a.status === 'Approved');
  const unresolvedSubs = demo.substitutes.filter((s) => s.status === 'Unresolved');
  const uncovered = demo.teacherAbsences.filter((a) => a.status === 'Uncovered');
  return <><div className="tt-kpi-grid">
    <TtMetric icon={Calendar} label="Current version" value={`v${demo.currentVersion.versionNumber}`} detail={demo.currentVersion.status} onClick={() => navigateTo('/timetable/versions')} />
    <TtMetric icon={AlertTriangle} label="Hard conflicts" value={String(hardConflicts.length)} detail="Block publication" tone="red" onClick={() => navigateTo('/timetable/conflicts')} />
    <TtMetric icon={Clock3} label="Pending adjustments" value={String(pendingAdj.length)} detail="Awaiting approval or application" tone="gold" onClick={() => navigateTo('/timetable/adjustments')} />
    <TtMetric icon={UserCog} label="Unresolved subs" value={String(unresolvedSubs.length)} detail={`${uncovered.length} uncovered absence(s)`} tone="blue" onClick={() => navigateTo('/timetable/substitutes')} />
  </div>
  {hardConflicts.length > 0 && <div className="tt-conflict-banner"><AlertTriangle size={18} /><div><strong>{hardConflicts.length} hard conflict(s) detected in draft version</strong><small>Hard conflicts block publication. Resolve before publishing the draft timetable.</small></div></div>}
  <div className="tt-main-grid">
    <Panel title="Active adjustments" subtitle={`${pendingAdj.length} adjustment(s) in progress`}>
      <div className="tt-record-list">{pendingAdj.map((a) => <div className="tt-record-row" key={a.id}><div><strong>{a.reference} — {a.type}</strong><span>{a.reason} · Requested by {a.requestedBy}</span></div><span className={`tt-status ${a.status === 'Approved' ? 'good' : a.status === 'Rejected' ? 'bad' : 'warning'}`}>{a.status}</span><div className="tt-row-actions"><button className="tt-link" onClick={() => navigateTo('/timetable/adjustments')}>Manage</button></div></div>)}</div>
    </Panel>
    <Panel title="Teacher absences" subtitle={`${demo.teacherAbsences.length} absence(s) — ${uncovered.length} uncovered`}>
      <div className="tt-record-list">{demo.teacherAbsences.map((a) => <div className="tt-record-row" key={a.id}><div><strong>{a.teacherName}</strong><span>{a.reason} · {a.startDate} to {a.endDate} · {a.affectedLessons} lessons affected</span></div><span className={`tt-status ${a.status === 'Covered' ? 'good' : 'bad'}`}>{a.status}</span></div>)}</div>
    </Panel>
  </div>
  <Panel title="Version history" subtitle="Published and archived timetable versions">
    <div className="tt-record-list">{[demo.currentVersion, ...demo.versions].map((v) => <div className="tt-record-row" key={v.id}><div><strong>v{v.versionNumber} — {v.label}</strong><span>{v.term} · Created {v.createdDate} by {v.createdBy}{v.publishedDate ? ` · Published ${v.publishedDate} by ${v.publishedBy}` : ''}</span></div><span className={`tt-status ${v.status === 'Published' ? 'good' : v.status === 'Draft' ? 'warning' : v.status === 'Superseded' ? 'info' : 'neutral'}`}>{v.status}</span></div>)}
    {demo.draftVersion && <div className="tt-record-row"><div><strong>v{demo.draftVersion.versionNumber} — {demo.draftVersion.label}</strong><span>{demo.draftVersion.term} · Created {demo.draftVersion.createdDate}</span></div><span className="tt-status warning">Draft</span></div>}
    </div>
  </Panel></>;
}

function GridView({ demo }: { demo: ReturnType<typeof useTimetableDemo> }) {
  const teachingPeriods = demo.periods.filter((p) => p.isTeaching);
  const entries = demo.currentVersion.entries;
  return <Panel title="Weekly timetable grid" subtitle={`${entries.length} entries · v${demo.currentVersion.versionNumber} (Published)`}>
    <div className="tt-table-wrap"><table className="tt-table"><thead><tr><th>Period</th><th>Time</th>{days.map((d) => <th key={d}>{d}</th>)}</tr></thead>
    <tbody>{teachingPeriods.map((p) => <tr key={p.id}><td><strong>{p.name}</strong></td><td style={{ fontSize: 10, color: '#8a979e' }}>{p.startTime}–{p.endTime}</td>{days.map((d) => { const dayEntries = entries.filter((e) => e.day === d && e.periodId === p.id); return <td key={d}>{dayEntries.map((e) => <div key={e.id} className="tt-grid-entry"><strong>{e.subjectName}</strong><br />{e.className}<br />{e.teacherName} · {e.roomName}</div>)}</td>; })}</tr>)}</tbody></table></div>
  </Panel>;
}

function TeacherView({ demo }: { demo: ReturnType<typeof useTimetableDemo> }) {
  const [teacherName, setTeacherName] = useState('');
  const teachers = [...new Set(demo.currentVersion.entries.map((e) => e.teacherName))];
  const entries = teacherName ? demo.currentVersion.entries.filter((e) => e.teacherName === teacherName) : [];
  const teachingPeriods = demo.periods.filter((p) => p.isTeaching);
  return <><Panel title="Teacher timetable" subtitle="Select a teacher to view their weekly schedule">
    <div className="tt-form"><label>Teacher<select value={teacherName} onChange={(e) => setTeacherName(e.target.value)}><option value="">Select teacher...</option>{teachers.map((t) => <option key={t} value={t}>{t}</option>)}</select></label></div>
  </Panel>
  {teacherName && <Panel title={`${teacherName} — Weekly timetable`} subtitle={`${entries.length} lesson(s) assigned`}>
    <div className="tt-table-wrap"><table className="tt-table"><thead><tr><th>Period</th><th>Time</th>{days.map((d) => <th key={d}>{d}</th>)}</tr></thead>
    <tbody>{teachingPeriods.map((p) => <tr key={p.id}><td><strong>{p.name}</strong></td><td style={{ fontSize: 10, color: '#8a979e' }}>{p.startTime}–{p.endTime}</td>{days.map((d) => { const dayEntries = entries.filter((e) => e.day === d && e.periodId === p.id); return <td key={d}>{dayEntries.map((e) => <div key={e.id} className="tt-grid-entry"><strong>{e.subjectName}</strong><br />{e.className}<br />{e.roomName}</div>)}</td>; })}</tr>)}</tbody></table></div>
  </Panel>}</>;
}

function ClassView({ demo }: { demo: ReturnType<typeof useTimetableDemo> }) {
  const [className, setClassName] = useState('');
  const classes = [...new Set(demo.currentVersion.entries.map((e) => e.className))];
  const entries = className ? demo.currentVersion.entries.filter((e) => e.className === className) : [];
  const teachingPeriods = demo.periods.filter((p) => p.isTeaching);
  return <><Panel title="Class timetable" subtitle="Select a class to view its weekly schedule">
    <div className="tt-form"><label>Class<select value={className} onChange={(e) => setClassName(e.target.value)}><option value="">Select class...</option>{classes.map((c) => <option key={c} value={c}>{c}</option>)}</select></label></div>
  </Panel>
  {className && <Panel title={`${className} — Weekly timetable`} subtitle={`${entries.length} lesson(s) scheduled`}>
    <div className="tt-table-wrap"><table className="tt-table"><thead><tr><th>Period</th><th>Time</th>{days.map((d) => <th key={d}>{d}</th>)}</tr></thead>
    <tbody>{teachingPeriods.map((p) => <tr key={p.id}><td><strong>{p.name}</strong></td><td style={{ fontSize: 10, color: '#8a979e' }}>{p.startTime}–{p.endTime}</td>{days.map((d) => { const dayEntries = entries.filter((e) => e.day === d && e.periodId === p.id); return <td key={d}>{dayEntries.map((e) => <div key={e.id} className="tt-grid-entry"><strong>{e.subjectName}</strong><br />{e.teacherName}<br />{e.roomName}</div>)}</td>; })}</tr>)}</tbody></table></div>
  </Panel>}</>;
}

function VersionsView({ demo }: { demo: ReturnType<typeof useTimetableDemo> }) {
  const [conflictMsg, setConflictMsg] = useState('');
  const [publishMsg, setPublishMsg] = useState('');
  const runCheck = () => {
    if (!demo.draftVersion) { setConflictMsg('No draft version to check.'); return; }
    const conflicts = timetableDemo.runConflictCheck(demo.draftVersion.id);
    setConflictMsg(`${conflicts.length} conflict(s) found in draft version.`);
  };
  const publish = () => {
    const r = timetableDemo.publishDraft();
    if (r.ok) { setPublishMsg('Draft published successfully. Previous version archived.'); setConflictMsg(''); }
    else { setPublishMsg(r.error ?? 'Publication failed.'); }
  };
  return <><Panel title="Version management" subtitle="Draft and published timetable versions">
    <div className="tt-record-list">
      <div className="tt-record-row"><div><strong>v{demo.currentVersion.versionNumber} — {demo.currentVersion.label}</strong><span>{demo.currentVersion.term} · Created {demo.currentVersion.createdDate} · Published {demo.currentVersion.publishedDate}</span></div><span className="tt-status good">Published</span></div>
      {demo.draftVersion && <div className="tt-record-row"><div><strong>v{demo.draftVersion.versionNumber} — {demo.draftVersion.label}</strong><span>{demo.draftVersion.term} · Created {demo.draftVersion.createdDate} · {demo.draftVersion.entries.length} entries</span></div><span className="tt-status warning">Draft</span></div>}
      {demo.versions.map((v) => <div className="tt-record-row" key={v.id}><div><strong>v{v.versionNumber} — {v.label}</strong><span>{v.term} · Published {v.publishedDate}</span></div><span className={`tt-status ${v.status === 'Archived' ? 'neutral' : 'info'}`}>{v.status}</span></div>)}
    </div>
  </Panel>
  {demo.draftVersion && <Panel title="Draft actions" subtitle="Run conflict check and publish draft version">
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      <button className="tt-button primary" onClick={runCheck}><AlertTriangle size={15} /> Run conflict check</button>
      <button className="tt-button" onClick={publish}><CheckCircle2 size={15} /> Publish draft</button>
      {conflictMsg && <span className="tt-form-message">{conflictMsg}</span>}
      {publishMsg && <span className={publishMsg.includes('failed') || publishMsg.includes('must be') ? 'tt-form-error' : 'tt-form-message'}>{publishMsg}</span>}
    </div>
  </Panel>}</>;
}

function ConflictsView({ demo }: { demo: ReturnType<typeof useTimetableDemo> }) {
  return <><Panel title="Conflict detection results" subtitle={`${demo.conflicts.length} conflict(s) detected in draft version`}>
    <div className="tt-record-list">{demo.conflicts.map((c) => <div key={c.id} style={{ padding: '12px 0', borderBottom: '1px solid #f4f7f9' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}><div><strong>{c.type}</strong><span style={{ display: 'block', fontSize: 11, color: '#8a979e' }}>{c.day} · {c.time}</span></div><span className={`tt-status ${c.severity === 'Hard' ? 'bad' : 'warning'}`}>{c.severity}</span></div><p style={{ fontSize: 12, color: '#33414d', marginBottom: 6 }}>{c.description}</p><p style={{ fontSize: 11, color: '#2c94c5' }}>Resolution: {c.resolution}</p></div>)}
    {demo.conflicts.length === 0 && <div className="tt-empty">No conflicts detected. Run a conflict check from the Draft & publish page.</div>}
    </div>
  </Panel>
  <Panel title="Conflict types monitored" subtitle="The server-side validator checks for these conflict categories">
    <div className="sp-record-list">
      <div className="tt-record-row"><div><strong>Teacher conflicts</strong><span>One teacher assigned to two classes during overlapping times</span></div></div>
      <div className="tt-record-row"><div><strong>Room conflicts</strong><span>One room booked for overlapping lessons or activities</span></div></div>
      <div className="tt-record-row"><div><strong>Class conflicts</strong><span>Two lessons assigned to the same class simultaneously</span></div></div>
      <div className="tt-record-row"><div><strong>Venue conflicts</strong><span>Sports venue double-booked or reserved during blocked period</span></div></div>
      <div className="tt-record-row"><div><strong>Workload exceeded</strong><span>Teacher workload or consecutive-period limits exceeded</span></div></div>
    </div>
  </Panel></>;
}

function AdjustmentsView({ demo }: { demo: ReturnType<typeof useTimetableDemo> }) {
  const [type, setType] = useState<AdjustmentType>('Teacher absence');
  const [reason, setReason] = useState('');
  const [requestedBy, setRequestedBy] = useState('');
  const [proposedChange, setProposedChange] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedAdj, setSelectedAdj] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reason.trim()) { setError('Reason is required.'); return; }
    const r = timetableDemo.createAdjustment(type, reason, requestedBy || 'Administrator', proposedChange, null);
    if (r.ok) { setSuccess('Adjustment request created.'); setError(''); setReason(''); setProposedChange(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  const adj = demo.adjustments.find((a) => a.id === selectedAdj);
  const statusColor = (s: AdjustmentStatus) => s === 'Applied' || s === 'Notifications Sent' || s === 'Closed' ? 'good' : s === 'Rejected' ? 'bad' : s === 'Approved' ? 'info' : 'warning';
  return <><Panel title="Create adjustment" subtitle="Request a timetable adjustment">
    <form className="tt-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Type<select value={type} onChange={(e) => setType(e.target.value as AdjustmentType)}><option>Teacher absence</option><option>Lesson substitution</option><option>Classroom change</option><option>Period swap</option><option>Lesson cancellation</option><option>Lesson rescheduling</option><option>Special assembly</option><option>Sports rescheduling</option><option>Room closure</option><option>Emergency change</option></select></label>
        <label>Requested by<input value={requestedBy} onChange={(e) => setRequestedBy(e.target.value)} placeholder="e.g. Mr. Kiprop" /></label>
      </div>
      <label>Reason<textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Why is this adjustment needed?" /></label>
      <label>Proposed change<textarea value={proposedChange} onChange={(e) => setProposedChange(e.target.value)} placeholder="Describe the proposed schedule change" /></label>
      <button className="tt-button primary" type="submit" disabled={!reason.trim()}><Plus size={15} /> Create adjustment</button>
      {error && <span className="tt-form-error">{error}</span>}
      {success && <span className="tt-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Adjustment register" subtitle={`${demo.adjustments.length} adjustment(s) — full lifecycle`}>
    <div className="tt-record-list">{demo.adjustments.map((a) => <div className="tt-record-row" key={a.id}><div><strong>{a.reference} — {a.type}</strong><span>{a.reason} · Requested by {a.requestedBy}{a.conflictCheckResult ? ` · Check: ${a.conflictCheckResult}` : ''}</span></div><span className={`tt-status ${statusColor(a.status)}`}>{a.status}</span><div className="tt-row-actions"><button className="tt-link" onClick={() => setSelectedAdj(selectedAdj === a.id ? '' : a.id)}>View</button>{a.status === 'Draft' && <button className="tt-link" onClick={() => { timetableDemo.runAdjustmentConflictCheck(a.id); }}>Conflict check</button>}{a.status === 'Conflict Check' && <button className="tt-link" onClick={() => timetableDemo.approveAdjustment(a.id, 'Principal')}>Approve</button>}{a.status === 'Conflict Check' && <button className="tt-link" onClick={() => timetableDemo.rejectAdjustment(a.id, 'Principal', 'Not approved')}>Reject</button>}{a.status === 'Approved' && <button className="tt-link" onClick={() => timetableDemo.applyAdjustment(a.id)}>Apply</button>}{a.status === 'Applied' && <button className="tt-link" onClick={() => timetableDemo.sendAdjustmentNotifications(a.id)}>Notify</button>}{a.status === 'Notifications Sent' && <button className="tt-link" onClick={() => timetableDemo.closeAdjustment(a.id)}>Close</button>}</div></div>)}</div>
  </Panel>
  {adj && <Panel title={`History — ${adj.reference}`} subtitle={adj.type}>
    <div className="tt-history">{adj.history.map((h, i) => <div className="tt-history-item" key={i}><div><strong>{h.action}</strong><span>{h.date} · {h.actor} · {h.note}</span></div></div>)}</div>
  </Panel>}</>;
}

function SubstitutesView({ demo }: { demo: ReturnType<typeof useTimetableDemo> }) {
  const [absentTeacher, setAbsentTeacher] = useState('');
  const [substitute, setSubstitute] = useState('');
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [day, setDay] = useState<Day>('Monday');
  const [period, setPeriod] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!absentTeacher.trim() || !substitute.trim() || !className.trim()) { setError('Absent teacher, substitute and class are required.'); return; }
    const r = timetableDemo.assignSubstitute(`tch-${Date.now()}`, absentTeacher, `tch-sub-${Date.now()}`, substitute, className, subject, day, period, reason);
    if (r.ok) { setSuccess('Substitute assigned.'); setError(''); setAbsentTeacher(''); setSubstitute(''); setClassName(''); setSubject(''); setPeriod(''); setReason(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  const statusColor = (s: string) => s === 'Applied' ? 'good' : s === 'Unresolved' ? 'bad' : s === 'Reverted' ? 'neutral' : 'info';
  return <><Panel title="Assign substitute teacher" subtitle="Cover an absent teacher's lesson">
    <form className="tt-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Absent teacher<input value={absentTeacher} onChange={(e) => setAbsentTeacher(e.target.value)} placeholder="e.g. Mrs. Cheruiyot" /></label>
        <label>Substitute teacher<input value={substitute} onChange={(e) => setSubstitute(e.target.value)} placeholder="e.g. Mr. Kiprop" /></label>
        <label>Class<input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="e.g. Form 4 — Athi" /></label>
        <label>Subject<input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Mathematics" /></label>
        <label>Day<select value={day} onChange={(e) => setDay(e.target.value as Day)}>{days.map((d) => <option key={d}>{d}</option>)}</select></label>
        <label>Period<input value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="e.g. Period 1" /></label>
      </div>
      <label>Reason<textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for substitution" /></label>
      <button className="tt-button primary" type="submit" disabled={!absentTeacher.trim() || !substitute.trim() || !className.trim()}><Plus size={15} /> Assign substitute</button>
      {error && <span className="tt-form-error">{error}</span>}
      {success && <span className="tt-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Substitute assignments" subtitle={`${demo.substitutes.length} assignment(s)`}>
    <div className="tt-record-list">{demo.substitutes.map((s) => <div className="tt-record-row" key={s.id}><div><strong>{s.reference}</strong><span>{s.absentTeacherName} → {s.substituteTeacherName || 'UNRESOLVED'} · {s.className} · {s.subjectName} · {s.day} {s.periodName} · {s.date}</span></div><span className={`tt-status ${statusColor(s.status)}`}>{s.status}</span><div className="tt-row-actions">{s.status === 'Assigned' && <button className="tt-link" onClick={() => timetableDemo.applySubstitute(s.id)}>Apply</button>}</div></div>)}</div>
  </Panel></>;
}

function AbsencesView({ demo }: { demo: ReturnType<typeof useTimetableDemo> }) {
  return <Panel title="Teacher absences" subtitle={`${demo.teacherAbsences.length} absence(s) with coverage status`}>
    <div className="tt-table-wrap"><table className="tt-table"><thead><tr><th>Teacher</th><th>Reason</th><th>Start</th><th>End</th><th>Lessons affected</th><th>Substitutes</th><th>Status</th></tr></thead>
    <tbody>{demo.teacherAbsences.map((a) => <tr key={a.id}><td><strong>{a.teacherName}</strong></td><td>{a.reason}</td><td>{a.startDate}</td><td>{a.endDate}</td><td>{a.affectedLessons}</td><td>{a.substitutesAssigned}</td><td><span className={`tt-status ${a.status === 'Covered' ? 'good' : 'bad'}`}>{a.status}</span></td></tr>)}</tbody></table></div>
  </Panel>;
}

function NotificationsView({ demo }: { demo: ReturnType<typeof useTimetableDemo> }) {
  return <Panel title="Notifications" subtitle={`${demo.notifications.length} notification(s)`}>
    <div className="tt-record-list">{demo.notifications.map((n) => <div className="tt-record-row" key={n.id}><div><strong>{n.title}</strong><span>{n.detail} · {n.date} · To: {n.recipient}</span></div><span className={`tt-status ${n.unread ? 'warning' : 'neutral'}`}>{n.unread ? 'Unread' : 'Read'}</span><div className="tt-row-actions">{n.unread && <button className="tt-link" onClick={() => timetableDemo.markNotificationRead(n.id)}>Mark read</button>}</div></div>)}</div>
  </Panel>;
}

function AuditView({ demo }: { demo: ReturnType<typeof useTimetableDemo> }) {
  return <Panel title="Audit history" subtitle={`${demo.audit.length} recorded action(s)`}>
    <div className="tt-record-list">{demo.audit.map((a) => <div className="tt-record-row" key={a.id}><div><strong>{a.action}</strong><span>{a.target} · By {a.actor} · {a.timestamp}</span></div></div>)}</div>
  </Panel>;
}

function SettingsView() {
  return <Panel title="Settings" subtitle="Timetable configuration">
    <div className="tt-form">
      <label>Academic year<select><option>2026/2027</option><option>2027/2028</option></select></label>
      <label>Current term<select><option>Term 3 2026</option><option>Term 1 2027</option></select></label>
      <label>School day start<input type="time" defaultValue="08:00" /></label>
      <label>School day end<input type="time" defaultValue="14:50" /></label>
      <button className="tt-button primary">Save settings</button>
    </div>
  </Panel>;
}
