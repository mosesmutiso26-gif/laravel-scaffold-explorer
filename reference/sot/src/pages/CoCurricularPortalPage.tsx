import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Award, Bell, BookOpen, Calendar, ChevronDown, ClipboardList, FileText, LayoutDashboard, MapPin, Menu, MoreHorizontal, Music, Plus, Search, Settings, ShieldCheck, Trophy, Users, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/cocurricular.css';
import { useCoCurricularDemo, type Membership } from '@/data/coCurricularDemo';

type Nav = { label: string; path: string; icon: LucideIcon; group: string };
const nav: Nav[] = [
  { label: 'Dashboard', path: '/cocurricular/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Clubs & societies', path: '/cocurricular/clubs', icon: Users, group: 'Configuration' },
  { label: 'Memberships', path: '/cocurricular/memberships', icon: ClipboardList, group: 'Configuration' },
  { label: 'Activity events', path: '/cocurricular/events', icon: Calendar, group: 'Operations' },
  { label: 'Competitions', path: '/cocurricular/competitions', icon: Trophy, group: 'Operations' },
  { label: 'Achievements', path: '/cocurricular/achievements', icon: Award, group: 'Operations' },
  { label: 'Educational trips', path: '/cocurricular/trips', icon: MapPin, group: 'Operations' },
  { label: 'Notifications', path: '/cocurricular/notifications', icon: Bell, group: 'Communication' },
  { label: 'Reports', path: '/cocurricular/reports', icon: FileText, group: 'Controls' },
  { label: 'Settings', path: '/cocurricular/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Configuration', 'Operations', 'Communication', 'Controls', 'Account'];

export function CoCurricularPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useCoCurricularDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const current = nav.find((item) => location.pathname.startsWith(item.path)) ?? nav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const pendingApps = demo.memberships.filter((m) => m.status === 'Applied' || m.status === 'Under Review');
  const pendingEvents = demo.events.filter((e) => e.status === 'Pending Approval');
  const unreadCount = demo.notifications.filter((n) => n.unread).length;

  return <div className="cc-app">
    <aside className={`cc-sidebar ${mobile ? 'open' : ''}`}>
      <div className="cc-brand"><div className="cc-brand-mark"><Music size={21} /></div><div><strong>Riverside</strong><span>Co-Curricular</span></div><button className="cc-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div>
      <div className="cc-demo-pill"><span className="cc-demo-dot" /> DEMO MODE <span>·</span> October 2026</div>
      <div className="cc-school"><div>RA</div><span><strong>Riverside Academy</strong><small>Co-Curricular Dept</small></span><ChevronDown size={15} /></div>
      <nav className="cc-nav">{groups.map((group) => <div className="cc-nav-group" key={group}><p>{group}</p>{nav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={`cc-nav-item${current.path === path || (path !== '/cocurricular/dashboard' && location.pathname.startsWith(path)) ? ' active' : ''}`} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Memberships' && pendingApps.length > 0 && <em>{pendingApps.length}</em>}{label === 'Activity events' && pendingEvents.length > 0 && <em>{pendingEvents.length}</em>}{label === 'Notifications' && unreadCount > 0 && <em>{unreadCount}</em>}</button>)}</div>)}</nav>
      <div className="cc-sidebar-footer"><div className="cc-user"><div className="cc-avatar">FA</div><span><strong>Faith Achieng</strong><small>Co-Curricular Coordinator</small></span><MoreHorizontal size={16} /></div></div>
    </aside>
    {mobile && <button className="cc-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="cc-main"><header className="cc-topbar"><button className="cc-menu-button" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="cc-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="cc-top-actions"><div className="cc-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clubs, members..." /></div><button className="cc-icon-button" onClick={() => navigateTo('/cocurricular/notifications')} aria-label="Open notifications"><Bell size={18} />{unreadCount > 0 && <i />}</button><button className="cc-profile" onClick={() => navigateTo('/cocurricular/settings')}><div className="cc-avatar">FA</div><span>Faith</span><ChevronDown size={15} /></button></div></header>
      <div className="cc-content"><div className="cc-context"><div><span className="cc-kicker"><ShieldCheck size={14} /> Co-Curricular <b>•</b> 2026 · Term 3</span><h1>{current.label}</h1><p>{desc(location.pathname)}</p></div></div><RouteView path={location.pathname} demo={demo} navigateTo={navigateTo} /></div></main>
  </div>;
}

function desc(path: string): string {
  if (path.includes('dashboard')) return 'Clubs, memberships, events, competitions, achievements and trips at a glance.';
  if (path.includes('clubs')) return 'Create and manage clubs, societies and activity categories.';
  if (path.includes('membership')) return 'Review and approve student membership applications.';
  if (path.includes('events')) return 'Schedule and track activity events with attendance.';
  if (path.includes('competition')) return 'Manage competition registrations and results.';
  if (path.includes('achievement')) return 'Record and verify student achievements.';
  if (path.includes('trip')) return 'Plan and approve educational trips with guardian consent tracking.';
  if (path.includes('notification')) return 'Activity notifications and announcements.';
  if (path.includes('report')) return 'Participation, attendance and achievement reports.';
  return 'Co-curricular activities management.';
}

function RouteView({ path, demo, navigateTo }: { path: string; demo: ReturnType<typeof useCoCurricularDemo>; navigateTo: (p: string) => void }) {
  if (path === '/cocurricular/dashboard' || path === '/cocurricular') return <Dashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/cocurricular/clubs')) return <ClubsView demo={demo} />;
  if (path.startsWith('/cocurricular/memberships')) return <MembershipsView demo={demo} />;
  if (path.startsWith('/cocurricular/events')) return <EventsView demo={demo} />;
  if (path.startsWith('/cocurricular/competitions')) return <CompetitionsView demo={demo} />;
  if (path.startsWith('/cocurricular/achievements')) return <AchievementsView demo={demo} />;
  if (path.startsWith('/cocurricular/trips')) return <TripsView demo={demo} />;
  if (path.startsWith('/cocurricular/notifications')) return <NotificationsView demo={demo} />;
  if (path.startsWith('/cocurricular/reports')) return <ReportsView demo={demo} />;
  return <div className="cc-empty">Settings page — configuration options for activity categories, capacity rules and consent policies.</div>;
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return <div className="cc-panel"><div className="cc-panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>{children}</div>;
}
function Metric({ icon: Icon, label, value, detail, tone, onClick }: { icon: LucideIcon; label: string; value: string; detail: string; tone?: string; onClick: () => void }) {
  return <button className="cc-metric" onClick={onClick}><div className={`cc-metric-icon ${tone ?? ''}`}><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></button>;
}

function Dashboard({ demo, navigateTo }: { demo: ReturnType<typeof useCoCurricularDemo>; navigateTo: (p: string) => void }) {
  const activeClubs = demo.clubs.filter((c) => c.status === 'Active');
  const pendingApps = demo.memberships.filter((m) => m.status === 'Applied' || m.status === 'Under Review');
  const upcomingEvents = demo.events.filter((e) => e.status === 'Scheduled' || e.status === 'Approved');
  const pendingConsent = demo.trips.filter((t) => t.status === 'Consent Collection');
  return <><div className="cc-kpi-grid">
    <Metric icon={Users} label="Active clubs" value={String(activeClubs.length)} detail={`${demo.clubs.length} total configured`} onClick={() => navigateTo('/cocurricular/clubs')} />
    <Metric icon={ClipboardList} label="Pending applications" value={String(pendingApps.length)} detail="Awaiting review" tone="gold" onClick={() => navigateTo('/cocurricular/memberships')} />
    <Metric icon={Calendar} label="Upcoming events" value={String(upcomingEvents.length)} detail="Next 2 weeks" tone="teal" onClick={() => navigateTo('/cocurricular/events')} />
    <Metric icon={MapPin} label="Pending consent" value={String(pendingConsent.reduce((s, t) => s + (t.participants - t.consentReceived), 0))} detail="Guardian consent forms" tone="red" onClick={() => navigateTo('/cocurricular/trips')} />
  </div>
  <div className="cc-main-grid">
    <Panel title="Pending membership applications" subtitle={`${pendingApps.length} application(s) awaiting review`}>
      <div className="cc-record-list">{pendingApps.map((m) => <div className="cc-record-row" key={m.id}><div><strong>{m.studentName}</strong><span>{m.clubName} · {m.className} · Applied {m.appliedDate}</span></div><span className={`cc-status ${m.status === 'Applied' ? 'info' : 'warning'}`}>{m.status}</span></div>)}</div>
    </Panel>
    <Panel title="Upcoming events" subtitle={`${upcomingEvents.length} scheduled/approved event(s)`}>
      <div className="cc-record-list">{upcomingEvents.map((e) => <div className="cc-record-row" key={e.id}><div><strong>{e.title}</strong><span>{e.club} · {e.date} {e.time} · {e.venue}</span></div><span className={`cc-status ${e.status === 'Scheduled' ? 'good' : 'info'}`}>{e.status}</span></div>)}</div>
    </Panel>
  </div>
  <div className="cc-main-grid">
    <Panel title="Recent achievements" subtitle="Verified student accomplishments">
      <div className="cc-record-list">{demo.achievements.filter((a) => a.verified).slice(0, 4).map((a) => <div className="cc-record-row" key={a.id}><div><strong>{a.studentName}</strong><span>{a.title} · {a.level} · {a.date}</span></div><span className="cc-status good">Verified</span></div>)}</div>
    </Panel>
    <Panel title="Educational trips" subtitle="Current trip status and consent progress">
      <div className="cc-record-list">{demo.trips.map((t) => <div className="cc-record-row" key={t.id}><div><strong>{t.title}</strong><span>{t.destination} · {t.departureDate} · Consent: {t.consentReceived}/{t.participants}</span></div><span className={`cc-status ${t.status === 'Closed' ? 'good' : t.status === 'Draft' ? 'neutral' : 'info'}`}>{t.status}</span></div>)}</div>
    </Panel>
  </div></>;
}

function ClubsView({ demo }: { demo: ReturnType<typeof useCoCurricularDemo> }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('');
  const [patron, setPatron] = useState('');
  const [capacity, setCapacity] = useState('40');
  const [meetingDay, setMeetingDay] = useState('Wednesday');
  const [venue, setVenue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !code.trim() || !patron.trim()) { setError('Name, code and patron are required.'); return; }
    const r = demo.createClub(name, code, category || 'General', patron, parseInt(capacity) || 40, meetingDay, venue);
    if (r.ok) { setSuccess('Club created.'); setError(''); setName(''); setCode(''); setPatron(''); setVenue(''); }
    else { setError('Failed.'); setSuccess(''); }
  };
  return <><Panel title="Create club" subtitle="Register a new club or society">
    <form className="cc-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Club name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Chess Club" /></label>
        <label>Code<input value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. CHS-007" /></label>
        <label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}><option value="">Select...</option><option>STEM</option><option>Humanities</option><option>Creative Arts</option><option>Service</option><option>Sports</option></select></label>
        <label>Teacher patron<input value={patron} onChange={(e) => setPatron(e.target.value)} placeholder="e.g. Mr. James Miriti" /></label>
        <label>Capacity<input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} /></label>
        <label>Meeting day<select value={meetingDay} onChange={(e) => setMeetingDay(e.target.value)}><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option></select></label>
        <label>Venue<input value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="e.g. Room 12" /></label>
      </div>
      <button className="cc-button primary" type="submit" disabled={!name.trim() || !code.trim()}><Plus size={15} /> Create club</button>
      {error && <span className="cc-form-error">{error}</span>}
      {success && <span className="cc-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Clubs & societies" subtitle={`${demo.clubs.length} club(s) registered`}>
    <div className="cc-table-wrap"><table className="cc-table"><thead><tr><th>Club</th><th>Code</th><th>Category</th><th>Patron</th><th>Members</th><th>Meets</th><th>Status</th></tr></thead>
    <tbody>{demo.clubs.map((c) => <tr key={c.id}><td><strong>{c.name}</strong></td><td>{c.code}</td><td>{c.category}</td><td>{c.patron}</td><td>{c.members}/{c.capacity}</td><td>{c.meetingDay}</td><td><span className={`cc-status ${c.status === 'Active' ? 'good' : c.status === 'Draft' ? 'warning' : 'neutral'}`}>{c.status}</span></td></tr>)}</tbody></table></div>
  </Panel></>;
}

function MembershipsView({ demo }: { demo: ReturnType<typeof useCoCurricularDemo> }) {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? demo.memberships : demo.memberships.filter((m) => m.status === filter);
  const statusColor = (s: Membership['status']) => s === 'Active' ? 'good' : s === 'Applied' ? 'info' : s === 'Under Review' || s === 'Waitlisted' ? 'warning' : s === 'Rejected' || s === 'Withdrawn' ? 'bad' : 'neutral';
  return <><Panel title="Membership applications" subtitle={`${demo.memberships.length} membership record(s)`}>
    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
      {['All', 'Applied', 'Under Review', 'Active', 'Waitlisted'].map((f) => <button key={f} className={`cc-button ${filter === f ? 'primary' : ''}`} onClick={() => setFilter(f)} style={{ padding: '4px 12px', fontSize: 11 }}>{f}</button>)}
    </div>
    <div className="cc-record-list">{filtered.map((m) => <div className="cc-record-row" key={m.id}>
      <div><strong>{m.studentName}</strong><span>{m.clubName} · {m.className} · Applied {m.appliedDate}</span></div>
      <span className={`cc-status ${statusColor(m.status)}`}>{m.status}</span>
      <div className="cc-row-actions">{(m.status === 'Applied' || m.status === 'Under Review') && <><button className="cc-link" onClick={() => demo.approveMembership(m.id)}>Approve</button><button className="cc-link" onClick={() => demo.rejectMembership(m.id)}>Reject</button></>}</div>
    </div>)}</div>
  </Panel></>;
}

function EventsView({ demo }: { demo: ReturnType<typeof useCoCurricularDemo> }) {
  return <Panel title="Activity events" subtitle={`${demo.events.length} event(s) — approval tracking active`}>
    <div className="cc-table-wrap"><table className="cc-table"><thead><tr><th>Event</th><th>Club</th><th>Date</th><th>Time</th><th>Venue</th><th>Expected</th><th>Status</th></tr></thead>
    <tbody>{demo.events.map((e) => <tr key={e.id}><td><strong>{e.title}</strong></td><td>{e.club}</td><td>{e.date}</td><td>{e.time}</td><td>{e.venue}</td><td>{e.expectedAttendance}</td><td><span className={`cc-status ${e.status === 'Completed' ? 'good' : e.status === 'Scheduled' ? 'info' : e.status === 'Pending Approval' ? 'warning' : e.status === 'Cancelled' ? 'bad' : 'neutral'}`}>{e.status}</span></td></tr>)}</tbody></table></div>
  </Panel>;
}

function CompetitionsView({ demo }: { demo: ReturnType<typeof useCoCurricularDemo> }) {
  return <Panel title="Competitions" subtitle={`${demo.competitions.length} competition(s)`}>
    <div className="cc-table-wrap"><table className="cc-table"><thead><tr><th>Competition</th><th>Level</th><th>Date</th><th>Venue</th><th>Status</th><th>Result</th></tr></thead>
    <tbody>{demo.competitions.map((c) => <tr key={c.id}><td><strong>{c.name}</strong></td><td>{c.level}</td><td>{c.date}</td><td>{c.venue}</td><td><span className={`cc-status ${c.status === 'Completed' ? 'good' : c.status === 'Ongoing' ? 'info' : 'warning'}`}>{c.status}</span></td><td>{c.result}</td></tr>)}</tbody></table></div>
  </Panel>;
}

function AchievementsView({ demo }: { demo: ReturnType<typeof useCoCurricularDemo> }) {
  return <Panel title="Student achievements" subtitle={`${demo.achievements.length} achievement record(s)`}>
    <div className="cc-table-wrap"><table className="cc-table"><thead><tr><th>Student</th><th>Club</th><th>Achievement</th><th>Level</th><th>Date</th><th>Verified</th><th>Visibility</th><th>Action</th></tr></thead>
    <tbody>{demo.achievements.map((a) => <tr key={a.id}><td>{a.studentName}</td><td>{a.club}</td><td><strong>{a.title}</strong></td><td>{a.level}</td><td>{a.date}</td><td><span className={`cc-status ${a.verified ? 'good' : 'warning'}`}>{a.verified ? 'Verified' : 'Pending'}</span></td><td>{a.visibility}</td><td>{!a.verified && <button className="cc-link" onClick={() => demo.verifyAchievement(a.id)}>Verify</button>}</td></tr>)}</tbody></table></div>
  </Panel>;
}

function TripsView({ demo }: { demo: ReturnType<typeof useCoCurricularDemo> }) {
  return <Panel title="Educational trips" subtitle={`${demo.trips.length} trip(s) — consent tracking active`}>
    <div className="cc-record-list">{demo.trips.map((t) => <div className="cc-record-row" key={t.id}>
      <div><strong>{t.title}</strong><span>{t.destination} · {t.departureDate} → {t.returnDate} · Supervisor: {t.supervisor} · Consent: {t.consentReceived}/{t.participants}</span></div>
      <span className={`cc-status ${t.status === 'Closed' ? 'good' : t.status === 'In Progress' ? 'info' : t.status === 'Draft' ? 'neutral' : 'warning'}`}>{t.status}</span>
      <div className="cc-row-actions"><button className="cc-link" onClick={() => demo.advanceTrip(t.id)}>Advance</button></div>
    </div>)}</div>
  </Panel>;
}

function NotificationsView({ demo }: { demo: ReturnType<typeof useCoCurricularDemo> }) {
  return <Panel title="Notifications" subtitle={`${demo.notifications.length} notification(s)`}>
    <div className="cc-record-list">{demo.notifications.map((n) => <div className="cc-record-row" key={n.id}><div><strong>{n.title}</strong><span>{n.message} · {n.time}</span></div>{n.unread && <span className="cc-badge info">New</span>}</div>)}</div>
  </Panel>;
}

function ReportsView({ demo }: { demo: ReturnType<typeof useCoCurricularDemo> }) {
  const totalMembers = demo.clubs.reduce((s, c) => s + c.members, 0);
  return <><div className="cc-kpi-grid">
    <Metric icon={Users} label="Total participants" value={String(totalMembers)} detail="Across all active clubs" />
    <Metric icon={Trophy} label="Competitions entered" value={String(demo.competitions.length)} detail="This term" tone="gold" />
    <Metric icon={Award} label="Verified achievements" value={String(demo.achievements.filter((a) => a.verified).length)} detail="Published and staff-only" tone="teal" />
    <Metric icon={MapPin} label="Active trips" value={String(demo.trips.filter((t) => t.status !== 'Closed' && t.status !== 'Draft').length)} detail="In planning or progress" tone="blue" />
  </div>
  <Panel title="Club participation summary" subtitle="Members by club">
    <div className="cc-table-wrap"><table className="cc-table"><thead><tr><th>Club</th><th>Members</th><th>Capacity</th><th>Fill rate</th></tr></thead>
    <tbody>{demo.clubs.map((c) => <tr key={c.id}><td>{c.name}</td><td>{c.members}</td><td>{c.capacity}</td><td>{Math.round((c.members / c.capacity) * 100)}%</td></tr>)}</tbody></table></div>
  </Panel></>;
}

