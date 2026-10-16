import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Bed, Bell, Building2, Calendar, CheckCircle2, ChevronDown, ClipboardCheck, Clock3, FileText, HelpCircle, Home, LayoutDashboard, LogOut, Menu, MoreHorizontal, Plus, RotateCcw, Search, Settings, ShieldAlert, ShieldCheck, Users, Wrench, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/boarding.css';
import { boardingDemo, useBoardingDemo, type MaintenanceStatus, type RollCallStatus, type WelfareType } from '@/data/boardingDemo';

type BdNav = { label: string; path: string; icon: LucideIcon; group: string };
const bdNav: BdNav[] = [
  { label: 'Dashboard', path: '/boarding/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Houses & dormitories', path: '/boarding/houses', icon: Home, group: 'Configuration' },
  { label: 'Rooms & beds', path: '/boarding/rooms', icon: Building2, group: 'Configuration' },
  { label: 'Student placements', path: '/boarding/placements', icon: Users, group: 'Boarding' },
  { label: 'Roll call', path: '/boarding/roll-call', icon: CheckCircle2, group: 'Boarding' },
  { label: 'Leave & outings', path: '/boarding/leave', icon: FileText, group: 'Boarding' },
  { label: 'Welfare records', path: '/boarding/welfare', icon: ShieldAlert, group: 'Safeguarding' },
  { label: 'Inspections', path: '/boarding/inspections', icon: ClipboardCheck, group: 'Operations' },
  { label: 'Maintenance', path: '/boarding/maintenance', icon: Wrench, group: 'Operations' },
  { label: 'Shift handover', path: '/boarding/handover', icon: Clock3, group: 'Operations' },
  { label: 'Notifications', path: '/boarding/notifications', icon: Bell, group: 'Communication' },
  { label: 'Reports', path: '/boarding/reports', icon: FileText, group: 'Controls' },
  { label: 'Audit history', path: '/boarding/audit', icon: FileText, group: 'Controls' },
  { label: 'Settings', path: '/boarding/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Configuration', 'Boarding', 'Safeguarding', 'Operations', 'Communication', 'Controls', 'Account'];

export function BoardingPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useBoardingDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const current = bdNav.find((item) => location.pathname.startsWith(item.path)) ?? bdNav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const pendingRollCalls = demo.rollCalls.filter((r) => r.status === 'Scheduled' || r.status === 'In Progress').length;
  const pendingLeave = demo.leaveRequests.filter((l) => l.status === 'Requested' || l.status === 'Awaiting consent').length;
  const openMaintenance = demo.maintenance.filter((m) => m.status !== 'Resolved' && m.status !== 'Verified').length;
  const openWelfare = demo.welfare.filter((w) => w.status !== 'Closed').length;
  const unreadCount = demo.notifications.filter((n) => n.unread).length;
  return <div className="bd-app">
    <aside className={`bd-sidebar ${mobile ? 'open' : ''}`}><div className="bd-brand"><div className="bd-brand-mark"><Home size={21} /></div><div><strong>Riverside</strong><span>Boarding & Matron</span></div><button className="bd-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div><div className="bd-demo-pill"><span className="bd-demo-dot" /> DEMO MODE <span>•</span> October 2026</div><div className="bd-school"><div>RA</div><span><strong>Riverside Academy</strong><small>Boarding Operations</small></span><ChevronDown size={15} /></div><nav className="bd-nav">{groups.map((group) => <div className="bd-nav-group" key={group}><p>{group}</p>{bdNav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={`bd-nav-item${current.path === path || (path !== '/boarding/dashboard' && location.pathname.startsWith(path)) ? ' active' : ''}`} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Roll call' && pendingRollCalls > 0 && <em>{pendingRollCalls}</em>}{label === 'Leave & outings' && pendingLeave > 0 && <em>{pendingLeave}</em>}{label === 'Maintenance' && openMaintenance > 0 && <em className="badge-red">{openMaintenance}</em>}{label === 'Welfare records' && openWelfare > 0 && <em>{openWelfare}</em>}{label === 'Notifications' && unreadCount > 0 && <em>{unreadCount}</em>}</button>)}</div>)}</nav><div className="bd-sidebar-footer"><button onClick={() => navigateTo('/boarding/settings')}><HelpCircle size={16} /> Help centre</button><div className="bd-user"><div className="bd-avatar">MG</div><span><strong>Matron Grace</strong><small>Cedar House Matron</small></span><MoreHorizontal size={16} /></div></div></aside>
    {mobile && <button className="bd-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="bd-main"><header className="bd-topbar"><button className="bd-menu-button" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="bd-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="bd-top-actions"><div className="bd-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students, rooms..." /></div><button className="bd-icon-button" onClick={() => navigateTo('/boarding/notifications')} aria-label="Open notifications"><Bell size={18} />{unreadCount > 0 && <i />}</button><div className="bd-profile-wrap"><button className="bd-profile" onClick={() => setProfileOpen(!profileOpen)}><div className="bd-avatar">MG</div><span>Grace</span><ChevronDown size={15} /></button>{profileOpen && <div className="bd-profile-menu"><strong>Matron Grace</strong><small>Cedar House Matron</small><button onClick={() => navigateTo('/boarding/settings')}><Settings size={14} /> Settings</button><button onClick={() => boardingDemo.reset()}><RotateCcw size={14} /> Reset demo data</button><button onClick={() => navigateTo('/')}><LogOut size={14} /> Exit portal</button></div>}</div></div></header><div className="bd-content"><div className="bd-context"><div><span className="bd-kicker"><ShieldCheck size={14} /> Boarding & Matron <b>•</b> 2026 · Term 3</span><h1>{current.label}</h1><p>{bdDescription(location.pathname)}</p></div><div className="bd-context-actions">{(current.path === '/boarding/dashboard' || current.path === '/boarding/roll-call') && <button className="bd-button primary" onClick={() => navigateTo('/boarding/roll-call')}><Plus size={15} /> Start roll call</button>}{current.path === '/boarding/leave' && <button className="bd-button primary" onClick={() => navigateTo('/boarding/leave')}><Plus size={15} /> Request leave</button>}</div></div><BdRoute path={location.pathname} demo={demo} navigateTo={navigateTo} /></div></main>
  </div>;
}

function bdDescription(path: string): string {
  if (path.includes('dashboard')) return 'Boarding operations overview — occupancy, roll calls, leave and welfare for your assigned houses.';
  if (path.includes('houses')) return 'Boarding houses and dormitories with capacity and staff assignments.';
  if (path.includes('rooms')) return 'Room and bed inventory with real-time occupancy status.';
  if (path.includes('placement')) return 'Student boarding placements with transfer and withdrawal history.';
  if (path.includes('roll-call')) return 'Roll call management — start, record and complete with audit trail.';
  if (path.includes('leave')) return 'Leave requests, approvals, check-out and return tracking.';
  if (path.includes('welfare')) return 'Restricted welfare records — separate from clinical health records.';
  if (path.includes('inspection')) return 'Dormitory inspection checklists and findings.';
  if (path.includes('maintenance')) return 'Maintenance issues, repair status and verification.';
  if (path.includes('handover')) return 'Shift handover notes between matrons and boarding staff.';
  if (path.includes('notification')) return 'Boarding notifications for roll calls, leave and maintenance.';
  if (path.includes('report')) return 'Boarding operational reports with occupancy and roll-call summaries.';
  if (path.includes('audit')) return 'Every boarding action is logged with actor, target and timestamp.';
  return 'Boarding, dormitory and matron management.';
}

function BdRoute({ path, demo, navigateTo }: { path: string; demo: ReturnType<typeof useBoardingDemo>; navigateTo: (p: string) => void }) {
  if (path === '/boarding/dashboard' || path === '/boarding') return <BdDashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/boarding/houses')) return <HousesView demo={demo} />;
  if (path.startsWith('/boarding/rooms')) return <RoomsView demo={demo} />;
  if (path.startsWith('/boarding/placements')) return <PlacementsView demo={demo} />;
  if (path.startsWith('/boarding/roll-call')) return <RollCallView demo={demo} />;
  if (path.startsWith('/boarding/leave')) return <LeaveView demo={demo} />;
  if (path.startsWith('/boarding/welfare')) return <WelfareView demo={demo} />;
  if (path.startsWith('/boarding/inspections')) return <InspectionsView demo={demo} />;
  if (path.startsWith('/boarding/maintenance')) return <MaintenanceView demo={demo} />;
  if (path.startsWith('/boarding/handover')) return <HandoverView demo={demo} />;
  if (path.startsWith('/boarding/notifications')) return <NotificationsView demo={demo} />;
  if (path.startsWith('/boarding/reports')) return <ReportsView demo={demo} />;
  if (path.startsWith('/boarding/audit')) return <AuditView demo={demo} />;
  return <SettingsView />;
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return <div className="bd-panel"><div className="bd-panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>{children}</div>;
}
function BdMetric({ icon: Icon, label, value, detail, tone, onClick }: { icon: LucideIcon; label: string; value: string; detail: string; tone?: string; onClick: () => void }) {
  return <button className="bd-metric" onClick={onClick}><div className={`bd-metric-icon ${tone ?? ''}`}><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></button>;
}
function QuickAction({ label, icon: Icon, onClick }: { label: string; icon: LucideIcon; onClick: () => void }) {
  return <button className="bd-quick" onClick={onClick}><Icon size={16} /> {label} <ArrowRight size={13} /></button>;
}

function BdDashboard({ demo, navigateTo }: { demo: ReturnType<typeof useBoardingDemo>; navigateTo: (p: string) => void }) {
  const totalBeds = demo.houses.reduce((s, h) => s + h.totalBeds, 0);
  const occupied = demo.houses.reduce((s, h) => s + h.occupiedBeds, 0);
  const vacant = demo.houses.reduce((s, h) => s + h.vacantBeds, 0);
  const pendingRC = demo.rollCalls.filter((r) => r.status === 'Scheduled' || r.status === 'In Progress');
  const unaccounted = demo.rollCalls.flatMap((r) => r.entries).filter((e) => e.status === 'Unaccounted').length;
  const pendingLeave = demo.leaveRequests.filter((l) => l.status === 'Requested' || l.status === 'Awaiting consent');
  const openMaint = demo.maintenance.filter((m) => m.status !== 'Resolved' && m.status !== 'Verified');
  const confidential = demo.welfare.filter((w) => w.confidential && w.status !== 'Closed');
  return <><div className="bd-kpi-grid">
    <BdMetric icon={Bed} label="Total beds" value={String(totalBeds)} detail={`${occupied} occupied · ${vacant} vacant`} onClick={() => navigateTo('/boarding/rooms')} />
    <BdMetric icon={CheckCircle2} label="Roll calls" value={String(pendingRC.length)} detail={`${unaccounted} unaccounted students`} tone="teal" onClick={() => navigateTo('/boarding/roll-call')} />
    <BdMetric icon={FileText} label="Pending leave" value={String(pendingLeave.length)} detail="Awaiting approval or consent" tone="gold" onClick={() => navigateTo('/boarding/leave')} />
    <BdMetric icon={Wrench} label="Maintenance" value={String(openMaint.length)} detail="Open issues requiring attention" tone="red" onClick={() => navigateTo('/boarding/maintenance')} />
  </div>
  {confidential.length > 0 && <div className="bd-confidential-banner"><ShieldAlert size={18} /><div><strong>Confidential welfare records active</strong><small>{confidential.length} confidential record(s) — restricted to designated staff only</small></div></div>}
  <div className="bd-main-grid">
    <Panel title="Roll call status" subtitle={`${pendingRC.length} roll call(s) in progress or scheduled`}>
      <div className="bd-record-list">{pendingRC.map((r) => <div className="bd-record-row" key={r.id}><div><strong>{r.houseName} — {r.type}</strong><span>{r.date} · Scheduled {r.scheduledTime} · {r.entries.filter((e) => e.status !== 'Unaccounted').length}/{r.entries.length} accounted</span></div><span className={`bd-status ${r.status === 'Completed' ? 'good' : r.status === 'In Progress' ? 'info' : 'warning'}`}>{r.status}</span><div className="bd-row-actions"><button className="bd-link" onClick={() => navigateTo('/boarding/roll-call')}>Open</button></div></div>)}
      {pendingRC.length === 0 && <div className="bd-empty">No pending roll calls</div>}
      </div>
    </Panel>
    <Panel title="Pending leave requests" subtitle={`${pendingLeave.length} request(s) awaiting action`}>
      <div className="bd-record-list">{pendingLeave.map((l) => <div className="bd-record-row" key={l.id}><div><strong>{l.studentName}</strong><span>{l.reason} · Departure {l.departureDate} · Return {l.expectedReturn}{l.parentConsent ? ' · Consent given' : ' · Consent pending'}</span></div><span className={`bd-status ${l.status === 'Approved' ? 'good' : l.status === 'Rejected' ? 'bad' : 'warning'}`}>{l.status}</span></div>)}
      {pendingLeave.length === 0 && <div className="bd-empty">No pending leave requests</div>}
      </div>
    </Panel>
  </div>
  <div className="bd-main-grid">
    <Panel title="Open maintenance issues" subtitle={`${openMaint.length} issue(s) requiring attention`}>
      <div className="bd-record-list">{openMaint.map((m) => <div className="bd-record-row" key={m.id}><div><strong>{m.reference} · {m.location}</strong><span>{m.description} · Priority: {m.priority} · Reported {m.reportedDate}</span></div><span className={`bd-status ${m.status === 'Resolved' || m.status === 'Verified' ? 'good' : m.status === 'Reported' ? 'warning' : 'info'}`}>{m.status}</span></div>)}
      {openMaint.length === 0 && <div className="bd-empty">No open maintenance issues</div>}
      </div>
    </Panel>
    <Panel title="Quick actions" subtitle="Common boarding operations">
      <div className="bd-quick-grid">
        <QuickAction label="Start roll call" icon={CheckCircle2} onClick={() => navigateTo('/boarding/roll-call')} />
        <QuickAction label="Request leave" icon={FileText} onClick={() => navigateTo('/boarding/leave')} />
        <QuickAction label="Record welfare" icon={ShieldAlert} onClick={() => navigateTo('/boarding/welfare')} />
        <QuickAction label="Report maintenance" icon={Wrench} onClick={() => navigateTo('/boarding/maintenance')} />
      </div>
    </Panel>
  </div></>;
}

function HousesView({ demo }: { demo: ReturnType<typeof useBoardingDemo> }) {
  return <Panel title="Boarding houses" subtitle={`${demo.houses.length} house(s) with capacity and staff`}>
    <div className="bd-table-wrap"><table className="bd-table"><thead><tr><th>House</th><th>Category</th><th>Matron</th><th>Housemaster</th><th>Beds</th><th>Occupied</th><th>Vacant</th><th>Occupancy</th></tr></thead>
    <tbody>{demo.houses.map((h) => { const pct = h.totalBeds > 0 ? Math.round((h.occupiedBeds / h.totalBeds) * 100) : 0; return <tr key={h.id}><td><strong>{h.name}</strong></td><td>{h.category}</td><td>{h.matronName}</td><td>{h.housemasterName}</td><td>{h.totalBeds}</td><td>{h.occupiedBeds}</td><td>{h.vacantBeds}</td><td>{pct}%</td></tr>; })}</tbody></table></div>
  </Panel>;
}

function RoomsView({ demo }: { demo: ReturnType<typeof useBoardingDemo> }) {
  return <><Panel title="Room inventory" subtitle={`${demo.rooms.length} room(s) across all dormitories`}>
    <div className="bd-table-wrap"><table className="bd-table"><thead><tr><th>Room</th><th>Dormitory</th><th>House</th><th>Floor</th><th>Capacity</th><th>Occupied</th><th>Status</th></tr></thead>
    <tbody>{demo.rooms.map((r) => <tr key={r.id}><td><strong>{r.roomNumber}</strong></td><td>{r.dormitoryName}</td><td>{r.houseName}</td><td>{r.floor}</td><td>{r.capacity}</td><td>{r.occupied}</td><td><span className={`bd-status ${r.status === 'Available' ? 'good' : r.status === 'Full' ? 'info' : r.status === 'Maintenance' ? 'bad' : 'neutral'}`}>{r.status}</span></td></tr>)}</tbody></table></div>
  </Panel>
  <Panel title="Vacant beds" subtitle={`${demo.beds.filter((b) => b.status === 'Vacant').length} bed(s) available for allocation`}>
    <div className="bd-record-list">{demo.beds.filter((b) => b.status === 'Vacant').map((b) => <div className="bd-record-row" key={b.id}><div><strong>{b.bedNumber}</strong><span>{b.dormitoryName} · Room {b.roomNumber} · {b.houseName}</span></div><span className="bd-status good">Vacant</span></div>)}</div>
  </Panel></>;
}

function PlacementsView({ demo }: { demo: ReturnType<typeof useBoardingDemo> }) {
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [bedId, setBedId] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [transferId, setTransferId] = useState('');
  const [newBedId, setNewBedId] = useState('');
  const [transferReason, setTransferReason] = useState('');
  const vacantBeds = demo.beds.filter((b) => b.status === 'Vacant');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentName.trim() || !bedId) { setError('Student name and bed are required.'); return; }
    const r = boardingDemo.allocateBed(`stu-${Date.now()}`, studentName, className, bedId, reason || 'Boarding allocation');
    if (r.ok) { setSuccess('Student allocated to bed.'); setError(''); setStudentName(''); setClassName(''); setBedId(''); setReason(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  const activePlacements = demo.placements.filter((p) => p.status === 'Active');
  return <><Panel title="Allocate bed" subtitle="Assign a student to a vacant bed">
    <form className="bd-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Student name<input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. John Doe" /></label>
        <label>Class<input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="e.g. Form 3 — Tana" /></label>
        <label>Bed<select value={bedId} onChange={(e) => setBedId(e.target.value)}><option value="">Select vacant bed...</option>{vacantBeds.map((b) => <option key={b.id} value={b.id}>{b.bedNumber} — {b.dormitoryName} ({b.houseName})</option>)}</select></label>
        <label>Reason<input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. New boarding admission" /></label>
      </div>
      <button className="bd-button primary" type="submit" disabled={!studentName.trim() || !bedId}><Plus size={15} /> Allocate</button>
      {error && <span className="bd-form-error">{error}</span>}
      {success && <span className="bd-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Active placements" subtitle={`${activePlacements.length} student(s) currently in boarding`}>
    <div className="bd-record-list">{activePlacements.map((p) => <div className="bd-record-row" key={p.id}><div><strong>{p.studentName}</strong><span>{p.className} · {p.dormitoryName} · Room {p.roomNumber} · Bed {p.bedNumber} · Since {p.startDate}</span></div><span className="bd-status good">Active</span><div className="bd-row-actions"><button className="bd-link" onClick={() => setTransferId(transferId === p.id ? '' : p.id)}>Transfer</button><button className="bd-link" onClick={() => { const r = boardingDemo.withdrawPlacement(p.id, 'Withdrawn from boarding'); if (!r.ok) alert(r.error); }}>Withdraw</button></div></div>)}</div>
  </Panel>
  {transferId && <Panel title="Transfer placement" subtitle="Move student to a different vacant bed">
    <div className="bd-form">
      <label>Target bed<select value={newBedId} onChange={(e) => setNewBedId(e.target.value)}><option value="">Select vacant bed...</option>{vacantBeds.map((b) => <option key={b.id} value={b.id}>{b.bedNumber} — {b.dormitoryName}</option>)}</select></label>
      <label>Reason<input value={transferReason} onChange={(e) => setTransferReason(e.target.value)} placeholder="e.g. Room change request" /></label>
      <button className="bd-button primary" onClick={() => { const r = boardingDemo.transferBed(transferId, newBedId, transferReason || 'Room transfer'); if (r.ok) { setTransferId(''); setNewBedId(''); setTransferReason(''); } else alert(r.error); }}>Confirm transfer</button>
    </div>
  </Panel>}</>;
}

function RollCallView({ demo }: { demo: ReturnType<typeof useBoardingDemo> }) {
  const [houseId, setHouseId] = useState('');
  const [type, setType] = useState<'Morning' | 'After school' | 'Evening' | 'Lights-out' | 'Special'>('Morning');
  const [activeRC, setActiveRC] = useState('');
  const [error, setError] = useState('');
  const [reviewNote, setReviewNote] = useState('');
  const start = () => {
    if (!houseId) { setError('Select a house.'); return; }
    const r = boardingDemo.startRollCall(houseId, type);
    if (r.ok) { setError(''); setHouseId(''); }
    else setError(r.error ?? 'Failed.');
  };
  const rc = demo.rollCalls.find((r) => r.id === activeRC);
  const statusColor = (s: RollCallStatus) => s === 'Present' ? 'good' : s === 'On authorized leave' || s === 'Excused' ? 'info' : s === 'Late' ? 'warning' : s === 'Unaccounted' ? 'bad' : 'neutral';
  return <><Panel title="Start roll call" subtitle="Begin a new roll call for a boarding house">
    <div className="bd-form">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>House<select value={houseId} onChange={(e) => setHouseId(e.target.value)}><option value="">Select house...</option>{demo.houses.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}</select></label>
        <label>Type<select value={type} onChange={(e) => setType(e.target.value as typeof type)}><option>Morning</option><option>After school</option><option>Evening</option><option>Lights-out</option><option>Special</option></select></label>
      </div>
      <button className="bd-button primary" onClick={start} disabled={!houseId}><Plus size={15} /> Start roll call</button>
      {error && <span className="bd-form-error">{error}</span>}
    </div>
  </Panel>
  <Panel title="Roll call register" subtitle={`${demo.rollCalls.length} roll call(s) — audit trail preserved`}>
    <div className="bd-record-list">{demo.rollCalls.map((r) => <div className="bd-record-row" key={r.id}><div><strong>{r.houseName} — {r.type}</strong><span>{r.date} · {r.scheduledTime} · By {r.conductedBy} · {r.entries.filter((e) => e.status !== 'Unaccounted').length}/{r.entries.length} accounted</span></div><span className={`bd-status ${r.status === 'Completed' ? 'good' : r.status === 'In Progress' ? 'info' : 'warning'}`}>{r.status}</span><div className="bd-row-actions"><button className="bd-link" onClick={() => setActiveRC(activeRC === r.id ? '' : r.id)}>{r.status === 'Completed' ? 'View' : 'Manage'}</button></div></div>)}</div>
  </Panel>
  {rc && <Panel title={`${rc.houseName} — ${rc.type} roll call`} subtitle={`${rc.entries.length} student(s) — ${rc.entries.filter((e) => e.status === 'Unaccounted').length} unaccounted`}>
    <div className="bd-record-list">{rc.entries.map((e) => <div className="bd-record-row" key={e.studentId}><div><strong>{e.studentName}</strong><span>{e.note || '—'}</span></div><span className={`bd-status ${statusColor(e.status)}`}>{e.status}</span>{rc.status !== 'Completed' && <div className="bd-row-actions"><select style={{ fontSize: 11, padding: '4px 6px', borderRadius: 6, border: '1px solid #e6ebee' }} value={e.status} onChange={(ev) => boardingDemo.markRollCallEntry(rc.id, e.studentId, ev.target.value as RollCallStatus, e.note)}><option>Present</option><option>Absent</option><option>Excused</option><option>On authorized leave</option><option>Late</option><option>Unaccounted</option></select></div>}</div>)}</div>
    {rc.status !== 'Completed' && <><div style={{ marginTop: 14 }}><label style={{ fontSize: 11, color: '#65747c', fontWeight: 500, display: 'flex', flexDirection: 'column', gap: 4 }}>Review note<input value={reviewNote} onChange={(e) => setReviewNote(e.target.value)} placeholder="Optional review note for completion" style={{ padding: '8px 10px', border: '1px solid #e6ebee', borderRadius: 8, fontSize: 12 }} /></label></div><button className="bd-button primary" style={{ marginTop: 10 }} onClick={() => { const r = boardingDemo.completeRollCall(rc.id, reviewNote || 'Roll call completed'); if (r.ok) { setActiveRC(''); setReviewNote(''); } else alert(r.error); }}><CheckCircle2 size={15} /> Complete roll call</button></>}
  </Panel>}</>;
}

function LeaveView({ demo }: { demo: ReturnType<typeof useBoardingDemo> }) {
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [houseName, setHouseName] = useState('');
  const [reason, setReason] = useState('');
  const [destination, setDestination] = useState('');
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentName.trim() || !reason.trim()) { setError('Student name and reason are required.'); return; }
    const r = boardingDemo.requestLeave(`stu-${Date.now()}`, studentName, className, houseName, reason, destination, departure, returnDate);
    if (r.ok) { setSuccess('Leave request submitted.'); setError(''); setStudentName(''); setClassName(''); setHouseName(''); setReason(''); setDestination(''); setDeparture(''); setReturnDate(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  const statusColor = (s: string) => s === 'Returned' || s === 'Approved' ? 'good' : s === 'Late' || s === 'Escalated' ? 'bad' : s === 'Checked out' ? 'info' : s === 'Rejected' ? 'neutral' : 'warning';
  return <><Panel title="Request leave" subtitle="Submit a boarding leave request">
    <form className="bd-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Student name<input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Henry Kamau" /></label>
        <label>Class<input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="e.g. Form 3 — Tana" /></label>
        <label>House<input value={houseName} onChange={(e) => setHouseName(e.target.value)} placeholder="e.g. Cedar House" /></label>
        <label>Reason<input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Family event" /></label>
        <label>Destination<input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Home — Nairobi" /></label>
        <label>Departure date<input value={departure} onChange={(e) => setDeparture(e.target.value)} placeholder="e.g. 18 Oct 2026" /></label>
        <label>Expected return<input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} placeholder="e.g. 20 Oct 2026" /></label>
      </div>
      <button className="bd-button primary" type="submit" disabled={!studentName.trim() || !reason.trim()}><Plus size={15} /> Submit request</button>
      {error && <span className="bd-form-error">{error}</span>}
      {success && <span className="bd-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Leave requests" subtitle={`${demo.leaveRequests.length} request(s) — full lifecycle`}>
    <div className="bd-record-list">{demo.leaveRequests.map((l) => <div className="bd-record-row" key={l.id}><div><strong>{l.studentName} — {l.reason}</strong><span>{l.destination} · Depart {l.departureDate} · Return {l.expectedReturn}{l.actualReturn ? ` · Actual: ${l.actualReturn}` : ''} · Consent: {l.parentConsent ? 'Yes' : 'Pending'}</span></div><span className={`bd-status ${statusColor(l.status)}`}>{l.status}</span><div className="bd-row-actions">{l.status === 'Requested' && <button className="bd-link" onClick={() => boardingDemo.approveLeave(l.id, 'Mr. Odhiambo')}>Approve</button>}{l.status === 'Awaiting consent' && <button className="bd-link" onClick={() => boardingDemo.approveLeave(l.id, 'Mr. Odhiambo')}>Approve</button>}{l.status === 'Approved' && <button className="bd-link" onClick={() => boardingDemo.checkOutStudent(l.id)}>Check out</button>}{l.status === 'Checked out' && <button className="bd-link" onClick={() => boardingDemo.checkInStudent(l.id)}>Check in</button>}</div></div>)}</div>
  </Panel></>;
}

function WelfareView({ demo }: { demo: ReturnType<typeof useBoardingDemo> }) {
  const [houseId, setHouseId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [type, setType] = useState<WelfareType>('Welfare check-in');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Low');
  const [confidential, setConfidential] = useState(false);
  const [assignedTo, setAssignedTo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description.trim()) { setError('Description is required.'); return; }
    const r = boardingDemo.recordWelfare(houseId || demo.houses[0]?.id, studentName ? `stu-${Date.now()}` : null, studentName || null, type, description, urgency, confidential, assignedTo || 'Matron Grace');
    if (r.ok) { setSuccess('Welfare record created.'); setError(''); setStudentName(''); setDescription(''); setUrgency('Low'); setConfidential(false); setAssignedTo(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  return <><div className="bd-confidential-banner"><ShieldAlert size={18} /><div><strong>Restricted welfare records</strong><small>Confidential records are visible only to designated staff. Medical issues are referred to the health centre module.</small></div></div>
  <Panel title="Record welfare observation" subtitle="Create a restricted welfare record">
    <form className="bd-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>House<select value={houseId} onChange={(e) => setHouseId(e.target.value)}><option value="">Select house...</option>{demo.houses.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}</select></label>
        <label>Student name (optional)<input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Felix Otieno" /></label>
        <label>Type<select value={type} onChange={(e) => setType(e.target.value as WelfareType)}><option>Welfare check-in</option><option>Request for assistance</option><option>Dormitory conflict</option><option>Safety incident</option><option>Facility damage</option><option>Cleanliness issue</option><option>Lost property</option><option>Follow-up task</option><option>Escalation</option></select></label>
        <label>Urgency<select value={urgency} onChange={(e) => setUrgency(e.target.value as typeof urgency)}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></label>
        <label>Assign to<input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="e.g. Matron Grace" /></label>
      </div>
      <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Factual description of the observation" /></label>
      <label style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}><input type="checkbox" checked={confidential} onChange={(e) => setConfidential(e.target.checked)} /> Confidential — restrict to designated staff</label>
      <button className="bd-button primary" type="submit" disabled={!description.trim()}><Plus size={15} /> Record</button>
      {error && <span className="bd-form-error">{error}</span>}
      {success && <span className="bd-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Welfare records" subtitle={`${demo.welfare.length} record(s) — restricted access`}>
    <div className="bd-record-list">{demo.welfare.map((w) => <div className="bd-record-row" key={w.id}><div><strong>{w.type} — {w.studentName ?? 'General'}{w.confidential ? ' · CONFIDENTIAL' : ''}</strong><span>{w.date} {w.time} · {w.houseName} · By {w.recordedBy} · Urgency: {w.urgency}{w.followUp ? ` · Follow-up: ${w.followUp}` : ''}</span></div><span className={`bd-status ${w.status === 'Closed' ? 'good' : w.status === 'Escalated' ? 'bad' : w.status === 'Actioned' ? 'info' : 'warning'}`}>{w.status}</span><div className="bd-row-actions">{w.status === 'Open' && <button className="bd-link" onClick={() => boardingDemo.advanceWelfare(w.id, 'Actioned', 'Action taken', 'Matron Grace')}>Action</button>}{w.status === 'Open' && w.urgency === 'Critical' && <button className="bd-link" onClick={() => boardingDemo.advanceWelfare(w.id, 'Escalated', 'Escalated', 'Matron Grace')}>Escalate</button>}{w.status !== 'Closed' && <button className="bd-link" onClick={() => boardingDemo.advanceWelfare(w.id, 'Closed', 'Resolved', w.assignedTo)}>Close</button>}</div></div>)}</div>
  </Panel></>;
}

function InspectionsView({ demo }: { demo: ReturnType<typeof useBoardingDemo> }) {
  return <Panel title="Dormitory inspections" subtitle={`${demo.inspections.length} inspection(s) with checklist findings`}>
    <div className="bd-record-list">{demo.inspections.map((i) => <div key={i.id} style={{ padding: '12px 0', borderBottom: '1px solid #f4f7f9' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}><div><strong>{i.houseName} — Room {i.roomNumber}</strong><span style={{ display: 'block', fontSize: 11, color: '#8a979e' }}>{i.date} · By {i.conductedBy}</span></div><span className={`bd-status ${i.status === 'Completed' ? 'good' : i.status === 'Follow-up required' ? 'warning' : 'info'}`}>{i.status}</span></div><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{i.findings.map((f, j) => <span key={j} className={`bd-soft-tag`} style={{ background: f.result === 'Pass' ? '#e3f5ea' : f.result === 'Fail' ? '#fce8e8' : '#fff4db', color: f.result === 'Pass' ? '#3b9368' : f.result === 'Fail' ? '#c44' : '#ad8320' }}>{f.item}: {f.result}</span>)}</div>{i.followUpNote && <p style={{ fontSize: 11, color: '#7e8c95', marginTop: 8 }}>{i.followUpNote}</p>}</div>)}</div>
  </Panel>;
}

function MaintenanceView({ demo }: { demo: ReturnType<typeof useBoardingDemo> }) {
  const [houseId, setHouseId] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description.trim()) { setError('Description is required.'); return; }
    const r = boardingDemo.reportMaintenance(houseId || demo.houses[0]?.id, location, description, priority, 'Matron Grace');
    if (r.ok) { setSuccess('Maintenance issue reported.'); setError(''); setLocation(''); setDescription(''); setPriority('Low'); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  const statusColor = (s: MaintenanceStatus) => s === 'Resolved' || s === 'Verified' ? 'good' : s === 'Reported' ? 'warning' : s === 'In Progress' ? 'info' : 'neutral';
  return <><Panel title="Report maintenance issue" subtitle="Submit a new maintenance or repair request">
    <form className="bd-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>House<select value={houseId} onChange={(e) => setHouseId(e.target.value)}><option value="">Select house...</option>{demo.houses.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}</select></label>
        <label>Location<input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Cedar Dorm A, Room 101" /></label>
        <label>Priority<select value={priority} onChange={(e) => setPriority(e.target.value as typeof priority)}><option>Low</option><option>Medium</option><option>High</option></select></label>
      </div>
      <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What needs repair?" /></label>
      <button className="bd-button primary" type="submit" disabled={!description.trim()}><Plus size={15} /> Report issue</button>
      {error && <span className="bd-form-error">{error}</span>}
      {success && <span className="bd-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Maintenance issues" subtitle={`${demo.maintenance.length} issue(s) — full lifecycle`}>
    <div className="bd-record-list">{demo.maintenance.map((m) => <div className="bd-record-row" key={m.id}><div><strong>{m.reference} · {m.location}</strong><span>{m.description} · Priority: {m.priority} · Reported {m.reportedDate}{m.assignedTo ? ` · Assigned: ${m.assignedTo}` : ''}{m.resolvedDate ? ` · Resolved: ${m.resolvedDate}` : ''}</span></div><span className={`bd-status ${statusColor(m.status)}`}>{m.status}</span><div className="bd-row-actions">{m.status === 'Reported' && <button className="bd-link" onClick={() => boardingDemo.advanceMaintenance(m.id, 'Assigned', 'Mr. Odhiambo')}>Assign</button>}{m.status === 'Assigned' && <button className="bd-link" onClick={() => boardingDemo.advanceMaintenance(m.id, 'In Progress', '')}>Start</button>}{m.status === 'In Progress' && <button className="bd-link" onClick={() => boardingDemo.advanceMaintenance(m.id, 'Resolved', '')}>Resolve</button>}{m.status === 'Resolved' && <button className="bd-link" onClick={() => boardingDemo.advanceMaintenance(m.id, 'Verified', '')}>Verify</button>}</div></div>)}</div>
  </Panel></>;
}

function HandoverView({ demo }: { demo: ReturnType<typeof useBoardingDemo> }) {
  return <Panel title="Shift handover notes" subtitle={`${demo.handovers.length} handover note(s)`}>
    <div className="bd-record-list">{demo.handovers.map((h) => <div className="bd-record-row" key={h.id}><div><strong>{h.houseName} — {h.shift}</strong><span>{h.date} · From {h.fromStaff} to {h.toStaff}</span><span style={{ fontSize: 11, color: '#65747c', marginTop: 4 }}>{h.items}</span></div><span className={`bd-status ${h.status === 'Closed' ? 'good' : h.status === 'Acknowledged' ? 'info' : 'warning'}`}>{h.status}</span><div className="bd-row-actions">{h.status === 'Open' && <button className="bd-link" onClick={() => boardingDemo.acknowledgeHandover(h.id)}>Acknowledge</button>}{h.status === 'Acknowledged' && <button className="bd-link" onClick={() => boardingDemo.closeHandover(h.id)}>Close</button>}</div></div>)}</div>
  </Panel>;
}

function NotificationsView({ demo }: { demo: ReturnType<typeof useBoardingDemo> }) {
  return <Panel title="Notifications" subtitle={`${demo.notifications.length} notification(s)`}>
    <div className="bd-record-list">{demo.notifications.map((n) => <div className="bd-record-row" key={n.id}><div><strong>{n.title}</strong><span>{n.detail} · {n.date} · To: {n.recipient}</span></div><span className={`bd-status ${n.unread ? 'warning' : 'neutral'}`}>{n.unread ? 'Unread' : 'Read'}</span><div className="bd-row-actions">{n.unread && <button className="bd-link" onClick={() => boardingDemo.markNotificationRead(n.id)}>Mark read</button>}</div></div>)}</div>
  </Panel>;
}

function ReportsView({ demo }: { demo: ReturnType<typeof useBoardingDemo> }) {
  const totalBeds = demo.houses.reduce((s, h) => s + h.totalBeds, 0);
  const occupied = demo.houses.reduce((s, h) => s + h.occupiedBeds, 0);
  const completedRC = demo.rollCalls.filter((r) => r.status === 'Completed');
  const lateReturns = demo.leaveRequests.filter((l) => l.status === 'Late');
  return <><div className="bd-kpi-grid">
    <BdMetric icon={Bed} label="Total occupancy" value={`${Math.round((occupied / totalBeds) * 100)}%`} detail={`${occupied}/${totalBeds} beds`} onClick={() => {}} />
    <BdMetric icon={CheckCircle2} label="Completed roll calls" value={String(completedRC.length)} detail={`${demo.rollCalls.length} total`} tone="teal" onClick={() => {}} />
    <BdMetric icon={FileText} label="Leave requests" value={String(demo.leaveRequests.length)} detail={`${lateReturns.length} late returns`} tone="gold" onClick={() => {}} />
    <BdMetric icon={Wrench} label="Maintenance" value={String(demo.maintenance.length)} detail={`${demo.maintenance.filter((m) => m.status !== 'Resolved' && m.status !== 'Verified').length} open`} tone="red" onClick={() => {}} />
  </div>
  <Panel title="House occupancy report" subtitle="Bed capacity and occupancy by house">
    <div className="bd-table-wrap"><table className="bd-table"><thead><tr><th>House</th><th>Total beds</th><th>Occupied</th><th>Vacant</th><th>Unavailable</th><th>Occupancy rate</th></tr></thead>
    <tbody>{demo.houses.map((h) => <tr key={h.id}><td><strong>{h.name}</strong></td><td>{h.totalBeds}</td><td>{h.occupiedBeds}</td><td>{h.vacantBeds}</td><td>{h.unavailableBeds}</td><td>{Math.round((h.occupiedBeds / h.totalBeds) * 100)}%</td></tr>)}</tbody></table></div>
  </Panel></>;
}

function AuditView({ demo }: { demo: ReturnType<typeof useBoardingDemo> }) {
  return <Panel title="Audit history" subtitle={`${demo.audit.length} recorded action(s)`}>
    <div className="bd-record-list">{demo.audit.map((a) => <div className="bd-record-row" key={a.id}><div><strong>{a.action}</strong><span>{a.target} · By {a.actor} · {a.timestamp}</span></div></div>)}</div>
  </Panel>;
}

function SettingsView() {
  return <Panel title="Settings" subtitle="Boarding configuration">
    <div className="bd-form">
      <label>Matron name<input defaultValue="Matron Grace" /></label>
      <label>Assigned house<select><option>Cedar House</option><option>Acacia House</option><option>Baobab House</option></select></label>
      <label>Lights-out time<input type="time" defaultValue="21:30" /></label>
      <label>Wake-up time<input type="time" defaultValue="06:00" /></label>
      <button className="bd-button primary">Save settings</button>
    </div>
  </Panel>;
}
