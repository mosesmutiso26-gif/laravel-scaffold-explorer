import { useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, Bell, ChevronDown, CreditCard, Download, FileText, HelpCircle, Home, LogOut, Menu, MessageSquare, Plus, Printer, RotateCcw, Search, Settings, ShieldCheck, Users, Wallet, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/parent.css';
import { feesDemo, useFeesDemo, type FeeQueryCategory, type FeeQueryStatus } from '@/data/feesDemo';

type PaNav = { label: string; path: string; icon: LucideIcon; group: string };
const paNav: PaNav[] = [
  { label: 'Dashboard', path: '/parent/dashboard', icon: Home, group: 'Main' },
  { label: 'Fee statements', path: '/parent/statements', icon: FileText, group: 'Finance' },
  { label: 'Payment centre', path: '/parent/payments', icon: CreditCard, group: 'Finance' },
  { label: 'Payment plan', path: '/parent/plan', icon: Wallet, group: 'Finance' },
  { label: 'Receipts', path: '/parent/receipts', icon: Download, group: 'Finance' },
  { label: 'Support centre', path: '/parent/support', icon: HelpCircle, group: 'Support' },
  { label: 'Notifications', path: '/parent/notifications', icon: Bell, group: 'Support' },
  { label: 'My profile', path: '/parent/profile', icon: Settings, group: 'Account' },
];
const groups = ['Main', 'Finance', 'Support', 'Account'];

export function ParentPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useFeesDemo();
  const [mobile, setMobile] = useState(false);
  const [childOpen, setChildOpen] = useState(false);
  const parent = demo.parentAccounts[1]; // Otieno Sr — has 1 child with outstanding balance
  const [selectedChildId, setSelectedChildId] = useState(parent.children[0].studentId);
  const child = parent.children.find((c) => c.studentId === selectedChildId) ?? parent.children[0];
  const current = paNav.find((item) => location.pathname.startsWith(item.path)) ?? paNav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const unreadCount = demo.parentNotifications.filter((n) => n.parentName === parent.parentName && !n.read).length;
  const openQueries = demo.feeQueries.filter((q) => q.parentName === parent.parentName && q.status !== 'Resolved' && q.status !== 'Rejected').length;
  const selectChild = (id: string) => { setSelectedChildId(id); setChildOpen(false); };
  const balanceDot = child.outstanding === 0 && child.advanceCredit === 0 ? 'zero' : child.advanceCredit > 0 ? 'credit' : child.hasOverdue ? 'overdue' : 'partial';

  return <div className="pa-app">
    <header className="pa-topbar">
      <div className="pa-topbar-left">
        <button className="pa-menu-button" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button>
        <div className="pa-brand-mark"><ShieldCheck size={18} /></div>
        <div className="pa-brand"><strong>Riverside Academy</strong><span>Parent Portal</span></div>
      </div>
      <div className="pa-child-selector">
        <button className="pa-child-button" onClick={() => setChildOpen(!childOpen)}>
          <div className="pa-child-avatar">{child.studentName.split(' ').map((w) => w[0]).join('').slice(0, 2)}</div>
          <div><strong>{child.studentName}</strong><small>{child.className}</small></div>
          <ChevronDown size={15} />
        </button>
        {childOpen && <div className="pa-child-dropdown">
          {parent.children.map((c) => (
            <button key={c.studentId} className={`pa-child-option ${c.studentId === selectedChildId ? 'active' : ''}`} onClick={() => selectChild(c.studentId)}>
              <div className="pa-child-avatar">{c.studentName.split(' ').map((w) => w[0]).join('').slice(0, 2)}</div>
              <div><strong>{c.studentName}</strong><small>{c.admissionNo} · {c.className}</small></div>
              <span className={`pa-balance-dot ${c.outstanding === 0 && c.advanceCredit === 0 ? 'zero' : c.advanceCredit > 0 ? 'credit' : c.hasOverdue ? 'overdue' : 'partial'}`} />
            </button>
          ))}
        </div>}
      </div>
      <div className="pa-top-actions">
        <button className="pa-icon-button" onClick={() => navigateTo('/parent/notifications')} aria-label="Notifications"><Bell size={18} />{unreadCount > 0 && <i />}</button>
      </div>
    </header>
    <div className="pa-body">
      <aside className={`pa-sidebar ${mobile ? 'open' : ''}`}>
        <button className="pa-close" onClick={() => setMobile(false)}><X size={18} /></button>
        <nav>
          {groups.map((group) => <div className="pa-nav-group" key={group}>
            <p>{group}</p>
            {paNav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => (
              <button key={path} className={`pa-nav-item${current.path === path || (path !== '/parent/dashboard' && location.pathname.startsWith(path)) ? ' active' : ''}`} onClick={() => navigateTo(path)}>
                <Icon size={16} /><span>{label}</span>
                {label === 'Support centre' && openQueries > 0 && <em className="badge-red">{openQueries}</em>}
                {label === 'Notifications' && unreadCount > 0 && <em>{unreadCount}</em>}
              </button>
            ))}
          </div>)}
        </nav>
        <div className="pa-sidebar-footer">
          <div className="pa-user">
            <div className="pa-child-avatar">{parent.parentName.split(' ').map((w) => w[0]).join('').slice(0, 2)}</div>
            <div><strong>{parent.parentName}</strong><small>Parent / Guardian</small></div>
          </div>
        </div>
      </aside>
      {mobile && <button className="pa-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
      <main className="pa-content">
        <div className="pa-context">
          <span className="pa-kicker"><ShieldCheck size={14} /> Parent Portal <b>·</b> {child.academicYear} · {child.term}</span>
          <h1>{current.label}</h1>
          <p>{paDescription(location.pathname, child.studentName)}</p>
        </div>
        <PaRoute path={location.pathname} demo={demo} child={child} parent={parent} navigateTo={navigateTo} />
      </main>
    </div>
  </div>;
}

function paDescription(path: string, childName: string): string {
  if (path.includes('statement')) return `View and download fee statements for ${childName}.`;
  if (path.includes('payment')) return 'Check outstanding balance, payment instructions and payment history.';
  if (path.includes('plan')) return 'View instalment schedule and plan upcoming payments.';
  if (path.includes('receipt')) return 'Download official receipts for verified payments.';
  if (path.includes('support')) return 'Submit fee queries and track their resolution status.';
  if (path.includes('notification')) return 'Your fee-related notifications and delivery history.';
  if (path.includes('profile')) return 'Manage your profile, linked children and notification preferences.';
  return `A summary of ${childName}'s fee account for the current term.`;
}

function PaRoute({ path, demo, child, parent, navigateTo }: { path: string; demo: ReturnType<typeof useFeesDemo>; child: ReturnType<typeof useFeesDemo>['parentAccounts'][0]['children'][0]; parent: ReturnType<typeof useFeesDemo>['parentAccounts'][0]; navigateTo: (p: string) => void }) {
  if (path === '/parent/dashboard' || path === '/parent') return <PaDashboard demo={demo} child={child} parent={parent} navigateTo={navigateTo} />;
  if (path.startsWith('/parent/statements')) return <PaStatements demo={demo} child={child} />;
  if (path.startsWith('/parent/payments')) return <PaPayments demo={demo} child={child} />;
  if (path.startsWith('/parent/plan')) return <PaPaymentPlan demo={demo} child={child} />;
  if (path.startsWith('/parent/receipts')) return <PaReceipts demo={demo} child={child} />;
  if (path.startsWith('/parent/support')) return <PaSupport demo={demo} child={child} parent={parent} />;
  if (path.startsWith('/parent/notifications')) return <PaNotifications demo={demo} parent={parent} />;
  if (path.startsWith('/parent/profile')) return <PaProfile demo={demo} parent={parent} />;
  return <PaDashboard demo={demo} child={child} parent={parent} navigateTo={navigateTo} />;
}

function PaPanel({ title, subtitle, children, actions }: { title: string; subtitle: string; children: ReactNode; actions?: ReactNode }) {
  return <section className="pa-panel"><div className="pa-panel-head"><div><h2>{title}</h2><p>{subtitle}</p></div>{actions}</div>{children}</section>;
}

function PaDashboard({ demo, child, parent, navigateTo }: { demo: ReturnType<typeof useFeesDemo>; child: ReturnType<typeof useFeesDemo>['parentAccounts'][0]['children'][0]; parent: ReturnType<typeof useFeesDemo>['parentAccounts'][0]; navigateTo: (p: string) => void }) {
  const statement = demo.statements.find((s) => s.studentId === child.studentId);
  const ledgerEntries = demo.ledger.filter((l) => l.studentId === child.studentId);
  const recentTx = ledgerEntries.slice(-5).reverse();
  const notifications = demo.parentNotifications.filter((n) => n.parentName === parent.parentName).slice(0, 3);
  const plans = demo.paymentPlans.find((p) => p.studentId === child.studentId);
  return <>
    <div className="pa-cards">
      <div className="pa-card"><div className="pa-card-icon"><FileText size={18} /></div><span>Total billed ({child.term})</span><strong>KES {child.billed.toLocaleString()}</strong><small>{child.className}</small></div>
      <div className="pa-card"><div className="pa-card-icon blue"><CreditCard size={18} /></div><span>Verified payments</span><strong>KES {child.paid.toLocaleString()}</strong><small>{child.lastPaymentDate ? `Last: ${child.lastPaymentDate}` : 'No payments yet'}</small></div>
      <div className="pa-card"><div className={`pa-card-icon ${child.outstanding > 0 ? 'red' : 'gold'}`}><Wallet size={18} /></div><span>Outstanding balance</span><strong>KES {child.outstanding.toLocaleString()}</strong><small>{child.hasOverdue ? 'Overdue — please pay soon' : child.outstanding === 0 ? 'No outstanding balance' : 'Due ' + child.dueDate}</small></div>
      <div className="pa-card"><div className="pa-card-icon blue"><AlertTriangle size={18} /></div><span>Advance credit</span><strong>KES {child.advanceCredit.toLocaleString()}</strong><small>{child.advanceCredit > 0 ? 'Will be applied next term' : 'No advance credit'}</small></div>
    </div>
    {child.outstanding > 0 && <div className="pa-notice" style={{ marginBottom: 16 }}>
      <AlertTriangle size={16} />
      <span>{child.studentName} has KES {child.outstanding.toLocaleString()} outstanding. {child.hasOverdue ? 'This amount is overdue.' : `Due date: ${child.dueDate}.`}</span>
      <button className="pa-button primary" style={{ marginLeft: 'auto' }} onClick={() => navigateTo('/parent/payments')}>Pay now</button>
    </div>}
    <div className="pa-grid-2">
      <PaPanel title="Recent fee transactions" subtitle={`Latest activity for ${child.studentName}`}>
        <div className="pa-record-list">
          {recentTx.length > 0 ? recentTx.map((tx) => (
            <div className="pa-record-row" key={tx.id}>
              <div><strong>{tx.description}</strong><span>{tx.date} · {tx.reference} · {tx.type}</span></div>
              <span style={{ fontWeight: 700, fontSize: 10, color: tx.chargeAmount > 0 ? '#c25b5b' : tx.paymentAmount > 0 ? '#3b9368' : tx.concessionAmount > 0 ? '#2c94c5' : '#839098' }}>
                {tx.chargeAmount > 0 ? `KES ${tx.chargeAmount.toLocaleString()}` : tx.paymentAmount > 0 ? `KES ${tx.paymentAmount.toLocaleString()}` : tx.concessionAmount > 0 ? `KES ${tx.concessionAmount.toLocaleString()}` : '—'}
              </span>
              <span className={`pa-status ${tx.status === 'Posted' ? 'good' : 'warning'}`}>{tx.status}</span>
            </div>
          )) : <div className="pa-empty">No transactions yet.</div>}
        </div>
      </PaPanel>
      <div>
        <PaPanel title="Next steps" subtitle="Actions you can take">
          <div style={{ padding: '0 18px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="pa-button secondary" onClick={() => navigateTo('/parent/statements')}><FileText size={15} /> View fee statement</button>
            <button className="pa-button secondary" onClick={() => navigateTo('/parent/payments')}><CreditCard size={15} /> Payment options</button>
            <button className="pa-button secondary" onClick={() => navigateTo('/parent/receipts')}><Download size={15} /> Download receipts</button>
            <button className="pa-button secondary" onClick={() => navigateTo('/parent/support')}><MessageSquare size={15} /> Submit a query</button>
          </div>
        </PaPanel>
        <PaPanel title="Recent notifications" subtitle="Latest fee notices">
          <div className="pa-record-list">
            {notifications.map((n) => (
              <div className="pa-record-row" key={n.id}>
                <div><strong>{n.title}</strong><span>{n.date} · {n.channel}</span></div>
                {!n.read && <span className="pa-status warning">New</span>}
              </div>
            ))}
          </div>
        </PaPanel>
      </div>
    </div>
    {plans && <PaPanel title="Payment plan" subtitle="Instalment schedule for this term">
      <div style={{ padding: '0 18px 14px' }}>
        {plans.instalments.map((inst, i) => (
          <div className="pa-instalment" key={i}>
            <div style={{ minWidth: 160 }}><strong>{inst.label}</strong><br /><small>KES {inst.amount.toLocaleString()} · {inst.status}</small></div>
            <div className="pa-instalment-bar"><b style={{ width: `${inst.amount > 0 ? Math.round((inst.paidAmount / inst.amount) * 100) : 0}%` }} /></div>
            <span>KES {(inst.amount - inst.paidAmount).toLocaleString()} left</span>
          </div>
        ))}
      </div>
    </PaPanel>}
  </>;
}

function PaStatements({ demo, child }: { demo: ReturnType<typeof useFeesDemo>; child: ReturnType<typeof useFeesDemo>['parentAccounts'][0]['children'][0] }) {
  const statement = demo.statements.find((s) => s.studentId === child.studentId);
  const ledgerEntries = demo.ledger.filter((l) => l.studentId === child.studentId && l.status === 'Posted');
  if (!statement) return <PaPanel title="Fee statements" subtitle="No statements available"><div className="pa-empty">No fee statement has been issued for {child.studentName} yet. You will receive a notification when one is available.</div></PaPanel>;
  return <>
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      <button className="pa-button primary" onClick={() => window.print()}><Printer size={15} /> Print statement</button>
      <button className="pa-button secondary" onClick={() => feesDemo.reissueStatement(statement.id)}><RotateCcw size={15} /> Request reissue</button>
    </div>
    <div className="pa-statement">
      <div className="pa-statement-head">
        <strong>Riverside Academy</strong>
        <span>Fee Statement — {statement.academicYear} · {statement.term}</span>
      </div>
      <div className="pa-statement-meta">
        <div><span>Student</span><strong>{statement.studentName}</strong></div>
        <div><span>Admission No.</span><strong>{statement.admissionNo}</strong></div>
        <div><span>Statement No.</span><strong>{statement.statementNo}</strong></div>
        <div><span>Issue Date</span><strong>{statement.issueDate}</strong></div>
        <div><span>Class</span><strong>{statement.className}</strong></div>
        <div><span>Package</span><strong>{statement.packageName}</strong></div>
        <div><span>Period</span><strong>{statement.periodFrom} — {statement.periodTo}</strong></div>
        <div><span>Due Date</span><strong>{statement.dueDate}</strong></div>
      </div>
      <div className="pa-table-wrap"><table className="pa-statement-table">
        <thead><tr><th>Date</th><th>Reference</th><th>Description</th><th>Type</th><th className="num">Charges</th><th className="num">Payments</th><th className="num">Concessions</th><th className="num">Balance</th></tr></thead>
        <tbody>
          {ledgerEntries.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.date}</td><td>{tx.reference}</td><td>{tx.description}</td><td>{tx.type}</td>
              <td className="num">{tx.chargeAmount > 0 ? tx.chargeAmount.toLocaleString() : '—'}</td>
              <td className="num">{tx.paymentAmount > 0 ? tx.paymentAmount.toLocaleString() : '—'}</td>
              <td className="num">{tx.concessionAmount > 0 ? tx.concessionAmount.toLocaleString() : '—'}</td>
              <td className="num">{tx.runningBalance.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr><td colSpan={4}>Totals</td><td className="num">{statement.totalCharges.toLocaleString()}</td><td className="num">{statement.totalPayments.toLocaleString()}</td><td className="num">{statement.totalConcessions.toLocaleString()}</td><td className="num">{statement.outstandingBalance.toLocaleString()}</td></tr>
        </tfoot>
      </table></div>
      <div className="pa-statement-totals">
        <div><span>Opening balance</span><strong>KES {statement.openingBalance.toLocaleString()}</strong></div>
        <div><span>Total charges</span><strong>KES {statement.totalCharges.toLocaleString()}</strong></div>
        <div><span>Verified payments</span><strong>KES {statement.totalPayments.toLocaleString()}</strong></div>
        <div><span>Approved concessions</span><strong>KES {statement.totalConcessions.toLocaleString()}</strong></div>
        <div><span>Outstanding balance</span><strong className={statement.outstandingBalance === 0 ? 'zero' : 'outstanding'}>KES {statement.outstandingBalance.toLocaleString()}</strong></div>
        <div><span>Advance credit</span><strong className={statement.unallocatedCredit > 0 ? 'credit' : 'zero'}>KES {statement.unallocatedCredit.toLocaleString()}</strong></div>
      </div>
      <div className="pa-statement-footer">
        <strong>Payment instructions:</strong> Pay via M-Pesa Paybill 522522, Account: {child.admissionNo}. Bank: Equity Bank, Account 0110123456789. Cash accepted at the bursar's office.<br />
        <strong>Contact:</strong> info@riversideacademy.ac.ke · +254 700 123 456<br />
        <strong>Statement status:</strong> {statement.status} · Generated on {statement.issueDate}
      </div>
    </div>
  </>;
}

function PaPayments({ demo, child }: { demo: ReturnType<typeof useFeesDemo>; child: ReturnType<typeof useFeesDemo>['parentAccounts'][0]['children'][0] }) {
  const payments = demo.ledger.filter((l) => l.studentId === child.studentId && (l.type === 'Payment' || l.type === 'Allocation'));
  const pending = payments.filter((p) => p.status === 'Pending');
  return <>
    {child.outstanding > 0 && <div className="pa-notice" style={{ marginBottom: 16 }}>
      <AlertTriangle size={16} />
      <span>Outstanding: KES {child.outstanding.toLocaleString()} — {child.hasOverdue ? 'OVERDUE' : `Due ${child.dueDate}`}</span>
    </div>}
    <div className="pa-grid-2">
      <PaPanel title="Payment instructions" subtitle="How to pay school fees">
        <div style={{ padding: '0 18px 14px', fontSize: 11, lineHeight: 1.7, color: '#52616a' }}>
          <p style={{ margin: '0 0 10px' }}><strong style={{ color: '#2a8c6e' }}>M-Pesa:</strong> Paybill 522522, Account: {child.admissionNo}</p>
          <p style={{ margin: '0 0 10px' }}><strong style={{ color: '#2a8c6e' }}>Bank transfer:</strong> Equity Bank, Account 0110123456789, Reference: {child.admissionNo}</p>
          <p style={{ margin: '0 0 10px' }}><strong style={{ color: '#2a8c6e' }}>Cash:</strong> Pay at the bursar's office during working hours</p>
          <p style={{ margin: '0', fontSize: 10, color: '#9aa6ab' }}>Always include the admission number as reference. Payments are verified by the bursar within 24 hours.</p>
        </div>
      </PaPanel>
      <PaPanel title="Payment summary" subtitle="Current term payment status">
        <div style={{ padding: '0 18px 14px' }}>
          <div className="pa-record-row"><div><strong>Total billed</strong></div><strong style={{ fontSize: 11 }}>KES {child.billed.toLocaleString()}</strong></div>
          <div className="pa-record-row"><div><strong>Verified payments</strong></div><strong style={{ fontSize: 11, color: '#3b9368' }}>KES {child.paid.toLocaleString()}</strong></div>
          <div className="pa-record-row"><div><strong>Outstanding</strong></div><strong style={{ fontSize: 11, color: child.outstanding > 0 ? '#c25b5b' : '#3b9368' }}>KES {child.outstanding.toLocaleString()}</strong></div>
          <div className="pa-record-row"><div><strong>Advance credit</strong></div><strong style={{ fontSize: 11, color: child.advanceCredit > 0 ? '#2c94c5' : '#839098' }}>KES {child.advanceCredit.toLocaleString()}</strong></div>
        </div>
      </PaPanel>
    </div>
    {pending.length > 0 && <div className="pa-notice info" style={{ marginBottom: 16 }}>
      <CreditCard size={16} />
      <span>{pending.length} payment(s) pending verification — not yet reflected in the balance.</span>
    </div>}
    <PaPanel title="Payment history" subtitle="All payments for this term">
      <div className="pa-record-list">
        {payments.map((p) => (
          <div className="pa-record-row" key={p.id}>
            <div><strong>{p.reference}</strong><span>{p.date} · {p.description}</span></div>
            <strong style={{ fontSize: 10 }}>{p.paymentAmount > 0 ? `KES ${p.paymentAmount.toLocaleString()}` : '—'}</strong>
            <span className={`pa-status ${p.status === 'Posted' ? 'good' : 'warning'}`}>{p.status}</span>
          </div>
        ))}
        {payments.length === 0 && <div className="pa-empty">No payments recorded yet.</div>}
      </div>
    </PaPanel>
  </>;
}

function PaPaymentPlan({ demo, child }: { demo: ReturnType<typeof useFeesDemo>; child: ReturnType<typeof useFeesDemo>['parentAccounts'][0]['children'][0] }) {
  const plan = demo.paymentPlans.find((p) => p.studentId === child.studentId);
  return <>
    <PaPanel title="Payment plan" subtitle="Instalment schedule and progress for this term">
      {plan ? <div style={{ padding: '0 18px 14px' }}>
        {plan.instalments.map((inst, i) => (
          <div className="pa-instalment" key={i}>
            <div style={{ minWidth: 170 }}><strong>{inst.label}</strong><br /><small>KES {inst.amount.toLocaleString()} · {inst.status}</small></div>
            <div className="pa-instalment-bar"><b style={{ width: `${inst.amount > 0 ? Math.round((inst.paidAmount / inst.amount) * 100) : 0}%` }} /></div>
            <span>KES {(inst.amount - inst.paidAmount).toLocaleString()} left</span>
          </div>
        ))}
      </div> : <div className="pa-empty">No payment plan configured for {child.studentName}. Please contact the finance office if you need an instalment arrangement.</div>}
    </PaPanel>
    {child.outstanding > 0 && <PaPanel title="Plan a partial payment" subtitle="Enter an amount to see how it affects the balance">
      <PartialPaymentPreview child={child} />
    </PaPanel>}
  </>;
}

function PartialPaymentPreview({ child }: { child: ReturnType<typeof useFeesDemo>['parentAccounts'][0]['children'][0] }) {
  const [amount, setAmount] = useState('');
  const parsed = parseInt(amount, 10) || 0;
  const remaining = Math.max(0, child.outstanding - parsed);
  return <div className="pa-form" style={{ padding: '0 18px 14px' }}>
    <label>Proposed amount (KES)<input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 20000" /></label>
    {parsed > 0 && <div className="pa-notice info">
      <Wallet size={15} />
      <span>If KES {parsed.toLocaleString()} is paid and verified, the remaining balance would be KES {remaining.toLocaleString()}. This is a preview — no payment has been made.</span>
    </div>}
    {parsed > child.outstanding && <div className="pa-notice good">
      <AlertTriangle size={15} />
      <span>This amount exceeds the outstanding balance. The excess would become an advance credit of KES {(parsed - child.outstanding).toLocaleString()}.</span>
    </div>}
  </div>;
}

function PaReceipts({ demo, child }: { demo: ReturnType<typeof useFeesDemo>; child: ReturnType<typeof useFeesDemo>['parentAccounts'][0]['children'][0] }) {
  const receipts = demo.ledger.filter((l) => l.studentId === child.studentId && l.type === 'Payment' && l.status === 'Posted');
  return <PaPanel title="Official receipts" subtitle="Download receipts for verified payments">
    <div className="pa-record-list">
      {receipts.length > 0 ? receipts.map((r) => (
        <div className="pa-record-row" key={r.id}>
          <div><strong>{r.reference}</strong><span>{r.date} · {r.description}</span></div>
          <strong style={{ fontSize: 10 }}>KES {r.paymentAmount.toLocaleString()}</strong>
          <div className="pa-row-actions">
            <button className="pa-button secondary" onClick={() => window.print()}><Download size={14} /> Download</button>
          </div>
        </div>
      )) : <div className="pa-empty">No receipts available. Receipts are issued after payment verification.</div>}
    </div>
  </PaPanel>;
}

function PaSupport({ demo, child, parent }: { demo: ReturnType<typeof useFeesDemo>; child: ReturnType<typeof useFeesDemo>['parentAccounts'][0]['children'][0]; parent: ReturnType<typeof useFeesDemo>['parentAccounts'][0] }) {
  const [category, setCategory] = useState<FeeQueryCategory>('Statement discrepancy');
  const [description, setDescription] = useState('');
  const [ref, setRef] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const queries = demo.feeQueries.filter((q) => q.parentName === parent.parentName);
  const submit = () => {
    if (!description.trim()) { setError('Please describe your query.'); return; }
    const result = feesDemo.submitFeeQuery(parent.parentName, child.studentId, child.studentName, category, description, ref || null);
    if (result.ok) { setSuccess(`Query submitted. Tracking number: FQ-2026-${43 + demo.feeQueries.length - 1}`); setError(''); setDescription(''); setRef(''); }
    else { setError(result.error ?? 'Submission failed.'); setSuccess(''); }
  };
  return <>
    <PaPanel title="Submit a fee query" subtitle="Report a discrepancy or ask about a charge">
      <div className="pa-form">
        <div className="pa-form-row">
          <label>Category<select value={category} onChange={(e) => setCategory(e.target.value as FeeQueryCategory)}>
            <option>Incorrect charge</option><option>Missing payment</option><option>Statement discrepancy</option>
            <option>Allocation error</option><option>Concession query</option><option>Other</option>
          </select></label>
          <label>Transaction reference (optional)<input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="e.g. RC-2026-10145" /></label>
        </div>
        <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue or your question..." /></label>
        {error && <span className="pa-form-error">{error}</span>}
        {success && <span className="pa-form-message">{success}</span>}
        <button className="pa-button primary" onClick={submit}><Plus size={15} /> Submit query</button>
      </div>
    </PaPanel>
    <PaPanel title="Your queries" subtitle={`${queries.length} query(s) — track status and responses`}>
      <div style={{ padding: '0 18px 14px' }}>
        {queries.length > 0 ? queries.map((q) => (
          <div className="pa-query-item" key={q.id}>
            <div className="pa-query-head">
              <div style={{ flex: 1 }}>
                <strong>{q.trackingNo}</strong><br /><span>{q.category} · {q.studentName} · {q.submittedDate}</span>
              </div>
              <span className={`pa-status ${q.status === 'Resolved' ? 'good' : q.status === 'Rejected' ? 'bad' : q.status === 'Under review' ? 'info' : 'warning'}`}>{q.status}</span>
            </div>
            <div className="pa-query-body">
              <p style={{ margin: '0 0 8px' }}>{q.description}</p>
              {q.staffNotes.map((note, i) => <div className="pa-query-note staff" key={i}><strong>Staff note — {note.date}:</strong> {note.note}</div>)}
              {q.parentReplies.map((reply, i) => <div className="pa-query-note parent" key={i}><strong>Your reply — {reply.date}:</strong> {reply.message}</div>)}
            </div>
          </div>
        )) : <div className="pa-empty">No queries submitted yet.</div>}
      </div>
    </PaPanel>
  </>;
}

function PaNotifications({ demo, parent }: { demo: ReturnType<typeof useFeesDemo>; parent: ReturnType<typeof useFeesDemo>['parentAccounts'][0] }) {
  const notifications = demo.parentNotifications.filter((n) => n.parentName === parent.parentName);
  return <PaPanel title="Notifications" subtitle="Your fee-related notifications and delivery status">
    <div className="pa-record-list">
      {notifications.map((n) => (
        <div className="pa-record-row" key={n.id}>
          <div><strong>{n.title}</strong><span>{n.message} · {n.date} · {n.channel} · {n.deliveryStatus}</span></div>
          {!n.read ? <button className="pa-link" onClick={() => feesDemo.markParentNotificationRead(n.id)}>Mark read</button> : <span className="pa-status good">Read</span>}
        </div>
      ))}
      {notifications.length === 0 && <div className="pa-empty">No notifications.</div>}
    </div>
  </PaPanel>;
}

function PaProfile({ demo, parent }: { demo: ReturnType<typeof useFeesDemo>; parent: ReturnType<typeof useFeesDemo>['parentAccounts'][0] }) {
  const [prefs, setPrefs] = useState(parent.notificationPrefs);
  const updatePref = (key: 'email' | 'sms' | 'inApp') => {
    const newPrefs = { ...prefs, [key]: !prefs[key] };
    setPrefs(newPrefs);
    feesDemo.updateNotificationPrefs(parent.id, newPrefs);
  };
  return <>
    <PaPanel title="My profile" subtitle="Verified contact information">
      <div style={{ padding: '0 18px 14px' }}>
        <div className="pa-record-row"><div><strong>Name</strong></div><span style={{ fontSize: 10 }}>{parent.parentName}</span></div>
        <div className="pa-record-row"><div><strong>Email</strong></div><span style={{ fontSize: 10 }}>{parent.email}</span></div>
        <div className="pa-record-row"><div><strong>Phone</strong></div><span style={{ fontSize: 10 }}>{parent.phone}</span></div>
      </div>
    </PaPanel>
    <PaPanel title="Linked children" subtitle={`${parent.children.length} student(s) linked to your account`}>
      <div style={{ padding: '0 18px 14px' }}>
        {parent.children.map((c) => (
          <div className="pa-child-card" key={c.studentId}>
            <div className="pa-child-avatar">{c.studentName.split(' ').map((w) => w[0]).join('').slice(0, 2)}</div>
            <div><strong>{c.studentName}</strong><small>{c.admissionNo} · {c.className} · {c.packageName}</small></div>
            <span className={`pa-status ${c.outstanding === 0 ? 'good' : c.hasOverdue ? 'bad' : 'warning'}`}>{c.outstanding === 0 ? 'Paid' : c.hasOverdue ? 'Overdue' : 'Part-paid'}</span>
          </div>
        ))}
        <p style={{ fontSize: 9, color: '#9aa6ab', margin: '8px 0 0' }}>To link an additional child, contact the school office for verification.</p>
      </div>
    </PaPanel>
    <PaPanel title="Notification preferences" subtitle="Choose how you receive fee notifications">
      <div style={{ padding: '0 18px 14px' }}>
        <div className="pa-toggle"><span>Email notifications</span><button className={`pa-toggle-switch ${prefs.email ? 'on' : ''}`} onClick={() => updatePref('email')} /></div>
        <div className="pa-toggle"><span>SMS notifications</span><button className={`pa-toggle-switch ${prefs.sms ? 'on' : ''}`} onClick={() => updatePref('sms')} /></div>
        <div className="pa-toggle"><span>In-app notifications</span><button className={`pa-toggle-switch ${prefs.inApp ? 'on' : ''}`} onClick={() => updatePref('inApp')} /></div>
      </div>
    </PaPanel>
    <PaPanel title="Account security" subtitle="Session and authentication settings">
      <div style={{ padding: '0 18px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button className="pa-button secondary"><Settings size={14} /> Change password</button>
        <button className="pa-button secondary"><LogOut size={14} /> Sign out</button>
      </div>
    </PaPanel>
  </>;
}
