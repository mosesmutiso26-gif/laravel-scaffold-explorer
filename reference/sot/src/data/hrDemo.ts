import { useSyncExternalStore } from 'react';

export type HrStatus = 'Active' | 'On leave' | 'Expiring' | 'Draft' | 'Pending' | 'Approved' | 'Paid' | 'Validation failed' | 'Verified' | 'Missing';
export type PayrollStatus = 'Draft' | 'Calculated' | 'Validation failed' | 'Pending review' | 'Pending approval' | 'Approved' | 'Payment processing' | 'Paid' | 'Rejected';

export type HrEmployee = { id: string; name: string; initials: string; department: string; designation: string; type: 'Permanent' | 'Fixed-term' | 'Part-time'; status: 'Active' | 'On leave'; startDate: string; contract: string; salary: number };
export type HrContract = { id: string; employeeId: string; employee: string; type: string; start: string; end: string; status: 'Active' | 'Expiring' | 'Draft'; salary: number };
export type HrLeaveRequest = { id: string; employee: string; type: string; dates: string; days: number; reason: string; status: 'Pending' | 'Approved' | 'Rejected' };
export type HrCandidate = { id: string; name: string; role: string; stage: 'Screening' | 'Interview' | 'Offer'; updated: string };
export type HrDocument = { id: string; employee: string; type: string; expires: string; status: 'Verified' | 'Missing' | 'Expiring' };
export type HrPayrollRun = { id: string; period: string; employees: number; gross: number; deductions: number; net: number; status: PayrollStatus; errors: number };

export type HrOnboardingItem = { id: string; label: string };
export type HrOnboardingChecklist = { employeeId: string; items: HrOnboardingItem[] };

export type HrDemoState = {
  employees: HrEmployee[];
  contracts: HrContract[];
  leave: HrLeaveRequest[];
  candidates: HrCandidate[];
  documents: HrDocument[];
  payroll: HrPayrollRun[];
  audit: string[];
  paymentEvents: string[];
  checklist: Record<string, boolean>;
};

const onboardingItems: HrOnboardingItem[] = [
  { id: 'docs', label: 'Required documents collected' },
  { id: 'contract', label: 'Employment contract signed' },
  { id: 'account', label: 'Authorized account created' },
  { id: 'assignment', label: 'Department and designation assigned' },
  { id: 'equipment', label: 'Equipment or asset handover' },
  { id: 'induction', label: 'Induction and orientation completed' },
  { id: 'policy', label: 'Policy acknowledgement received' },
];

function run_period(id: string): string { return state.payroll.find((r) => r.id === id)?.period ?? id; }
export function getOnboardingItems(): HrOnboardingItem[] { return onboardingItems; }

const seed: HrDemoState = {
  employees: [
    { id: 'emp-001', name: 'Samuel Kamau', initials: 'SK', department: 'STEM', designation: 'Senior Teacher', type: 'Permanent', status: 'Active', startDate: '2018-01-08', contract: 'EMP-2018-001', salary: 184000 },
    { id: 'emp-002', name: 'Mary Njoki', initials: 'MN', department: 'Languages', designation: 'Teacher', type: 'Permanent', status: 'Active', startDate: '2020-05-11', contract: 'EMP-2020-014', salary: 156000 },
    { id: 'emp-003', name: 'David Omondi', initials: 'DO', department: 'STEM', designation: 'Teacher', type: 'Fixed-term', status: 'On leave', startDate: '2024-01-15', contract: 'EMP-2024-021', salary: 142000 },
    { id: 'emp-004', name: 'Faith Achieng', initials: 'FA', department: 'Student Welfare', designation: 'Counsellor', type: 'Permanent', status: 'Active', startDate: '2019-09-02', contract: 'EMP-2019-009', salary: 168000 },
    { id: 'emp-005', name: 'James Miriti', initials: 'JM', department: 'Humanities', designation: 'Head of Department', type: 'Permanent', status: 'Active', startDate: '2016-01-04', contract: 'EMP-2016-003', salary: 212000 },
  ],
  contracts: [
    { id: 'contract-001', employeeId: 'emp-001', employee: 'Samuel Kamau', type: 'Permanent', start: '08 Jan 2018', end: 'No expiry', status: 'Active', salary: 184000 },
    { id: 'contract-002', employeeId: 'emp-003', employee: 'David Omondi', type: 'Fixed-term', start: '15 Jan 2024', end: '31 Dec 2026', status: 'Expiring', salary: 142000 },
    { id: 'contract-003', employeeId: 'emp-002', employee: 'Mary Njoki', type: 'Permanent', start: '11 May 2020', end: 'No expiry', status: 'Active', salary: 156000 },
  ],
  leave: [
    { id: 'leave-001', employee: 'David Omondi', type: 'Annual leave', dates: '02–06 Nov 2026', days: 5, reason: 'Family travel', status: 'Pending' },
    { id: 'leave-002', employee: 'Mary Njoki', type: 'Personal leave', dates: '12 Nov 2026', days: 1, reason: 'Appointment', status: 'Approved' },
  ],
  candidates: [
    { id: 'candidate-001', name: 'Lydia Wambui', role: 'Mathematics Teacher', stage: 'Interview', updated: 'Today, 09:12' },
    { id: 'candidate-002', name: 'Peter Njoroge', role: 'ICT Support Officer', stage: 'Screening', updated: 'Yesterday' },
    { id: 'candidate-003', name: 'Anne Chebet', role: 'Boarding House Parent', stage: 'Offer', updated: '24 Oct 2026' },
  ],
  documents: [
    { id: 'document-001', employee: 'Samuel Kamau', type: 'TSC registration', expires: '18 Mar 2027', status: 'Verified' },
    { id: 'document-002', employee: 'David Omondi', type: 'Contract document', expires: '31 Dec 2026', status: 'Expiring' },
    { id: 'document-003', employee: 'Mary Njoki', type: 'Professional certificate', expires: 'Missing', status: 'Missing' },
  ],
  payroll: [{ id: 'payroll-001', period: 'October 2026', employees: 86, gross: 5420000, deductions: 842000, net: 4578000, status: 'Pending approval', errors: 3 }, { id: 'payroll-002', period: 'September 2026', employees: 85, gross: 5290000, deductions: 818000, net: 4472000, status: 'Paid', errors: 0 }],
  audit: ['Miriam Njoroge submitted October payroll for approval', 'Peter Otieno verified Samuel Kamau TSC registration', 'Grace Wanjiru approved Mary Njoki personal leave'],
  paymentEvents: [],
  checklist: {},
};

let state: HrDemoState = structuredClone(seed);
const listeners = new Set<() => void>();
function notify(): void { listeners.forEach((listener) => listener()); }
export function useHrDemo(): HrDemoState { return useSyncExternalStore((listener) => { listeners.add(listener); return () => listeners.delete(listener); }, () => state, () => state); }

export const hrDemo = {
  getOnboardingItems,
  addEmployee(name: string, department: string, designation: string): void { const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(); const employee: HrEmployee = { id: `emp-${Date.now()}`, name, initials, department, designation, type: 'Permanent', status: 'Active', startDate: '16 Oct 2026', contract: 'DRAFT', salary: 0 }; state = { ...state, employees: [employee, ...state.employees], audit: [`HR created staff profile for ${name}`, ...state.audit] }; notify(); },
  renewContract(id: string): void { state = { ...state, contracts: state.contracts.map((contract) => contract.id === id ? { ...contract, end: '31 Dec 2027', status: 'Active' } : contract), audit: [`HR renewed contract ${id}`, ...state.audit] }; notify(); },
  advanceCandidate(id: string): void { state = { ...state, candidates: state.candidates.map((candidate) => candidate.id === id ? { ...candidate, stage: candidate.stage === 'Screening' ? 'Interview' : 'Offer', updated: 'Just now' } : candidate), audit: [`HR advanced candidate ${id}`, ...state.audit] }; notify(); },
  completeDocument(id: string): void { state = { ...state, documents: state.documents.map((document) => document.id === id ? { ...document, status: 'Verified' } : document), audit: [`HR verified document ${id}`, ...state.audit] }; notify(); },
  decideLeave(id: string, status: 'Approved' | 'Rejected'): void { state = { ...state, leave: state.leave.map((request) => request.id === id ? { ...request, status } : request), audit: [`HR ${status.toLowerCase()} leave request ${id}`, ...state.audit] }; notify(); },
  calculatePayroll(id: string): void { state = { ...state, payroll: state.payroll.map((run) => run.id === id ? { ...run, status: 'Calculated', errors: run.errors } : run), audit: [`Payroll recalculated for ${run_period(id)}`, ...state.audit] }; notify(); },
  validatePayroll(id: string): void { state = { ...state, payroll: state.payroll.map((run) => run.id === id ? { ...run, status: run.errors === 0 ? 'Pending approval' : 'Validation failed' } : run), audit: [`Payroll validation ${state.payroll.find((r) => r.id === id)?.errors === 0 ? 'passed' : 'failed'} for ${run_period(id)}`, ...state.audit] }; notify(); },
  approvePayroll(id: string): void { const run = state.payroll.find((r) => r.id === id); if (run && run.errors === 0 && (run.status === 'Pending approval' || run.status === 'Calculated')) { state = { ...state, payroll: state.payroll.map((r) => r.id === id ? { ...r, status: 'Approved' } : r), audit: [`Payroll approved for ${run.period} — approval is not payment`, ...state.audit] }; notify(); } },
  resolvePayroll(id: string): void { state = { ...state, payroll: state.payroll.map((run) => run.id === id ? { ...run, errors: 0, status: 'Calculated' } : run), audit: [`Payroll exceptions resolved for ${run_period(id)}`, ...state.audit] }; notify(); },
  recordPayment(id: string): void { const run = state.payroll.find((r) => r.id === id); if (run && run.status === 'Approved') { state = { ...state, payroll: state.payroll.map((r) => r.id === id ? { ...r, status: 'Paid' } : r), paymentEvents: [`Payment outcome recorded for ${run.period}`, ...state.paymentEvents], audit: [`Payroll payment outcome recorded for ${run.period}`, ...state.audit] }; notify(); } },
  addLeave(employee: string, type: string, dates: string, days: number, reason: string): void { const request: HrLeaveRequest = { id: `leave-${Date.now()}`, employee, type, dates, days, reason, status: 'Pending' }; state = { ...state, leave: [request, ...state.leave], audit: [`HR submitted ${type} for ${employee}`, ...state.audit] }; notify(); },
  toggleChecklistItem(employeeId: string, itemId: string): void { const key = `${employeeId}:${itemId}`; const current = state.checklist[key] ?? false; state = { ...state, checklist: { ...state.checklist, [key]: !current }, audit: [`HR ${!current ? 'completed' : 'reopened'} onboarding item ${itemId} for ${employeeId}`, ...state.audit] }; notify(); },
  reset(): void { state = structuredClone(seed); notify(); },
};
