import { useState, useCallback } from 'react';

export interface ApprovalRequest {
  id: string;
  type: 'Timetable Adjustment' | 'Substitute Assignment' | 'Assessment Publication' | 'Student Discipline' | 'School Event' | 'Prefect Appointment' | 'Boarding Exception' | 'Sports Event' | 'Parent Communication' | 'Bursary Request' | 'Budget Request' | 'Staff Leave';
  requester: string;
  reason: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Returned for Correction' | 'More Info Requested';
  conflictWarnings: string;
}

export interface ExecutiveTask {
  id: string;
  title: string;
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue' | 'Delegated' | 'Cancelled';
  dueDate: string;
  source: string;
}

export interface BriefingItem {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: 'Info' | 'Warning' | 'Urgent';
  status: 'New' | 'Reviewed' | 'Action Assigned' | 'Resolved';
  time: string;
}

export interface Intervention {
  id: string;
  studentName: string;
  className: string;
  concern: string;
  responsibleStaff: string;
  status: 'Proposed' | 'Active' | 'Under Review' | 'Escalated' | 'Closed';
  reviewDate: string;
}

export interface LessonObservation {
  id: string;
  teacher: string;
  observer: string;
  className: string;
  subject: string;
  date: string;
  status: 'Scheduled' | 'Completed' | 'Reviewed' | 'Closed';
  rating: string;
}

const initialApprovals: ApprovalRequest[] = [
  { id: 'ap1', type: 'Timetable Adjustment', requester: 'Grace Wanjiru', reason: 'Swap Maths and English for Form 2 on Fridays', submittedDate: '2026-10-14', status: 'Pending', conflictWarnings: 'No conflicts detected' },
  { id: 'ap2', type: 'Bursary Request', requester: 'Lydia Otieno', reason: 'Full bursary for Brian Otieno — orphaned student', submittedDate: '2026-10-12', status: 'Pending', conflictWarnings: 'Balance: KES 62,500' },
  { id: 'ap3', type: 'School Event', requester: 'Peter Otieno', reason: 'Annual Prize Giving Ceremony — 15 Nov 2026', submittedDate: '2026-10-10', status: 'Pending', conflictWarnings: 'Venue conflict: Sports Day on same date' },
  { id: 'ap4', type: 'Staff Leave', requester: 'Mary Njoki', reason: '3 days personal leave — 20-22 Oct', submittedDate: '2026-10-08', status: 'Pending', conflictWarnings: '3 lessons need substitute cover' },
  { id: 'ap5', type: 'Prefect Appointment', requester: 'Faith Achieng', reason: 'Appoint Amani Wanjiku as Head Girl', submittedDate: '2026-10-05', status: 'Approved', conflictWarnings: 'No conflicts' },
];

const initialTasks: ExecutiveTask[] = [
  { id: 'et1', title: 'Review Term 3 examination timetable', assignedTo: 'Grace Wanjiru', priority: 'Urgent', status: 'In Progress', dueDate: '2026-10-18', source: 'Academic Office' },
  { id: 'et2', title: 'Approve boarding maintenance budget', assignedTo: 'Peter Otieno', priority: 'High', status: 'Pending', dueDate: '2026-10-20', source: 'Operations' },
  { id: 'et3', title: 'Sign KCSE submission forms', assignedTo: 'Dr. Mwangi', priority: 'Urgent', status: 'Overdue', dueDate: '2026-10-14', source: 'Examinations' },
  { id: 'et4', title: 'Parent meeting — Form 1 intake', assignedTo: 'Esther Njoroge', priority: 'Medium', status: 'Pending', dueDate: '2026-10-25', source: 'Admissions' },
  { id: 'et5', title: 'Submit safety inspection report', assignedTo: 'Peter Otieno', priority: 'Low', status: 'Completed', dueDate: '2026-10-10', source: 'Operations' },
];

const initialBriefing: BriefingItem[] = [
  { id: 'bi1', category: 'Attendance', title: '14 unexplained absences today', description: '6 students absent for 2+ consecutive days — follow-up required', severity: 'Warning', status: 'New', time: '08:30' },
  { id: 'bi2', category: 'Staffing', title: 'Mary Njoki on leave — 3 lessons uncovered', description: 'Form 2 English, Form 3 Literature, Year 6 English need substitutes', severity: 'Urgent', status: 'New', time: '07:45' },
  { id: 'bi3', category: 'Boarding', title: 'Roll call exception — Dormitory B', description: '1 student unaccounted for in Dormitory B roll call', severity: 'Urgent', status: 'Action Assigned', time: '06:30' },
  { id: 'bi4', category: 'Finance', title: 'KES 4.8M outstanding fees', description: '184 accounts with balances — 12 critical accounts above KES 50,000', severity: 'Warning', status: 'New', time: '09:00' },
  { id: 'bi5', category: 'Events', title: 'Prize Giving rehearsal at 14:00', description: 'Main Hall — all prefects and form teachers to attend', severity: 'Info', status: 'Reviewed', time: '10:00' },
  { id: 'bi6', category: 'Sports', title: 'Football fixture vs St. Mary\'s tomorrow', description: 'U16 Boys — away match, bus departs 13:00', severity: 'Info', status: 'New', time: '09:15' },
];

const initialInterventions: Intervention[] = [
  { id: 'iv1', studentName: 'Chloe Njeri', className: 'Form 2 — Tana', concern: 'Declining Maths performance — 45% in last two assessments', responsibleStaff: 'Mr. Samuel Kamau', status: 'Active', reviewDate: '2026-10-25' },
  { id: 'iv2', studentName: 'Brian Otieno', className: 'Year 8 — Acacia', concern: 'Attendance dropped to 88% — 6 absences this term', responsibleStaff: 'Mrs. Mary Njoki', status: 'Under Review', reviewDate: '2026-10-22' },
  { id: 'iv3', studentName: 'Dylan Kamau', className: 'Form 4 — Athi', concern: 'Excelling in Physics — recommend for national science fair', responsibleStaff: 'Mr. David Omondi', status: 'Proposed', reviewDate: '2026-10-30' },
];

const initialObservations: LessonObservation[] = [
  { id: 'lo1', teacher: 'Mr. Samuel Kamau', observer: 'Dr. Mwangi', className: 'Form 3 — Sabaki', subject: 'Mathematics', date: '2026-10-12', status: 'Completed', rating: 'Good' },
  { id: 'lo2', teacher: 'Mrs. Mary Njoki', observer: 'Grace Wanjiru', className: 'Year 6 — Cedar', subject: 'English', date: '2026-10-19', status: 'Scheduled', rating: 'Pending' },
];

export function useHeadteacherDemo() {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(initialApprovals);
  const [tasks, setTasks] = useState<ExecutiveTask[]>(initialTasks);
  const [briefing, setBriefing] = useState<BriefingItem[]>(initialBriefing);
  const [interventions, setInterventions] = useState<Intervention[]>(initialInterventions);
  const [observations, setObservations] = useState<LessonObservation[]>(initialObservations);

  const reviewApproval = useCallback((id: string, decision: 'Approved' | 'Rejected' | 'Returned for Correction' | 'More Info Requested') => {
    setApprovals((prev) => prev.map((a) => a.id === id ? { ...a, status: decision } : a));
    return { ok: true };
  }, []);

  const createTask = useCallback((title: string, assignedTo: string, priority: ExecutiveTask['priority'], dueDate: string) => {
    const newTask: ExecutiveTask = { id: `et${Date.now()}`, title, assignedTo, priority, status: 'Pending', dueDate, source: 'Headteacher' };
    setTasks((prev) => [...prev, newTask]);
    return { ok: true };
  }, []);

  const reviewBriefingItem = useCallback((id: string) => {
    setBriefing((prev) => prev.map((b) => b.id === id ? { ...b, status: 'Reviewed' } : b));
    return { ok: true };
  }, []);

  const createIntervention = useCallback((studentName: string, className: string, concern: string, responsibleStaff: string) => {
    const newIntervention: Intervention = { id: `iv${Date.now()}`, studentName, className, concern, responsibleStaff, status: 'Proposed', reviewDate: '2026-11-01' };
    setInterventions((prev) => [...prev, newIntervention]);
    return { ok: true };
  }, []);

  const closeIntervention = useCallback((id: string) => {
    setInterventions((prev) => prev.map((i) => i.id === id ? { ...i, status: 'Closed' } : i));
    return { ok: true };
  }, []);

  return { approvals, tasks, briefing, interventions, observations, reviewApproval, createTask, reviewBriefingItem, createIntervention, closeIntervention };
}
