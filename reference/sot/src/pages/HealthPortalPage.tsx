import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Activity, AlertTriangle, ArrowRight, Bandage, Bell, CheckCircle2, ChevronDown, ClipboardList, Clock3, FileText, Heart, HeartPulse, HelpCircle, LayoutDashboard, LogOut, Menu, MoreHorizontal, Pill, Plus, RotateCcw, Search, Settings, ShieldCheck, Stethoscope, TriangleAlert, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/health.css';
import { healthDemo, useHealthDemo, type VisitType, type ReferralUrgency } from '@/data/healthDemo';

type HlNav = { label: string; path: string; icon: LucideIcon; group: string };
const hlNav: HlNav[] = [
  { label: 'Dashboard', path: '/health/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Clinic queue', path: '/health/queue', icon: Clock3, group: 'Clinical' },
  { label: 'Encounters', path: '/health/encounters', icon: Stethoscope, group: 'Clinical' },
  { label: 'Observations', path: '/health/observations', icon: HeartPulse, group: 'Clinical' },
  { label: 'Treatments', path: '/health/treatments', icon: Bandage, group: 'Clinical' },
  { label: 'Medical profiles', path: '/health/profiles', icon: Heart, group: 'Records' },
  { label: 'Allergies & alerts', path: '/health/allergies', icon: TriangleAlert, group: 'Records' },
  { label: 'Chronic conditions', path: '/health/conditions', icon: ClipboardList, group: 'Records' },
  { label: 'Medication orders', path: '/health/medications', icon: Pill, group: 'Medication' },
  { label: 'Administration records', path: '/health/administrations', icon: CheckCircle2, group: 'Medication' },
  { label: 'Referrals', path: '/health/referrals', icon: FileText, group: 'External' },
  { label: 'Emergencies', path: '/health/emergencies', icon: AlertTriangle, group: 'External' },
  { label: 'Consents', path: '/health/consents', icon: ShieldCheck, group: 'Consent' },
  { label: 'Immunizations', path: '/health/immunizations', icon: CheckCircle2, group: 'Programmes' },
  { label: 'Notifications', path: '/health/notifications', icon: Bell, group: 'Operations' },
  { label: 'Reports', path: '/health/reports', icon: Activity, group: 'Controls' },
  { label: 'Audit history', path: '/health/audit', icon: Activity, group: 'Controls' },
  { label: 'Settings', path: '/health/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Clinical', 'Records', 'Medication', 'External', 'Consent', 'Programmes', 'Operations', 'Controls', 'Account'];

export function HealthPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useHealthDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const current = hlNav.find((item) => location.pathname.startsWith(item.path)) ?? hlNav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const waitingCount = demo.encounters.filter((e) => e.status === 'Waiting' || e.status === 'Registered').length;
  const pendingMed = demo.administrations.filter((a) => a.status === 'Pending').length;
  const activeReferrals = demo.referrals.filter((r) => r.status !== 'Follow-up completed' && r.status !== 'Cancelled' && r.status !== 'Declined').length;
  const unreadCount = demo.notifications.filter((n) => n.unread).length;
  const allergyCount = demo.allergies.length;
  return <div className="hl-app">
    <aside className={`hl-sidebar ${mobile ? 'open' : ''}`}><div className="hl-brand"><div className="hl-brand-mark"><Stethoscope size={21} /></div><div><strong>Riverside</strong><span>Academy Health</span></div><button className="hl-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div><div className="hl-demo-pill"><span className="hl-demo-dot" /> DEMO MODE <span>•</span> October 2026</div><div className="hl-school"><div>RA</div><span><strong>Riverside Academy</strong><small>Health Centre</small></span><ChevronDown size={15} /></div><nav className="hl-nav">{groups.map((group) => <div className="hl-nav-group" key={group}><p>{group}</p>{hlNav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={`hl-nav-item${current.path === path || (path !== '/health/dashboard' && location.pathname.startsWith(path)) ? ' active' : ''}`} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Clinic queue' && waitingCount > 0 && <em className="badge-red">{waitingCount}</em>}{label === 'Administration records' && pendingMed > 0 && <em>{pendingMed}</em>}{label === 'Referrals' && activeReferrals > 0 && <em>{activeReferrals}</em>}{label === 'Allergies & alerts' && allergyCount > 0 && <em>{allergyCount}</em>}{label === 'Notifications' && unreadCount > 0 && <em>{unreadCount}</em>}</button>)}</div>)}</nav><div className="hl-sidebar-footer"><button onClick={() => navigateTo('/health/settings')}><HelpCircle size={16} /> Help centre</button><div className="hl-user"><div className="hl-avatar">NG</div><span><strong>Nurse Grace</strong><small>School Nurse</small></span><MoreHorizontal size={16} /></div></div></aside>
    {mobile && <button className="hl-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="hl-main"><header className="hl-topbar"><button className="hl-menu-button" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="hl-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="hl-top-actions"><div className="hl-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students, encounters..." /></div><button className="hl-icon-button" onClick={() => navigateTo('/health/notifications')} aria-label="Open notifications"><Bell size={18} />{unreadCount > 0 && <i />}</button><div className="hl-profile-wrap"><button className="hl-profile" onClick={() => setProfileOpen(!profileOpen)}><div className="hl-avatar">NG</div><span>Nurse</span><ChevronDown size={15} /></button>{profileOpen && <div className="hl-profile-menu"><strong>Nurse Grace</strong><small>School Nurse</small><button onClick={() => navigateTo('/health/settings')}><Settings size={14} /> Settings</button><button onClick={() => healthDemo.reset()}><RotateCcw size={14} /> Reset demo data</button><button onClick={() => navigateTo('/')}><LogOut size={14} /> Exit portal</button></div>}</div></div></header><div className="hl-content"><div className="hl-context"><div><span className="hl-kicker"><ShieldCheck size={14} /> Health Centre <b>•</b> 2026 · Term 3</span><h1>{current.label}</h1><p>{hlDescription(location.pathname)}</p></div><div className="hl-context-actions"><button className="hl-button primary" onClick={() => navigateTo('/health/queue')}><Plus size={15} /> Register visit</button></div></div><HlRoute path={location.pathname} demo={demo} navigateTo={navigateTo} /></div></main>
  </div>;
}

function hlDescription(path: string): string {
  if (path.includes('queue')) return 'Today\'s clinic queue — students waiting, in consultation and under observation.';
  if (path.includes('encounter')) return 'Complete clinic encounter lifecycle from registration to completion with clinical documentation.';
  if (path.includes('observation')) return 'Record and review clinical observations with range validation and historical timeline.';
  if (path.includes('treatment')) return 'Document treatment records and procedures performed during clinic encounters.';
  if (path.includes('profile')) return 'Student health profiles linked to existing student records with emergency contacts and review status.';
  if (path.includes('allergy')) return 'Known allergies, adverse reactions and medical alerts with severity and verification status.';
  if (path.includes('condition')) return 'Chronic conditions with individualized management plans and care instructions.';
  if (path.includes('medication')) return 'Medication orders with prescriber, dosage, consent status and active/discontinued lifecycle.';
  if (path.includes('administration')) return 'Medication administration records (MAR) — administered, refused, omitted and pending doses.';
  if (path.includes('referral')) return 'Referrals to external healthcare providers with guardian notification and follow-up tracking.';
  if (path.includes('emergency')) return 'Emergency incident management with time-stamped event timeline and guardian contact log.';
  if (path.includes('consent')) return 'Parent consent records for medication, health activities and information sharing.';
  if (path.includes('immunization')) return 'Immunization records with source verification and dose tracking.';
  if (path.includes('notification')) return 'Health notifications to guardians — neutral wording protects sensitive clinical information.';
  if (path.includes('report')) return 'Clinic utilization, visit trends and health programme reports with privacy controls.';
  if (path.includes('audit')) return 'Every clinical action is logged with actor, timestamp and target record for audit compliance.';
  return 'A complete view of student health records, clinic encounters, medications and emergency management.';
}

function HlRoute({ path, demo, navigateTo }: { path: string; demo: ReturnType<typeof useHealthDemo>; navigateTo: (p: string) => void }) {
  if (path === '/health/dashboard' || path === '/health') return <HlDashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/health/queue')) return <QueueView demo={demo} />;
  if (path.startsWith('/health/encounters')) return <EncountersView demo={demo} />;
  if (path.startsWith('/health/observations')) return <ObservationsView demo={demo} />;
  if (path.startsWith('/health/treatments')) return <TreatmentsView demo={demo} />;
  if (path.startsWith('/health/profiles')) return <ProfilesView demo={demo} />;
  if (path.startsWith('/health/allergies')) return <AllergiesView demo={demo} />;
  if (path.startsWith('/health/conditions')) return <ConditionsView demo={demo} />;
  if (path.startsWith('/health/medications')) return <MedicationsView demo={demo} />;
  if (path.startsWith('/health/administrations')) return <AdministrationsView demo={demo} />;
  if (path.startsWith('/health/referrals')) return <ReferralsView demo={demo} />;
  if (path.startsWith('/health/emergencies')) return <EmergenciesView demo={demo} />;
  if (path.startsWith('/health/consents')) return <ConsentsView demo={demo} />;
  if (path.startsWith('/health/immunizations')) return <ImmunizationsView demo={demo} />;
  if (path.startsWith('/health/notifications')) return <NotificationsView demo={demo} />;
  if (path.startsWith('/health/reports')) return <ReportsView demo={demo} />;
  if (path.startsWith('/health/audit')) return <AuditView demo={demo} />;
  return <SettingsView />;
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return <div className="hl-panel"><div className="hl-panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>{children}</div>;
}
function HlMetric({ icon: Icon, label, value, detail, tone, onClick }: { icon: LucideIcon; label: string; value: string; detail: string; tone?: string; onClick: () => void }) {
  return <button className="hl-metric" onClick={onClick}><div className={`hl-metric-icon ${tone ?? ''}`}><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></button>;
}
function Task({ title, detail, action, onClick }: { title: string; detail: string; action: string; onClick: () => void }) {
  return <button className="hl-task" onClick={onClick}><div className="hl-task-icon"><Clock3 size={14} /></div><div><strong>{title}</strong><small>{detail}</small></div><b>{action} <ArrowRight size={12} /></b></button>;
}
function QuickAction({ label, icon: Icon, onClick }: { label: string; icon: LucideIcon; onClick: () => void }) {
  return <button className="hl-quick" onClick={onClick}><Icon size={16} /> {label} <ArrowRight size={13} /></button>;
}
function AlertCard({ title, detail, tone, onClick }: { title: string; detail: string; tone: string; onClick: () => void }) {
  return <button className={`hl-alert ${tone}`} onClick={onClick}><span /><div><strong>{title}</strong><small>{detail}</small></div><ArrowRight size={15} /></button>;
}

function HlDashboard({ demo, navigateTo }: { demo: ReturnType<typeof useHealthDemo>; navigateTo: (p: string) => void }) {
  const waiting = demo.encounters.filter((e) => e.status === 'Waiting' || e.status === 'Registered');
  const inConsult = demo.encounters.filter((e) => e.status === 'In consultation' || e.status === 'Observation' || e.status === 'Treatment');
  const pendingMeds = demo.administrations.filter((a) => a.status === 'Pending');
  const activeReferrals = demo.referrals.filter((r) => r.status !== 'Follow-up completed' && r.status !== 'Cancelled' && r.status !== 'Declined');
  const activeAllergies = demo.allergies.filter((a) => a.verification === 'Confirmed' || a.verification === 'Suspected');
  const activeEmergencies = demo.emergencies.filter((e) => e.status === 'Active' || e.status === 'Under review');
  return <><div className="hl-kpi-grid">
    <HlMetric icon={Clock3} label="In clinic now" value={String(waiting.length + inConsult.length)} detail={`${waiting.length} waiting · ${inConsult.length} in consultation`} onClick={() => navigateTo('/health/queue')} />
    <HlMetric icon={Pill} label="Medication due" value={String(pendingMeds.length)} detail="Administration tasks pending" tone="gold" onClick={() => navigateTo('/health/administrations')} />
    <HlMetric icon={FileText} label="Active referrals" value={String(activeReferrals.length)} detail="Awaiting appointment or outcome" tone="blue" onClick={() => navigateTo('/health/referrals')} />
    <HlMetric icon={TriangleAlert} label="Medical alerts" value={String(activeAllergies.length)} detail="Confirmed & suspected allergies" tone="red" onClick={() => navigateTo('/health/allergies')} />
  </div>
  {activeAllergies.length > 0 && <div className="hl-allergy-banner"><span><TriangleAlert size={16} /></span><div><strong>Active allergy alerts</strong><small>{activeAllergies.map((a) => `${a.studentName}: ${a.substance}`).join(' · ')}</small></div></div>}
  <div className="hl-main-grid">
    <Panel title="Today's clinic queue" subtitle={`${demo.encounters.filter((e) => e.date === '16 Oct 2026').length} visit(s) today`}>
      <div className="hl-record-list">{demo.encounters.filter((e) => e.date === '16 Oct 2026').map((e) => <div className="hl-record-row" key={e.id}><div><strong>{e.studentName} · {e.encounterNumber}</strong><span>{e.time} · {e.visitType} · {e.presentingComplaint}{e.workingDiagnosis ? ` · ${e.workingDiagnosis}` : ''}</span></div><span className={`hl-status ${e.status === 'Completed' ? 'good' : e.status === 'Cancelled' || e.status === 'Missed' ? 'bad' : e.status === 'Waiting' ? 'warning' : 'info'}`}>{e.status}</span></div>)}</div>
    </Panel>
    <Panel title="Task centre" subtitle="Clinical tasks needing attention">
      <div className="hl-task-list">
        {waiting.length > 0 && <Task title={`${waiting.length} students waiting`} detail={waiting.map((w) => w.studentName).join(', ')} action="See" onClick={() => navigateTo('/health/queue')} />}
        {inConsult.length > 0 && <Task title={`${inConsult.length} in consultation`} detail={inConsult.map((c) => c.studentName).join(', ')} action="Continue" onClick={() => navigateTo('/health/encounters')} />}
        {pendingMeds.length > 0 && <Task title={`${pendingMeds.length} medication doses pending`} detail={pendingMeds.map((m) => `${m.medication} — ${m.studentName}`).join(', ')} action="Administer" onClick={() => navigateTo('/health/administrations')} />}
        {activeReferrals.length > 0 && <Task title={`${activeReferrals.length} active referrals`} detail={activeReferrals.map((r) => `${r.referralNumber} — ${r.destination}`).join(', ')} action="Review" onClick={() => navigateTo('/health/referrals')} />}
        {activeEmergencies.length > 0 && <Task title={`${activeEmergencies.length} active emergency incidents`} detail={activeEmergencies.map((e) => `${e.emergencyNumber} — ${e.type}`).join(', ')} action="Review" onClick={() => navigateTo('/health/emergencies')} />}
        {demo.consents.filter((c) => c.status === 'Requested').length > 0 && <Task title={`${demo.consents.filter((c) => c.status === 'Requested').length} consent requests pending`} detail="Guardian consent needed" action="Follow up" onClick={() => navigateTo('/health/consents')} />}
        {waiting.length === 0 && inConsult.length === 0 && pendingMeds.length === 0 && <Task title="All clear" detail="No pending clinical tasks" action="View" onClick={() => navigateTo('/health/dashboard')} />}
      </div>
    </Panel>
  </div>
  <div className="hl-main-grid hl-lower-grid">
    <Panel title="Recent encounters" subtitle="Latest clinic visits with status">
      <div className="hl-record-list">{demo.encounters.slice(0, 6).map((e) => <div className="hl-record-row" key={e.id}><div><strong>{e.encounterNumber} · {e.studentName}</strong><span>{e.date} {e.time} · {e.visitType} · {e.presentingComplaint}</span></div><span className={`hl-status ${e.status === 'Completed' ? 'good' : e.status === 'Cancelled' || e.status === 'Missed' ? 'bad' : e.status === 'Waiting' ? 'warning' : 'info'}`}>{e.status}</span></div>)}</div>
    </Panel>
    <Panel title="Quick actions" subtitle="Common clinical operations">
      <div className="hl-quick-grid">
        <QuickAction label="Register visit" icon={Plus} onClick={() => navigateTo('/health/queue')} />
        <QuickAction label="Record treatment" icon={Bandage} onClick={() => navigateTo('/health/treatments')} />
        <QuickAction label="Create referral" icon={FileText} onClick={() => navigateTo('/health/referrals')} />
        <QuickAction label="Record emergency" icon={AlertTriangle} onClick={() => navigateTo('/health/emergencies')} />
      </div>
    </Panel>
  </div>
  <Panel title="Alerts" subtitle="Allergy, consent and follow-up alerts">
    <div className="hl-alert-grid">
      {activeAllergies.length > 0 && <AlertCard title="Allergy alerts active" detail={`${activeAllergies.length} confirmed/suspected allergies across students`} tone="red" onClick={() => navigateTo('/health/allergies')} />}
      {demo.consents.filter((c) => c.status === 'Requested').length > 0 && <AlertCard title="Consent pending" detail={`${demo.consents.filter((c) => c.status === 'Requested').length} consent request(s) awaiting guardian response`} tone="gold" onClick={() => navigateTo('/health/consents')} />}
      {demo.profiles.filter((p) => p.reviewStatus === 'Overdue' || p.reviewStatus === 'Needs review').length > 0 && <AlertCard title="Profile review needed" detail={`${demo.profiles.filter((p) => p.reviewStatus === 'Overdue' || p.reviewStatus === 'Needs review').length} health profile(s) need review`} tone="blue" onClick={() => navigateTo('/health/profiles')} />}
    </div>
  </Panel></>;
}

function QueueView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  const [studentId, setStudentId] = useState('');
  const [visitType, setVisitType] = useState<VisitType>('Walk-in');
  const [complaint, setComplaint] = useState('');
  const [onset, setOnset] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentId || !complaint.trim()) { setError('Student and presenting complaint are required.'); return; }
    const result = healthDemo.registerVisit(studentId, visitType, complaint, onset);
    if (result.ok) { setSuccess('Clinic visit registered. Student added to queue.'); setError(''); setStudentId(''); setComplaint(''); setOnset(''); }
    else { setError(result.error ?? 'Registration failed.'); setSuccess(''); }
  };
  const queue = demo.encounters.filter((e) => e.status === 'Waiting' || e.status === 'Registered' || e.status === 'In consultation' || e.status === 'Observation' || e.status === 'Treatment');
  return <><Panel title="Register clinic visit" subtitle="Add a student to today's clinic queue"><form className="hl-form" onSubmit={submit}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
      <label>Student<select value={studentId} onChange={(e) => setStudentId(e.target.value)}><option value="">Select student...</option>{demo.profiles.map((p) => <option key={p.id} value={p.studentId}>{p.studentName} — {p.className}</option>)}</select></label>
      <label>Visit type<select value={visitType} onChange={(e) => setVisitType(e.target.value as VisitType)}><option>Walk-in</option><option>Scheduled</option><option>Follow-up</option><option>Urgent</option><option>Emergency</option></select></label>
      <label>Presenting complaint<input value={complaint} onChange={(e) => setComplaint(e.target.value)} placeholder="e.g. Headache and fever" /></label>
      <label>Symptom onset<input value={onset} onChange={(e) => setOnset(e.target.value)} placeholder="e.g. Last night" /></label>
    </div>
    <button className="hl-button primary" type="submit" disabled={!studentId || !complaint.trim()}><Plus size={15} /> Register visit</button>
    {error && <span className="hl-form-error">{error}</span>}
    {success && <span className="hl-form-message">{success}</span>}
  </form></Panel>
  <Panel title="Clinic queue" subtitle={`${queue.length} student(s) in queue or active consultation`}>
    <div className="hl-record-list">{queue.map((e) => <div className="hl-record-row" key={e.id}><div><strong>{e.studentName} · {e.encounterNumber}</strong><span>{e.time} · {e.visitType} · {e.presentingComplaint}</span></div><span className={`hl-status ${e.status === 'Waiting' ? 'warning' : 'info'}`}>{e.status}</span><div className="hl-row-actions">{e.status === 'Waiting' && <button className="hl-button primary" onClick={() => { const r = healthDemo.startConsultation(e.id); if (!r.ok) alert(r.error); }}>Start consultation</button>}</div></div>)}</div>
  </Panel></>;
}

function EncountersView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  const [selectedEnc, setSelectedEnc] = useState<string>('');
  const enc = demo.encounters.find((e) => e.id === selectedEnc);
  const [assessment, setAssessment] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [disposition, setDisposition] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const complete = () => {
    if (!enc) return;
    const result = healthDemo.completeEncounter(enc.id, assessment, diagnosis, disposition, followUp || null);
    if (result.ok) { setSuccess('Encounter finalized and completed.'); setError(''); setSelectedEnc(''); setAssessment(''); setDiagnosis(''); setDisposition(''); setFollowUp(''); }
    else { setError(result.error ?? 'Completion failed.'); setSuccess(''); }
  };
  return <><Panel title="Encounter register" subtitle={`${demo.encounters.length} encounter(s) · full lifecycle tracking`}>
    <div className="hl-record-list">{demo.encounters.map((e) => <div className="hl-record-row" key={e.id}><div><strong>{e.encounterNumber} · {e.studentName}</strong><span>{e.date} {e.time} · {e.visitType} · {e.presentingComplaint}{e.workingDiagnosis ? ` · Dx: ${e.workingDiagnosis}` : ''}{e.disposition ? ` · ${e.disposition}` : ''}</span></div><span className={`hl-status ${e.status === 'Completed' ? 'good' : e.status === 'Cancelled' || e.status === 'Missed' ? 'bad' : e.status === 'Waiting' ? 'warning' : 'info'}`}>{e.status}</span><div className="hl-row-actions"><button className="hl-link" onClick={() => { setSelectedEnc(e.id); setAssessment(e.assessment); setDiagnosis(e.workingDiagnosis); setDisposition(e.disposition); setFollowUp(e.followUpDate ?? ''); }}>{e.status === 'Completed' ? 'View' : 'Manage'}</button>{e.status !== 'Completed' && e.status !== 'Cancelled' && <button className="hl-link" onClick={() => healthDemo.cancelEncounter(e.id)}>Cancel</button>}</div></div>)}</div>
  </Panel>
  {enc && enc.status !== 'Completed' && enc.status !== 'Cancelled' && <Panel title={`Manage ${enc.encounterNumber}`} subtitle={`${enc.studentName} · ${enc.presentingComplaint}`}>
    <div className="hl-form">
      <label>Clinical assessment<textarea value={assessment} onChange={(e) => setAssessment(e.target.value)} placeholder="Clinical findings and assessment" /></label>
      <label>Working diagnosis (optional)<input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} placeholder="e.g. Viral upper respiratory infection" /></label>
      <label>Disposition (required to complete)<input value={disposition} onChange={(e) => setDisposition(e.target.value)} placeholder="e.g. Rest in sickbay, return to class" /></label>
      <label>Follow-up date (optional)<input value={followUp} onChange={(e) => setFollowUp(e.target.value)} placeholder="e.g. 17 Oct 2026" /></label>
      {enc.status === 'Waiting' && <button className="hl-button secondary" type="button" onClick={() => { const r = healthDemo.startConsultation(enc.id); if (!r.ok) alert(r.error); }}>Start consultation</button>}
      <button className="hl-button primary" type="button" onClick={complete}><CheckCircle2 size={15} /> Finalize & complete</button>
      {error && <span className="hl-form-error">{error}</span>}
      {success && <span className="hl-form-message">{success}</span>}
    </div>
  </Panel>}</>;
}

function ObservationsView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  const [encounterId, setEncounterId] = useState('');
  const [temp, setTemp] = useState('');
  const [pulse, setPulse] = useState('');
  const [rr, setRr] = useState('');
  const [sbp, setSbp] = useState('');
  const [dbp, setDbp] = useState('');
  const [spo2, setSpo2] = useState('');
  const [pain, setPain] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = () => {
    if (!encounterId) { setError('Select an encounter.'); return; }
    const result = healthDemo.recordObservation(encounterId, { temperature: temp ? parseFloat(temp) : null, pulse: pulse ? parseInt(pulse, 10) : null, respiratoryRate: rr ? parseInt(rr, 10) : null, bloodPressureSystolic: sbp ? parseInt(sbp, 10) : null, bloodPressureDiastolic: dbp ? parseInt(dbp, 10) : null, oxygenSaturation: spo2 ? parseInt(spo2, 10) : null, painScore: pain ? parseInt(pain, 10) : null, note });
    if (result.ok) { setSuccess('Observations recorded.'); setError(''); setTemp(''); setPulse(''); setRr(''); setSbp(''); setDbp(''); setSpo2(''); setPain(''); setNote(''); }
    else { setError(result.error ?? 'Recording failed.'); setSuccess(''); }
  };
  return <><Panel title="Record observations" subtitle="Clinical observations with range validation — implausible values are flagged"><div className="hl-form">
    <label>Encounter<select value={encounterId} onChange={(e) => setEncounterId(e.target.value)}><option value="">Select encounter...</option>{demo.encounters.filter((e) => e.status !== 'Completed' && e.status !== 'Cancelled').map((e) => <option key={e.id} value={e.id}>{e.encounterNumber} · {e.studentName}</option>)}</select></label>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
      <label style={{ fontSize: 9 }}>Temp (°C)<input value={temp} onChange={(e) => setTemp(e.target.value)} type="number" placeholder="37.0" /></label>
      <label style={{ fontSize: 9 }}>Pulse (bpm)<input value={pulse} onChange={(e) => setPulse(e.target.value)} type="number" placeholder="80" /></label>
      <label style={{ fontSize: 9 }}>RR (/min)<input value={rr} onChange={(e) => setRr(e.target.value)} type="number" placeholder="18" /></label>
      <label style={{ fontSize: 9 }}>SpO₂ (%)<input value={spo2} onChange={(e) => setSpo2(e.target.value)} type="number" placeholder="98" /></label>
      <label style={{ fontSize: 9 }}>BP systolic<input value={sbp} onChange={(e) => setSbp(e.target.value)} type="number" placeholder="110" /></label>
      <label style={{ fontSize: 9 }}>BP diastolic<input value={dbp} onChange={(e) => setDbp(e.target.value)} type="number" placeholder="70" /></label>
      <label style={{ fontSize: 9 }}>Pain (0-10)<input value={pain} onChange={(e) => setPain(e.target.value)} type="number" placeholder="0" /></label>
    </div>
    <label>Note<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Clinical context and observations" /></label>
    <button className="hl-button primary" type="button" onClick={submit} disabled={!encounterId}><HeartPulse size={15} /> Record observations</button>
    {error && <span className="hl-form-error">{error}</span>}
    {success && <span className="hl-form-message">{success}</span>}
  </div></Panel>
  <Panel title="Observation history" subtitle={`${demo.observations.length} recorded observation set(s)`}>
    <div className="hl-table-wrap"><table className="hl-table"><thead><tr><th>Encounter</th><th>Temp</th><th>Pulse</th><th>RR</th><th>BP</th><th>SpO₂</th><th>Pain</th><th>Recorded by</th><th>Time</th></tr></thead>
    <tbody>{demo.observations.map((o) => { const enc = demo.encounters.find((e) => e.id === o.encounterId); return <tr key={o.id}><td>{enc?.encounterNumber ?? '—'}<br /><small style={{ color: '#a1adb1' }}>{enc?.studentName ?? ''}</small></td><td>{o.temperature ? `${o.temperature}°C` : '—'}</td><td>{o.pulse ?? '—'}</td><td>{o.respiratoryRate ?? '—'}</td><td>{o.bloodPressureSystolic ? `${o.bloodPressureSystolic}/${o.bloodPressureDiastolic}` : '—'}</td><td>{o.oxygenSaturation ? `${o.oxygenSaturation}%` : '—'}</td><td>{o.painScore ?? '—'}</td><td>{o.recordedBy}</td><td>{o.recordedAt}</td></tr>; })}</tbody></table></div>
  </Panel></>;
}

function TreatmentsView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  const [encounterId, setEncounterId] = useState('');
  const [procedure, setProcedure] = useState('');
  const [indication, setIndication] = useState('');
  const [materials, setMaterials] = useState('');
  const [outcome, setOutcome] = useState('');
  const [instructions, setInstructions] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = () => {
    if (!encounterId || !procedure.trim()) { setError('Encounter and procedure are required.'); return; }
    const result = healthDemo.recordTreatment(encounterId, procedure, indication, materials, outcome, instructions, followUp);
    if (result.ok) { setSuccess('Treatment recorded.'); setError(''); setProcedure(''); setIndication(''); setMaterials(''); setOutcome(''); setInstructions(''); setFollowUp(''); }
    else { setError(result.error ?? 'Recording failed.'); setSuccess(''); }
  };
  return <><Panel title="Record treatment" subtitle="Document procedures and treatments performed during clinic encounters"><div className="hl-form">
    <label>Encounter<select value={encounterId} onChange={(e) => setEncounterId(e.target.value)}><option value="">Select encounter...</option>{demo.encounters.filter((e) => e.status !== 'Completed' && e.status !== 'Cancelled').map((e) => <option key={e.id} value={e.id}>{e.encounterNumber} · {e.studentName}</option>)}</select></label>
    <label>Procedure / treatment performed<input value={procedure} onChange={(e) => setProcedure(e.target.value)} placeholder="e.g. Wound cleaning and dressing" /></label>
    <label>Clinical indication<input value={indication} onChange={(e) => setIndication(e.target.value)} placeholder="e.g. Abrasion on left knee" /></label>
    <label>Materials used<input value={materials} onChange={(e) => setMaterials(e.target.value)} placeholder="e.g. Saline, gauze, adhesive dressing" /></label>
    <label>Outcome<input value={outcome} onChange={(e) => setOutcome(e.target.value)} placeholder="e.g. Wound cleaned and dressed. Student comfortable." /></label>
    <label>Instructions given<input value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="e.g. Keep dry, return if redness or swelling" /></label>
    <label>Follow-up plan<input value={followUp} onChange={(e) => setFollowUp(e.target.value)} placeholder="e.g. Review in 2 days" /></label>
    <button className="hl-button primary" type="button" onClick={submit} disabled={!encounterId || !procedure.trim()}><Bandage size={15} /> Record treatment</button>
    {error && <span className="hl-form-error">{error}</span>}
    {success && <span className="hl-form-message">{success}</span>}
  </div></Panel>
  <Panel title="Treatment records" subtitle={`${demo.treatments.length} treatment(s) documented`}>
    <div className="hl-record-list">{demo.treatments.map((t) => { const enc = demo.encounters.find((e) => e.id === t.encounterId); return <div className="hl-record-row" key={t.id}><div><strong>{t.procedure}</strong><span>{enc?.studentName ?? '—'} · {enc?.encounterNumber ?? '—'} · {t.performedAt} · {t.outcome}</span></div></div>; })}</div>
  </Panel></>;
}

function ProfilesView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  return <Panel title="Student health profiles" subtitle={`${demo.profiles.length} profile(s) linked to existing student records`}>
    <div className="hl-table-wrap"><table className="hl-table"><thead><tr><th>Student</th><th>Class</th><th>DOB</th><th>Blood group</th><th>Guardian</th><th>Emergency contact</th><th>Last review</th><th>Review status</th></tr></thead>
    <tbody>{demo.profiles.map((p) => <tr key={p.id}><td><strong>{p.studentName}</strong></td><td>{p.className}</td><td>{p.dateOfBirth}</td><td>{p.bloodGroup}</td><td>{p.guardianName}<br /><small style={{ color: '#a1adb1' }}>{p.guardianPhone}</small></td><td>{p.emergencyContact}<br /><small style={{ color: '#a1adb1' }}>{p.emergencyPhone}</small></td><td>{p.lastReviewDate}</td><td><span className={`hl-status ${p.reviewStatus === 'Current' ? 'good' : p.reviewStatus === 'Needs review' ? 'warning' : 'bad'}`}>{p.reviewStatus}</span></td></tr>)}</tbody></table></div>
  </Panel>;
}

function AllergiesView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  return <><div className="hl-allergy-banner"><span><TriangleAlert size={16} /></span><div><strong>Medical alert system</strong><small>Confirmed and suspected allergies are displayed prominently during clinical workflows</small></div></div>
  <Panel title="Allergy register" subtitle={`${demo.allergies.length} allergy record(s) · confirmed, suspected, reported and unverified`}>
    <div className="hl-table-wrap"><table className="hl-table"><thead><tr><th>Student</th><th>Substance</th><th>Reaction</th><th>Severity</th><th>Verification</th><th>Source</th><th>Date</th><th>Emergency instructions</th></tr></thead>
    <tbody>{demo.allergies.map((a) => <tr key={a.id}><td><strong>{a.studentName}</strong></td><td>{a.substance}</td><td>{a.reaction}</td><td><span className={`hl-status ${a.severity === 'Life-threatening' || a.severity === 'Severe' ? 'bad' : a.severity === 'Moderate' ? 'warning' : 'neutral'}`}>{a.severity}</span></td><td><span className={`hl-status ${a.verification === 'Confirmed' ? 'good' : a.verification === 'Unverified' ? 'warning' : 'info'}`}>{a.verification}</span></td><td>{a.source}</td><td>{a.dateDocumented}</td><td style={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.emergencyInstructions}</td></tr>)}</tbody></table></div>
  </Panel></>;
}

function ConditionsView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  return <Panel title="Chronic conditions" subtitle={`${demo.chronicConditions.length} condition(s) with management plans`}>
    <div className="hl-record-list">{demo.chronicConditions.map((c) => <div className="hl-record-row" key={c.id}><div><strong>{c.studentName} — {c.condition}</strong><span>Diagnosed: {c.diagnosedDate} · Source: {c.source} · Management: {c.managementPlan}</span></div><span className={`hl-status ${c.active ? 'info' : 'neutral'}`}>{c.active ? 'Active' : 'Resolved'}</span></div>)}</div>
  </Panel>;
}

function MedicationsView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  return <Panel title="Medication orders" subtitle={`${demo.medicationOrders.length} order(s) · active, completed and discontinued`}>
    <div className="hl-table-wrap"><table className="hl-table"><thead><tr><th>Student</th><th>Medication</th><th>Form</th><th>Strength</th><th>Dose</th><th>Route</th><th>Frequency</th><th>Indication</th><th>Prescriber</th><th>Consent</th><th>Status</th></tr></thead>
    <tbody>{demo.medicationOrders.map((o) => <tr key={o.id}><td><strong>{o.studentName}</strong></td><td>{o.medication}</td><td>{o.formulation}</td><td>{o.strength}</td><td>{o.dose}</td><td>{o.route}</td><td>{o.frequency}</td><td style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.indication}</td><td>{o.prescriber}</td><td><span className={`hl-status ${o.consentStatus === 'Received' ? 'good' : 'warning'}`}>{o.consentStatus}</span></td><td><span className={`hl-status ${o.status === 'Active' ? 'info' : o.status === 'Discontinued' ? 'bad' : 'good'}`}>{o.status}</span></td></tr>)}</tbody></table></div>
  </Panel>;
}

function AdministrationsView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  return <Panel title="Medication administration records" subtitle={`${demo.administrations.length} record(s) · administered, refused, omitted and pending`}>
    <div className="hl-table-wrap"><table className="hl-table"><thead><tr><th>Student</th><th>Medication</th><th>Scheduled</th><th>Actual</th><th>Dose</th><th>Route</th><th>By</th><th>Status</th><th>Reason</th><th>Actions</th></tr></thead>
    <tbody>{demo.administrations.map((a) => <tr key={a.id}><td><strong>{a.studentName}</strong></td><td>{a.medication}</td><td>{a.scheduledTime}</td><td>{a.actualTime ?? '—'}</td><td>{a.dose}</td><td>{a.route}</td><td>{a.administeredBy || '—'}</td><td><span className={`hl-status ${a.status === 'Administered' ? 'good' : a.status === 'Refused' || a.status === 'Omitted' ? 'bad' : 'warning'}`}>{a.status}</span></td><td style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.reason}</td><td>{a.status === 'Pending' && <><button className="hl-button primary" onClick={() => { const r = healthDemo.administerMedication(a.orderId); if (!r.ok) alert(r.error); }}>Administer</button><button className="hl-link" onClick={() => { const reason = refuseReason || prompt('Reason for refusal/omission:'); if (reason) { const r = healthDemo.refuseMedication(a.orderId, reason); if (!r.ok) alert(r.error); } }}>Refuse</button></>}</td></tr>)}</tbody></table></div>
  </Panel>;
}

function ReferralsView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  const [studentId, setStudentId] = useState('');
  const [reason, setReason] = useState('');
  const [urgency, setUrgency] = useState<ReferralUrgency>('Routine');
  const [destination, setDestination] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentId || !reason.trim() || !destination.trim()) { setError('Student, reason and destination are required.'); return; }
    const result = healthDemo.createReferral(studentId, reason, urgency, destination, summary);
    if (result.ok) { setSuccess('Referral created and guardian notified.'); setError(''); setStudentId(''); setReason(''); setDestination(''); setSummary(''); }
    else { setError(result.error ?? 'Creation failed.'); setSuccess(''); }
  };
  return <><Panel title="Create referral" subtitle="Refer a student to an external healthcare provider"><form className="hl-form" onSubmit={submit}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
      <label>Student<select value={studentId} onChange={(e) => setStudentId(e.target.value)}><option value="">Select student...</option>{demo.profiles.map((p) => <option key={p.id} value={p.studentId}>{p.studentName} — {p.className}</option>)}</select></label>
      <label>Urgency<select value={urgency} onChange={(e) => setUrgency(e.target.value as ReferralUrgency)}><option>Routine</option><option>Urgent</option><option>Emergency</option></select></label>
    </div>
    <label>Reason for referral<input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Recurrent headaches — needs neurological assessment" /></label>
    <label>Destination<input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Gertrude's Children's Hospital — Neurology" /></label>
    <label>Clinical summary<textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Relevant clinical history and findings" /></label>
    <button className="hl-button primary" type="submit" disabled={!studentId || !reason.trim() || !destination.trim()}><FileText size={15} /> Create referral</button>
    {error && <span className="hl-form-error">{error}</span>}
    {success && <span className="hl-form-message">{success}</span>}
  </form></Panel>
  <Panel title="Referral register" subtitle={`${demo.referrals.length} referral(s) · draft to follow-up completed`}>
    <div className="hl-record-list">{demo.referrals.map((r) => <div className="hl-record-row" key={r.id}><div><strong>{r.referralNumber} · {r.studentName}</strong><span>{r.destination} · {r.urgency} · {r.reason}{r.outcome ? ` · Outcome: ${r.outcome}` : ''}{r.followUpDue ? ` · Follow-up: ${r.followUpDue}` : ''}</span></div><span className={`hl-status ${r.status === 'Follow-up completed' ? 'good' : r.status === 'Cancelled' || r.status === 'Declined' ? 'bad' : r.status === 'Outcome received' || r.status === 'Attended' ? 'info' : 'warning'}`}>{r.status}</span><div className="hl-row-actions">{r.status === 'Issued' && <button className="hl-button secondary" onClick={() => healthDemo.updateReferralStatus(r.id, 'Appointment pending', '')}>Mark appointment</button>}{r.status === 'Appointment pending' && <button className="hl-button secondary" onClick={() => healthDemo.updateReferralStatus(r.id, 'Attended', '')}>Mark attended</button>}{r.status === 'Attended' && <button className="hl-button secondary" onClick={() => healthDemo.updateReferralStatus(r.id, 'Outcome received', prompt('Enter outcome:') || '')}>Record outcome</button>}{r.status === 'Outcome received' && <button className="hl-button primary" onClick={() => healthDemo.updateReferralStatus(r.id, 'Follow-up completed', '')}>Complete</button>}</div></div>)}</div>
  </Panel></>;
}

function EmergenciesView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  const [studentId, setStudentId] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [observations, setObservations] = useState('');
  const [actions, setActions] = useState('');
  const [guardian, setGuardian] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentId || !type.trim() || !description.trim()) { setError('Student, emergency type and description are required.'); return; }
    const result = healthDemo.recordEmergency(studentId, type, description, observations, actions, guardian);
    if (result.ok) { setSuccess('Emergency recorded. Guardian notified.'); setError(''); setStudentId(''); setType(''); setDescription(''); setObservations(''); setActions(''); setGuardian(''); }
    else { setError(result.error ?? 'Recording failed.'); setSuccess(''); }
  };
  return <><Panel title="Record emergency" subtitle="Register a critical health incident with time-stamped timeline"><form className="hl-form" onSubmit={submit}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
      <label>Student<select value={studentId} onChange={(e) => setStudentId(e.target.value)}><option value="">Select student...</option>{demo.profiles.map((p) => <option key={p.id} value={p.studentId}>{p.studentName} — {p.className}</option>)}</select></label>
      <label>Emergency type<input value={type} onChange={(e) => setType(e.target.value)} placeholder="e.g. Severe allergic reaction" /></label>
    </div>
    <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What happened and current condition" /></label>
    <label>Initial observations<input value={observations} onChange={(e) => setObservations(e.target.value)} placeholder="Vital signs, consciousness, visible symptoms" /></label>
    <label>Actions taken<input value={actions} onChange={(e) => setActions(e.target.value)} placeholder="First aid, medication, stabilization steps" /></label>
    <label>Guardian contact<input value={guardian} onChange={(e) => setGuardian(e.target.value)} placeholder="Guardian contacted at... (time and outcome)" /></label>
    <button className="hl-button danger" type="submit" disabled={!studentId || !type.trim() || !description.trim()}><AlertTriangle size={15} /> Record emergency</button>
    {error && <span className="hl-form-error">{error}</span>}
    {success && <span className="hl-form-message">{success}</span>}
  </form></Panel>
  {demo.emergencies.map((emr) => <Panel key={emr.id} title={`${emr.emergencyNumber} — ${emr.type}`} subtitle={`${emr.studentName} · ${emr.date} ${emr.time} · Status: ${emr.status}`}>
    <div className="hl-record-list">
      <div className="hl-record-row"><div><strong>Description</strong><span>{emr.description}</span></div></div>
      <div className="hl-record-row"><div><strong>Initial observations</strong><span>{emr.initialObservations}</span></div></div>
      <div className="hl-record-row"><div><strong>Actions taken</strong><span>{emr.actionsTaken}</span></div></div>
      <div className="hl-record-row"><div><strong>Guardian contact</strong><span>{emr.guardianContacted}</span></div></div>
      {emr.receivingFacility && <div className="hl-record-row"><div><strong>Receiving facility</strong><span>{emr.receivingFacility}</span></div></div>}
    </div>
    <div className="hl-panel-head"><div><h2>Event timeline</h2><p>Time-stamped chronological record</p></div>{emr.status !== 'Resolved' && <button className="hl-button primary" onClick={() => { const r = healthDemo.resolveEmergency(emr.id); if (!r.ok) alert(r.error); }}>Resolve</button>}</div>
    <div className="hl-timeline">{emr.timeline.map((t, i) => <div className="hl-timeline-item" key={i}><span className="hl-timeline-time">{t.time}</span><span className="hl-timeline-event">{t.event}</span></div>)}</div>
  </Panel>)}</>;
}

function ConsentsView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  return <Panel title="Consent records" subtitle={`${demo.consents.length} consent(s) · requested, received, declined and withdrawn`}>
    <div className="hl-table-wrap"><table className="hl-table"><thead><tr><th>Student</th><th>Type</th><th>Scope</th><th>Status</th><th>Source</th><th>Date</th><th>Document</th><th>Actions</th></tr></thead>
    <tbody>{demo.consents.map((c) => <tr key={c.id}><td><strong>{c.studentName}</strong></td><td>{c.type}</td><td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.scope}</td><td><span className={`hl-status ${c.status === 'Received' ? 'good' : c.status === 'Declined' || c.status === 'Withdrawn' ? 'bad' : c.status === 'Requested' ? 'warning' : 'neutral'}`}>{c.status}</span></td><td>{c.source}</td><td>{c.date}</td><td>{c.documentRef || '—'}</td><td>{c.status === 'Requested' && <><button className="hl-link" onClick={() => healthDemo.updateConsent(c.id, 'Received')}>Mark received</button><button className="hl-link" onClick={() => healthDemo.updateConsent(c.id, 'Declined')}>Mark declined</button></>}</td></tr>)}</tbody></table></div>
  </Panel>;
}

function ImmunizationsView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  return <Panel title="Immunization records" subtitle={`${demo.immunizations.length} record(s) · source-verified and self-reported`}>
    <div className="hl-table-wrap"><table className="hl-table"><thead><tr><th>Student</th><th>Vaccine</th><th>Dose</th><th>Date administered</th><th>Source</th><th>Verified</th></tr></thead>
    <tbody>{demo.immunizations.map((i) => <tr key={i.id}><td><strong>{i.studentName}</strong></td><td>{i.vaccine}</td><td>{i.doseNumber}</td><td>{i.dateAdministered}</td><td>{i.source}</td><td><span className={`hl-status ${i.verified ? 'good' : 'warning'}`}>{i.verified ? 'Verified' : 'Unverified'}</span></td></tr>)}</tbody></table></div>
  </Panel>;
}

function NotificationsView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  return <><div className="hl-allergy-banner"><span><ShieldCheck size={16} /></span><div><strong>Privacy-protected notifications</strong><small>All guardian notifications use neutral wording. Clinical details are never exposed in push notifications or message previews.</small></div></div>
  <Panel title="Health notifications" subtitle={`${demo.notifications.length} notification(s) sent to guardians`}>
    <div className="hl-record-list">{demo.notifications.map((n) => <div className="hl-record-row" key={n.id}><div><strong>{n.title}</strong><span>{n.recipient} · {n.detail} · {n.createdDate} · {n.deliveryStatus}</span></div>{n.unread && <button className="hl-link" onClick={() => healthDemo.markNotificationRead(n.id)}>Mark read</button>}</div>)}</div>
  </Panel></>;
}

function ReportsView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  const reports = [
    { title: 'Clinic visit trends', desc: `${demo.encounters.length} total encounters by date and category` },
    { title: 'Presenting complaints', desc: 'Common complaints in appropriately aggregated form' },
    { title: 'Follow-up completion', desc: `${demo.encounters.filter((e) => e.followUpDate).length} follow-up(s) scheduled` },
    { title: 'Referral status', desc: `${demo.referrals.length} referral(s) with outcome tracking` },
    { title: 'Medication administration audit', desc: `${demo.administrations.length} administration record(s)` },
    { title: 'Allergy and alert summary', desc: `${demo.allergies.length} active allergy alert(s)` },
    { title: 'Emergency incidents', desc: `${demo.emergencies.length} emergency incident(s) recorded` },
    { title: 'Consent status report', desc: `${demo.consents.length} consent record(s)` },
    { title: 'Profile review status', desc: `${demo.profiles.filter((p) => p.reviewStatus !== 'Current').length} profile(s) need review` },
  ];
  return <div className="hl-report-grid">{reports.map((r) => <div key={r.title} className="hl-report-card"><Activity size={18} style={{ color: '#2d8f73' }} /><strong>{r.title}</strong><span>{r.desc}</span></div>)}</div>;
}

function AuditView({ demo }: { demo: ReturnType<typeof useHealthDemo> }) {
  return <Panel title="Audit history" subtitle={`${demo.audit.length} recorded clinical action(s)`}>
    <div style={{ padding: '0 20px 16px' }}>{demo.audit.map((a) => <div className="hl-audit-row" key={a.id}><i /><span>{a.timestamp}</span><strong>{a.actor} — {a.action}</strong><span style={{ flex: 1, color: '#839098' }}>{a.target}</span></div>)}</div>
  </Panel>;
}

function SettingsView() {
  return <Panel title="Settings" subtitle="Health centre configuration and demo controls">
    <div className="hl-form">
      <label>Notification privacy<select disabled><option>Neutral wording — no clinical details in notifications</option></select></label>
      <label>Observation range validation<select disabled><option>Enabled — implausible values flagged for confirmation</option></select></label>
      <label>Duplicate administration prevention<select disabled><option>Enabled — prevents double-click duplicate MAR entries</option></select></label>
      <label>Clinical records append-only<select disabled><option>Enabled — finalized records cannot be silently overwritten</option></select></label>
      <label>Emergency access<select disabled><option>Requires reason and audit logging</option></select></label>
      <button className="hl-button secondary" type="button" onClick={() => healthDemo.reset()}><RotateCcw size={15} /> Reset demo data</button>
    </div>
  </Panel>;
}
