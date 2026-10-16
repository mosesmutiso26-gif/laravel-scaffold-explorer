import { useSyncExternalStore } from 'react';

export type FeePackage = 'Day' | 'Boarding';
export type ChargeStatus = 'Billed' | 'Partially paid' | 'Paid' | 'Waived' | 'Overdue';
export type PaymentStatus = 'Pending verification' | 'Verified' | 'Allocated' | 'Rejected' | 'Reversed';
export type PaymentMethod = 'Cash' | 'Bank transfer' | 'M-Pesa' | 'Cheque';
export type DiscountType = 'Scholarship' | 'Bursary' | 'Sibling discount' | 'Staff discount' | 'Early payment';
export type DiscountStatus = 'Pending' | 'Approved' | 'Rejected';
export type CreditNoteStatus = 'Pending' | 'Approved' | 'Posted';
export type FeeQueryStatus = 'Submitted' | 'Under review' | 'Awaiting parent info' | 'Resolved' | 'Rejected';
export type FeeQueryCategory = 'Incorrect charge' | 'Missing payment' | 'Statement discrepancy' | 'Allocation error' | 'Concession query' | 'Other';
export type ArrearsBucket = 'Current' | '1-30 days' | '31-60 days' | '61-90 days' | 'Over 90 days';
export type NotificationChannel = 'In-app' | 'Email' | 'SMS';
export type DeliveryStatus = 'Delivered' | 'Sent' | 'Failed' | 'Pending';

export type LedgerEntry = {
  id: string;
  studentId: string;
  date: string;
  postingDate: string;
  type: 'Opening balance' | 'Charge' | 'Payment' | 'Allocation' | 'Discount' | 'Credit note' | 'Refund' | 'Reversal' | 'Adjustment';
  reference: string;
  description: string;
  chargeAmount: number;
  paymentAmount: number;
  concessionAmount: number;
  runningBalance: number;
  actor: string;
  status: 'Posted' | 'Pending' | 'Reversed';
};

export type FeeStatement = {
  id: string;
  statementNo: string;
  studentId: string;
  studentName: string;
  admissionNo: string;
  className: string;
  packageName: FeePackage;
  academicYear: string;
  term: string;
  issueDate: string;
  periodFrom: string;
  periodTo: string;
  openingBalance: number;
  totalCharges: number;
  totalPayments: number;
  totalConcessions: number;
  outstandingBalance: number;
  unallocatedCredit: number;
  amountDueByDate: number;
  dueDate: string;
  status: 'Generated' | 'Reissued' | 'Delivered';
};

export type ParentAccount = {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  children: ParentChild[];
  notificationPrefs: { email: boolean; sms: boolean; inApp: boolean; };
};

export type ParentChild = {
  studentId: string;
  studentName: string;
  admissionNo: string;
  className: string;
  packageName: FeePackage;
  profileImage: string | null;
  billed: number;
  paid: number;
  outstanding: number;
  advanceCredit: number;
  dueDate: string;
  lastPaymentDate: string | null;
  lastPaymentAmount: number | null;
  hasOverdue: boolean;
  term: string;
  academicYear: string;
};

export type FeeQuery = {
  id: string;
  trackingNo: string;
  parentName: string;
  studentId: string;
  studentName: string;
  category: FeeQueryCategory;
  description: string;
  transactionRef: string | null;
  submittedDate: string;
  status: FeeQueryStatus;
  staffNotes: string[];
  parentReplies: { date: string; message: string }[];
  assignedTo: string | null;
};

export type CreditNote = {
  id: string;
  reference: string;
  studentId: string;
  studentName: string;
  amount: number;
  reason: string;
  date: string;
  status: CreditNoteStatus;
  approvedBy: string | null;
  postedBy: string | null;
};

export type PaymentPlan = {
  studentId: string;
  instalments: { label: string; amount: number; dueDate: string; paidAmount: number; status: 'Paid' | 'Partially paid' | 'Upcoming' | 'Overdue' }[];
};

export type ParentNotification = {
  id: string;
  parentName: string;
  channel: NotificationChannel;
  title: string;
  message: string;
  date: string;
  deliveryStatus: DeliveryStatus;
  read: boolean;
};

export type StudentBalance = {
  studentId: string;
  studentName: string;
  admissionNo: string;
  className: string;
  packageName: FeePackage;
  openingArrears: number;
  currentTermCharges: number;
  approvedConcessions: number;
  verifiedPayments: number;
  outstanding: number;
  advanceCredit: number;
  dueDate: string;
  balanceStatus: 'Paid in full' | 'Part-paid' | 'Unpaid' | 'Overdue' | 'Credit balance' | 'Pending reconciliation';
  ageingBucket: ArrearsBucket;
  assignedStaff: string | null;
  followUpNotes: { date: string; note: string; staff: string }[];
};

export type FeesDemoState = {
  statements: FeeStatement[];
  ledger: LedgerEntry[];
  creditNotes: CreditNote[];
  parentAccounts: ParentAccount[];
  feeQueries: FeeQuery[];
  paymentPlans: PaymentPlan[];
  parentNotifications: ParentNotification[];
  studentBalances: StudentBalance[];
};

function buildLedger(): LedgerEntry[] {
  const entries: LedgerEntry[] = [];
  let bal = 0;
  const add = (e: Omit<LedgerEntry, 'runningBalance'>) => {
    bal += e.chargeAmount - e.paymentAmount - e.concessionAmount;
    entries.push({ ...e, runningBalance: bal });
  };

  // Amani Wanjiku (stu-001) — fully paid with scholarship
  bal = 0;
  add({ id: 'led-001', studentId: 'stu-001', date: '01 Sep 2026', postingDate: '01 Sep 2026', type: 'Opening balance', reference: 'OPN-2026-T2', description: 'Balance carried forward from Term 2', chargeAmount: 0, paymentAmount: 0, concessionAmount: 0, actor: 'System', status: 'Posted' });
  add({ id: 'led-002', studentId: 'stu-001', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0401', description: 'Tuition — Term 3', chargeAmount: 48000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-003', studentId: 'stu-001', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0402', description: 'Boarding — Term 3', chargeAmount: 38000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-004', studentId: 'stu-001', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0403', description: 'Meals — Term 3', chargeAmount: 19000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-005', studentId: 'stu-001', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0404', description: 'Activity fee — Term 3', chargeAmount: 5000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-006', studentId: 'stu-001', date: '28 Sep 2026', postingDate: '28 Sep 2026', type: 'Discount', reference: 'DSC-2026-001', description: 'Academic excellence scholarship 25%', chargeAmount: 0, paymentAmount: 0, concessionAmount: 27500, actor: 'Miriam Njoroge', status: 'Posted' });
  add({ id: 'led-007', studentId: 'stu-001', date: '03 Oct 2026', postingDate: '03 Oct 2026', type: 'Payment', reference: 'RC-2026-10142', description: 'M-Pesa payment — Wanjiku Kamau', chargeAmount: 0, paymentAmount: 110000, concessionAmount: 0, actor: 'Lydia Otieno', status: 'Posted' });
  add({ id: 'led-008', studentId: 'stu-001', date: '03 Oct 2026', postingDate: '03 Oct 2026', type: 'Allocation', reference: 'RC-2026-10142', description: 'Allocated to INV-2026-0401, 0402, 0403, 0404', chargeAmount: 0, paymentAmount: 0, concessionAmount: 0, actor: 'Lydia Otieno', status: 'Posted' });

  // Brian Otieno (stu-002) — partial payment
  bal = 0;
  add({ id: 'led-009', studentId: 'stu-002', date: '01 Sep 2026', postingDate: '01 Sep 2026', type: 'Opening balance', reference: 'OPN-2026-T2', description: 'Balance carried forward from Term 2', chargeAmount: 0, paymentAmount: 0, concessionAmount: 0, actor: 'System', status: 'Posted' });
  add({ id: 'led-010', studentId: 'stu-002', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0405', description: 'Tuition — Term 3 (Day)', chargeAmount: 55000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-011', studentId: 'stu-002', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0406', description: 'Meals — Term 3', chargeAmount: 13000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-012', studentId: 'stu-002', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0407', description: 'Lab fee — Term 3', chargeAmount: 8000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-013', studentId: 'stu-002', date: '08 Oct 2026', postingDate: '08 Oct 2026', type: 'Payment', reference: 'RC-2026-10143', description: 'Bank transfer — Otieno Sr', chargeAmount: 0, paymentAmount: 36600, concessionAmount: 0, actor: 'Lydia Otieno', status: 'Posted' });
  add({ id: 'led-014', studentId: 'stu-002', date: '08 Oct 2026', postingDate: '08 Oct 2026', type: 'Allocation', reference: 'RC-2026-10143', description: 'Allocated to INV-2026-0405 (Tuition)', chargeAmount: 0, paymentAmount: 0, concessionAmount: 0, actor: 'Lydia Otieno', status: 'Posted' });
  add({ id: 'led-015', studentId: 'stu-002', date: '16 Oct 2026', postingDate: '16 Oct 2026', type: 'Payment', reference: 'RC-2026-10145', description: 'M-Pesa payment — Otieno Sr (pending verification)', chargeAmount: 0, paymentAmount: 0, concessionAmount: 0, actor: 'System', status: 'Pending' });

  // Chloe Njeri (stu-003) — overdue with carried-forward arrears
  bal = 15000;
  add({ id: 'led-016', studentId: 'stu-003', date: '01 Sep 2026', postingDate: '01 Sep 2026', type: 'Opening balance', reference: 'OPN-2026-T2', description: 'Arrears carried forward from Term 2', chargeAmount: 15000, paymentAmount: 0, concessionAmount: 0, actor: 'System', status: 'Posted' });
  add({ id: 'led-017', studentId: 'stu-003', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0408', description: 'Tuition — Term 3 (Boarding)', chargeAmount: 55000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-018', studentId: 'stu-003', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0409', description: 'Boarding — Term 3', chargeAmount: 38000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-019', studentId: 'stu-003', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0410', description: 'Meals — Term 3', chargeAmount: 19000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-020', studentId: 'stu-003', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0411', description: 'Lab fee — Term 3', chargeAmount: 8000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-021', studentId: 'stu-003', date: '15 Oct 2026', postingDate: '15 Oct 2026', type: 'Payment', reference: 'RC-2026-10146', description: 'Cheque payment — Njeri Grace (pending verification)', chargeAmount: 0, paymentAmount: 0, concessionAmount: 0, actor: 'Esther Njoroge', status: 'Pending' });

  // Dylan Kamau (stu-004) — fully paid
  bal = 0;
  add({ id: 'led-022', studentId: 'stu-004', date: '01 Sep 2026', postingDate: '01 Sep 2026', type: 'Opening balance', reference: 'OPN-2026-T2', description: 'Balance carried forward from Term 2', chargeAmount: 0, paymentAmount: 0, concessionAmount: 0, actor: 'System', status: 'Posted' });
  add({ id: 'led-023', studentId: 'stu-004', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0412', description: 'Tuition — Term 3 (Day)', chargeAmount: 60000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-024', studentId: 'stu-004', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0413', description: 'Meals — Term 3', chargeAmount: 13000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-025', studentId: 'stu-004', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0414', description: 'Lab fee — Term 3', chargeAmount: 8000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-026', studentId: 'stu-004', date: '04 Oct 2026', postingDate: '04 Oct 2026', type: 'Payment', reference: 'RC-2026-10144', description: 'Cash payment — Kamau Peter', chargeAmount: 0, paymentAmount: 81000, concessionAmount: 0, actor: 'Lydia Otieno', status: 'Posted' });
  add({ id: 'led-027', studentId: 'stu-004', date: '04 Oct 2026', postingDate: '04 Oct 2026', type: 'Allocation', reference: 'RC-2026-10144', description: 'Allocated to INV-2026-0412, 0413, 0414', chargeAmount: 0, paymentAmount: 0, concessionAmount: 0, actor: 'Lydia Otieno', status: 'Posted' });

  // Faith Achieng (stu-005) — sibling discount, advance credit
  bal = 0;
  add({ id: 'led-028', studentId: 'stu-005', date: '01 Sep 2026', postingDate: '01 Sep 2026', type: 'Opening balance', reference: 'OPN-2026-T2', description: 'Balance carried forward from Term 2', chargeAmount: 0, paymentAmount: 0, concessionAmount: 0, actor: 'System', status: 'Posted' });
  add({ id: 'led-029', studentId: 'stu-005', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0415', description: 'Tuition — Term 3 (Day)', chargeAmount: 55000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-030', studentId: 'stu-005', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0416', description: 'Meals — Term 3', chargeAmount: 13000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-031', studentId: 'stu-005', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0417', description: 'Lab fee — Term 3', chargeAmount: 8000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-032', studentId: 'stu-005', date: '20 Sep 2026', postingDate: '20 Sep 2026', type: 'Discount', reference: 'DSC-2026-003', description: 'Sibling discount 10%', chargeAmount: 0, paymentAmount: 0, concessionAmount: 7600, actor: 'Miriam Njoroge', status: 'Posted' });
  add({ id: 'led-033', studentId: 'stu-005', date: '10 Oct 2026', postingDate: '10 Oct 2026', type: 'Payment', reference: 'RC-2026-10147', description: 'M-Pesa payment — Achieng Peter', chargeAmount: 0, paymentAmount: 80000, concessionAmount: 0, actor: 'Lydia Otieno', status: 'Posted' });
  add({ id: 'led-034', studentId: 'stu-005', date: '10 Oct 2026', postingDate: '10 Oct 2026', type: 'Allocation', reference: 'RC-2026-10147', description: 'Allocated to INV-2026-0415, 0416, 0417', chargeAmount: 0, paymentAmount: 0, concessionAmount: 0, actor: 'Lydia Otieno', status: 'Posted' });

  // Gloria Wairimu (stu-006) — staff discount pending, unallocated payment
  bal = 0;
  add({ id: 'led-035', studentId: 'stu-006', date: '01 Sep 2026', postingDate: '01 Sep 2026', type: 'Opening balance', reference: 'OPN-2026-T2', description: 'Balance carried forward from Term 2', chargeAmount: 0, paymentAmount: 0, concessionAmount: 0, actor: 'System', status: 'Posted' });
  add({ id: 'led-036', studentId: 'stu-006', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0418', description: 'Tuition — Term 3 (Day)', chargeAmount: 55000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-037', studentId: 'stu-006', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0419', description: 'Meals — Term 3', chargeAmount: 13000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-038', studentId: 'stu-006', date: '01 Oct 2026', postingDate: '01 Oct 2026', type: 'Charge', reference: 'INV-2026-0420', description: 'Lab fee — Term 3', chargeAmount: 8000, paymentAmount: 0, concessionAmount: 0, actor: 'Finance Officer', status: 'Posted' });
  add({ id: 'led-039', studentId: 'stu-006', date: '12 Oct 2026', postingDate: '12 Oct 2026', type: 'Payment', reference: 'RC-2026-10148', description: 'Bank transfer — Wairimu Sarah (verified, unallocated)', chargeAmount: 0, paymentAmount: 38000, concessionAmount: 0, actor: 'Lydia Otieno', status: 'Posted' });

  return entries;
}

const seed: FeesDemoState = {
  ledger: buildLedger(),
  statements: [
    { id: 'st-001', statementNo: 'ST-2026-0001', studentId: 'stu-001', studentName: 'Amani Wanjiku', admissionNo: 'RA/2015/034', className: 'Year 6 — Cedar', packageName: 'Boarding', academicYear: '2026', term: 'Term 3', issueDate: '05 Oct 2026', periodFrom: '01 Sep 2026', periodTo: '05 Oct 2026', openingBalance: 0, totalCharges: 110000, totalPayments: 110000, totalConcessions: 27500, outstandingBalance: 0, unallocatedCredit: 0, amountDueByDate: 0, dueDate: '05 Oct 2026', status: 'Delivered' },
    { id: 'st-002', statementNo: 'ST-2026-0002', studentId: 'stu-002', studentName: 'Brian Otieno', admissionNo: 'RA/2014/088', className: 'Year 8 — Acacia', packageName: 'Day', academicYear: '2026', term: 'Term 3', issueDate: '05 Oct 2026', periodFrom: '01 Sep 2026', periodTo: '05 Oct 2026', openingBalance: 0, totalCharges: 76000, totalPayments: 36600, totalConcessions: 0, outstandingBalance: 39400, unallocatedCredit: 0, amountDueByDate: 76000, dueDate: '05 Oct 2026', status: 'Delivered' },
    { id: 'st-003', statementNo: 'ST-2026-0003', studentId: 'stu-003', studentName: 'Chloe Njeri', admissionNo: 'RA/2013/142', className: 'Form 2 — Tana', packageName: 'Boarding', academicYear: '2026', term: 'Term 3', issueDate: '05 Oct 2026', periodFrom: '01 Sep 2026', periodTo: '05 Oct 2026', openingBalance: 15000, totalCharges: 120000, totalPayments: 0, totalConcessions: 0, outstandingBalance: 135000, unallocatedCredit: 0, amountDueByDate: 135000, dueDate: '05 Oct 2026', status: 'Delivered' },
    { id: 'st-004', statementNo: 'ST-2026-0004', studentId: 'stu-004', studentName: 'Dylan Kamau', admissionNo: 'RA/2012/067', className: 'Form 4 — Athi', packageName: 'Day', academicYear: '2026', term: 'Term 3', issueDate: '05 Oct 2026', periodFrom: '01 Sep 2026', periodTo: '05 Oct 2026', openingBalance: 0, totalCharges: 81000, totalPayments: 81000, totalConcessions: 0, outstandingBalance: 0, unallocatedCredit: 0, amountDueByDate: 0, dueDate: '05 Oct 2026', status: 'Delivered' },
    { id: 'st-005', statementNo: 'ST-2026-0005', studentId: 'stu-005', studentName: 'Faith Achieng', admissionNo: 'RA/2014/091', className: 'Year 8 — Acacia', packageName: 'Day', academicYear: '2026', term: 'Term 3', issueDate: '05 Oct 2026', periodFrom: '01 Sep 2026', periodTo: '05 Oct 2026', openingBalance: 0, totalCharges: 76000, totalPayments: 80000, totalConcessions: 7600, outstandingBalance: 0, unallocatedCredit: 11600, amountDueByDate: 0, dueDate: '05 Oct 2026', status: 'Delivered' },
  ],
  creditNotes: [
    { id: 'cn-001', reference: 'CN-2026-001', studentId: 'stu-002', studentName: 'Brian Otieno', amount: 5000, reason: 'Duplicate activity charge correction', date: '12 Oct 2026', status: 'Approved', approvedBy: 'Miriam Njoroge', postedBy: 'Lydia Otieno' },
    { id: 'cn-002', reference: 'CN-2026-002', studentId: 'stu-003', studentName: 'Chloe Njeri', amount: 15000, reason: 'Opening balance appeal — partial waiver of Term 2 arrears', date: '14 Oct 2026', status: 'Pending', approvedBy: null, postedBy: null },
  ],
  parentAccounts: [
    {
      id: 'par-001',
      parentName: 'Wanjiku Kamau',
      email: 'wanjiku.kamau@email.com',
      phone: '+254 712 345 678',
      notificationPrefs: { email: true, sms: true, inApp: true },
      children: [
        { studentId: 'stu-001', studentName: 'Amani Wanjiku', admissionNo: 'RA/2015/034', className: 'Year 6 — Cedar', packageName: 'Boarding', profileImage: null, billed: 110000, paid: 110000, outstanding: 0, advanceCredit: 0, dueDate: '05 Oct 2026', lastPaymentDate: '03 Oct 2026', lastPaymentAmount: 110000, hasOverdue: false, term: 'Term 3', academicYear: '2026' },
      ],
    },
    {
      id: 'par-002',
      parentName: 'Otieno Sr',
      email: 'otieno.sr@email.com',
      phone: '+254 722 456 789',
      notificationPrefs: { email: true, sms: false, inApp: true },
      children: [
        { studentId: 'stu-002', studentName: 'Brian Otieno', admissionNo: 'RA/2014/088', className: 'Year 8 — Acacia', packageName: 'Day', profileImage: null, billed: 76000, paid: 36600, outstanding: 39400, advanceCredit: 0, dueDate: '05 Oct 2026', lastPaymentDate: '08 Oct 2026', lastPaymentAmount: 36600, hasOverdue: false, term: 'Term 3', academicYear: '2026' },
      ],
    },
    {
      id: 'par-003',
      parentName: 'Achieng Peter',
      email: 'achieng.peter@email.com',
      phone: '+254 733 567 890',
      notificationPrefs: { email: true, sms: true, inApp: true },
      children: [
        { studentId: 'stu-005', studentName: 'Faith Achieng', admissionNo: 'RA/2014/091', className: 'Year 8 — Acacia', packageName: 'Day', profileImage: null, billed: 76000, paid: 80000, outstanding: 0, advanceCredit: 11600, dueDate: '05 Oct 2026', lastPaymentDate: '10 Oct 2026', lastPaymentAmount: 80000, hasOverdue: false, term: 'Term 3', academicYear: '2026' },
        { studentId: 'stu-007', studentName: 'Eric Achieng', admissionNo: 'RA/2017/045', className: 'Year 4 — Jacaranda', packageName: 'Day', profileImage: null, billed: 62000, paid: 31000, outstanding: 31000, advanceCredit: 0, dueDate: '05 Oct 2026', lastPaymentDate: '28 Sep 2026', lastPaymentAmount: 31000, hasOverdue: false, term: 'Term 3', academicYear: '2026' },
      ],
    },
  ],
  feeQueries: [
    {
      id: 'fq-001', trackingNo: 'FQ-2026-0042', parentName: 'Otieno Sr', studentId: 'stu-002', studentName: 'Brian Otieno',
      category: 'Missing payment', description: 'I sent KES 21,000 via M-Pesa on 16 Oct but it does not appear on the statement.',
      transactionRef: 'QJK7OP2R1Y', submittedDate: '16 Oct 2026', status: 'Under review', assignedTo: 'Lydia Otieno',
      staffNotes: [{ date: '16 Oct 2026', note: 'Payment RC-2026-10145 found pending verification. Verifying with M-Pesa confirmation.' }],
      parentReplies: [],
    },
    {
      id: 'fq-002', trackingNo: 'FQ-2026-0041', parentName: 'Wanjiku Kamau', studentId: 'stu-001', studentName: 'Amani Wanjiku',
      category: 'Concession query', description: 'The scholarship shows as 25% but I thought it was 30%. Can you confirm the approved percentage?',
      transactionRef: 'DSC-2026-001', submittedDate: '10 Oct 2026', status: 'Resolved', assignedTo: 'Miriam Njoroge',
      staffNotes: [
        { date: '11 Oct 2026', note: 'Scholarship approved at 25% by principal on 28 Sep. Letter sent to parent.' },
        { date: '12 Oct 2026', note: 'Confirmed with parent. 25% is correct — KES 27,500.' },
      ],
      parentReplies: [{ date: '12 Oct 2026', message: 'Thank you for confirming. I understand it is 25%.' }],
    },
  ],
  paymentPlans: [
    {
      studentId: 'stu-003',
      instalments: [
        { label: 'Instalment 1 — 05 Oct', amount: 45000, dueDate: '05 Oct 2026', paidAmount: 0, status: 'Overdue' },
        { label: 'Instalment 2 — 05 Nov', amount: 45000, dueDate: '05 Nov 2026', paidAmount: 0, status: 'Upcoming' },
        { label: 'Instalment 3 — 05 Dec', amount: 45000, dueDate: '05 Dec 2026', paidAmount: 0, status: 'Upcoming' },
      ],
    },
    {
      studentId: 'stu-002',
      instalments: [
        { label: 'Instalment 1 — 05 Oct', amount: 38000, dueDate: '05 Oct 2026', paidAmount: 36600, status: 'Partially paid' },
        { label: 'Instalment 2 — 05 Nov', amount: 38000, dueDate: '05 Nov 2026', paidAmount: 0, status: 'Upcoming' },
      ],
    },
  ],
  parentNotifications: [
    { id: 'pn-001', parentName: 'Wanjiku Kamau', channel: 'Email', title: 'Fee statement issued', message: 'Statement ST-2026-0001 for Amani Wanjiku (Term 3, 2026) is now available.', date: '05 Oct 2026', deliveryStatus: 'Delivered', read: true },
    { id: 'pn-002', parentName: 'Wanjiku Kamau', channel: 'SMS', title: 'Payment verified', message: 'KES 110,000 verified and allocated for Amani Wanjiku.', date: '03 Oct 2026', deliveryStatus: 'Delivered', read: true },
    { id: 'pn-003', parentName: 'Otieno Sr', channel: 'In-app', title: 'Fee statement issued', message: 'Statement ST-2026-0002 for Brian Otieno (Term 3, 2026) is now available.', date: '05 Oct 2026', deliveryStatus: 'Delivered', read: false },
    { id: 'pn-004', parentName: 'Otieno Sr', channel: 'In-app', title: 'Payment pending verification', message: 'KES 21,000 received via M-Pesa — awaiting bursar verification.', date: '16 Oct 2026', deliveryStatus: 'Sent', read: false },
    { id: 'pn-005', parentName: 'Otieno Sr', channel: 'Email', title: 'Due date approaching', message: 'Brian Otieno has KES 39,400 outstanding. Due date: 05 Oct 2026.', date: '02 Oct 2026', deliveryStatus: 'Delivered', read: true },
    { id: 'pn-006', parentName: 'Achieng Peter', channel: 'In-app', title: 'Fee statement issued', message: 'Statement ST-2026-0005 for Faith Achieng (Term 3, 2026) is now available.', date: '05 Oct 2026', deliveryStatus: 'Delivered', read: false },
    { id: 'pn-007', parentName: 'Achieng Peter', channel: 'SMS', title: 'Payment verified', message: 'KES 80,000 verified for Faith Achieng. Advance credit: KES 11,600.', date: '10 Oct 2026', deliveryStatus: 'Delivered', read: true },
    { id: 'pn-008', parentName: 'Wanjiku Kamau', channel: 'In-app', title: 'Query resolved', message: 'Your scholarship query FQ-2026-0041 has been resolved. See details in the Support Centre.', date: '12 Oct 2026', deliveryStatus: 'Delivered', read: true },
  ],
  studentBalances: [
    { studentId: 'stu-001', studentName: 'Amani Wanjiku', admissionNo: 'RA/2015/034', className: 'Year 6 — Cedar', packageName: 'Boarding', openingArrears: 0, currentTermCharges: 110000, approvedConcessions: 27500, verifiedPayments: 110000, outstanding: 0, advanceCredit: 0, dueDate: '05 Oct 2026', balanceStatus: 'Paid in full', ageingBucket: 'Current', assignedStaff: null, followUpNotes: [] },
    { studentId: 'stu-002', studentName: 'Brian Otieno', admissionNo: 'RA/2014/088', className: 'Year 8 — Acacia', packageName: 'Day', openingArrears: 0, currentTermCharges: 76000, approvedConcessions: 0, verifiedPayments: 36600, outstanding: 39400, advanceCredit: 0, dueDate: '05 Oct 2026', balanceStatus: 'Part-paid', ageingBucket: '1-30 days', assignedStaff: 'Lydia Otieno', followUpNotes: [{ date: '10 Oct 2026', note: 'Parent confirmed payment plan. Second instalment due 05 Nov.', staff: 'Lydia Otieno' }] },
    { studentId: 'stu-003', studentName: 'Chloe Njeri', admissionNo: 'RA/2013/142', className: 'Form 2 — Tana', packageName: 'Boarding', openingArrears: 15000, currentTermCharges: 120000, approvedConcessions: 0, verifiedPayments: 0, outstanding: 135000, advanceCredit: 0, dueDate: '05 Oct 2026', balanceStatus: 'Overdue', ageingBucket: '1-30 days', assignedStaff: 'Esther Njoroge', followUpNotes: [{ date: '06 Oct 2026', note: 'SMS reminder sent to parent.', staff: 'Esther Njoroge' }, { date: '10 Oct 2026', note: 'Parent called — cheque payment submitted, pending verification.', staff: 'Esther Njoroge' }] },
    { studentId: 'stu-004', studentName: 'Dylan Kamau', admissionNo: 'RA/2012/067', className: 'Form 4 — Athi', packageName: 'Day', openingArrears: 0, currentTermCharges: 81000, approvedConcessions: 0, verifiedPayments: 81000, outstanding: 0, advanceCredit: 0, dueDate: '05 Oct 2026', balanceStatus: 'Paid in full', ageingBucket: 'Current', assignedStaff: null, followUpNotes: [] },
    { studentId: 'stu-005', studentName: 'Faith Achieng', admissionNo: 'RA/2014/091', className: 'Year 8 — Acacia', packageName: 'Day', openingArrears: 0, currentTermCharges: 76000, approvedConcessions: 7600, verifiedPayments: 80000, outstanding: 0, advanceCredit: 11600, dueDate: '05 Oct 2026', balanceStatus: 'Credit balance', ageingBucket: 'Current', assignedStaff: null, followUpNotes: [] },
    { studentId: 'stu-006', studentName: 'Gloria Wairimu', admissionNo: 'RA/2015/072', className: 'Year 5 — Baobab', packageName: 'Day', openingArrears: 0, currentTermCharges: 76000, approvedConcessions: 0, verifiedPayments: 38000, outstanding: 38000, advanceCredit: 0, dueDate: '05 Oct 2026', balanceStatus: 'Pending reconciliation', ageingBucket: '1-30 days', assignedStaff: 'Lydia Otieno', followUpNotes: [{ date: '14 Oct 2026', note: 'Payment verified but not yet allocated. Staff discount pending approval.', staff: 'Lydia Otieno' }] },
    { studentId: 'stu-007', studentName: 'Eric Achieng', admissionNo: 'RA/2017/045', className: 'Year 4 — Jacaranda', packageName: 'Day', openingArrears: 0, currentTermCharges: 62000, approvedConcessions: 0, verifiedPayments: 31000, outstanding: 31000, advanceCredit: 0, dueDate: '05 Oct 2026', balanceStatus: 'Part-paid', ageingBucket: '1-30 days', assignedStaff: null, followUpNotes: [] },
  ],
};

let state: FeesDemoState = structuredClone(seed);
const listeners = new Set<() => void>();
function notify(): void { listeners.forEach((l) => l()); }

export function useFeesDemo(): FeesDemoState {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => state, () => state);
}

export const feesDemo = {
  reissueStatement(statementId: string): { ok: boolean; error?: string } {
    const stmt = state.statements.find((s) => s.id === statementId);
    if (!stmt) return { ok: false, error: 'Statement not found.' };
    state = { ...state, statements: state.statements.map((s) => s.id === statementId ? { ...s, status: 'Reissued', issueDate: '16 Oct 2026' } : s) };
    notify();
    return { ok: true };
  },

  approveCreditNote(cnId: string): { ok: boolean; error?: string } {
    const cn = state.creditNotes.find((c) => c.id === cnId);
    if (!cn) return { ok: false, error: 'Credit note not found.' };
    if (cn.status !== 'Pending') return { ok: false, error: 'Credit note is not pending.' };
    state = { ...state, creditNotes: state.creditNotes.map((c) => c.id === cnId ? { ...c, status: 'Approved', approvedBy: 'Miriam Njoroge' } : c) };
    notify();
    return { ok: true };
  },

  postCreditNote(cnId: string): { ok: boolean; error?: string } {
    const cn = state.creditNotes.find((c) => c.id === cnId);
    if (!cn) return { ok: false, error: 'Credit note not found.' };
    if (cn.status !== 'Approved') return { ok: false, error: 'Credit note must be approved before posting.' };
    state = { ...state, creditNotes: state.creditNotes.map((c) => c.id === cnId ? { ...c, status: 'Posted', postedBy: 'Lydia Otieno' } : c) };
    notify();
    return { ok: true };
  },

  submitFeeQuery(parentName: string, studentId: string, studentName: string, category: FeeQueryCategory, description: string, transactionRef: string | null): { ok: boolean; error?: string } {
    if (!description.trim()) return { ok: false, error: 'Description is required.' };
    const trackingNo = `FQ-2026-${43 + state.feeQueries.length}`;
    const query: FeeQuery = {
      id: `fq-${Date.now()}`, trackingNo, parentName, studentId, studentName, category, description: description.trim(),
      transactionRef: transactionRef || null, submittedDate: '16 Oct 2026', status: 'Submitted', assignedTo: null,
      staffNotes: [], parentReplies: [],
    };
    state = { ...state, feeQueries: [query, ...state.feeQueries] };
    notify();
    return { ok: true };
  },

  assignQuery(queryId: string, staff: string): { ok: boolean; error?: string } {
    state = { ...state, feeQueries: state.feeQueries.map((q) => q.id === queryId ? { ...q, assignedTo: staff, status: 'Under review' } : q) };
    notify();
    return { ok: true };
  },

  resolveQuery(queryId: string): { ok: boolean; error?: string } {
    state = { ...state, feeQueries: state.feeQueries.map((q) => q.id === queryId ? { ...q, status: 'Resolved' } : q) };
    notify();
    return { ok: true };
  },

  rejectQuery(queryId: string): { ok: boolean; error?: string } {
    state = { ...state, feeQueries: state.feeQueries.map((q) => q.id === queryId ? { ...q, status: 'Rejected' } : q) };
    notify();
    return { ok: true };
  },

  addStaffNote(queryId: string, note: string): { ok: boolean; error?: string } {
    if (!note.trim()) return { ok: false, error: 'Note cannot be empty.' };
    state = { ...state, feeQueries: state.feeQueries.map((q) => q.id === queryId ? { ...q, staffNotes: [...q.staffNotes, { date: '16 Oct 2026', note: note.trim() }] } : q) };
    notify();
    return { ok: true };
  },

  addParentReply(queryId: string, message: string): { ok: boolean; error?: string } {
    if (!message.trim()) return { ok: false, error: 'Reply cannot be empty.' };
    state = { ...state, feeQueries: state.feeQueries.map((q) => q.id === queryId ? { ...q, parentReplies: [...q.parentReplies, { date: '16 Oct 2026', message: message.trim() }] } : q) };
    notify();
    return { ok: true };
  },

  updateNotificationPrefs(parentId: string, prefs: { email: boolean; sms: boolean; inApp: boolean }): void {
    state = { ...state, parentAccounts: state.parentAccounts.map((p) => p.id === parentId ? { ...p, notificationPrefs: prefs } : p) };
    notify();
  },

  markParentNotificationRead(id: string): void {
    state = { ...state, parentNotifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n) } as FeesDemoState;
    notify();
  },

  addFollowUpNote(studentId: string, note: string, staff: string): { ok: boolean; error?: string } {
    if (!note.trim()) return { ok: false, error: 'Note cannot be empty.' };
    state = { ...state, studentBalances: state.studentBalances.map((s) => s.studentId === studentId ? { ...s, followUpNotes: [...s.followUpNotes, { date: '16 Oct 2026', note: note.trim(), staff }] } : s) };
    notify();
    return { ok: true };
  },

  assignStaff(studentId: string, staff: string): void {
    state = { ...state, studentBalances: state.studentBalances.map((s) => s.studentId === studentId ? { ...s, assignedStaff: staff } : s) };
    notify();
  },

  reset(): void { state = structuredClone(seed); notify(); },
};

export const FEES_POLICIES = {
  CURRENCY: 'KES',
  ALLOCATION_OLDEST_DUE_FIRST: true,
  PAYMENT_VERIFICATION_REQUIRED: true,
  CREDIT_NOTE_APPROVAL_REQUIRED: true,
  DUE_DATE: '05 Oct 2026',
  SCHOOL_NAME: 'Riverside Academy',
  SCHOOL_CONTACT: 'info@riversideacademy.ac.ke · +254 700 123 456',
  PAYMENT_INSTRUCTIONS: 'Pay via M-Pesa Paybill 522522, Account: RA/Student Admission No. Bank: Equity Bank, Account 0110123456789. Cash payments accepted at the bursar\'s office.',
};
