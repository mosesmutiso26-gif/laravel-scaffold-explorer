import { useSyncExternalStore } from 'react';

export type CopyStatus = 'Available' | 'Borrowed' | 'Reserved' | 'Lost' | 'Damaged' | 'Under repair' | 'Withdrawn';
export type CopyCondition = 'New' | 'Good' | 'Fair' | 'Poor';
export type LoanStatus = 'Active' | 'Returned' | 'Overdue';
export type ReservationStatus = 'Pending' | 'Available' | 'Fulfilled' | 'Expired' | 'Cancelled';
export type FineStatus = 'Outstanding' | 'Settled' | 'Waived';
export type BorrowerType = 'Student' | 'Teacher' | 'Staff';

export type LibraryBook = {
  id: string;
  title: string;
  isbn: string;
  author: string;
  publisher: string;
  year: number;
  edition: string;
  language: string;
  category: string;
  level: string;
  description: string;
  keywords: string[];
  status: 'Active' | 'Archived';
  totalCopies: number;
  availableCopies: number;
};

export type LibraryCopy = {
  id: string;
  bookId: string;
  barcode: string;
  location: string;
  shelf: string;
  condition: CopyCondition;
  status: CopyStatus;
  acquired: string;
};

export type LibraryLoan = {
  id: string;
  copyId: string;
  bookTitle: string;
  barcode: string;
  borrowerId: string;
  borrowerName: string;
  borrowerType: BorrowerType;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  status: LoanStatus;
  renewals: number;
};

export type LibraryReservation = {
  id: string;
  bookId: string;
  bookTitle: string;
  borrowerId: string;
  borrowerName: string;
  borrowerType: BorrowerType;
  requestedDate: string;
  status: ReservationStatus;
  queuePosition: number;
};

export type LibraryFine = {
  id: string;
  loanId: string;
  borrowerName: string;
  reason: string;
  amount: number;
  status: FineStatus;
  createdDate: string;
  settledDate: string | null;
};

export type LibraryNotification = {
  id: string;
  recipient: string;
  title: string;
  detail: string;
  unread: boolean;
  createdDate: string;
};

export type LibraryAuditEntry = {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
};

export type LibraryBorrower = {
  id: string;
  name: string;
  type: BorrowerType;
  className: string;
  activeLoans: number;
  eligible: boolean;
  outstandingFines: number;
};

export type LibraryDemoState = {
  books: LibraryBook[];
  copies: LibraryCopy[];
  loans: LibraryLoan[];
  reservations: LibraryReservation[];
  fines: LibraryFine[];
  notifications: LibraryNotification[];
  audit: LibraryAuditEntry[];
  borrowers: LibraryBorrower[];
};

const seed: LibraryDemoState = {
  books: [
    { id: 'bk-001', title: 'The River Between', isbn: '978-9966-467-01-1', author: 'Ngugi wa Thiong\'o', publisher: 'East African Educational Publishers', year: 1965, edition: '2nd', language: 'English', category: 'Fiction', level: 'Secondary', description: 'A classic Kenyan novel exploring the conflict between tradition and modernity in a Gikuyu community.', keywords: ['kenyan', 'classic', 'colonial'], status: 'Active', totalCopies: 4, availableCopies: 2 },
    { id: 'bk-002', title: 'Mathematics for Kenya Secondary Schools', isbn: '978-0-19-574700-1', author: 'A. C. Cheruiyot', publisher: 'Oxford University Press', year: 2020, edition: '3rd', language: 'English', category: 'Mathematics', level: 'Secondary', description: 'Comprehensive textbook covering the secondary mathematics syllabus with exercises and worked examples.', keywords: ['textbook', 'maths', 'syllabus'], status: 'Active', totalCopies: 12, availableCopies: 5 },
    { id: 'bk-003', title: 'Biology: A Kenyan Approach', isbn: '978-1-4085-2300-2', author: 'Mary Jones', publisher: 'Hodder Education', year: 2018, edition: '1st', language: 'English', category: 'Science', level: 'Secondary', description: 'Biology textbook tailored to the Kenyan curriculum with practical investigations and diagrams.', keywords: ['textbook', 'science', 'biology'], status: 'Active', totalCopies: 8, availableCopies: 0 },
    { id: 'bk-004', title: 'Kiswahili Mazoezi na Maarifa', isbn: '978-9966-49-001-8', author: 'R. Wanjohi', publisher: 'Jomo Kenyatta Foundation', year: 2021, edition: '4th', language: 'Kiswahili', category: 'Languages', level: 'Primary', description: 'Kiswahili language exercises and grammar for upper primary with cultural context.', keywords: ['kiswahili', 'textbook', 'primary'], status: 'Active', totalCopies: 10, availableCopies: 7 },
    { id: 'bk-005', title: 'An Introduction to Kenyan History', isbn: '978-9-96660-012-3', author: 'William Ochieng', publisher: 'East African Educational Publishers', year: 2019, edition: 'Revised', language: 'English', category: 'Humanities', level: 'Secondary', description: 'A survey of Kenyan history from pre-colonial times through independence to the modern era.', keywords: ['history', 'kenya', 'humanities'], status: 'Active', totalCopies: 6, availableCopies: 3 },
    { id: 'bk-006', title: 'English Grammar in Use', isbn: '978-0-521-18939-2', author: 'Raymond Murphy', publisher: 'Cambridge University Press', year: 2019, edition: '5th', language: 'English', category: 'Languages', level: 'Secondary', description: 'A self-study reference and practice book for intermediate learners of English.', keywords: ['grammar', 'english', 'reference'], status: 'Active', totalCopies: 5, availableCopies: 4 },
    { id: 'bk-007', title: 'Chemistry for Secondary Schools', isbn: '978-1-4085-2310-1', author: 'G. Hill', publisher: 'Hodder Education', year: 2017, edition: '2nd', language: 'English', category: 'Science', level: 'Secondary', description: 'Chemistry textbook covering theoretical and practical aspects of the secondary curriculum.', keywords: ['chemistry', 'science', 'textbook'], status: 'Active', totalCopies: 6, availableCopies: 2 },
    { id: 'bk-008', title: 'A Good Night Story for Children', isbn: '978-9-96660-200-5', author: 'Cynthia Mwangi', publisher: 'Longhorn Kenya', year: 2022, edition: '1st', language: 'English', category: 'Fiction', level: 'Primary', description: 'A collection of bedtime stories inspired by African folklore and daily life.', keywords: ['stories', 'primary', 'folklore'], status: 'Active', totalCopies: 3, availableCopies: 3 },
  ],
  copies: [
    { id: 'cp-001', bookId: 'bk-001', barcode: 'RA-BK001-01', location: 'Main Library', shelf: 'F-A12', condition: 'Good', status: 'Available', acquired: '12 Jan 2024' },
    { id: 'cp-002', bookId: 'bk-001', barcode: 'RA-BK001-02', location: 'Main Library', shelf: 'F-A12', condition: 'Good', status: 'Available', acquired: '12 Jan 2024' },
    { id: 'cp-003', bookId: 'bk-001', barcode: 'RA-BK001-03', location: 'Main Library', shelf: 'F-A12', condition: 'Fair', status: 'Borrowed', acquired: '12 Jan 2024' },
    { id: 'cp-004', bookId: 'bk-001', barcode: 'RA-BK001-04', location: 'Main Library', shelf: 'F-A12', condition: 'Poor', status: 'Damaged', acquired: '12 Jan 2024' },
    { id: 'cp-005', bookId: 'bk-002', barcode: 'RA-BK002-01', location: 'Main Library', shelf: 'M-B05', condition: 'New', status: 'Available', acquired: '03 Sep 2025' },
    { id: 'cp-006', bookId: 'bk-002', barcode: 'RA-BK002-02', location: 'Main Library', shelf: 'M-B05', condition: 'Good', status: 'Available', acquired: '03 Sep 2025' },
    { id: 'cp-007', bookId: 'bk-002', barcode: 'RA-BK002-03', location: 'Main Library', shelf: 'M-B05', condition: 'Good', status: 'Borrowed', acquired: '03 Sep 2025' },
    { id: 'cp-008', bookId: 'bk-003', barcode: 'RA-BK003-01', location: 'Main Library', shelf: 'S-C03', condition: 'Good', status: 'Borrowed', acquired: '15 Aug 2024' },
    { id: 'cp-009', bookId: 'bk-003', barcode: 'RA-BK003-02', location: 'Main Library', shelf: 'S-C03', condition: 'Good', status: 'Borrowed', acquired: '15 Aug 2024' },
    { id: 'cp-010', bookId: 'bk-005', barcode: 'RA-BK005-01', location: 'Main Library', shelf: 'H-D08', condition: 'Good', status: 'Available', acquired: '20 Feb 2025' },
    { id: 'cp-011', bookId: 'bk-006', barcode: 'RA-BK006-01', location: 'Main Library', shelf: 'L-E01', condition: 'New', status: 'Available', acquired: '10 Jul 2025' },
  ],
  loans: [
    { id: 'ln-001', copyId: 'cp-003', bookTitle: 'The River Between', barcode: 'RA-BK001-03', borrowerId: 'stu-001', borrowerName: 'Amani Wanjiku', borrowerType: 'Student', issueDate: '02 Oct 2026', dueDate: '16 Oct 2026', returnDate: null, status: 'Overdue', renewals: 0 },
    { id: 'ln-002', copyId: 'cp-007', bookTitle: 'Mathematics for Kenya Secondary Schools', barcode: 'RA-BK002-03', borrowerId: 'stu-002', borrowerName: 'Brian Otieno', borrowerType: 'Student', issueDate: '08 Oct 2026', dueDate: '22 Oct 2026', returnDate: null, status: 'Active', renewals: 1 },
    { id: 'ln-003', copyId: 'cp-008', bookTitle: 'Biology: A Kenyan Approach', barcode: 'RA-BK003-01', borrowerId: 'stu-003', borrowerName: 'Chloe Njeri', borrowerType: 'Student', issueDate: '05 Oct 2026', dueDate: '19 Oct 2026', returnDate: null, status: 'Active', renewals: 0 },
    { id: 'ln-004', copyId: 'cp-009', bookTitle: 'Biology: A Kenyan Approach', barcode: 'RA-BK003-02', borrowerId: 'emp-001', borrowerName: 'Samuel Kamau', borrowerType: 'Teacher', issueDate: '01 Oct 2026', dueDate: '15 Nov 2026', returnDate: null, status: 'Active', renewals: 0 },
    { id: 'ln-005', copyId: 'cp-002', bookTitle: 'The River Between', barcode: 'RA-BK001-02', borrowerId: 'stu-004', borrowerName: 'Dylan Kamau', borrowerType: 'Student', issueDate: '20 Sep 2026', dueDate: '04 Oct 2026', returnDate: '03 Oct 2026', status: 'Returned', renewals: 0 },
  ],
  reservations: [
    { id: 'res-001', bookId: 'bk-003', bookTitle: 'Biology: A Kenyan Approach', borrowerId: 'stu-005', borrowerName: 'Faith Achieng', borrowerType: 'Student', requestedDate: '10 Oct 2026', status: 'Pending', queuePosition: 1 },
  ],
  fines: [
    { id: 'fine-001', loanId: 'ln-001', borrowerName: 'Amani Wanjiku', reason: 'Overdue · 0 days past due at KES 10/day', amount: 0, status: 'Outstanding', createdDate: '16 Oct 2026', settledDate: null },
  ],
  notifications: [
    { id: 'nlib-001', recipient: 'Amani Wanjiku', title: 'Book overdue', detail: 'The River Between was due on 16 Oct 2026', unread: true, createdDate: '16 Oct 2026' },
    { id: 'nlib-002', recipient: 'Brian Otieno', title: 'Due date approaching', detail: 'Mathematics for Kenya Secondary Schools due 22 Oct 2026', unread: true, createdDate: '15 Oct 2026' },
    { id: 'nlib-003', recipient: 'Faith Achieng', title: 'Reservation pending', detail: 'Biology: A Kenyan Approach · queue position 1', unread: false, createdDate: '10 Oct 2026' },
  ],
  audit: [
    { id: 'a-001', actor: 'Grace Librarian', action: 'Issued book', target: 'The River Between → Amani Wanjiku', timestamp: '02 Oct 2026, 09:15' },
    { id: 'a-002', actor: 'Grace Librarian', action: 'Processed return', target: 'The River Between ← Dylan Kamau', timestamp: '03 Oct 2026, 14:22' },
    { id: 'a-003', actor: 'Grace Librarian', action: 'Created reservation', target: 'Biology → Faith Achieng', timestamp: '10 Oct 2026, 11:08' },
    { id: 'a-004', actor: 'Grace Librarian', action: 'Recorded damage', target: 'Copy RA-BK001-04', timestamp: '12 Oct 2026, 10:30' },
  ],
  borrowers: [
    { id: 'stu-001', name: 'Amani Wanjiku', type: 'Student', className: 'Year 6 — Cedar', activeLoans: 1, eligible: false, outstandingFines: 0 },
    { id: 'stu-002', name: 'Brian Otieno', type: 'Student', className: 'Year 8 — Acacia', activeLoans: 1, eligible: true, outstandingFines: 0 },
    { id: 'stu-003', name: 'Chloe Njeri', type: 'Student', className: 'Year 6 — Cedar', activeLoans: 1, eligible: true, outstandingFines: 0 },
    { id: 'stu-004', name: 'Dylan Kamau', type: 'Student', className: 'Year 8 — Acacia', activeLoans: 0, eligible: true, outstandingFines: 0 },
    { id: 'stu-005', name: 'Faith Achieng', type: 'Student', className: 'Year 8 — Acacia', activeLoans: 0, eligible: true, outstandingFines: 0 },
    { id: 'emp-001', name: 'Samuel Kamau', type: 'Teacher', className: 'STEM Department', activeLoans: 1, eligible: true, outstandingFines: 0 },
  ],
};

let state: LibraryDemoState = structuredClone(seed);
const listeners = new Set<() => void>();

function notify(): void { listeners.forEach((listener) => listener()); }

export function useLibraryDemo(): LibraryDemoState {
  return useSyncExternalStore((listener) => { listeners.add(listener); return () => listeners.delete(listener); }, () => state, () => state);
}

function countAvailable(bookId: string): number {
  return state.copies.filter((c) => c.bookId === bookId && c.status === 'Available').length;
}

function refreshBookAvailability(): LibraryBook[] {
  return state.books.map((b) => ({ ...b, availableCopies: countAvailable(b.id), totalCopies: state.copies.filter((c) => c.bookId === b.id).length }));
}

const MAX_LOANS_STUDENT = 3;
const MAX_LOANS_STAFF = 5;
const LOAN_DAYS_STUDENT = 14;
const LOAN_DAYS_STAFF = 30;
const MAX_RENEWALS = 2;
const FINE_PER_DAY = 10;

export const libraryDemo = {
  addBook(title: string, author: string, isbn: string, category: string, level: string): void {
    const book: LibraryBook = { id: `bk-${Date.now()}`, title, isbn, author, publisher: '—', year: 2026, edition: '1st', language: 'English', category, level, description: 'New catalogue entry.', keywords: [], status: 'Active', totalCopies: 0, availableCopies: 0 };
    state = { ...state, books: [book, ...state.books], audit: [{ id: `a-${Date.now()}`, actor: 'Grace Librarian', action: 'Added catalogue title', target: title, timestamp: '16 Oct 2026, now' }, ...state.audit] };
    notify();
  },

  addCopy(bookId: string, barcode: string, location: string, shelf: string, condition: CopyCondition): void {
    const copy: LibraryCopy = { id: `cp-${Date.now()}`, bookId, barcode, location, shelf, condition, status: 'Available', acquired: '16 Oct 2026' };
    state = { ...state, copies: [copy, ...state.copies], books: refreshBookAvailability(), audit: [{ id: `a-${Date.now()}`, actor: 'Grace Librarian', action: 'Registered copy', target: barcode, timestamp: '16 Oct 2026, now' }, ...state.audit] };
    notify();
  },

  issueLoan(borrowerId: string, copyId: string): { ok: boolean; error?: string } {
    const borrower = state.borrowers.find((b) => b.id === borrowerId);
    if (!borrower) return { ok: false, error: 'Borrower not found' };
    if (!borrower.eligible) return { ok: false, error: 'Borrower is not eligible (overdue items or outstanding fines)' };
    const maxLoans = borrower.type === 'Student' ? MAX_LOANS_STUDENT : MAX_LOANS_STAFF;
    if (borrower.activeLoans >= maxLoans) return { ok: false, error: `Borrower has reached the maximum of ${maxLoans} active loans` };
    const copy = state.copies.find((c) => c.id === copyId);
    if (!copy) return { ok: false, error: 'Copy not found' };
    if (copy.status !== 'Available') return { ok: false, error: 'Copy is not available for loan' };
    const book = state.books.find((b) => b.id === copy.bookId);
    if (!book) return { ok: false, error: 'Book record not found' };
    const loanDays = borrower.type === 'Student' ? LOAN_DAYS_STUDENT : LOAN_DAYS_STAFF;
    const due = new Date('2026-10-16');
    due.setDate(due.getDate() + loanDays);
    const dueStr = due.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const loan: LibraryLoan = { id: `ln-${Date.now()}`, copyId, bookTitle: book.title, barcode: copy.barcode, borrowerId, borrowerName: borrower.name, borrowerType: borrower.type, issueDate: '16 Oct 2026', dueDate: dueStr, returnDate: null, status: 'Active', renewals: 0 };
    state = {
      ...state,
      copies: state.copies.map((c) => c.id === copyId ? { ...c, status: 'Borrowed' } : c),
      loans: [loan, ...state.loans],
      borrowers: state.borrowers.map((b) => b.id === borrowerId ? { ...b, activeLoans: b.activeLoans + 1 } : b),
      books: refreshBookAvailability(),
      notifications: [{ id: `nlib-${Date.now()}`, recipient: borrower.name, title: 'Book issued', detail: `${book.title} due ${dueStr}`, unread: true, createdDate: '16 Oct 2026' }, ...state.notifications],
      audit: [{ id: `a-${Date.now()}`, actor: 'Grace Librarian', action: 'Issued book', target: `${book.title} → ${borrower.name}`, timestamp: '16 Oct 2026, now' }, ...state.audit],
    };
    notify();
    return { ok: true };
  },

  returnLoan(loanId: string): { ok: boolean; error?: string } {
    const loan = state.loans.find((l) => l.id === loanId);
    if (!loan) return { ok: false, error: 'Loan not found' };
    if (loan.status === 'Returned') return { ok: false, error: 'This loan has already been returned' };
    const isOverdue = loan.status === 'Overdue';
    state = {
      ...state,
      copies: state.copies.map((c) => c.id === loan.copyId ? { ...c, status: 'Available' } : c),
      loans: state.loans.map((l) => l.id === loanId ? { ...l, status: 'Returned', returnDate: '16 Oct 2026' } : l),
      borrowers: state.borrowers.map((b) => b.id === loan.borrowerId ? { ...b, activeLoans: Math.max(0, b.activeLoans - 1) } : b),
      books: refreshBookAvailability(),
      notifications: [{ id: `nlib-${Date.now()}`, recipient: loan.borrowerName, title: 'Book returned', detail: `${loan.bookTitle} returned successfully`, unread: true, createdDate: '16 Oct 2026' }, ...state.notifications],
      audit: [{ id: `a-${Date.now()}`, actor: 'Grace Librarian', action: 'Processed return', target: `${loan.bookTitle} ← ${loan.borrowerName}`, timestamp: '16 Oct 2026, now' }, ...state.audit],
    };
    if (isOverdue) {
      const overdueDays = Math.ceil((new Date('2026-10-16').getTime() - new Date(loan.dueDate).getTime()) / 86400000);
      if (overdueDays > 0) {
        state = { ...state, fines: [{ id: `fine-${Date.now()}`, loanId, borrowerName: loan.borrowerName, reason: `Overdue · ${overdueDays} day(s) at KES ${FINE_PER_DAY}/day`, amount: overdueDays * FINE_PER_DAY, status: 'Outstanding', createdDate: '16 Oct 2026', settledDate: null }, ...state.fines] };
      }
    }
    notify();
    return { ok: true };
  },

  renewLoan(loanId: string): { ok: boolean; error?: string } {
    const loan = state.loans.find((l) => l.id === loanId);
    if (!loan) return { ok: false, error: 'Loan not found' };
    if (loan.status === 'Returned') return { ok: false, error: 'Cannot renew a returned loan' };
    if (loan.renewals >= MAX_RENEWALS) return { ok: false, error: `Maximum of ${MAX_RENEWALS} renewals reached` };
    if (loan.status === 'Overdue') return { ok: false, error: 'Cannot renew an overdue loan' };
    const hasReservation = state.reservations.some((r) => r.bookId === state.copies.find((c) => c.id === loan.copyId)?.bookId && r.status === 'Pending');
    if (hasReservation) return { ok: false, error: 'Cannot renew — another borrower has a pending reservation for this title' };
    const loanDays = loan.borrowerType === 'Student' ? LOAN_DAYS_STUDENT : LOAN_DAYS_STAFF;
    const due = new Date(loan.dueDate);
    due.setDate(due.getDate() + loanDays);
    const dueStr = due.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    state = {
      ...state,
      loans: state.loans.map((l) => l.id === loanId ? { ...l, dueDate: dueStr, renewals: l.renewals + 1 } : l),
      notifications: [{ id: `nlib-${Date.now()}`, recipient: loan.borrowerName, title: 'Loan renewed', detail: `${loan.bookTitle} new due date ${dueStr}`, unread: true, createdDate: '16 Oct 2026' }, ...state.notifications],
      audit: [{ id: `a-${Date.now()}`, actor: 'Grace Librarian', action: 'Renewed loan', target: `${loan.bookTitle} · ${loan.borrowerName}`, timestamp: '16 Oct 2026, now' }, ...state.audit],
    };
    notify();
    return { ok: true };
  },

  createReservation(borrowerId: string, bookId: string): { ok: boolean; error?: string } {
    const borrower = state.borrowers.find((b) => b.id === borrowerId);
    if (!borrower) return { ok: false, error: 'Borrower not found' };
    const book = state.books.find((b) => b.id === bookId);
    if (!book) return { ok: false, error: 'Book not found' };
    if (book.availableCopies > 0) return { ok: false, error: 'Copies are available — issue a loan instead' };
    const existing = state.reservations.find((r) => r.borrowerId === borrowerId && r.bookId === bookId && r.status === 'Pending');
    if (existing) return { ok: false, error: 'You already have a pending reservation for this title' };
    const queuePos = state.reservations.filter((r) => r.bookId === bookId && r.status === 'Pending').length + 1;
    const reservation: LibraryReservation = { id: `res-${Date.now()}`, bookId, bookTitle: book.title, borrowerId, borrowerName: borrower.name, borrowerType: borrower.type, requestedDate: '16 Oct 2026', status: 'Pending', queuePosition: queuePos };
    state = {
      ...state,
      reservations: [reservation, ...state.reservations],
      notifications: [{ id: `nlib-${Date.now()}`, recipient: borrower.name, title: 'Reservation created', detail: `${book.title} · queue position ${queuePos}`, unread: true, createdDate: '16 Oct 2026' }, ...state.notifications],
      audit: [{ id: `a-${Date.now()}`, actor: borrower.name, action: 'Reserved title', target: book.title, timestamp: '16 Oct 2026, now' }, ...state.audit],
    };
    notify();
    return { ok: true };
  },

  cancelReservation(reservationId: string): void {
    state = { ...state, reservations: state.reservations.map((r) => r.id === reservationId ? { ...r, status: 'Cancelled' } : r), audit: [{ id: `a-${Date.now()}`, actor: 'Grace Librarian', action: 'Cancelled reservation', target: reservationId, timestamp: '16 Oct 2026, now' }, ...state.audit] };
    notify();
  },

  markCopyStatus(copyId: string, status: CopyStatus): void {
    const copy = state.copies.find((c) => c.id === copyId);
    if (!copy) return;
    state = {
      ...state,
      copies: state.copies.map((c) => c.id === copyId ? { ...c, status } : c),
      books: refreshBookAvailability(),
      audit: [{ id: `a-${Date.now()}`, actor: 'Grace Librarian', action: `Marked copy ${status.toLowerCase()}`, target: copy.barcode, timestamp: '16 Oct 2026, now' }, ...state.audit],
    };
    notify();
  },

  settleFine(fineId: string): void {
    state = { ...state, fines: state.fines.map((f) => f.id === fineId ? { ...f, status: 'Settled', settledDate: '16 Oct 2026' } : f), audit: [{ id: `a-${Date.now()}`, actor: 'Grace Librarian', action: 'Settled fine', target: fineId, timestamp: '16 Oct 2026, now' }, ...state.audit] };
    notify();
  },

  waiveFine(fineId: string): void {
    state = { ...state, fines: state.fines.map((f) => f.id === fineId ? { ...f, status: 'Waived', settledDate: '16 Oct 2026' } : f), audit: [{ id: `a-${Date.now()}`, actor: 'Grace Librarian', action: 'Waived fine', target: fineId, timestamp: '16 Oct 2026, now' }, ...state.audit] };
    notify();
  },

  markNotificationRead(id: string): void {
    state = { ...state, notifications: state.notifications.map((n) => n.id === id ? { ...n, unread: false } : n) };
    notify();
  },

  reset(): void { state = structuredClone(seed); notify(); },
};

export const LIBRARY_POLICIES = { MAX_LOANS_STUDENT, MAX_LOANS_STAFF, LOAN_DAYS_STUDENT, LOAN_DAYS_STAFF, MAX_RENEWALS, FINE_PER_DAY };
