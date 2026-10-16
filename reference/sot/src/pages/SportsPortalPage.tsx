import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Bell, Calendar, ChevronDown, ClipboardList, FileText, HelpCircle, LayoutDashboard, LogOut, Menu, MoreHorizontal, Plus, RotateCcw, Search, Settings, ShieldCheck, Trophy, Users, X, MapPin, Package } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/sports.css';
import { sportsDemo, useSportsDemo, type AttendanceStatus, type Division, type FixtureResult } from '@/data/sportsDemo';

type SpNav = { label: string; path: string; icon: LucideIcon; group: string };
const spNav: SpNav[] = [
  { label: 'Dashboard', path: '/sports/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Sports & teams', path: '/sports/teams', icon: Trophy, group: 'Configuration' },
  { label: 'Squad management', path: '/sports/squads', icon: Users, group: 'Configuration' },
  { label: 'Training sessions', path: '/sports/training', icon: Calendar, group: 'Operations' },
  { label: 'Fixtures & results', path: '/sports/fixtures', icon: Trophy, group: 'Operations' },
  { label: 'Venues', path: '/sports/venues', icon: MapPin, group: 'Configuration' },
  { label: 'Equipment', path: '/sports/equipment', icon: Package, group: 'Operations' },
  { label: 'Notifications', path: '/sports/notifications', icon: Bell, group: 'Communication' },
  { label: 'Reports', path: '/sports/reports', icon: FileText, group: 'Controls' },
  { label: 'Audit history', path: '/sports/audit', icon: FileText, group: 'Controls' },
  { label: 'Settings', path: '/sports/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Configuration', 'Operations', 'Communication', 'Controls', 'Account'];

export function SportsPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useSportsDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const current = spNav.find((item) => location.pathname.startsWith(item.path)) ?? spNav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const todayTraining = demo.trainingSessions.filter((t) => t.date === '16 Oct 2026' && t.status === 'Scheduled');
  const upcomingFixtures = demo.fixtures.filter((f) => f.status === 'Scheduled');
  const pendingResults = demo.fixtures.filter((f) => f.status === 'Completed' && f.result === 'Pending Result');
  const unreadCount = demo.notifications.filter((n) => n.unread).length;
  return <div className="sp-app">
    <aside className={`sp-sidebar ${mobile ? 'open' : ''}`}><div className="sp-brand"><div className="sp-brand-mark"><Trophy size={21} /></div><div><strong>Riverside</strong><span>Games & Sports</span></div><button className="sp-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div><div className="sp-demo-pill"><span className="sp-demo-dot" /> DEMO MODE <span>•</span> October 2026</div><div className="sp-school"><div>RA</div><span><strong>Riverside Academy</strong><small>Sports Department</small></span><ChevronDown size={15} /></div><nav className="sp-nav">{groups.map((group) => <div className="sp-nav-group" key={group}><p>{group}</p>{spNav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={`sp-nav-item${current.path === path || (path !== '/sports/dashboard' && location.pathname.startsWith(path)) ? ' active' : ''}`} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Training sessions' && todayTraining.length > 0 && <em>{todayTraining.length}</em>}{label === 'Fixtures & results' && upcomingFixtures.length > 0 && <em>{upcomingFixtures.length}</em>}{label === 'Notifications' && unreadCount > 0 && <em>{unreadCount}</em>}</button>)}</div>)}</nav><div className="sp-sidebar-footer"><button onClick={() => navigateTo('/sports/settings')}><HelpCircle size={16} /> Help centre</button><div className="sp-user"><div className="sp-avatar">CO</div><span><strong>Coach Omondi</strong><small>Games Teacher</small></span><MoreHorizontal size={16} /></div></div></aside>
    {mobile && <button className="sp-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="sp-main"><header className="sp-topbar"><button className="sp-menu-button" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="sp-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="sp-top-actions"><div className="sp-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search teams, players..." /></div><button className="sp-icon-button" onClick={() => navigateTo('/sports/notifications')} aria-label="Open notifications"><Bell size={18} />{unreadCount > 0 && <i />}</button><div className="sp-profile-wrap"><button className="sp-profile" onClick={() => setProfileOpen(!profileOpen)}><div className="sp-avatar">CO</div><span>Omondi</span><ChevronDown size={15} /></button>{profileOpen && <div className="sp-profile-menu"><strong>Coach Omondi</strong><small>Games Teacher</small><button onClick={() => navigateTo('/sports/settings')}><Settings size={14} /> Settings</button><button onClick={() => sportsDemo.reset()}><RotateCcw size={14} /> Reset demo data</button><button onClick={() => navigateTo('/')}><LogOut size={14} /> Exit portal</button></div>}</div></div></header><div className="sp-content"><div className="sp-context"><div><span className="sp-kicker"><ShieldCheck size={14} /> Games & Sports <b>•</b> 2026 · Term 3</span><h1>{current.label}</h1><p>{spDescription(location.pathname)}</p></div><div className="sp-context-actions">{current.path === '/sports/training' && <button className="sp-button primary" onClick={() => navigateTo('/sports/training')}><Plus size={15} /> Schedule training</button>}{current.path === '/sports/fixtures' && <button className="sp-button primary" onClick={() => navigateTo('/sports/fixtures')}><Plus size={15} /> Create fixture</button>}</div></div><SpRoute path={location.pathname} demo={demo} navigateTo={navigateTo} /></div></main>
  </div>;
}

function spDescription(path: string): string {
  if (path.includes('dashboard')) return 'Sports overview — teams, training, fixtures and equipment for your assigned sports.';
  if (path.includes('teams')) return 'Sports configuration, teams and coaching assignments.';
  if (path.includes('squad')) return 'Squad membership, positions and selection management.';
  if (path.includes('training')) return 'Training sessions with attendance tracking and venue conflict detection.';
  if (path.includes('fixture')) return 'Fixtures, competitions and result entry. Pending results shown until recorded.';
  if (path.includes('venue')) return 'Venue inventory with availability and maintenance status.';
  if (path.includes('equipment')) return 'Equipment register with issue and return tracking.';
  if (path.includes('notification')) return 'Sports notifications for training, fixtures and equipment.';
  if (path.includes('report')) return 'Sports participation, attendance and results reports.';
  if (path.includes('audit')) return 'Every sports action is logged with actor, target and timestamp.';
  return 'Games, sports and games teacher management.';
}

function SpRoute({ path, demo, navigateTo }: { path: string; demo: ReturnType<typeof useSportsDemo>; navigateTo: (p: string) => void }) {
  if (path === '/sports/dashboard' || path === '/sports') return <SpDashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/sports/teams')) return <TeamsView demo={demo} />;
  if (path.startsWith('/sports/squads')) return <SquadsView demo={demo} />;
  if (path.startsWith('/sports/training')) return <TrainingView demo={demo} />;
  if (path.startsWith('/sports/fixtures')) return <FixturesView demo={demo} />;
  if (path.startsWith('/sports/venues')) return <VenuesView demo={demo} />;
  if (path.startsWith('/sports/equipment')) return <EquipmentView demo={demo} />;
  if (path.startsWith('/sports/notifications')) return <NotificationsView demo={demo} />;
  if (path.startsWith('/sports/reports')) return <ReportsView demo={demo} />;
  if (path.startsWith('/sports/audit')) return <AuditView demo={demo} />;
  return <SettingsView />;
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return <div className="sp-panel"><div className="sp-panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>{children}</div>;
}
function SpMetric({ icon: Icon, label, value, detail, tone, onClick }: { icon: LucideIcon; label: string; value: string; detail: string; tone?: string; onClick: () => void }) {
  return <button className="sp-metric" onClick={onClick}><div className={`sp-metric-icon ${tone ?? ''}`}><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></button>;
}

function SpDashboard({ demo, navigateTo }: { demo: ReturnType<typeof useSportsDemo>; navigateTo: (p: string) => void }) {
  const activeTeams = demo.teams.filter((t) => t.status === 'Active');
  const todayTraining = demo.trainingSessions.filter((t) => t.date === '16 Oct 2026');
  const upcomingFixtures = demo.fixtures.filter((f) => f.status === 'Scheduled');
  const pendingResults = demo.fixtures.filter((f) => f.result === 'Pending Result');
  return <><div className="sp-kpi-grid">
    <SpMetric icon={Users} label="Active teams" value={String(activeTeams.length)} detail={`${demo.sports.length} sports configured`} onClick={() => navigateTo('/sports/teams')} />
    <SpMetric icon={Calendar} label="Today's training" value={String(todayTraining.length)} detail={`${todayTraining.filter((t) => t.status === 'Scheduled').length} scheduled`} tone="teal" onClick={() => navigateTo('/sports/training')} />
    <SpMetric icon={Trophy} label="Upcoming fixtures" value={String(upcomingFixtures.length)} detail={`${pendingResults.length} pending results`} tone="gold" onClick={() => navigateTo('/sports/fixtures')} />
    <SpMetric icon={MapPin} label="Venues" value={String(demo.venues.length)} detail={`${demo.venues.filter((v) => v.status === 'Available').length} available`} tone="blue" onClick={() => navigateTo('/sports/venues')} />
  </div>
  <div className="sp-main-grid">
    <Panel title="Today's training" subtitle={`${todayTraining.length} session(s) scheduled for 16 Oct 2026`}>
      <div className="sp-record-list">{todayTraining.map((t) => <div className="sp-record-row" key={t.id}><div><strong>{t.teamName}</strong><span>{t.startTime}–{t.endTime} · {t.venue} · {t.coach}</span></div><span className={`sp-status ${t.status === 'Completed' ? 'good' : t.status === 'Cancelled' ? 'bad' : 'info'}`}>{t.status}</span></div>)}</div>
    </Panel>
    <Panel title="Upcoming fixtures" subtitle={`${upcomingFixtures.length} scheduled fixture(s)`}>
      <div className="sp-record-list">{upcomingFixtures.map((f) => <div className="sp-record-row" key={f.id}><div><strong>{f.teamName} vs {f.opponent}</strong><span>{f.date} {f.time} · {f.venue} · {f.isHome ? 'Home' : 'Away'}</span></div><span className="sp-status warning">{f.result}</span></div>)}</div>
    </Panel>
  </div>
  <div className="sp-main-grid">
    <Panel title="Recent results" subtitle="Latest completed fixtures">
      <div className="sp-record-list">{demo.fixtures.filter((f) => f.status === 'Completed').map((f) => <div className="sp-record-row" key={f.id}><div><strong>{f.teamName} vs {f.opponent}</strong><span>{f.date} · {f.result !== 'Pending Result' ? `${f.scoreFor}–${f.scoreAgainst} (${f.result})` : f.result}</span></div><span className={`sp-status ${f.result === 'Won' ? 'good' : f.result === 'Lost' ? 'bad' : f.result === 'Draw' ? 'info' : 'warning'}`}>{f.result}</span></div>)}</div>
    </Panel>
    <Panel title="Equipment availability" subtitle="Current stock levels">
      <div className="sp-record-list">{demo.equipment.slice(0, 5).map((e) => <div className="sp-record-row" key={e.id}><div><strong>{e.name}</strong><span>{e.availableQuantity}/{e.totalQuantity} available · {e.condition}</span></div><span className={`sp-status ${e.availableQuantity > 0 ? 'good' : 'bad'}`}>{e.availableQuantity > 0 ? 'Available' : 'Out'}</span></div>)}</div>
    </Panel>
  </div></>;
}

function TeamsView({ demo }: { demo: ReturnType<typeof useSportsDemo> }) {
  const [sportId, setSportId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [division, setDivision] = useState<Division>('Boys');
  const [ageGroup, setAgeGroup] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teamName.trim() || !sportId) { setError('Team name and sport are required.'); return; }
    const sport = demo.sports.find((s) => s.id === sportId);
    const r = sportsDemo.createTeam(sportId, teamName, sport?.coachId ?? '', sport?.coachName ?? '', division, ageGroup);
    if (r.ok) { setSuccess('Team created.'); setError(''); setTeamName(''); setSportId(''); setAgeGroup(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  return <><Panel title="Create team" subtitle="Form a new team for a sport">
    <form className="sp-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Sport<select value={sportId} onChange={(e) => setSportId(e.target.value)}><option value="">Select sport...</option>{demo.sports.map((s) => <option key={s.id} value={s.id}>{s.name} — {s.division}</option>)}</select></label>
        <label>Team name<input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g. RA Boys U16 Football" /></label>
        <label>Division<select value={division} onChange={(e) => setDivision(e.target.value as Division)}><option>Boys</option><option>Girls</option><option>Mixed</option></select></label>
        <label>Age group<input value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} placeholder="e.g. U16" /></label>
      </div>
      <button className="sp-button primary" type="submit" disabled={!teamName.trim() || !sportId}><Plus size={15} /> Create team</button>
      {error && <span className="sp-form-error">{error}</span>}
      {success && <span className="sp-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Teams & sports" subtitle={`${demo.teams.length} team(s) across ${demo.sports.length} sport(s)`}>
    <div className="sp-table-wrap"><table className="sp-table"><thead><tr><th>Team</th><th>Sport</th><th>Division</th><th>Age</th><th>Coach</th><th>Squad</th><th>Status</th></tr></thead>
    <tbody>{demo.teams.map((t) => <tr key={t.id}><td><strong>{t.teamName}</strong></td><td>{t.sportName}</td><td>{t.division}</td><td>{t.ageGroup}</td><td>{t.coachName}</td><td>{t.squadSize}</td><td><span className={`sp-status ${t.status === 'Active' ? 'good' : t.status === 'Trial' ? 'warning' : 'neutral'}`}>{t.status}</span></td></tr>)}</tbody></table></div>
  </Panel></>;
}

function SquadsView({ demo }: { demo: ReturnType<typeof useSportsDemo> }) {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const team = demo.teams.find((t) => t.id === selectedTeam);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTeam || !studentName.trim()) { setError('Team and student name are required.'); return; }
    const r = sportsDemo.addSquadMember(selectedTeam, `stu-${Date.now()}`, studentName, className, position, null);
    if (r.ok) { setSuccess('Squad member added.'); setError(''); setStudentName(''); setClassName(''); setPosition(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  return <><Panel title="Add squad member" subtitle="Add a student to a team squad">
    <form className="sp-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Team<select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}><option value="">Select team...</option>{demo.teams.map((t) => <option key={t.id} value={t.id}>{t.teamName}</option>)}</select></label>
        <label>Student name<input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. John Doe" /></label>
        <label>Class<input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="e.g. Form 3 — Tana" /></label>
        <label>Position<input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g. Forward" /></label>
      </div>
      <button className="sp-button primary" type="submit" disabled={!selectedTeam || !studentName.trim()}><Plus size={15} /> Add member</button>
      {error && <span className="sp-form-error">{error}</span>}
      {success && <span className="sp-form-message">{success}</span>}
    </form>
  </Panel>
  {team && <Panel title={`${team.teamName} squad`} subtitle={`${team.members.filter((m) => m.status === 'Active').length} active member(s)`}>
    <div className="sp-table-wrap"><table className="sp-table"><thead><tr><th>Student</th><th>Class</th><th>Position</th><th>No.</th><th>Status</th><th>Consent</th><th>Action</th></tr></thead>
    <tbody>{team.members.map((m) => <tr key={m.studentId}><td>{m.studentName}</td><td>{m.className}</td><td>{m.position}</td><td>{m.squadNumber ?? '—'}</td><td><span className={`sp-status ${m.status === 'Active' ? 'good' : m.status === 'Injured' ? 'warning' : 'bad'}`}>{m.status}</span></td><td>{m.parentConsent ? 'Yes' : 'No'}</td><td>{m.status === 'Active' && <button className="sp-link" onClick={() => sportsDemo.removeSquadMember(team.id, m.studentId)}>Remove</button>}</td></tr>)}</tbody></table></div>
  </Panel>}
  <Panel title="All squads" subtitle="Quick view of all team rosters">
    <div className="sp-record-list">{demo.teams.map((t) => <div className="sp-record-row" key={t.id}><div><strong>{t.teamName}</strong><span>{t.sportName} · {t.coachName} · {t.members.filter((m) => m.status === 'Active').length} active</span></div><button className="sp-link" onClick={() => setSelectedTeam(t.id)}>View squad</button></div>)}</div>
  </Panel></>;
}

function TrainingView({ demo }: { demo: ReturnType<typeof useSportsDemo> }) {
  const [teamId, setTeamId] = useState('');
  const [date, setDate] = useState('16 Oct 2026');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [venue, setVenue] = useState('');
  const [objectives, setObjectives] = useState('');
  const [equipment, setEquipment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTraining, setActiveTraining] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teamId || !startTime || !endTime || !venue) { setError('Team, times and venue are required.'); return; }
    const r = sportsDemo.createTraining(teamId, date, startTime, endTime, venue, objectives, equipment);
    if (r.ok) { setSuccess('Training scheduled.'); setError(''); setTeamId(''); setStartTime(''); setEndTime(''); setVenue(''); setObjectives(''); setEquipment(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  const ts = demo.trainingSessions.find((t) => t.id === activeTraining);
  const attColor = (s: AttendanceStatus) => s === 'Present' ? 'good' : s === 'Late' ? 'warning' : s === 'Excused' ? 'info' : 'bad';
  return <><Panel title="Schedule training" subtitle="Create a training session with venue conflict detection">
    <form className="sp-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Team<select value={teamId} onChange={(e) => setTeamId(e.target.value)}><option value="">Select team...</option>{demo.teams.map((t) => <option key={t.id} value={t.id}>{t.teamName}</option>)}</select></label>
        <label>Date<input value={date} onChange={(e) => setDate(e.target.value)} placeholder="16 Oct 2026" /></label>
        <label>Start time<input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} /></label>
        <label>End time<input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} /></label>
        <label>Venue<select value={venue} onChange={(e) => setVenue(e.target.value)}><option value="">Select venue...</option>{demo.venues.filter((v) => v.status === 'Available').map((v) => <option key={v.id} value={v.name}>{v.name}</option>)}</select></label>
      </div>
      <label>Objectives<textarea value={objectives} onChange={(e) => setObjectives(e.target.value)} placeholder="Training objectives and focus areas" /></label>
      <label>Required equipment<input value={equipment} onChange={(e) => setEquipment(e.target.value)} placeholder="e.g. Football, cones, bibs" /></label>
      <button className="sp-button primary" type="submit" disabled={!teamId || !startTime || !endTime || !venue}><Plus size={15} /> Schedule</button>
      {error && <span className="sp-form-error">{error}</span>}
      {success && <span className="sp-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Training sessions" subtitle={`${demo.trainingSessions.length} session(s) — venue conflict detection active`}>
    <div className="sp-record-list">{demo.trainingSessions.map((t) => <div className="sp-record-row" key={t.id}><div><strong>{t.teamName}</strong><span>{t.date} {t.startTime}–{t.endTime} · {t.venue} · {t.coach} · {t.attendance.filter((a) => a.status === 'Present').length}/{t.attendance.length} present</span></div><span className={`sp-status ${t.status === 'Completed' ? 'good' : t.status === 'Cancelled' ? 'bad' : 'info'}`}>{t.status}</span><div className="sp-row-actions"><button className="sp-link" onClick={() => setActiveTraining(activeTraining === t.id ? '' : t.id)}>{t.status === 'Completed' ? 'View' : 'Manage'}</button>{t.status === 'Scheduled' && <button className="sp-link" onClick={() => sportsDemo.completeTraining(t.id)}>Complete</button>}</div></div>)}</div>
  </Panel>
  {ts && ts.status !== 'Completed' && <Panel title={`Attendance — ${ts.teamName}`} subtitle={`${ts.date} ${ts.startTime}–${ts.endTime} · ${ts.venue}`}>
    <div className="sp-record-list">{ts.attendance.map((a) => <div className="sp-record-row" key={a.studentId}><div><strong>{a.studentName}</strong><span>{a.note || '—'}</span></div><span className={`sp-status ${attColor(a.status)}`}>{a.status}</span><select style={{ fontSize: 11, padding: '4px 6px', borderRadius: 6, border: '1px solid #e6ebee' }} value={a.status} onChange={(e) => sportsDemo.markTrainingAttendance(ts.id, a.studentId, e.target.value as AttendanceStatus, a.note)}><option>Present</option><option>Absent</option><option>Late</option><option>Excused</option></select></div>)}</div>
  </Panel>}</>;
}

function FixturesView({ demo }: { demo: ReturnType<typeof useSportsDemo> }) {
  const [teamId, setTeamId] = useState('');
  const [opponent, setOpponent] = useState('');
  const [isHome, setIsHome] = useState(true);
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [travel, setTravel] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resultFx, setResultFx] = useState('');
  const [result, setResult] = useState<FixtureResult>('Won');
  const [scoreFor, setScoreFor] = useState('');
  const [scoreAgainst, setScoreAgainst] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teamId || !opponent.trim() || !date) { setError('Team, opponent and date are required.'); return; }
    const r = sportsDemo.createFixture(teamId, opponent, isHome, venue, date, time, supervisor, travel);
    if (r.ok) { setSuccess('Fixture created.'); setError(''); setTeamId(''); setOpponent(''); setVenue(''); setDate(''); setTime(''); setSupervisor(''); setTravel(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  const fx = demo.fixtures.find((f) => f.id === resultFx);
  const resultColor = (r: FixtureResult) => r === 'Won' ? 'good' : r === 'Lost' ? 'bad' : r === 'Draw' ? 'info' : 'warning';
  return <><Panel title="Create fixture" subtitle="Schedule a match or competition">
    <form className="sp-form" onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <label>Team<select value={teamId} onChange={(e) => setTeamId(e.target.value)}><option value="">Select team...</option>{demo.teams.map((t) => <option key={t.id} value={t.id}>{t.teamName}</option>)}</select></label>
        <label>Opponent<input value={opponent} onChange={(e) => setOpponent(e.target.value)} placeholder="e.g. St. Mary's School" /></label>
        <label>Venue<input value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="e.g. Main Field" /></label>
        <label>Date<input value={date} onChange={(e) => setDate(e.target.value)} placeholder="e.g. 19 Oct 2026" /></label>
        <label>Time<input value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g. 15:00" /></label>
        <label>Supervisor<input value={supervisor} onChange={(e) => setSupervisor(e.target.value)} placeholder="e.g. Coach Omondi" /></label>
        <label>Travel arrangement<input value={travel} onChange={(e) => setTravel(e.target.value)} placeholder="e.g. School bus departing 13:00" /></label>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}><input type="checkbox" checked={isHome} onChange={(e) => setIsHome(e.target.checked)} /> Home match</label>
      </div>
      <button className="sp-button primary" type="submit" disabled={!teamId || !opponent.trim() || !date}><Plus size={15} /> Create fixture</button>
      {error && <span className="sp-form-error">{error}</span>}
      {success && <span className="sp-form-message">{success}</span>}
    </form>
  </Panel>
  <Panel title="Fixtures & results" subtitle={`${demo.fixtures.length} fixture(s) — results shown as entered`}>
    <div className="sp-record-list">{demo.fixtures.map((f) => <div className="sp-record-row" key={f.id}><div><strong>{f.teamName} vs {f.opponent}</strong><span>{f.date} {f.time} · {f.venue} · {f.isHome ? 'Home' : 'Away'} · Supervisor: {f.supervisor}{f.scoreFor !== null ? ` · Score: ${f.scoreFor}-${f.scoreAgainst}` : ''}</span></div><span className={`sp-status ${f.status === 'Completed' ? 'good' : f.status === 'Cancelled' || f.status === 'Postponed' ? 'bad' : 'info'}`}>{f.status}</span><div className="sp-row-actions">{f.result === 'Pending Result' && <button className="sp-link" onClick={() => setResultFx(f.id)}>Record result</button>}</div></div>)}</div>
  </Panel>
  {fx && <Panel title={`Record result — ${fx.teamName} vs ${fx.opponent}`} subtitle={fx.date}>
    <div className="sp-form">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        <label>Result<select value={result} onChange={(e) => setResult(e.target.value as FixtureResult)}><option>Won</option><option>Lost</option><option>Draw</option><option>Pending Result</option><option>N/A</option></select></label>
        <label>Our score<input type="number" value={scoreFor} onChange={(e) => setScoreFor(e.target.value)} placeholder="e.g. 3" /></label>
        <label>Opponent score<input type="number" value={scoreAgainst} onChange={(e) => setScoreAgainst(e.target.value)} placeholder="e.g. 1" /></label>
      </div>
      <button className="sp-button primary" onClick={() => { const r = sportsDemo.recordResult(fx.id, result, parseInt(scoreFor) || 0, parseInt(scoreAgainst) || 0); if (r.ok) { setResultFx(''); setScoreFor(''); setScoreAgainst(''); } else alert(r.error); }}><Trophy size={15} /> Save result</button>
    </div>
  </Panel>}</>;
}

function VenuesView({ demo }: { demo: ReturnType<typeof useSportsDemo> }) {
  return <Panel title="Venues" subtitle={`${demo.venues.length} venue(s) with availability status`}>
    <div className="sp-table-wrap"><table className="sp-table"><thead><tr><th>Venue</th><th>Type</th><th>Capacity</th><th>Status</th><th>Notes</th></tr></thead>
    <tbody>{demo.venues.map((v) => <tr key={v.id}><td><strong>{v.name}</strong></td><td>{v.type}</td><td>{v.capacity}</td><td><span className={`sp-status ${v.status === 'Available' ? 'good' : v.status === 'Maintenance' || v.status === 'Restricted' ? 'bad' : 'warning'}`}>{v.status}</span></td><td>{v.notes}</td></tr>)}</tbody></table></div>
  </Panel>;
}

function EquipmentView({ demo }: { demo: ReturnType<typeof useSportsDemo> }) {
  const [eqId, setEqId] = useState('');
  const [issuedTo, setIssuedTo] = useState('');
  const [condition, setCondition] = useState<'Good' | 'Fair' | 'Poor'>('Good');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const issue = () => {
    if (!eqId || !issuedTo.trim()) { setError('Equipment and recipient are required.'); return; }
    const r = sportsDemo.issueEquipment(eqId, issuedTo, condition);
    if (r.ok) { setSuccess('Equipment issued.'); setError(''); setEqId(''); setIssuedTo(''); }
    else { setError(r.error ?? 'Failed.'); setSuccess(''); }
  };
  return <><Panel title="Issue equipment" subtitle="Issue equipment to a coach or team">
    <div className="sp-form">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        <label>Equipment<select value={eqId} onChange={(e) => setEqId(e.target.value)}><option value="">Select equipment...</option>{demo.equipment.filter((e) => e.availableQuantity > 0).map((e) => <option key={e.id} value={e.id}>{e.name} ({e.availableQuantity} available)</option>)}</select></label>
        <label>Issue to<input value={issuedTo} onChange={(e) => setIssuedTo(e.target.value)} placeholder="e.g. Coach Omondi" /></label>
        <label>Condition<select value={condition} onChange={(e) => setCondition(e.target.value as typeof condition)}><option>Good</option><option>Fair</option><option>Poor</option></select></label>
      </div>
      <button className="sp-button primary" onClick={issue} disabled={!eqId || !issuedTo.trim()}><Plus size={15} /> Issue</button>
      {error && <span className="sp-form-error">{error}</span>}
      {success && <span className="sp-form-message">{success}</span>}
    </div>
  </Panel>
  <Panel title="Equipment register" subtitle={`${demo.equipment.length} item(s) in inventory`}>
    <div className="sp-table-wrap"><table className="sp-table"><thead><tr><th>Name</th><th>Category</th><th>Sport</th><th>Total</th><th>Available</th><th>Condition</th></tr></thead>
    <tbody>{demo.equipment.map((e) => <tr key={e.id}><td><strong>{e.name}</strong></td><td>{e.category}</td><td>{e.sportName}</td><td>{e.totalQuantity}</td><td>{e.availableQuantity}</td><td>{e.condition}</td></tr>)}</tbody></table></div>
  </Panel>
  <Panel title="Issue records" subtitle={`${demo.equipmentIssues.length} issue/return record(s)`}>
    <div className="sp-record-list">{demo.equipmentIssues.map((i) => <div className="sp-record-row" key={i.id}><div><strong>{i.equipmentName}</strong><span>Issued to {i.issuedTo} · {i.issueDate}{i.returnDate ? ` · Returned ${i.returnDate}` : ''}</span></div><span className={`sp-status ${i.status === 'Returned' ? 'good' : i.status === 'Damaged' || i.status === 'Lost' ? 'bad' : 'info'}`}>{i.status}</span><div className="sp-row-actions">{i.status === 'Issued' && <button className="sp-link" onClick={() => sportsDemo.returnEquipment(i.id, 'Good')}>Return</button>}</div></div>)}</div>
  </Panel></>;
}

function NotificationsView({ demo }: { demo: ReturnType<typeof useSportsDemo> }) {
  return <Panel title="Notifications" subtitle={`${demo.notifications.length} notification(s)`}>
    <div className="sp-record-list">{demo.notifications.map((n) => <div className="sp-record-row" key={n.id}><div><strong>{n.title}</strong><span>{n.detail} · {n.date} · To: {n.recipient}</span></div><span className={`sp-status ${n.unread ? 'warning' : 'neutral'}`}>{n.unread ? 'Unread' : 'Read'}</span><div className="sp-row-actions">{n.unread && <button className="sp-link" onClick={() => sportsDemo.markNotificationRead(n.id)}>Mark read</button>}</div></div>)}</div>
  </Panel>;
}

function ReportsView({ demo }: { demo: ReturnType<typeof useSportsDemo> }) {
  const activeTeams = demo.teams.filter((t) => t.status === 'Active');
  const completedTraining = demo.trainingSessions.filter((t) => t.status === 'Completed');
  const completedFixtures = demo.fixtures.filter((f) => f.status === 'Completed');
  const wins = completedFixtures.filter((f) => f.result === 'Won');
  return <><div className="sp-kpi-grid">
    <SpMetric icon={Users} label="Active teams" value={String(activeTeams.length)} detail={`${demo.sports.length} sports`} onClick={() => {}} />
    <SpMetric icon={Calendar} label="Training sessions" value={String(demo.trainingSessions.length)} detail={`${completedTraining.length} completed`} tone="teal" onClick={() => {}} />
    <SpMetric icon={Trophy} label="Fixtures played" value={String(completedFixtures.length)} detail={`${wins.length} wins`} tone="gold" onClick={() => {}} />
    <SpMetric icon={Activity} label="Win rate" value={`${completedFixtures.length > 0 ? Math.round((wins.length / completedFixtures.length) * 100) : 0}%`} detail={`${wins.length}/${completedFixtures.length}`} tone="green" onClick={() => {}} />
  </div>
  <Panel title="Training attendance by team" subtitle="Participation calculated from recorded attendance">
    <div className="sp-table-wrap"><table className="sp-table"><thead><tr><th>Team</th><th>Sessions</th><th>Total attendance entries</th><th>Present</th><th>Absent</th><th>Rate</th></tr></thead>
    <tbody>{activeTeams.map((t) => { const sessions = demo.trainingSessions.filter((s) => s.teamId === t.id); const allAtt = sessions.flatMap((s) => s.attendance); const present = allAtt.filter((a) => a.status === 'Present').length; const absent = allAtt.filter((a) => a.status === 'Absent').length; const rate = allAtt.length > 0 ? Math.round((present / allAtt.length) * 100) : 0; return <tr key={t.id}><td>{t.teamName}</td><td>{sessions.length}</td><td>{allAtt.length}</td><td>{present}</td><td>{absent}</td><td>{rate}%</td></tr>; })}</tbody></table></div>
  </Panel></>;
}

function AuditView({ demo }: { demo: ReturnType<typeof useSportsDemo> }) {
  return <Panel title="Audit history" subtitle={`${demo.audit.length} recorded action(s)`}>
    <div className="sp-record-list">{demo.audit.map((a) => <div className="sp-record-row" key={a.id}><div><strong>{a.action}</strong><span>{a.target} · By {a.actor} · {a.timestamp}</span></div></div>)}</div>
  </Panel>;
}

function SettingsView() {
  return <Panel title="Settings" subtitle="Sports department configuration">
    <div className="sp-form">
      <label>Coach name<input defaultValue="Coach Omondi" /></label>
      <label>Assigned sports<input defaultValue="Football, Athletics" /></label>
      <label>Season<select><option>Term 3 2026</option><option>Term 1 2027</option></select></label>
      <button className="sp-button primary">Save settings</button>
    </div>
  </Panel>;
}
