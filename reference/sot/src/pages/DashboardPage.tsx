import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '@/erp.css';
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BusFront,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  Trophy,
  Users,
  WalletCards,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Role = 'Administrator' | 'Headteacher' | 'Academic' | 'Teacher' | 'Bursar' | 'HR & Payroll' | 'Registrar' | 'Parent';
type Section = 'Overview' | 'Students' | 'Academics' | 'Attendance' | 'Finance' | 'HR & Payroll' | 'Website CMS' | 'Reports';

type Student = { name: string; admission: string; className: string; mode: 'Day' | 'Boarding'; balance: number; attendance: number; status: 'Active' | 'Pending'; };

type NavItem = { label: Section; icon: LucideIcon; count?: string };

const students: Student[] = [
  { name: 'Amani Wanjiku', admission: 'RA-2022-041', className: 'Year 6 — Cedar', mode: 'Boarding', balance: 0, attendance: 97, status: 'Active' },
  { name: 'Brian Otieno', admission: 'RA-2023-118', className: 'Year 8 — Acacia', mode: 'Day', balance: 18400, attendance: 91, status: 'Active' },
  { name: 'Chloe Njeri', admission: 'RA-2024-207', className: 'Form 2 — Tana', mode: 'Boarding', balance: 62500, attendance: 88, status: 'Pending' },
  { name: 'Dylan Kamau', admission: 'RA-2021-062', className: 'Form 4 — Athi', mode: 'Day', balance: 0, attendance: 95, status: 'Active' },
];

const roles: Role[] = ['Administrator', 'Headteacher', 'Academic', 'Teacher', 'Bursar', 'HR & Payroll', 'Registrar', 'Parent'];

const navGroups: { title: string; items: NavItem[] }[] = [
  { title: 'Workspace', items: [{ label: 'Overview', icon: LayoutDashboard }, { label: 'Students', icon: Users, count: '1,248' }, { label: 'Academics', icon: BookOpen }, { label: 'Attendance', icon: ClipboardCheck }] },
  { title: 'Operations', items: [{ label: 'Finance', icon: CircleDollarSign }, { label: 'HR & Payroll', icon: WalletCards }, { label: 'Website CMS', icon: Sparkles }, { label: 'Reports', icon: BarChart3 }] },
];

const portalLinks: { label: string; path: string; icon: LucideIcon; desc: string }[] = [
  { label: 'Finance', path: '/finance/dashboard', icon: CircleDollarSign, desc: 'Fees, payments, expenses' },
  { label: 'Procurement', path: '/procurement/dashboard', icon: Package, desc: 'Purchasing, stores, inventory' },
  { label: 'Health Centre', path: '/health/dashboard', icon: Stethoscope, desc: 'Clinic, medical records' },
  { label: 'Transport', path: '/transport/dashboard', icon: BusFront, desc: 'Fleet, routes, trips' },
  { label: 'HR & Payroll', path: '/hr/dashboard', icon: WalletCards, desc: 'Staff, leave, payroll' },
  { label: 'Library', path: '/library/dashboard', icon: BookOpen, desc: 'Catalog, loans, fines' },
  { label: 'Teacher', path: '/teacher/dashboard', icon: Users, desc: 'Classes, marking, plans' },
  { label: 'Prefect & Leadership', path: '/prefect/dashboard', icon: ShieldCheck, desc: 'Prefects, duties, incidents' },
  { label: 'Boarding & Dormitory', path: '/boarding/dashboard', icon: BookOpen, desc: 'Houses, beds, roll calls' },
  { label: 'Games & Sports', path: '/sports/dashboard', icon: Trophy, desc: 'Teams, fixtures, equipment' },
  { label: 'Timetable Centre', path: '/timetable/dashboard', icon: CalendarDays, desc: 'Schedules, conflicts, adjustments' },
  { label: 'Headteacher Portal', path: '/headteacher/dashboard', icon: ShieldCheck, desc: 'Approvals, briefings, oversight' },
  { label: 'Co-Curricular', path: '/cocurricular/dashboard', icon: Trophy, desc: 'Clubs, competitions, trips' },
  { label: 'Science Labs', path: '/science-lab/dashboard', icon: BookOpen, desc: 'Labs, equipment, chemicals' },
  { label: 'Computer Labs', path: '/computer-lab/dashboard', icon: Users, desc: 'Workstations, software, tickets' },
  { label: 'Directors\' Governance', path: '/directors/dashboard', icon: ShieldCheck, desc: 'Board oversight, risks, resolutions' },
];

const roleCopy: Record<Role, { title: string; subtitle: string; initials: string; focus: string }> = {
  Administrator: { title: 'Good morning, Miriam', subtitle: 'Here is what is happening across Riverside Academy today.', initials: 'MN', focus: 'School command centre' },
  Headteacher: { title: 'Good morning, Dr. Mwangi', subtitle: 'Your school-wide priorities and approvals at a glance.', initials: 'JM', focus: 'School leadership' },
  Academic: { title: 'Good morning, Grace', subtitle: 'Keep learning on track with today’s academic signals.', initials: 'GW', focus: 'Academic operations' },
  Teacher: { title: 'Good morning, Samuel', subtitle: 'Your classes, marking queue and timetable for today.', initials: 'SK', focus: 'Teaching workspace' },
  Bursar: { title: 'Good morning, Lydia', subtitle: 'Monitor collections, balances and finance approvals.', initials: 'LO', focus: 'Finance operations' },
  'HR & Payroll': { title: 'Good morning, Peter', subtitle: 'People operations, leave and payroll readiness.', initials: 'PO', focus: 'People operations' },
  Registrar: { title: 'Good morning, Esther', subtitle: 'Admissions and enrollment tasks ready for review.', initials: 'EN', focus: 'Admissions desk' },
  Parent: { title: 'Welcome back, Wanjiku', subtitle: 'A clear view of your children’s school day.', initials: 'WN', focus: 'Family portal' },
};

const monthDays = [
  { day: 'Mon', date: '24', events: [{ label: '09:00–10:00', title: 'Mathematics Y6', tone: 'blue' }, { label: '13:00–14:00', title: 'Science Y6', tone: 'teal' }] },
  { day: 'Tue', date: '25', events: [{ label: '10:00–11:00', title: 'English Y6', tone: 'gold' }, { label: '14:00–15:00', title: 'Club hour', tone: 'pink' }] },
  { day: 'Wed', date: '26', events: [{ label: '10:00–11:00', title: 'History Y6', tone: 'pink' }, { label: '12:00–13:00', title: 'Geography Y6', tone: 'blue' }] },
  { day: 'Thu', date: '27', events: [{ label: '09:00–10:00', title: 'Spanish Y6', tone: 'blue' }, { label: '13:00–14:00', title: 'Science Y6', tone: 'teal' }] },
  { day: 'Fri', date: '28', events: [{ label: '09:00–10:00', title: 'PE — Main field', tone: 'teal' }, { label: '15:00–16:00', title: 'Assembly', tone: 'gold' }] },
  { day: 'Sat', date: '01', events: [{ label: '12:00–13:00', title: 'Geography Y6', tone: 'blue' }] },
  { day: 'Sun', date: '02', events: [] },
];

const toneClasses: Record<string, string> = { blue: 'bg-[#2c94c5]', teal: 'bg-[#427f73]', gold: 'bg-[#c29b38]', pink: 'bg-[#b24b8b]' };

export function DashboardPage() {
  const [role, setRole] = useState<Role>('Administrator');
  const [section, setSection] = useState<Section>('Overview');
  const [mobileNav, setMobileNav] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showCms, setShowCms] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [heroText, setHeroText] = useState('Nurturing minds. Building character.');
  const [demoStudents, setDemoStudents] = useState<Student[]>(students);
  const copy = roleCopy[role];
  const filteredStudents = useMemo(() => demoStudents.filter((student) => `${student.name} ${student.className} ${student.admission}`.toLowerCase().includes(search.toLowerCase())), [demoStudents, search]);

  const changeRole = (nextRole: Role) => {
    setRole(nextRole);
    setSection('Overview');
    setShowRoleMenu(false);
  };

  const recordPayment = () => {
    setDemoStudents((currentStudents) => currentStudents.map((student) => student.name === 'Brian Otieno' ? { ...student, balance: 0 } : student));
    setPaymentMessage('Demo payment recorded for Brian Otieno. Ledger, balance and receipt queues are now in sync.');
    setShowPayment(false);
  };

  return (
    <div className="erp-app">
      <aside className={`erp-sidebar ${mobileNav ? 'erp-sidebar-open' : ''}`}>
        <div className="erp-brand">
          <div className="erp-brand-mark"><GraduationCap size={21} /></div>
          <div><strong>Riverside</strong><span>Academy ERP</span></div>
          <button className="erp-mobile-close" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <div className="erp-demo-pill"><span className="erp-demo-dot" /> DEMO MODE <span>·</span> Oct 2026</div>
        <div className="erp-school-switcher"><div className="erp-school-avatar">RA</div><div><strong>Riverside Academy</strong><span>Primary & Secondary</span></div><ChevronDown size={15} /></div>
        <nav className="erp-nav">
          {navGroups.map((group) => <div key={group.title} className="erp-nav-group"><p>{group.title}</p>{group.items.map(({ label, icon: Icon, count }) => <button key={label} onClick={() => { setSection(label); setMobileNav(false); }} className={`erp-nav-item ${section === label ? 'active' : ''}`}><Icon size={17} /><span>{label}</span>{count && <em>{count}</em>}</button>)}</div>)}
          <div className="erp-nav-group"><p>Portals</p>{portalLinks.map(({ label, path, icon: Icon }) => <Link key={path} to={path} className="erp-nav-item" onClick={() => setMobileNav(false)}><Icon size={17} /><span>{label}</span><ArrowUpRight size={13} /></Link>)}</div>
        </nav>
        <div className="erp-sidebar-bottom"><button className="erp-nav-item" onClick={() => setSection('Reports')}><Settings size={17} /><span>Settings</span></button><div className="erp-user-mini"><div className="erp-avatar">{copy.initials}</div><div><strong>{role === 'Administrator' ? 'Miriam Njoroge' : copy.initials}</strong><span>{copy.focus}</span></div><MoreHorizontal size={17} /></div></div>
      </aside>

      <main className="erp-main">
        <header className="erp-topbar"><button className="erp-menu-button" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="erp-breadcrumb"><span>Riverside Academy</span><b>/</b><strong>{section}</strong></div><div className="erp-top-actions"><div className="erp-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students, invoices..." /></div><button className="erp-icon-button" aria-label="Notifications"><Bell size={18} /><i /></button><div className="erp-role-wrap"><button className="erp-profile" onClick={() => setShowRoleMenu(!showRoleMenu)}><div className="erp-avatar">{copy.initials}</div><span>{role}</span><ChevronDown size={15} /></button>{showRoleMenu && <div className="erp-role-menu"><small>Switch demo role</small>{roles.map((item) => <button key={item} className={item === role ? 'selected' : ''} onClick={() => changeRole(item)}>{item}{item === role && <Check size={14} />}</button>)}</div>}</div></div></header>

        <div className="erp-content">
          <div className="erp-page-head"><div><div className="erp-kicker"><ShieldCheck size={14} /> Secure workspace <span>•</span> 2026 / Term 3</div><h1>{copy.title}</h1><p>{copy.subtitle}</p></div><div className="erp-head-actions"><button className="erp-button secondary"><CalendarDays size={16} /> Term 3 <ChevronDown size={14} /></button><button className="erp-button primary" onClick={() => setShowPayment(true)}><Plus size={16} /> Quick action</button></div></div>
          {paymentMessage && <div className="erp-toast"><CheckCircle2 size={17} /> {paymentMessage}<button onClick={() => setPaymentMessage('')}><X size={15} /></button></div>}

          {section === 'Overview' && <Overview role={role} students={demoStudents} onPayment={() => setShowPayment(true)} onCms={() => setShowCms(true)} />}
          {section === 'Students' && <StudentsView students={filteredStudents} search={search} />}
          {section === 'Academics' && <AcademicsView />}
          {section === 'Attendance' && <AttendanceView />}
          {section === 'Finance' && <FinanceView students={demoStudents} onPayment={() => setShowPayment(true)} />}
          {section === 'HR & Payroll' && <HrView />}
          {section === 'Website CMS' && <CmsView heroText={heroText} setHeroText={setHeroText} />}
          {section === 'Reports' && <ReportsView />}
        </div>
      </main>

      {showPayment && <Modal title="Record a demo payment" onClose={() => setShowPayment(false)}><div className="erp-form-grid"><label>Student<select defaultValue="Brian Otieno"><option>Brian Otieno — RA-2023-118</option><option>Chloe Njeri — RA-2024-207</option></select></label><label>Amount<input defaultValue="18400" type="number" /></label><label>Payment method<select defaultValue="M-Pesa demo"><option>M-Pesa demo</option><option>Bank transfer demo</option><option>Cash receipt demo</option></select></label><label>Reference<input defaultValue="DEMO-20261016-014" /></label></div><div className="erp-modal-note"><ShieldCheck size={16} /> Demo mode only. No real payment provider is contacted.</div><div className="erp-modal-actions"><button className="erp-button secondary" onClick={() => setShowPayment(false)}>Cancel</button><button className="erp-button primary" onClick={recordPayment}>Record payment</button></div></Modal>}
      {showCms && <Modal title="Edit homepage banner" onClose={() => setShowCms(false)}><label className="erp-field-label">Hero headline<input value={heroText} onChange={(event) => setHeroText(event.target.value)} /></label><p className="erp-modal-copy">This change is stored in the demo workspace and is immediately reflected in the public-site preview record.</p><div className="erp-modal-actions"><button className="erp-button secondary" onClick={() => setShowCms(false)}>Cancel</button><button className="erp-button primary" onClick={() => { setShowCms(false); setSection('Website CMS'); }}>Save draft</button></div></Modal>}
    </div>
  );
}

function Overview({ role, students: records, onPayment, onCms }: { role: Role; students: Student[]; onPayment: () => void; onCms: () => void }) {
  const kpis = role === 'Teacher' ? [{ label: 'Assigned classes', value: '8', change: '+1 this term', icon: BookOpen, tone: 'blue' }, { label: 'Students', value: '214', change: '+12%', icon: Users, tone: 'teal' }, { label: 'Marking queue', value: '34', change: '12 due today', icon: ClipboardCheck, tone: 'gold' }, { label: 'Attendance', value: '96.4%', change: '+2.1%', icon: CheckCircle2, tone: 'green' }] : role === 'Bursar' ? [{ label: 'Collected this term', value: 'KES 18.4M', change: '+8.4%', icon: CircleDollarSign, tone: 'green' }, { label: 'Outstanding', value: 'KES 4.8M', change: '-6.2%', icon: ArrowDownRight, tone: 'gold' }, { label: 'Unmatched payments', value: '12', change: 'Needs review', icon: AlertCircle, tone: 'pink' }, { label: 'Awaiting approval', value: '8', change: 'Today', icon: Clock3, tone: 'blue' }] : [{ label: 'Students enrolled', value: '1,248', change: '+6.8% this term', icon: Users, tone: 'blue' }, { label: 'Attendance today', value: '94.2%', change: '+1.4% vs last week', icon: CheckCircle2, tone: 'green' }, { label: 'Fees collected', value: 'KES 18.4M', change: '+8.4% this term', icon: CircleDollarSign, tone: 'teal' }, { label: 'Open tasks', value: '27', change: '8 need attention', icon: ClipboardCheck, tone: 'gold' }];
  return <>
    <div className="erp-kpi-grid">{kpis.map(({ label, value, change, icon: Icon, tone }) => <div className="erp-kpi" key={label}><div className={`erp-kpi-icon ${tone}`}><Icon size={19} /></div><div className="erp-kpi-label">{label}</div><strong>{value}</strong><span className={change.includes('+') ? 'positive' : ''}>{change.includes('+') && <ArrowUpRight size={13} />}{change}</span></div>)}</div>
    <div className="erp-main-grid"><section className="erp-card timeline-card"><div className="erp-card-head"><div><h2>Timeline view</h2><p>Prioritised activity across the school</p></div><button className="erp-link-button">View all <ArrowUpRight size={14} /></button></div><div className="erp-timeline">{[{ color: 'pink', title: 'Assessment moderation', meta: 'Year 6 Mathematics · 8 submissions', time: 'Due today', action: 'Review' }, { color: 'teal', title: 'Parent meeting', meta: 'Amani Wanjiku · Student welfare', time: '10:00–11:00', action: 'View details' }, { color: 'gold', title: 'Fee reconciliation', meta: '12 unmatched M-Pesa references', time: 'Today', action: 'Open queue' }, { color: 'blue', title: 'National Day Celebration', meta: 'All school · Main campus', time: '30 Oct 2026', action: 'Read brief' }].map((item) => <div className="erp-timeline-item" key={item.title}><span className={`timeline-dot ${item.color}`} /><div className="timeline-copy"><strong>{item.title}</strong><span>{item.meta}</span><small>{item.time}</small></div><button>{item.action}</button></div>)}</div></section><section className="erp-card"><div className="erp-card-head"><div><h2>Attendance trend</h2><p>Last 7 school days</p></div><button className="erp-icon-button plain"><MoreHorizontal size={17} /></button></div><div className="erp-chart"><div className="chart-y"><span>100%</span><span>90%</span><span>80%</span></div><div className="chart-plot"><div className="chart-grid-lines"><i /><i /><i /><i /></div><svg viewBox="0 0 420 150" preserveAspectRatio="none" aria-label="Attendance trend chart"><path d="M0 105 C40 95 45 100 80 88 S125 78 160 91 S205 60 240 72 S285 70 315 47 S370 52 420 28" fill="none" stroke="#2c94c5" strokeWidth="3" /><path d="M0 105 C40 95 45 100 80 88 S125 78 160 91 S205 60 240 72 S285 70 315 47 S370 52 420 28 L420 150 L0 150Z" fill="url(#fill)" opacity=".16" /><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#2c94c5" /><stop offset="1" stopColor="#2c94c5" stopOpacity="0" /></linearGradient></defs></svg><div className="chart-x"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Today</span></div></div></div><div className="chart-summary"><strong>94.2%</strong><span><ArrowUpRight size={13} /> 1.4% from last week</span></div></section></div>
    <div className="erp-main-grid lower-grid"><section className="erp-card timetable-card"><div className="erp-card-head"><div><h2>Timetable</h2><p>Week of 24–30 October 2026</p></div><div className="segmented"><button>Day</button><button className="selected">Week</button><button>Month</button></div></div><div className="timetable-grid">{monthDays.map((day) => <div className="timetable-day" key={day.date}><div className="timetable-day-head"><span>{day.day}</span><strong>{day.date}</strong></div>{day.events.map((event) => <div className={`timetable-event ${toneClasses[event.tone]}`} key={event.title}><small>{event.label}</small><strong>{event.title}</strong></div>)}</div>)}</div></section><section className="erp-card quick-card"><div className="erp-card-head"><div><h2>Quick actions</h2><p>Common school tasks</p></div><SlidersHorizontal size={16} className="muted-icon" /></div><div className="quick-actions"><button onClick={onPayment}><CircleDollarSign size={19} /><span>Record payment</span><ArrowUpRight size={14} /></button><button><ClipboardCheck size={19} /><span>Take attendance</span><ArrowUpRight size={14} /></button><button><FileText size={19} /><span>Create report</span><ArrowUpRight size={14} /></button><button onClick={onCms}><Sparkles size={19} /><span>Edit website</span><ArrowUpRight size={14} /></button></div></section></div>
    <div className="erp-main-grid final-grid"><section className="erp-card table-card"><div className="erp-card-head"><div><h2>Students needing attention</h2><p>Linked records from admissions, attendance and finance</p></div><button className="erp-link-button">Open directory <ArrowUpRight size={14} /></button></div><StudentTable compact students={records} /></section><section className="erp-card approvals-card"><div className="erp-card-head"><div><h2>Approval queue</h2><p>Items requiring an authorised decision</p></div><span className="count-badge">8</span></div><div className="approval-list">{[{ icon: WalletCards, title: 'Purchase request', detail: 'Science lab equipment · KES 184,000', tone: 'blue' }, { icon: CalendarDays, title: 'Leave request', detail: 'Mary Njoki · 3 school days', tone: 'pink' }, { icon: Award, title: 'Marks moderation', detail: 'Form 2 Mathematics · 42 scripts', tone: 'gold' }].map(({ icon: Icon, title, detail, tone }) => <div className="approval-item" key={title}><div className={`approval-icon ${tone}`}><Icon size={17} /></div><div><strong>{title}</strong><span>{detail}</span></div><button aria-label={`Review ${title}`}><ArrowUpRight size={15} /></button></div>)}</div></section></div>
    <section className="erp-card"><div className="erp-card-head"><div><h2>Departmental portals</h2><p>Open a dedicated workspace with its own navigation and data</p></div></div><div className="erp-portal-grid">{portalLinks.map(({ label, path, icon: Icon, desc }) => <Link key={path} to={path} className="erp-portal-card"><div className="erp-portal-icon"><Icon size={20} /></div><div><strong>{label}</strong><span>{desc}</span></div><ArrowUpRight size={15} /></Link>)}</div></section>
  </>;
}

function StudentTable({ compact = false, students: records = students }: { compact?: boolean; students?: Student[] }) { return <div className="erp-table-wrap"><table className="erp-table"><thead><tr><th>Student</th><th>Class</th><th>Mode</th><th>Attendance</th><th>Balance</th><th>Status</th><th /></tr></thead><tbody>{records.map((student) => <tr key={student.admission}><td><div className="table-person"><div className="table-initials">{student.name.split(' ').map((word) => word[0]).join('')}</div><div><strong>{student.name}</strong><span>{student.admission}</span></div></div></td><td>{student.className}</td><td><span className="soft-tag">{student.mode}</span></td><td><div className="progress-cell"><div className="mini-progress"><i style={{ width: `${student.attendance}%` }} /></div><span>{student.attendance}%</span></div></td><td className={student.balance > 0 ? 'balance-due' : 'balance-clear'}>{student.balance > 0 ? `KES ${student.balance.toLocaleString()}` : 'Cleared'}</td><td><span className={`status ${student.status === 'Active' ? 'active' : 'pending'}`}>{student.status}</span></td><td><button className="table-more" aria-label={`More options for ${student.name}`}><MoreHorizontal size={16} /></button></td></tr>)}</tbody></table>{compact && <div className="table-foot"><span>Showing 4 of 1,248 linked students</span><button className="erp-link-button">View all students <ArrowUpRight size={14} /></button></div>}</div> }

function StudentsView({ students: records, search }: { students: Student[]; search: string }) { return <><PageIntro title="Student directory" description="A single, linked record for enrollment, guardians, attendance and finance." action="Add student" icon={Users} /><div className="erp-filterbar"><div className="erp-search inline"><Search size={16} /><input defaultValue={search} placeholder="Search this directory" /></div><button className="erp-button secondary"><SlidersHorizontal size={15} /> Filters</button><button className="erp-button secondary">Export <ArrowDownRight size={15} /></button></div><section className="erp-card table-card"><StudentTable students={records} /></section></> }
function AcademicsView() { return <><PageIntro title="Academic operations" description="Timetables, lesson plans, assessments and report cards in one place." action="Create assessment" icon={BookOpen} /><div className="erp-three-grid"><MetricCard icon={BookOpen} label="Lesson plans submitted" value="86%" detail="12 due this week" tone="blue" /><MetricCard icon={Award} label="Marking progress" value="74%" detail="Year 6 Mathematics" tone="gold" /><MetricCard icon={CalendarDays} label="Timetable conflicts" value="3" detail="Requires review" tone="pink" /></div><div className="erp-main-grid"><section className="erp-card table-card"><div className="erp-card-head"><div><h2>Assessment register</h2><p>Draft, moderate and publish marks with an auditable trail.</p></div><button className="erp-button secondary"><SlidersHorizontal size={15} /> Filter</button></div><div className="erp-list-table">{['Year 6 Long Quiz — Mathematics', 'Form 2 Mid-Term — English', 'Grade 4 Project — Science'].map((item, index) => <div className="list-row" key={item}><div className="list-leading"><div className={`approval-icon ${index === 1 ? 'gold' : 'blue'}`}><Award size={17} /></div><div><strong>{item}</strong><span>{index === 0 ? '42 submissions · Moderation due today' : index === 1 ? '96 submissions · Awaiting marks entry' : '38 submissions · Draft'}</span></div></div><span className={`status ${index === 2 ? 'pending' : 'active'}`}>{index === 2 ? 'Draft' : 'In progress'}</span><button className="erp-link-button">Open <ArrowUpRight size={14} /></button></div>)}</div></section><section className="erp-card"><div className="erp-card-head"><div><h2>My subjects</h2><p>Current teaching allocation</p></div></div><div className="subject-cards">{['Spanish Y6', 'Science Y6', 'Mathematics Y6'].map((subject, index) => <div className={`subject-card subject-${index}`} key={subject}><div className="subject-art">{index === 0 ? '¡HOLA!' : index === 1 ? 'SCIENCE' : 'MATH'}</div><strong>{subject}</strong><span>Year 6 · 3 lessons weekly</span><button>View class</button></div>)}</div></section></div></> }
function AttendanceView() { return <><PageIntro title="Attendance" description="Daily and period attendance with exceptions ready for follow-up." action="Take attendance" icon={ClipboardCheck} /><div className="erp-three-grid"><MetricCard icon={CheckCircle2} label="Present today" value="94.2%" detail="1,176 of 1,248 students" tone="green" /><MetricCard icon={Clock3} label="Late arrivals" value="28" detail="6 more than yesterday" tone="gold" /><MetricCard icon={AlertCircle} label="Unexplained absences" value="14" detail="Parent notifications queued" tone="pink" /></div><section className="erp-card"><div className="erp-card-head"><div><h2>Attendance exceptions</h2><p>Records requiring a class teacher or guardian action.</p></div><button className="erp-button secondary"><Bell size={15} /> Notify guardians</button></div><div className="erp-exception-list">{[['Chloe Njeri', 'Form 2 — Tana', 'Absent · 2 consecutive days', 'Needs follow-up'], ['Brian Otieno', 'Year 8 — Acacia', 'Late · 09:18 arrival', 'Logged'], ['Amani Wanjiku', 'Year 6 — Cedar', 'Medical appointment', 'Approved']].map(([name, className, detail, status]) => <div className="exception-row" key={name}><div className="table-initials">{name.split(' ').map((word) => word[0]).join('')}</div><div><strong>{name}</strong><span>{className} · {detail}</span></div><span className={`status ${status === 'Approved' ? 'active' : 'pending'}`}>{status}</span><button className="erp-link-button">Review <ArrowUpRight size={14} /></button></div>)}</div></section></> }
function FinanceView({ students: records, onPayment }: { students: Student[]; onPayment: () => void }) { return <><PageIntro title="Finance operations" description="Fees, receipts, reconciliation and approvals with decimal-safe demo records." action="Record payment" icon={CircleDollarSign} onAction={onPayment} /><div className="erp-three-grid"><MetricCard icon={CircleDollarSign} label="Collected this term" value="KES 18.4M" detail="8.4% above target" tone="green" /><MetricCard icon={ArrowDownRight} label="Outstanding balances" value="KES 4.8M" detail="Across 184 accounts" tone="gold" /><MetricCard icon={AlertCircle} label="Unmatched payments" value="12" detail="Open reconciliation queue" tone="pink" /></div><div className="erp-main-grid"><section className="erp-card table-card"><div className="erp-card-head"><div><h2>Student accounts</h2><p>Invoices, allocations and receipt status agree with the linked student record.</p></div><button onClick={onPayment} className="erp-button secondary"><Plus size={15} /> Demo payment</button></div><StudentTable students={records} /></section><section className="erp-card"><div className="erp-card-head"><div><h2>Collection mix</h2><p>Term 3 posted receipts</p></div></div><div className="donut-wrap"><div className="donut"><div><strong>82%</strong><span>collected</span></div></div><div className="donut-legend"><span><i className="legend-blue" /> Tuition <b>KES 13.8M</b></span><span><i className="legend-teal" /> Boarding <b>KES 2.9M</b></span><span><i className="legend-gold" /> Transport <b>KES 1.7M</b></span></div></div></section></div></> }
function HrView() { return <><PageIntro title="HR & payroll" description="Staff records, leave and payroll readiness for authorised people-operations users." action="Run payroll preview" icon={WalletCards} /><div className="erp-three-grid"><MetricCard icon={Users} label="Staff directory" value="86" detail="78 teaching · 8 support" tone="blue" /><MetricCard icon={CalendarDays} label="Leave awaiting approval" value="6" detail="19 days requested" tone="gold" /><MetricCard icon={WalletCards} label="Payroll readiness" value="92%" detail="3 exceptions to resolve" tone="green" /></div><section className="erp-card payroll-card"><div className="payroll-hero"><div><span className="erp-kicker"><ShieldCheck size={14} /> October 2026 payroll</span><h2>Ready for review</h2><p>All salary inputs are linked to approved contracts, leave and attendance records.</p></div><div className="payroll-total"><span>Estimated gross pay</span><strong>KES 5.42M</strong><small>+2.1% from September</small></div></div><div className="payroll-lines">{[['Salary records', '86 / 86 complete', 'active'], ['Statutory deductions', '3 exceptions', 'pending'], ['Leave and overtime', '42 approved entries', 'active']].map(([label, value, status]) => <div key={label}><span>{label}</span><strong>{value}</strong><em className={`status ${status}`}>{status === 'active' ? 'Ready' : 'Review'}</em></div>)}</div></section></> }
function CmsView({ heroText, setHeroText }: { heroText: string; setHeroText: (value: string) => void }) { return <><PageIntro title="Website CMS" description="Manage public content, branding and publishing without editing source code." action="New page" icon={Sparkles} /><div className="erp-cms-layout"><section className="erp-card cms-editor"><div className="erp-card-head"><div><h2>Homepage hero</h2><p>Draft preview · Last saved by Miriam Njoroge</p></div><span className="status pending">Draft</span></div><label className="erp-field-label">Headline<input value={heroText} onChange={(event) => setHeroText(event.target.value)} /></label><label className="erp-field-label">Supporting copy<textarea defaultValue="Riverside Academy is a premier Kenyan day and boarding school offering excellence in primary and secondary education." /></label><div className="cms-actions"><button className="erp-button secondary">Save draft</button><button className="erp-button primary">Submit for publishing</button></div></section><section className="erp-card cms-preview"><div className="erp-card-head"><div><h2>Live preview</h2><p>Public website · Home</p></div><button className="erp-link-button">Open site <ArrowUpRight size={14} /></button></div><div className="cms-preview-window"><span>RIVERSIDE ACADEMY</span><h3>{heroText}</h3><p>Building confident learners for a changing world.</p><button>Apply for 2027</button></div></section></div><div className="erp-card"><div className="erp-card-head"><div><h2>Content library</h2><p>Published website areas and their owners</p></div><button className="erp-button secondary"><Plus size={15} /> Add content</button></div><div className="cms-library">{[['Homepage', 'Hero, programs, facilities and news', 'Published'], ['Leadership', '4 staff profiles', 'Published'], ['News & events', '6 articles · 6 events', 'Published'], ['Admissions', 'Application steps and requirements', 'Draft']].map(([title, detail, status]) => <div key={title}><div className="approval-icon blue"><FileText size={17} /></div><div><strong>{title}</strong><span>{detail}</span></div><span className={`status ${status === 'Published' ? 'active' : 'pending'}`}>{status}</span><button className="erp-link-button">Manage <ArrowUpRight size={14} /></button></div>)}</div></div></> }
function ReportsView() { return <><PageIntro title="Reports & insights" description="Authorised reports with explicit sources, filters and export actions." action="Create report" icon={BarChart3} /><div className="erp-report-grid">{[['Enrollment report', 'Admissions, active enrollment and exits', Users, '1,248'], ['Attendance report', 'Daily, period and staff attendance', ClipboardCheck, '94.2%'], ['Finance reconciliation', 'Invoices, allocations and bank matching', CircleDollarSign, 'KES 18.4M'], ['Academic performance', 'Assessments, grades and progression', Award, 'B+ avg.']].map(([title, detail, Icon, value]) => { const ReportIcon = Icon as LucideIcon; return <button className="erp-report-card" key={title as string}><div className="approval-icon blue"><ReportIcon size={18} /></div><strong>{title as string}</strong><span>{detail as string}</span><b>{value as string}</b><ArrowUpRight size={15} /></button>; })}</div><section className="erp-card audit-card"><div className="erp-card-head"><div><h2>Recent audit activity</h2><p>Visible to authorised administrators</p></div><button className="erp-link-button">View audit log <ArrowUpRight size={14} /></button></div>{['Miriam Njoroge published the Term 3 fee structure', 'Lydia Otieno recorded demo payment DEMO-20261016-013', 'Grace Wanjiru approved 42 Year 6 Mathematics marks'].map((item, index) => <div className="audit-line" key={item}><div className="audit-time">{index === 0 ? '09:42' : index === 1 ? '09:18' : 'Yesterday'}</div><span className="audit-dot" /><div><strong>{item}</strong><small>Demo workspace · action logged</small></div></div>)}</section></> }
function MetricCard({ icon: Icon, label, value, detail, tone }: { icon: LucideIcon; label: string; value: string; detail: string; tone: string }) { return <div className="erp-kpi compact"><div className={`erp-kpi-icon ${tone}`}><Icon size={19} /></div><div className="erp-kpi-label">{label}</div><strong>{value}</strong><span>{detail}</span></div> }
function PageIntro({ title, description, action, icon: Icon, onAction }: { title: string; description: string; action: string; icon: LucideIcon; onAction?: () => void }) { return <div className="erp-page-intro"><div><div className="erp-section-icon"><Icon size={19} /></div><h1>{title}</h1><p>{description}</p></div><button className="erp-button primary" onClick={onAction}><Plus size={16} /> {action}</button></div> }
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) { return <div className="erp-modal-backdrop" role="dialog" aria-modal="true"><div className="erp-modal"><div className="erp-modal-head"><div><span className="erp-kicker"><Sparkles size={13} /> Demo workflow</span><h2>{title}</h2></div><button className="erp-icon-button plain" onClick={onClose} aria-label="Close dialog"><X size={18} /></button></div>{children}</div></div> }
