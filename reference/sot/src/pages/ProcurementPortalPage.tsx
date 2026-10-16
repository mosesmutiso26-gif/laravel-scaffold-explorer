import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Activity, AlertTriangle, ArrowRight, BarChart3, Bell, Building2, CheckCircle2, ChevronDown, ClipboardList, Clock3, FileText, HelpCircle, LayoutDashboard, LogOut, Menu, MoreHorizontal, Package, Plus, RotateCcw, Search, Settings, ShieldCheck, ShoppingCart, Truck, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/procurement.css';
import { procurementDemo, useProcurementDemo, type RequisitionPriority, type ItemCategory } from '@/data/procurementDemo';

type PrNav = { label: string; path: string; icon: LucideIcon; group: string };
const prNav: PrNav[] = [
  { label: 'Dashboard', path: '/procurement/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Requisitions', path: '/procurement/requisitions', icon: ClipboardList, group: 'Procurement' },
  { label: 'Quotations', path: '/procurement/quotations', icon: FileText, group: 'Procurement' },
  { label: 'Purchase orders', path: '/procurement/orders', icon: ShoppingCart, group: 'Procurement' },
  { label: 'Goods receiving', path: '/procurement/grns', icon: Truck, group: 'Procurement' },
  { label: 'Suppliers', path: '/procurement/suppliers', icon: Building2, group: 'Procurement' },
  { label: 'Inventory catalogue', path: '/procurement/inventory', icon: Package, group: 'Stores' },
  { label: 'Stock movements', path: '/procurement/movements', icon: ArrowRight, group: 'Stores' },
  { label: 'Issue requests', path: '/procurement/issues', icon: ClipboardList, group: 'Stores' },
  { label: 'Transfers', path: '/procurement/transfers', icon: ArrowRight, group: 'Stores' },
  { label: 'Stock counts', path: '/procurement/counts', icon: BarChart3, group: 'Stores' },
  { label: 'Supplier invoices', path: '/procurement/invoices', icon: FileText, group: 'Finance' },
  { label: 'Notifications', path: '/procurement/notifications', icon: Bell, group: 'Operations' },
  { label: 'Reports', path: '/procurement/reports', icon: BarChart3, group: 'Controls' },
  { label: 'Audit history', path: '/procurement/audit', icon: Activity, group: 'Controls' },
  { label: 'Settings', path: '/procurement/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Procurement', 'Stores', 'Finance', 'Operations', 'Controls', 'Account'];

export function ProcurementPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useProcurementDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const current = prNav.find((item) => location.pathname.startsWith(item.path)) ?? prNav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const pendingReqs = demo.requisitions.filter((r) => r.status === 'Submitted' || r.status === 'Under review').length;
  const pendingPOs = demo.purchaseOrders.filter((p) => p.status === 'Pending approval').length;
  const lowStock = demo.inventory.filter((i) => i.onHand <= i.reorderLevel).length;
  const unreadCount = demo.notifications.filter((n) => n.unread).length;
  return <div className="pr-app">
    <aside className={`pr-sidebar ${mobile ? 'open' : ''}`}><div className="pr-brand"><div className="pr-brand-mark"><Package size={21} /></div><div><strong>Riverside</strong><span>Academy Stores</span></div><button className="pr-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div><div className="pr-demo-pill"><span className="pr-demo-dot" /> DEMO MODE <span>•</span> October 2026</div><div className="pr-school"><div>RA</div><span><strong>Riverside Academy</strong><small>Procurement & stores</small></span><ChevronDown size={15} /></div><nav className="pr-nav">{groups.map((group) => <div className="pr-nav-group" key={group}><p>{group}</p>{prNav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={`pr-nav-item${current.path === path || (path !== '/procurement/dashboard' && location.pathname.startsWith(path)) ? ' active' : ''}`} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Requisitions' && pendingReqs > 0 && <em className="badge-red">{pendingReqs}</em>}{label === 'Purchase orders' && pendingPOs > 0 && <em className="badge-red">{pendingPOs}</em>}{label === 'Inventory catalogue' && lowStock > 0 && <em>{lowStock}</em>}{label === 'Notifications' && unreadCount > 0 && <em>{unreadCount}</em>}</button>)}</div>)}</nav><div className="pr-sidebar-footer"><button onClick={() => navigateTo('/procurement/help')}><HelpCircle size={16} /> Help centre</button><div className="pr-user"><div className="pr-avatar">PM</div><span><strong>Patrick Mwangi</strong><small>Procurement Officer</small></span><MoreHorizontal size={16} /></div></div></aside>
    {mobile && <button className="pr-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="pr-main"><header className="pr-topbar"><button className="pr-menu-button" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="pr-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="pr-top-actions"><div className="pr-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search items, POs, suppliers..." /></div><button className="pr-icon-button" onClick={() => navigateTo('/procurement/notifications')} aria-label="Open notifications"><Bell size={18} />{unreadCount > 0 && <i />}</button><div className="pr-profile-wrap"><button className="pr-profile" onClick={() => setProfileOpen(!profileOpen)}><div className="pr-avatar">PM</div><span>Procurement</span><ChevronDown size={15} /></button>{profileOpen && <div className="pr-profile-menu"><strong>Patrick Mwangi</strong><small>Procurement Officer</small><button onClick={() => navigateTo('/procurement/settings')}><Settings size={14} /> Settings</button><button onClick={() => procurementDemo.reset()}><RotateCcw size={14} /> Reset demo data</button><button onClick={() => navigateTo('/')}><LogOut size={14} /> Exit portal</button></div>}</div></div></header><div className="pr-content"><div className="pr-context"><div><span className="pr-kicker"><ShieldCheck size={14} /> Procurement workspace <b>•</b> 2026 · Term 3</span><h1>{current.label}</h1><p>{prDescription(location.pathname)}</p></div><div className="pr-context-actions"><button className="pr-button primary" onClick={() => navigateTo('/procurement/requisitions')}><Plus size={15} /> New requisition</button></div></div><PrRoute path={location.pathname} demo={demo} search={search} navigateTo={navigateTo} /></div></main>
  </div>;
}

function prDescription(path: string): string {
  if (path.includes('requisition')) return 'Create, submit and approve purchase requisitions with line items and workflow tracking.';
  if (path.includes('quotation')) return 'Compare supplier quotations, evaluate and recommend the best offer.';
  if (path.includes('order')) return 'Manage purchase orders from draft through approval, dispatch and receipt.';
  if (path.includes('grn')) return 'Record goods received notes against purchase orders with inspection and stock updates.';
  if (path.includes('supplier')) return 'Maintain the supplier register with performance, approval status and order history.';
  if (path.includes('inventory')) return 'Browse the item catalogue with stock levels, reorder points and valuation.';
  if (path.includes('movement')) return 'Full stock movement ledger — receipts, issues, transfers and adjustments.';
  if (path.includes('issue')) return 'Department issue requests with approval, stock deduction and acknowledgment.';
  if (path.includes('transfer')) return 'Inter-store transfers with dispatch, in-transit and receipt lifecycle.';
  if (path.includes('count')) return 'Physical stocktaking sessions with variance analysis and approved adjustments.';
  if (path.includes('invoice')) return 'Supplier invoice matching against purchase orders and goods received notes.';
  if (path.includes('notification')) return 'Procurement and stores alerts sent to staff and approvers.';
  if (path.includes('report')) return 'Generate procurement and inventory reports from documented data sources.';
  if (path.includes('audit')) return 'Every procurement and stock operation is recorded with actor, action and timestamp.';
  return 'A complete view of purchasing, receiving, inventory and supplier management for school stores.';
}

function PrRoute({ path, demo, navigateTo }: { path: string; demo: ReturnType<typeof useProcurementDemo>; search: string; navigateTo: (p: string) => void }) {
  if (path === '/procurement/dashboard' || path === '/procurement') return <PrDashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/procurement/requisitions')) return <RequisitionsView demo={demo} />;
  if (path.startsWith('/procurement/quotations')) return <QuotationsView demo={demo} />;
  if (path.startsWith('/procurement/orders')) return <OrdersView demo={demo} />;
  if (path.startsWith('/procurement/grns')) return <GRNsView demo={demo} />;
  if (path.startsWith('/procurement/suppliers')) return <SuppliersView demo={demo} />;
  if (path.startsWith('/procurement/inventory')) return <InventoryView demo={demo} />;
  if (path.startsWith('/procurement/movements')) return <MovementsView demo={demo} />;
  if (path.startsWith('/procurement/issues')) return <IssuesView demo={demo} />;
  if (path.startsWith('/procurement/transfers')) return <TransfersView demo={demo} />;
  if (path.startsWith('/procurement/counts')) return <CountsView demo={demo} />;
  if (path.startsWith('/procurement/invoices')) return <InvoicesView demo={demo} />;
  if (path.startsWith('/procurement/notifications')) return <NotificationsView demo={demo} />;
  if (path.startsWith('/procurement/reports')) return <ReportsView demo={demo} />;
  if (path.startsWith('/procurement/audit')) return <AuditView demo={demo} />;
  return <SettingsView />;
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return <div className="pr-panel"><div className="pr-panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>{children}</div>;
}
function PrMetric({ icon: Icon, label, value, detail, tone, onClick }: { icon: LucideIcon; label: string; value: string; detail: string; tone?: string; onClick: () => void }) {
  return <button className="pr-metric" onClick={onClick}><div className={`pr-metric-icon ${tone ?? ''}`}><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></button>;
}
function Task({ title, detail, action, onClick }: { title: string; detail: string; action: string; onClick: () => void }) {
  return <button className="pr-task" onClick={onClick}><div className="pr-task-icon"><Clock3 size={14} /></div><div><strong>{title}</strong><small>{detail}</small></div><b>{action} <ArrowRight size={12} /></b></button>;
}
function QuickAction({ label, icon: Icon, onClick }: { label: string; icon: LucideIcon; onClick: () => void }) {
  return <button className="pr-quick" onClick={onClick}><Icon size={16} /> {label} <ArrowRight size={13} /></button>;
}
function AlertCard({ title, detail, tone, onClick }: { title: string; detail: string; tone: string; onClick: () => void }) {
  return <button className={`pr-alert ${tone}`} onClick={onClick}><span /><div><strong>{title}</strong><small>{detail}</small></div><ArrowRight size={15} /></button>;
}

function PrDashboard({ demo, navigateTo }: { demo: ReturnType<typeof useProcurementDemo>; navigateTo: (p: string) => void }) {
  const pendingReqs = demo.requisitions.filter((r) => r.status === 'Submitted' || r.status === 'Under review');
  const pendingPOs = demo.purchaseOrders.filter((p) => p.status === 'Pending approval');
  const lowStockItems = demo.inventory.filter((i) => i.onHand <= i.reorderLevel);
  const outOfStock = demo.inventory.filter((i) => i.onHand === 0);
  const activePOs = demo.purchaseOrders.filter((p) => p.status === 'Sent' || p.status === 'Partially received');
  const totalPOValue = demo.purchaseOrders.reduce((s, p) => s + p.total, 0);
  const inventoryValue = demo.inventory.reduce((s, i) => s + i.onHand * i.unitCost, 0);
  const pendingInvoices = demo.invoices.filter((i) => i.status === 'Discrepancy' || i.status === 'Pending');
  return <><div className="pr-kpi-grid">
    <PrMetric icon={ClipboardList} label="Pending requisitions" value={String(pendingReqs.length)} detail="Awaiting review or approval" tone="gold" onClick={() => navigateTo('/procurement/requisitions')} />
    <PrMetric icon={ShoppingCart} label="Active POs" value={String(activePOs.length + pendingPOs.length)} detail={`KES ${totalPOValue.toLocaleString()} total value`} onClick={() => navigateTo('/procurement/orders')} />
    <PrMetric icon={Package} label="Inventory items" value={String(demo.inventory.length)} detail={`KES ${inventoryValue.toLocaleString()} stock value`} tone="blue" onClick={() => navigateTo('/procurement/inventory')} />
    <PrMetric icon={AlertTriangle} label="Low / out of stock" value={String(lowStockItems.length)} detail={`${outOfStock.length} out of stock`} tone="red" onClick={() => navigateTo('/procurement/inventory')} />
  </div>
  <div className="pr-main-grid">
    <Panel title="Stock health by category" subtitle="On-hand items grouped by category — reorder status">
      <div className="pr-bars">
        {(['Textbooks', 'Stationery', 'Cleaning', 'Kitchen', 'Boarding', 'Laboratory', 'Sports'] as ItemCategory[]).map((cat) => {
          const items = demo.inventory.filter((i) => i.category === cat);
          const lowCount = items.filter((i) => i.onHand <= i.reorderLevel).length;
          const pct = items.length > 0 ? Math.round(((items.length - lowCount) / items.length) * 100) : 0;
          return <div key={cat}><span>{cat}</span><i><b style={{ width: `${pct}%` }} /></i><strong>{items.length} items</strong></div>;
        })}
      </div>
    </Panel>
    <Panel title="Task centre" subtitle="Items needing procurement attention">
      <div className="pr-task-list">
        {pendingReqs.length > 0 && <Task title={`${pendingReqs.length} requisitions awaiting approval`} detail={pendingReqs.map((r) => r.reference).join(', ')} action="Review" onClick={() => navigateTo('/procurement/requisitions')} />}
        {pendingPOs.length > 0 && <Task title={`${pendingPOs.length} POs awaiting approval`} detail={pendingPOs.map((p) => p.poNumber).join(', ')} action="Approve" onClick={() => navigateTo('/procurement/orders')} />}
        {lowStockItems.length > 0 && <Task title={`${lowStockItems.length} items below reorder level`} detail={lowStockItems.slice(0, 3).map((i) => i.name).join(', ')} action="Reorder" onClick={() => navigateTo('/procurement/inventory')} />}
        {pendingInvoices.length > 0 && <Task title={`${pendingInvoices.length} invoices with discrepancies`} detail={pendingInvoices.map((i) => i.invoiceNumber).join(', ')} action="Review" onClick={() => navigateTo('/procurement/invoices')} />}
        {demo.transfers.filter((t) => t.status === 'In transit').length > 0 && <Task title={`${demo.transfers.filter((t) => t.status === 'In transit').length} transfers in transit`} detail="Awaiting receipt at destination store" action="Receive" onClick={() => navigateTo('/procurement/transfers')} />}
        {pendingReqs.length === 0 && pendingPOs.length === 0 && lowStockItems.length === 0 && <Task title="All clear" detail="No pending procurement tasks" action="View" onClick={() => navigateTo('/procurement/dashboard')} />}
      </div>
    </Panel>
  </div>
  <div className="pr-main-grid pr-lower-grid">
    <Panel title="Recent purchase orders" subtitle="Latest procurement activity">
      <div className="pr-record-list">{demo.purchaseOrders.slice(0, 5).map((p) => <div className="pr-record-row" key={p.id}><div><strong>{p.poNumber} · {p.supplierName}</strong><span>{p.department} · {p.lines.length} items · KES {p.total.toLocaleString()} · {p.createdDate}</span></div><span className={`pr-status ${p.status === 'Received' ? 'good' : p.status === 'Partially received' ? 'warning' : p.status === 'Pending approval' ? 'warning' : p.status === 'Cancelled' ? 'bad' : 'info'}`}>{p.status}</span></div>)}</div>
    </Panel>
    <Panel title="Quick actions" subtitle="Common procurement operations">
      <div className="pr-quick-grid">
        <QuickAction label="New requisition" icon={ClipboardList} onClick={() => navigateTo('/procurement/requisitions')} />
        <QuickAction label="Receive goods" icon={Truck} onClick={() => navigateTo('/procurement/grns')} />
        <QuickAction label="Issue stock" icon={Package} onClick={() => navigateTo('/procurement/issues')} />
        <QuickAction label="Add supplier" icon={Building2} onClick={() => navigateTo('/procurement/suppliers')} />
      </div>
    </Panel>
  </div>
  <Panel title="Alerts" subtitle="Stock, procurement and invoice alerts">
    <div className="pr-alert-grid">
      {lowStockItems.length > 0 && <AlertCard title="Low stock alert" detail={`${lowStockItems.length} items at or below reorder level — ${lowStockItems.slice(0, 2).map((i) => i.name).join(', ')}`} tone="gold" onClick={() => navigateTo('/procurement/inventory')} />}
      {pendingInvoices.length > 0 && <AlertCard title="Invoice discrepancy" detail={`${pendingInvoices.length} supplier invoice(s) need matching review`} tone="red" onClick={() => navigateTo('/procurement/invoices')} />}
      {demo.suppliers.filter((s) => s.status === 'Pending review').length > 0 && <AlertCard title="Supplier pending review" detail={`${demo.suppliers.filter((s) => s.status === 'Pending review').length} supplier(s) awaiting approval`} tone="blue" onClick={() => navigateTo('/procurement/suppliers')} />}
    </div>
  </Panel></>;
}

function RequisitionsView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  const [department, setDepartment] = useState('Academic');
  const [priority, setPriority] = useState<RequisitionPriority>('Normal');
  const [justification, setJustification] = useState('');
  const [budgetCategory, setBudgetCategory] = useState('Learning materials');
  const [requiredBy, setRequiredBy] = useState('25 Oct 2026');
  const [lineDesc, setLineDesc] = useState('');
  const [lineQty, setLineQty] = useState('');
  const [lineUnit, setLineUnit] = useState('pcs');
  const [linePrice, setLinePrice] = useState('');
  const [lines, setLines] = useState<{ description: string; quantity: number; unit: string; estimatedUnitPrice: number }[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [approvalNote] = useState('');
  const addLine = () => {
    if (!lineDesc.trim() || !lineQty || !linePrice) { setError('Description, quantity and price are required for line items.'); return; }
    setLines([...lines, { description: lineDesc.trim(), quantity: parseInt(lineQty, 10), unit: lineUnit, estimatedUnitPrice: parseInt(linePrice, 10) }]);
    setLineDesc(''); setLineQty(''); setLinePrice('');
    setError('');
  };
  const submit = () => {
    if (!justification.trim()) { setError('Justification is required.'); return; }
    if (lines.length === 0) { setError('At least one line item is required.'); return; }
    const result = procurementDemo.createRequisition(department, priority, justification, budgetCategory, requiredBy, lines);
    if (result.ok) { setSuccess('Requisition created as draft. Submit it for approval.'); setError(''); setJustification(''); setLines([]); }
    else { setError(result.error ?? 'Creation failed.'); setSuccess(''); }
  };
  return <><Panel title="Create requisition" subtitle="Submit a purchase request with line items for approval">
    <div className="pr-form">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
        <label>Department<select value={department} onChange={(e) => setDepartment(e.target.value)}><option>Academic</option><option>Science</option><option>Boarding</option><option>Kitchen</option><option>Facilities</option><option>ICT</option><option>Sports</option><option>Administration</option></select></label>
        <label>Priority<select value={priority} onChange={(e) => setPriority(e.target.value as RequisitionPriority)}><option>Low</option><option>Normal</option><option>High</option><option>Urgent</option></select></label>
        <label>Budget category<select value={budgetCategory} onChange={(e) => setBudgetCategory(e.target.value)}><option>Learning materials</option><option>Laboratory supplies</option><option>Boarding supplies</option><option>Kitchen supplies</option><option>Cleaning materials</option><option>ICT equipment</option><option>Sports equipment</option></select></label>
        <label>Required by<input value={requiredBy} onChange={(e) => setRequiredBy(e.target.value)} placeholder="e.g. 25 Oct 2026" /></label>
      </div>
      <label>Justification<textarea value={justification} onChange={(e) => setJustification(e.target.value)} placeholder="Business justification for this request" /></label>
      <div style={{ borderTop: '1px solid #edf0f1', paddingTop: 14 }}>
        <p style={{ font: '700 10px "Plus Jakarta Sans"', color: '#6d7d84', margin: '0 0 10px' }}>Line items</p>
        {lines.length > 0 && <div style={{ marginBottom: 10 }}>{lines.map((l, i) => <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '6px 0', fontSize: 10, color: '#65747c' }}><span style={{ flex: 1 }}>{l.description}</span><span>{l.quantity} {l.unit}</span><span>KES {l.estimatedUnitPrice.toLocaleString()}</span><span style={{ fontWeight: 700 }}>KES {(l.quantity * l.estimatedUnitPrice).toLocaleString()}</span></div>)}</div>}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: 8, alignItems: 'end' }}>
          <label style={{ fontSize: 9 }}>Description<input value={lineDesc} onChange={(e) => setLineDesc(e.target.value)} placeholder="Item description" /></label>
          <label style={{ fontSize: 9 }}>Qty<input value={lineQty} onChange={(e) => setLineQty(e.target.value)} type="number" placeholder="0" /></label>
          <label style={{ fontSize: 9 }}>Unit<select value={lineUnit} onChange={(e) => setLineUnit(e.target.value)}><option>pcs</option><option>boxes</option><option>bags</option><option>bottles</option><option>reams</option><option>L</option><option>kg</option></select></label>
          <label style={{ fontSize: 9 }}>Unit price<input value={linePrice} onChange={(e) => setLinePrice(e.target.value)} type="number" placeholder="0" /></label>
          <button type="button" className="pr-button secondary" onClick={addLine}><Plus size={14} /> Add</button>
        </div>
      </div>
      {error && <span className="pr-form-error">{error}</span>}
      {success && <span className="pr-form-message">{success}</span>}
      <button className="pr-button primary" type="button" onClick={submit}><Plus size={15} /> Create requisition</button>
    </div>
  </Panel>
  <Panel title="Requisition register" subtitle={`${demo.requisitions.length} requisition(s) · draft to converted lifecycle`}>
    <div className="pr-record-list">{demo.requisitions.map((r) => (
      <div className="pr-record-row" key={r.id}>
        <div>
          <strong>{r.reference} · {r.department}</strong>
          <span>{r.requester} · {r.priority} priority · {r.lines.length} items · KES {r.totalEstimate.toLocaleString()} · required by {r.requiredBy}{r.approvedBy ? ` · ${r.approvalNote}` : ''}</span>
        </div>
        <span className={`pr-status ${r.status === 'Approved' || r.status === 'Converted' ? 'good' : r.status === 'Rejected' ? 'bad' : r.status === 'Draft' ? 'neutral' : 'warning'}`}>{r.status}</span>
        <div className="pr-row-actions">
          {r.status === 'Draft' && <button className="pr-button secondary" onClick={() => procurementDemo.submitRequisition(r.id)}>Submit</button>}
          {r.status === 'Submitted' && <>
            <button className="pr-button secondary" onClick={() => procurementDemo.reviewRequisition(r.id)}>Review</button>
            <button className="pr-button primary" onClick={() => { const res = procurementDemo.approveRequisition(r.id, approvalNote || 'Approved'); if (!res.ok) alert(res.error); }}>Approve</button>
            <button className="pr-link" onClick={() => procurementDemo.rejectRequisition(r.id, 'Not approved')}>Reject</button>
          </>}
          {r.status === 'Under review' && <>
            <button className="pr-button primary" onClick={() => { const res = procurementDemo.approveRequisition(r.id, approvalNote || 'Approved after review'); if (!res.ok) alert(res.error); }}>Approve</button>
            <button className="pr-link" onClick={() => procurementDemo.rejectRequisition(r.id, 'Rejected after review')}>Reject</button>
          </>}
          {r.status === 'Approved' && <button className="pr-button primary" onClick={() => { const sup = demo.suppliers.find((s) => s.status === 'Active'); if (sup) { const res = procurementDemo.createPO(r.id, sup.id); if (!res.ok) alert(res.error); } else alert('No active suppliers available.'); }}>Create PO</button>}
        </div>
      </div>
    ))}</div>
  </Panel></>;
}

function QuotationsView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  const rfqs = [...new Set(demo.quotations.map((q) => q.rfqRef))];
  return <><div className="pr-three-grid"><PrMetric icon={FileText} label="Total quotations" value={String(demo.quotations.length)} detail={`${rfqs.length} RFQ(s)`} /><PrMetric icon={CheckCircle2} label="Recommended" value={String(demo.quotations.filter((q) => q.status === 'Recommended').length)} detail="Selected for PO" tone="blue" /><PrMetric icon={Clock3} label="Pending evaluation" value={String(demo.quotations.filter((q) => q.status === 'Pending').length)} detail="Awaiting review" tone="gold" /></div>
  {rfqs.map((rfq) => { const quotes = demo.quotations.filter((q) => q.rfqRef === rfq); return <Panel key={rfq} title={rfq} subtitle={`${quotes.length} quotation(s) received`}><div className="pr-table-wrap"><table className="pr-table"><thead><tr><th>Supplier</th><th>Amount</th><th>Delivery</th><th>Status</th><th>Evaluation note</th></tr></thead><tbody>{quotes.map((q) => <tr key={q.id}><td><strong>{q.supplierName}</strong></td><td>KES {q.amount.toLocaleString()}</td><td>{q.deliveryDays} days</td><td><span className={`pr-status ${q.status === 'Recommended' ? 'good' : q.status === 'Not recommended' ? 'bad' : 'warning'}`}>{q.status}</span></td><td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis' }}>{q.evaluationNote || '—'}</td></tr>)}</tbody></table></div></Panel>; })}
  </>;
}

function OrdersView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  return <Panel title="Purchase order register" subtitle={`${demo.purchaseOrders.length} order(s) · draft to received lifecycle`}>
    <div className="pr-table-wrap"><table className="pr-table"><thead><tr><th>PO number</th><th>Supplier</th><th>Department</th><th>Items</th><th>Total</th><th>Required date</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>{demo.purchaseOrders.map((p) => <tr key={p.id}><td><strong>{p.poNumber}</strong></td><td>{p.supplierName}</td><td>{p.department}</td><td>{p.lines.length} items</td><td>KES {p.total.toLocaleString()}</td><td>{p.requiredDate}</td><td><span className={`pr-status ${p.status === 'Received' ? 'good' : p.status === 'Partially received' ? 'warning' : p.status === 'Pending approval' ? 'warning' : p.status === 'Cancelled' ? 'bad' : 'info'}`}>{p.status}</span></td><td><div className="pr-row-actions">{p.status === 'Pending approval' && <button className="pr-button primary" onClick={() => { const r = procurementDemo.approvePO(p.id); if (!r.ok) alert(r.error); }}>Approve</button>}{p.status === 'Approved' && <button className="pr-button primary" onClick={() => { const r = procurementDemo.sendPO(p.id); if (!r.ok) alert(r.error); }}>Send to supplier</button>}{(p.status === 'Sent' || p.status === 'Partially received') && <button className="pr-button secondary" onClick={() => navigateToGrn()}>Receive goods</button>}{p.status !== 'Received' && p.status !== 'Cancelled' && <button className="pr-link" onClick={() => { if (confirm(`Cancel ${p.poNumber}?`)) procurementDemo.cancelPO(p.id); }}>Cancel</button>}</div></td></tr>)}</tbody></table></div>
  </Panel>;
  function navigateToGrn() { /* GRN creation handled in GRNs view */ alert('Go to Goods Receiving to record a delivery against this PO.'); }
}

function GRNsView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  const [poId, setPoId] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [store, setStore] = useState('Main Store');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const eligiblePOs = demo.purchaseOrders.filter((p) => p.status === 'Sent' || p.status === 'Partially received');
  const selectedPO = demo.purchaseOrders.find((p) => p.id === poId);
  const [lineData, setLineData] = useState<Record<string, { delivered: string; accepted: string; rejected: string; batch: string; expiry: string }>>({});
  const submit = () => {
    if (!selectedPO) { setError('Select a purchase order.'); return; }
    if (!deliveryNote.trim()) { setError('Delivery note reference is required.'); return; }
    const lines = selectedPO.lines.map((pl) => {
      const d = lineData[pl.id] ?? { delivered: '', accepted: '', rejected: '', batch: '', expiry: '' };
      return { poLineId: pl.id, deliveredQty: parseInt(d.delivered || '0', 10), acceptedQty: parseInt(d.accepted || '0', 10), rejectedQty: parseInt(d.rejected || '0', 10), batch: d.batch || 'N/A', expiry: d.expiry };
    });
    const result = procurementDemo.createGRN(poId, deliveryNote, store, lines);
    if (result.ok) { setSuccess(`GRN created for ${selectedPO.poNumber}. Stock updated.`); setError(''); setPoId(''); setDeliveryNote(''); setLineData({}); }
    else { setError(result.error ?? 'GRN creation failed.'); setSuccess(''); }
  };
  return <><Panel title="Record goods receipt" subtitle="Receive delivered items against a purchase order with inspection">
    <div className="pr-form">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        <label>Purchase order<select value={poId} onChange={(e) => { setPoId(e.target.value); setLineData({}); }}><option value="">Select PO...</option>{eligiblePOs.map((p) => <option key={p.id} value={p.id}>{p.poNumber} · {p.supplierName}</option>)}</select></label>
        <label>Delivery note<input value={deliveryNote} onChange={(e) => setDeliveryNote(e.target.value)} placeholder="Supplier delivery ref" /></label>
        <label>Receiving store<select value={store} onChange={(e) => setStore(e.target.value)}><option>Main Store</option><option>Kitchen Store</option><option>Boarding Store</option><option>Lab Store</option><option>ICT Store</option></select></label>
      </div>
      {selectedPO && <div style={{ borderTop: '1px solid #edf0f1', paddingTop: 14 }}>
        <p style={{ font: '700 10px "Plus Jakarta Sans"', color: '#6d7d84', margin: '0 0 10px' }}>Items in {selectedPO.poNumber}</p>
        {selectedPO.lines.map((pl) => { const d = lineData[pl.id] ?? { delivered: '', accepted: '', rejected: '', batch: '', expiry: '' }; return <div key={pl.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', gap: 8, alignItems: 'end', marginBottom: 8 }}>
          <span style={{ fontSize: 9, color: '#65747c' }}>{pl.description}<br /><small style={{ color: '#a1adb1' }}>Ordered: {pl.quantity} {pl.unit} · Received so far: {pl.receivedQty}</small></span>
          <label style={{ fontSize: 8 }}>Delivered<input value={d.delivered} onChange={(e) => setLineData({ ...lineData, [pl.id]: { ...d, delivered: e.target.value } })} type="number" placeholder="0" /></label>
          <label style={{ fontSize: 8 }}>Accepted<input value={d.accepted} onChange={(e) => setLineData({ ...lineData, [pl.id]: { ...d, accepted: e.target.value } })} type="number" placeholder="0" /></label>
          <label style={{ fontSize: 8 }}>Rejected<input value={d.rejected} onChange={(e) => setLineData({ ...lineData, [pl.id]: { ...d, rejected: e.target.value } })} type="number" placeholder="0" /></label>
          <label style={{ fontSize: 8 }}>Batch<input value={d.batch} onChange={(e) => setLineData({ ...lineData, [pl.id]: { ...d, batch: e.target.value } })} placeholder="N/A" /></label>
          <label style={{ fontSize: 8 }}>Expiry<input value={d.expiry} onChange={(e) => setLineData({ ...lineData, [pl.id]: { ...d, expiry: e.target.value } })} placeholder="—" /></label>
        </div>; })}
      </div>}
      {error && <span className="pr-form-error">{error}</span>}
      {success && <span className="pr-form-message">{success}</span>}
      <button className="pr-button primary" type="button" onClick={submit} disabled={!poId || !deliveryNote.trim()}><Truck size={15} /> Finalize goods receipt</button>
    </div>
  </Panel>
  <Panel title="Goods received notes" subtitle={`${demo.grns.length} GRN(s) recorded`}>
    <div className="pr-record-list">{demo.grns.map((g) => <div className="pr-record-row" key={g.id}><div><strong>{g.grnNumber} · {g.supplierName}</strong><span>{g.poNumber} · DN {g.deliveryNote} · {g.store} · {g.deliveryDate} · {g.lines.length} items · {g.discrepancy}</span></div><span className={`pr-status ${g.status === 'Finalized' ? 'good' : 'bad'}`}>{g.status}</span></div>)}</div>
  </Panel></>;
}

function SuppliersView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Stationery');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('Net 30');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) { setError('Supplier name is required.'); return; }
    const result = procurementDemo.addSupplier(name, category, contact, phone, email, paymentTerms);
    if (result.ok) { setSuccess('Supplier registered as pending review.'); setError(''); setName(''); setContact(''); setPhone(''); setEmail(''); }
    else { setError(result.error ?? 'Registration failed.'); setSuccess(''); }
  };
  return <><Panel title="Register supplier" subtitle="Add a new supplier to the register — pending review until approved"><form className="pr-form" onSubmit={submit}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
      <label>Supplier name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Office Point Kenya" /></label>
      <label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}><option>Stationery</option><option>Textbooks</option><option>Laboratory</option><option>Cleaning</option><option>Kitchen</option><option>Boarding</option><option>Sports</option><option>ICT</option><option>Maintenance</option><option>Medical</option></select></label>
      <label>Contact person<input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="e.g. James Mwangi" /></label>
      <label>Phone<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 0711 234 567" /></label>
      <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. sales@supplier.co.ke" /></label>
      <label>Payment terms<select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)}><option>Net 14</option><option>Net 21</option><option>Net 30</option><option>Net 45</option><option>COD</option></select></label>
    </div>
    <button className="pr-button primary" type="submit" disabled={!name.trim()}><Plus size={15} /> Register supplier</button>
    {error && <span className="pr-form-error">{error}</span>}
    {success && <span className="pr-form-message">{success}</span>}
  </form></Panel>
  <Panel title="Supplier register" subtitle={`${demo.suppliers.length} supplier(s) · active, pending and inactive`}>
    <div className="pr-table-wrap"><table className="pr-table"><thead><tr><th>Code</th><th>Name</th><th>Category</th><th>Contact</th><th>Terms</th><th>Performance</th><th>Orders</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>{demo.suppliers.map((s) => <tr key={s.id}><td><strong>{s.code}</strong></td><td>{s.name}</td><td><span className="pr-soft-tag">{s.category}</span></td><td>{s.contact}<br /><small style={{ color: '#a1adb1' }}>{s.phone}</small></td><td>{s.paymentTerms}</td><td>{s.deliveryPerformance > 0 ? `${s.deliveryPerformance}%` : '—'}</td><td>{s.totalOrders}</td><td><span className={`pr-status ${s.status === 'Active' ? 'good' : s.status === 'Pending review' ? 'warning' : 'neutral'}`}>{s.status}</span></td><td>{s.status === 'Pending review' && <button className="pr-link" onClick={() => { const r = procurementDemo.approveSupplier(s.id); if (!r.ok) alert(r.error); }}>Approve</button>}</td></tr>)}</tbody></table></div>
  </Panel></>;
}

function InventoryView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const records = demo.inventory.filter((i) => (filter === 'All' || i.category === filter) && `${i.name} ${i.sku} ${i.category}`.toLowerCase().includes(query.toLowerCase()));
  return <><div className="pr-filterbar"><div className="pr-search inline"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search items..." /></div><select value={filter} onChange={(e) => setFilter(e.target.value)} className="pr-soft-tag" style={{ border: '1px solid #e1e8eb', padding: '8px', borderRadius: 7, font: '600 10px "Plus Jakarta Sans"', cursor: 'pointer' }}><option>All</option><option>Textbooks</option><option>Stationery</option><option>Cleaning</option><option>Kitchen</option><option>Boarding</option><option>Laboratory</option><option>Sports</option></select></div>
  <Panel title="Item catalogue" subtitle={`${records.length} item(s) · stock levels and reorder status`}>
    <div className="pr-table-wrap"><table className="pr-table"><thead><tr><th>SKU</th><th>Name</th><th>Category</th><th>Store</th><th>On hand</th><th>Reorder level</th><th>Unit cost</th><th>Stock value</th><th>Status</th></tr></thead>
    <tbody>{records.map((i) => { const low = i.onHand <= i.reorderLevel; const out = i.onHand === 0; return <tr key={i.id}><td><strong>{i.sku}</strong></td><td>{i.name}</td><td><span className="pr-soft-tag">{i.category}</span></td><td>{i.store}</td><td style={{ fontWeight: 700, color: out ? '#c25b5b' : low ? '#ad8320' : '#3b9368' }}>{i.onHand} {i.unit}</td><td>{i.reorderLevel} {i.unit}</td><td>KES {i.unitCost.toLocaleString()}</td><td>KES {(i.onHand * i.unitCost).toLocaleString()}</td><td><span className={`pr-status ${out ? 'bad' : low ? 'warning' : 'good'}`}>{out ? 'Out of stock' : low ? 'Low stock' : 'In stock'}</span></td></tr>; })}</tbody></table></div>
  </Panel></>;
}

function MovementsView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  return <Panel title="Stock movement ledger" subtitle={`${demo.movements.length} movement(s) · authoritative inventory history`}>
    <div className="pr-table-wrap"><table className="pr-table"><thead><tr><th>Date</th><th>Item</th><th>Type</th><th>Quantity</th><th>Store</th><th>Reference</th><th>User</th><th>Reason</th><th>Balance after</th></tr></thead>
    <tbody>{demo.movements.map((m) => <tr key={m.id}><td>{m.date}</td><td><strong>{m.itemName}</strong><br /><small style={{ color: '#a1adb1' }}>{m.itemCode}</small></td><td><span className={`pr-soft-tag`}>{m.type}</span></td><td style={{ fontWeight: 700, color: m.type === 'Issue' || m.type === 'Transfer out' || m.type === 'Damage' || m.type === 'Write-off' ? '#c25b5b' : '#3b9368' }}>{m.type === 'Issue' || m.type === 'Transfer out' || m.type === 'Damage' || m.type === 'Write-off' ? '-' : '+'}{m.quantity} {m.unit}</td><td>{m.store}</td><td>{m.reference}</td><td>{m.user}</td><td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.reason}</td><td>{m.balanceAfter} {m.unit}</td></tr>)}</tbody></table></div>
  </Panel>;
}

function IssuesView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  const [department, setDepartment] = useState('Academic');
  const [requester, setRequester] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purpose, setPurpose] = useState('');
  const [requiredDate, setRequiredDate] = useState('20 Oct 2026');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!requester.trim() || !itemCode || !quantity || !purpose.trim()) { setError('All fields are required.'); return; }
    const result = procurementDemo.createIssue(department, requester, itemCode, parseInt(quantity, 10), purpose, requiredDate);
    if (result.ok) { setSuccess('Issue request submitted. Awaiting approval.'); setError(''); setRequester(''); setItemCode(''); setQuantity(''); setPurpose(''); }
    else { setError(result.error ?? 'Creation failed.'); setSuccess(''); }
  };
  return <><Panel title="Request stock issue" subtitle="Submit a request to issue items from the store to a department"><form className="pr-form" onSubmit={submit}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
      <label>Department<select value={department} onChange={(e) => setDepartment(e.target.value)}><option>Academic</option><option>Science</option><option>Boarding</option><option>Kitchen</option><option>Facilities</option><option>ICT</option><option>Sports</option><option>Administration</option></select></label>
      <label>Requester<input value={requester} onChange={(e) => setRequester(e.target.value)} placeholder="Your name" /></label>
      <label>Item<select value={itemCode} onChange={(e) => setItemCode(e.target.value)}><option value="">Select item...</option>{demo.inventory.map((i) => <option key={i.id} value={i.sku}>{i.name} ({i.onHand} {i.unit} available)</option>)}</select></label>
      <label>Quantity<input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" placeholder="0" /></label>
      <label>Purpose<input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Exam printing" /></label>
      <label>Required date<input value={requiredDate} onChange={(e) => setRequiredDate(e.target.value)} /></label>
    </div>
    <button className="pr-button primary" type="submit" disabled={!requester.trim() || !itemCode || !quantity || !purpose.trim()}><Plus size={15} /> Submit issue request</button>
    {error && <span className="pr-form-error">{error}</span>}
    {success && <span className="pr-form-message">{success}</span>}
  </form></Panel>
  <Panel title="Issue requests" subtitle={`${demo.issues.length} request(s) · submitted to closed lifecycle`}>
    <div className="pr-record-list">{demo.issues.map((i) => <div className="pr-record-row" key={i.id}><div><strong>{i.reference} · {i.itemName}</strong><span>{i.department} · {i.requester} · {i.quantity} {i.unit} · {i.purpose} · required {i.requiredDate}{i.storekeeper ? ` · issued by ${i.storekeeper}` : ''}</span></div><span className={`pr-status ${i.status === 'Issued' || i.status === 'Acknowledged' || i.status === 'Closed' ? 'good' : i.status === 'Rejected' ? 'bad' : i.status === 'Approved' ? 'info' : 'warning'}`}>{i.status}</span><div className="pr-row-actions">{i.status === 'Submitted' && <><button className="pr-button secondary" onClick={() => { const r = procurementDemo.approveIssue(i.id); if (!r.ok) alert(r.error); }}>Approve</button><button className="pr-link" onClick={() => procurementDemo.rejectIssue(i.id)}>Reject</button></>}{i.status === 'Approved' && <button className="pr-button primary" onClick={() => { const r = procurementDemo.issueStock(i.id); if (!r.ok) alert(r.error); }}>Issue stock</button>}</div></div>)}</div>
  </Panel></>;
}

function TransfersView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  return <Panel title="Inter-store transfers" subtitle={`${demo.transfers.length} transfer(s) · dispatch to receipt lifecycle`}>
    <div className="pr-record-list">{demo.transfers.map((t) => <div className="pr-record-row" key={t.id}><div><strong>{t.reference} · {t.itemName}</strong><span>{t.fromStore} → {t.toStore} · {t.quantity} {t.unit} · dispatched {t.dispatchDate} by {t.dispatchedBy}{t.receivedBy ? ` · received by ${t.receivedBy} on ${t.receiptDate}` : ''}</span></div><span className={`pr-status ${t.status === 'Completed' ? 'good' : t.status === 'In transit' ? 'info' : 'warning'}`}>{t.status}</span><div className="pr-row-actions">{(t.status === 'Requested' || t.status === 'Approved') && <button className="pr-button primary" onClick={() => { const r = procurementDemo.dispatchTransfer(t.id); if (!r.ok) alert(r.error); }}>Dispatch</button>}{t.status === 'In transit' && <button className="pr-button primary" onClick={() => { const r = procurementDemo.receiveTransfer(t.id); if (!r.ok) alert(r.error); }}>Receive</button>}</div></div>)}</div>
  </Panel>;
}

function CountsView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  return <Panel title="Stock counts" subtitle={`${demo.stockCounts.length} session(s) · counting to posted`}>
    <div className="pr-record-list">{demo.stockCounts.map((c) => <div className="pr-record-row" key={c.id}><div><strong>{c.reference} · {c.store}</strong><span>{c.date} · counted by {c.counter} · {c.lines.length} items · {c.lines.filter((l) => l.variance !== 0).length} variance(s)</span></div><span className={`pr-status ${c.status === 'Posted' ? 'good' : c.status === 'Approved' ? 'info' : 'warning'}`}>{c.status}</span><div className="pr-row-actions">{(c.status === 'Counted' || c.status === 'Recount') && <button className="pr-button primary" onClick={() => { const r = procurementDemo.approveStockCount(c.id); if (!r.ok) alert(r.error); }}>Approve & post</button>}</div></div>)}</div>
  </Panel>;
}

function InvoicesView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  return <><div className="pr-three-grid"><PrMetric icon={CheckCircle2} label="Matched" value={String(demo.invoices.filter((i) => i.status === 'Matched').length)} detail="Three-way match confirmed" tone="blue" /><PrMetric icon={AlertTriangle} label="Discrepancies" value={String(demo.invoices.filter((i) => i.status === 'Discrepancy').length)} detail="Review needed" tone="red" /><PrMetric icon={Clock3} label="Pending" value={String(demo.invoices.filter((i) => i.status === 'Pending').length)} detail="Awaiting matching" tone="gold" /></div>
  <Panel title="Supplier invoices" subtitle={`${demo.invoices.length} invoice(s) · matching against POs and GRNs`}>
    <div className="pr-table-wrap"><table className="pr-table"><thead><tr><th>Invoice no.</th><th>Supplier</th><th>PO ref</th><th>GRN ref</th><th>Amount</th><th>Date</th><th>Status</th><th>Discrepancy</th><th>Actions</th></tr></thead>
    <tbody>{demo.invoices.map((inv) => <tr key={inv.id}><td><strong>{inv.invoiceNumber}</strong></td><td>{inv.supplierName}</td><td>{inv.poRef}</td><td>{inv.grnRef}</td><td>KES {inv.amount.toLocaleString()}</td><td>{inv.date}</td><td><span className={`pr-status ${inv.status === 'Matched' ? 'good' : inv.status === 'Discrepancy' ? 'bad' : inv.status === 'Approved' ? 'info' : 'warning'}`}>{inv.status}</span></td><td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{inv.discrepancy}</td><td>{(inv.status === 'Discrepancy' || inv.status === 'Pending') && <button className="pr-link" onClick={() => { const r = procurementDemo.matchInvoice(inv.id); if (!r.ok) alert(r.error); }}>Match</button>}</td></tr>)}</tbody></table></div>
  </Panel></>;
}

function NotificationsView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  return <Panel title="Notifications" subtitle={`${demo.notifications.length} notification(s)`}>
    <div className="pr-record-list">{demo.notifications.map((n) => <div className="pr-record-row" key={n.id}><div><strong>{n.title}</strong><span>{n.recipient} · {n.detail} · {n.createdDate}</span></div>{n.unread && <button className="pr-link" onClick={() => procurementDemo.markNotificationRead(n.id)}>Mark read</button>}</div>)}</div>
  </Panel>;
}

function ReportsView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  const reports = [
    { title: 'Requisition register', desc: 'All requisitions with status and approval history' },
    { title: 'Purchase order register', desc: 'All POs with supplier, value and delivery status' },
    { title: 'Goods received register', desc: 'GRNs with delivery and discrepancy details' },
    { title: 'Stock-on-hand report', desc: 'Current inventory by store and category' },
    { title: 'Stock movement ledger', desc: 'Complete movement history with references' },
    { title: 'Low-stock reorder report', desc: `${demo.inventory.filter((i) => i.onHand <= i.reorderLevel).length} items at or below reorder level` },
    { title: 'Supplier delivery performance', desc: 'On-time delivery rates by supplier' },
    { title: 'Procurement spend by category', desc: 'Total PO value grouped by item category' },
    { title: 'Invoice matching report', desc: 'Supplier invoices with match status' },
  ];
  return <div className="pr-report-grid">{reports.map((r) => <div key={r.title} className="pr-report-card"><BarChart3 size={18} style={{ color: '#c8861e' }} /><strong>{r.title}</strong><span>{r.desc}</span></div>)}</div>;
}

function AuditView({ demo }: { demo: ReturnType<typeof useProcurementDemo> }) {
  return <Panel title="Audit history" subtitle={`${demo.audit.length} recorded action(s)`}>
    <div style={{ padding: '0 20px 16px' }}>{demo.audit.map((a) => <div className="pr-audit-row" key={a.id}><i /><span>{a.timestamp}</span><strong>{a.actor} — {a.action}</strong><span style={{ flex: 1, color: '#839098' }}>{a.target}</span></div>)}</div>
  </Panel>;
}

function SettingsView() {
  return <Panel title="Settings" subtitle="Procurement configuration and demo controls">
    <div className="pr-form">
      <label>Approval threshold (KES)<input value={String(50000)} disabled /></label>
      <label>Three-way matching<select disabled><option>Enabled (PO ↔ GRN ↔ Invoice)</option></select></label>
      <label>Self-approval prevention<select disabled><option>Enabled</option></select></label>
      <label>Negative stock prevention<select disabled><option>Enabled</option></select></label>
      <button className="pr-button secondary" type="button" onClick={() => procurementDemo.reset()}><RotateCcw size={15} /> Reset demo data</button>
    </div>
  </Panel>;
}
