import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Activity, ArrowUpRight, BarChart3, Bell, BookCopy, BookMarked, BookOpen, CalendarClock, Check, CheckCircle2, ChevronDown, ClipboardList, Clock3, FileText, HelpCircle, LayoutDashboard, Library, LibraryBig, LogOut, Menu, MoreHorizontal, Plus, RotateCcw, Search, Settings, ShieldCheck, Undo2, Users, X, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '@/library.css';
import { libraryDemo, useLibraryDemo, LIBRARY_POLICIES, type CopyCondition } from '@/data/libraryDemo';

type LibNav = { label: string; path: string; icon: LucideIcon; group: string };
const libNav: LibNav[] = [
  { label: 'Dashboard', path: '/library/dashboard', icon: LayoutDashboard, group: 'Workspace' },
  { label: 'Catalogue', path: '/library/catalogue', icon: LibraryBig, group: 'Catalogue' },
  { label: 'Book copies', path: '/library/copies', icon: BookCopy, group: 'Catalogue' },
  { label: 'Issue book', path: '/library/issue', icon: BookOpen, group: 'Circulation' },
  { label: 'Returns', path: '/library/returns', icon: Undo2, group: 'Circulation' },
  { label: 'Renewals', path: '/library/renewals', icon: RotateCcw, group: 'Circulation' },
  { label: 'Active loans', path: '/library/loans', icon: ClipboardList, group: 'Circulation' },
  { label: 'Overdue items', path: '/library/overdue', icon: Clock3, group: 'Circulation' },
  { label: 'Reservations', path: '/library/reservations', icon: BookMarked, group: 'Circulation' },
  { label: 'Fines & charges', path: '/library/fines', icon: FileText, group: 'Circulation' },
  { label: 'Borrowers', path: '/library/borrowers', icon: Users, group: 'People' },
  { label: 'Inventory', path: '/library/inventory', icon: BookCopy, group: 'Operations' },
  { label: 'Notifications', path: '/library/notifications', icon: Bell, group: 'Operations' },
  { label: 'Reports', path: '/library/reports', icon: BarChart3, group: 'Controls' },
  { label: 'Audit history', path: '/library/audit', icon: Activity, group: 'Controls' },
  { label: 'Settings', path: '/library/settings', icon: Settings, group: 'Account' },
];
const groups = ['Workspace', 'Catalogue', 'Circulation', 'People', 'Operations', 'Controls', 'Account'];

export function LibraryPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const demo = useLibraryDemo();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const current = libNav.find((item) => location.pathname.startsWith(item.path)) ?? libNav[0];
  const navigateTo = (path: string) => { navigate(path); setMobile(false); };
  const overdueCount = demo.loans.filter((l) => l.status === 'Overdue').length;
  const unreadCount = demo.notifications.filter((n) => n.unread).length;
  return <div className="lib-app">
    <aside className={`lib-sidebar ${mobile ? 'open' : ''}`}><div className="lib-brand"><div className="lib-brand-mark"><Library size={21} /></div><div><strong>Riverside</strong><span>Academy Library</span></div><button className="lib-close" onClick={() => setMobile(false)} aria-label="Close navigation"><X size={18} /></button></div><div className="lib-demo-pill"><span /> DEMO MODE <b>•</b> October 2026</div><div className="lib-school"><div>RA</div><span><strong>Riverside Academy</strong><small>Library services</small></span><ChevronDown size={15} /></div><nav className="lib-nav">{groups.map((group) => <div className="lib-nav-group" key={group}><p>{group}</p>{libNav.filter((item) => item.group === group).map(({ label, path, icon: Icon }) => <button key={path} className={current.path === path || (path !== '/library/dashboard' && location.pathname.startsWith(path)) ? 'active' : ''} onClick={() => navigateTo(path)}><Icon size={16} /><span>{label}</span>{label === 'Overdue items' && overdueCount > 0 && <em>{overdueCount}</em>}{label === 'Notifications' && unreadCount > 0 && <em>{unreadCount}</em>}</button>)}</div>)}</nav><div className="lib-sidebar-footer"><button onClick={() => navigateTo('/library/help')}><HelpCircle size={16} /> Help centre</button><div className="lib-user"><div className="lib-avatar">GL</div><span><strong>Grace Librarian</strong><small>Senior librarian</small></span><MoreHorizontal size={16} /></div></div></aside>
    {mobile && <button className="lib-overlay" onClick={() => setMobile(false)} aria-label="Close menu" />}
    <main className="lib-main"><header className="lib-topbar"><button className="lib-menu" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu size={21} /></button><div className="lib-crumb"><span>Riverside Academy</span><b>/</b><strong>{current.label}</strong></div><div className="lib-top-actions"><div className="lib-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search catalogue, borrowers, loans..." /></div><button className="lib-icon-button" onClick={() => navigateTo('/library/notifications')} aria-label="Open notifications"><Bell size={18} />{unreadCount > 0 && <i>{unreadCount}</i>}</button><div className="lib-profile-wrap"><button className="lib-profile" onClick={() => setProfileOpen(!profileOpen)}><div className="lib-avatar">GL</div><span>Grace Librarian</span><ChevronDown size={15} /></button>{profileOpen && <div className="lib-profile-menu"><strong>Grace Librarian</strong><small>Senior librarian</small><button onClick={() => navigateTo('/library/settings')}><Settings size={14} /> Settings</button><button onClick={() => libraryDemo.reset()}><RotateCcw size={14} /> Reset demo data</button><button onClick={() => navigateTo('/')}><LogOut size={14} /> Exit portal</button></div>}</div></div></header><div className="lib-content"><div className="lib-context"><div><span className="lib-kicker"><ShieldCheck size={14} /> Library workspace <b>•</b> Term 2 · October 2026</span><h1>{current.label}</h1><p>{libDescription(location.pathname)}</p></div><div className="lib-context-actions"><button className="lib-button secondary" disabled title="The demo is fixed to October 2026"><CalendarClock size={15} /> October 2026 <ChevronDown size={14} /></button><button className="lib-button primary" onClick={() => navigateTo('/library/catalogue/create')}><Plus size={15} /> Add title</button></div></div><LibRoute path={location.pathname} demo={demo} search={search} navigateTo={navigateTo} /></div></main>
  </div>;
}

function libDescription(path: string): string {
  if (path.includes('catalogue')) return 'Search and manage catalogue titles, authors and publication records.';
  if (path.includes('copies') || path.includes('inventory')) return 'Track physical copies, barcodes, conditions and shelf locations.';
  if (path.includes('issue')) return 'Issue a book to an eligible borrower with due date calculation.';
  if (path.includes('return')) return 'Process returns, check copy condition and calculate any applicable fines.';
  if (path.includes('renew')) return 'Review renewal requests and verify policy compliance.';
  if (path.includes('overdue')) return 'Monitor overdue loans and trigger follow-up where configured.';
  if (path.includes('reservation')) return 'Manage reservation queues and allocation to waiting borrowers.';
  if (path.includes('fine')) return 'Track outstanding, settled and waived charges with full history.';
  if (path.includes('borrower')) return 'Search borrower records and check eligibility status.';
  if (path.includes('notification')) return 'Library notices and reminders with read state tracking.';
  if (path.includes('report')) return 'Generate reports from documented data sources and authorised scopes.';
  if (path.includes('audit')) return 'Every library transaction is recorded with actor, target and timestamp.';
  return 'A complete view of catalogue, circulation, inventory and compliance for the school library.';
}

function LibRoute({ path, demo, search, navigateTo }: { path: string; demo: ReturnType<typeof useLibraryDemo>; search: string; navigateTo: (path: string) => void }) {
  if (path === '/library/dashboard' || path === '/library') return <LibDashboard demo={demo} navigateTo={navigateTo} />;
  if (path.startsWith('/library/catalogue/create')) return <CatalogueFormView demo={demo} />;
  if (path.startsWith('/library/catalogue')) return <CatalogueView demo={demo} search={search} navigateTo={navigateTo} />;
  if (path.startsWith('/library/copies')) return <CopiesView demo={demo} />;
  if (path.startsWith('/library/issue')) return <IssueView demo={demo} />;
  if (path.startsWith('/library/returns')) return <ReturnsView demo={demo} />;
  if (path.startsWith('/library/renewals')) return <RenewalsView demo={demo} />;
  if (path.startsWith('/library/loans')) return <LoansView demo={demo} />;
  if (path.startsWith('/library/overdue')) return <OverdueView demo={demo} />;
  if (path.startsWith('/library/reservations')) return <ReservationsView demo={demo} />;
  if (path.startsWith('/library/fines')) return <FinesView demo={demo} />;
  if (path.startsWith('/library/borrowers')) return <BorrowersView demo={demo} search={search} />;
  if (path.startsWith('/library/inventory')) return <InventoryView demo={demo} />;
  if (path.startsWith('/library/notifications')) return <NotificationsView demo={demo} />;
  if (path.startsWith('/library/reports')) return <ReportsView demo={demo} />;
  if (path.startsWith('/library/audit')) return <AuditView demo={demo} />;
  return <SettingsView />;
}

function LibDashboard({ demo, navigateTo }: { demo: ReturnType<typeof useLibraryDemo>; navigateTo: (path: string) => void }) {
  const totalTitles = demo.books.length;
  const totalCopies = demo.copies.length;
  const availableCopies = demo.copies.filter((c) => c.status === 'Available').length;
  const borrowedCopies = demo.copies.filter((c) => c.status === 'Borrowed').length;
  const overdueLoans = demo.loans.filter((l) => l.status === 'Overdue').length;
  const activeReservations = demo.reservations.filter((r) => r.status === 'Pending').length;
  const lostDamaged = demo.copies.filter((c) => c.status === 'Lost' || c.status === 'Damaged').length;
  const outstandingFines = demo.fines.filter((f) => f.status === 'Outstanding').reduce((sum, f) => sum + f.amount, 0);
  return <><div className="lib-kpi-grid">
    <LibMetric icon={LibraryBig} label="Catalogue titles" value={String(totalTitles)} detail="Across 5 categories" onClick={() => navigateTo('/library/catalogue')} />
    <LibMetric icon={BookCopy} label="Physical copies" value={String(totalCopies)} detail={`${availableCopies} available now`} onClick={() => navigateTo('/library/copies')} />
    <LibMetric icon={BookOpen} label="Currently borrowed" value={String(borrowedCopies)} detail="Active loans in circulation" onClick={() => navigateTo('/library/loans')} />
    <LibMetric icon={Clock3} label="Overdue loans" value={String(overdueLoans)} detail="Requires follow-up" onClick={() => navigateTo('/library/overdue')} />
  </div>
  <div className="lib-main-grid">
    <Panel title="Library overview" subtitle="Synthetic records · Term 2 · October 2026">
      <div className="lib-overview-grid">
        <MiniStat label="Available copies" value={String(availableCopies)} />
        <MiniStat label="Active reservations" value={String(activeReservations)} />
        <MiniStat label="Lost / damaged" value={String(lostDamaged)} />
        <MiniStat label="Outstanding fines" value={`KES ${outstandingFines.toLocaleString()}`} />
      </div>
      <div className="lib-bars">{[['Fiction', 4], ['Mathematics', 12], ['Science', 14], ['Languages', 15], ['Humanities', 6]].map(([label, value]) => <div key={label as string}><span>{label as string}</span><i><b style={{ width: `${(value as number) * 7}%` }} /></i><strong>{value as number}</strong></div>)}</div>
    </Panel>
    <Panel title="Library task centre" subtitle="Items needing librarian attention">
      <div className="lib-task-list">
        <Task title={`${overdueLoans} overdue loan`} detail="Follow-up required per policy" action="Review" onClick={() => navigateTo('/library/overdue')} />
        <Task title={`${activeReservations} pending reservation`} detail="Allocate when copies become available" action="Review" onClick={() => navigateTo('/library/reservations')} />
        <Task title={`${lostDamaged} damaged copy`} detail="Condition assessment needed" action="Review" onClick={() => navigateTo('/library/inventory')} />
        <Task title={`${demo.fines.filter((f) => f.status === 'Outstanding').length} outstanding fine`} detail="Settlement or waiver pending" action="Review" onClick={() => navigateTo('/library/fines')} />
      </div>
    </Panel>
  </div>
  <div className="lib-main-grid lib-lower-grid">
    <Panel title="Recent activity" subtitle="Latest loans and returns">
      <div className="lib-record-list">{demo.loans.slice(0, 5).map((loan) => <div className="lib-record-row" key={loan.id}><div><strong>{loan.bookTitle}</strong><span>{loan.borrowerName} · {loan.issueDate} → due {loan.dueDate}</span></div><span className={`lib-status ${loan.status === 'Returned' ? 'good' : loan.status === 'Overdue' ? 'bad' : 'neutral'}`}>{loan.status}</span></div>)}</div>
    </Panel>
    <Panel title="Quick actions" subtitle="Common library operations">
      <div className="lib-quick-grid">
        <QuickAction label="Issue a book" icon={BookOpen} onClick={() => navigateTo('/library/issue')} />
        <QuickAction label="Process return" icon={Undo2} onClick={() => navigateTo('/library/returns')} />
        <QuickAction label="Add catalogue title" icon={Plus} onClick={() => navigateTo('/library/catalogue/create')} />
        <QuickAction label="Manage reservations" icon={BookMarked} onClick={() => navigateTo('/library/reservations')} />
      </div>
    </Panel>
  </div>
  <Panel title="Alerts" subtitle="Inventory and compliance notices">
    <div className="lib-alert-grid">
      <AlertCard title="Overdue loan" detail="Amani Wanjiku · The River Between · 0 days past due" tone="pink" onClick={() => navigateTo('/library/overdue')} />
      <AlertCard title="All copies borrowed" detail="Biology: A Kenyan Approach · 1 reservation pending" tone="gold" onClick={() => navigateTo('/library/reservations')} />
      <AlertCard title="Damaged copy" detail="RA-BK001-04 · condition recorded as Poor" tone="blue" onClick={() => navigateTo('/library/inventory')} />
    </div>
  </Panel></>;
}

function CatalogueView({ demo, search, navigateTo }: { demo: ReturnType<typeof useLibraryDemo>; search: string; navigateTo: (path: string) => void }) {
  const [query, setQuery] = useState(search);
  const [category, setCategory] = useState('All');
  const records = demo.books.filter((b) => { const matchesQuery = `${b.title} ${b.author} ${b.isbn} ${b.category}`.toLowerCase().includes(query.toLowerCase()); const matchesCat = category === 'All' || b.category === category; return matchesQuery && matchesCat; });
  return <><div className="lib-filterbar">
    <div className="lib-search inline"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, author, ISBN..." /></div>
    <select className="lib-button secondary" value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option><option>Fiction</option><option>Mathematics</option><option>Science</option><option>Languages</option><option>Humanities</option></select>
    <button className="lib-button primary" onClick={() => navigateTo('/library/catalogue/create')}><Plus size={15} /> Add title</button>
  </div>
  <Panel title="Catalogue" subtitle={`${records.length} title(s) · click to view copies and availability`}>
    <div className="lib-book-grid">{records.map((book) => <div className="lib-book-card" key={book.id}>
      <div className="lib-book-card-head"><div className="lib-book-icon"><BookMarked size={17} /></div><div><strong>{book.title}</strong><small>{book.author} · {book.year} · {book.category}</small></div></div>
      <div className="lib-book-availability"><span className="lib-soft-tag">{book.level}</span><div className="lib-avail-bar"><div className="lib-avail-fill" style={{ width: `${book.totalCopies > 0 ? (book.availableCopies / book.totalCopies) * 100 : 0}%` }} /></div><strong>{book.availableCopies}/{book.totalCopies}</strong></div>
      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}><button className="lib-link" onClick={() => navigateTo('/library/copies')}>View copies <ArrowUpRight size={13} /></button>{book.availableCopies === 0 && <button className="lib-link" onClick={() => navigateTo('/library/reservations')}>Reserve <ArrowUpRight size={13} /></button>}</div>
    </div>)}</div>
    {records.length === 0 && <div style={{ padding: '20px', textAlign: 'center', color: '#9ca8ad', fontSize: 10 }}>No titles match your search.</div>}
  </Panel></>;
}

function CatalogueFormView({ demo }: { demo: ReturnType<typeof useLibraryDemo> }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [category, setCategory] = useState('Fiction');
  const [level, setLevel] = useState('Secondary');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !author.trim()) { setError('Title and author are required.'); return; }
    const existing = demo.books.find((b) => b.isbn === isbn.trim() && isbn.trim());
    if (existing) { setError(`A title with ISBN ${isbn.trim()} already exists in the catalogue.`); return; }
    libraryDemo.addBook(title.trim(), author.trim(), isbn.trim(), category, level);
    setMessage(`"${title.trim()}" added to the catalogue. Register physical copies from the Book copies page.`);
    setError('');
    setTitle(''); setAuthor(''); setIsbn('');
  };
  return <Panel title="Add catalogue title" subtitle="Create a new title record. Physical copies are registered separately."><form className="lib-form" onSubmit={submit}>
    <label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Book title" /></label>
    <label>Author<input value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Author name" /></label>
    <label>ISBN<input value={isbn} onChange={(event) => setIsbn(event.target.value)} placeholder="978-0-000000-00-0" /></label>
    <label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option>Fiction</option><option>Mathematics</option><option>Science</option><option>Languages</option><option>Humanities</option></select></label>
    <label>Reading level<select value={level} onChange={(event) => setLevel(event.target.value)}><option>Primary</option><option>Secondary</option><option>Both</option></select></label>
    <button className="lib-button primary" type="submit"><Check size={15} /> Save title</button>
    {error && <span className="lib-form-error">{error}</span>}
    {message && <span className="lib-form-message">{message}</span>}
  </form></Panel>;
}

function CopiesView({ demo }: { demo: ReturnType<typeof useLibraryDemo> }) {
  const [bookId, setBookId] = useState(demo.books[0]?.id ?? '');
  const [barcode, setBarcode] = useState('');
  const [location, setLocation] = useState('Main Library');
  const [shelf, setShelf] = useState('');
  const [condition, setCondition] = useState<CopyCondition>('New');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!barcode.trim()) { setError('Barcode is required.'); return; }
    const existing = demo.copies.find((c) => c.barcode === barcode.trim());
    if (existing) { setError(`Barcode ${barcode.trim()} is already assigned to another copy.`); return; }
    libraryDemo.addCopy(bookId, barcode.trim(), location, shelf.trim() || '—', condition);
    setMessage(`Copy ${barcode.trim()} registered successfully.`);
    setError(''); setBarcode(''); setShelf('');
  };
  return <><Panel title="Register book copy" subtitle="Each physical copy has a unique barcode and can be tracked independently."><form className="lib-form" onSubmit={submit}>
    <label>Title<select value={bookId} onChange={(event) => setBookId(event.target.value)}>{demo.books.map((book) => <option key={book.id} value={book.id}>{book.title}</option>)}</select></label>
    <label>Barcode<input value={barcode} onChange={(event) => setBarcode(event.target.value)} placeholder="e.g. RA-BK001-05" /></label>
    <label>Location<select value={location} onChange={(event) => setLocation(event.target.value)}><option>Main Library</option><option>Senior Library</option><option>Junior Library</option></select></label>
    <label>Shelf reference<input value={shelf} onChange={(event) => setShelf(event.target.value)} placeholder="e.g. F-A12" /></label>
    <label>Condition<select value={condition} onChange={(event) => setCondition(event.target.value as CopyCondition)}><option>New</option><option>Good</option><option>Fair</option><option>Poor</option></select></label>
    <button className="lib-button primary" type="submit"><Plus size={15} /> Register copy</button>
    {error && <span className="lib-form-error">{error}</span>}
    {message && <span className="lib-form-message">{message}</span>}
  </form></Panel>
  <Panel title="Physical copies" subtitle="All copies with current status and condition">
    <div className="lib-table-wrap"><table className="lib-table"><thead><tr><th>Barcode</th><th>Title</th><th>Location</th><th>Shelf</th><th>Condition</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>{demo.copies.map((copy) => { const book = demo.books.find((b) => b.id === copy.bookId); return <tr key={copy.id}><td><strong>{copy.barcode}</strong></td><td>{book?.title ?? '—'}</td><td>{copy.location}</td><td>{copy.shelf}</td><td><span className="lib-soft-tag">{copy.condition}</span></td><td><span className={`lib-status ${copy.status === 'Available' ? 'good' : copy.status === 'Borrowed' ? 'neutral' : copy.status === 'Damaged' || copy.status === 'Lost' ? 'bad' : 'warning'}`}>{copy.status}</span></td><td>{copy.status === 'Available' && <button className="lib-link" onClick={() => libraryDemo.markCopyStatus(copy.id, 'Lost')}>Mark lost</button>}{copy.status === 'Available' && <button className="lib-link" onClick={() => libraryDemo.markCopyStatus(copy.id, 'Damaged')}>Mark damaged</button>}{copy.status === 'Damaged' && <button className="lib-link" onClick={() => libraryDemo.markCopyStatus(copy.id, 'Under repair')}>Send to repair</button>}{copy.status === 'Under repair' && <button className="lib-link" onClick={() => libraryDemo.markCopyStatus(copy.id, 'Available')}>Mark available</button>}</td></tr>; })}</tbody></table></div>
  </Panel></>;
}

function IssueView({ demo }: { demo: ReturnType<typeof useLibraryDemo> }) {
  const [borrowerId, setBorrowerId] = useState('');
  const [copyId, setCopyId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const availableCopies = demo.copies.filter((c) => c.status === 'Available');
  const eligibleBorrowers = demo.borrowers.filter((b) => b.eligible);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!borrowerId || !copyId) { setError('Select both a borrower and an available copy.'); return; }
    const result = libraryDemo.issueLoan(borrowerId, copyId);
    if (result.ok) { setSuccess('Book issued successfully. The copy is now borrowed and the borrower has been notified.'); setError(''); setBorrowerId(''); setCopyId(''); }
    else { setError(result.error ?? 'Failed to issue book.'); setSuccess(''); }
  };
  return <><Panel title="Issue a book" subtitle="Select an eligible borrower and an available copy to create a loan. Due dates are calculated by borrower type."><form className="lib-form" onSubmit={submit}>
    <label>Borrower<select value={borrowerId} onChange={(event) => setBorrowerId(event.target.value)}><option value="">Select borrower...</option>{eligibleBorrowers.map((b) => <option key={b.id} value={b.id}>{b.name} · {b.type} · {b.activeLoans} active loan(s)</option>)}</select></label>
    <label>Available copy<select value={copyId} onChange={(event) => setCopyId(event.target.value)}><option value="">Select copy...</option>{availableCopies.map((c) => { const book = demo.books.find((b) => b.id === c.bookId); return <option key={c.id} value={c.id}>{c.barcode} · {book?.title}</option>; })}</select></label>
    <button className="lib-button primary" type="submit" disabled={!borrowerId || !copyId}><BookOpen size={15} /> Issue book</button>
    {error && <span className="lib-form-error">{error}</span>}
    {success && <span className="lib-form-message">{success}</span>}
  </form></Panel>
  <Panel title="Borrowing policies" subtitle="Configured rules applied during issue">
    <div className="lib-record-list">
      <div className="lib-stat-row"><span>Student max active loans</span><strong>{LIBRARY_POLICIES.MAX_LOANS_STUDENT}</strong></div>
      <div className="lib-stat-row"><span>Teacher/Staff max active loans</span><strong>{LIBRARY_POLICIES.MAX_LOANS_STAFF}</strong></div>
      <div className="lib-stat-row"><span>Student loan period (days)</span><strong>{LIBRARY_POLICIES.LOAN_DAYS_STUDENT}</strong></div>
      <div className="lib-stat-row"><span>Teacher/Staff loan period (days)</span><strong>{LIBRARY_POLICIES.LOAN_DAYS_STAFF}</strong></div>
      <div className="lib-stat-row"><span>Max renewals per loan</span><strong>{LIBRARY_POLICIES.MAX_RENEWALS}</strong></div>
      <div className="lib-stat-row"><span>Overdue fine rate (KES/day)</span><strong>{LIBRARY_POLICIES.FINE_PER_DAY}</strong></div>
    </div>
  </Panel></>;
}

function ReturnsView({ demo }: { demo: ReturnType<typeof useLibraryDemo> }) {
  const [loanId, setLoanId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const activeLoans = demo.loans.filter((l) => l.status === 'Active' || l.status === 'Overdue');
  const submit = () => {
    if (!loanId) { setError('Select an active loan to process the return.'); return; }
    const result = libraryDemo.returnLoan(loanId);
    if (result.ok) { const loan = demo.loans.find((l) => l.id === loanId); setSuccess(`Return processed for "${loan?.bookTitle}". Copy is now available.${loan?.status === 'Overdue' ? ' An overdue fine has been assessed.' : ''}`); setError(''); setLoanId(''); }
    else { setError(result.error ?? 'Failed to process return.'); setSuccess(''); }
  };
  return <><Panel title="Process a return" subtitle="Find the active loan and confirm the return. Overdue fines are assessed automatically."><div className="lib-form">
    <label>Active loan<select value={loanId} onChange={(event) => setLoanId(event.target.value)}><option value="">Select loan...</option>{activeLoans.map((l) => <option key={l.id} value={l.id}>{l.barcode} · {l.bookTitle} · {l.borrowerName} · due {l.dueDate}</option>)}</select></label>
    <button className="lib-button primary" type="button" onClick={submit} disabled={!loanId}><Undo2 size={15} /> Confirm return</button>
    {error && <span className="lib-form-error">{error}</span>}
    {success && <span className="lib-form-message">{success}</span>}
  </div></Panel>
  <Panel title="Recently returned" subtitle="Completed returns with timestamps">
    <div className="lib-record-list">{demo.loans.filter((l) => l.status === 'Returned').map((l) => <div className="lib-record-row" key={l.id}><div><strong>{l.bookTitle}</strong><span>{l.borrowerName} · returned {l.returnDate}</span></div><span className="lib-status good">Returned</span></div>)}
    {demo.loans.filter((l) => l.status === 'Returned').length === 0 && <div style={{ padding: '12px 0', color: '#9ca8ad', fontSize: 10 }}>No returns recorded yet.</div>}
    </div>
  </Panel></>;
}

function RenewalsView({ demo }: { demo: ReturnType<typeof useLibraryDemo> }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const renewableLoans = demo.loans.filter((l) => l.status === 'Active' || l.status === 'Overdue');
  const renew = (loanId: string) => { const result = libraryDemo.renewLoan(loanId); if (result.ok) { const loan = demo.loans.find((l) => l.id === loanId); setSuccess(`"${loan?.bookTitle}" renewed. New due date calculated.`); setError(''); } else { setError(result.error ?? 'Renewal failed.'); setSuccess(''); } };
  return <><Panel title="Loan renewals" subtitle="Renewals are checked against policy: max 2 renewals, no overdue loans, no pending reservations on the same title.">
    {success && <div className="lib-success"><CheckCircle2 size={16} /> {success}</div>}
    {error && <div className="lib-error"><XCircle size={16} /> {error}</div>}
    <div className="lib-record-list">{renewableLoans.map((loan) => <div className="lib-record-row" key={loan.id}><div><strong>{loan.bookTitle}</strong><span>{loan.borrowerName} · due {loan.dueDate} · {loan.renewals}/{LIBRARY_POLICIES.MAX_RENEWALS} renewals used</span></div><span className={`lib-status ${loan.status === 'Overdue' ? 'bad' : 'neutral'}`}>{loan.status}</span><div className="lib-row-actions"><button className="lib-button secondary" onClick={() => renew(loan.id)} disabled={loan.status === 'Overdue' || loan.renewals >= LIBRARY_POLICIES.MAX_RENEWALS}>Renew</button></div></div>)}
    {renewableLoans.length === 0 && <div style={{ padding: '12px 0', color: '#9ca8ad', fontSize: 10 }}>No loans available for renewal.</div>}
    </div>
  </Panel></>;
}

function LoansView({ demo }: { demo: ReturnType<typeof useLibraryDemo> }) {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Returned' | 'Overdue'>('All');
  const loans = filter === 'All' ? demo.loans : demo.loans.filter((l) => l.status === filter);
  return <><div className="lib-filterbar"><div className="lib-search inline"><Search size={16} /><input placeholder="Search loans..." disabled /></div><div style={{ display: 'flex', gap: 6 }}>{(['All', 'Active', 'Returned', 'Overdue'] as const).map((f) => <button key={f} className={`lib-button ${filter === f ? 'primary' : 'secondary'}`} onClick={() => setFilter(f)}>{f}</button>)}</div></div>
  <Panel title="All loans" subtitle={`${loans.length} loan(s) in the system`}><div className="lib-table-wrap"><table className="lib-table"><thead><tr><th>Book</th><th>Barcode</th><th>Borrower</th><th>Type</th><th>Issued</th><th>Due</th><th>Returned</th><th>Status</th></tr></thead><tbody>{loans.map((loan) => <tr key={loan.id}><td><strong>{loan.bookTitle}</strong></td><td>{loan.barcode}</td><td>{loan.borrowerName}</td><td><span className="lib-soft-tag">{loan.borrowerType}</span></td><td>{loan.issueDate}</td><td>{loan.dueDate}</td><td>{loan.returnDate ?? '—'}</td><td><span className={`lib-status ${loan.status === 'Returned' ? 'good' : loan.status === 'Overdue' ? 'bad' : 'neutral'}`}>{loan.status}</span></td></tr>)}</tbody></table></div></Panel></>;
}

function OverdueView({ demo }: { demo: ReturnType<typeof useLibraryDemo> }) {
  const overdue = demo.loans.filter((l) => l.status === 'Overdue');
  return <><div className="lib-three-grid"><LibMetric icon={Clock3} label="Overdue loans" value={String(overdue.length)} detail="Requires follow-up" /><LibMetric icon={Users} label="Affected borrowers" value={String(new Set(overdue.map((l) => l.borrowerId)).size)} detail="With overdue items" /><LibMetric icon={FileText} label="Fines assessed" value={String(demo.fines.filter((f) => f.status === 'Outstanding').length)} detail="Outstanding charges" /></div>
  <Panel title="Overdue loans" subtitle="Items past their due date. Overdue status is calculated automatically, not by manual dashboard action.">
    <div className="lib-record-list">{overdue.map((loan) => <div className="lib-record-row" key={loan.id}><div><strong>{loan.bookTitle}</strong><span>{loan.borrowerName} · due {loan.dueDate} · barcode {loan.barcode}</span></div><span className="lib-status bad">Overdue</span><div className="lib-row-actions"><button className="lib-button secondary" onClick={() => libraryDemo.returnLoan(loan.id)}>Process return</button></div></div>)}
    {overdue.length === 0 && <div style={{ padding: '12px 0', color: '#9ca8ad', fontSize: 10 }}>No overdue loans. All items are within their due dates.</div>}
    </div>
  </Panel></>;
}

function ReservationsView({ demo }: { demo: ReturnType<typeof useLibraryDemo> }) {
  const [bookId, setBookId] = useState('');
  const [borrowerId, setBorrowerId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const unavailableBooks = demo.books.filter((b) => b.availableCopies === 0);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!bookId || !borrowerId) { setError('Select both a title and a borrower.'); return; }
    const result = libraryDemo.createReservation(borrowerId, bookId);
    if (result.ok) { setSuccess('Reservation created. The borrower will be notified when a copy becomes available.'); setError(''); setBookId(''); setBorrowerId(''); }
    else { setError(result.error ?? 'Failed to create reservation.'); setSuccess(''); }
  };
  return <><Panel title="Create reservation" subtitle="Reservations are only for titles with no available copies. The queue is managed server-side in production."><form className="lib-form" onSubmit={submit}>
    <label>Title (unavailable only)<select value={bookId} onChange={(event) => setBookId(event.target.value)}><option value="">Select title...</option>{unavailableBooks.map((b) => <option key={b.id} value={b.id}>{b.title} · 0 available</option>)}</select></label>
    <label>Borrower<select value={borrowerId} onChange={(event) => setBorrowerId(event.target.value)}><option value="">Select borrower...</option>{demo.borrowers.filter((b) => b.eligible).map((b) => <option key={b.id} value={b.id}>{b.name} · {b.type}</option>)}</select></label>
    <button className="lib-button primary" type="submit" disabled={!bookId || !borrowerId}><BookMarked size={15} /> Reserve</button>
    {error && <span className="lib-form-error">{error}</span>}
    {success && <span className="lib-form-message">{success}</span>}
  </form></Panel>
  <Panel title="Reservation queue" subtitle="Pending reservations ordered by queue position">
    <div className="lib-record-list">{demo.reservations.map((res) => <div className="lib-record-row" key={res.id}><div><strong>{res.bookTitle}</strong><span>{res.borrowerName} · requested {res.requestedDate} · queue position {res.queuePosition}</span></div><span className={`lib-status ${res.status === 'Pending' ? 'warning' : res.status === 'Fulfilled' ? 'good' : 'neutral'}`}>{res.status}</span>{res.status === 'Pending' && <div className="lib-row-actions"><button className="lib-button secondary" onClick={() => libraryDemo.cancelReservation(res.id)}>Cancel</button></div>}</div>)}
    {demo.reservations.length === 0 && <div style={{ padding: '12px 0', color: '#9ca8ad', fontSize: 10 }}>No reservations in the queue.</div>}
    </div>
  </Panel></>;
}

function FinesView({ demo }: { demo: ReturnType<typeof useLibraryDemo> }) {
  return <><div className="lib-three-grid"><LibMetric icon={FileText} label="Outstanding" value={String(demo.fines.filter((f) => f.status === 'Outstanding').length)} detail="Awaiting settlement" /><LibMetric icon={CheckCircle2} label="Settled" value={String(demo.fines.filter((f) => f.status === 'Settled').length)} detail="Paid in full" /><LibMetric icon={ShieldCheck} label="Waived" value={String(demo.fines.filter((f) => f.status === 'Waived').length)} detail="Authorised waiver" /></div>
  <Panel title="Fines and charges" subtitle="Each charge has a documented reason. Settlement is separate from return processing.">
    <div className="lib-record-list">{demo.fines.map((fine) => <div className="lib-record-row" key={fine.id}><div><strong>{fine.borrowerName} · KES {fine.amount.toLocaleString()}</strong><span>{fine.reason} · created {fine.createdDate}{fine.settledDate ? ` · settled ${fine.settledDate}` : ''}</span></div><span className={`lib-status ${fine.status === 'Settled' ? 'good' : fine.status === 'Waived' ? 'neutral' : 'bad'}`}>{fine.status}</span>{fine.status === 'Outstanding' && <div className="lib-row-actions"><button className="lib-button secondary" onClick={() => libraryDemo.waiveFine(fine.id)}>Waive</button><button className="lib-button primary" onClick={() => libraryDemo.settleFine(fine.id)}>Settle</button></div>}</div>)}
    {demo.fines.length === 0 && <div style={{ padding: '12px 0', color: '#9ca8ad', fontSize: 10 }}>No fines recorded.</div>}
    </div>
  </Panel>
  <Panel title="Fine policy" subtitle="Configured rules for overdue charges">
    <div className="lib-record-list">
      <div className="lib-stat-row"><span>Overdue rate</span><strong>KES {LIBRARY_POLICIES.FINE_PER_DAY} per day</strong></div>
      <div className="lib-stat-row"><span>Assessment</span><strong>Automatic on return of overdue items</strong></div>
      <div className="lib-stat-row"><span>Settlement</span><strong>Separate from return — does not auto-pay</strong></div>
    </div>
  </Panel></>;
}

function BorrowersView({ demo, search }: { demo: ReturnType<typeof useLibraryDemo>; search: string }) {
  const [query, setQuery] = useState(search);
  const records = demo.borrowers.filter((b) => `${b.name} ${b.type} ${b.className}`.toLowerCase().includes(query.toLowerCase()));
  return <><div className="lib-filterbar"><div className="lib-search inline"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search borrowers..." /></div></div>
  <Panel title="Borrowers" subtitle="Eligibility is determined by overdue items and outstanding fines."><div className="lib-table-wrap"><table className="lib-table"><thead><tr><th>Borrower</th><th>Type</th><th>Class / Dept</th><th>Active loans</th><th>Fines</th><th>Eligible</th></tr></thead><tbody>{records.map((b) => <tr key={b.id}><td><div className="lib-person"><div className="lib-table-avatar">{b.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div><span><strong>{b.name}</strong><small>{b.id}</small></span></div></td><td><span className="lib-soft-tag">{b.type}</span></td><td>{b.className}</td><td>{b.activeLoans}</td><td>KES {b.outstandingFines.toLocaleString()}</td><td><span className={`lib-status ${b.eligible ? 'good' : 'bad'}`}>{b.eligible ? 'Eligible' : 'Restricted'}</span></td></tr>)}</tbody></table></div></Panel></>;
}

function InventoryView({ demo }: { demo: ReturnType<typeof useLibraryDemo> }) {
  const byStatus: Record<string, number> = {};
  demo.copies.forEach((c) => { byStatus[c.status] = (byStatus[c.status] ?? 0) + 1; });
  const byCondition: Record<string, number> = {};
  demo.copies.forEach((c) => { byCondition[c.condition] = (byCondition[c.condition] ?? 0) + 1; });
  return <><div className="lib-three-grid"><LibMetric icon={BookCopy} label="Total copies" value={String(demo.copies.length)} detail="Across all titles" /><LibMetric icon={CheckCircle2} label="Available" value={String(byStatus['Available'] ?? 0)} detail="Ready for loan" /><LibMetric icon={XCircle} label="Lost / damaged" value={String((byStatus['Lost'] ?? 0) + (byStatus['Damaged'] ?? 0))} detail="Needs attention" /></div>
  <Panel title="Inventory by status" subtitle="Physical copy status distribution"><div className="lib-record-list">{Object.entries(byStatus).map(([status, count]) => <div className="lib-stat-row" key={status}><span>{status}</span><strong>{count}</strong></div>)}</div></Panel>
  <Panel title="Inventory by condition" subtitle="Physical condition assessment"><div className="lib-record-list">{Object.entries(byCondition).map(([cond, count]) => <div className="lib-stat-row" key={cond}><span>{cond}</span><strong>{count}</strong></div>)}</div></Panel>
  <Panel title="Recent inventory adjustments" subtitle="Copy status changes with audit trail"><div className="lib-record-list">{demo.audit.filter((a) => a.action.includes('copy') || a.action.includes('copy') || a.action.includes('Registered')).slice(0, 6).map((entry) => <div className="lib-record-row" key={entry.id}><div><strong>{entry.action}</strong><span>{entry.target} · {entry.timestamp}</span></div><span className="lib-status neutral">Logged</span></div>)}</div></Panel></>;
}

function NotificationsView({ demo }: { demo: ReturnType<typeof useLibraryDemo> }) {
  return <Panel title="Library notifications" subtitle="Notices sent to borrowers for due dates, overdue items, reservations and renewals."><div className="lib-record-list">{demo.notifications.map((n) => <div className="lib-record-row" key={n.id}><div><strong>{n.title}</strong><span>To: {n.recipient} · {n.detail} · {n.createdDate}</span></div>{n.unread ? <button className="lib-button secondary" onClick={() => libraryDemo.markNotificationRead(n.id)}>Mark read</button> : <span className="lib-status good">Read</span>}</div>)}
  {demo.notifications.length === 0 && <div style={{ padding: '12px 0', color: '#9ca8ad', fontSize: 10 }}>No notifications.</div>}
  </div></Panel>;
}

function ReportsView({ demo }: { demo: ReturnType<typeof useLibraryDemo> }) {
  return <><div className="lib-report-grid">{['Catalogue inventory', 'Available and borrowed copies', 'Current loans', 'Overdue loans', 'Borrowing history', 'Popular titles', 'Lost and damaged items', 'Fine assessments', 'Inventory movements'].map((title) => <button className="lib-report-card" key={title} disabled title="Report generation requires the Laravel report service"><BarChart3 size={18} /><strong>{title}</strong><span>Filtered synthetic records with defined source and period.</span><ArrowUpRight size={14} /></button>)}</div>
  <Panel title="Report activity" subtitle="Recent report-related audit entries"><div className="lib-record-list">{demo.audit.slice(0, 4).map((entry) => <div className="lib-record-row" key={entry.id}><div><strong>{entry.action}</strong><span>{entry.target} · {entry.timestamp}</span></div><span className="lib-status neutral">Logged</span></div>)}</div></Panel></>;
}

function AuditView({ demo }: { demo: ReturnType<typeof useLibraryDemo> }) {
  return <Panel title="Audit history" subtitle="Every library transaction is recorded with actor, action, target and timestamp."><div className="lib-record-list">{demo.audit.map((entry) => <div className="lib-audit-row" key={entry.id}><span>{entry.timestamp}</span><i /><strong>{entry.actor}: {entry.action}</strong></div>)}</div></Panel>;
}

function SettingsView() {
  return <><Panel title="Library settings" subtitle="Configuration changes require the authenticated Laravel service."><div className="lib-calendar-note"><ShieldCheck size={18} /><span><strong>Restricted library workspace</strong><small>Current demo access is visual only and does not grant production library authority.</small></span></div></Panel>
  <Panel title="Borrowing policies" subtitle="Configured rules for loans, renewals and fines"><div className="lib-record-list">
    <div className="lib-stat-row"><span>Student max active loans</span><strong>{LIBRARY_POLICIES.MAX_LOANS_STUDENT}</strong></div>
    <div className="lib-stat-row"><span>Teacher/Staff max active loans</span><strong>{LIBRARY_POLICIES.MAX_LOANS_STAFF}</strong></div>
    <div className="lib-stat-row"><span>Student loan period</span><strong>{LIBRARY_POLICIES.LOAN_DAYS_STUDENT} days</strong></div>
    <div className="lib-stat-row"><span>Teacher/Staff loan period</span><strong>{LIBRARY_POLICIES.LOAN_DAYS_STAFF} days</strong></div>
    <div className="lib-stat-row"><span>Max renewals</span><strong>{LIBRARY_POLICIES.MAX_RENEWALS}</strong></div>
    <div className="lib-stat-row"><span>Overdue fine rate</span><strong>KES {LIBRARY_POLICIES.FINE_PER_DAY}/day</strong></div>
  </div></Panel></>;
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) { return <section className="lib-panel"><div className="lib-panel-head"><div><h2>{title}</h2><p>{subtitle}</p></div><MoreHorizontal size={17} className="lib-muted" /></div>{children}</section>; }
function LibMetric({ icon: Icon, label, value, detail, onClick }: { icon: LucideIcon; label: string; value: string; detail: string; onClick?: () => void }) { const Tag = onClick ? 'button' : 'div'; return <Tag className="lib-metric" onClick={onClick}><div className="lib-metric-icon"><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></Tag>; }
function MiniStat({ label, value }: { label: string; value: string }) { return <div className="lib-mini-stat"><span>{label}</span><strong>{value}</strong></div>; }
function Task({ title, detail, action, onClick }: { title: string; detail: string; action: string; onClick: () => void }) { return <button className="lib-task" onClick={onClick}><div className="lib-task-icon"><CheckCircle2 size={16} /></div><span><strong>{title}</strong><small>{detail}</small></span><b>{action} <ArrowUpRight size={13} /></b></button>; }
function QuickAction({ label, icon: Icon, onClick }: { label: string; icon: LucideIcon; onClick: () => void }) { return <button className="lib-quick" onClick={onClick}><Icon size={18} /><span>{label}</span><ArrowUpRight size={13} /></button>; }
function AlertCard({ title, detail, tone, onClick }: { title: string; detail: string; tone: string; onClick: () => void }) { return <button className={`lib-alert ${tone}`} onClick={onClick}><span /><div><strong>{title}</strong><small>{detail}</small></div><ArrowUpRight size={14} /></button>; }
