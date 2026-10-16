import { useSyncExternalStore } from 'react';

export type AttendanceStatus = 'Present' | 'Late' | 'Absent';
export type WorkflowStatus = 'Draft' | 'Submitted' | 'Published' | 'Needs review';

export type TeacherStudent = {
  id: string;
  name: string;
  className: string;
  mode: 'Day' | 'Boarding';
  attendance: number;
  lastAssessment: string;
};

export type TeacherLesson = {
  id: string;
  day: string;
  date: string;
  time: string;
  subject: string;
  className: string;
  room: string;
  status: 'Ready' | 'Next' | 'Complete';
  attendance: 'Submitted' | 'Pending';
};

export type TeacherAssignment = {
  id: string;
  title: string;
  subject: string;
  className: string;
  due: string;
  submissions: number;
  total: number;
  status: WorkflowStatus;
};

export type TeacherNotification = { id: string; title: string; detail: string; unread: boolean };
export type TeacherLeave = { id: string; type: string; dates: string; reason: string; status: 'Pending' | 'Approved' | 'Returned' };
export type TeacherLessonPlan = { id: string; title: string; subject: string; className: string; date: string; status: WorkflowStatus };

export type TeacherDemoState = {
  teacher: { name: string; initials: string; department: string; subjects: string[] };
  students: TeacherStudent[];
  lessons: TeacherLesson[];
  assignments: TeacherAssignment[];
  notifications: TeacherNotification[];
  leave: TeacherLeave[];
  lessonPlans: TeacherLessonPlan[];
  attendance: Record<string, AttendanceStatus>;
  audit: string[];
};

const seed: TeacherDemoState = {
  teacher: { name: 'Samuel Kamau', initials: 'SK', department: 'STEM Department', subjects: ['Mathematics', 'Science'] },
  students: [
    { id: 'stu-001', name: 'Amani Wanjiku', className: 'Year 6 — Cedar', mode: 'Boarding', attendance: 97, lastAssessment: 'B+' },
    { id: 'stu-002', name: 'Brian Otieno', className: 'Year 6 — Cedar', mode: 'Day', attendance: 94, lastAssessment: 'A-' },
    { id: 'stu-003', name: 'Chloe Njeri', className: 'Year 6 — Cedar', mode: 'Boarding', attendance: 88, lastAssessment: 'C+' },
    { id: 'stu-004', name: 'Dylan Kamau', className: 'Year 8 — Acacia', mode: 'Day', attendance: 95, lastAssessment: 'B' },
    { id: 'stu-005', name: 'Faith Achieng', className: 'Year 8 — Acacia', mode: 'Boarding', attendance: 91, lastAssessment: 'B+' },
  ],
  lessons: [
    { id: 'lesson-001', day: 'Mon', date: '26 Oct', time: '08:00–09:00', subject: 'Mathematics', className: 'Year 6 — Cedar', room: 'Room 12', status: 'Complete', attendance: 'Submitted' },
    { id: 'lesson-002', day: 'Mon', date: '26 Oct', time: '10:00–11:00', subject: 'Science', className: 'Year 8 — Acacia', room: 'Lab 2', status: 'Next', attendance: 'Pending' },
    { id: 'lesson-003', day: 'Tue', date: '27 Oct', time: '09:00–10:00', subject: 'Mathematics', className: 'Year 8 — Acacia', room: 'Room 8', status: 'Ready', attendance: 'Pending' },
    { id: 'lesson-004', day: 'Wed', date: '28 Oct', time: '11:00–12:00', subject: 'Science', className: 'Year 6 — Cedar', room: 'Lab 1', status: 'Ready', attendance: 'Pending' },
    { id: 'lesson-005', day: 'Thu', date: '29 Oct', time: '13:00–14:00', subject: 'Mathematics', className: 'Year 6 — Cedar', room: 'Room 12', status: 'Ready', attendance: 'Pending' },
  ],
  assignments: [
    { id: 'assignment-001', title: 'Fractions and Decimals', subject: 'Mathematics', className: 'Year 6 — Cedar', due: '30 Oct 2026', submissions: 18, total: 24, status: 'Published' },
    { id: 'assignment-002', title: 'Forces investigation', subject: 'Science', className: 'Year 8 — Acacia', due: '02 Nov 2026', submissions: 11, total: 22, status: 'Published' },
    { id: 'assignment-003', title: 'Revision set: algebra', subject: 'Mathematics', className: 'Year 8 — Acacia', due: '06 Nov 2026', submissions: 0, total: 22, status: 'Draft' },
  ],
  notifications: [
    { id: 'notification-001', title: 'Marks moderation due today', detail: 'Year 6 Mathematics · 8 submissions', unread: true },
    { id: 'notification-002', title: 'Timetable change', detail: 'Science Year 8 moved to Lab 2', unread: true },
    { id: 'notification-003', title: 'Staff meeting reminder', detail: 'Academic briefing · Friday 15:30', unread: false },
  ],
  leave: [{ id: 'leave-001', type: 'Personal leave', dates: '12–13 Nov 2026', reason: 'Family appointment', status: 'Pending' }],
  lessonPlans: [
    { id: 'plan-001', title: 'Fractions on a number line', subject: 'Mathematics', className: 'Year 6 — Cedar', date: '26 Oct 2026', status: 'Submitted' },
    { id: 'plan-002', title: 'Forces and motion', subject: 'Science', className: 'Year 8 — Acacia', date: '27 Oct 2026', status: 'Draft' },
  ],
  attendance: {},
  audit: ['Samuel Kamau submitted Year 6 Mathematics attendance', 'Samuel Kamau opened the Term 3 marking queue'],
};

let state: TeacherDemoState = structuredClone(seed);
const listeners = new Set<() => void>();

function notify(): void { listeners.forEach((listener) => listener()); }

export function useTeacherDemo(): TeacherDemoState {
  return useSyncExternalStore((listener) => { listeners.add(listener); return () => listeners.delete(listener); }, () => state, () => state);
}

export const teacherDemo = {
  markAttendance(sessionId: string, studentId: string, status: AttendanceStatus): void {
    state = { ...state, attendance: { ...state.attendance, [`${sessionId}:${studentId}`]: status }, audit: [`Samuel Kamau marked ${studentId} ${status.toLowerCase()}`, ...state.audit] };
    notify();
  },
  submitAttendance(sessionId: string): void {
    state = { ...state, lessons: state.lessons.map((lesson) => lesson.id === sessionId ? { ...lesson, attendance: 'Submitted' } : lesson), audit: [`Samuel Kamau submitted attendance for ${sessionId}`, ...state.audit] };
    notify();
  },
  createAssignment(title: string, subject: string, className: string, due: string): void {
    const assignment: TeacherAssignment = { id: `assignment-${Date.now()}`, title, subject, className, due, submissions: 0, total: state.students.filter((student) => student.className === className).length || 22, status: 'Draft' };
    state = { ...state, assignments: [assignment, ...state.assignments], audit: [`Samuel Kamau created ${title}`, ...state.audit] };
    notify();
  },
  submitLessonPlan(title: string): void {
    const plan: TeacherLessonPlan = { id: `plan-${Date.now()}`, title, subject: 'Mathematics', className: 'Year 6 — Cedar', date: '30 Oct 2026', status: 'Submitted' };
    state = { ...state, lessonPlans: [plan, ...state.lessonPlans], audit: [`Samuel Kamau submitted ${title}`, ...state.audit] };
    notify();
  },
  markNotificationRead(id: string): void {
    state = { ...state, notifications: state.notifications.map((item) => item.id === id ? { ...item, unread: false } : item) };
    notify();
  },
  submitLeave(type: string, dates: string, reason: string): void {
    const request: TeacherLeave = { id: `leave-${Date.now()}`, type, dates, reason, status: 'Pending' };
    state = { ...state, leave: [request, ...state.leave], audit: [`Samuel Kamau submitted ${type}`, ...state.audit] };
    notify();
  },
  reset(): void { state = structuredClone(seed); notify(); },
};
