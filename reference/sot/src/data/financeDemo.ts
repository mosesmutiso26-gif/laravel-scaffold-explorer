import { useSyncExternalStore } from 'react';

export type FeePackage = 'Day' | 'Boarding';
export type ChargeStatus = 'Billed' | 'Partially paid' | 'Paid' | 'Waived' | 'Overdue';
export type PaymentStatus = 'Pending verification' | 'Verified' | 'Allocated' | 'Rejected' | 'Reversed';
export type PaymentMethod = 'Cash' | 'Bank transfer' | 'M-Pesa' | 'Cheque';
export type ExpenseStatus = 'Draft' | 'Submitted' | 'Under review' | 'Approved' | 'Rejected' | 'Paid';
export type BudgetStatus = 'Active' | 'Revised' | 'Closed';
export type DiscountType = 'Scholarship' | 'Bursary' | 'Sibling discount' | 'Staff discount' | 'Early payment';
export type DiscountStatus = 'Pending' | 'Approved' | 'Rejected';
export type ArrearsBucket = 'Current' | '1-30 days' | '31-60 days' | '61-90 days' | 'Over 90 days';
export type JournalStatus = 'Draft' | 'Pending approval' | 'Posted' | 'Reversed';

export type FeeStructure = {
  id: string;
  academicYear: string;
  term: string;
  packageName: FeePackage;
  className: string;
  items: { name: string; amount: number; dueDate: string }[];
  total: number;
  status: 'Active' | 'Archived';
};

export type StudentCharge = {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  package: FeePackage;
  term: string;
  description: string;
  amount: number;
  dueDate: string;
  status: ChargeStatus;
  paidAmount: number;
  dateBilled: string;
};

export type Payment = {
  id: string;
  receiptNo: string;
  studentId: string;
  studentName: string;
  payerName: string;
  amount: number;
  method: PaymentMethod;
  reference: string;
  date: string;
  status: PaymentStatus;
  allocatedTo: string | null;
  allocatedAmount: number;
  verifiedBy: string | null;
  recordedBy: string;
};

export type Expense = {
  id: string;
  reference: string;
  payee: string;
  category: string;
  department: string;
  description: string;
  amount: number;
  date: string;
  status: ExpenseStatus;
  requestedBy: string;
  approvedBy: string | null;
  paymentRef: string | null;
};

export type Budget = {
  id: string;
  fiscalYear: string;
  category: string;
  department: string;
  budgeted: number;
  actual: number;
  status: BudgetStatus;
};

export type Discount = {
  id: string;
  studentId: string;
  studentName: string;
  type: DiscountType;
  percentage: number;
  amount: number;
  term: string;
  status: DiscountStatus;
  approvedBy: string | null;
  date: string;
  reason: string;
};

export type JournalEntry = {
  id: string;
  reference: string;
  date: string;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  status: JournalStatus;
  postedBy: string | null;
};

export type BankStatementLine = {
  id: string;
  date: string;
  reference: string;
  description: string;
  amount: number;
  type: 'Credit' | 'Debit';
  matchedPaymentId: string | null;
  status: 'Matched' | 'Unmatched' | 'Ignored';
};

export type FinanceNotification = {
  id: string;
  recipient: string;
  title: string;
  detail: string;
  unread: boolean;
  createdDate: string;
};

export type FinanceAuditEntry = {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
};

export type FinanceDemoState = {
  feeStructures: FeeStructure[];
  charges: StudentCharge[];
  payments: Payment[];
  expenses: Expense[];
  budgets: Budget[];
  discounts: Discount[];
  journalEntries: JournalEntry[];
  bankLines: BankStatementLine[];
  notifications: FinanceNotification[];
  audit: FinanceAuditEntry[];
};

const seed: FinanceDemoState = {
  feeStructures: [
    { id: 'fs-001', academicYear: '2026', term: 'Term 1', packageName: 'Day', className: 'Year 6', items: [{ name: 'Tuition', amount: 45000, dueDate: '10 Jan 2026' }, { name: 'Meals', amount: 12000, dueDate: '10 Jan 2026' }, { name: 'Activity fee', amount: 5000, dueDate: '10 Jan 2026' }], total: 62000, status: 'Archived' },
    { id: 'fs-002', academicYear: '2026', term: 'Term 1', packageName: 'Boarding', className: 'Year 6', items: [{ name: 'Tuition', amount: 45000, dueDate: '10 Jan 2026' }, { name: 'Boarding', amount: 35000, dueDate: '10 Jan 2026' }, { name: 'Meals', amount: 18000, dueDate: '10 Jan 2026' }, { name: 'Activity fee', amount: 5000, dueDate: '10 Jan 2026' }], total: 103000, status: 'Archived' },
    { id: 'fs-003', academicYear: '2026', term: 'Term 3', packageName: 'Day', className: 'Year 6', items: [{ name: 'Tuition', amount: 48000, dueDate: '05 Oct 2026' }, { name: 'Meals', amount: 13000, dueDate: '05 Oct 2026' }, { name: 'Activity fee', amount: 5000, dueDate: '05 Oct 2026' }], total: 66000, status: 'Active' },
    { id: 'fs-004', academicYear: '2026', term: 'Term 3', packageName: 'Boarding', className: 'Year 6', items: [{ name: 'Tuition', amount: 48000, dueDate: '05 Oct 2026' }, { name: 'Boarding', amount: 38000, dueDate: '05 Oct 2026' }, { name: 'Meals', amount: 19000, dueDate: '05 Oct 2026' }, { name: 'Activity fee', amount: 5000, dueDate: '05 Oct 2026' }], total: 110000, status: 'Active' },
    { id: 'fs-005', academicYear: '2026', term: 'Term 3', packageName: 'Day', className: 'Form 2', items: [{ name: 'Tuition', amount: 55000, dueDate: '05 Oct 2026' }, { name: 'Meals', amount: 13000, dueDate: '05 Oct 2026' }, { name: 'Lab fee', amount: 8000, dueDate: '05 Oct 2026' }], total: 76000, status: 'Active' },
    { id: 'fs-006', academicYear: '2026', term: 'Term 3', packageName: 'Boarding', className: 'Form 2', items: [{ name: 'Tuition', amount: 55000, dueDate: '05 Oct 2026' }, { name: 'Boarding', amount: 38000, dueDate: '05 Oct 2026' }, { name: 'Meals', amount: 19000, dueDate: '05 Oct 2026' }, { name: 'Lab fee', amount: 8000, dueDate: '05 Oct 2026' }], total: 120000, status: 'Active' },
  ],
  charges: [
    { id: 'ch-001', studentId: 'stu-001', studentName: 'Amani Wanjiku', className: 'Year 6 — Cedar', package: 'Boarding', term: 'Term 3', description: 'Tuition', amount: 48000, dueDate: '05 Oct 2026', status: 'Paid', paidAmount: 48000, dateBilled: '01 Oct 2026' },
    { id: 'ch-002', studentId: 'stu-001', studentName: 'Amani Wanjiku', className: 'Year 6 — Cedar', package: 'Boarding', term: 'Term 3', description: 'Boarding', amount: 38000, dueDate: '05 Oct 2026', status: 'Paid', paidAmount: 38000, dateBilled: '01 Oct 2026' },
    { id: 'ch-003', studentId: 'stu-001', studentName: 'Amani Wanjiku', className: 'Year 6 — Cedar', package: 'Boarding', term: 'Term 3', description: 'Meals', amount: 19000, dueDate: '05 Oct 2026', status: 'Paid', paidAmount: 19000, dateBilled: '01 Oct 2026' },
    { id: 'ch-004', studentId: 'stu-001', studentName: 'Amani Wanjiku', className: 'Year 6 — Cedar', package: 'Boarding', term: 'Term 3', description: 'Activity fee', amount: 5000, dueDate: '05 Oct 2026', status: 'Paid', paidAmount: 5000, dateBilled: '01 Oct 2026' },
    { id: 'ch-005', studentId: 'stu-002', studentName: 'Brian Otieno', className: 'Year 8 — Acacia', package: 'Day', term: 'Term 3', description: 'Tuition', amount: 55000, dueDate: '05 Oct 2026', status: 'Partially paid', paidAmount: 36600, dateBilled: '01 Oct 2026' },
    { id: 'ch-006', studentId: 'stu-002', studentName: 'Brian Otieno', className: 'Year 8 — Acacia', package: 'Day', term: 'Term 3', description: 'Meals', amount: 13000, dueDate: '05 Oct 2026', status: 'Partially paid', paidAmount: 0, dateBilled: '01 Oct 2026' },
    { id: 'ch-007', studentId: 'stu-002', studentName: 'Brian Otieno', className: 'Year 8 — Acacia', package: 'Day', term: 'Term 3', description: 'Lab fee', amount: 8000, dueDate: '05 Oct 2026', status: 'Partially paid', paidAmount: 0, dateBilled: '01 Oct 2026' },
    { id: 'ch-008', studentId: 'stu-003', studentName: 'Chloe Njeri', className: 'Form 2 — Tana', package: 'Boarding', term: 'Term 3', description: 'Tuition', amount: 55000, dueDate: '05 Oct 2026', status: 'Overdue', paidAmount: 0, dateBilled: '01 Oct 2026' },
    { id: 'ch-009', studentId: 'stu-003', studentName: 'Chloe Njeri', className: 'Form 2 — Tana', package: 'Boarding', term: 'Term 3', description: 'Boarding', amount: 38000, dueDate: '05 Oct 2026', status: 'Overdue', paidAmount: 0, dateBilled: '01 Oct 2026' },
    { id: 'ch-010', studentId: 'stu-003', studentName: 'Chloe Njeri', className: 'Form 2 — Tana', package: 'Boarding', term: 'Term 3', description: 'Meals', amount: 19000, dueDate: '05 Oct 2026', status: 'Overdue', paidAmount: 0, dateBilled: '01 Oct 2026' },
    { id: 'ch-011', studentId: 'stu-003', studentName: 'Chloe Njeri', className: 'Form 2 — Tana', package: 'Boarding', term: 'Term 3', description: 'Lab fee', amount: 8000, dueDate: '05 Oct 2026', status: 'Overdue', paidAmount: 0, dateBilled: '01 Oct 2026' },
    { id: 'ch-012', studentId: 'stu-004', studentName: 'Dylan Kamau', className: 'Form 4 — Athi', package: 'Day', term: 'Term 3', description: 'Tuition', amount: 60000, dueDate: '05 Oct 2026', status: 'Paid', paidAmount: 60000, dateBilled: '01 Oct 2026' },
    { id: 'ch-013', studentId: 'stu-004', studentName: 'Dylan Kamau', className: 'Form 4 — Athi', package: 'Day', term: 'Term 3', description: 'Meals', amount: 13000, dueDate: '05 Oct 2026', status: 'Paid', paidAmount: 13000, dateBilled: '01 Oct 2026' },
    { id: 'ch-014', studentId: 'stu-004', studentName: 'Dylan Kamau', className: 'Form 4 — Athi', package: 'Day', term: 'Term 3', description: 'Lab fee', amount: 8000, dueDate: '05 Oct 2026', status: 'Paid', paidAmount: 8000, dateBilled: '01 Oct 2026' },
  ],
  payments: [
    { id: 'pay-001', receiptNo: 'RC-2026-10142', studentId: 'stu-001', studentName: 'Amani Wanjiku', payerName: 'Wanjiku Kamau', amount: 110000, method: 'M-Pesa', reference: 'QJK3LM4P9X', date: '03 Oct 2026', status: 'Allocated', allocatedTo: 'ch-001, ch-002, ch-003, ch-004', allocatedAmount: 110000, verifiedBy: 'Lydia Otieno', recordedBy: 'System' },
    { id: 'pay-002', receiptNo: 'RC-2026-10143', studentId: 'stu-002', studentName: 'Brian Otieno', payerName: 'Otieno Sr', amount: 36600, method: 'Bank transfer', reference: 'BT-90421', date: '08 Oct 2026', status: 'Allocated', allocatedTo: 'ch-005', allocatedAmount: 36600, verifiedBy: 'Lydia Otieno', recordedBy: 'Lydia Otieno' },
    { id: 'pay-003', receiptNo: 'RC-2026-10144', studentId: 'stu-004', studentName: 'Dylan Kamau', payerName: 'Kamau Peter', amount: 81000, method: 'Cash', reference: 'CASH-1042', date: '04 Oct 2026', status: 'Allocated', allocatedTo: 'ch-012, ch-013, ch-014', allocatedAmount: 81000, verifiedBy: 'Lydia Otieno', recordedBy: 'Lydia Otieno' },
    { id: 'pay-004', receiptNo: 'RC-2026-10145', studentId: 'stu-002', studentName: 'Brian Otieno', payerName: 'Otieno Sr', amount: 21000, method: 'M-Pesa', reference: 'QJK7OP2R1Y', date: '16 Oct 2026', status: 'Pending verification', allocatedTo: null, allocatedAmount: 0, verifiedBy: null, recordedBy: 'System' },
    { id: 'pay-005', receiptNo: 'RC-2026-10146', studentId: 'stu-003', studentName: 'Chloe Njeri', payerName: 'Njeri Grace', amount: 60000, method: 'Cheque', reference: 'CHQ-00451', date: '15 Oct 2026', status: 'Pending verification', allocatedTo: null, allocatedAmount: 0, verifiedBy: null, recordedBy: 'Esther Njoroge' },
  ],
  expenses: [
    { id: 'exp-001', reference: 'EXP-2026-031', payee: 'Bata Kenya', category: 'Uniforms', department: 'Administration', description: 'PE kits for 60 students', amount: 84000, date: '12 Oct 2026', status: 'Approved', requestedBy: 'Esther Njoroge', approvedBy: 'Miriam Njoroge', paymentRef: null },
    { id: 'exp-002', reference: 'EXP-2026-032', payee: 'Textbook Centre', category: 'Learning materials', department: 'Academic', description: 'Form 2 textbooks — 42 copies', amount: 126000, date: '14 Oct 2026', status: 'Under review', requestedBy: 'Grace Wanjiru', approvedBy: null, paymentRef: null },
    { id: 'exp-003', reference: 'EXP-2026-033', payee: 'Davis & Shirtliff', category: 'Maintenance', department: 'Facilities', description: 'Water pump repair and servicing', amount: 45000, date: '15 Oct 2026', status: 'Submitted', requestedBy: 'Joseph Otieno', approvedBy: null, paymentRef: null },
    { id: 'exp-004', reference: 'EXP-2026-028', payee: 'KPLC', category: 'Utilities', department: 'Facilities', description: 'Electricity bill — September 2026', amount: 92000, date: '01 Oct 2026', status: 'Paid', requestedBy: 'Joseph Otieno', approvedBy: 'Miriam Njoroge', paymentRef: 'BANK-TRF-7712' },
    { id: 'exp-005', reference: 'EXP-2026-029', payee: 'Supaloaf Bakery', category: 'Kitchen', department: 'Boarding', description: 'Bread supply — October week 2', amount: 28000, date: '08 Oct 2026', status: 'Paid', requestedBy: 'Kitchen Supervisor', approvedBy: 'Miriam Njoroge', paymentRef: 'MPESA-TRF-3340' },
  ],
  budgets: [
    { id: 'bud-001', fiscalYear: '2026', category: 'Tuition income', department: 'Finance', budgeted: 18400000, actual: 16800000, status: 'Active' },
    { id: 'bud-002', fiscalYear: '2026', category: 'Boarding income', department: 'Finance', budgeted: 6200000, actual: 5400000, status: 'Active' },
    { id: 'bud-003', fiscalYear: '2026', category: 'Salaries', department: 'HR', budgeted: 65000000, actual: 54200000, status: 'Active' },
    { id: 'bud-004', fiscalYear: '2026', category: 'Utilities', department: 'Facilities', budgeted: 1100000, actual: 920000, status: 'Active' },
    { id: 'bud-005', fiscalYear: '2026', category: 'Kitchen', department: 'Boarding', budgeted: 3200000, actual: 2980000, status: 'Active' },
    { id: 'bud-006', fiscalYear: '2026', category: 'Maintenance', department: 'Facilities', budgeted: 1800000, actual: 1640000, status: 'Active' },
    { id: 'bud-007', fiscalYear: '2026', category: 'Learning materials', department: 'Academic', budgeted: 2400000, actual: 1260000, status: 'Active' },
  ],
  discounts: [
    { id: 'dsc-001', studentId: 'stu-001', studentName: 'Amani Wanjiku', type: 'Scholarship', percentage: 25, amount: 27500, term: 'Term 3', status: 'Approved', approvedBy: 'Miriam Njoroge', date: '28 Sep 2026', reason: 'Academic excellence scholarship — top 3 in year group' },
    { id: 'dsc-002', studentId: 'stu-003', studentName: 'Chloe Njeri', type: 'Bursary', percentage: 40, amount: 48000, term: 'Term 3', status: 'Pending', approvedBy: null, date: '10 Oct 2026', reason: 'Financial need bursary — single parent household' },
    { id: 'dsc-003', studentId: 'stu-005', studentName: 'Faith Achieng', type: 'Sibling discount', percentage: 10, amount: 7600, term: 'Term 3', status: 'Approved', approvedBy: 'Miriam Njoroge', date: '20 Sep 2026', reason: 'Third sibling enrolled at Riverside Academy' },
    { id: 'dsc-004', studentId: 'stu-006', studentName: 'Gloria Wairimu', type: 'Staff discount', percentage: 50, amount: 33000, term: 'Term 3', status: 'Pending', approvedBy: null, date: '11 Oct 2026', reason: 'Child of teaching staff member' },
  ],
  journalEntries: [
    { id: 'je-001', reference: 'JE-2026-0142', date: '03 Oct 2026', description: 'Fee payment — Amani Wanjiku (M-Pesa)', debitAccount: 'Cash — M-Pesa', creditAccount: 'Tuition Income', amount: 110000, status: 'Posted', postedBy: 'System' },
    { id: 'je-002', reference: 'JE-2026-0143', date: '08 Oct 2026', description: 'Fee payment — Brian Otieno (Bank)', debitAccount: 'Cash — Bank', creditAccount: 'Tuition Income', amount: 36600, status: 'Posted', postedBy: 'Lydia Otieno' },
    { id: 'je-003', reference: 'JE-2026-0144', date: '04 Oct 2026', description: 'Fee payment — Dylan Kamau (Cash)', debitAccount: 'Cash — Office', creditAccount: 'Tuition Income', amount: 81000, status: 'Posted', postedBy: 'Lydia Otieno' },
    { id: 'je-004', reference: 'JE-2026-0145', date: '01 Oct 2026', description: 'KPLC electricity bill payment', debitAccount: 'Utilities Expense', creditAccount: 'Cash — Bank', amount: 92000, status: 'Posted', postedBy: 'Joseph Otieno' },
    { id: 'je-005', reference: 'JE-2026-0146', date: '16 Oct 2026', description: 'Adjustment — bread supply week 2', debitAccount: 'Kitchen Expense', creditAccount: 'Cash — M-Pesa', amount: 28000, status: 'Pending approval', postedBy: null },
    { id: 'je-006', reference: 'JE-2026-0147', date: '28 Sep 2026', description: 'Scholarship waiver — Amani Wanjiku', debitAccount: 'Scholarship Expense', creditAccount: 'Tuition Income', amount: 27500, status: 'Posted', postedBy: 'Miriam Njoroge' },
  ],
  bankLines: [
    { id: 'bl-001', date: '03 Oct 2026', reference: 'QJK3LM4P9X', description: 'MPESA EXPRESS — Wanjiku Kamau', amount: 110000, type: 'Credit', matchedPaymentId: 'pay-001', status: 'Matched' },
    { id: 'bl-002', date: '08 Oct 2026', reference: 'BT-90421', description: 'EQUITY BANK TRF — Otieno Sr', amount: 36600, type: 'Credit', matchedPaymentId: 'pay-002', status: 'Matched' },
    { id: 'bl-003', date: '04 Oct 2026', reference: 'CASH-1042', description: 'Cash deposit — Dylan Kamau', amount: 81000, type: 'Credit', matchedPaymentId: 'pay-003', status: 'Matched' },
    { id: 'bl-004', date: '01 Oct 2026', reference: 'BANK-TRF-7712', description: 'KPLC autopay — electricity', amount: 92000, type: 'Debit', matchedPaymentId: null, status: 'Unmatched' },
    { id: 'bl-005', date: '16 Oct 2026', reference: 'QJK7OP2R1Y', description: 'MPESA EXPRESS — Otieno Sr', amount: 21000, type: 'Credit', matchedPaymentId: null, status: 'Unmatched' },
    { id: 'bl-006', date: '15 Oct 2026', reference: 'INT-2026-Q3', description: 'Bank interest — Q3 2026', amount: 4200, type: 'Credit', matchedPaymentId: null, status: 'Unmatched' },
  ],
  notifications: [
    { id: 'fn-001', recipient: 'Wanjiku Kamau', title: 'Payment verified', detail: 'KES 110,000 verified and allocated for Amani Wanjiku — Term 3', unread: true, createdDate: '03 Oct 2026' },
    { id: 'fn-002', recipient: 'Otieno Sr', title: 'Payment pending verification', detail: 'KES 21,000 received via M-Pesa — awaiting bursar verification', unread: true, createdDate: '16 Oct 2026' },
    { id: 'fn-003', recipient: 'Lydia Otieno', title: 'Payments awaiting verification', detail: '2 payments pending verification (KES 81,000 total)', unread: true, createdDate: '16 Oct 2026' },
    { id: 'fn-004', recipient: 'Miriam Njoroge', title: 'Expense approval requested', detail: 'EXP-2026-032 Textbook Centre KES 126,000 awaiting review', unread: true, createdDate: '14 Oct 2026' },
    { id: 'fn-005', recipient: 'Njeri Grace', title: 'Overdue fees notice', detail: 'Chloe Njeri — KES 120,000 overdue since 05 Oct 2026', unread: false, createdDate: '06 Oct 2026' },
  ],
  audit: [
    { id: 'fa-001', actor: 'Lydia Otieno', action: 'Verified payment', target: 'RC-2026-10142 · KES 110,000 · Amani Wanjiku', timestamp: '03 Oct 2026, 14:22' },
    { id: 'fa-002', actor: 'Lydia Otieno', action: 'Allocated payment', target: 'RC-2026-10143 · KES 36,600 → Brian Otieno tuition', timestamp: '08 Oct 2026, 09:15' },
    { id: 'fa-003', actor: 'Miriam Njoroge', action: 'Approved scholarship', target: 'Amani Wanjiku · 25% · KES 27,500', timestamp: '28 Sep 2026, 11:30' },
    { id: 'fa-004', actor: 'Miriam Njoroge', action: 'Approved expense', target: 'EXP-2026-031 · Bata Kenya · KES 84,000', timestamp: '12 Oct 2026, 15:45' },
    { id: 'fa-005', actor: 'Esther Njoroge', action: 'Recorded payment', target: 'RC-2026-10146 · KES 60,000 · Chloe Njeri', timestamp: '15 Oct 2026, 10:20' },
  ],
};

let state: FinanceDemoState = structuredClone(seed);
const listeners = new Set<() => void>();
function notify(): void { listeners.forEach((l) => l()); }

export function useFinanceDemo(): FinanceDemoState {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => state, () => state);
}

function logAudit(actor: string, action: string, target: string): void {
  state = { ...state, audit: [{ id: `fa-${Date.now()}`, actor, action, target, timestamp: '16 Oct 2026, now' }, ...state.audit] };
}

const APPROVAL_THRESHOLD = 100000;

export const financeDemo = {
  recordPayment(studentId: string, payerName: string, amount: number, method: PaymentMethod, reference: string): { ok: boolean; error?: string } {
    if (amount <= 0) return { ok: false, error: 'Amount must be greater than zero.' };
    if (!payerName.trim()) return { ok: false, error: 'Payer name is required.' };
    const student = state.charges.find((c) => c.studentId === studentId);
    if (!student) return { ok: false, error: 'Student not found in billing records.' };
    const receiptNo = `RC-2026-${10147 + state.payments.length}`;
    const payment: Payment = { id: `pay-${Date.now()}`, receiptNo, studentId, studentName: student.studentName, payerName: payerName.trim(), amount, method, reference: reference.trim() || '—', date: '16 Oct 2026', status: 'Pending verification', allocatedTo: null, allocatedAmount: 0, verifiedBy: null, recordedBy: 'Finance Officer' };
    state = { ...state, payments: [payment, ...state.payments] };
    logAudit('Finance Officer', 'Recorded payment', `${receiptNo} · KES ${amount.toLocaleString()} · ${student.studentName}`);
    notify();
    return { ok: true };
  },

  verifyPayment(paymentId: string): { ok: boolean; error?: string } {
    const payment = state.payments.find((p) => p.id === paymentId);
    if (!payment) return { ok: false, error: 'Payment not found.' };
    if (payment.status !== 'Pending verification') return { ok: false, error: `Payment is ${payment.status.toLowerCase()}, cannot verify.` };
    state = { ...state, payments: state.payments.map((p) => p.id === paymentId ? { ...p, status: 'Verified', verifiedBy: 'Lydia Otieno' } : p) };
    logAudit('Lydia Otieno', 'Verified payment', `${payment.receiptNo} · KES ${payment.amount.toLocaleString()}`);
    notify();
    return { ok: true };
  },

  allocatePayment(paymentId: string): { ok: boolean; error?: string } {
    const payment = state.payments.find((p) => p.id === paymentId);
    if (!payment) return { ok: false, error: 'Payment not found.' };
    if (payment.status !== 'Verified') return { ok: false, error: 'Payment must be verified before allocation.' };
    const studentCharges = state.charges.filter((c) => c.studentId === payment.studentId && (c.status === 'Billed' || c.status === 'Partially paid' || c.status === 'Overdue'));
    if (studentCharges.length === 0) return { ok: false, error: 'No outstanding charges found for this student.' };
    let remaining = payment.amount;
    const allocatedIds: string[] = [];
    for (const charge of studentCharges.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())) {
      if (remaining <= 0) break;
      const outstanding = charge.amount - charge.paidAmount;
      const allocation = Math.min(remaining, outstanding);
      remaining -= allocation;
      allocatedIds.push(charge.id);
      state = { ...state, charges: state.charges.map((c) => c.id === charge.id ? { ...c, paidAmount: c.paidAmount + allocation, status: c.paidAmount + allocation >= c.amount ? 'Paid' : 'Partially paid' } : c) };
    }
    state = { ...state, payments: state.payments.map((p) => p.id === paymentId ? { ...p, status: 'Allocated', allocatedTo: allocatedIds.join(', ') || null, allocatedAmount: payment.amount - remaining } : p) };
    logAudit('Lydia Otieno', 'Allocated payment', `${payment.receiptNo} · KES ${(payment.amount - remaining).toLocaleString()} → ${payment.studentName}`);
    notify();
    return { ok: true };
  },

  reversePayment(paymentId: string): { ok: boolean; error?: string } {
    const payment = state.payments.find((p) => p.id === paymentId);
    if (!payment) return { ok: false, error: 'Payment not found.' };
    if (payment.status === 'Reversed') return { ok: false, error: 'Payment already reversed.' };
    if (payment.status === 'Allocated' && payment.allocatedTo) {
      const chargeIds = payment.allocatedTo.split(', ');
      state = { ...state, charges: state.charges.map((c) => { if (chargeIds.includes(c.id)) { const reduction = c.paidAmount > payment.allocatedAmount / chargeIds.length ? Math.floor(payment.allocatedAmount / chargeIds.length) : c.paidAmount; const newPaid = Math.max(0, c.paidAmount - reduction); return { ...c, paidAmount: newPaid, status: newPaid >= c.amount ? 'Paid' : newPaid > 0 ? 'Partially paid' : c.dueDate < '16 Oct 2026' ? 'Overdue' : 'Billed' }; } return c; }) };
    }
    state = { ...state, payments: state.payments.map((p) => p.id === paymentId ? { ...p, status: 'Reversed' } : p) };
    logAudit('Lydia Otieno', 'Reversed payment', `${payment.receiptNo} · KES ${payment.amount.toLocaleString()}`);
    notify();
    return { ok: true };
  },

  billStudents(className: string, packageName: FeePackage, term: string): { ok: boolean; error?: string; count?: number } {
    const structure = state.feeStructures.find((f) => f.className === className && f.packageName === packageName && f.term === term && f.status === 'Active');
    if (!structure) return { ok: false, error: 'No active fee structure found for the selected class, package and term.' };
    const mockStudents = [
      { id: 'stu-005', name: 'Faith Achieng', className: 'Year 8 — Acacia' },
      { id: 'stu-006', name: 'Gloria Wairimu', className: 'Year 5 — Baobab' },
    ];
    let count = 0;
    const newCharges: StudentCharge[] = [];
    for (const student of mockStudents) {
      for (const item of structure.items) {
        const existing = state.charges.find((c) => c.studentId === student.id && c.description === item.name && c.term === term);
        if (existing) continue;
        newCharges.push({ id: `ch-${Date.now()}-${count}`, studentId: student.id, studentName: student.name, className: student.className, package: packageName, term, description: item.name, amount: item.amount, dueDate: item.dueDate, status: 'Billed', paidAmount: 0, dateBilled: '16 Oct 2026' });
        count++;
      }
    }
    if (newCharges.length === 0) return { ok: false, error: 'All eligible students already billed for this period.' };
    state = { ...state, charges: [...state.charges, ...newCharges] };
    logAudit('Finance Officer', 'Bulk billing', `${count} charges for ${className} ${packageName} ${term}`);
    notify();
    return { ok: true, count };
  },

  approveDiscount(discountId: string): { ok: boolean; error?: string } {
    const discount = state.discounts.find((d) => d.id === discountId);
    if (!discount) return { ok: false, error: 'Discount not found.' };
    if (discount.status !== 'Pending') return { ok: false, error: 'Discount is not pending approval.' };
    state = { ...state, discounts: state.discounts.map((d) => d.id === discountId ? { ...d, status: 'Approved', approvedBy: 'Miriam Njoroge' } : d) };
    logAudit('Miriam Njoroge', 'Approved discount', `${discount.type} · ${discount.studentName} · ${discount.percentage}%`);
    notify();
    return { ok: true };
  },

  rejectDiscount(discountId: string): { ok: boolean; error?: string } {
    const discount = state.discounts.find((d) => d.id === discountId);
    if (!discount) return { ok: false, error: 'Discount not found.' };
    if (discount.status !== 'Pending') return { ok: false, error: 'Discount is not pending approval.' };
    state = { ...state, discounts: state.discounts.map((d) => d.id === discountId ? { ...d, status: 'Rejected' } : d) };
    logAudit('Miriam Njoroge', 'Rejected discount', `${discount.type} · ${discount.studentName}`);
    notify();
    return { ok: true };
  },

  createExpense(payee: string, category: string, department: string, description: string, amount: number): { ok: boolean; error?: string } {
    if (!payee.trim() || !description.trim()) return { ok: false, error: 'Payee and description are required.' };
    if (amount <= 0) return { ok: false, error: 'Amount must be greater than zero.' };
    const ref = `EXP-2026-${34 + state.expenses.length}`;
    const expense: Expense = { id: `exp-${Date.now()}`, reference: ref, payee: payee.trim(), category, department, description: description.trim(), amount, date: '16 Oct 2026', status: 'Draft', requestedBy: 'Finance Officer', approvedBy: null, paymentRef: null };
    state = { ...state, expenses: [expense, ...state.expenses] };
    logAudit('Finance Officer', 'Created expense', `${ref} · ${payee} · KES ${amount.toLocaleString()}`);
    notify();
    return { ok: true };
  },

  submitExpense(expenseId: string): { ok: boolean; error?: string } {
    const expense = state.expenses.find((e) => e.id === expenseId);
    if (!expense) return { ok: false, error: 'Expense not found.' };
    if (expense.status !== 'Draft') return { ok: false, error: 'Only draft expenses can be submitted.' };
    state = { ...state, expenses: state.expenses.map((e) => e.id === expenseId ? { ...e, status: 'Submitted' } : e) };
    logAudit('Finance Officer', 'Submitted expense', `${expense.reference} · KES ${expense.amount.toLocaleString()}`);
    notify();
    return { ok: true };
  },

  approveExpense(expenseId: string): { ok: boolean; error?: string } {
    const expense = state.expenses.find((e) => e.id === expenseId);
    if (!expense) return { ok: false, error: 'Expense not found.' };
    if (expense.status !== 'Submitted' && expense.status !== 'Under review') return { ok: false, error: `Expense is ${expense.status.toLowerCase()}, cannot approve.` };
    if (expense.requestedBy === 'Miriam Njoroge') return { ok: false, error: 'Self-approval is not permitted. Another approver must review.' };
    state = { ...state, expenses: state.expenses.map((e) => e.id === expenseId ? { ...e, status: 'Approved', approvedBy: 'Miriam Njoroge' } : e) };
    logAudit('Miriam Njoroge', 'Approved expense', `${expense.reference} · KES ${expense.amount.toLocaleString()}`);
    notify();
    return { ok: true };
  },

  rejectExpense(expenseId: string): { ok: boolean; error?: string } {
    const expense = state.expenses.find((e) => e.id === expenseId);
    if (!expense) return { ok: false, error: 'Expense not found.' };
    if (expense.status !== 'Submitted' && expense.status !== 'Under review') return { ok: false, error: `Expense is ${expense.status.toLowerCase()}, cannot reject.` };
    state = { ...state, expenses: state.expenses.map((e) => e.id === expenseId ? { ...e, status: 'Rejected' } : e) };
    logAudit('Miriam Njoroge', 'Rejected expense', `${expense.reference}`);
    notify();
    return { ok: true };
  },

  payExpense(expenseId: string): { ok: boolean; error?: string } {
    const expense = state.expenses.find((e) => e.id === expenseId);
    if (!expense) return { ok: false, error: 'Expense not found.' };
    if (expense.status !== 'Approved') return { ok: false, error: 'Only approved expenses can be paid.' };
    const ref = `BANK-TRF-${7800 + state.expenses.length}`;
    state = { ...state, expenses: state.expenses.map((e) => e.id === expenseId ? { ...e, status: 'Paid', paymentRef: ref } : e) };
    logAudit('Lydia Otieno', 'Paid expense', `${expense.reference} · ${ref}`);
    notify();
    return { ok: true };
  },

  postJournal(journalId: string): { ok: boolean; error?: string } {
    const entry = state.journalEntries.find((j) => j.id === journalId);
    if (!entry) return { ok: false, error: 'Journal entry not found.' };
    if (entry.status !== 'Pending approval') return { ok: false, error: 'Only pending entries can be posted.' };
    state = { ...state, journalEntries: state.journalEntries.map((j) => j.id === journalId ? { ...j, status: 'Posted', postedBy: 'Lydia Otieno' } : j) };
    logAudit('Lydia Otieno', 'Posted journal entry', `${entry.reference} · KES ${entry.amount.toLocaleString()}`);
    notify();
    return { ok: true };
  },

  matchBankLine(lineId: string, paymentId: string): { ok: boolean; error?: string } {
    const line = state.bankLines.find((l) => l.id === lineId);
    if (!line) return { ok: false, error: 'Bank statement line not found.' };
    const payment = state.payments.find((p) => p.id === paymentId);
    if (!payment) return { ok: false, error: 'Payment not found.' };
    if (line.amount !== payment.amount) return { ok: false, error: `Amount mismatch: bank KES ${line.amount.toLocaleString()} vs payment KES ${payment.amount.toLocaleString()}.` };
    state = { ...state, bankLines: state.bankLines.map((l) => l.id === lineId ? { ...l, matchedPaymentId: paymentId, status: 'Matched' } : l) };
    logAudit('Lydia Otieno', 'Matched bank transaction', `${line.reference} → ${payment.receiptNo}`);
    notify();
    return { ok: true };
  },

  ignoreBankLine(lineId: string): { ok: boolean; error?: string } {
    const line = state.bankLines.find((l) => l.id === lineId);
    if (!line) return { ok: false, error: 'Bank statement line not found.' };
    state = { ...state, bankLines: state.bankLines.map((l) => l.id === lineId ? { ...l, status: 'Ignored' } : l) };
    logAudit('Lydia Otieno', 'Ignored bank transaction', line.reference);
    notify();
    return { ok: true };
  },

  markNotificationRead(id: string): void {
    state = { ...state, notifications: state.notifications.map((n) => n.id === id ? { ...n, unread: false } : n) };
    notify();
  },

  reset(): void { state = structuredClone(seed); notify(); },
};

export const FINANCE_POLICIES = {
  APPROVAL_THRESHOLD,
  SELF_APPROVAL_PROHIBITED: true,
  ALLOCATION_OLDEST_DUE_FIRST: true,
  CURRENCY: 'KES',
  RECEIPT_PREFIX: 'RC-2026',
};

export type FinanceRole = 'Bursar' | 'Accountant' | 'Principal' | 'Administrator' | 'Parent';
