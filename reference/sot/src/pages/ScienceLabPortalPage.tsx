import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, Calendar, ChevronDown, ClipboardList, FileText, FlaskConical, LayoutDashboard, Menu, MoreHorizontal, Package, Plus, Search, Settings, ShieldCheck, Users, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/sciencelab.css';
import { useScienceLabDemo, type PracticalLesson } from '@/data/scienceLabDemo';

type Nav = { label: string; path: string; icon: LucideIcon; group: string };
const nav: Nav[] = [
  { label: 'Dashboard', path: '/science-lab/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Laboratories', path: '/science-lab/labs', icon: FlaskConical, group: 'Configuration' },
  { label: 'Equipment', path: '/science-lab/equipment', icon: Package, group: 'Inventory' },
  { label: 'Chemicals', path: '/science-lab/chemicals', icon: AlertTriangle, group: 'Inventory' },
  { label: 'Practical lessons', path: '/science-lab/practicals', icon: ClipboardList, group: 'Operations' },
  { label: 'Bookings', path: '/science-lab/bookings', icon: Calendar, group: 'Operations' },
  { label: 'Safety inspections', path: '/science-lab/inspections', icon: ShieldCheck, group: 'Safety' },
  { label: 'Incidents', path: '/science-lab/incidents', icon: AlertTriangle, group: 'Safety' },
  { label: 'Maintenance', path: '/science-lab/maintenance', icon: Settings, group: 'Safety' },
  { label: 'Reports', path: '/science-lab/reports', icon: FileText, group: 'Controls' },
  { label: 'Settings', path: '/science-lab/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Configuration', 'Inventory', 'Operations', 'Safety', 'Controls', 'Account'];

export function ScienceLabPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useScienceLabDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const current = nav.find((item) => location.pathname.startsWith(item.path)) ?? nav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const pendingBookings = demo.bookings.filter((b) => b.status === 'Pending');
  const expiredChemicals = demo.chemicals.filter((c) => c.isExpired);
  const overdueInspections = demo.inspections.filter((i) => i.status === 'Overdue');
  const openIncidents = demo.incidents.filter((i) => i.status !== 'Resolved' && i.status !== 'Closed');

  return <div className="sl-app">
    <aside className={`sl-sidebar ${mobile ? 'open' : ''}`}>
      <div className="sl-brand"><div className="sl-brand-mark"><FlaskConical size={21} /></div><div><strong>Riverside</strong><span>Science Labs</span></div><button className="sl-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div>
      <div className="sl-demo-pill"><span className="sl-demo-dot" /> DEMO MODE <span>·</span> October 2026</div>
      <div className="sl-school"><div>RA</div><span><strong>Riverside Academy</strong><small>Science Department</small></span><ChevronDown size={15} /></div>
      <nav className="sl-nav">{groups.map((group) => <div className="sl-nav-group" key={group}><p>{group}</p>{nav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={`sl-nav-item${current.path === path || (path !== '/science-lab/dashboard' && location.pathname.startsWith(path)) ? ' active' : ''}`} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Bookings' && pendingBookings.length > 0 && <em>{pendingBookings.length}</em>}{label === 'Chemicals' && expiredChemicals.length > 0 && <em className="badge-red" style={{ background: '#fce8e8', color: '#c44' }}>{expiredChemicals.length}</em>}{label === 'Safety inspections' && overdueInspections.length > 0 && <em className="badge-red" style={{ background: '#fce8e8', color: '#c44' }}>{overdueInspections.length}</em>}{label === 'Incidents' && openIncidents.length > 0 && <em>{openIncidents.length}</em>}</button>)}</div>)}</nav>
      <div className="sl-sidebar-footer"><div className="sl-user"><div className="sl-avatar">KP</div><span><strong>Mr. Kiprono</strong><small>Lab Technician</small></span><MoreHorizontal size={16} /></div></div>
    </aside>
    {mobile && <button className="sl-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="sl-main"><header className="sl-topbar"><button className="sl-menu-button" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="sl-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="sl-top-actions"><div className="sl-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search labs, equipment..." /></div><button className="sl-profile" onClick={() => navigateTo('/science-lab/settings')}><div className="sl-avatar">KP</div><span>Kiprono</span><ChevronDown size={15} /></button></div></header>
      <div className="sl-content"><div className="sl-context"><div><span className="sl-kicker"><ShieldCheck size={14} /> Science Labs <b>•</b> 2026 · Term 3</span><h1>{current.label}</h1><p>{desc(location.pathname)}</p></div></div><RouteView path={location.pathname} demo={demo} navigateTo={navigateTo} /></div></main>
  </div>;
}

function desc(path: string): string {
  if (path.includes('dashboard')) return 'Laboratories, equipment, chemicals, practicals and safety at a glance.';
  if (path.includes('labs')) return 'Manage science laboratory rooms and their capacity.';
  if (path.includes('equipment')) return 'Track apparatus with stock levels and condition.';
  if (path.includes('chemical')) return 'Chemical batches with expiry tracking and hazard levels.';
  if (path.includes('practical')) return 'Plan and track practical lessons through their lifecycle.';
  if (path.includes('booking')) return 'Lab bookings with conflict detection.';
  if (path.includes('inspection')) return 'Scheduled safety inspections and findings.';
  if (path.includes('incident')) return 'Lab incidents with severity and resolution tracking.';
  if (path.includes('maintenance')) return 'Equipment and room maintenance requests.';
  if (path.includes('report')) return 'Lab utilization, stock and safety reports.';
  return 'Science laboratory management.';
}

function RouteView({ path, demo, navigateTo }: { path: string; demo: ReturnType<typeof useScienceLabDemo>; navigateTo: (p: string) => void }) {
  if (path === '/science-lab/dashboard' || path === '/science-lab') return <Dashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/science-lab/labs')) return <LabsView demo={demo} />;
  if (path.startsWith('/science-lab/equipment')) return <EquipmentView demo={demo} />;
  if (path.startsWith('/science-lab/chemicals')) return <ChemicalsView demo={demo} />;
  if (path.startsWith('/science-lab/practicals')) return <PracticalsView demo={demo} />;
  if (path.startsWith('/science-lab/bookings')) return <BookingsView demo={demo} />;
  if (path.startsWith('/science-lab/inspections')) return <InspectionsView demo={demo} />;
  if (path.startsWith('/science-lab/incidents')) return <IncidentsView demo={demo} />;
  if (path.startsWith('/science-lab/maintenance')) return <MaintenanceView demo={demo} />;
  if (path.startsWith('/science-lab/reports')) return <ReportsView demo={demo} />;
  return <div className="sl-empty">Settings page — lab categories, booking rules, inspection templates and reorder thresholds.</div>;
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return <div className="sl-panel"><div className="sl-panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>{children}</div>;
}
function Metric({ icon: Icon, label, value, detail, tone, onClick }: { icon: LucideIcon; label: string; value: string; detail: string; tone?: string; onClick: () => void }) {
  return <button className="sl-metric" onClick={onClick}><div className={`sl-metric-icon ${tone ?? ''}`}><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></button>;
}

function Dashboard({ demo, navigateTo }: { demo: ReturnType<typeof useScienceLabDemo>; navigateTo: (p: string) => void }) {
  const activeLabs = demo.labs.filter((l) => l.status === 'Active');
  const lowStock = demo.equipment.filter((e) => e.quantityAvailable <= e.reorderThreshold);
  const expired = demo.chemicals.filter((c) => c.isExpired);
  const pendingBookings = demo.bookings.filter((b) => b.status === 'Pending');
  return <><div className="sl-kpi-grid">
    <Metric icon={FlaskConical} label="Active labs" value={String(activeLabs.length)} detail={`${demo.labs.length} total labs`} onClick={() => navigateTo('/science-lab/labs')} />
    <Metric icon={Package} label="Low stock items" value={String(lowStock.length)} detail="Below reorder threshold" tone="gold" onClick={() => navigateTo('/science-lab/equipment')} />
    <Metric icon={AlertTriangle} label="Expired chemicals" value={String(expired.length)} detail="Cannot be issued" tone="red" onClick={() => navigateTo('/science-lab/chemicals')} />
    <Metric icon={Calendar} label="Pending bookings" value={String(pendingBookings.length)} detail="Awaiting confirmation" tone="teal" onClick={() => navigateTo('/science-lab/bookings')} />
  </div>
  <div className="sl-main-grid">
    <Panel title="Upcoming practical sessions" subtitle={`${demo.practicals.filter((p) => p.status === 'Scheduled' || p.status === 'Prepared').length} session(s) this week`}>
      <div className="sl-record-list">{demo.practicals.filter((p) => p.status === 'Scheduled' || p.status === 'Prepared' || p.status === 'Approved').map((p) => <div className="sl-record-row" key={p.id}><div><strong>{p.title}</strong><span>{p.subject} · {p.className} · {p.labName} · {p.date}</span></div><span className={`sl-status ${p.status === 'Scheduled' ? 'good' : p.status === 'Prepared' ? 'info' : 'warning'}`}>{p.status}</span></div>)}</div>
    </Panel>
    <Panel title="Expired chemicals" subtitle="Must not be issued for practical use">
      <div className="sl-record-list">{expired.length === 0 ? <div className="sl-empty">No expired chemicals</div> : expired.map((c) => <div className="sl-record-row" key={c.id}><div><strong>{c.chemicalName}</strong><span>Batch: {c.batchNumber} · Expired: {c.expiryDate} · {c.hazardLevel}</span></div><span className="sl-status bad">Expired</span></div>)}</div>
    </Panel>
  </div>
  <div className="sl-main-grid">
    <Panel title="Open incidents" subtitle={`${demo.incidents.filter((i) => i.status !== 'Resolved' && i.status !== 'Closed').length} unresolved`}>
      <div className="sl-record-list">{demo.incidents.map((i) => <div className="sl-record-row" key={i.id}><div><strong>{i.description}</strong><span>{i.labName} · {i.date} · Severity: {i.severity}</span></div><span className={`sl-status ${i.status === 'Resolved' ? 'good' : i.severity === 'Critical' ? 'bad' : 'warning'}`}>{i.status}</span></div>)}</div>
    </Panel>
    <Panel title="Lab status" subtitle="Current availability">
      <div className="sl-record-list">{demo.labs.map((l) => <div className="sl-record-row" key={l.id}><div><strong>{l.name}</strong><span>{l.type} · Capacity {l.capacity} · Technician: {l.technician}</span></div><span className={`sl-status ${l.status === 'Active' ? 'good' : l.status === 'Maintenance' ? 'warning' : 'bad'}`}>{l.status}</span></div>)}</div>
    </Panel>
  </div></>;
}

function LabsView({ demo }: { demo: ReturnType<typeof useScienceLabDemo> }) {
  return <Panel title="Science laboratories" subtitle={`${demo.labs.length} lab(s)`}>
    <div className="sl-table-wrap"><table className="sl-table"><thead><tr><th>Name</th><th>Code</th><th>Type</th><th>Capacity</th><th>Technician</th><th>Status</th></tr></thead>
    <tbody>{demo.labs.map((l) => <tr key={l.id}><td><strong>{l.name}</strong></td><td>{l.code}</td><td>{l.type}</td><td>{l.capacity}</td><td>{l.technician}</td><td><span className={`sl-status ${l.status === 'Active' ? 'good' : l.status === 'Maintenance' ? 'warning' : 'bad'}`}>{l.status}</span></td></tr>)}</tbody></table></div>
  </Panel>;
}

function EquipmentView({ demo }: { demo: ReturnType<typeof useScienceLabDemo> }) {
  return <Panel title="Science equipment" subtitle={`${demo.equipment.length} item(s) across all labs`}>
    <div className="sl-table-wrap"><table className="sl-table"><thead><tr><th>Item</th><th>Code</th><th>Lab</th><th>Category</th><th>Available</th><th>Reserved</th><th>Condition</th><th>Reorder</th></tr></thead>
    <tbody>{demo.equipment.map((e) => <tr key={e.id}><td><strong>{e.name}</strong></td><td>{e.itemCode}</td><td>{e.labName}</td><td>{e.category}</td><td>{e.quantityAvailable}</td><td>{e.quantityReserved}</td><td><span className={`sl-status ${e.condition === 'Good' ? 'good' : e.condition === 'Fair' ? 'warning' : 'bad'}`}>{e.condition}</span></td><td>{e.reorderThreshold}</td></tr>)}</tbody></table></div>
  </Panel>;
}

function ChemicalsView({ demo }: { demo: ReturnType<typeof useScienceLabDemo> }) {
  return <Panel title="Chemical batches" subtitle={`${demo.chemicals.length} batch(es) — expiry and hazard tracking`}>
    <div className="sl-table-wrap"><table className="sl-table"><thead><tr><th>Chemical</th><th>Batch</th><th>Quantity</th><th>Expiry</th><th>Hazard</th><th>Disposal</th><th>Status</th></tr></thead>
    <tbody>{demo.chemicals.map((c) => <tr key={c.id}><td><strong>{c.chemicalName}</strong></td><td>{c.batchNumber}</td><td>{c.quantity} {c.unit}</td><td>{c.expiryDate}</td><td><span className={`sl-status ${c.hazardLevel === 'Restricted' || c.hazardLevel === 'Toxic' ? 'bad' : c.hazardLevel === 'Corrosive' || c.hazardLevel === 'Flammable' ? 'warning' : 'info'}`}>{c.hazardLevel}</span></td><td>{c.disposalStatus}</td><td>{c.isExpired ? <span className="sl-status bad">Expired</span> : <span className="sl-status good">Valid</span>}</td></tr>)}</tbody></table></div>
  </Panel>;
}

function PracticalsView({ demo }: { demo: ReturnType<typeof useScienceLabDemo> }) {
  const statusColor = (s: PracticalLesson['status']) => s === 'Completed' || s === 'Assessed' ? 'good' : s === 'In Progress' || s === 'Scheduled' ? 'info' : s === 'Approved' || s === 'Prepared' ? 'info' : s === 'Draft' ? 'neutral' : 'warning';
  return <Panel title="Practical lessons" subtitle={`${demo.practicals.length} lesson(s) — full lifecycle tracking`}>
    <div className="sl-record-list">{demo.practicals.map((p) => <div className="sl-record-row" key={p.id}>
      <div><strong>{p.title}</strong><span>{p.subject} · {p.className} · {p.teacher} · {p.labName} · {p.date}</span></div>
      <span className={`sl-status ${statusColor(p.status)}`}>{p.status}</span>
      <div className="sl-row-actions"><button className="sl-link" onClick={() => demo.advancePractical(p.id)}>Advance</button></div>
    </div>)}</div>
  </Panel>;
}

function BookingsView({ demo }: { demo: ReturnType<typeof useScienceLabDemo> }) {
  const [labName, setLabName] = useState('');
  const [title, setTitle] = useState('');
  const [teacher, setTeacher] = useState('');
  const [className, setClassName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!labName || !title.trim() || !date || !startTime || !endTime) { setError('Lab, title, date and times are required.'); return; }
    const r = demo.createBooking(labName, title, teacher, className, date, startTime, endTime);
    if (r.ok) { setSuccess('Booking created.'); setError(''); setTitle(''); setTeacher(''); setClassName(''); setDate(''); setStartTime(''); setEndTime(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  return <><Panel title="Create booking" subtitle="Book a lab — conflict detection active">
    <form className="sl-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Lab<select value={labName} onChange={(e) => setLabName(e.target.value)}><option value="">Select lab...</option>{demo.labs.filter((l) => l.status === 'Active').map((l) => <option key={l.id} value={l.name}>{l.name}</option>)}</select></label>
        <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Titration Practical" /></label>
        <label>Teacher<input value={teacher} onChange={(e) => setTeacher(e.target.value)} placeholder="e.g. Mrs. Rose Akinyi" /></label>
        <label>Class<input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="e.g. Form 3 — Sabaki" /></label>
        <label>Date<input value={date} onChange={(e) => setDate(e.target.value)} placeholder="2026-10-20" /></label>
        <label>Start time<input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} /></label>
        <label>End time<input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} /></label>
      </div>
      <button className="sl-button primary" type="submit" disabled={!labName || !title.trim() || !date}><Plus size={15} /> Create booking</button>
      {error && <span className="sl-form-error">{error}</span>}
      {success && <span className="sl-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Lab bookings" subtitle={`${demo.bookings.length} booking(s)`}>
    <div className="sl-record-list">{demo.bookings.map((b) => <div className="sl-record-row" key={b.id}>
      <div><strong>{b.title}</strong><span>{b.labName} · {b.date} {b.startTime}–{b.endTime} · {b.teacher} · {b.className}</span></div>
      <span className={`sl-status ${b.status === 'Confirmed' ? 'good' : b.status === 'Cancelled' ? 'bad' : b.status === 'Completed' ? 'info' : 'warning'}`}>{b.status}</span>
      <div className="sl-row-actions">{b.status === 'Pending' && <><button className="sl-link" onClick={() => demo.confirmBooking(b.id)}>Confirm</button><button className="sl-link" onClick={() => demo.cancelBooking(b.id)}>Cancel</button></>}</div>
    </div>)}</div>
  </Panel></>;
}

function InspectionsView({ demo }: { demo: ReturnType<typeof useScienceLabDemo> }) {
  return <Panel title="Safety inspections" subtitle={`${demo.inspections.length} inspection(s)`}>
    <div className="sl-table-wrap"><table className="sl-table"><thead><tr><th>Lab</th><th>Date</th><th>Inspector</th><th>Findings</th><th>Status</th></tr></thead>
    <tbody>{demo.inspections.map((i) => <tr key={i.id}><td><strong>{i.labName}</strong></td><td>{i.date}</td><td>{i.inspector}</td><td>{i.findings}</td><td><span className={`sl-status ${i.status === 'Completed' ? 'good' : i.status === 'Overdue' ? 'bad' : 'warning'}`}>{i.status}</span></td></tr>)}</tbody></table></div>
  </Panel>;
}

function IncidentsView({ demo }: { demo: ReturnType<typeof useScienceLabDemo> }) {
  return <Panel title="Lab incidents" subtitle={`${demo.incidents.length} incident(s)`}>
    <div className="sl-record-list">{demo.incidents.map((i) => <div className="sl-record-row" key={i.id}><div><strong>{i.description}</strong><span>{i.labName} · {i.date} · Severity: {i.severity}</span></div><span className={`sl-status ${i.status === 'Resolved' ? 'good' : i.severity === 'Critical' ? 'bad' : 'warning'}`}>{i.status}</span></div>)}</div>
  </Panel>;
}

function MaintenanceView({ demo }: { demo: ReturnType<typeof useScienceLabDemo> }) {
  return <Panel title="Maintenance requests" subtitle={`${demo.maintenance.length} request(s)`}>
    <div className="sl-record-list">{demo.maintenance.map((m) => <div className="sl-record-row" key={m.id}><div><strong>{m.equipment}</strong><span>{m.labName} · Reported: {m.reportedDate} · Priority: {m.priority}</span></div><span className={`sl-status ${m.status === 'Resolved' || m.status === 'Verified' || m.status === 'Closed' ? 'good' : m.priority === 'High' ? 'warning' : 'info'}`}>{m.status}</span></div>)}</div>
  </Panel>;
}

function ReportsView({ demo }: { demo: ReturnType<typeof useScienceLabDemo> }) {
  return <><div className="sl-kpi-grid">
    <Metric icon={FlaskConical} label="Total labs" value={String(demo.labs.length)} detail={`${demo.labs.filter((l) => l.status === 'Active').length} active`} />
    <Metric icon={Package} label="Equipment items" value={String(demo.equipment.length)} detail={`${demo.equipment.filter((e) => e.condition === 'Good').length} in good condition`} tone="teal" />
    <Metric icon={AlertTriangle} label="Chemical batches" value={String(demo.chemicals.length)} detail={`${demo.chemicals.filter((c) => c.isExpired).length} expired`} tone="gold" />
    <Metric icon={ClipboardList} label="Practical lessons" value={String(demo.practicals.length)} detail={`${demo.practicals.filter((p) => p.status === 'Completed' || p.status === 'Assessed').length} completed`} tone="blue" />
  </div></>;
}
