import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Activity, AlertTriangle, ArrowUpRight, BarChart3, Bell, Bus, BusFront, CalendarClock, Check, CheckCircle2, ChevronDown, ClipboardList, Clock3, Fuel, HelpCircle, LayoutDashboard, LogOut, MapPin, Menu, MoreHorizontal, Plus, RotateCcw, Route as RouteIcon, Search, Settings, ShieldCheck, Users, Wrench, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/transport.css';
import { transportDemo, useTransportDemo, type VehicleType, type TripDirection, type MaintenanceType, type IncidentType, type IncidentSeverity, type AttendanceStatus } from '@/data/transportDemo';

type TpNav = { label: string; path: string; icon: LucideIcon; group: string };
const tpNav: TpNav[] = [
  { label: 'Dashboard', path: '/transport/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Vehicles', path: '/transport/vehicles', icon: BusFront, group: 'Fleet' },
  { label: 'Drivers', path: '/transport/drivers', icon: Users, group: 'Fleet' },
  { label: 'Routes & stops', path: '/transport/routes', icon: RouteIcon, group: 'Planning' },
  { label: 'Student allocation', path: '/transport/allocations', icon: ClipboardList, group: 'Planning' },
  { label: 'Trips', path: '/transport/trips', icon: Bus, group: 'Operations' },
  { label: 'Trip attendance', path: '/transport/attendance', icon: CheckCircle2, group: 'Operations' },
  { label: 'Maintenance', path: '/transport/maintenance', icon: Wrench, group: 'Fleet' },
  { label: 'Incidents', path: '/transport/incidents', icon: AlertTriangle, group: 'Operations' },
  { label: 'Fuel records', path: '/transport/fuel', icon: Fuel, group: 'Fleet' },
  { label: 'Notifications', path: '/transport/notifications', icon: Bell, group: 'Operations' },
  { label: 'Reports', path: '/transport/reports', icon: BarChart3, group: 'Controls' },
  { label: 'Audit history', path: '/transport/audit', icon: Activity, group: 'Controls' },
  { label: 'Settings', path: '/transport/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Fleet', 'Planning', 'Operations', 'Controls', 'Account'];

export function TransportPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useTransportDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const current = tpNav.find((item) => location.pathname.startsWith(item.path)) ?? tpNav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const openIncidents = demo.incidents.filter((i) => i.status === 'Open').length;
  const unreadCount = demo.notifications.filter((n) => n.unread).length;
  return <div className="tp-app">
    <aside className={`tp-sidebar ${mobile ? 'open' : ''}`}><div className="tp-brand"><div className="tp-brand-mark"><BusFront size={21} /></div><div><strong>Riverside</strong><span>Academy Transport</span></div><button className="tp-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div><div className="tp-demo-pill"><span /> DEMO MODE <b>•</b> October 2026</div><div className="tp-school"><div>RA</div><span><strong>Riverside Academy</strong><small>Transport services</small></span><ChevronDown size={15} /></div><nav className="tp-nav">{groups.map((group) => <div className="tp-nav-group" key={group}><p>{group}</p>{tpNav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={current.path === path || (path !== '/transport/dashboard' && location.pathname.startsWith(path)) ? 'active' : ''} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Incidents' && openIncidents > 0 && <em>{openIncidents}</em>}{label === 'Notifications' && unreadCount > 0 && <em>{unreadCount}</em>}</button>)}</div>)}</nav><div className="tp-sidebar-footer"><button onClick={() => navigateTo('/transport/help')}><HelpCircle size={16} /> Help centre</button><div className="tp-user"><div className="tp-avatar">TA</div><span><strong>Transport Admin</strong><small>Transport administrator</small></span><MoreHorizontal size={16} /></div></div></aside>
    {mobile && <button className="tp-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="tp-main"><header className="tp-topbar"><button className="tp-menu" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="tp-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="tp-top-actions"><div className="tp-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vehicles, drivers, routes..." /></div><button className="tp-icon-button" onClick={() => navigateTo('/transport/notifications')} aria-label="Open notifications"><Bell size={18} />{unreadCount > 0 && <i>{unreadCount}</i>}</button><div className="tp-profile-wrap"><button className="tp-profile" onClick={() => setProfileOpen(!profileOpen)}><div className="tp-avatar">TA</div><span>Transport Admin</span><ChevronDown size={15} /></button>{profileOpen && <div className="tp-profile-menu"><strong>Transport Admin</strong><small>Transport administrator</small><button onClick={() => navigateTo('/transport/settings')}><Settings size={14} /> Settings</button><button onClick={() => transportDemo.reset()}><RotateCcw size={14} /> Reset demo data</button><button onClick={() => navigateTo('/')}><LogOut size={14} /> Exit portal</button></div>}</div></div></header><div className="tp-content"><div className="tp-context"><div><span className="tp-kicker"><ShieldCheck size={14} /> Transport workspace <b>•</b> Term 2 · 16 Oct 2026</span><h1>{current.label}</h1><p>{tpDescription(location.pathname)}</p></div><div className="tp-context-actions"><button className="tp-button secondary" disabled title="The demo is fixed to October 2026"><CalendarClock size={15} /> October 2026 <ChevronDown size={14} /></button><button className="tp-button primary" onClick={() => navigateTo('/transport/vehicles/create')}><Plus size={15} /> Register bus</button></div></div><TpRoute path={location.pathname} demo={demo} search={search} navigateTo={navigateTo} /></div></main>
  </div>;
}

function tpDescription(path: string): string {
  if (path.includes('vehicle')) return 'Manage buses, vans and minibuses with capacity, inspection and insurance tracking.';
  if (path.includes('driver')) return 'Register drivers, track licence verification and manage route assignments.';
  if (path.includes('route')) return 'Create routes with ordered stops, assign vehicles and drivers, manage schedules.';
  if (path.includes('allocation')) return 'Allocate students to routes and stops with capacity enforcement.';
  if (path.includes('trip') && !path.includes('attendance')) return 'Plan, dispatch and track daily trips through their lifecycle.';
  if (path.includes('attendance')) return 'Record pickup and drop-off status for each student on an active trip.';
  if (path.includes('maintenance')) return 'Track scheduled services, repairs, inspections and vehicle downtime.';
  if (path.includes('incident')) return 'Report and resolve breakdowns, delays, accidents and safety concerns.';
  if (path.includes('fuel')) return 'Record fuel purchases with odometer readings and cost tracking.';
  if (path.includes('notification')) return 'Transport notices sent to parents, drivers and administrators.';
  if (path.includes('report')) return 'Generate reports from documented operational data sources.';
  if (path.includes('audit')) return 'Every transport operation is recorded with actor, action and timestamp.';
  return 'A complete view of fleet, routes, trips, attendance and incidents for school transport.';
}

function TpRoute({ path, demo, navigateTo }: { path: string; demo: ReturnType<typeof useTransportDemo>; search: string; navigateTo: (p: string) => void }) {
  if (path === '/transport/dashboard' || path === '/transport') return <TpDashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/transport/vehicles/create')) return <VehicleFormView />;
  if (path.startsWith('/transport/vehicles')) return <VehiclesView demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/transport/drivers')) return <DriversView demo={demo} />;
  if (path.startsWith('/transport/routes/create')) return <RouteFormView demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/transport/routes')) return <RoutesView demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/transport/allocations')) return <AllocationsView demo={demo} />;
  if (path.startsWith('/transport/trips')) return <TripsView demo={demo} />;
  if (path.startsWith('/transport/attendance')) return <AttendanceView demo={demo} />;
  if (path.startsWith('/transport/maintenance')) return <MaintenanceView demo={demo} />;
  if (path.startsWith('/transport/incidents')) return <IncidentsView demo={demo} />;
  if (path.startsWith('/transport/fuel')) return <FuelView demo={demo} />;
  if (path.startsWith('/transport/notifications')) return <NotificationsView demo={demo} />;
  if (path.startsWith('/transport/reports')) return <ReportsView demo={demo} />;
  if (path.startsWith('/transport/audit')) return <AuditView demo={demo} />;
  return <SettingsView demo={demo} />;
}

function TpDashboard({ demo, navigateTo }: { demo: ReturnType<typeof useTransportDemo>; navigateTo: (p: string) => void }) {
  const totalVehicles = demo.vehicles.length;
  const availableVehicles = demo.vehicles.filter((v) => v.status === 'Available').length;
  const inMaintenance = demo.vehicles.filter((v) => v.status === 'Under maintenance').length;
  const activeDrivers = demo.drivers.filter((d) => d.status === 'Active').length;
  const activeAllocations = demo.allocations.filter((a) => a.status === 'Active').length;
  const pendingAllocations = demo.allocations.filter((a) => a.status === 'Pending').length;
  const todayTrips = demo.trips.filter((t) => t.date === '16 Oct 2026');
  const inProgressTrips = todayTrips.filter((t) => t.status === 'In progress').length;
  const completedTrips = todayTrips.filter((t) => t.status === 'Completed').length;
  const openIncidents = demo.incidents.filter((i) => i.status === 'Open').length;
  const openMaintenance = demo.maintenance.filter((m) => m.status === 'In progress').length;
  const pickedUpToday = demo.trips.filter((t) => t.date === '16 Oct 2026').reduce((sum, t) => sum + t.attendance.filter((a) => a.status === 'Picked up' || a.status === 'Dropped off' || a.status === 'Boarded').length, 0);
  return <><div className="tp-kpi-grid">
    <TpMetric icon={BusFront} label="Registered vehicles" value={String(totalVehicles)} detail={`${availableVehicles} available · ${inMaintenance} in maintenance`} onClick={() => navigateTo('/transport/vehicles')} />
    <TpMetric icon={Users} label="Active drivers" value={String(activeDrivers)} detail={`${demo.drivers.length} total · ${demo.drivers.filter((d) => d.verification !== 'Verified').length} unverified`} onClick={() => navigateTo('/transport/drivers')} />
    <TpMetric icon={ClipboardList} label="Students allocated" value={String(activeAllocations)} detail={`${pendingAllocations} awaiting allocation`} onClick={() => navigateTo('/transport/allocations')} />
    <TpMetric icon={Bus} label="Trips today" value={String(todayTrips.length)} detail={`${inProgressTrips} in progress · ${completedTrips} completed`} onClick={() => navigateTo('/transport/trips')} />
  </div>
  <div className="tp-main-grid">
    <Panel title="Operations overview" subtitle="Synthetic records · 16 Oct 2026">
      <div className="tp-overview-grid">
        <MiniStat label="Picked up today" value={String(pickedUpToday)} />
        <MiniStat label="Open incidents" value={String(openIncidents)} />
        <MiniStat label="Open maintenance" value={String(openMaintenance)} />
        <MiniStat label="Active routes" value={String(demo.routes.filter((r) => r.status === 'Active').length)} />
      </div>
      <div className="tp-bars">{[['Karen Route', 3], ['Westlands Route', 2], ['Lavington Route', 0]].map(([label, value]) => <div key={label as string}><span>{label as string}</span><i><b style={{ width: `${(value as number) * 25}%` }} /></i><strong>{value as number}</strong></div>)}</div>
    </Panel>
    <Panel title="Task centre" subtitle="Items needing transport admin attention">
      <div className="tp-task-list">
        <Task title={`${pendingAllocations} student awaiting allocation`} detail="Gloria Wairimu · Year 5 Baobab" action="Allocate" onClick={() => navigateTo('/transport/allocations')} />
        <Task title={`${openMaintenance} maintenance job`} detail="BUS-03 brake repair in progress" action="Review" onClick={() => navigateTo('/transport/maintenance')} />
        <Task title={`${openIncidents} open incident`} detail="Vehicle defect on BUS-03" action="Review" onClick={() => navigateTo('/transport/incidents')} />
        <Task title="1 driver licence expired" detail="David Kimani · expired 22 Sep 2026" action="Review" onClick={() => navigateTo('/transport/drivers')} />
      </div>
    </Panel>
  </div>
  <div className="tp-main-grid tp-lower-grid">
    <Panel title="Today's trips" subtitle="Live operational status for 16 Oct 2026">
      <div className="tp-record-list">{todayTrips.map((trip) => <div className="tp-record-row" key={trip.id}><div><strong>{trip.routeName}</strong><span>{trip.vehiclePlate} · {trip.driverName} · {trip.direction}</span></div><span className={`tp-status ${trip.status === 'Completed' ? 'good' : trip.status === 'In progress' ? 'warning' : trip.status === 'Cancelled' ? 'bad' : 'neutral'}`}>{trip.status}</span></div>)}</div>
    </Panel>
    <Panel title="Quick actions" subtitle="Common transport operations">
      <div className="tp-quick-grid">
        <QuickAction label="Register bus" icon={BusFront} onClick={() => navigateTo('/transport/vehicles/create')} />
        <QuickAction label="Create route" icon={RouteIcon} onClick={() => navigateTo('/transport/routes/create')} />
        <QuickAction label="Allocate student" icon={ClipboardList} onClick={() => navigateTo('/transport/allocations')} />
        <QuickAction label="Report incident" icon={AlertTriangle} onClick={() => navigateTo('/transport/incidents')} />
      </div>
    </Panel>
  </div>
  <Panel title="Alerts" subtitle="Fleet and operational notices">
    <div className="tp-alert-grid">
      <AlertCard title="Vehicle in maintenance" detail="BUS-03 (KDA 004D) · brake repair · unavailable" tone="gold" onClick={() => navigateTo('/transport/maintenance')} />
      <AlertCard title="Driver licence expired" detail="David Kimani · B3 licence expired 22 Sep 2026" tone="pink" onClick={() => navigateTo('/transport/drivers')} />
      <AlertCard title="Student awaiting allocation" detail="Gloria Wairimu · Year 5 Baobab · no route assigned" tone="blue" onClick={() => navigateTo('/transport/allocations')} />
    </div>
  </Panel></>;
}

function VehiclesView({ demo, navigateTo }: { demo: ReturnType<typeof useTransportDemo>; navigateTo: (p: string) => void }) {
  const [query, setQuery] = useState('');
  const records = demo.vehicles.filter((v) => `${v.plate} ${v.make} ${v.model} ${v.vehicleId}`.toLowerCase().includes(query.toLowerCase()));
  return <><div className="tp-filterbar"><div className="tp-search inline"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by plate, make, model..." /></div><button className="tp-button primary" onClick={() => navigateTo('/transport/vehicles/create')}><Plus size={15} /> Register bus</button></div>
  <Panel title="Vehicle fleet" subtitle={`${records.length} vehicle(s) · click actions to manage status`}>
    <div className="tp-table-wrap"><table className="tp-table"><thead><tr><th>Vehicle ID</th><th>Plate</th><th>Make / Model</th><th>Type</th><th>Capacity</th><th>Status</th><th>Inspection</th><th>Actions</th></tr></thead>
    <tbody>{records.map((v) => <tr key={v.id}><td><strong>{v.vehicleId}</strong></td><td>{v.plate}</td><td>{v.make} {v.model}</td><td><span className="tp-soft-tag">{v.type}</span></td><td>{v.capacity} seats</td><td><span className={`tp-status ${v.status === 'Available' ? 'good' : v.status === 'Assigned' ? 'neutral' : v.status === 'Under maintenance' || v.status === 'Out of service' ? 'bad' : 'warning'}`}>{v.status}</span></td><td>{v.inspectionDue === 'Overdue' ? <span className="tp-status bad">Overdue</span> : v.inspectionDue}</td><td>{v.status === 'Available' && <button className="tp-link" onClick={() => transportDemo.setVehicleStatus(v.id, 'Under maintenance')}>Send to maintenance</button>}{v.status === 'Under maintenance' && <button className="tp-link" onClick={() => transportDemo.setVehicleStatus(v.id, 'Available')}>Mark available</button>}{v.status === 'Assigned' && <button className="tp-link" onClick={() => transportDemo.setVehicleStatus(v.id, 'Available')}>Unassign</button>}</td></tr>)}</tbody></table></div>
  </Panel></>;
}

function VehicleFormView() {
  const [plate, setPlate] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState<VehicleType>('Bus');
  const [capacity, setCapacity] = useState('30');
  const [year, setYear] = useState('2023');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!plate.trim() || !make.trim()) { setError('Plate and make are required.'); return; }
    const result = transportDemo.addVehicle(plate, make, model, type, parseInt(capacity, 10) || 30, parseInt(year, 10) || 2023);
    if (result.ok) { setSuccess(`Vehicle ${plate.trim().toUpperCase()} registered successfully.`); setError(''); setPlate(''); setMake(''); setModel(''); }
    else { setError(result.error ?? 'Registration failed.'); setSuccess(''); }
  };
  return <Panel title="Register vehicle" subtitle="Add a new bus, van or minibus to the fleet."><form className="tp-form" onSubmit={submit}>
    <label>Registration plate<input value={plate} onChange={(e) => setPlate(e.target.value)} placeholder="e.g. KDA 006F" /></label>
    <label>Make<input value={make} onChange={(e) => setMake(e.target.value)} placeholder="e.g. Toyota" /></label>
    <label>Model<input value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g. Coaster" /></label>
    <label>Vehicle type<select value={type} onChange={(e) => setType(e.target.value as VehicleType)}><option>Bus</option><option>Minibus</option><option>Van</option></select></label>
    <label>Seating capacity<input value={capacity} onChange={(e) => setCapacity(e.target.value)} type="number" min="1" /></label>
    <label>Model year<input value={year} onChange={(e) => setYear(e.target.value)} type="number" /></label>
    <button className="tp-button primary" type="submit"><Check size={15} /> Register vehicle</button>
    {error && <span className="tp-form-error">{error}</span>}
    {success && <span className="tp-form-message">{success}</span>}
  </form></Panel>;
}

function DriversView({ demo }: { demo: ReturnType<typeof useTransportDemo> }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [licenceClass, setLicenceClass] = useState('B3');
  const [licenceExpiry, setLicenceExpiry] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [assignDriverId, setAssignDriverId] = useState('');
  const [assignRouteId, setAssignRouteId] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) { setError('Driver name is required.'); return; }
    const result = transportDemo.addDriver(name, phone, licenceClass, licenceExpiry || '—');
    if (result.ok) { setSuccess(`Driver ${name.trim()} registered. Verification is pending.`); setError(''); setName(''); setPhone(''); setLicenceExpiry(''); }
    else { setError(result.error ?? 'Registration failed.'); setSuccess(''); }
  };
  const assign = () => {
    if (!assignDriverId || !assignRouteId) { setError('Select a driver and route.'); return; }
    const result = transportDemo.assignDriverRoute(assignDriverId, assignRouteId);
    if (result.ok) { setSuccess('Driver assigned to route.'); setError(''); setAssignDriverId(''); setAssignRouteId(''); }
    else { setError(result.error ?? 'Assignment failed.'); setSuccess(''); }
  };
  return <><Panel title="Register driver" subtitle="Link to existing staff or register a new driver record."><form className="tp-form" onSubmit={submit}>
    <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Driver name" /></label>
    <label>Phone number<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07xx xxx xxx" /></label>
    <label>Licence class<select value={licenceClass} onChange={(e) => setLicenceClass(e.target.value)}><option>B3</option><option>B2</option><option>PSV</option></select></label>
    <label>Licence expiry<input value={licenceExpiry} onChange={(e) => setLicenceExpiry(e.target.value)} placeholder="e.g. 10 Nov 2027" /></label>
    <button className="tp-button primary" type="submit"><Plus size={15} /> Register driver</button>
    {error && <span className="tp-form-error">{error}</span>}
    {success && <span className="tp-form-message">{success}</span>}
  </form></Panel>
  <Panel title="Assign driver to route" subtitle="Only active, verified drivers can be assigned."><div className="tp-form">
    <label>Driver<select value={assignDriverId} onChange={(e) => setAssignDriverId(e.target.value)}><option value="">Select driver...</option>{demo.drivers.filter((d) => d.status === 'Active' && d.verification === 'Verified' && !d.assignedRouteId).map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select></label>
    <label>Route<select value={assignRouteId} onChange={(e) => setAssignRouteId(e.target.value)}><option value="">Select route...</option>{demo.routes.filter((r) => r.status === 'Active' && !r.driverId).map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}</select></label>
    <button className="tp-button primary" type="button" onClick={assign} disabled={!assignDriverId || !assignRouteId}><Check size={15} /> Assign</button>
  </div></Panel>
  <Panel title="Driver directory" subtitle={`${demo.drivers.length} driver(s) registered`}>
    <div className="tp-table-wrap"><table className="tp-table"><thead><tr><th>Driver</th><th>Phone</th><th>Status</th><th>Licence</th><th>Verification</th><th>Assigned route</th><th>Actions</th></tr></thead>
    <tbody>{demo.drivers.map((d) => { const route = demo.routes.find((r) => r.id === d.assignedRouteId); return <tr key={d.id}><td><div className="tp-person"><div className="tp-table-avatar">{d.initials}</div><span><strong>{d.name}</strong><small>{d.id}</small></span></div></td><td>{d.phone}</td><td><span className={`tp-status ${d.status === 'Active' ? 'good' : d.status === 'On leave' ? 'warning' : 'bad'}`}>{d.status}</span></td><td>{d.licenceClass} · exp {d.licenceExpiry}</td><td><span className={`tp-status ${d.verification === 'Verified' ? 'good' : d.verification === 'Pending' ? 'warning' : 'bad'}`}>{d.verification}</span></td><td>{route?.name ?? '—'}</td><td>{d.verification === 'Pending' && <button className="tp-link" onClick={() => transportDemo.verifyDriver(d.id)}>Verify</button>}{d.status === 'Active' && <button className="tp-link" onClick={() => transportDemo.setDriverStatus(d.id, 'On leave')}>Set on leave</button>}{d.status === 'On leave' && <button className="tp-link" onClick={() => transportDemo.setDriverStatus(d.id, 'Active')}>Activate</button>}</td></tr>; })}</tbody></table></div>
  </Panel></>;
}

function RoutesView({ demo, navigateTo }: { demo: ReturnType<typeof useTransportDemo>; navigateTo: (p: string) => void }) {
  return <><div className="tp-filterbar"><div></div><button className="tp-button primary" onClick={() => navigateTo('/transport/routes/create')}><Plus size={15} /> Create route</button></div>
  <Panel title="Routes & stops" subtitle={`${demo.routes.length} route(s) · ${demo.routes.reduce((sum, r) => sum + r.stops.length, 0)} stops total`}>
    <div className="tp-record-list">{demo.routes.map((route) => { const vehicle = demo.vehicles.find((v) => v.id === route.vehicleId); const driver = demo.drivers.find((d) => d.id === route.driverId); const allocated = demo.allocations.filter((a) => a.routeId === route.id && a.status === 'Active').length; return <div key={route.id} style={{ border: '1px solid #e8edee', borderRadius: 9, marginBottom: 12, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #f0f2f3' }}><div><strong style={{ fontSize: 11, color: '#435660' }}>{route.name}</strong><div style={{ fontSize: 8, color: '#9ca8ad', marginTop: 4 }}>{route.reference} · {route.direction} · {route.operatingDays} · {allocated}/{route.capacity} allocated</div></div><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className={`tp-status ${route.status === 'Active' ? 'good' : 'neutral'}`}>{route.status}</span><button className="tp-button secondary" onClick={() => transportDemo.toggleRouteStatus(route.id)}>{route.status === 'Active' ? 'Deactivate' : 'Activate'}</button></div></div>
      <div style={{ padding: '10px 16px', fontSize: 8, color: '#829198', display: 'flex', gap: 16, flexWrap: 'wrap' }}><span>Vehicle: {vehicle ? `${vehicle.plate} (${vehicle.vehicleId})` : 'Not assigned'}</span><span>Driver: {driver?.name ?? 'Not assigned'}</span></div>
      <div className="tp-stop-list">{route.stops.map((stop) => <div className="tp-stop-item" key={stop.id}><div className="tp-stop-num">{stop.order}</div><div><strong>{stop.name}</strong><small>Pickup {stop.plannedPickup} · Drop-off {stop.plannedDropoff}</small></div><MapPin size={13} className="tp-muted" /></div>)}</div>
    </div>; })}</div>
  </Panel></>;
}

function RouteFormView({ demo, navigateTo }: { demo: ReturnType<typeof useTransportDemo>; navigateTo: (p: string) => void }) {
  const [name, setName] = useState('');
  const [reference, setReference] = useState('');
  const [direction, setDirection] = useState<TripDirection>('Morning pickup');
  const [capacity, setCapacity] = useState('30');
  const [stopName, setStopName] = useState('');
  const [stopPickup, setStopPickup] = useState('');
  const [stopDropoff, setStopDropoff] = useState('');
  const [createdRouteId, setCreatedRouteId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) { setError('Route name is required.'); return; }
    const result = transportDemo.addRoute(name, reference, direction, parseInt(capacity, 10) || 30);
    if (result.ok) { const newRoute = demo.routes.find((r) => r.name === name.trim()); setCreatedRouteId(newRoute?.id ?? null); setSuccess(`Route "${name.trim()}" created. Add stops below.`); setError(''); setName(''); setReference(''); }
    else { setError(result.error ?? 'Creation failed.'); setSuccess(''); }
  };
  const addStop = () => {
    if (!createdRouteId) { setError('Create the route first.'); return; }
    if (!stopName.trim()) { setError('Stop name is required.'); return; }
    const result = transportDemo.addStop(createdRouteId, stopName, stopPickup || '—', stopDropoff || '—');
    if (result.ok) { setStopName(''); setStopPickup(''); setStopDropoff(''); setError(''); }
    else { setError(result.error ?? 'Failed to add stop.'); }
  };
  const route = createdRouteId ? demo.routes.find((r) => r.id === createdRouteId) : null;
  return <><Panel title="Create route" subtitle="Create a new transport route with capacity and direction."><form className="tp-form" onSubmit={submit}>
    <label>Route name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Karen Route" /></label>
    <label>Route reference<input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="e.g. RT-KRN" /></label>
    <label>Direction<select value={direction} onChange={(e) => setDirection(e.target.value as TripDirection)}><option>Morning pickup</option><option>Afternoon drop-off</option><option>Evening drop-off</option><option>Event</option></select></label>
    <label>Capacity<input value={capacity} onChange={(e) => setCapacity(e.target.value)} type="number" min="1" /></label>
    <button className="tp-button primary" type="submit"><Check size={15} /> Create route</button>
    {error && <span className="tp-form-error">{error}</span>}
    {success && <span className="tp-form-message">{success}</span>}
  </form></Panel>
  {route && <Panel title={`Add stops to ${route.name}`} subtitle={`${route.stops.length} stop(s) added`}>
    <div className="tp-form"><label>Stop name<input value={stopName} onChange={(e) => setStopName(e.target.value)} placeholder="e.g. Karen Shopping Centre" /></label><label>Planned pickup time<input value={stopPickup} onChange={(e) => setStopPickup(e.target.value)} placeholder="e.g. 06:30" /></label><label>Planned drop-off time<input value={stopDropoff} onChange={(e) => setStopDropoff(e.target.value)} placeholder="e.g. 16:30" /></label><button className="tp-button primary" type="button" onClick={addStop} disabled={!stopName.trim()}><Plus size={15} /> Add stop</button></div>
    <div className="tp-stop-list">{route.stops.map((stop) => <div className="tp-stop-item" key={stop.id}><div className="tp-stop-num">{stop.order}</div><div><strong>{stop.name}</strong><small>Pickup {stop.plannedPickup} · Drop-off {stop.plannedDropoff}</small></div></div>)}</div>
    <div style={{ padding: '0 20px 16px' }}><button className="tp-button secondary" onClick={() => navigateTo('/transport/routes')}>Done — view all routes <ArrowUpRight size={14} /></button></div>
  </Panel>}</>;
}

function AllocationsView({ demo }: { demo: ReturnType<typeof useTransportDemo> }) {
  const [studentId, setStudentId] = useState('');
  const [routeId, setRouteId] = useState('');
  const [stopId, setStopId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const pendingStudents = demo.allocations.filter((a) => a.status === 'Pending');
  const activeRoutes = demo.routes.filter((r) => r.status === 'Active');
  const selectedRoute = demo.routes.find((r) => r.id === routeId);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentId || !routeId || !stopId) { setError('Select a student, route and stop.'); return; }
    const result = transportDemo.allocateStudent(studentId, routeId, stopId);
    if (result.ok) { const student = demo.allocations.find((a) => a.studentId === studentId); setSuccess(`${student?.studentName ?? 'Student'} allocated to ${selectedRoute?.name}.`); setError(''); setStudentId(''); setRouteId(''); setStopId(''); }
    else { setError(result.error ?? 'Allocation failed.'); setSuccess(''); }
  };
  return <><Panel title="Allocate student to route" subtitle="Assign a student to an active route and stop. Capacity is enforced."><form className="tp-form" onSubmit={submit}>
    <label>Student (pending allocation)<select value={studentId} onChange={(e) => setStudentId(e.target.value)}><option value="">Select student...</option>{pendingStudents.map((a) => <option key={a.id} value={a.studentId}>{a.studentName} · {a.className}</option>)}</select></label>
    <label>Route<select value={routeId} onChange={(e) => { setRouteId(e.target.value); setStopId(''); }}><option value="">Select route...</option>{activeRoutes.map((r) => { const allocated = demo.allocations.filter((a) => a.routeId === r.id && a.status === 'Active').length; return <option key={r.id} value={r.id}>{r.name} · {allocated}/{r.capacity} allocated</option>; })}</select></label>
    <label>Stop<select value={stopId} onChange={(e) => setStopId(e.target.value)} disabled={!selectedRoute}><option value="">Select stop...</option>{selectedRoute?.stops.map((s) => <option key={s.id} value={s.id}>{s.name} · pickup {s.plannedPickup}</option>)}</select></label>
    <button className="tp-button primary" type="submit" disabled={!studentId || !routeId || !stopId}><Check size={15} /> Allocate student</button>
    {error && <span className="tp-form-error">{error}</span>}
    {success && <span className="tp-form-message">{success}</span>}
  </form></Panel>
  <Panel title="Student allocations" subtitle={`${demo.allocations.length} record(s) · active, suspended, withdrawn and pending`}>
    <div className="tp-table-wrap"><table className="tp-table"><thead><tr><th>Student</th><th>Class</th><th>Route</th><th>Stop</th><th>Status</th><th>Since</th><th>Actions</th></tr></thead>
    <tbody>{demo.allocations.map((a) => <tr key={a.id}><td><strong>{a.studentName}</strong></td><td>{a.className}</td><td>{a.routeName}</td><td>{a.stopName}</td><td><span className={`tp-status ${a.status === 'Active' ? 'good' : a.status === 'Pending' ? 'warning' : a.status === 'Suspended' ? 'bad' : 'neutral'}`}>{a.status}</span></td><td>{a.startDate}</td><td>{a.status === 'Active' && <><button className="tp-link" onClick={() => transportDemo.suspendAllocation(a.id)}>Suspend</button><button className="tp-link" onClick={() => transportDemo.withdrawAllocation(a.id)}>Withdraw</button></>}{a.status === 'Suspended' && <button className="tp-link" onClick={() => transportDemo.reactivateAllocation(a.id)}>Reactivate</button>}{a.status === 'Withdrawn' && <button className="tp-link" onClick={() => transportDemo.reactivateAllocation(a.id)}>Reactivate</button>}</td></tr>)}</tbody></table></div>
  </Panel></>;
}

function TripsView({ demo }: { demo: ReturnType<typeof useTransportDemo> }) {
  return <><div className="tp-three-grid"><TpMetric icon={Bus} label="Total trips" value={String(demo.trips.length)} detail="All records" /><TpMetric icon={Clock3} label="In progress" value={String(demo.trips.filter((t) => t.status === 'In progress').length)} detail="Currently active" /><TpMetric icon={CheckCircle2} label="Completed" value={String(demo.trips.filter((t) => t.status === 'Completed').length)} detail="Finished today and prior" /></div>
  <Panel title="Trip register" subtitle="Daily trips with lifecycle status: Scheduled, Ready, In progress, Completed">
    <div className="tp-record-list">{demo.trips.map((trip) => <div className="tp-record-row" key={trip.id}><div><strong>{trip.routeName}</strong><span>{trip.date} · {trip.direction} · {trip.vehiclePlate} · {trip.driverName} · departure {trip.plannedDeparture} → arrival {trip.plannedArrival}</span></div><span className={`tp-status ${trip.status === 'Completed' ? 'good' : trip.status === 'In progress' ? 'warning' : trip.status === 'Cancelled' || trip.status === 'Breakdown' ? 'bad' : 'neutral'}`}>{trip.status}</span><div className="tp-row-actions">{trip.status === 'Scheduled' && <button className="tp-button secondary" onClick={() => transportDemo.readyTrip(trip.id)}>Mark ready</button>}{trip.status === 'Ready' && <button className="tp-button primary" onClick={() => transportDemo.startTrip(trip.id)}>Start trip</button>}{trip.status === 'In progress' && <button className="tp-button primary" onClick={() => transportDemo.completeTrip(trip.id)}>Complete</button>}{(trip.status === 'Scheduled' || trip.status === 'Ready') && <button className="tp-button secondary" onClick={() => transportDemo.cancelTrip(trip.id)}>Cancel</button>}</div></div>)}</div>
  </Panel></>;
}

function AttendanceView({ demo }: { demo: ReturnType<typeof useTransportDemo> }) {
  const activeTrip = demo.trips.find((t) => t.status === 'In progress');
  const statuses: AttendanceStatus[] = ['Picked up', 'Absent at stop', 'Boarded', 'Dropped off', 'Not transported'];
  if (!activeTrip) return <Panel title="Trip attendance" subtitle="No trip is currently in progress. Start a trip from the Trips page to record attendance."><div className="tp-calendar-note"><CheckCircle2 size={18} /><span><strong>No active trip</strong><small>Attendance can only be recorded while a trip is in progress.</small></span></div></Panel>;
  return <><div className="tp-three-grid"><TpMetric icon={Bus} label="Active trip" value={activeTrip.routeName} detail={activeTrip.vehiclePlate} /><TpMetric icon={Users} label="Students on manifest" value={String(activeTrip.attendance.length)} detail={`${activeTrip.attendance.filter((a) => a.status !== 'Expected').length} marked`} /><TpMetric icon={CheckCircle2} label="Picked up" value={String(activeTrip.attendance.filter((a) => a.status === 'Picked up' || a.status === 'Boarded').length)} detail="Confirmed boardings" /></div>
  <Panel title={`Attendance · ${activeTrip.routeName}`} subtitle={`Trip ${activeTrip.id} · ${activeTrip.date} · ${activeTrip.direction} · Driver: ${activeTrip.driverName}`}>
    <div className="tp-record-list">{activeTrip.attendance.map((att) => <div className="tp-attendance-item" key={att.studentId}><div><strong>{att.studentName}</strong><small>Stop: {att.stopName} · {att.status}{att.timestamp ? ` at ${att.timestamp}` : ''}</small></div><div className="tp-attendance-actions">{statuses.map((s) => <button key={s} className={`tp-attendance-btn ${att.status === s ? 'active' : ''}`} onClick={() => transportDemo.markAttendance(activeTrip.id, att.studentId, s)}>{s}</button>)}</div></div>)}</div>
  </Panel>
  <Panel title="Completed trip attendance" subtitle="Historical pickup and drop-off records">
    <div className="tp-record-list">{demo.trips.filter((t) => t.status === 'Completed').flatMap((trip) => trip.attendance.map((att) => <div className="tp-record-row" key={`${trip.id}-${att.studentId}`}><div><strong>{att.studentName}</strong><span>{trip.routeName} · {trip.date} · {att.stopName} · {att.status}{att.timestamp ? ` at ${att.timestamp}` : ''}</span></div><span className="tp-status good">{att.status}</span></div>))}
    {demo.trips.filter((t) => t.status === 'Completed').length === 0 && <div style={{ padding: '12px 0', color: '#9ca8ad', fontSize: 10 }}>No completed trips with attendance records.</div>}
    </div>
  </Panel></>;
}

function MaintenanceView({ demo }: { demo: ReturnType<typeof useTransportDemo> }) {
  const [vehicleId, setVehicleId] = useState('');
  const [type, setType] = useState<MaintenanceType>('Scheduled service');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!vehicleId || !description.trim()) { setError('Select a vehicle and enter a description.'); return; }
    transportDemo.addMaintenance(vehicleId, type, description, parseInt(cost, 10) || 0);
    setSuccess('Maintenance record created.'); setError(''); setDescription(''); setCost('');
  };
  return <><Panel title="Record maintenance" subtitle="Log a service, inspection, repair or defect report."><form className="tp-form" onSubmit={submit}>
    <label>Vehicle<select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}><option value="">Select vehicle...</option>{demo.vehicles.map((v) => <option key={v.id} value={v.id}>{v.plate} · {v.vehicleId}</option>)}</select></label>
    <label>Maintenance type<select value={type} onChange={(e) => setType(e.target.value as MaintenanceType)}><option>Scheduled service</option><option>Inspection</option><option>Repair</option><option>Defect report</option></select></label>
    <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the work needed" /></label>
    <label>Cost (KES)<input value={cost} onChange={(e) => setCost(e.target.value)} type="number" placeholder="0" /></label>
    <button className="tp-button primary" type="submit" disabled={!vehicleId || !description.trim()}><Plus size={15} /> Record maintenance</button>
    {error && <span className="tp-form-error">{error}</span>}
    {success && <span className="tp-form-message">{success}</span>}
  </form></Panel>
  <Panel title="Maintenance history" subtitle={`${demo.maintenance.length} record(s)`}>
    <div className="tp-record-list">{demo.maintenance.map((m) => <div className="tp-record-row" key={m.id}><div><strong>{m.vehiclePlate} · {m.type}</strong><span>{m.description} · {m.date} · KES {m.cost.toLocaleString()} · by {m.recordedBy}</span></div><span className={`tp-status ${m.status === 'Completed' ? 'good' : m.status === 'In progress' ? 'warning' : 'neutral'}`}>{m.status}</span>{m.status === 'In progress' && <div className="tp-row-actions"><button className="tp-button secondary" onClick={() => transportDemo.resolveMaintenance(m.id)}>Mark completed</button></div>}</div>)}</div>
  </Panel></>;
}

function IncidentsView({ demo }: { demo: ReturnType<typeof useTransportDemo> }) {
  const [type, setType] = useState<IncidentType>('Delay');
  const [severity, setSeverity] = useState<IncidentSeverity>('Low');
  const [vehicleId, setVehicleId] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!vehicleId || !description.trim()) { setError('Select a vehicle and describe the incident.'); return; }
    transportDemo.addIncident(type, severity, vehicleId, description);
    setSuccess('Incident reported successfully.'); setError(''); setDescription(''); setVehicleId('');
  };
  return <><div className="tp-three-grid"><TpMetric icon={AlertTriangle} label="Open incidents" value={String(demo.incidents.filter((i) => i.status === 'Open').length)} detail="Requires follow-up" /><TpMetric icon={CheckCircle2} label="Resolved" value={String(demo.incidents.filter((i) => i.status === 'Resolved').length)} detail="Closed with audit" /><TpMetric icon={ShieldCheck} label="Under review" value={String(demo.incidents.filter((i) => i.status === 'Under review').length)} detail="Being investigated" /></div>
  <Panel title="Report incident" subtitle="Capture breakdowns, delays, accidents and safety concerns with severity."><form className="tp-form" onSubmit={submit}>
    <label>Incident type<select value={type} onChange={(e) => setType(e.target.value as IncidentType)}><option>Delay</option><option>Breakdown</option><option>Accident</option><option>Student safety concern</option><option>Missed pickup</option><option>Missed drop-off</option><option>Vehicle defect</option><option>Lost property</option></select></label>
    <label>Severity<select value={severity} onChange={(e) => setSeverity(e.target.value as IncidentSeverity)}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></label>
    <label>Vehicle<select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}><option value="">Select vehicle...</option>{demo.vehicles.map((v) => <option key={v.id} value={v.id}>{v.plate} · {v.vehicleId}</option>)}</select></label>
    <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what happened" /></label>
    <button className="tp-button primary" type="submit" disabled={!vehicleId || !description.trim()}><AlertTriangle size={15} /> Report incident</button>
    {error && <span className="tp-form-error">{error}</span>}
    {success && <span className="tp-form-message">{success}</span>}
  </form></Panel>
  <Panel title="Incident register" subtitle={`${demo.incidents.length} incident(s) recorded`}>
    <div className="tp-record-list">{demo.incidents.map((inc) => <div className="tp-record-row" key={inc.id}><div><strong>{inc.type} · {inc.vehiclePlate}</strong><span>{inc.description} · {inc.date} · reported by {inc.reportedBy} · {inc.actionTaken}</span></div><span className={`tp-status ${inc.status === 'Resolved' ? 'good' : inc.status === 'Under review' ? 'warning' : 'bad'}`}>{inc.status}</span><div className="tp-row-actions"><span className={`tp-status ${inc.severity === 'Critical' || inc.severity === 'High' ? 'bad' : inc.severity === 'Medium' ? 'warning' : 'neutral'}`}>{inc.severity}</span>{inc.status === 'Open' && <button className="tp-button secondary" onClick={() => transportDemo.resolveIncident(inc.id)}>Resolve</button>}</div></div>)}</div>
  </Panel></>;
}

function FuelView({ demo }: { demo: ReturnType<typeof useTransportDemo> }) {
  const [vehicleId, setVehicleId] = useState('');
  const [litres, setLitres] = useState('');
  const [amount, setAmount] = useState('');
  const [odometer, setOdometer] = useState('');
  const [supplier, setSupplier] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!vehicleId || !litres || !amount) { setError('Vehicle, litres and amount are required.'); return; }
    transportDemo.addFuel(vehicleId, parseInt(litres, 10), parseInt(amount, 10), parseInt(odometer, 10) || 0, supplier || '—');
    setSuccess('Fuel record saved.'); setError(''); setVehicleId(''); setLitres(''); setAmount(''); setOdometer(''); setSupplier('');
  };
  const totalSpent = demo.fuelRecords.reduce((sum, f) => sum + f.amount, 0);
  return <><div className="tp-three-grid"><TpMetric icon={Fuel} label="Total records" value={String(demo.fuelRecords.length)} detail="All fuel purchases" /><TpMetric icon={BusFront} label="Total spent" value={`KES ${totalSpent.toLocaleString()}`} detail="Across all vehicles" /><TpMetric icon={CalendarClock} label="This month" value={String(demo.fuelRecords.filter((f) => f.date.includes('Oct')).length)} detail="October 2026" /></div>
  <Panel title="Record fuel purchase" subtitle="Log fuel with litres, amount, odometer and supplier."><form className="tp-form" onSubmit={submit}>
    <label>Vehicle<select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}><option value="">Select vehicle...</option>{demo.vehicles.map((v) => <option key={v.id} value={v.id}>{v.plate} · {v.vehicleId}</option>)}</select></label>
    <label>Litres<input value={litres} onChange={(e) => setLitres(e.target.value)} type="number" placeholder="e.g. 60" /></label>
    <label>Amount (KES)<input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="e.g. 9600" /></label>
    <label>Odometer (km)<input value={odometer} onChange={(e) => setOdometer(e.target.value)} type="number" placeholder="e.g. 84200" /></label>
    <label>Supplier<input value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="e.g. Total Kenya" /></label>
    <button className="tp-button primary" type="submit" disabled={!vehicleId || !litres || !amount}><Fuel size={15} /> Save fuel record</button>
    {error && <span className="tp-form-error">{error}</span>}
    {success && <span className="tp-form-message">{success}</span>}
  </form></Panel>
  <Panel title="Fuel history" subtitle={`${demo.fuelRecords.length} record(s)`}>
    <div className="tp-table-wrap"><table className="tp-table"><thead><tr><th>Date</th><th>Vehicle</th><th>Litres</th><th>Amount</th><th>Odometer</th><th>Supplier</th><th>By</th></tr></thead><tbody>{demo.fuelRecords.map((f) => <tr key={f.id}><td>{f.date}</td><td><strong>{f.vehiclePlate}</strong></td><td>{f.litres}L</td><td>KES {f.amount.toLocaleString()}</td><td>{f.odometer.toLocaleString()} km</td><td>{f.supplier}</td><td>{f.recordedBy}</td></tr>)}</tbody></table></div>
  </Panel></>;
}

function NotificationsView({ demo }: { demo: ReturnType<typeof useTransportDemo> }) {
  return <Panel title="Transport notifications" subtitle="Notices sent to parents, drivers and administrators."><div className="tp-record-list">{demo.notifications.map((n) => <div className="tp-record-row" key={n.id}><div><strong>{n.title}</strong><span>To: {n.recipient} · {n.detail} · {n.createdDate}</span></div>{n.unread ? <button className="tp-button secondary" onClick={() => transportDemo.markNotificationRead(n.id)}>Mark read</button> : <span className="tp-status good">Read</span>}</div>)}
  {demo.notifications.length === 0 && <div style={{ padding: '12px 0', color: '#9ca8ad', fontSize: 10 }}>No notifications.</div>}
  </div></Panel>;
}

function ReportsView({ demo }: { demo: ReturnType<typeof useTransportDemo> }) {
  return <><div className="tp-report-grid">{['Student allocation register', 'Route manifests', 'Vehicle utilization', 'Driver trip history', 'Daily pickup/drop-off attendance', 'Missed pickup exceptions', 'Trip delays and cancellations', 'Vehicle maintenance and expiry', 'Incident history'].map((title) => <button className="tp-report-card" key={title} disabled title="Report generation requires the Laravel report service"><BarChart3 size={18} /><strong>{title}</strong><span>Filtered synthetic records with defined source and period.</span><ArrowUpRight size={14} /></button>)}</div>
  <Panel title="Report activity" subtitle="Recent report-related audit entries"><div className="tp-record-list">{demo.audit.slice(0, 4).map((entry) => <div className="tp-record-row" key={entry.id}><div><strong>{entry.action}</strong><span>{entry.target} · {entry.timestamp}</span></div><span className="tp-status neutral">Logged</span></div>)}</div></Panel></>;
}

function AuditView({ demo }: { demo: ReturnType<typeof useTransportDemo> }) {
  return <Panel title="Audit history" subtitle="Every transport operation is recorded with actor, action, target and timestamp."><div className="tp-record-list">{demo.audit.map((entry) => <div className="tp-audit-row" key={entry.id}><span>{entry.timestamp}</span><i /><strong>{entry.actor}: {entry.action}</strong></div>)}</div></Panel>;
}

function SettingsView({ demo }: { demo: ReturnType<typeof useTransportDemo> }) {
  return <><Panel title="Transport settings" subtitle="Configuration changes require the authenticated backend service."><div className="tp-calendar-note"><ShieldCheck size={18} /><span><strong>Restricted transport workspace</strong><small>Current demo access is visual only and does not grant production transport authority.</small></span></div></Panel>
  <Panel title="Transport policies" subtitle="Configured rules for fleet and operations"><div className="tp-record-list">
    <div className="tp-stat-row"><span>Default vehicle capacity</span><strong>30 seats</strong></div>
    <div className="tp-stat-row"><span>Driver must be verified</span><strong>Yes</strong></div>
    <div className="tp-stat-row"><span>Vehicle must be available for assignment</span><strong>Yes</strong></div>
    <div className="tp-stat-row"><span>Prevent overlapping vehicle/driver assignments</span><strong>Yes</strong></div>
    <div className="tp-stat-row"><span>Route capacity enforcement</span><strong>Strict — no over-allocation</strong></div>
    <div className="tp-stat-row"><span>Attendance recording</span><strong>Only during in-progress trips</strong></div>
  </div></Panel>
  <Panel title="Fleet summary" subtitle="Current vehicle and driver counts"><div className="tp-record-list">
    <div className="tp-stat-row"><span>Total vehicles</span><strong>{demo.vehicles.length}</strong></div>
    <div className="tp-stat-row"><span>Available vehicles</span><strong>{demo.vehicles.filter((v) => v.status === 'Available').length}</strong></div>
    <div className="tp-stat-row"><span>Total drivers</span><strong>{demo.drivers.length}</strong></div>
    <div className="tp-stat-row"><span>Verified drivers</span><strong>{demo.drivers.filter((d) => d.verification === 'Verified').length}</strong></div>
    <div className="tp-stat-row"><span>Active routes</span><strong>{demo.routes.filter((r) => r.status === 'Active').length}</strong></div>
  </div></Panel></>;
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) { return <section className="tp-panel"><div className="tp-panel-head"><div><h2>{title}</h2><p>{subtitle}</p></div><MoreHorizontal size={17} className="tp-muted" /></div>{children}</section>; }
function TpMetric({ icon: Icon, label, value, detail, onClick }: { icon: LucideIcon; label: string; value: string; detail: string; onClick?: () => void }) { const Tag = onClick ? 'button' : 'div'; return <Tag className="tp-metric" onClick={onClick}><div className="tp-metric-icon"><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></Tag>; }
function MiniStat({ label, value }: { label: string; value: string }) { return <div className="tp-mini-stat"><span>{label}</span><strong>{value}</strong></div>; }
function Task({ title, detail, action, onClick }: { title: string; detail: string; action: string; onClick: () => void }) { return <button className="tp-task" onClick={onClick}><div className="tp-task-icon"><CheckCircle2 size={16} /></div><span><strong>{title}</strong><small>{detail}</small></span><b>{action} <ArrowUpRight size={13} /></b></button>; }
function QuickAction({ label, icon: Icon, onClick }: { label: string; icon: LucideIcon; onClick: () => void }) { return <button className="tp-quick" onClick={onClick}><Icon size={18} /><span>{label}</span><ArrowUpRight size={13} /></button>; }
function AlertCard({ title, detail, tone, onClick }: { title: string; detail: string; tone: string; onClick: () => void }) { return <button className={`tp-alert ${tone}`} onClick={onClick}><span /><div><strong>{title}</strong><small>{detail}</small></div><ArrowUpRight size={14} /></button>; }
