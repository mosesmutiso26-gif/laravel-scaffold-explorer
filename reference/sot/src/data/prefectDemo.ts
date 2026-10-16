import { useSyncExternalStore } from 'react';

// ============ Types ============

export type PrefectPositionStatus = 'Active' | 'Inactive' | 'Reserved';
export type AppointmentStatus = 'Draft' | 'Nominated' | 'Under Review' | 'Approved' | 'Active' | 'Completed' | 'Renewed' | 'Ended';
export type DutyStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Incomplete' | 'Cancelled' | 'Rescheduled';
export type TaskStatus = 'Assigned' | 'Acknowledged' | 'In Progress' | 'Submitted' | 'Reviewed' | 'Completed' | 'Returned' | 'Overdue';
export type TaskPriority = 'Low' | 'Normal' | 'High' | 'Urgent';
export type IncidentUrgency = 'Low' | 'Medium' | 'High' | 'Critical';
export type IncidentStatus = 'Submitted' | 'Under Review' | 'Actioned' | 'Escalated' | 'Closed';
export type IncidentCategory = 'Duty issue' | 'Damaged facility' | 'Safety hazard' | 'Bullying concern' | 'Lost property' | 'Welfare concern' | 'Request for assistance';

export type PrefectPosition = {
  id: string;
  title: string;
  category: string;
  description: string;
  exclusive: boolean;
  houseAssignment: string | null;
  dormAssignment: string | null;
  classAssignment: string | null;
  status: PrefectPositionStatus;
};

export type PrefectAppointment = {
  id: string;
  positionId: string;
  positionTitle: string;
  studentId: string;
  studentName: string;
  className: string;
  house: string;
  startDate: string;
  endDate: string | null;
  status: AppointmentStatus;
  supervisor: string;
  probation: boolean;
  probationEndDate: string | null;
  reviewDate: string | null;
  appointedBy: string;
  approvedBy: string | null;
  appointmentLetter: string;
  reason: string;
  replacementFor: string | null;
  handoverCompleted: boolean;
  history: { date: string; action: string; actor: string; note: string }[];
};

export type DutyType = {
  id: string;
  name: string;
  description: string;
  shift: 'Morning' | 'Break' | 'Lunch' | 'Evening' | 'Boarding' | 'Special';
  location: string;
  recurring: boolean;
};

export type DutyAssignment = {
  id: string;
  dutyTypeId: string;
  dutyName: string;
  shift: string;
  location: string;
  prefectId: string;
  prefectName: string;
  date: string;
  startTime: string;
  endTime: string;
  supervisor: string;
  status: DutyStatus;
  completionNote: string;
  absenceReason: string;
  replacementName: string | null;
  team: string[];
};

export type PrefectTask = {
  id: string;
  title: string;
  description: string;
  prefectId: string;
  prefectName: string;
  dueDate: string;
  priority: TaskPriority;
  location: string;
  instructions: string;
  status: TaskStatus;
  submittedNote: string;
  reviewNote: string;
  reviewedBy: string | null;
  createdBy: string;
  createdDate: string;
};

export type PrefectIncident = {
  id: string;
  reference: string;
  category: IncidentCategory;
  urgency: IncidentUrgency;
  description: string;
  location: string;
  reportedBy: string;
  reporterRole: string;
  assignedTo: string;
  status: IncidentStatus;
  date: string;
  time: string;
  confidential: boolean;
  actionTaken: string;
  resolution: string;
  history: { date: string; action: string; actor: string; note: string }[];
};

export type TrainingSession = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: string[];
  status: 'Scheduled' | 'Completed' | 'Cancelled';
};

export type PrefectAnnouncement = {
  id: string;
  title: string;
  detail: string;
  postedBy: string;
  date: string;
  audience: 'All prefects' | 'House prefects' | 'Class prefects' | 'Boarding prefects';
};

export type PrefectNotification = {
  id: string;
  recipient: string;
  title: string;
  detail: string;
  unread: boolean;
  date: string;
};

export type PrefectAuditEntry = {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
};

export type PrefectDemoState = {
  positions: PrefectPosition[];
  appointments: PrefectAppointment[];
  dutyTypes: DutyType[];
  duties: DutyAssignment[];
  tasks: PrefectTask[];
  incidents: PrefectIncident[];
  trainingSessions: TrainingSession[];
  announcements: PrefectAnnouncement[];
  notifications: PrefectNotification[];
  audit: PrefectAuditEntry[];
};

// ============ Policies ============

export const PREFECT_POLICIES = {
  STUDENTS_CANNOT_SELF_APPOINT: true,
  INACTIVE_PREFECT_NO_NEW_DUTIES: true,
  EXCLUSIVE_POSITION_SINGLE_ACTIVE: true,
  DUTY_OVERLAP_DETECTION: true,
  PROBATION_REVIEW_DEFAULT: '30 days',
  CONFIDENTIAL_REPORTS_RESTRICTED: true,
  PREFECTS_NO_DISCIPLINARY_AUTHORITY: true,
};

// ============ Seed Data ============

const seed: PrefectDemoState = {
  positions: [
    { id: 'pos-001', title: 'Head Prefect', category: 'School Leadership', description: 'Oversee all prefects and represent the student body.', exclusive: true, houseAssignment: null, dormAssignment: null, classAssignment: null, status: 'Active' },
    { id: 'pos-002', title: 'Deputy Head Prefect', category: 'School Leadership', description: 'Assist the head prefect and deputize in their absence.', exclusive: true, houseAssignment: null, dormAssignment: null, classAssignment: null, status: 'Active' },
    { id: 'pos-003', title: 'Boarding Prefect', category: 'Boarding', description: 'Oversee boarding house routines and assist matrons.', exclusive: false, houseAssignment: 'Cedar House', dormAssignment: 'Cedar Dormitory A', classAssignment: null, status: 'Active' },
    { id: 'pos-004', title: 'Dormitory Prefect — Acacia', category: 'Boarding', description: 'Manage dormitory-level duties for Acacia House.', exclusive: false, houseAssignment: 'Acacia House', dormAssignment: 'Acacia Dormitory B', classAssignment: null, status: 'Active' },
    { id: 'pos-005', title: 'Class Prefect — Form 4 Athi', category: 'Academic', description: 'Assist Form 4 Athi class teacher with daily routines.', exclusive: true, houseAssignment: null, dormAssignment: null, classAssignment: 'Form 4 — Athi', status: 'Active' },
    { id: 'pos-006', title: 'Games & Sports Prefect', category: 'Sports', description: 'Coordinate sports activities and assist games teachers.', exclusive: true, houseAssignment: null, dormAssignment: null, classAssignment: null, status: 'Active' },
    { id: 'pos-007', title: 'Library Prefect', category: 'Library', description: 'Assist the librarian with library order and discipline.', exclusive: false, houseAssignment: null, dormAssignment: null, classAssignment: null, status: 'Active' },
    { id: 'pos-008', title: 'Dining Hall Prefect', category: 'Operations', description: 'Oversee dining hall秩序 and cleanliness during meals.', exclusive: false, houseAssignment: null, dormAssignment: null, classAssignment: null, status: 'Inactive' },
    { id: 'pos-009', title: 'Sanitation Prefect', category: 'Operations', description: 'Monitor school compound cleanliness and sanitation.', exclusive: false, houseAssignment: null, dormAssignment: null, classAssignment: null, status: 'Active' },
  ],

  appointments: [
    {
      id: 'apt-001', positionId: 'pos-001', positionTitle: 'Head Prefect',
      studentId: 'stu-010', studentName: 'Daniel Mwangi', className: 'Form 4 — Athi', house: 'Cedar House',
      startDate: '01 Sep 2026', endDate: '31 Jul 2027', status: 'Active',
      supervisor: 'Mr. Kiprop', probation: false, probationEndDate: null, reviewDate: '15 Jan 2027',
      appointedBy: 'Principal', approvedBy: 'Principal', appointmentLetter: 'APT-001-HEAD',
      reason: 'Elected by student council and approved by school leadership.', replacementFor: null, handoverCompleted: true,
      history: [
        { date: '20 Aug 2026', action: 'Nominated', actor: 'Student Council', note: 'Nominated by peers' },
        { date: '28 Aug 2026', action: 'Under Review', actor: 'Mr. Kiprop', note: 'Interview conducted' },
        { date: '01 Sep 2026', action: 'Approved', actor: 'Principal', note: 'Appointed as Head Prefect' },
      ],
    },
    {
      id: 'apt-002', positionId: 'pos-002', positionTitle: 'Deputy Head Prefect',
      studentId: 'stu-011', studentName: 'Esther Nyambura', className: 'Form 4 — Athi', house: 'Acacia House',
      startDate: '01 Sep 2026', endDate: '31 Jul 2027', status: 'Active',
      supervisor: 'Mr. Kiprop', probation: false, probationEndDate: null, reviewDate: '15 Jan 2027',
      appointedBy: 'Principal', approvedBy: 'Principal', appointmentLetter: 'APT-002-DEP',
      reason: 'Selected through interview process.', replacementFor: null, handoverCompleted: true,
      history: [
        { date: '22 Aug 2026', action: 'Nominated', actor: 'Student Council', note: 'Nominated by peers' },
        { date: '29 Aug 2026', action: 'Under Review', actor: 'Mr. Kiprop', note: 'Interview conducted' },
        { date: '01 Sep 2026', action: 'Approved', actor: 'Principal', note: 'Appointed as Deputy Head Prefect' },
      ],
    },
    {
      id: 'apt-003', positionId: 'pos-003', positionTitle: 'Boarding Prefect',
      studentId: 'stu-012', studentName: 'Felix Otieno', className: 'Form 3 — Tana', house: 'Cedar House',
      startDate: '01 Sep 2026', endDate: '31 Jul 2027', status: 'Active',
      supervisor: 'Ms. Wairimu', probation: true, probationEndDate: '01 Oct 2026', reviewDate: '01 Oct 2026',
      appointedBy: 'Ms. Wairimu', approvedBy: 'Principal', appointmentLetter: 'APT-003-BRD',
      reason: 'Selected for boarding leadership qualities.', replacementFor: null, handoverCompleted: false,
      history: [
        { date: '25 Aug 2026', action: 'Nominated', actor: 'Ms. Wairimu', note: 'Recommended by housemistress' },
        { date: '01 Sep 2026', action: 'Approved', actor: 'Principal', note: 'Appointed with 30-day probation' },
      ],
    },
    {
      id: 'apt-004', positionId: 'pos-005', positionTitle: 'Class Prefect — Form 4 Athi',
      studentId: 'stu-013', studentName: 'Grace Achieng', className: 'Form 4 — Athi', house: 'Cedar House',
      startDate: '01 Sep 2026', endDate: '31 Jul 2027', status: 'Active',
      supervisor: 'Mrs. Cheruiyot', probation: false, probationEndDate: null, reviewDate: '10 Dec 2026',
      appointedBy: 'Mrs. Cheruiyot', approvedBy: 'Principal', appointmentLetter: 'APT-004-CLS',
      reason: 'Selected by class teacher for academic excellence and leadership.', replacementFor: null, handoverCompleted: true,
      history: [
        { date: '28 Aug 2026', action: 'Approved', actor: 'Mrs. Cheruiyot', note: 'Selected for class leadership' },
      ],
    },
    {
      id: 'apt-005', positionId: 'pos-006', positionTitle: 'Games & Sports Prefect',
      studentId: 'stu-014', studentName: 'Henry Kamau', className: 'Form 3 — Tana', house: 'Acacia House',
      startDate: '01 Sep 2026', endDate: '31 Jul 2027', status: 'Active',
      supervisor: 'Coach Omondi', probation: false, probationEndDate: null, reviewDate: '10 Dec 2026',
      appointedBy: 'Coach Omondi', approvedBy: 'Principal', appointmentLetter: 'APT-005-GAM',
      reason: 'Outstanding sports performance and leadership on the field.', replacementFor: null, handoverCompleted: true,
      history: [
        { date: '27 Aug 2026', action: 'Nominated', actor: 'Coach Omondi', note: 'Nominated by games department' },
        { date: '01 Sep 2026', action: 'Approved', actor: 'Principal', note: 'Appointed as Games Prefect' },
      ],
    },
    {
      id: 'apt-006', positionId: 'pos-007', positionTitle: 'Library Prefect',
      studentId: 'stu-015', studentName: 'Irene Wanjiru', className: 'Form 2 — Tana', house: 'Baobab House',
      startDate: '01 Sep 2026', endDate: '31 Jul 2027', status: 'Active',
      supervisor: 'Ms. Akinyi', probation: false, probationEndDate: null, reviewDate: '10 Dec 2026',
      appointedBy: 'Ms. Akinyi', approvedBy: 'Principal', appointmentLetter: 'APT-006-LIB',
      reason: 'Assists librarian with discipline and order.', replacementFor: null, handoverCompleted: true,
      history: [
        { date: '29 Aug 2026', action: 'Approved', actor: 'Ms. Akinyi', note: 'Selected by librarian' },
      ],
    },
    {
      id: 'apt-007', positionId: 'pos-004', positionTitle: 'Dormitory Prefect — Acacia',
      studentId: 'stu-016', studentName: 'James Mutua', className: 'Form 3 — Tana', house: 'Acacia House',
      startDate: '01 Sep 2026', endDate: '31 Jul 2027', status: 'Under Review',
      supervisor: 'Ms. Wairimu', probation: true, probationEndDate: '15 Oct 2026', reviewDate: '15 Oct 2026',
      appointedBy: 'Ms. Wairimu', approvedBy: null, appointmentLetter: '',
      reason: 'Pending review of dormitory conduct records.', replacementFor: null, handoverCompleted: false,
      history: [
        { date: '10 Sep 2026', action: 'Nominated', actor: 'Ms. Wairimu', note: 'Recommended by house staff' },
        { date: '12 Sep 2026', action: 'Under Review', actor: 'Mr. Kiprop', note: 'Conduct records being reviewed' },
      ],
    },
    {
      id: 'apt-008', positionId: 'pos-009', positionTitle: 'Sanitation Prefect',
      studentId: 'stu-017', studentName: 'Joyce Atieno', className: 'Year 8 — Acacia', house: 'Baobab House',
      startDate: '01 May 2026', endDate: '31 Jul 2026', status: 'Completed',
      supervisor: 'Mr. Odhiambo', probation: false, probationEndDate: null, reviewDate: null,
      appointedBy: 'Mr. Odhiambo', approvedBy: 'Principal', appointmentLetter: 'APT-007-SAN',
      reason: 'Term ended, appointment completed.', replacementFor: null, handoverCompleted: true,
      history: [
        { date: '01 May 2026', action: 'Approved', actor: 'Principal', note: 'Appointed for Term 2' },
        { date: '31 Jul 2026', action: 'Completed', actor: 'Mr. Odhiambo', note: 'Term ended' },
      ],
    },
  ],

  dutyTypes: [
    { id: 'dt-001', name: 'Morning Assembly Duty', description: 'Ensure students assemble orderly and on time.', shift: 'Morning', location: 'Assembly Hall', recurring: true },
    { id: 'dt-002', name: 'Break Patrol', description: 'Patrol corridors and grounds during break.', shift: 'Break', location: 'School Grounds', recurring: true },
    { id: 'dt-003', name: 'Lunch Queue Management', description: 'Manage orderly lunch queues in dining hall.', shift: 'Lunch', location: 'Dining Hall', recurring: true },
    { id: 'dt-004', name: 'Evening Study Supervision', description: 'Assist with evening prep supervision for boarders.', shift: 'Evening', location: 'Study Hall', recurring: true },
    { id: 'dt-005', name: 'Boarding Night Patrol', description: 'Assist matron with lights-out patrol.', shift: 'Boarding', location: 'Cedar Dormitory A', recurring: true },
    { id: 'dt-006', name: 'Library Order Duty', description: 'Maintain silence and order in the library.', shift: 'Break', location: 'Library', recurring: true },
  ],

  duties: [
    { id: 'dty-001', dutyTypeId: 'dt-001', dutyName: 'Morning Assembly Duty', shift: 'Morning', location: 'Assembly Hall', prefectId: 'stu-010', prefectName: 'Daniel Mwangi', date: '16 Oct 2026', startTime: '07:15', endTime: '07:45', supervisor: 'Mr. Kiprop', status: 'Completed', completionNote: 'Assembly orderly, all classes present on time.', absenceReason: '', replacementName: null, team: ['Daniel Mwangi', 'Esther Nyambura'] },
    { id: 'dty-002', dutyTypeId: 'dt-002', dutyName: 'Break Patrol', shift: 'Break', location: 'School Grounds', prefectId: 'stu-014', prefectName: 'Henry Kamau', date: '16 Oct 2026', startTime: '10:30', endTime: '10:50', supervisor: 'Coach Omondi', status: 'In Progress', completionNote: '', absenceReason: '', replacementName: null, team: ['Henry Kamau'] },
    { id: 'dty-003', dutyTypeId: 'dt-003', dutyName: 'Lunch Queue Management', shift: 'Lunch', location: 'Dining Hall', prefectId: 'stu-013', prefectName: 'Grace Achieng', date: '16 Oct 2026', startTime: '12:30', endTime: '13:15', supervisor: 'Mrs. Cheruiyot', status: 'Scheduled', completionNote: '', absenceReason: '', replacementName: null, team: ['Grace Achieng', 'Felix Otieno'] },
    { id: 'dty-004', dutyTypeId: 'dt-005', dutyName: 'Boarding Night Patrol', shift: 'Boarding', location: 'Cedar Dormitory A', prefectId: 'stu-012', prefectName: 'Felix Otieno', date: '15 Oct 2026', startTime: '21:00', endTime: '21:30', supervisor: 'Ms. Wairimu', status: 'Incomplete', completionNote: '', absenceReason: 'Student unwell, reported to matron.', replacementName: 'Esther Nyambura', team: ['Felix Otieno'] },
    { id: 'dty-005', dutyTypeId: 'dt-004', dutyName: 'Evening Study Supervision', shift: 'Evening', location: 'Study Hall', prefectId: 'stu-011', prefectName: 'Esther Nyambura', date: '16 Oct 2026', startTime: '19:00', endTime: '20:30', supervisor: 'Mr. Kiprop', status: 'Scheduled', completionNote: '', absenceReason: '', replacementName: null, team: ['Esther Nyambura'] },
    { id: 'dty-006', dutyTypeId: 'dt-006', dutyName: 'Library Order Duty', shift: 'Break', location: 'Library', prefectId: 'stu-015', prefectName: 'Irene Wanjiru', date: '15 Oct 2026', startTime: '10:30', endTime: '10:50', supervisor: 'Ms. Akinyi', status: 'Completed', completionNote: 'Library quiet, all students seated and studying.', absenceReason: '', replacementName: null, team: ['Irene Wanjiru'] },
    { id: 'dty-007', dutyTypeId: 'dt-002', dutyName: 'Break Patrol', shift: 'Break', location: 'School Grounds', prefectId: 'stu-010', prefectName: 'Daniel Mwangi', date: '17 Oct 2026', startTime: '10:30', endTime: '10:50', supervisor: 'Mr. Kiprop', status: 'Scheduled', completionNote: '', absenceReason: '', replacementName: null, team: ['Daniel Mwangi'] },
    { id: 'dty-008', dutyTypeId: 'dt-001', dutyName: 'Morning Assembly Duty', shift: 'Morning', location: 'Assembly Hall', prefectId: 'stu-011', prefectName: 'Esther Nyambura', date: '17 Oct 2026', startTime: '07:15', endTime: '07:45', supervisor: 'Mr. Kiprop', status: 'Scheduled', completionNote: '', absenceReason: '', replacementName: null, team: ['Esther Nyambura'] },
  ],

  tasks: [
    { id: 'tsk-001', title: 'Prepare assembly seating plan', description: 'Arrange class seating positions for Friday assembly.', prefectId: 'stu-010', prefectName: 'Daniel Mwangi', dueDate: '17 Oct 2026', priority: 'High', location: 'Assembly Hall', instructions: 'Coordinate with class teachers for seating assignments.', status: 'Submitted', submittedNote: 'Seating plan prepared and distributed to class teachers.', reviewNote: '', reviewedBy: null, createdBy: 'Mr. Kiprop', createdDate: '14 Oct 2026' },
    { id: 'tsk-002', title: 'Submit weekly duty report', description: 'Compile and submit the weekly boarding duty report.', prefectId: 'stu-012', prefectName: 'Felix Otieno', dueDate: '18 Oct 2026', priority: 'Normal', location: 'Boarding Office', instructions: 'Include roll-call outcomes, incidents, and any unresolved issues.', status: 'In Progress', submittedNote: '', reviewNote: '', reviewedBy: null, createdBy: 'Ms. Wairimu', createdDate: '12 Oct 2026' },
    { id: 'tsk-003', title: 'Organize inter-house sports sign-up', description: 'Collect sign-up sheets from all houses for inter-house football.', prefectId: 'stu-014', prefectName: 'Henry Kamau', dueDate: '14 Oct 2026', priority: 'Urgent', location: 'Games Office', instructions: 'Distribute forms to house prefects and collect by Thursday.', status: 'Overdue', submittedNote: '', reviewNote: '', reviewedBy: null, createdBy: 'Coach Omondi', createdDate: '10 Oct 2026' },
    { id: 'tsk-004', title: 'Library inventory check', description: 'Assist librarian with end-of-term book inventory check.', prefectId: 'stu-015', prefectName: 'Irene Wanjiru', dueDate: '20 Oct 2026', priority: 'Low', location: 'Library', instructions: 'Check shelves against catalog for missing books.', status: 'Acknowledged', submittedNote: '', reviewNote: '', reviewedBy: null, createdBy: 'Ms. Akinyi', createdDate: '15 Oct 2026' },
    { id: 'tsk-005', title: 'Dining hall cleanliness inspection', description: 'Inspect dining hall after lunch and report any issues.', prefectId: 'stu-013', prefectName: 'Grace Achieng', dueDate: '16 Oct 2026', priority: 'Normal', location: 'Dining Hall', instructions: 'Check tables, floor, and waste disposal areas.', status: 'Completed', submittedNote: 'Dining hall clean, minor spill reported to cleaning staff.', reviewNote: 'Good report. Spill addressed.', reviewedBy: 'Mrs. Cheruiyot', createdBy: 'Mrs. Cheruiyot', createdDate: '16 Oct 2026' },
    { id: 'tsk-006', title: 'Coordinate student council meeting', description: 'Arrange agenda and notify council members for monthly meeting.', prefectId: 'stu-010', prefectName: 'Daniel Mwangi', dueDate: '22 Oct 2026', priority: 'Normal', location: 'Conference Room', instructions: 'Prepare agenda with deputy head prefect and circulate.', status: 'Assigned', submittedNote: '', reviewNote: '', reviewedBy: null, createdBy: 'Mr. Kiprop', createdDate: '15 Oct 2026' },
  ],

  incidents: [
    { id: 'inc-001', reference: 'PINC-001', category: 'Damaged facility', urgency: 'Medium', description: 'Window latch broken in Cedar Dormitory A — Room 4. Cannot secure window.', location: 'Cedar Dormitory A, Room 4', reportedBy: 'Felix Otieno', reporterRole: 'Boarding Prefect', assignedTo: 'Mr. Odhiambo', status: 'Actioned', date: '15 Oct 2026', time: '20:15', confidential: false, actionTaken: 'Maintenance request submitted. Temporary secure with latch tape.', resolution: 'Maintenance team scheduled to repair on 17 Oct 2026.', history: [{ date: '15 Oct 2026', action: 'Submitted', actor: 'Felix Otieno', note: 'Broken window latch reported' }, { date: '16 Oct 2026', action: 'Actioned', actor: 'Mr. Odhiambo', note: 'Maintenance scheduled' }] },
    { id: 'inc-002', reference: 'PINC-002', category: 'Safety hazard', urgency: 'High', description: 'Wet floor near science block staircase — no warning sign placed.', location: 'Science Block Staircase', reportedBy: 'Henry Kamau', reporterRole: 'Games Prefect', assignedTo: 'Mr. Odhiambo', status: 'Under Review', date: '16 Oct 2026', time: '10:35', confidential: false, actionTaken: 'Verbal warning to students to use alternative route.', resolution: '', history: [{ date: '16 Oct 2026', action: 'Submitted', actor: 'Henry Kamau', note: 'Wet floor hazard reported' }] },
    { id: 'inc-003', reference: 'PINC-003', category: 'Welfare concern', urgency: 'Critical', description: 'Student appearing distressed and withdrawn during evening study. Declined to speak with prefect.', location: 'Study Hall', reportedBy: 'Esther Nyambura', reporterRole: 'Deputy Head Prefect', assignedTo: 'Ms. Wairimu', status: 'Escalated', date: '15 Oct 2026', time: '19:45', confidential: true, actionTaken: 'Reported immediately to housemistress. Student escorted to office.', resolution: '', history: [{ date: '15 Oct 2026', action: 'Submitted', actor: 'Esther Nyambura', note: 'Welfare concern escalated' }, { date: '15 Oct 2026', action: 'Escalated', actor: 'Ms. Wairimu', note: 'Taken under safeguarding procedure' }] },
    { id: 'inc-004', reference: 'PINC-004', category: 'Lost property', urgency: 'Low', description: 'Student lost a mathematics textbook in the library. Name inside: Brian Otieno.', location: 'Library', reportedBy: 'Irene Wanjiru', reporterRole: 'Library Prefect', assignedTo: 'Ms. Akinyi', status: 'Closed', date: '14 Oct 2026', time: '11:00', confidential: false, actionTaken: 'Checked shelves and lost property box.', resolution: 'Textbook found behind shelf. Returned to student.', history: [{ date: '14 Oct 2026', action: 'Submitted', actor: 'Irene Wanjiru', note: 'Lost textbook reported' }, { date: '14 Oct 2026', action: 'Closed', actor: 'Ms. Akinyi', note: 'Book found and returned' }] },
    { id: 'inc-005', reference: 'PINC-005', category: 'Duty issue', urgency: 'Low', description: 'Student arrived late for break patrol duty without explanation.', location: 'School Grounds', reportedBy: 'Daniel Mwangi', reporterRole: 'Head Prefect', assignedTo: 'Mr. Kiprop', status: 'Closed', date: '13 Oct 2026', time: '10:40', confidential: false, actionTaken: 'Spoke with student. Warned about punctuality.', resolution: 'Student acknowledged and promised improvement.', history: [{ date: '13 Oct 2026', action: 'Submitted', actor: 'Daniel Mwangi', note: 'Late duty reported' }, { date: '13 Oct 2026', action: 'Closed', actor: 'Mr. Kiprop', note: 'Verbal warning given' }] },
  ],

  trainingSessions: [
    { id: 'tr-001', title: 'Leadership Skills Workshop', date: '20 Oct 2026', time: '15:00 — 16:30', location: 'Conference Room', attendees: ['Daniel Mwangi', 'Esther Nyambura', 'Felix Otieno', 'Grace Achieng', 'Henry Kamau'], status: 'Scheduled' },
    { id: 'tr-002', title: 'Safeguarding Awareness Session', date: '12 Oct 2026', time: '15:00 — 16:00', location: 'Conference Room', attendees: ['Daniel Mwangi', 'Esther Nyambura', 'Felix Otieno'], status: 'Completed' },
    { id: 'tr-003', title: 'Conflict Resolution Training', date: '05 Oct 2026', time: '15:00 — 16:30', location: 'Conference Room', attendees: ['Daniel Mwangi', 'Esther Nyambura', 'Grace Achieng', 'Irene Wanjiru'], status: 'Completed' },
  ],

  announcements: [
    { id: 'ann-001', title: 'Inter-house sports sign-up deadline', detail: 'All house prefects must submit inter-house football sign-up sheets to the Games Prefect by Thursday 17 October.', postedBy: 'Coach Omondi', date: '14 Oct 2026', audience: 'All prefects' },
    { id: 'ann-002', title: 'Leadership workshop reminder', detail: 'All active prefects are required to attend the leadership skills workshop on Tuesday 20 October at 3:00 PM in the Conference Room.', postedBy: 'Mr. Kiprop', date: '13 Oct 2026', audience: 'All prefects' },
    { id: 'ann-003', title: 'Boarding duty report format', detail: 'Boarding prefects should use the new weekly report format available from the boarding office. Reports due every Friday.', postedBy: 'Ms. Wairimu', date: '10 Oct 2026', audience: 'Boarding prefects' },
  ],

  notifications: [
    { id: 'pn-001', recipient: 'Daniel Mwangi', title: 'Task submitted for review', detail: 'Assembly seating plan task awaiting supervisor review.', unread: true, date: '16 Oct 2026' },
    { id: 'pn-002', recipient: 'Felix Otieno', title: 'Duty marked incomplete', detail: 'Boarding night patrol on 15 Oct marked incomplete due to illness.', unread: true, date: '15 Oct 2026' },
    { id: 'pn-003', recipient: 'Henry Kamau', title: 'Task overdue', detail: 'Inter-house sports sign-up task is overdue. Please submit immediately.', unread: true, date: '15 Oct 2026' },
    { id: 'pn-004', recipient: 'All Prefects', title: 'Leadership workshop', detail: 'Reminder: Leadership workshop on 20 Oct at 3:00 PM.', unread: false, date: '13 Oct 2026' },
  ],

  audit: [
    { id: 'pa-001', actor: 'Principal', action: 'Appointed prefect', target: 'Daniel Mwangi — Head Prefect', timestamp: '01 Sep 2026, 09:00' },
    { id: 'pa-002', actor: 'Mr. Kiprop', action: 'Created task', target: 'Prepare assembly seating plan', timestamp: '14 Oct 2026, 08:30' },
    { id: 'pa-003', actor: 'Felix Otieno', action: 'Submitted incident', target: 'PINC-001 — Damaged facility', timestamp: '15 Oct 2026, 20:16' },
    { id: 'pa-004', actor: 'Esther Nyambura', action: 'Escalated incident', target: 'PINC-003 — Welfare concern', timestamp: '15 Oct 2026, 19:46' },
    { id: 'pa-005', actor: 'Mr. Odhiambo', action: 'Actioned incident', target: 'PINC-001 — Damaged facility', timestamp: '16 Oct 2026, 08:00' },
  ],
};

// ============ Store ============

let state: PrefectDemoState = structuredClone(seed);
const listeners = new Set<() => void>();
function notify() { listeners.forEach((l) => l()); }
function subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l); }; }
function getSnapshot() { return state; }
export function usePrefectDemo() { return useSyncExternalStore(subscribe, getSnapshot, getSnapshot); }

function audit(action: string, target: string, actor = 'Administrator') {
  state.audit.unshift({ id: `pa-${Date.now()}`, actor, action, target, timestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) });
}

function nextId(prefix: string) { return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`; }

function isActive(appt: PrefectAppointment) { return appt.status === 'Active'; }

// ============ Mutations ============

export const prefectDemo = {
  // Positions
  addPosition(title: string, category: string, description: string, exclusive: boolean, shift: string): { ok: boolean; error?: string } {
    if (!title.trim()) return { ok: false, error: 'Position title is required.' };
    state.positions.push({ id: nextId('pos'), title, category, description, exclusive, houseAssignment: null, dormAssignment: null, classAssignment: null, status: 'Active' });
    audit('Created position', title); notify();
    return { ok: true };
  },
  togglePositionStatus(id: string): { ok: boolean; error?: string } {
    const pos = state.positions.find((p) => p.id === id);
    if (!pos) return { ok: false, error: 'Position not found.' };
    pos.status = pos.status === 'Active' ? 'Inactive' : 'Active';
    audit('Updated position status', pos.title); notify();
    return { ok: true };
  },

  // Appointments
  nominateForPosition(positionId: string, studentId: string, studentName: string, className: string, house: string, supervisor: string, reason: string): { ok: boolean; error?: string } {
    const pos = state.positions.find((p) => p.id === positionId);
    if (!pos) return { ok: false, error: 'Position not found.' };
    if (pos.status !== 'Active') return { ok: false, error: 'Cannot nominate for an inactive position.' };
    if (pos.exclusive) {
      const existing = state.appointments.find((a) => a.positionId === positionId && isActive(a));
      if (existing) return { ok: false, error: `${pos.title} is an exclusive position with an active appointment (${existing.studentName}).` };
    }
    state.appointments.push({
      id: nextId('apt'), positionId, positionTitle: pos.title, studentId, studentName, className, house,
      startDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      endDate: null, status: 'Nominated', supervisor, probation: false, probationEndDate: null, reviewDate: null,
      appointedBy: 'Administrator', approvedBy: null, appointmentLetter: '', reason, replacementFor: null, handoverCompleted: false,
      history: [{ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: 'Nominated', actor: 'Administrator', note: reason }],
    });
    audit('Nominated for position', `${studentName} — ${pos.title}`); notify();
    return { ok: true };
  },
  advanceAppointment(id: string, newStatus: AppointmentStatus, actor: string, note: string): { ok: boolean; error?: string } {
    const appt = state.appointments.find((a) => a.id === id);
    if (!appt) return { ok: false, error: 'Appointment not found.' };
    if (newStatus === 'Active' && appt.status !== 'Approved') return { ok: false, error: 'Appointment must be Approved before activation.' };
    if (newStatus === 'Approved') appt.approvedBy = actor;
    appt.status = newStatus;
    appt.history.push({ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: newStatus, actor, note });
    audit(`${newStatus} appointment`, `${appt.studentName} — ${appt.positionTitle}`, actor); notify();
    return { ok: true };
  },
  endAppointment(id: string, reason: string, actor: string): { ok: boolean; error?: string } {
    const appt = state.appointments.find((a) => a.id === id);
    if (!appt) return { ok: false, error: 'Appointment not found.' };
    if (!isActive(appt)) return { ok: false, error: 'Only active appointments can be ended.' };
    appt.status = 'Ended';
    appt.endDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    appt.history.push({ date: appt.endDate, action: 'Ended', actor, note: reason });
    audit('Ended appointment', `${appt.studentName} — ${appt.positionTitle}`, actor); notify();
    return { ok: true };
  },

  // Duties
  assignDuty(dutyTypeId: string, prefectId: string, prefectName: string, date: string, startTime: string, endTime: string, supervisor: string, team: string[]): { ok: boolean; error?: string } {
    const dt = state.dutyTypes.find((d) => d.id === dutyTypeId);
    if (!dt) return { ok: false, error: 'Duty type not found.' };
    const appt = state.appointments.find((a) => a.studentId === prefectId && isActive(a));
    if (!appt) return { ok: false, error: 'Selected student has no active prefect appointment.' };
    // Overlap check
    const overlap = state.duties.find((d) => d.prefectId === prefectId && d.date === date && d.status !== 'Cancelled' && d.status !== 'Completed' && d.status !== 'Incomplete' &&
      ((startTime >= d.startTime && startTime < d.endTime) || (endTime > d.startTime && endTime <= d.endTime)));
    if (overlap) return { ok: false, error: `Duty overlaps with existing assignment: ${overlap.dutyName} (${overlap.startTime}–${overlap.endTime}).` };
    state.duties.push({
      id: nextId('dty'), dutyTypeId, dutyName: dt.name, shift: dt.shift, location: dt.location,
      prefectId, prefectName, date, startTime, endTime, supervisor, status: 'Scheduled',
      completionNote: '', absenceReason: '', replacementName: null, team,
    });
    audit('Assigned duty', `${dt.name} to ${prefectName} on ${date}`); notify();
    return { ok: true };
  },
  completeDuty(id: string, note: string): { ok: boolean; error?: string } {
    const d = state.duties.find((x) => x.id === id);
    if (!d) return { ok: false, error: 'Duty not found.' };
    d.status = 'Completed';
    d.completionNote = note;
    audit('Completed duty', `${d.dutyName} — ${d.prefectName}`, d.prefectName); notify();
    return { ok: true };
  },
  markDutyIncomplete(id: string, reason: string): { ok: boolean; error?: string } {
    const d = state.duties.find((x) => x.id === id);
    if (!d) return { ok: false, error: 'Duty not found.' };
    d.status = 'Incomplete';
    d.absenceReason = reason;
    audit('Marked duty incomplete', `${d.dutyName} — ${d.prefectName}`); notify();
    return { ok: true };
  },
  reassignDuty(id: string, newPrefectId: string, newPrefectName: string): { ok: boolean; error?: string } {
    const d = state.duties.find((x) => x.id === id);
    if (!d) return { ok: false, error: 'Duty not found.' };
    const appt = state.appointments.find((a) => a.studentId === newPrefectId && isActive(a));
    if (!appt) return { ok: false, error: 'Replacement has no active prefect appointment.' };
    d.replacementName = newPrefectName;
    d.prefectId = newPrefectId;
    d.prefectName = newPrefectName;
    audit('Reassigned duty', `${d.dutyName} to ${newPrefectName}`); notify();
    return { ok: true };
  },

  // Tasks
  createTask(title: string, description: string, prefectId: string, prefectName: string, dueDate: string, priority: TaskPriority, location: string, instructions: string, createdBy: string): { ok: boolean; error?: string } {
    if (!title.trim() || !prefectId) return { ok: false, error: 'Title and responsible prefect are required.' };
    state.tasks.push({
      id: nextId('tsk'), title, description, prefectId, prefectName, dueDate, priority, location, instructions,
      status: 'Assigned', submittedNote: '', reviewNote: '', reviewedBy: null, createdBy, createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    });
    audit('Created task', title, createdBy); notify();
    return { ok: true };
  },
  advanceTask(id: string, newStatus: TaskStatus, note: string, actor: string): { ok: boolean; error?: string } {
    const t = state.tasks.find((x) => x.id === id);
    if (!t) return { ok: false, error: 'Task not found.' };
    if (newStatus === 'Reviewed' || newStatus === 'Completed' || newStatus === 'Returned') {
      t.reviewNote = note;
      t.reviewedBy = actor;
    } else if (newStatus === 'Submitted') {
      t.submittedNote = note;
    }
    t.status = newStatus;
    audit(`${newStatus} task`, t.title, actor); notify();
    return { ok: true };
  },

  // Incidents
  submitIncident(category: IncidentCategory, urgency: IncidentUrgency, description: string, location: string, reportedBy: string, reporterRole: string, assignedTo: string, confidential: boolean): { ok: boolean; error?: string } {
    if (!description.trim()) return { ok: false, error: 'Description is required.' };
    const ref = `PINC-${String(state.incidents.length + 1).padStart(3, '0')}`;
    state.incidents.unshift({
      id: nextId('inc'), reference: ref, category, urgency, description, location, reportedBy, reporterRole,
      assignedTo, status: 'Submitted', confidential, actionTaken: '', resolution: '',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      history: [{ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: 'Submitted', actor: reportedBy, note: 'Incident submitted' }],
    });
    audit('Submitted incident', ref, reportedBy); notify();
    return { ok: true };
  },
  advanceIncident(id: string, newStatus: IncidentStatus, note: string, actor: string): { ok: boolean; error?: string } {
    const inc = state.incidents.find((x) => x.id === id);
    if (!inc) return { ok: false, error: 'Incident not found.' };
    inc.status = newStatus;
    if (newStatus === 'Closed') inc.resolution = note;
    else if (newStatus === 'Actioned') inc.actionTaken = note;
    inc.history.push({ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: newStatus, actor, note });
    audit(`${newStatus} incident`, inc.reference, actor); notify();
    return { ok: true };
  },

  // Notifications
  markNotificationRead(id: string): void {
    const n = state.notifications.find((x) => x.id === id);
    if (n) { n.unread = false; notify(); }
  },

  reset(): void {
    state = structuredClone(seed);
    notify();
  },
};
