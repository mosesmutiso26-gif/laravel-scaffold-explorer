import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Activity, AlertTriangle, ArrowUpRight, BarChart3, Bell, BookOpen, Building2, Calculator, CheckCircle2, ChevronDown, ClipboardList, Clock3, CreditCard, FileText, HelpCircle, LayoutDashboard, LogOut, Menu, MoreHorizontal, Plus, Receipt, RotateCcw, Search, Settings, ShieldCheck, TrendingUp, Wallet, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/finance.css';
import { financeDemo, useFinanceDemo, type PaymentMethod, type FeePackage } from '@/data/financeDemo';
import { feesDemo, useFeesDemo } from '@/data/feesDemo';

type FnNav = { label: string; path: string; icon: LucideIcon; group: string };
const fnNav: FnNav[] = [
  { label: 'Dashboard', path: '/finance/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Fee structures', path: '/finance/structures', icon: ClipboardList, group: 'Billing' },
  { label: 'Student charges', path: '/finance/charges', icon: FileText, group: 'Billing' },
  { label: 'Payments', path: '/finance/payments', icon: CreditCard, group: 'Billing' },
  { label: 'Receipts', path: '/finance/receipts', icon: Receipt, group: 'Billing' },
  { label: 'Arrears & aging', path: '/finance/arrears', icon: Clock3, group: 'Billing' },
  { label: 'Fee statements', path: '/finance/statements', icon: FileText, group: 'Billing' },
  { label: 'Student ledger', path: '/finance/ledger', icon: BookOpen, group: 'Billing' },
  { label: 'Balances & arrears', path: '/finance/balances', icon: Clock3, group: 'Billing' },
  { label: 'Credit notes', path: '/finance/credit-notes', icon: RotateCcw, group: 'Billing' },
  { label: 'Fee queries', path: '/finance/queries', icon: HelpCircle, group: 'Billing' },
  { label: 'Discounts & bursaries', path: '/finance/discounts', icon: TrendingUp, group: 'Billing' },
  { label: 'Expenses', path: '/finance/expenses', icon: Wallet, group: 'Expenditure' },
  { label: 'Budgets', path: '/finance/budgets', icon: BarChart3, group: 'Expenditure' },
  { label: 'Bank reconciliation', path: '/finance/reconciliation', icon: Building2, group: 'Accounting' },
  { label: 'Journal entries', path: '/finance/journal', icon: BookOpen, group: 'Accounting' },
  { label: 'Notifications', path: '/finance/notifications', icon: Bell, group: 'Operations' },
  { label: 'Reports', path: '/finance/reports', icon: BarChart3, group: 'Controls' },
  { label: 'Audit history', path: '/finance/audit', icon: Activity, group: 'Controls' },
  { label: 'Settings', path: '/finance/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Billing', 'Expenditure', 'Accounting', 'Operations', 'Controls', 'Account'];

export function FinancePortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useFinanceDemo();
  const feesDemoState = useFeesDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const current = fnNav.find((item) => location.pathname.startsWith(item.path)) ?? fnNav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const pendingPayments = demo.payments.filter((p) => p.status === 'Pending verification').length;
  const unreadCount = demo.notifications.filter((n) => n.unread).length;
  return <div className="fn-app">
    <aside className={`fn-sidebar ${mobile ? 'open' : ''}`}><div className="fn-brand"><div className="fn-brand-mark"><Wallet size={21} /></div><div><strong>Riverside</strong><span>Academy Finance</span></div><button className="fn-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div><div className="fn-demo-pill"><span className="fn-demo-dot" /> DEMO MODE <span>•</span> October 2026</div><div className="fn-school"><div>RA</div><span><strong>Riverside Academy</strong><small>Finance & accounting</small></span><ChevronDown size={15} /></div><nav className="fn-nav">{groups.map((group) => <div className="fn-nav-group" key={group}><p>{group}</p>{fnNav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={`fn-nav-item${current.path === path || (path !== '/finance/dashboard' && location.pathname.startsWith(path)) ? ' active' : ''}`} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Payments' && pendingPayments > 0 && <em className="badge-red">{pendingPayments}</em>}{label === 'Notifications' && unreadCount > 0 && <em>{unreadCount}</em>}</button>)}</div>)}</nav><div className="fn-sidebar-footer"><button onClick={() => navigateTo('/finance/help')}><HelpCircle size={16} /> Help centre</button><div className="fn-user"><div className="fn-avatar">LO</div><span><strong>Lydia Otieno</strong><small>Bursar / Finance Officer</small></span><MoreHorizontal size={16} /></div></div></aside>
    {mobile && <button className="fn-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="fn-main"><header className="fn-topbar"><button className="fn-menu-button" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="fn-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="fn-top-actions"><div className="fn-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students, payments, receipts..." /></div><button className="fn-icon-button" onClick={() => navigateTo('/finance/notifications')} aria-label="Open notifications"><Bell size={18} />{unreadCount > 0 && <i />}</button><div className="fn-profile-wrap"><button className="fn-profile" onClick={() => setProfileOpen(!profileOpen)}><div className="fn-avatar">LO</div><span>Bursar</span><ChevronDown size={15} /></button>{profileOpen && <div className="fn-profile-menu"><strong>Lydia Otieno</strong><small>Bursar / Finance Officer</small><button onClick={() => navigateTo('/finance/settings')}><Settings size={14} /> Settings</button><button onClick={() => financeDemo.reset()}><RotateCcw size={14} /> Reset demo data</button><button onClick={() => navigateTo('/')}><LogOut size={14} /> Exit portal</button></div>}</div></div></header><div className="fn-content"><div className="fn-context"><div><span className="fn-kicker"><ShieldCheck size={14} /> Finance workspace <b>•</b> 2026 · Term 3</span><h1>{current.label}</h1><p>{fnDescription(location.pathname)}</p></div><div className="fn-context-actions"><button className="fn-button secondary" disabled title="The demo is fixed to Term 3, 2026">Term 3 <ChevronDown size={14} /></button><button className="fn-button primary" onClick={() => navigateTo('/finance/payments')}><Plus size={15} /> Record payment</button></div></div><FnRoute path={location.pathname} demo={demo} search={search} navigateTo={navigateTo} feesDemoState={feesDemoState} /></div></main>
  </div>;
}

function fnDescription(path: string): string {
  if (path.includes('structure')) return 'Configure fee packages for day, boarding and class-specific charges by term.';
  if (path.includes('charge')) return 'View student charges, billing status and outstanding balances for the current term.';
  if (path.includes('payment')) return 'Record payments, verify receipts and allocate funds to outstanding charges.';
  if (path.includes('receipt')) return 'Search and manage issued receipts with printable previews.';
  if (path.includes('arrear')) return 'Monitor overdue accounts with aging buckets and payment plan tracking.';
  if (path.includes('statement')) return 'Generate, reissue and track student fee statements with opening balances and payment summaries.';
  if (path.includes('ledger')) return 'Double-entry transaction history with running balances for every student account.';
  if (path.includes('balance')) return 'Reconciliation status, aging buckets, advance credits and follow-up tracking for all student accounts.';
  if (path.includes('credit-note')) return 'Corrections and waivers with approval and posting workflow applied to student ledgers.';
  if (path.includes('querie')) return 'Parent-submitted fee queries with assignment, staff notes and resolution workflow.';
  if (path.includes('discount')) return 'Manage scholarships, bursaries and approved fee waivers with approval workflow.';
  if (path.includes('expense')) return 'Submit, approve and pay school operating expenses with separation of duties.';
  if (path.includes('budget')) return 'Track budgeted versus actual income and expenditure by department and category.';
  if (path.includes('reconciliation')) return 'Match bank statement lines to recorded payments and review unmatched entries.';
  if (path.includes('journal')) return 'Post and review double-entry journal entries with balanced debit and credit posting.';
  if (path.includes('notification')) return 'Finance notices sent to parents, staff and administrators.';
  if (path.includes('report')) return 'Generate financial reports from documented data sources.';
  if (path.includes('audit')) return 'Every financial operation is recorded with actor, action and timestamp.';
  return 'A complete view of billing, collections, expenses, budgets and accounting for school finance.';
}

function FnRoute({ path, demo, search, navigateTo, feesDemoState }: { path: string; demo: ReturnType<typeof useFinanceDemo>; search: string; navigateTo: (p: string) => void; feesDemoState: ReturnType<typeof useFeesDemo> }) {
  if (path === '/finance/dashboard' || path === '/finance') return <FnDashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/finance/structures')) return <StructuresView demo={demo} />;
  if (path.startsWith('/finance/charges')) return <ChargesView demo={demo} />;
  if (path.startsWith('/finance/payments')) return <PaymentsView demo={demo} />;
  if (path.startsWith('/finance/receipts')) return <ReceiptsView demo={demo} />;
  if (path.startsWith('/finance/arrears')) return <ArrearsView demo={demo} />;
  if (path.startsWith('/finance/statements')) return <StatementsView feesDemo={feesDemoState} />;
  if (path.startsWith('/finance/ledger')) return <LedgerView feesDemo={feesDemoState} />;
  if (path.startsWith('/finance/balances')) return <BalancesView feesDemo={feesDemoState} />;
  if (path.startsWith('/finance/credit-notes')) return <CreditNotesView feesDemo={feesDemoState} />;
  if (path.startsWith('/finance/queries')) return <FeeQueriesView feesDemo={feesDemoState} />;
  if (path.startsWith('/finance/discounts')) return <DiscountsView demo={demo} />;
  if (path.startsWith('/finance/expenses')) return <ExpensesView demo={demo} />;
  if (path.startsWith('/finance/budgets')) return <BudgetsView demo={demo} />;
  if (path.startsWith('/finance/reconciliation')) return <ReconciliationView demo={demo} />;
  if (path.startsWith('/finance/journal')) return <JournalView demo={demo} />;
  if (path.startsWith('/finance/notifications')) return <NotificationsView demo={demo} />;
  if (path.startsWith('/finance/reports')) return <ReportsView demo={demo} />;
  if (path.startsWith('/finance/audit')) return <AuditView demo={demo} />;
  return <SettingsView demo={demo} />;
}

function FnDashboard({ demo, navigateTo }: { demo: ReturnType<typeof useFinanceDemo>; navigateTo: (p: string) => void }) {
  const totalBilled = demo.charges.reduce((s, c) => s + c.amount, 0);
  const totalCollected = demo.charges.reduce((s, c) => s + c.paidAmount, 0);
  const totalOutstanding = totalBilled - totalCollected;
  const overdueCharges = demo.charges.filter((c) => c.status === 'Overdue');
  const overdueTotal = overdueCharges.reduce((s, c) => s + (c.amount - c.paidAmount), 0);
  const pendingPayments = demo.payments.filter((p) => p.status === 'Pending verification');
  const pendingTotal = pendingPayments.reduce((s, p) => s + p.amount, 0);
  const collectionPct = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;
  const dayStudents = demo.charges.filter((c) => c.package === 'Day');
  const boardingStudents = demo.charges.filter((c) => c.package === 'Boarding');
  const dayCollected = dayStudents.reduce((s, c) => s + c.paidAmount, 0);
  const dayBilled = dayStudents.reduce((s, c) => s + c.amount, 0);
  const boardingCollected = boardingStudents.reduce((s, c) => s + c.paidAmount, 0);
  const boardingBilled = boardingStudents.reduce((s, c) => s + c.amount, 0);
  const pendingExpenses = demo.expenses.filter((e) => e.status === 'Submitted' || e.status === 'Under review').length;
  return <><div className="fn-kpi-grid">
    <FnMetric icon={FileText} label="Total billed (Term 3)" value={`KES ${totalBilled.toLocaleString()}`} detail={`${demo.charges.length} charges across 4 students`} onClick={() => navigateTo('/finance/charges')} />
    <FnMetric icon={CheckCircle2} label="Collected" value={`KES ${totalCollected.toLocaleString()}`} detail={`${collectionPct}% collection rate`} tone="blue" onClick={() => navigateTo('/finance/payments')} />
    <FnMetric icon={Clock3} label="Outstanding" value={`KES ${totalOutstanding.toLocaleString()}`} detail={`${demo.charges.filter((c) => c.status !== 'Paid').length} charges unpaid`} tone="gold" onClick={() => navigateTo('/finance/arrears')} />
    <FnMetric icon={AlertTriangle} label="Overdue" value={`KES ${overdueTotal.toLocaleString()}`} detail={`${overdueCharges.length} overdue charges`} tone="red" onClick={() => navigateTo('/finance/arrears')} />
  </div>
  <div className="fn-main-grid">
    <Panel title="Collection performance" subtitle="Billed vs collected by student package — Term 3, 2026">
      <div className="fn-bars">
        {[['Day school', dayCollected, dayBilled], ['Boarding', boardingCollected, boardingBilled]].map(([label, collected, billed]) => {
          const pct = (billed as number) > 0 ? Math.round(((collected as number) / (billed as number)) * 100) : 0;
          return <div key={label as string}><span>{label as string}</span><i><b style={{ width: `${pct}%` }} /></i><strong>{pct}%</strong></div>;
        })}
      </div>
      <div className="fn-overview-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
        <div className="fn-mini-stat"><span>Day collected</span><strong>KES {(dayCollected / 1000).toFixed(0)}K</strong></div>
        <div className="fn-mini-stat"><span>Boarding collected</span><strong>KES {(boardingCollected / 1000).toFixed(0)}K</strong></div>
      </div>
    </Panel>
    <Panel title="Task centre" subtitle="Items needing finance attention">
      <div className="fn-task-list">
        <Task title={`${pendingPayments.length} payments awaiting verification`} detail={`KES ${pendingTotal.toLocaleString()} pending — bursar review required`} action="Verify" onClick={() => navigateTo('/finance/payments')} />
        <Task title={`${overdueCharges.length} overdue charges`} detail={`Chloe Njeri — KES ${(overdueCharges.reduce((s, c) => s + c.amount, 0)).toLocaleString()} since 05 Oct`} action="Review" onClick={() => navigateTo('/finance/arrears')} />
        <Task title={`${pendingExpenses} expenses awaiting approval`} detail="Textbook Centre KES 126,000 + water pump KES 45,000" action="Approve" onClick={() => navigateTo('/finance/expenses')} />
        <Task title="2 discount requests pending" detail="Chloe Njeri bursary 40% · Gloria Wairimu staff 50%" action="Review" onClick={() => navigateTo('/finance/discounts')} />
      </div>
    </Panel>
  </div>
  <div className="fn-main-grid fn-lower-grid">
    <Panel title="Recent payments" subtitle="Latest transactions — Term 3, 2026">
      <div className="fn-record-list">{demo.payments.slice(0, 5).map((p) => <div className="fn-record-row" key={p.id}><div><strong>{p.receiptNo} · {p.studentName}</strong><span>{p.method} · {p.reference} · KES {p.amount.toLocaleString()} · {p.date}</span></div><span className={`fn-status ${p.status === 'Allocated' ? 'good' : p.status === 'Verified' ? 'info' : p.status === 'Pending verification' ? 'warning' : p.status === 'Reversed' ? 'bad' : 'neutral'}`}>{p.status}</span></div>)}</div>
    </Panel>
    <Panel title="Quick actions" subtitle="Common finance operations">
      <div className="fn-quick-grid">
        <QuickAction label="Record payment" icon={CreditCard} onClick={() => navigateTo('/finance/payments')} />
        <QuickAction label="Bill students" icon={FileText} onClick={() => navigateTo('/finance/structures')} />
        <QuickAction label="Record expense" icon={Wallet} onClick={() => navigateTo('/finance/expenses')} />
        <QuickAction label="Reconcile bank" icon={Building2} onClick={() => navigateTo('/finance/reconciliation')} />
      </div>
    </Panel>
  </div>
  <Panel title="Alerts" subtitle="Financial risk and reconciliation notices">
    <div className="fn-alert-grid">
      <AlertCard title="Payments pending verification" detail={`${pendingPayments.length} payments · KES ${pendingTotal.toLocaleString()} awaiting bursar review`} tone="gold" onClick={() => navigateTo('/finance/payments')} />
      <AlertCard title="Overdue account" detail={`Chloe Njeri · KES ${overdueTotal.toLocaleString()} overdue since 05 Oct 2026`} tone="red" onClick={() => navigateTo('/finance/arrears')} />
      <AlertCard title="Unmatched bank transactions" detail={`${demo.bankLines.filter((l) => l.status === 'Unmatched').length} unmatched statement lines requiring review`} tone="blue" onClick={() => navigateTo('/finance/reconciliation')} />
    </div>
  </Panel></>;
}

function StructuresView({ demo }: { demo: ReturnType<typeof useFinanceDemo> }) {
  const [className, setClassName] = useState('Year 6');
  const [packageName, setPackageName] = useState<FeePackage>('Day');
  const [term, setTerm] = useState('Term 3');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const bill = () => {
    const result = financeDemo.billStudents(className, packageName, term);
    if (result.ok) { setSuccess(`${result.count} charges created for ${className} ${packageName} ${term}.`); setError(''); }
    else { setError(result.error ?? 'Billing failed.'); setSuccess(''); }
  };
  return <><Panel title="Active fee structures" subtitle={`${demo.feeStructures.filter((f) => f.status === 'Active').length} active structure(s) for Term 3, 2026`}>
    <div className="fn-record-list">{demo.feeStructures.filter((f) => f.status === 'Active').map((fs) => <div className="fn-record-row" key={fs.id}><div><strong>{fs.className} — {fs.packageName}</strong><span>{fs.term} · {fs.items.map((i) => `${i.name} KES ${i.amount.toLocaleString()}`).join(' · ')}</span></div><strong style={{ fontSize: 11, color: '#2a8c6e' }}>KES {fs.total.toLocaleString()}</strong></div>)}</div>
  </Panel>
  <Panel title="Bulk billing" subtitle="Generate charges for all eligible students from an active fee structure.">
    <div className="fn-form">
      <label>Class<select value={className} onChange={(e) => setClassName(e.target.value)}><option>Year 6</option><option>Form 2</option></select></label>
      <label>Package<select value={packageName} onChange={(e) => setPackageName(e.target.value as FeePackage)}><option>Day</option><option>Boarding</option></select></label>
      <label>Term<select value={term} onChange={(e) => setTerm(e.target.value)}><option>Term 3</option></select></label>
      <button className="fn-button primary" type="button" onClick={bill}><FileText size={15} /> Generate charges</button>
      {error && <span className="fn-form-error">{error}</span>}
      {success && <span className="fn-form-message">{success}</span>}
    </div>
  </Panel></>;
}

function ChargesView({ demo }: { demo: ReturnType<typeof useFinanceDemo> }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const records = demo.charges.filter((c) => (filter === 'All' || c.status === filter) && `${c.studentName} ${c.description} ${c.className}`.toLowerCase().includes(query.toLowerCase()));
  return <><div className="fn-filterbar"><div className="fn-search inline"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search charges..." /></div><select value={filter} onChange={(e) => setFilter(e.target.value)} className="fn-soft-tag" style={{ border: '1px solid #e1e8eb', padding: '8px', borderRadius: 7, font: '600 10px "Plus Jakarta Sans"', cursor: 'pointer' }}><option>All</option><option>Paid</option><option>Partially paid</option><option>Billed</option><option>Overdue</option></select></div>
  <Panel title="Student charges" subtitle={`${records.length} charge(s) · Term 3, 2026`}>
    <div className="fn-table-wrap"><table className="fn-table"><thead><tr><th>Student</th><th>Class</th><th>Package</th><th>Description</th><th>Amount</th><th>Paid</th><th>Outstanding</th><th>Status</th></tr></thead>
    <tbody>{records.map((c) => <tr key={c.id}><td><strong>{c.studentName}</strong></td><td>{c.className}</td><td><span className="fn-soft-tag">{c.package}</span></td><td>{c.description}</td><td>KES {c.amount.toLocaleString()}</td><td>KES {c.paidAmount.toLocaleString()}</td><td>KES {(c.amount - c.paidAmount).toLocaleString()}</td><td><span className={`fn-status ${c.status === 'Paid' ? 'good' : c.status === 'Partially paid' ? 'warning' : c.status === 'Overdue' ? 'bad' : 'neutral'}`}>{c.status}</span></td></tr>)}</tbody></table></div>
  </Panel></>;
}

function PaymentsView({ demo }: { demo: ReturnType<typeof useFinanceDemo> }) {
  const [studentId, setStudentId] = useState('');
  const [payerName, setPayerName] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<PaymentMethod>('M-Pesa');
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const uniqueStudents = [...new Map(demo.charges.map((c) => [c.studentId, { id: c.studentId, name: c.studentName }]).values())];
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentId || !payerName.trim() || !amount) { setError('Student, payer name and amount are required.'); return; }
    const result = financeDemo.recordPayment(studentId, payerName, parseInt(amount, 10), method, reference);
    if (result.ok) { setSuccess('Payment recorded successfully. Awaiting bursar verification.'); setError(''); setStudentId(''); setPayerName(''); setAmount(''); setReference(''); }
    else { setError(result.error ?? 'Recording failed.'); setSuccess(''); }
  };
  return <><Panel title="Record payment" subtitle="Capture a payment received via cash, bank, M-Pesa or cheque."><form className="fn-form" onSubmit={submit}>
    <label>Student<select value={studentId} onChange={(e) => setStudentId(e.target.value)}><option value="">Select student...</option>{uniqueStudents.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
    <label>Payer name<input value={payerName} onChange={(e) => setPayerName(e.target.value)} placeholder="e.g. Wanjiku Kamau" /></label>
    <label>Amount (KES)<input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="e.g. 50000" /></label>
    <label>Payment method<select value={method} onChange={(e) => setMethod(e.target.value as PaymentMethod)}><option>M-Pesa</option><option>Bank transfer</option><option>Cash</option><option>Cheque</option></select></label>
    <label>Transaction reference<input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="e.g. QJK3LM4P9X" /></label>
    <button className="fn-button primary" type="submit" disabled={!studentId || !payerName.trim() || !amount}><CreditCard size={15} /> Record payment</button>
    {error && <span className="fn-form-error">{error}</span>}
    {success && <span className="fn-form-message">{success}</span>}
  </form></Panel>
  <Panel title="Payment register" subtitle={`${demo.payments.length} payment(s) · verify and allocate to charges`}>
    <div className="fn-record-list">{demo.payments.map((p) => <div className="fn-record-row" key={p.id}><div><strong>{p.receiptNo} · {p.studentName}</strong><span>{p.payerName} · {p.method} · {p.reference} · KES {p.amount.toLocaleString()} · {p.date}{p.verifiedBy ? ` · verified by ${p.verifiedBy}` : ''}</span></div><span className={`fn-status ${p.status === 'Allocated' ? 'good' : p.status === 'Verified' ? 'info' : p.status === 'Pending verification' ? 'warning' : p.status === 'Reversed' ? 'bad' : 'neutral'}`}>{p.status}</span><div className="fn-row-actions">{p.status === 'Pending verification' && <button className="fn-button secondary" onClick={() => financeDemo.verifyPayment(p.id)}>Verify</button>}{p.status === 'Verified' && <button className="fn-button primary" onClick={() => financeDemo.allocatePayment(p.id)}>Allocate</button>}{(p.status === 'Allocated' || p.status === 'Verified') && <button className="fn-link" onClick={() => { const r = financeDemo.reversePayment(p.id); if (!r.ok) alert(r.error); }}>Reverse</button>}</div></div>)}</div>
  </Panel></>;
}

function ReceiptsView({ demo }: { demo: ReturnType<typeof useFinanceDemo> }) {
  const allocated = demo.payments.filter((p) => p.status === 'Allocated' || p.status === 'Verified');
  return <Panel title="Receipt register" subtitle={`${allocated.length} issued receipt(s)`}>
    <div className="fn-table-wrap"><table className="fn-table"><thead><tr><th>Receipt no.</th><th>Student</th><th>Payer</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th></tr></thead>
    <tbody>{allocated.map((p) => <tr key={p.id}><td><strong>{p.receiptNo}</strong></td><td>{p.studentName}</td><td>{p.payerName}</td><td>KES {p.amount.toLocaleString()}</td><td><span className="fn-soft-tag">{p.method}</span></td><td>{p.date}</td><td><span className={`fn-status ${p.status === 'Allocated' ? 'good' : 'info'}`}>{p.status === 'Allocated' ? 'Issued' : 'Verified'}</span></td></tr>)}</tbody></table></div>
  </Panel>;
}

function ArrearsView({ demo }: { demo: ReturnType<typeof useFinanceDemo> }) {
  const students = [...new Map(demo.charges.filter((c) => c.status !== 'Paid').map((c) => [c.studentId, c]).values())].map((entry) => {
    const studentCharges = demo.charges.filter((c) => c.studentId === entry.studentId);
    const billed = studentCharges.reduce((s, c) => s + c.amount, 0);
    const paid = studentCharges.reduce((s, c) => s + c.paidAmount, 0);
    const outstanding = billed - paid;
    const hasOverdue = studentCharges.some((c) => c.status === 'Overdue');
    const bucket = hasOverdue ? 'Over 90 days' : outstanding > 0 ? '1-30 days' : 'Current';
    return { studentId: entry.studentId, studentName: entry.studentName, className: entry.className, outstanding, bucket };
  }).filter((s) => s.outstanding > 0);
  return <><div className="fn-three-grid"><FnMetric icon={Clock3} label="Total outstanding" value={`KES ${students.reduce((s, st) => s + st.outstanding, 0).toLocaleString()}`} detail={`${students.length} students with balances`} tone="gold" /><FnMetric icon={AlertTriangle} label="Overdue accounts" value={String(students.filter((s) => s.bucket === 'Over 90 days').length)} detail="Past due date" tone="red" /><FnMetric icon={CheckCircle2} label="Current accounts" value={String(students.filter((s) => s.bucket === '1-30 days').length)} detail="Within 30 days" /></div>
  <Panel title="Arrears aging" subtitle="Outstanding balances by aging bucket — Term 3, 2026">
    <div className="fn-table-wrap"><table className="fn-table"><thead><tr><th>Student</th><th>Class</th><th>Outstanding</th><th>Aging bucket</th><th>Status</th></tr></thead>
    <tbody>{students.map((s) => <tr key={s.studentId}><td><strong>{s.studentName}</strong></td><td>{s.className}</td><td>KES {s.outstanding.toLocaleString()}</td><td><span className="fn-soft-tag">{s.bucket}</span></td><td><span className={`fn-status ${s.bucket === 'Over 90 days' ? 'bad' : s.bucket === 'Current' ? 'good' : 'warning'}`}>{s.bucket === 'Over 90 days' ? 'Overdue' : 'Outstanding'}</span></td></tr>)}</tbody></table></div>
  </Panel></>;
}

function DiscountsView({ demo }: { demo: ReturnType<typeof useFinanceDemo> }) {
  return <><div className="fn-three-grid"><FnMetric icon={TrendingUp} label="Total discounts" value={`KES ${demo.discounts.reduce((s, d) => s + d.amount, 0).toLocaleString()}`} detail={`${demo.discounts.length} record(s)`} /><FnMetric icon={CheckCircle2} label="Approved" value={String(demo.discounts.filter((d) => d.status === 'Approved').length)} detail="Active waivers" tone="blue" /><FnMetric icon={Clock3} label="Pending approval" value={String(demo.discounts.filter((d) => d.status === 'Pending').length)} detail="Awaiting principal review" tone="gold" /></div>
  <Panel title="Discounts, scholarships & bursaries" subtitle={`${demo.discounts.length} record(s) with approval workflow`}>
    <div className="fn-table-wrap"><table className="fn-table"><thead><tr><th>Student</th><th>Type</th><th>Percentage</th><th>Amount</th><th>Term</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>{demo.discounts.map((d) => <tr key={d.id}><td><strong>{d.studentName}</strong></td><td><span className="fn-soft-tag">{d.type}</span></td><td>{d.percentage}%</td><td>KES {d.amount.toLocaleString()}</td><td>{d.term}</td><td style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.reason}</td><td><span className={`fn-status ${d.status === 'Approved' ? 'good' : d.status === 'Pending' ? 'warning' : 'bad'}`}>{d.status}</span></td><td>{d.status === 'Pending' && <><button className="fn-link" onClick={() => financeDemo.approveDiscount(d.id)}>Approve</button><button className="fn-link" onClick={() => financeDemo.rejectDiscount(d.id)}>Reject</button></>}</td></tr>)}</tbody></table></div>
  </Panel></>;
}

function ExpensesView({ demo }: { demo: ReturnType<typeof useFinanceDemo> }) {
  const [payee, setPayee] = useState('');
  const [category, setCategory] = useState('Learning materials');
  const [department, setDepartment] = useState('Academic');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!payee.trim() || !description.trim() || !amount) { setError('Payee, description and amount are required.'); return; }
    const result = financeDemo.createExpense(payee, category, department, description, parseInt(amount, 10));
    if (result.ok) { setSuccess('Expense created as draft. Submit it for approval.'); setError(''); setPayee(''); setDescription(''); setAmount(''); }
    else { setError(result.error ?? 'Creation failed.'); setSuccess(''); }
  };
  return <><Panel title="Create expense" subtitle="Record a school operating expense for approval and payment."><form className="fn-form" onSubmit={submit}>
    <label>Payee / supplier<input value={payee} onChange={(e) => setPayee(e.target.value)} placeholder="e.g. Textbook Centre" /></label>
    <label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}><option>Learning materials</option><option>Utilities</option><option>Maintenance</option><option>Kitchen</option><option>Uniforms</option><option>Transport</option><option>Administration</option></select></label>
    <label>Department<select value={department} onChange={(e) => setDepartment(e.target.value)}><option>Academic</option><option>Facilities</option><option>Administration</option><option>Boarding</option><option>Finance</option><option>HR</option></select></label>
    <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the expense" /></label>
    <label>Amount (KES)<input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="e.g. 50000" /></label>
    <button className="fn-button primary" type="submit" disabled={!payee.trim() || !description.trim() || !amount}><Plus size={15} /> Create expense</button>
    {error && <span className="fn-form-error">{error}</span>}
    {success && <span className="fn-form-message">{success}</span>}
  </form></Panel>
  <Panel title="Expense register" subtitle={`${demo.expenses.length} expense(s) · draft to paid lifecycle`}>
    <div className="fn-record-list">{demo.expenses.map((e) => <div className="fn-record-row" key={e.id}><div><strong>{e.reference} · {e.payee}</strong><span>{e.category} · {e.department} · {e.description} · KES {e.amount.toLocaleString()} · {e.date}{e.approvedBy ? ` · approved by ${e.approvedBy}` : ''}{e.paymentRef ? ` · paid via ${e.paymentRef}` : ''}</span></div><span className={`fn-status ${e.status === 'Paid' ? 'good' : e.status === 'Approved' ? 'info' : e.status === 'Rejected' ? 'bad' : 'warning'}`}>{e.status}</span><div className="fn-row-actions">{e.status === 'Draft' && <button className="fn-button secondary" onClick={() => financeDemo.submitExpense(e.id)}>Submit</button>}{(e.status === 'Submitted' || e.status === 'Under review') && <><button className="fn-button primary" onClick={() => { const r = financeDemo.approveExpense(e.id); if (!r.ok) alert(r.error); }}>Approve</button><button className="fn-link" onClick={() => financeDemo.rejectExpense(e.id)}>Reject</button></>}{e.status === 'Approved' && <button className="fn-button primary" onClick={() => financeDemo.payExpense(e.id)}>Pay</button>}</div></div>)}</div>
  </Panel></>;
}

function BudgetsView({ demo }: { demo: ReturnType<typeof useFinanceDemo> }) {
  return <Panel title="Budget versus actual" subtitle={`${demo.budgets.length} budget categories · fiscal year 2026`}>
    <div className="fn-table-wrap"><table className="fn-table"><thead><tr><th>Category</th><th>Department</th><th>Budgeted</th><th>Actual</th><th>Variance</th><th>Utilization</th><th>Status</th></tr></thead>
    <tbody>{demo.budgets.map((b) => { const variance = b.budgeted - b.actual; const pct = b.budgeted > 0 ? Math.round((b.actual / b.budgeted) * 100) : 0; return <tr key={b.id}><td><strong>{b.category}</strong></td><td>{b.department}</td><td>KES {b.budgeted.toLocaleString()}</td><td>KES {b.actual.toLocaleString()}</td><td style={{ color: variance < 0 ? '#c25b5b' : '#3b9368' }}>KES {variance.toLocaleString()}</td><td>{pct}%</td><td><span className={`fn-status ${pct > 100 ? 'bad' : pct > 85 ? 'warning' : 'good'}`}>{b.status}</span></td></tr>; })}</tbody></table></div>
  </Panel>;
}

function ReconciliationView({ demo }: { demo: ReturnType<typeof useFinanceDemo> }) {
  const unmatchedCredits = demo.bankLines.filter((l) => l.status === 'Unmatched' && l.type === 'Credit');
  const unmatchedDebits = demo.bankLines.filter((l) => l.status === 'Unmatched' && l.type === 'Debit');
  const matched = demo.bankLines.filter((l) => l.status === 'Matched');
  const pendingPayments = demo.payments.filter((p) => p.status === 'Pending verification' || p.status === 'Verified');
  return <><div className="fn-three-grid"><FnMetric icon={CheckCircle2} label="Matched" value={String(matched.length)} detail="Bank lines reconciled" tone="blue" /><FnMetric icon={AlertTriangle} label="Unmatched credits" value={String(unmatchedCredits.length)} detail="Awaiting match" tone="gold" /><FnMetric icon={AlertTriangle} label="Unmatched debits" value={String(unmatchedDebits.length)} detail="Review needed" tone="red" /></div>
  <Panel title="Unmatched bank transactions" subtitle="Match statement lines to recorded payments or mark as ignored">
    <div className="fn-record-list">{demo.bankLines.filter((l) => l.status === 'Unmatched').map((l) => <div className="fn-record-row" key={l.id}><div><strong>{l.reference} · {l.description}</strong><span>{l.date} · {l.type} · KES {l.amount.toLocaleString()}</span></div><div className="fn-row-actions">{l.type === 'Credit' && pendingPayments.length > 0 && <select className="fn-soft-tag" style={{ border: '1px solid #e1e8eb', padding: '6px', borderRadius: 5, font: '600 9px "Plus Jakarta Sans"', cursor: 'pointer' }} onChange={(e) => { if (e.target.value) { const r = financeDemo.matchBankLine(l.id, e.target.value); if (!r.ok) alert(r.error); } }}><option value="">Match to payment...</option>{pendingPayments.filter((p) => p.amount === l.amount).map((p) => <option key={p.id} value={p.id}>{p.receiptNo} · {p.studentName} · KES {p.amount.toLocaleString()}</option>)}</select>}<button className="fn-link" onClick={() => financeDemo.ignoreBankLine(l.id)}>Ignore</button></div></div>)}</div>
  </Panel>
  <Panel title="Matched transactions" subtitle={`${matched.length} reconciled bank lines`}>
    <div className="fn-record-list">{matched.map((l) => { const p = demo.payments.find((pay) => pay.id === l.matchedPaymentId); return <div className="fn-record-row" key={l.id}><div><strong>{l.reference} → {p?.receiptNo}</strong><span>{l.date} · KES {l.amount.toLocaleString()} · {p?.studentName}</span></div><span className="fn-status good">Matched</span></div>; })}</div>
  </Panel></>;
}

function JournalView({ demo }: { demo: ReturnType<typeof useFinanceDemo> }) {
  const posted = demo.journalEntries.filter((j) => j.status === 'Posted');
  const totalDebits = posted.reduce((s, j) => s + j.amount, 0);
  return <><div className="fn-three-grid"><FnMetric icon={BookOpen} label="Posted entries" value={String(posted.length)} detail="Finalized journals" tone="blue" /><FnMetric icon={Clock3} label="Pending approval" value={String(demo.journalEntries.filter((j) => j.status === 'Pending approval').length)} detail="Awaiting review" tone="gold" /><FnMetric icon={Calculator} label="Total debits = credits" value={`KES ${totalDebits.toLocaleString()}`} detail="Balanced" /></div>
  <Panel title="Journal entries" subtitle="Double-entry postings — debits must equal credits for each entry">
    <div className="fn-table-wrap"><table className="fn-table"><thead><tr><th>Reference</th><th>Date</th><th>Description</th><th>Debit</th><th>Credit</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>{demo.journalEntries.map((j) => <tr key={j.id}><td><strong>{j.reference}</strong></td><td>{j.date}</td><td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{j.description}</td><td>{j.debitAccount}</td><td>{j.creditAccount}</td><td>KES {j.amount.toLocaleString()}</td><td><span className={`fn-status ${j.status === 'Posted' ? 'good' : j.status === 'Pending approval' ? 'warning' : j.status === 'Reversed' ? 'bad' : 'neutral'}`}>{j.status}</span></td><td>{j.status === 'Pending approval' && <button className="fn-button primary" onClick={() => financeDemo.postJournal(j.id)}>Post</button>}</td></tr>)}</tbody></table></div>
  </Panel></>;
}

function NotificationsView({ demo }: { demo: ReturnType<typeof useFinanceDemo> }) {
  return <Panel title="Finance notifications" subtitle="Notices sent to parents, staff and administrators."><div className="fn-record-list">{demo.notifications.map((n) => <div className="fn-record-row" key={n.id}><div><strong>{n.title}</strong><span>To: {n.recipient} · {n.detail} · {n.createdDate}</span></div>{n.unread ? <button className="fn-button secondary" onClick={() => financeDemo.markNotificationRead(n.id)}>Mark read</button> : <span className="fn-status good">Read</span>}</div>)}
  {demo.notifications.length === 0 && <div style={{ padding: '12px 0', color: '#9ca8ad', fontSize: 10 }}>No notifications.</div>}
  </div></Panel>;
}

function ReportsView({ demo: { audit } }: { demo: ReturnType<typeof useFinanceDemo> }) {
  const reports = ['Fees billed by class', 'Fees collected by class', 'Student account statements', 'Outstanding balances', 'Arrears aging report', 'Daily collections', 'Payment method summary', 'Receipt register', 'Expense register', 'Budget vs actual', 'Discount and bursary report', 'Cashbook report', 'Bank reconciliation', 'Audit trail', 'Income & expenditure'];
  return <><div className="fn-report-grid">{reports.map((title) => <button className="fn-report-card" key={title} disabled title="Report generation requires the Laravel report service"><BarChart3 size={18} /><strong>{title}</strong><span>Filtered records with defined source and period.</span><ArrowUpRight size={14} /></button>)}</div>
  <Panel title="Report activity" subtitle="Recent report-related audit entries"><div className="fn-record-list">{audit.slice(0, 4).map((entry) => <div className="fn-record-row" key={entry.id}><div><strong>{entry.action}</strong><span>{entry.target} · {entry.timestamp}</span></div><span className="fn-status neutral">Logged</span></div>)}</div></Panel></>;
}

function AuditView({ demo }: { demo: ReturnType<typeof useFinanceDemo> }) {
  return <Panel title="Audit history" subtitle="Every financial operation is recorded with actor, action, target and timestamp."><div className="fn-record-list">{demo.audit.map((entry) => <div className="fn-audit-row" key={entry.id}><span>{entry.timestamp}</span><i /><strong>{entry.actor}: {entry.action}</strong></div>)}</div></Panel>;
}

function StatementsView({ feesDemo }: { feesDemo: ReturnType<typeof useFeesDemo> }) {
  const totalOutstanding = feesDemo.statements.reduce((s, st) => s + st.outstandingBalance, 0);
  const totalCollected = feesDemo.statements.reduce((s, st) => s + st.totalPayments, 0);
  return <><div className="fn-three-grid"><FnMetric icon={FileText} label="Statements issued" value={String(feesDemo.statements.length)} detail="Term 3, 2026" tone="blue" /><FnMetric icon={CheckCircle2} label="Total collected" value={`KES ${totalCollected.toLocaleString()}`} detail="Verified payments" /><FnMetric icon={Clock3} label="Total outstanding" value={`KES ${totalOutstanding.toLocaleString()}`} detail="Across all statements" tone="gold" /></div>
  <Panel title="Fee statements" subtitle="Student fee statements with opening balance, charges, payments and outstanding amount">
    <div className="fn-table-wrap"><table className="fn-table"><thead><tr><th>Statement No.</th><th>Student</th><th>Class</th><th>Package</th><th>Opening</th><th>Charges</th><th>Payments</th><th>Concessions</th><th>Outstanding</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>{feesDemo.statements.map((s) => <tr key={s.id}><td><strong>{s.statementNo}</strong></td><td>{s.studentName}</td><td>{s.className}</td><td><span className="fn-soft-tag">{s.packageName}</span></td><td>KES {s.openingBalance.toLocaleString()}</td><td>KES {s.totalCharges.toLocaleString()}</td><td>KES {s.totalPayments.toLocaleString()}</td><td>KES {s.totalConcessions.toLocaleString()}</td><td><strong style={{ color: s.outstandingBalance > 0 ? '#c25b5b' : '#3b9368' }}>KES {s.outstandingBalance.toLocaleString()}</strong></td><td><span className={`fn-status ${s.status === 'Delivered' ? 'good' : s.status === 'Reissued' ? 'info' : 'neutral'}`}>{s.status}</span></td><td><button className="fn-link" onClick={() => feesDemo.reissueStatement(s.id)}>Reissue</button></td></tr>)}</tbody></table></div>
  </Panel></>;
}

function LedgerView({ feesDemo }: { feesDemo: ReturnType<typeof useFeesDemo> }) {
  const [studentId, setStudentId] = useState('');
  const students = [...new Map(feesDemo.statements.map((s) => [s.studentId, { id: s.studentId, name: s.studentName }]).values())];
  const entries = feesDemo.ledger.filter((l) => !studentId || l.studentId === studentId);
  const selectedStudent = students.find((s) => s.id === studentId);
  const currentBalance = entries.length > 0 ? entries[entries.length - 1].runningBalance : 0;
  return <><Panel title="Student ledger" subtitle="Double-entry transaction history with running balance per student">
    <div className="fn-filterbar">
      <select value={studentId} onChange={(e) => setStudentId(e.target.value)} className="fn-soft-tag" style={{ border: '1px solid #e1e8eb', padding: '8px', borderRadius: 7, font: '600 10px "Plus Jakarta Sans"', cursor: 'pointer' }}>
        <option value="">All students</option>
        {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      {selectedStudent && <div className="fn-mini-stat" style={{ padding: '8px 14px' }}><span>Current balance</span><strong style={{ fontSize: 14, color: currentBalance > 0 ? '#c25b5b' : currentBalance < 0 ? '#2c94c5' : '#3b9368' }}>KES {Math.abs(currentBalance).toLocaleString()}{currentBalance < 0 ? ' CR' : ''}</strong></div>}
    </div>
    <div className="fn-table-wrap"><table className="fn-table"><thead><tr><th>Date</th><th>Reference</th><th>Description</th><th>Type</th><th>Charge</th><th>Payment</th><th>Concession</th><th>Balance</th><th>Actor</th><th>Status</th></tr></thead>
    <tbody>{entries.map((l) => <tr key={l.id}><td>{l.date}</td><td><strong>{l.reference}</strong></td><td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.description}</td><td><span className="fn-soft-tag">{l.type}</span></td><td style={{ color: l.chargeAmount > 0 ? '#c25b5b' : '#9ca8ae' }}>{l.chargeAmount > 0 ? `KES ${l.chargeAmount.toLocaleString()}` : '—'}</td><td style={{ color: l.paymentAmount > 0 ? '#3b9368' : '#9ca8ae' }}>{l.paymentAmount > 0 ? `KES ${l.paymentAmount.toLocaleString()}` : '—'}</td><td style={{ color: l.concessionAmount > 0 ? '#2c94c5' : '#9ca8ae' }}>{l.concessionAmount > 0 ? `KES ${l.concessionAmount.toLocaleString()}` : '—'}</td><td><strong>KES {l.runningBalance.toLocaleString()}</strong></td><td>{l.actor}</td><td><span className={`fn-status ${l.status === 'Posted' ? 'good' : 'warning'}`}>{l.status}</span></td></tr>)}</tbody></table></div>
  </Panel></>;
}

function BalancesView({ feesDemo }: { feesDemo: ReturnType<typeof useFeesDemo> }) {
  const [filter, setFilter] = useState('All');
  const balances = feesDemo.studentBalances.filter((b) => filter === 'All' || b.balanceStatus === filter);
  const totalOutstanding = feesDemo.studentBalances.reduce((s, b) => s + b.outstanding, 0);
  const overdueCount = feesDemo.studentBalances.filter((b) => b.balanceStatus === 'Overdue').length;
  const creditCount = feesDemo.studentBalances.filter((b) => b.balanceStatus === 'Credit balance').length;
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [noteMsg, setNoteMsg] = useState('');
  const selected = feesDemo.studentBalances.find((b) => b.studentId === selectedStudent);
  const addNote = () => {
    if (!selectedStudent || !note.trim()) return;
    const r = feesDemo.addFollowUpNote(selectedStudent, note, 'Lydia Otieno');
    if (r.ok) { setNote(''); setNoteMsg('Follow-up note added.'); }
  };
  return <><div className="fn-three-grid"><FnMetric icon={Wallet} label="Total outstanding" value={`KES ${totalOutstanding.toLocaleString()}`} detail={`${feesDemo.studentBalances.filter((b) => b.outstanding > 0).length} students`} tone="gold" /><FnMetric icon={AlertTriangle} label="Overdue accounts" value={String(overdueCount)} detail="Past due date" tone="red" /><FnMetric icon={CreditCard} label="Credit balances" value={String(creditCount)} detail="Advance credit held" tone="blue" /></div>
  <Panel title="Student balances & arrears" subtitle="Reconciliation status, aging buckets and follow-up tracking">
    <div className="fn-filterbar"><select value={filter} onChange={(e) => setFilter(e.target.value)} className="fn-soft-tag" style={{ border: '1px solid #e1e8eb', padding: '8px', borderRadius: 7, font: '600 10px "Plus Jakarta Sans"', cursor: 'pointer' }}><option>All</option><option>Paid in full</option><option>Part-paid</option><option>Unpaid</option><option>Overdue</option><option>Credit balance</option><option>Pending reconciliation</option></select></div>
    <div className="fn-table-wrap"><table className="fn-table"><thead><tr><th>Student</th><th>Admission No.</th><th>Class</th><th>Opening</th><th>Charges</th><th>Concessions</th><th>Payments</th><th>Outstanding</th><th>Advance</th><th>Status</th><th>Aging</th><th>Assigned</th><th>Actions</th></tr></thead>
    <tbody>{balances.map((b) => <tr key={b.studentId}><td><strong>{b.studentName}</strong></td><td>{b.admissionNo}</td><td>{b.className}</td><td>KES {b.openingArrears.toLocaleString()}</td><td>KES {b.currentTermCharges.toLocaleString()}</td><td>KES {b.approvedConcessions.toLocaleString()}</td><td>KES {b.verifiedPayments.toLocaleString()}</td><td><strong style={{ color: b.outstanding > 0 ? '#c25b5b' : '#3b9368' }}>KES {b.outstanding.toLocaleString()}</strong></td><td>{b.advanceCredit > 0 ? `KES ${b.advanceCredit.toLocaleString()}` : '—'}</td><td><span className={`fn-status ${b.balanceStatus === 'Paid in full' ? 'good' : b.balanceStatus === 'Overdue' ? 'bad' : b.balanceStatus === 'Credit balance' ? 'info' : b.balanceStatus === 'Pending reconciliation' ? 'warning' : 'warning'}`}>{b.balanceStatus}</span></td><td><span className="fn-soft-tag">{b.ageingBucket}</span></td><td>{b.assignedStaff ?? '—'}</td><td><button className="fn-link" onClick={() => setSelectedStudent(b.studentId)}>Follow up</button></td></tr>)}</tbody></table></div>
  </Panel>
  {selected && <Panel title={`Follow-up: ${selected.studentName}`} subtitle={`${selected.admissionNo} · ${selected.className} · Outstanding: KES ${selected.outstanding.toLocaleString()}`}>
    <div className="fn-record-list">{selected.followUpNotes.map((n, i) => <div className="fn-record-row" key={i}><div><strong>{n.note}</strong><span>{n.date} · {n.staff}</span></div><span className="fn-status neutral">Logged</span></div>)}
    {selected.followUpNotes.length === 0 && <div style={{ padding: '12px 0', color: '#9ca8ad', fontSize: 10 }}>No follow-up notes yet.</div>}
    </div>
    <div className="fn-form" style={{ paddingTop: 0 }}>
      <label>Add follow-up note<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Called parent — promised to pay by 20 Oct" /></label>
      {noteMsg && <span className="fn-form-message">{noteMsg}</span>}
      <button className="fn-button primary" type="button" onClick={addNote} disabled={!note.trim()}><Plus size={15} /> Add note</button>
    </div>
  </Panel>}</>;
}

function CreditNotesView({ feesDemo }: { feesDemo: ReturnType<typeof useFeesDemo> }) {
  return <><div className="fn-three-grid"><FnMetric icon={RotateCcw} label="Total credit notes" value={String(feesDemo.creditNotes.length)} detail="All statuses" /><FnMetric icon={Clock3} label="Pending approval" value={String(feesDemo.creditNotes.filter((c) => c.status === 'Pending').length)} detail="Awaiting review" tone="gold" /><FnMetric icon={CheckCircle2} label="Posted" value={String(feesDemo.creditNotes.filter((c) => c.status === 'Posted').length)} detail="Applied to ledger" tone="blue" /></div>
  <Panel title="Credit notes" subtitle="Corrections and waivers applied to student accounts with approval workflow">
    <div className="fn-table-wrap"><table className="fn-table"><thead><tr><th>Reference</th><th>Student</th><th>Amount</th><th>Reason</th><th>Date</th><th>Status</th><th>Approved by</th><th>Posted by</th><th>Actions</th></tr></thead>
    <tbody>{feesDemo.creditNotes.map((c) => <tr key={c.id}><td><strong>{c.reference}</strong></td><td>{c.studentName}</td><td>KES {c.amount.toLocaleString()}</td><td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.reason}</td><td>{c.date}</td><td><span className={`fn-status ${c.status === 'Posted' ? 'good' : c.status === 'Approved' ? 'info' : 'warning'}`}>{c.status}</span></td><td>{c.approvedBy ?? '—'}</td><td>{c.postedBy ?? '—'}</td><td><div className="fn-row-actions">{c.status === 'Pending' && <button className="fn-button primary" onClick={() => { const r = feesDemo.approveCreditNote(c.id); if (!r.ok) alert(r.error); }}>Approve</button>}{c.status === 'Approved' && <button className="fn-button primary" onClick={() => { const r = feesDemo.postCreditNote(c.id); if (!r.ok) alert(r.error); }}>Post</button>}</div></td></tr>)}</tbody></table></div>
  </Panel></>;
}

function FeeQueriesView({ feesDemo }: { feesDemo: ReturnType<typeof useFeesDemo> }) {
  const openQueries = feesDemo.feeQueries.filter((q) => q.status !== 'Resolved' && q.status !== 'Rejected');
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [noteMsg, setNoteMsg] = useState('');
  const selected = feesDemo.feeQueries.find((q) => q.id === selectedQuery);
  const addNote = () => {
    if (!selectedQuery || !note.trim()) return;
    const r = feesDemo.addStaffNote(selectedQuery, note);
    if (r.ok) { setNote(''); setNoteMsg('Note added.'); }
  };
  return <><div className="fn-three-grid"><FnMetric icon={HelpCircle} label="Total queries" value={String(feesDemo.feeQueries.length)} detail="All time" /><FnMetric icon={Clock3} label="Open queries" value={String(openQueries.length)} detail="Awaiting resolution" tone="gold" /><FnMetric icon={CheckCircle2} label="Resolved" value={String(feesDemo.feeQueries.filter((q) => q.status === 'Resolved').length)} detail="Closed" tone="blue" /></div>
  <Panel title="Fee queries" subtitle="Parent-submitted fee queries with assignment and resolution workflow">
    <div className="fn-table-wrap"><table className="fn-table"><thead><tr><th>Tracking No.</th><th>Parent</th><th>Student</th><th>Category</th><th>Submitted</th><th>Assigned to</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>{feesDemo.feeQueries.map((q) => <tr key={q.id}><td><strong>{q.trackingNo}</strong></td><td>{q.parentName}</td><td>{q.studentName}</td><td><span className="fn-soft-tag">{q.category}</span></td><td>{q.submittedDate}</td><td>{q.assignedTo ?? 'Unassigned'}</td><td><span className={`fn-status ${q.status === 'Resolved' ? 'good' : q.status === 'Rejected' ? 'bad' : q.status === 'Under review' ? 'info' : 'warning'}`}>{q.status}</span></td><td><div className="fn-row-actions"><button className="fn-link" onClick={() => setSelectedQuery(q.id)}>Open</button>{q.status === 'Submitted' && <button className="fn-link" onClick={() => feesDemo.assignQuery(q.id, 'Lydia Otieno')}>Assign</button>}{q.status === 'Under review' && <><button className="fn-link" onClick={() => feesDemo.resolveQuery(q.id)}>Resolve</button><button className="fn-link" onClick={() => feesDemo.rejectQuery(q.id)}>Reject</button></>}</div></td></tr>)}</tbody></table></div>
  </Panel>
  {selected && <Panel title={`Query ${selected.trackingNo}`} subtitle={`${selected.category} · ${selected.studentName} · ${selected.status}`}>
    <div className="fn-record-list">
      <div className="fn-record-row"><div><strong>Parent query</strong><span>{selected.description}</span></div></div>
      {selected.staffNotes.map((n, i) => <div className="fn-record-row" key={i}><div><strong>Staff note — {n.date}</strong><span>{n.note}</span></div></div>)}
      {selected.parentReplies.map((r, i) => <div className="fn-record-row" key={i}><div><strong>Parent reply — {r.date}</strong><span>{r.message}</span></div></div>)}
    </div>
    <div className="fn-form" style={{ paddingTop: 0 }}>
      <label>Add staff note<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Internal note or update..." /></label>
      {noteMsg && <span className="fn-form-message">{noteMsg}</span>}
      <button className="fn-button primary" type="button" onClick={addNote} disabled={!note.trim()}><Plus size={15} /> Add note</button>
    </div>
  </Panel>}</>;
}

function SettingsView({ demo }: { demo: ReturnType<typeof useFinanceDemo> }) {
  return <><Panel title="Finance settings" subtitle="Configuration changes require the authenticated backend service."><div className="fn-calendar-note"><ShieldCheck size={18} /><span><strong>Restricted finance workspace</strong><small>Current demo access is visual only and does not grant production financial authority.</small></span></div></Panel>
  <Panel title="Finance policies" subtitle="Configured rules for billing, payments and approvals"><div className="fn-record-list">
    <div className="fn-stat-row"><span>Currency</span><strong>KES (Kenyan Shilling)</strong></div>
    <div className="fn-stat-row"><span>Expense approval threshold</span><strong>KES 100,000 — principal approval required</strong></div>
    <div className="fn-stat-row"><span>Self-approval prohibited</span><strong>Yes — separation of duties enforced</strong></div>
    <div className="fn-stat-row"><span>Payment allocation policy</span><strong>Oldest-due-first</strong></div>
    <div className="fn-stat-row"><span>Receipt prefix</span><strong>RC-2026</strong></div>
    <div className="fn-stat-row"><span>Payment verification</span><strong>Required before allocation</strong></div>
  </div></Panel>
  <Panel title="Finance summary" subtitle="Current billing and payment counts"><div className="fn-record-list">
    <div className="fn-stat-row"><span>Total charges</span><strong>{demo.charges.length}</strong></div>
    <div className="fn-stat-row"><span>Paid charges</span><strong>{demo.charges.filter((c) => c.status === 'Paid').length}</strong></div>
    <div className="fn-stat-row"><span>Total payments</span><strong>{demo.payments.length}</strong></div>
    <div className="fn-stat-row"><span>Allocated payments</span><strong>{demo.payments.filter((p) => p.status === 'Allocated').length}</strong></div>
    <div className="fn-stat-row"><span>Active expenses</span><strong>{demo.expenses.filter((e) => e.status !== 'Paid' && e.status !== 'Rejected').length}</strong></div>
    <div className="fn-stat-row"><span>Journal entries</span><strong>{demo.journalEntries.length}</strong></div>
  </div></Panel></>;
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) { return <section className="fn-panel"><div className="fn-panel-head"><div><h2>{title}</h2><p>{subtitle}</p></div><MoreHorizontal size={17} style={{ color: '#b3bec2' }} /></div>{children}</section>; }
function FnMetric({ icon: Icon, label, value, detail, onClick, tone }: { icon: LucideIcon; label: string; value: string; detail: string; onClick?: () => void; tone?: string }) { const Tag = onClick ? 'button' : 'div'; return <Tag className="fn-metric" onClick={onClick}><div className={`fn-metric-icon ${tone ?? ''}`}><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></Tag>; }
function Task({ title, detail, action, onClick }: { title: string; detail: string; action: string; onClick: () => void }) { return <button className="fn-task" onClick={onClick}><div className="fn-task-icon"><CheckCircle2 size={16} /></div><span><strong>{title}</strong><small>{detail}</small></span><b>{action} <ArrowUpRight size={13} /></b></button>; }
function QuickAction({ label, icon: Icon, onClick }: { label: string; icon: LucideIcon; onClick: () => void }) { return <button className="fn-quick" onClick={onClick}><Icon size={18} /><span>{label}</span><ArrowUpRight size={13} /></button>; }
function AlertCard({ title, detail, tone, onClick }: { title: string; detail: string; tone: string; onClick: () => void }) { return <button className={`fn-alert ${tone}`} onClick={onClick}><span /><div><strong>{title}</strong><small>{detail}</small></div><ArrowUpRight size={14} /></button>; }
