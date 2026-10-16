import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, Bell, Calendar, ChevronDown, ClipboardList, Cpu, FileText, LayoutDashboard, Menu, Monitor, MoreHorizontal, Package, Plus, Search, Settings, ShieldCheck, Ticket, Users, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/computerlab.css';
import { useComputerLabDemo, type TechnicalTicket, type ComputerPractical } from '@/data/computerLabDemo';

type Nav = { label: string; path: string; icon: LucideIcon; group: string };
const nav: Nav[] = [
  { label: 'Dashboard', path: '/computer-lab/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Computer labs', path: '/computer-lab/labs', icon: Monitor, group: 'Configuration' },
  { label: 'Workstations', path: '/computer-lab/workstations', icon: Cpu, group: 'Configuration' },
  { label: 'ICT assets', path: '/computer-lab/assets', icon: Package, group: 'Inventory' },
  { label: 'Software & licences', path: '/computer-lab/software', icon: FileText, group: 'Inventory' },
  { label: 'Bookings', path: '/computer-lab/bookings', icon: Calendar, group: 'Operations' },
  { label: 'Practical lessons', path: '/computer-lab/practicals', icon: ClipboardList, group: 'Operations' },
  { label: 'Technical tickets', path: '/computer-lab/tickets', icon: Ticket, group: 'Support' },
  { label: 'Asset audits', path: '/computer-lab/audits', icon: ShieldCheck, group: 'Controls' },
  { label: 'Reports', path: '/computer-lab/reports', icon: FileText, group: 'Controls' },
  { label: 'Settings', path: '/computer-lab/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Configuration', 'Inventory', 'Operations', 'Support', 'Controls', 'Account'];

export function ComputerLabPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useComputerLabDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const current = nav.find((item) => location.pathname.startsWith(item.path)) ?? nav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const faultyDevices = demo.workstations.filter((w) => w.deviceStatus === 'Faulty' || w.deviceStatus === 'Under Repair');
  const openTickets = demo.tickets.filter((t) => t.status !== 'Closed' && t.status !== 'Verified');
  const pendingBookings = demo.bookings.filter((b) => b.status === 'Pending');

  return <div className="cl-app">
    <aside className={`cl-sidebar ${mobile ? 'open' : ''}`}>
      <div className="cl-brand"><div className="cl-brand-mark"><Monitor size={21} /></div><div><strong>Riverside</strong><span>Computer Labs</span></div><button className="cl-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div>
      <div className="cl-demo-pill"><span className="cl-demo-dot" /> DEMO MODE <span>·</span> October 2026</div>
      <div className="cl-school"><div>RA</div><span><strong>Riverside Academy</strong><small>ICT Department</small></span><ChevronDown size={15} /></div>
      <nav className="cl-nav">{groups.map((group) => <div className="cl-nav-group" key={group}><p>{group}</p>{nav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={`cl-nav-item${current.path === path || (path !== '/computer-lab/dashboard' && location.pathname.startsWith(path)) ? ' active' : ''}`} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Technical tickets' && openTickets.length > 0 && <em>{openTickets.length}</em>}{label === 'Bookings' && pendingBookings.length > 0 && <em>{pendingBookings.length}</em>}{label === 'Workstations' && faultyDevices.length > 0 && <em className="badge-red" style={{ background: '#fce8e8', color: '#c44' }}>{faultyDevices.length}</em>}</button>)}</div>)}</nav>
      <div className="cl-sidebar-footer"><div className="cl-user"><div className="cl-avatar">MW</div><span><strong>Mr. Mwangi</strong><small>ICT Technician</small></span><MoreHorizontal size={16} /></div></div>
    </aside>
    {mobile && <button className="cl-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="cl-main"><header className="cl-topbar"><button className="cl-menu-button" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="cl-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="cl-top-actions"><div className="cl-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search workstations, assets..." /></div><button className="cl-profile" onClick={() => navigateTo('/computer-lab/settings')}><div className="cl-avatar">MW</div><span>Mwangi</span><ChevronDown size={15} /></button></div></header>
      <div className="cl-content"><div className="cl-context"><div><span className="cl-kicker"><ShieldCheck size={14} /> Computer Labs <b>•</b> 2026 · Term 3</span><h1>{current.label}</h1><p>{desc(location.pathname)}</p></div></div><RouteView path={location.pathname} demo={demo} navigateTo={navigateTo} /></div></main>
  </div>;
}

function desc(path: string): string {
  if (path.includes('dashboard')) return 'Labs, workstations, devices, software and support tickets at a glance.';
  if (path.includes('labs')) return 'Manage computer laboratory rooms and capacity.';
  if (path.includes('workstation')) return 'Workstation inventory with device status tracking.';
  if (path.includes('asset')) return 'ICT asset register with asset tags and serial numbers.';
  if (path.includes('software')) return 'Software products and licence management.';
  if (path.includes('booking')) return 'Computer lab bookings with conflict and capacity detection.';
  if (path.includes('practical')) return 'Computer practical lessons and assessments.';
  if (path.includes('ticket')) return 'Technical support tickets with full lifecycle tracking.';
  if (path.includes('audit')) return 'Asset audit and reconciliation records.';
  if (path.includes('report')) return 'Device, software, utilization and support reports.';
  return 'Computer laboratory management.';
}

function RouteView({ path, demo, navigateTo }: { path: string; demo: ReturnType<typeof useComputerLabDemo>; navigateTo: (p: string) => void }) {
  if (path === '/computer-lab/dashboard' || path === '/computer-lab') return <Dashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/computer-lab/labs')) return <LabsView demo={demo} />;
  if (path.startsWith('/computer-lab/workstations')) return <WorkstationsView demo={demo} />;
  if (path.startsWith('/computer-lab/assets')) return <AssetsView demo={demo} />;
  if (path.startsWith('/computer-lab/software')) return <SoftwareView demo={demo} />;
  if (path.startsWith('/computer-lab/bookings')) return <BookingsView demo={demo} />;
  if (path.startsWith('/computer-lab/practicals')) return <PracticalsView demo={demo} />;
  if (path.startsWith('/computer-lab/tickets')) return <TicketsView demo={demo} />;
  if (path.startsWith('/computer-lab/audits')) return <AuditsView demo={demo} />;
  if (path.startsWith('/computer-lab/reports')) return <ReportsView demo={demo} />;
  return <div className="cl-empty">Settings page — lab categories, device types, software categories and licence reminders.</div>;
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return <div className="cl-panel"><div className="cl-panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>{children}</div>;
}
function Metric({ icon: Icon, label, value, detail, tone, onClick }: { icon: LucideIcon; label: string; value: string; detail: string; tone?: string; onClick: () => void }) {
  return <button className="cl-metric" onClick={onClick}><div className={`cl-metric-icon ${tone ?? ''}`}><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></button>;
}

function Dashboard({ demo, navigateTo }: { demo: ReturnType<typeof useComputerLabDemo>; navigateTo: (p: string) => void }) {
  const operational = demo.workstations.filter((w) => w.deviceStatus === 'Operational');
  const faulty = demo.workstations.filter((w) => w.deviceStatus === 'Faulty' || w.deviceStatus === 'Under Repair');
  const openTickets = demo.tickets.filter((t) => t.status !== 'Closed' && t.status !== 'Verified');
  const expiringLicences = demo.licences.filter((l) => l.status === 'Expiring Soon');
  return <><div className="cl-kpi-grid">
    <Metric icon={Monitor} label="Computer labs" value={String(demo.labs.length)} detail={`${demo.labs.filter((l) => l.status === 'Active').length} active`} onClick={() => navigateTo('/computer-lab/labs')} />
    <Metric icon={Cpu} label="Operational devices" value={String(operational.length)} detail={`${faulty.length} faulty/under repair`} tone="teal" onClick={() => navigateTo('/computer-lab/workstations')} />
    <Metric icon={Ticket} label="Open tickets" value={String(openTickets.length)} detail="Technical support" tone="red" onClick={() => navigateTo('/computer-lab/tickets')} />
    <Metric icon={FileText} label="Expiring licences" value={String(expiringLicences.length)} detail="Within 60 days" tone="gold" onClick={() => navigateTo('/computer-lab/software')} />
  </div>
  <div className="cl-main-grid">
    <Panel title="Open technical tickets" subtitle={`${openTickets.length} ticket(s) needing attention`}>
      <div className="cl-record-list">{openTickets.map((t) => <div className="cl-record-row" key={t.id}><div><strong>{t.description}</strong><span>WS: {t.workstationNumber} · {t.labName} · Reported: {t.reportedDate}</span></div><span className={`cl-status ${t.priority === 'Critical' ? 'bad' : t.priority === 'High' ? 'warning' : 'info'}`}>{t.priority}</span></div>)}</div>
    </Panel>
    <Panel title="Workstation status" subtitle={`${demo.workstations.length} workstation(s) across all labs`}>
      <div className="cl-record-list">{demo.workstations.slice(0, 6).map((w) => <div className="cl-record-row" key={w.id}><div><strong>{w.workstationNumber}</strong><span>{w.labName} · {w.manufacturer} {w.model} · Tag: {w.assetTag}</span></div><span className={`cl-status ${w.deviceStatus === 'Operational' ? 'good' : 'bad'}`}>{w.deviceStatus}</span></div>)}</div>
    </Panel>
  </div>
  <div className="cl-main-grid">
    <Panel title="Upcoming bookings" subtitle="Confirmed and pending lab reservations">
      <div className="cl-record-list">{demo.bookings.map((b) => <div className="cl-record-row" key={b.id}><div><strong>{b.title}</strong><span>{b.labName} · {b.date} {b.startTime}–{b.endTime} · {b.workstationsRequired} workstations</span></div><span className={`cl-status ${b.status === 'Confirmed' ? 'good' : 'warning'}`}>{b.status}</span></div>)}</div>
    </Panel>
    <Panel title="Software licence summary" subtitle="Licence allocation and expiry">
      <div className="cl-record-list">{demo.software.map((s) => <div className="cl-record-row" key={s.id}><div><strong>{s.name}</strong><span>{s.version} · {s.licencesAllocated}/{s.licencesTotal || 'Unlimited'} licences · {s.category}</span></div><span className="cl-status info">{s.licencesTotal > 0 ? `${Math.round((s.licencesAllocated / s.licencesTotal) * 100)}%` : 'Free'}</span></div>)}</div>
    </Panel>
  </div></>;
}

function LabsView({ demo }: { demo: ReturnType<typeof useComputerLabDemo> }) {
  return <Panel title="Computer labs" subtitle={`${demo.labs.length} lab(s)`}>
    <div className="cl-table-wrap"><table className="cl-table"><thead><tr><th>Name</th><th>Code</th><th>Capacity</th><th>Technician</th><th>Status</th></tr></thead>
    <tbody>{demo.labs.map((l) => <tr key={l.id}><td><strong>{l.name}</strong></td><td>{l.code}</td><td>{l.capacity}</td><td>{l.technician}</td><td><span className={`cl-status ${l.status === 'Active' ? 'good' : 'warning'}`}>{l.status}</span></td></tr>)}</tbody></table></div>
  </Panel>;
}

function WorkstationsView({ demo }: { demo: ReturnType<typeof useComputerLabDemo> }) {
  return <Panel title="Workstations" subtitle={`${demo.workstations.length} workstation(s) across all labs`}>
    <div className="cl-table-wrap"><table className="cl-table"><thead><tr><th>WS #</th><th>Lab</th><th>Asset Tag</th><th>Manufacturer</th><th>Model</th><th>Device Status</th><th>WS Status</th></tr></thead>
    <tbody>{demo.workstations.map((w) => <tr key={w.id}><td><strong>{w.workstationNumber}</strong></td><td>{w.labName}</td><td>{w.assetTag}</td><td>{w.manufacturer}</td><td>{w.model}</td><td><span className={`cl-status ${w.deviceStatus === 'Operational' ? 'good' : w.deviceStatus === 'Faulty' || w.deviceStatus === 'Under Repair' ? 'bad' : 'neutral'}`}>{w.deviceStatus}</span></td><td><span className={`cl-status ${w.workstationStatus === 'Available' ? 'good' : 'bad'}`}>{w.workstationStatus}</span></td></tr>)}</tbody></table></div>
  </Panel>;
}

function AssetsView({ demo }: { demo: ReturnType<typeof useComputerLabDemo> }) {
  return <Panel title="ICT assets" subtitle={`${demo.assets.length} asset(s) — projectors, printers, routers`}>
    <div className="cl-table-wrap"><table className="cl-table"><thead><tr><th>Asset Tag</th><th>Type</th><th>Manufacturer</th><th>Model</th><th>Serial</th><th>Lab</th><th>Status</th></tr></thead>
    <tbody>{demo.assets.map((a) => <tr key={a.id}><td><strong>{a.assetTag}</strong></td><td>{a.deviceType}</td><td>{a.manufacturer}</td><td>{a.model}</td><td>{a.serialNumber}</td><td>{a.labName}</td><td><span className={`cl-status ${a.status === 'Operational' ? 'good' : 'bad'}`}>{a.status}</span></td></tr>)}</tbody></table></div>
  </Panel>;
}

function SoftwareView({ demo }: { demo: ReturnType<typeof useComputerLabDemo> }) {
  return <><Panel title="Software products" subtitle={`${demo.software.length} product(s)`}>
    <div className="cl-table-wrap"><table className="cl-table"><thead><tr><th>Product</th><th>Version</th><th>Category</th><th>Licences</th><th>Allocated</th></tr></thead>
    <tbody>{demo.software.map((s) => <tr key={s.id}><td><strong>{s.name}</strong></td><td>{s.version}</td><td>{s.category}</td><td>{s.licencesTotal || 'Unlimited'}</td><td>{s.licencesAllocated}</td></tr>)}</tbody></table></div>
  </Panel>
  <Panel title="Software licences" subtitle={`${demo.licences.length} licence(s) — expiry tracking`}>
    <div className="cl-table-wrap"><table className="cl-table"><thead><tr><th>Product</th><th>Type</th><th>Seats</th><th>Expiry</th><th>Status</th></tr></thead>
    <tbody>{demo.licences.map((l) => <tr key={l.id}><td><strong>{l.productName}</strong></td><td>{l.licenceType}</td><td>{l.seats}</td><td>{l.expiryDate}</td><td><span className={`cl-status ${l.status === 'Active' ? 'good' : 'warning'}`}>{l.status}</span></td></tr>)}</tbody></table></div>
  </Panel></>;
}

function BookingsView({ demo }: { demo: ReturnType<typeof useComputerLabDemo> }) {
  const [labName, setLabName] = useState('');
  const [title, setTitle] = useState('');
  const [teacher, setTeacher] = useState('');
  const [className, setClassName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [wsRequired, setWsRequired] = useState('25');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!labName || !title.trim() || !date || !startTime || !endTime) { setError('Lab, title, date and times are required.'); return; }
    const r = demo.createBooking(labName, title, teacher, className, date, startTime, endTime, parseInt(wsRequired) || 1);
    if (r.ok) { setSuccess('Booking created.'); setError(''); setTitle(''); setTeacher(''); setClassName(''); setDate(''); setStartTime(''); setEndTime(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  return <><Panel title="Create booking" subtitle="Book a computer lab — conflict and capacity detection">
    <form className="cl-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Lab<select value={labName} onChange={(e) => setLabName(e.target.value)}><option value="">Select lab...</option>{demo.labs.filter((l) => l.status === 'Active').map((l) => <option key={l.id} value={l.name}>{l.name}</option>)}</select></label>
        <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Excel Practical" /></label>
        <label>Teacher<input value={teacher} onChange={(e) => setTeacher(e.target.value)} placeholder="e.g. Mr. Samuel Kamau" /></label>
        <label>Class<input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="e.g. Form 2 — Tana" /></label>
        <label>Date<input value={date} onChange={(e) => setDate(e.target.value)} placeholder="2026-10-20" /></label>
        <label>Start time<input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} /></label>
        <label>End time<input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} /></label>
        <label>Workstations required<input type="number" value={wsRequired} onChange={(e) => setWsRequired(e.target.value)} /></label>
      </div>
      <button className="cl-button primary" type="submit" disabled={!labName || !title.trim() || !date}><Plus size={15} /> Create booking</button>
      {error && <span className="cl-form-error">{error}</span>}
      {success && <span className="cl-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Lab bookings" subtitle={`${demo.bookings.length} booking(s)`}>
    <div className="cl-record-list">{demo.bookings.map((b) => <div className="cl-record-row" key={b.id}>
      <div><strong>{b.title}</strong><span>{b.labName} · {b.date} {b.startTime}–{b.endTime} · {b.workstationsRequired} WS · {b.teacher} · {b.className}</span></div>
      <span className={`cl-status ${b.status === 'Confirmed' ? 'good' : b.status === 'Cancelled' ? 'bad' : 'warning'}`}>{b.status}</span>
      <div className="cl-row-actions">{b.status === 'Pending' && <><button className="cl-link" onClick={() => demo.confirmBooking(b.id)}>Confirm</button><button className="cl-link" onClick={() => demo.cancelBooking(b.id)}>Cancel</button></>}</div>
    </div>)}</div>
  </Panel></>;
}

function PracticalsView({ demo }: { demo: ReturnType<typeof useComputerLabDemo> }) {
  const statusColor = (s: ComputerPractical['status']) => s === 'Completed' || s === 'Assessed' ? 'good' : s === 'In Progress' || s === 'Scheduled' ? 'info' : s === 'Draft' ? 'neutral' : 'warning';
  return <Panel title="Computer practical lessons" subtitle={`${demo.practicals.length} lesson(s) — full lifecycle tracking`}>
    <div className="cl-record-list">{demo.practicals.map((p) => <div className="cl-record-row" key={p.id}>
      <div><strong>{p.title}</strong><span>{p.subject} · {p.className} · {p.teacher} · {p.labName} · {p.date}</span></div>
      <span className={`cl-status ${statusColor(p.status)}`}>{p.status}</span>
      <div className="cl-row-actions"><button className="cl-link" onClick={() => demo.advancePractical(p.id)}>Advance</button></div>
    </div>)}</div>
  </Panel>;
}

function TicketsView({ demo }: { demo: ReturnType<typeof useComputerLabDemo> }) {
  const [wsNumber, setWsNumber] = useState('');
  const [labName, setLabName] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TechnicalTicket['priority']>('Medium');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!wsNumber || !description.trim()) { setError('Workstation and description are required.'); return; }
    demo.createTicket(wsNumber, labName, reportedBy, description, priority);
    setSuccess('Ticket created.'); setError(''); setWsNumber(''); setDescription(''); setReportedBy('');
  };
  const statusColor = (s: TechnicalTicket['status']) => s === 'Resolved' || s === 'Verified' || s === 'Closed' ? 'good' : s === 'In Progress' ? 'info' : s === 'Open' ? 'warning' : 'neutral';
  return <><Panel title="Create technical ticket" subtitle="Report a device or software issue">
    <form className="cl-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Workstation #<input value={wsNumber} onChange={(e) => setWsNumber(e.target.value)} placeholder="e.g. WS-5" /></label>
        <label>Lab<select value={labName} onChange={(e) => setLabName(e.target.value)}><option value="">Select...</option>{demo.labs.map((l) => <option key={l.id} value={l.name}>{l.name}</option>)}</select></label>
        <label>Reported by<input value={reportedBy} onChange={(e) => setReportedBy(e.target.value)} placeholder="e.g. Mr. Samuel Kamau" /></label>
        <label>Priority<select value={priority} onChange={(e) => setPriority(e.target.value as TechnicalTicket['priority'])}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></label>
      </div>
      <label>Description<input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Monitor not turning on" /></label>
      <button className="cl-button primary" type="submit" disabled={!wsNumber || !description.trim()}><Plus size={15} /> Create ticket</button>
      {error && <span className="cl-form-error">{error}</span>}
      {success && <span className="cl-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Technical tickets" subtitle={`${demo.tickets.length} ticket(s) — full lifecycle tracking`}>
    <div className="cl-record-list">{demo.tickets.map((t) => <div className="cl-record-row" key={t.id}>
      <div><strong>{t.description}</strong><span>WS: {t.workstationNumber} · {t.labName} · Reported by: {t.reportedBy} · {t.reportedDate}</span></div>
      <span className={`cl-status ${t.priority === 'Critical' ? 'bad' : 'warning'}`}>{t.priority}</span>
      <span className={`cl-status ${statusColor(t.status)}`}>{t.status}</span>
      <div className="cl-row-actions"><button className="cl-link" onClick={() => demo.advanceTicket(t.id)}>Advance</button></div>
    </div>)}</div>
  </Panel></>;
}

function AuditsView({ demo }: { demo: ReturnType<typeof useComputerLabDemo> }) {
  return <Panel title="Asset audits" subtitle={`${demo.audits.length} audit(s)`}>
    <div className="cl-table-wrap"><table className="cl-table"><thead><tr><th>Lab</th><th>Auditor</th><th>Date</th><th>Discrepancies</th><th>Status</th></tr></thead>
    <tbody>{demo.audits.map((a) => <tr key={a.id}><td><strong>{a.labName}</strong></td><td>{a.auditor}</td><td>{a.date}</td><td>{a.discrepancies}</td><td><span className={`cl-status ${a.status === 'Completed' ? 'good' : a.status === 'Discrepancy' ? 'bad' : 'warning'}`}>{a.status}</span></td></tr>)}</tbody></table></div>
  </Panel>;
}

function ReportsView({ demo }: { demo: ReturnType<typeof useComputerLabDemo> }) {
  return <><div className="cl-kpi-grid">
    <Metric icon={Monitor} label="Total labs" value={String(demo.labs.length)} detail={`${demo.labs.filter((l) => l.status === 'Active').length} active`} />
    <Metric icon={Cpu} label="Workstations" value={String(demo.workstations.length)} detail={`${demo.workstations.filter((w) => w.deviceStatus === 'Operational').length} operational`} tone="teal" />
    <Metric icon={Ticket} label="Total tickets" value={String(demo.tickets.length)} detail={`${demo.tickets.filter((t) => t.status === 'Closed').length} closed`} tone="gold" />
    <Metric icon={FileText} label="Software products" value={String(demo.software.length)} detail={`${demo.licences.length} active licences`} tone="blue" />
  </div></>;
}
