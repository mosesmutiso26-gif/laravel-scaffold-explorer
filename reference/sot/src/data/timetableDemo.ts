import { useSyncExternalStore } from 'react';

export type TimetableVersionStatus = 'Draft' | 'Published' | 'Archived' | 'Superseded';
export type AdjustmentStatus = 'Draft' | 'Conflict Check' | 'Awaiting Approval' | 'Approved' | 'Rejected' | 'Applied' | 'Notifications Sent' | 'Closed';
export type AdjustmentType = 'Teacher absence' | 'Lesson substitution' | 'Classroom change' | 'Period swap' | 'Lesson cancellation' | 'Lesson rescheduling' | 'Special assembly' | 'Sports rescheduling' | 'Room closure' | 'Emergency change';
export type ConflictSeverity = 'Hard' | 'Soft' | 'Warning';
export type ConflictType = 'Teacher conflict' | 'Class conflict' | 'Room conflict' | 'Venue conflict' | 'Workload exceeded' | 'Missing required lesson' | 'Lesson outside school day' | 'Period invalid';
export type SubStatus = 'Pending' | 'Assigned' | 'Applied' | 'Unresolved' | 'Reverted';

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export type Period = {
  id: string; periodNumber: number; name: string; startTime: string; endTime: string;
  isBreak: boolean; isTeaching: boolean;
};

export type TimetableEntry = {
  id: string; day: Day; periodId: string; periodName: string;
  classId: string; className: string; subjectId: string; subjectName: string;
  teacherId: string; teacherName: string; roomId: string; roomName: string;
  startTime: string; endTime: string;
};

export type TimetableVersion = {
  id: string; versionNumber: number; label: string; term: string;
  status: TimetableVersionStatus; createdBy: string; publishedBy: string | null;
  createdDate: string; publishedDate: string | null;
  entries: TimetableEntry[]; changeSummary: string;
};

export type Conflict = {
  id: string; type: ConflictType; severity: ConflictSeverity;
  description: string; affectedTeacher: string; affectedClass: string;
  affectedRoom: string; day: Day; time: string; entryIds: string[];
  resolution: string; status: 'Open' | 'Resolved' | 'Ignored';
};

export type AdjustmentRequest = {
  id: string; reference: string; type: AdjustmentType; status: AdjustmentStatus;
  reason: string; requestedBy: string; affectedVersionId: string;
  originalEntry: TimetableEntry | null; proposedChange: string;
  conflictCheckResult: string; approvedBy: string | null;
  appliedDate: string | null; notificationsSent: boolean;
  history: { date: string; action: string; actor: string; note: string }[];
};

export type SubstituteAssignment = {
  id: string; reference: string; absentTeacherId: string; absentTeacherName: string;
  substituteTeacherId: string; substituteTeacherName: string; classId: string;
  className: string; subjectName: string; day: Day; periodName: string;
  date: string; reason: string; status: SubStatus;
};

export type TeacherAbsence = {
  id: string; teacherId: string; teacherName: string; reason: string;
  startDate: string; endDate: string; affectedLessons: number;
  substitutesAssigned: number; status: 'Reported' | 'Covered' | 'Uncovered';
};

export type TimetableNotification = {
  id: string; recipient: string; title: string; detail: string; unread: boolean; date: string;
};

export type TimetableAuditEntry = {
  id: string; actor: string; action: string; target: string; timestamp: string;
};

export type TimetableDemoState = {
  periods: Period[];
  currentVersion: TimetableVersion;
  draftVersion: TimetableVersion | null;
  versions: TimetableVersion[];
  conflicts: Conflict[];
  adjustments: AdjustmentRequest[];
  substitutes: SubstituteAssignment[];
  teacherAbsences: TeacherAbsence[];
  notifications: TimetableNotification[];
  audit: TimetableAuditEntry[];
};

export const TIMETABLE_POLICIES = {
  DRAFT_DOES_NOT_REPLACE_PUBLISHED: true,
  HARD_CONFLICTS_BLOCK_PUBLICATION: true,
  OPTIMISTIC_VERSION_CONTROL: true,
  SUBSTITUTE_MUST_BE_ELIGIBLE: true,
  ADJUSTMENT_APPLIES_SEPARATE_FROM_APPROVAL: true,
  NOTIFICATION_AFTER_PUBLICATION: true,
};

const seed: TimetableDemoState = {
  periods: [
    { id: 'p1', periodNumber: 1, name: 'Period 1', startTime: '08:00', endTime: '08:40', isBreak: false, isTeaching: true },
    { id: 'p2', periodNumber: 2, name: 'Period 2', startTime: '08:40', endTime: '09:20', isBreak: false, isTeaching: true },
    { id: 'p3', periodNumber: 3, name: 'Period 3', startTime: '09:20', endTime: '10:00', isBreak: false, isTeaching: true },
    { id: 'br1', periodNumber: 0, name: 'Morning Break', startTime: '10:00', endTime: '10:30', isBreak: true, isTeaching: false },
    { id: 'p4', periodNumber: 4, name: 'Period 4', startTime: '10:30', endTime: '11:10', isBreak: false, isTeaching: true },
    { id: 'p5', periodNumber: 5, name: 'Period 5', startTime: '11:10', endTime: '11:50', isBreak: false, isTeaching: true },
    { id: 'p6', periodNumber: 6, name: 'Period 6', startTime: '11:50', endTime: '12:30', isBreak: false, isTeaching: true },
    { id: 'ln1', periodNumber: 0, name: 'Lunch Break', startTime: '12:30', endTime: '13:30', isBreak: true, isTeaching: false },
    { id: 'p7', periodNumber: 7, name: 'Period 7', startTime: '13:30', endTime: '14:10', isBreak: false, isTeaching: true },
    { id: 'p8', periodNumber: 8, name: 'Period 8', startTime: '14:10', endTime: '14:50', isBreak: false, isTeaching: true },
  ],
  currentVersion: {
    id: 'ver-001', versionNumber: 1, label: 'Term 3 2026 — Published', term: 'Term 3 2026',
    status: 'Published', createdBy: 'Administrator', publishedBy: 'Principal',
    createdDate: '01 Sep 2026', publishedDate: '02 Sep 2026', changeSummary: 'Initial published timetable for Term 3.',
    entries: [
      { id: 'te-001', day: 'Monday', periodId: 'p1', periodName: 'Period 1', classId: 'cls-f4a', className: 'Form 4 — Athi', subjectId: 'sub-math', subjectName: 'Mathematics', teacherId: 'tch-001', teacherName: 'Mrs. Cheruiyot', roomId: 'rm-cl-1', roomName: 'Classroom 1', startTime: '08:00', endTime: '08:40' },
      { id: 'te-002', day: 'Monday', periodId: 'p2', periodName: 'Period 2', classId: 'cls-f4a', className: 'Form 4 — Athi', subjectId: 'sub-eng', subjectName: 'English', teacherId: 'tch-002', teacherName: 'Mr. Odhiambo', roomId: 'rm-cl-1', roomName: 'Classroom 1', startTime: '08:40', endTime: '09:20' },
      { id: 'te-003', day: 'Monday', periodId: 'p3', periodName: 'Period 3', classId: 'cls-f4a', className: 'Form 4 — Athi', subjectId: 'sub-phy', subjectName: 'Physics', teacherId: 'tch-003', teacherName: 'Mr. Kiprop', roomId: 'rm-lab-1', roomName: 'Physics Lab', startTime: '09:20', endTime: '10:00' },
      { id: 'te-004', day: 'Monday', periodId: 'p4', periodName: 'Period 4', classId: 'cls-f3t', className: 'Form 3 — Tana', subjectId: 'sub-math', subjectName: 'Mathematics', teacherId: 'tch-001', teacherName: 'Mrs. Cheruiyot', roomId: 'rm-cl-3', roomName: 'Classroom 3', startTime: '10:30', endTime: '11:10' },
      { id: 'te-005', day: 'Monday', periodId: 'p5', periodName: 'Period 5', classId: 'cls-f3t', className: 'Form 3 — Tana', subjectId: 'sub-bio', subjectName: 'Biology', teacherId: 'tch-004', teacherName: 'Ms. Wairimu', roomId: 'rm-lab-2', roomName: 'Biology Lab', startTime: '11:10', endTime: '11:50' },
      { id: 'te-006', day: 'Monday', periodId: 'p6', periodName: 'Period 6', classId: 'cls-f4a', className: 'Form 4 — Athi', subjectId: 'sub-chem', subjectName: 'Chemistry', teacherId: 'tch-005', teacherName: 'Dr. Mutua', roomId: 'rm-lab-3', roomName: 'Chemistry Lab', startTime: '11:50', endTime: '12:30' },
      { id: 'te-007', day: 'Monday', periodId: 'p7', periodName: 'Period 7', classId: 'cls-f3t', className: 'Form 3 — Tana', subjectId: 'sub-eng', subjectName: 'English', teacherId: 'tch-002', teacherName: 'Mr. Odhiambo', roomId: 'rm-cl-3', roomName: 'Classroom 3', startTime: '13:30', endTime: '14:10' },
      { id: 'te-008', day: 'Monday', periodId: 'p8', periodName: 'Period 8', classId: 'cls-f4a', className: 'Form 4 — Athi', subjectId: 'sub-geo', subjectName: 'Geography', teacherId: 'tch-006', teacherName: 'Ms. Akinyi', roomId: 'rm-cl-1', roomName: 'Classroom 1', startTime: '14:10', endTime: '14:50' },
      { id: 'te-009', day: 'Tuesday', periodId: 'p1', periodName: 'Period 1', classId: 'cls-f3t', className: 'Form 3 — Tana', subjectId: 'sub-math', subjectName: 'Mathematics', teacherId: 'tch-001', teacherName: 'Mrs. Cheruiyot', roomId: 'rm-cl-3', roomName: 'Classroom 3', startTime: '08:00', endTime: '08:40' },
      { id: 'te-010', day: 'Tuesday', periodId: 'p2', periodName: 'Period 2', classId: 'cls-f4a', className: 'Form 4 — Athi', subjectId: 'sub-eng', subjectName: 'English', teacherId: 'tch-002', teacherName: 'Mr. Odhiambo', roomId: 'rm-cl-1', roomName: 'Classroom 1', startTime: '08:40', endTime: '09:20' },
      { id: 'te-011', day: 'Wednesday', periodId: 'p1', periodName: 'Period 1', classId: 'cls-f4a', className: 'Form 4 — Athi', subjectId: 'sub-math', subjectName: 'Mathematics', teacherId: 'tch-001', teacherName: 'Mrs. Cheruiyot', roomId: 'rm-cl-1', roomName: 'Classroom 1', startTime: '08:00', endTime: '08:40' },
      { id: 'te-012', day: 'Wednesday', periodId: 'p2', periodName: 'Period 2', classId: 'cls-f3t', className: 'Form 3 — Tana', subjectId: 'sub-phy', subjectName: 'Physics', teacherId: 'tch-003', teacherName: 'Mr. Kiprop', roomId: 'rm-lab-1', roomName: 'Physics Lab', startTime: '08:40', endTime: '09:20' },
    ],
  },
  draftVersion: {
    id: 'ver-002', versionNumber: 2, label: 'Term 3 2026 — Draft with conflicts', term: 'Term 3 2026',
    status: 'Draft', createdBy: 'Administrator', publishedBy: null,
    createdDate: '15 Oct 2026', publishedDate: null, changeSummary: 'Draft with deliberate teacher and room conflicts for testing.',
    entries: [
      { id: 'td-001', day: 'Monday', periodId: 'p1', periodName: 'Period 1', classId: 'cls-f4a', className: 'Form 4 — Athi', subjectId: 'sub-math', subjectName: 'Mathematics', teacherId: 'tch-001', teacherName: 'Mrs. Cheruiyot', roomId: 'rm-cl-1', roomName: 'Classroom 1', startTime: '08:00', endTime: '08:40' },
      { id: 'td-002', day: 'Monday', periodId: 'p1', periodName: 'Period 1', classId: 'cls-f3t', className: 'Form 3 — Tana', subjectId: 'sub-math', subjectName: 'Mathematics', teacherId: 'tch-001', teacherName: 'Mrs. Cheruiyot', roomId: 'rm-cl-2', roomName: 'Classroom 2', startTime: '08:00', endTime: '08:40' },
      { id: 'td-003', day: 'Monday', periodId: 'p2', periodName: 'Period 2', classId: 'cls-f4a', className: 'Form 4 — Athi', subjectId: 'sub-eng', subjectName: 'English', teacherId: 'tch-002', teacherName: 'Mr. Odhiambo', roomId: 'rm-cl-1', roomName: 'Classroom 1', startTime: '08:40', endTime: '09:20' },
      { id: 'td-004', day: 'Monday', periodId: 'p3', periodName: 'Period 3', classId: 'cls-f4a', className: 'Form 4 — Athi', subjectId: 'sub-phy', subjectName: 'Physics', teacherId: 'tch-003', teacherName: 'Mr. Kiprop', roomId: 'rm-lab-1', roomName: 'Physics Lab', startTime: '09:20', endTime: '10:00' },
      { id: 'td-005', day: 'Monday', periodId: 'p3', periodName: 'Period 3', classId: 'cls-f3t', className: 'Form 3 — Tana', subjectId: 'sub-phy', subjectName: 'Physics', teacherId: 'tch-003', teacherName: 'Mr. Kiprop', roomId: 'rm-lab-1', roomName: 'Physics Lab', startTime: '09:20', endTime: '10:00' },
    ],
  },
  versions: [
    { id: 'ver-000', versionNumber: 0, label: 'Term 2 2026 — Archived', term: 'Term 2 2026', status: 'Archived', createdBy: 'Administrator', publishedBy: 'Principal', createdDate: '01 May 2026', publishedDate: '03 May 2026', changeSummary: 'Previous term timetable.', entries: [] },
  ],
  conflicts: [
    { id: 'cf-001', type: 'Teacher conflict', severity: 'Hard', description: 'Mrs. Cheruiyot is assigned to Form 4 — Athi and Form 3 — Tana simultaneously in Period 1 on Monday.', affectedTeacher: 'Mrs. Cheruiyot', affectedClass: 'Form 4 — Athi, Form 3 — Tana', affectedRoom: '—', day: 'Monday', time: '08:00–08:40', entryIds: ['td-001', 'td-002'], resolution: 'Reassign one lesson to a different teacher or period.', status: 'Open' },
    { id: 'cf-002', type: 'Room conflict', severity: 'Hard', description: 'Physics Lab is booked for Form 4 — Athi and Form 3 — Tana simultaneously in Period 3 on Monday.', affectedTeacher: 'Mr. Kiprop', affectedClass: 'Form 4 — Athi, Form 3 — Tana', affectedRoom: 'Physics Lab', day: 'Monday', time: '09:20–10:00', entryIds: ['td-004', 'td-005'], resolution: 'Move one lesson to a different room or period.', status: 'Open' },
  ],
  adjustments: [
    { id: 'adj-001', reference: 'ADJ-001', type: 'Teacher absence', status: 'Awaiting Approval', reason: 'Mrs. Cheruiyot on medical leave for 2 days.', requestedBy: 'Mr. Kiprop', affectedVersionId: 'ver-001', originalEntry: { id: 'te-001', day: 'Monday', periodId: 'p1', periodName: 'Period 1', classId: 'cls-f4a', className: 'Form 4 — Athi', subjectId: 'sub-math', subjectName: 'Mathematics', teacherId: 'tch-001', teacherName: 'Mrs. Cheruiyot', roomId: 'rm-cl-1', roomName: 'Classroom 1', startTime: '08:00', endTime: '08:40' }, proposedChange: 'Replace Mrs. Cheruiyot with Mr. Kiprop for Mathematics Period 1 on Monday.', conflictCheckResult: 'No conflicts — Mr. Kiprop is available in Period 1 on Monday.', approvedBy: null, appliedDate: null, notificationsSent: false, history: [{ date: '15 Oct 2026', action: 'Draft', actor: 'Mr. Kiprop', note: 'Teacher absence adjustment created' }, { date: '15 Oct 2026', action: 'Conflict Check', actor: 'System', note: 'No conflicts found' }] },
    { id: 'adj-002', reference: 'ADJ-002', type: 'Classroom change', status: 'Applied', reason: 'Physics Lab under maintenance for Period 3 on Tuesday.', requestedBy: 'Mr. Kiprop', affectedVersionId: 'ver-001', originalEntry: { id: 'te-012', day: 'Wednesday', periodId: 'p2', periodName: 'Period 2', classId: 'cls-f3t', className: 'Form 3 — Tana', subjectId: 'sub-phy', subjectName: 'Physics', teacherId: 'tch-003', teacherName: 'Mr. Kiprop', roomId: 'rm-lab-1', roomName: 'Physics Lab', startTime: '08:40', endTime: '09:20' }, proposedChange: 'Move Physics from Physics Lab to Classroom 2 for Period 2 Wednesday.', conflictCheckResult: 'No conflicts — Classroom 2 is available.', approvedBy: 'Principal', appliedDate: '14 Oct 2026', notificationsSent: true, history: [{ date: '13 Oct 2026', action: 'Draft', actor: 'Mr. Kiprop', note: 'Room change requested' }, { date: '13 Oct 2026', action: 'Approved', actor: 'Principal', note: 'Approved' }, { date: '14 Oct 2026', action: 'Applied', actor: 'Administrator', note: 'Change applied to published timetable' }, { date: '14 Oct 2026', action: 'Notifications Sent', actor: 'System', note: 'Affected teachers and classes notified' }] },
  ],
  substitutes: [
    { id: 'sub-001', reference: 'SUB-001', absentTeacherId: 'tch-002', absentTeacherName: 'Mr. Odhiambo', substituteTeacherId: 'tch-006', substituteTeacherName: 'Ms. Akinyi', classId: 'cls-f3t', className: 'Form 3 — Tana', subjectName: 'English', day: 'Tuesday', periodName: 'Period 7', date: '14 Oct 2026', reason: 'Mr. Odhiambo on official duty', status: 'Applied' },
    { id: 'sub-002', reference: 'SUB-002', absentTeacherId: 'tch-001', absentTeacherName: 'Mrs. Cheruiyot', substituteTeacherId: '', substituteTeacherName: '', classId: 'cls-f4a', className: 'Form 4 — Athi', subjectName: 'Mathematics', day: 'Monday', periodName: 'Period 1', date: '16 Oct 2026', reason: 'Medical leave — awaiting substitute', status: 'Unresolved' },
  ],
  teacherAbsences: [
    { id: 'tabs-001', teacherId: 'tch-001', teacherName: 'Mrs. Cheruiyot', reason: 'Medical leave', startDate: '16 Oct 2026', endDate: '17 Oct 2026', affectedLessons: 4, substitutesAssigned: 0, status: 'Uncovered' },
    { id: 'tabs-002', teacherId: 'tch-002', teacherName: 'Mr. Odhiambo', reason: 'Official duty', startDate: '14 Oct 2026', endDate: '14 Oct 2026', affectedLessons: 2, substitutesAssigned: 1, status: 'Covered' },
  ],
  notifications: [
    { id: 'tn-001', recipient: 'Mrs. Cheruiyot', title: 'Timetable adjustment', detail: 'Your Mathematics Period 1 on Monday is proposed for substitution. Review required.', unread: true, date: '15 Oct 2026' },
    { id: 'tn-002', recipient: 'Mr. Kiprop', title: 'Room change applied', detail: 'Physics moved from Physics Lab to Classroom 2 for Period 2 Wednesday.', unread: false, date: '14 Oct 2026' },
    { id: 'tn-003', recipient: 'Form 3 — Tana', title: 'Substitution notice', detail: 'English Period 7 on Tuesday — Mr. Odhiambo replaced by Ms. Akinyi.', unread: true, date: '14 Oct 2026' },
    { id: 'tn-004', recipient: 'Administrator', title: 'Unresolved substitute', detail: 'SUB-002: No eligible substitute found for Mrs. Cheruiyot — Mathematics Period 1 Monday.', unread: true, date: '15 Oct 2026' },
  ],
  audit: [
    { id: 'ta-001', actor: 'Administrator', action: 'Published timetable', target: 'Version 1 — Term 3 2026', timestamp: '02 Sep 2026, 10:00' },
    { id: 'ta-002', actor: 'Mr. Kiprop', action: 'Created adjustment', target: 'ADJ-001 — Teacher absence', timestamp: '15 Oct 2026, 09:00' },
    { id: 'ta-003', actor: 'Principal', action: 'Approved adjustment', target: 'ADJ-002 — Classroom change', timestamp: '13 Oct 2026, 14:00' },
    { id: 'ta-004', actor: 'Administrator', action: 'Applied adjustment', target: 'ADJ-002 — Room change applied', timestamp: '14 Oct 2026, 08:00' },
  ],
};

let state: TimetableDemoState = structuredClone(seed);
const listeners = new Set<() => void>();
function notify() { listeners.forEach((l) => l()); }
function subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l); }; }
function getSnapshot() { return state; }
export function useTimetableDemo() { return useSyncExternalStore(subscribe, getSnapshot, getSnapshot); }
function audit(action: string, target: string, actor = 'Administrator') {
  state.audit.unshift({ id: `ta-${Date.now()}`, actor, action, target, timestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) });
}
function nextId(prefix: string) { return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`; }

export const timetableDemo = {
  addTimetableEntry(versionId: string, day: Day, periodId: string, className: string, subjectName: string, teacherName: string, roomName: string): { ok: boolean; error?: string } {
    const period = state.periods.find((p) => p.id === periodId);
    if (!period) return { ok: false, error: 'Period not found.' };
    const version = versionId === state.currentVersion.id ? state.currentVersion : state.draftVersion;
    if (!version) return { ok: false, error: 'Version not found.' };
    const entry: TimetableEntry = { id: nextId('te'), day, periodId, periodName: period.name, classId: `cls-${Date.now()}`, className, subjectId: `sub-${Date.now()}`, subjectName, teacherId: `tch-${Date.now()}`, teacherName, roomId: `rm-${Date.now()}`, roomName, startTime: period.startTime, endTime: period.endTime };
    version.entries.push(entry);
    audit('Added entry', `${className} ${subjectName} ${day} ${period.name}`); notify();
    return { ok: true };
  },
  runConflictCheck(versionId: string): Conflict[] {
    const version = versionId === state.currentVersion.id ? state.currentVersion : state.draftVersion;
    if (!version) return [];
    const found: Conflict[] = [];
    const byDayPeriod = new Map<string, TimetableEntry[]>();
    for (const e of version.entries) {
      const key = `${e.day}|${e.periodId}`;
      if (!byDayPeriod.has(key)) byDayPeriod.set(key, []);
      byDayPeriod.get(key)!.push(e);
    }
    for (const [key, entries] of byDayPeriod) {
      if (entries.length < 2) continue;
      const [day, periodId] = key.split('|');
      const period = state.periods.find((p) => p.id === periodId);
      const time = period ? `${period.startTime}–${period.endTime}` : '';
      // Teacher conflicts
      for (let i = 0; i < entries.length; i++) for (let j = i + 1; j < entries.length; j++) {
        if (entries[i].teacherId === entries[j].teacherId) found.push({ id: nextId('cf'), type: 'Teacher conflict', severity: 'Hard', description: `${entries[i].teacherName} assigned to ${entries[i].className} and ${entries[j].className} simultaneously in ${period?.name} on ${day}.`, affectedTeacher: entries[i].teacherName, affectedClass: `${entries[i].className}, ${entries[j].className}`, affectedRoom: '—', day: day as Day, time, entryIds: [entries[i].id, entries[j].id], resolution: 'Reassign one lesson to a different teacher or period.', status: 'Open' });
      }
      // Room conflicts
      for (let i = 0; i < entries.length; i++) for (let j = i + 1; j < entries.length; j++) {
        if (entries[i].roomId === entries[j].roomId) found.push({ id: nextId('cf'), type: 'Room conflict', severity: 'Hard', description: `${entries[i].roomName} booked for ${entries[i].className} and ${entries[j].className} simultaneously in ${period?.name} on ${day}.`, affectedTeacher: '', affectedClass: `${entries[i].className}, ${entries[j].className}`, affectedRoom: entries[i].roomName, day: day as Day, time, entryIds: [entries[i].id, entries[j].id], resolution: 'Move one lesson to a different room or period.', status: 'Open' });
      }
      // Class conflicts
      for (let i = 0; i < entries.length; i++) for (let j = i + 1; j < entries.length; j++) {
        if (entries[i].classId === entries[j].classId) found.push({ id: nextId('cf'), type: 'Class conflict', severity: 'Hard', description: `${entries[i].className} has two lessons (${entries[i].subjectName} and ${entries[j].subjectName}) in ${period?.name} on ${day}.`, affectedTeacher: '', affectedClass: entries[i].className, affectedRoom: '', day: day as Day, time, entryIds: [entries[i].id, entries[j].id], resolution: 'Reschedule one lesson to a different period.', status: 'Open' });
      }
    }
    if (versionId === state.draftVersion?.id) state.conflicts = found;
    else state.conflicts = found;
    audit('Ran conflict check', `${version.label} — ${found.length} conflict(s)`); notify();
    return found;
  },
  publishDraft(): { ok: boolean; error?: string } {
    if (!state.draftVersion) return { ok: false, error: 'No draft version to publish.' };
    const hardConflicts = state.conflicts.filter((c) => c.severity === 'Hard' && c.status === 'Open');
    if (hardConflicts.length > 0) return { ok: false, error: `${hardConflicts.length} hard conflict(s) must be resolved before publication.` };
    state.currentVersion.status = 'Superseded';
    state.versions.unshift({ ...state.currentVersion, entries: [...state.currentVersion.entries] });
    state.draftVersion.status = 'Published'; state.draftVersion.publishedBy = 'Principal'; state.draftVersion.publishedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    state.currentVersion = state.draftVersion; state.draftVersion = null;
    audit('Published timetable', state.currentVersion.label, 'Principal'); notify();
    return { ok: true };
  },
  createAdjustment(type: AdjustmentType, reason: string, requestedBy: string, proposedChange: string, originalEntry: TimetableEntry | null): { ok: boolean; error?: string } {
    if (!reason.trim()) return { ok: false, error: 'Reason is required.' };
    const ref = `ADJ-${String(state.adjustments.length + 1).padStart(3, '0')}`;
    state.adjustments.unshift({ id: nextId('adj'), reference: ref, type, status: 'Draft', reason, requestedBy, affectedVersionId: state.currentVersion.id, originalEntry, proposedChange, conflictCheckResult: '', approvedBy: null, appliedDate: null, notificationsSent: false, history: [{ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: 'Draft', actor: requestedBy, note: reason }] });
    audit('Created adjustment', ref, requestedBy); notify();
    return { ok: true };
  },
  runAdjustmentConflictCheck(id: string): { ok: boolean; error?: string; conflicts?: string } {
    const adj = state.adjustments.find((a) => a.id === id);
    if (!adj) return { ok: false, error: 'Adjustment not found.' };
    adj.status = 'Conflict Check';
    adj.conflictCheckResult = 'No conflicts found — proposed change is valid.';
    adj.history.push({ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: 'Conflict Check', actor: 'System', note: adj.conflictCheckResult });
    audit('Conflict check', adj.reference); notify();
    return { ok: true, conflicts: adj.conflictCheckResult };
  },
  approveAdjustment(id: string, actor: string): { ok: boolean; error?: string } {
    const adj = state.adjustments.find((a) => a.id === id);
    if (!adj) return { ok: false, error: 'Adjustment not found.' };
    if (adj.status !== 'Conflict Check' && adj.status !== 'Awaiting Approval') return { ok: false, error: `Cannot approve a ${adj.status} adjustment.` };
    adj.status = 'Approved'; adj.approvedBy = actor;
    adj.history.push({ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: 'Approved', actor, note: 'Adjustment approved' });
    audit('Approved adjustment', adj.reference, actor); notify();
    return { ok: true };
  },
  rejectAdjustment(id: string, actor: string, reason: string): { ok: boolean; error?: string } {
    const adj = state.adjustments.find((a) => a.id === id);
    if (!adj) return { ok: false, error: 'Adjustment not found.' };
    adj.status = 'Rejected';
    adj.history.push({ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: 'Rejected', actor, note: reason });
    audit('Rejected adjustment', adj.reference, actor); notify();
    return { ok: true };
  },
  applyAdjustment(id: string): { ok: boolean; error?: string } {
    const adj = state.adjustments.find((a) => a.id === id);
    if (!adj) return { ok: false, error: 'Adjustment not found.' };
    if (adj.status !== 'Approved') return { ok: false, error: 'Only approved adjustments can be applied.' };
    adj.status = 'Applied'; adj.appliedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    adj.history.push({ date: adj.appliedDate, action: 'Applied', actor: 'Administrator', note: 'Change applied to published timetable' });
    audit('Applied adjustment', adj.reference); notify();
    return { ok: true };
  },
  sendAdjustmentNotifications(id: string): { ok: boolean; error?: string } {
    const adj = state.adjustments.find((a) => a.id === id);
    if (!adj) return { ok: false, error: 'Adjustment not found.' };
    if (adj.status !== 'Applied') return { ok: false, error: 'Notifications can only be sent after application.' };
    adj.status = 'Notifications Sent'; adj.notificationsSent = true;
    adj.history.push({ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: 'Notifications Sent', actor: 'System', note: 'Affected users notified' });
    audit('Sent notifications', adj.reference); notify();
    return { ok: true };
  },
  closeAdjustment(id: string): { ok: boolean; error?: string } {
    const adj = state.adjustments.find((a) => a.id === id);
    if (!adj) return { ok: false, error: 'Adjustment not found.' };
    adj.status = 'Closed';
    adj.history.push({ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: 'Closed', actor: 'Administrator', note: 'Adjustment closed' });
    audit('Closed adjustment', adj.reference); notify();
    return { ok: true };
  },
  assignSubstitute(absentTeacherId: string, absentTeacherName: string, substituteTeacherId: string, substituteTeacherName: string, className: string, subjectName: string, day: Day, periodName: string, reason: string): { ok: boolean; error?: string } {
    const ref = `SUB-${String(state.substitutes.length + 1).padStart(3, '0')}`;
    state.substitutes.unshift({ id: nextId('sub'), reference: ref, absentTeacherId, absentTeacherName, substituteTeacherId, substituteTeacherName, classId: '', className, subjectName, day, periodName, date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), reason, status: 'Assigned' });
    audit('Assigned substitute', `${ref} — ${substituteTeacherName} for ${absentTeacherName}`); notify();
    return { ok: true };
  },
  applySubstitute(id: string): { ok: boolean; error?: string } {
    const sub = state.substitutes.find((s) => s.id === id);
    if (!sub) return { ok: false, error: 'Substitute assignment not found.' };
    sub.status = 'Applied';
    audit('Applied substitute', sub.reference); notify();
    return { ok: true };
  },
  markNotificationRead(id: string): void {
    const n = state.notifications.find((x) => x.id === id);
    if (n) { n.unread = false; notify(); }
  },
  reset(): void { state = structuredClone(seed); notify(); },
};
