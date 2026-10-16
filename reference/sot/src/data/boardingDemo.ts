import { useSyncExternalStore } from 'react';

export type BedStatus = 'Occupied' | 'Vacant' | 'Unavailable';
export type RoomStatus = 'Available' | 'Full' | 'Maintenance' | 'Restricted';
export type PlacementStatus = 'Active' | 'Transferred' | 'Withdrawn' | 'Completed';
export type RollCallStatus = 'Present' | 'Absent' | 'Excused' | 'On authorized leave' | 'Late' | 'Unaccounted';
export type RollCallState = 'Scheduled' | 'In Progress' | 'Completed';
export type LeaveStatus = 'Requested' | 'Awaiting consent' | 'Approved' | 'Rejected' | 'Checked out' | 'Returned' | 'Late' | 'Escalated';
export type WelfareType = 'Welfare check-in' | 'Request for assistance' | 'Dormitory conflict' | 'Safety incident' | 'Facility damage' | 'Cleanliness issue' | 'Lost property' | 'Follow-up task' | 'Escalation';
export type InspectionStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Follow-up required';
export type MaintenanceStatus = 'Reported' | 'Assigned' | 'In Progress' | 'Resolved' | 'Verified';
export type HandoverStatus = 'Open' | 'Acknowledged' | 'Closed';

export type BoardingHouse = {
  id: string; name: string; category: string; matronId: string; matronName: string;
  housemasterId: string; housemasterName: string; totalRooms: number; totalBeds: number;
  occupiedBeds: number; vacantBeds: number; unavailableBeds: number;
};

export type Dormitory = {
  id: string; houseId: string; houseName: string; name: string; floor: string;
  totalRooms: number; totalBeds: number; occupiedBeds: number; vacantBeds: number;
};

export type Room = {
  id: string; dormitoryId: string; dormitoryName: string; houseName: string;
  roomNumber: string; floor: string; capacity: number; occupied: number;
  status: RoomStatus;
};

export type Bed = {
  id: string; roomId: string; roomNumber: string; dormitoryName: string; houseName: string;
  bedNumber: string; status: BedStatus; studentId: string | null; studentName: string | null;
};

export type Placement = {
  id: string; studentId: string; studentName: string; className: string; houseName: string;
  dormitoryName: string; roomNumber: string; bedNumber: string; startDate: string;
  endDate: string | null; status: PlacementStatus; reason: string;
  history: { date: string; action: string; actor: string; note: string }[];
};

export type RollCall = {
  id: string; houseId: string; houseName: string; type: 'Morning' | 'After school' | 'Evening' | 'Lights-out' | 'Special';
  scheduledTime: string; actualTime: string | null; conductedBy: string; date: string;
  status: RollCallState; entries: RollCallEntry[]; reviewNote: string;
};

export type RollCallEntry = {
  studentId: string; studentName: string; status: RollCallStatus; note: string;
};

export type LeaveRequest = {
  id: string; studentId: string; studentName: string; className: string; houseName: string;
  reason: string; destination: string; departureDate: string; expectedReturn: string;
  actualReturn: string | null; parentConsent: boolean; approvedBy: string | null;
  status: LeaveStatus; history: { date: string; action: string; actor: string; note: string }[];
};

export type WelfareRecord = {
  id: string; houseId: string; houseName: string; studentId: string | null; studentName: string | null;
  type: WelfareType; description: string; urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  recordedBy: string; date: string; time: string; status: 'Open' | 'Actioned' | 'Escalated' | 'Closed';
  confidential: boolean; followUp: string; assignedTo: string;
};

export type Inspection = {
  id: string; houseId: string; houseName: string; dormitoryName: string; roomNumber: string;
  date: string; conductedBy: string; status: InspectionStatus;
  findings: { item: string; result: 'Pass' | 'Fail' | 'Warning'; note: string }[];
  followUpNote: string;
};

export type MaintenanceIssue = {
  id: string; reference: string; houseId: string; houseName: string; location: string;
  description: string; priority: 'Low' | 'Medium' | 'High'; reportedBy: string; reportedDate: string;
  assignedTo: string; status: MaintenanceStatus; resolvedDate: string | null; verifiedBy: string | null;
};

export type HandoverNote = {
  id: string; houseId: string; houseName: string; fromStaff: string; toStaff: string;
  shift: string; date: string; items: string; status: HandoverStatus;
};

export type BoardingNotification = {
  id: string; recipient: string; title: string; detail: string; unread: boolean; date: string;
};

export type BoardingAuditEntry = {
  id: string; actor: string; action: string; target: string; timestamp: string;
};

export type BoardingDemoState = {
  houses: BoardingHouse[];
  dormitories: Dormitory[];
  rooms: Room[];
  beds: Bed[];
  placements: Placement[];
  rollCalls: RollCall[];
  leaveRequests: LeaveRequest[];
  welfare: WelfareRecord[];
  inspections: Inspection[];
  maintenance: MaintenanceIssue[];
  handovers: HandoverNote[];
  notifications: BoardingNotification[];
  audit: BoardingAuditEntry[];
};

export const BOARDING_POLICIES = {
  EXCLUSIVE_BED_ALLOCATION: true,
  MATRON_SCOPED_ACCESS: true,
  ROLL_CALL_AUDIT_TRAIL: true,
  LEAVE_REQUIRES_APPROVAL: true,
  STUDENTS_CANNOT_SELF_APPROVE_LEAVE: true,
  MEDICAL_REFERRAL_TO_HEALTH_MODULE: true,
  CONFIDENTIAL_WELFARE_RESTRICTED: true,
};

const seed: BoardingDemoState = {
  houses: [
    { id: 'bh-001', name: 'Cedar House', category: 'Boys Boarding', matronId: 'mat-001', matronName: 'Matron Grace', housemasterId: 'hm-001', housemasterName: 'Mr. Odhiambo', totalRooms: 8, totalBeds: 32, occupiedBeds: 28, vacantBeds: 3, unavailableBeds: 1 },
    { id: 'bh-002', name: 'Acacia House', category: 'Girls Boarding', matronId: 'mat-002', matronName: 'Matron Rose', housemasterId: 'hm-002', housemasterName: 'Ms. Wairimu', totalRooms: 8, totalBeds: 32, occupiedBeds: 30, vacantBeds: 2, unavailableBeds: 0 },
    { id: 'bh-003', name: 'Baobab House', category: 'Boys Boarding', matronId: 'mat-003', matronName: 'Matron Janet', housemasterId: 'hm-003', housemasterName: 'Mr. Kiprop', totalRooms: 6, totalBeds: 24, occupiedBeds: 20, vacantBeds: 4, unavailableBeds: 0 },
  ],
  dormitories: [
    { id: 'dorm-001', houseId: 'bh-001', houseName: 'Cedar House', name: 'Cedar Dormitory A', floor: 'Ground', totalRooms: 4, totalBeds: 16, occupiedBeds: 14, vacantBeds: 2 },
    { id: 'dorm-002', houseId: 'bh-001', houseName: 'Cedar House', name: 'Cedar Dormitory B', floor: 'First', totalRooms: 4, totalBeds: 16, occupiedBeds: 14, vacantBeds: 1 },
    { id: 'dorm-003', houseId: 'bh-002', houseName: 'Acacia House', name: 'Acacia Dormitory A', floor: 'Ground', totalRooms: 4, totalBeds: 16, occupiedBeds: 15, vacantBeds: 1 },
    { id: 'dorm-004', houseId: 'bh-002', houseName: 'Acacia House', name: 'Acacia Dormitory B', floor: 'First', totalRooms: 4, totalBeds: 16, occupiedBeds: 15, vacantBeds: 1 },
    { id: 'dorm-005', houseId: 'bh-003', houseName: 'Baobab House', name: 'Baobab Dormitory', floor: 'Ground', totalRooms: 6, totalBeds: 24, occupiedBeds: 20, vacantBeds: 4 },
  ],
  rooms: [
    { id: 'rm-001', dormitoryId: 'dorm-001', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', roomNumber: 'A-101', floor: 'Ground', capacity: 4, occupied: 4, status: 'Full' },
    { id: 'rm-002', dormitoryId: 'dorm-001', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', roomNumber: 'A-102', floor: 'Ground', capacity: 4, occupied: 3, status: 'Available' },
    { id: 'rm-003', dormitoryId: 'dorm-001', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', roomNumber: 'A-103', floor: 'Ground', capacity: 4, occupied: 4, status: 'Full' },
    { id: 'rm-004', dormitoryId: 'dorm-001', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', roomNumber: 'A-104', floor: 'Ground', capacity: 4, occupied: 3, status: 'Available' },
    { id: 'rm-005', dormitoryId: 'dorm-001', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', roomNumber: 'A-105', floor: 'Ground', capacity: 4, occupied: 0, status: 'Maintenance' },
    { id: 'rm-006', dormitoryId: 'dorm-002', dormitoryName: 'Cedar Dormitory B', houseName: 'Cedar House', roomNumber: 'B-201', floor: 'First', capacity: 4, occupied: 4, status: 'Full' },
    { id: 'rm-007', dormitoryId: 'dorm-002', dormitoryName: 'Cedar Dormitory B', houseName: 'Cedar House', roomNumber: 'B-202', floor: 'First', capacity: 4, occupied: 3, status: 'Available' },
    { id: 'rm-008', dormitoryId: 'dorm-003', dormitoryName: 'Acacia Dormitory A', houseName: 'Acacia House', roomNumber: 'C-101', floor: 'Ground', capacity: 4, occupied: 4, status: 'Full' },
    { id: 'rm-009', dormitoryId: 'dorm-003', dormitoryName: 'Acacia Dormitory A', houseName: 'Acacia House', roomNumber: 'C-102', floor: 'Ground', capacity: 4, occupied: 3, status: 'Available' },
  ],
  beds: [
    { id: 'bed-001', roomId: 'rm-001', roomNumber: 'A-101', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', bedNumber: 'A-101-1', status: 'Occupied', studentId: 'stu-020', studentName: 'Felix Otieno' },
    { id: 'bed-002', roomId: 'rm-001', roomNumber: 'A-101', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', bedNumber: 'A-101-2', status: 'Occupied', studentId: 'stu-021', studentName: 'George Maina' },
    { id: 'bed-003', roomId: 'rm-001', roomNumber: 'A-101', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', bedNumber: 'A-101-3', status: 'Occupied', studentId: 'stu-022', studentName: 'Henry Kamau' },
    { id: 'bed-004', roomId: 'rm-001', roomNumber: 'A-101', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', bedNumber: 'A-101-4', status: 'Occupied', studentId: 'stu-023', studentName: 'Ibrahim Yusuf' },
    { id: 'bed-005', roomId: 'rm-002', roomNumber: 'A-102', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', bedNumber: 'A-102-1', status: 'Occupied', studentId: 'stu-024', studentName: 'James Mutua' },
    { id: 'bed-006', roomId: 'rm-002', roomNumber: 'A-102', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', bedNumber: 'A-102-2', status: 'Vacant', studentId: null, studentName: null },
    { id: 'bed-007', roomId: 'rm-002', roomNumber: 'A-102', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', bedNumber: 'A-102-3', status: 'Occupied', studentId: 'stu-025', studentName: 'Kevin Omondi' },
    { id: 'bed-008', roomId: 'rm-002', roomNumber: 'A-102', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', bedNumber: 'A-102-4', status: 'Occupied', studentId: 'stu-026', studentName: 'Levi Cheruiyot' },
    { id: 'bed-009', roomId: 'rm-005', roomNumber: 'A-105', dormitoryName: 'Cedar Dormitory A', houseName: 'Cedar House', bedNumber: 'A-105-1', status: 'Unavailable', studentId: null, studentName: null },
    { id: 'bed-010', roomId: 'rm-008', roomNumber: 'C-101', dormitoryName: 'Acacia Dormitory A', houseName: 'Acacia House', bedNumber: 'C-101-1', status: 'Occupied', studentId: 'stu-030', studentName: 'Esther Nyambura' },
    { id: 'bed-011', roomId: 'rm-008', roomNumber: 'C-101', dormitoryName: 'Acacia Dormitory A', houseName: 'Acacia House', bedNumber: 'C-101-2', status: 'Occupied', studentId: 'stu-031', studentName: 'Faith Achieng' },
    { id: 'bed-012', roomId: 'rm-009', roomNumber: 'C-102', dormitoryName: 'Acacia Dormitory A', houseName: 'Acacia House', bedNumber: 'C-102-1', status: 'Vacant', studentId: null, studentName: null },
  ],
  placements: [
    { id: 'plc-001', studentId: 'stu-020', studentName: 'Felix Otieno', className: 'Form 3 — Tana', houseName: 'Cedar House', dormitoryName: 'Cedar Dormitory A', roomNumber: 'A-101', bedNumber: 'A-101-1', startDate: '01 Sep 2026', endDate: null, status: 'Active', reason: 'Boarding allocation', history: [{ date: '01 Sep 2026', action: 'Allocated', actor: 'Matron Grace', note: 'Initial placement' }] },
    { id: 'plc-002', studentId: 'stu-021', studentName: 'George Maina', className: 'Form 3 — Tana', houseName: 'Cedar House', dormitoryName: 'Cedar Dormitory A', roomNumber: 'A-101', bedNumber: 'A-101-2', startDate: '01 Sep 2026', endDate: null, status: 'Active', reason: 'Boarding allocation', history: [{ date: '01 Sep 2026', action: 'Allocated', actor: 'Matron Grace', note: 'Initial placement' }] },
    { id: 'plc-003', studentId: 'stu-024', studentName: 'James Mutua', className: 'Form 3 — Tana', houseName: 'Cedar House', dormitoryName: 'Cedar Dormitory A', roomNumber: 'A-102', bedNumber: 'A-102-1', startDate: '01 Sep 2026', endDate: null, status: 'Active', reason: 'Boarding allocation', history: [{ date: '01 Sep 2026', action: 'Allocated', actor: 'Matron Grace', note: 'Initial placement' }] },
    { id: 'plc-004', studentId: 'stu-030', studentName: 'Esther Nyambura', className: 'Form 4 — Athi', houseName: 'Acacia House', dormitoryName: 'Acacia Dormitory A', roomNumber: 'C-101', bedNumber: 'C-101-1', startDate: '01 Sep 2026', endDate: null, status: 'Active', reason: 'Boarding allocation', history: [{ date: '01 Sep 2026', action: 'Allocated', actor: 'Matron Rose', note: 'Initial placement' }] },
    { id: 'plc-005', studentId: 'stu-031', studentName: 'Faith Achieng', className: 'Year 5 — Baobab', houseName: 'Acacia House', dormitoryName: 'Acacia Dormitory A', roomNumber: 'C-101', bedNumber: 'C-101-2', startDate: '01 Sep 2026', endDate: null, status: 'Active', reason: 'Boarding allocation', history: [{ date: '01 Sep 2026', action: 'Allocated', actor: 'Matron Rose', note: 'Initial placement' }] },
  ],
  rollCalls: [
    { id: 'rc-001', houseId: 'bh-001', houseName: 'Cedar House', type: 'Evening', scheduledTime: '18:00', actualTime: '18:05', conductedBy: 'Matron Grace', date: '15 Oct 2026', status: 'Completed', reviewNote: 'All students accounted for.', entries: [
      { studentId: 'stu-020', studentName: 'Felix Otieno', status: 'Present', note: '' },
      { studentId: 'stu-021', studentName: 'George Maina', status: 'Present', note: '' },
      { studentId: 'stu-022', studentName: 'Henry Kamau', status: 'On authorized leave', note: 'Sports fixture away' },
      { studentId: 'stu-024', studentName: 'James Mutua', status: 'Present', note: '' },
    ]},
    { id: 'rc-002', houseId: 'bh-001', houseName: 'Cedar House', type: 'Morning', scheduledTime: '06:00', actualTime: null, conductedBy: 'Matron Grace', date: '16 Oct 2026', status: 'Scheduled', reviewNote: '', entries: [
      { studentId: 'stu-020', studentName: 'Felix Otieno', status: 'Unaccounted', note: '' },
      { studentId: 'stu-021', studentName: 'George Maina', status: 'Unaccounted', note: '' },
      { studentId: 'stu-024', studentName: 'James Mutua', status: 'Unaccounted', note: '' },
    ]},
    { id: 'rc-003', houseId: 'bh-002', houseName: 'Acacia House', type: 'Lights-out', scheduledTime: '21:30', actualTime: '21:35', conductedBy: 'Matron Rose', date: '15 Oct 2026', status: 'Completed', reviewNote: 'Two students late returning from library.', entries: [
      { studentId: 'stu-030', studentName: 'Esther Nyambura', status: 'Present', note: '' },
      { studentId: 'stu-031', studentName: 'Faith Achieng', status: 'Late', note: 'Returned from library at 21:25' },
    ]},
  ],
  leaveRequests: [
    { id: 'lv-001', studentId: 'stu-022', studentName: 'Henry Kamau', className: 'Form 3 — Tana', houseName: 'Cedar House', reason: 'Family event', destination: 'Home — Nairobi', departureDate: '16 Oct 2026', expectedReturn: '18 Oct 2026', actualReturn: null, parentConsent: true, approvedBy: 'Mr. Odhiambo', status: 'Checked out', history: [{ date: '14 Oct 2026', action: 'Requested', actor: 'Henry Kamau', note: 'Family event' }, { date: '14 Oct 2026', action: 'Approved', actor: 'Mr. Odhiambo', note: 'Parent consent confirmed' }, { date: '16 Oct 2026', action: 'Checked out', actor: 'Matron Grace', note: 'Departed at 08:00' }] },
    { id: 'lv-002', studentId: 'stu-024', studentName: 'James Mutua', className: 'Form 3 — Tana', houseName: 'Cedar House', reason: 'Medical appointment', destination: 'Aga Khan Hospital', departureDate: '17 Oct 2026', expectedReturn: '17 Oct 2026', actualReturn: null, parentConsent: true, approvedBy: null, status: 'Awaiting consent', history: [{ date: '15 Oct 2026', action: 'Requested', actor: 'Matron Grace', note: 'Medical appointment' }] },
    { id: 'lv-003', studentId: 'stu-031', studentName: 'Faith Achieng', className: 'Year 5 — Baobab', houseName: 'Acacia House', reason: 'Weekend home visit', destination: 'Home — Nakuru', departureDate: '18 Oct 2026', expectedReturn: '20 Oct 2026', actualReturn: null, parentConsent: false, approvedBy: null, status: 'Requested', history: [{ date: '15 Oct 2026', action: 'Requested', actor: 'Faith Achieng', note: 'Weekend visit' }] },
    { id: 'lv-004', studentId: 'stu-021', studentName: 'George Maina', className: 'Form 3 — Tana', houseName: 'Cedar House', reason: 'Sports fixture', destination: 'Kasarani Stadium', departureDate: '15 Oct 2026', expectedReturn: '15 Oct 2026', actualReturn: '15 Oct 2026 18:30', parentConsent: true, approvedBy: 'Coach Omondi', status: 'Returned', history: [{ date: '14 Oct 2026', action: 'Approved', actor: 'Coach Omondi', note: 'Sports fixture' }, { date: '15 Oct 2026', action: 'Checked out', actor: 'Matron Grace', note: 'Departed 12:00' }, { date: '15 Oct 2026', action: 'Returned', actor: 'Matron Grace', note: 'Returned 18:30' }] },
  ],
  welfare: [
    { id: 'wf-001', houseId: 'bh-001', houseName: 'Cedar House', studentId: 'stu-020', studentName: 'Felix Otieno', type: 'Welfare check-in', description: 'Student reported feeling unwell with headache during evening study.', urgency: 'Medium', recordedBy: 'Matron Grace', date: '15 Oct 2026', time: '19:30', status: 'Actioned', confidential: false, followUp: 'Given paracetamol, referred to health centre if symptoms persist.', assignedTo: 'Matron Grace' },
    { id: 'wf-002', houseId: 'bh-001', houseName: 'Cedar House', studentId: null, studentName: null, type: 'Facility damage', description: 'Window latch broken in Room A-101. Cannot secure window properly.', urgency: 'Medium', recordedBy: 'Felix Otieno', date: '15 Oct 2026', time: '20:15', status: 'Open', confidential: false, followUp: '', assignedTo: 'Mr. Odhiambo' },
    { id: 'wf-003', houseId: 'bh-002', houseName: 'Acacia House', studentId: 'stu-030', studentName: 'Esther Nyambura', type: 'Request for assistance', description: 'Student requests to speak with school counsellor regarding family matters.', urgency: 'High', recordedBy: 'Matron Rose', date: '14 Oct 2026', time: '17:00', status: 'Escalated', confidential: true, followUp: 'Referred to school counsellor. Appointment scheduled.', assignedTo: 'Ms. Wairimu' },
    { id: 'wf-004', houseId: 'bh-001', houseName: 'Cedar House', studentId: null, studentName: null, type: 'Cleanliness issue', description: 'Cedar Dormitory B common area needs additional cleaning — spillage from water bottle.', urgency: 'Low', recordedBy: 'Matron Grace', date: '16 Oct 2026', time: '06:15', status: 'Open', confidential: false, followUp: '', assignedTo: 'Matron Grace' },
  ],
  inspections: [
    { id: 'insp-001', houseId: 'bh-001', houseName: 'Cedar House', dormitoryName: 'Cedar Dormitory A', roomNumber: 'A-101', date: '14 Oct 2026', conductedBy: 'Matron Grace', status: 'Completed', findings: [
      { item: 'Bed condition', result: 'Pass', note: 'All beds in good condition' },
      { item: 'Room cleanliness', result: 'Pass', note: 'Room tidy' },
      { item: 'Window security', result: 'Fail', note: 'Window latch broken — maintenance reported' },
      { item: 'Fire exit access', result: 'Pass', note: 'Clear access' },
    ], followUpNote: 'Maintenance request submitted for window latch.' },
    { id: 'insp-002', houseId: 'bh-002', houseName: 'Acacia House', dormitoryName: 'Acacia Dormitory A', roomNumber: 'C-101', date: '16 Oct 2026', conductedBy: 'Matron Rose', status: 'Follow-up required', findings: [
      { item: 'Bed condition', result: 'Pass', note: 'All beds good' },
      { item: 'Room cleanliness', result: 'Warning', note: 'Some personal items not stored' },
      { item: 'Sanitation', result: 'Pass', note: 'Washroom clean' },
    ], followUpNote: 'Students reminded to store personal items.' },
  ],
  maintenance: [
    { id: 'mnt-001', reference: 'MNT-001', houseId: 'bh-001', houseName: 'Cedar House', location: 'Cedar Dormitory A, Room A-101', description: 'Window latch broken — cannot secure window.', priority: 'High', reportedBy: 'Matron Grace', reportedDate: '15 Oct 2026', assignedTo: 'Mr. Odhiambo', status: 'Assigned', resolvedDate: null, verifiedBy: null },
    { id: 'mnt-002', reference: 'MNT-002', houseId: 'bh-001', houseName: 'Cedar House', location: 'Cedar Dormitory A, Room A-105', description: 'Room flooded from burst pipe. All beds temporarily unavailable.', priority: 'High', reportedBy: 'Matron Grace', reportedDate: '10 Oct 2026', assignedTo: 'Maintenance Team', status: 'In Progress', resolvedDate: null, verifiedBy: null },
    { id: 'mnt-003', reference: 'MNT-003', houseId: 'bh-002', houseName: 'Acacia House', location: 'Acacia Dormitory A, washroom', description: 'Leaking tap in shared washroom.', priority: 'Low', reportedBy: 'Matron Rose', reportedDate: '12 Oct 2026', assignedTo: 'Maintenance Team', status: 'Resolved', resolvedDate: '14 Oct 2026', verifiedBy: 'Matron Rose' },
  ],
  handovers: [
    { id: 'hof-001', houseId: 'bh-001', houseName: 'Cedar House', fromStaff: 'Matron Grace', toStaff: 'Matron Janet', shift: 'Night to Morning', date: '16 Oct 2026', items: 'Felix Otieno unwell — given paracetamol. Henry Kamau on authorized leave. Window latch A-101 pending repair. Room A-105 still under maintenance.', status: 'Open' },
    { id: 'hof-002', houseId: 'bh-002', houseName: 'Acacia House', fromStaff: 'Matron Rose', toStaff: 'Matron Grace', shift: 'Evening to Night', date: '15 Oct 2026', items: 'Esther Nyambura has counsellor appointment tomorrow. Faith Achieng leave request pending. All other students present at lights-out.', status: 'Acknowledged' },
  ],
  notifications: [
    { id: 'bn-001', recipient: 'Matron Grace', title: 'Morning roll call scheduled', detail: 'Cedar House morning roll call at 06:00 — 3 students to account for.', unread: true, date: '16 Oct 2026' },
    { id: 'bn-002', recipient: 'Matron Grace', title: 'Leave request awaiting consent', detail: 'James Mutua — medical appointment on 17 Oct. Parent consent pending.', unread: true, date: '15 Oct 2026' },
    { id: 'bn-003', recipient: 'Matron Rose', title: 'Welfare escalation', detail: 'Esther Nyambura — counsellor referral. Confidential record.', unread: true, date: '14 Oct 2026' },
    { id: 'bn-004', recipient: 'Matron Grace', title: 'Maintenance assigned', detail: 'MNT-001: Window latch repair assigned to Mr. Odhiambo.', unread: false, date: '15 Oct 2026' },
  ],
  audit: [
    { id: 'ba-001', actor: 'Matron Grace', action: 'Completed roll call', target: 'Cedar House Evening — 15 Oct', timestamp: '15 Oct 2026, 18:10' },
    { id: 'ba-002', actor: 'Matron Grace', action: 'Recorded welfare', target: 'Felix Otieno — welfare check-in', timestamp: '15 Oct 2026, 19:31' },
    { id: 'ba-003', actor: 'Mr. Odhiambo', action: 'Approved leave', target: 'Henry Kamau — family event', timestamp: '14 Oct 2026, 10:00' },
    { id: 'ba-004', actor: 'Matron Rose', action: 'Escalated welfare', target: 'Esther Nyambura — counsellor referral', timestamp: '14 Oct 2026, 17:05' },
  ],
};

let state: BoardingDemoState = structuredClone(seed);
const listeners = new Set<() => void>();
function notify() { listeners.forEach((l) => l()); }
function subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l); }; }
function getSnapshot() { return state; }
export function useBoardingDemo() { return useSyncExternalStore(subscribe, getSnapshot, getSnapshot); }
function audit(action: string, target: string, actor = 'Matron Grace') {
  state.audit.unshift({ id: `ba-${Date.now()}`, actor, action, target, timestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) });
}
function nextId(prefix: string) { return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`; }

export const boardingDemo = {
  allocateBed(studentId: string, studentName: string, className: string, bedId: string, reason: string): { ok: boolean; error?: string } {
    const bed = state.beds.find((b) => b.id === bedId);
    if (!bed) return { ok: false, error: 'Bed not found.' };
    if (bed.status === 'Occupied') return { ok: false, error: 'This bed is already occupied.' };
    if (bed.status === 'Unavailable') return { ok: false, error: 'This bed is unavailable.' };
    const existing = state.placements.find((p) => p.studentId === studentId && p.status === 'Active');
    if (existing) return { ok: false, error: `Student already has an active placement: ${existing.dormitoryName} Room ${existing.roomNumber} Bed ${existing.bedNumber}.` };
    bed.status = 'Occupied'; bed.studentId = studentId; bed.studentName = studentName;
    const room = state.rooms.find((r) => r.id === bed.roomId);
    if (room) { room.occupied++; if (room.occupied >= room.capacity) room.status = 'Full'; }
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    state.placements.push({ id: nextId('plc'), studentId, studentName, className, houseName: bed.houseName, dormitoryName: bed.dormitoryName, roomNumber: bed.roomNumber, bedNumber: bed.bedNumber, startDate: today, endDate: null, status: 'Active', reason, history: [{ date: today, action: 'Allocated', actor: 'Matron Grace', note: reason }] });
    audit('Allocated bed', `${studentName} to ${bed.bedNumber}`); notify();
    return { ok: true };
  },
  transferBed(placementId: string, newBedId: string, reason: string): { ok: boolean; error?: string } {
    const plc = state.placements.find((p) => p.id === placementId);
    if (!plc) return { ok: false, error: 'Placement not found.' };
    if (plc.status !== 'Active') return { ok: false, error: 'Only active placements can be transferred.' };
    const newBed = state.beds.find((b) => b.id === newBedId);
    if (!newBed) return { ok: false, error: 'Target bed not found.' };
    if (newBed.status === 'Occupied') return { ok: false, error: 'Target bed is occupied.' };
    if (newBed.status === 'Unavailable') return { ok: false, error: 'Target bed is unavailable.' };
    const oldBed = state.beds.find((b) => b.bedNumber === plc.bedNumber && b.roomNumber === plc.roomNumber);
    if (oldBed) { oldBed.status = 'Vacant'; oldBed.studentId = null; oldBed.studentName = null; }
    const oldRoom = state.rooms.find((r) => r.roomNumber === plc.roomNumber);
    if (oldRoom) { oldRoom.occupied--; if (oldRoom.status === 'Full') oldRoom.status = 'Available'; }
    newBed.status = 'Occupied'; newBed.studentId = plc.studentId; newBed.studentName = plc.studentName;
    const newRoom = state.rooms.find((r) => r.id === newBed.roomId);
    if (newRoom) { newRoom.occupied++; if (newRoom.occupied >= newRoom.capacity) newRoom.status = 'Full'; }
    plc.history.push({ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: 'Transferred', actor: 'Matron Grace', note: `From ${plc.dormitoryName} ${plc.roomNumber}/${plc.bedNumber} to ${newBed.dormitoryName} ${newBed.roomNumber}/${newBed.bedNumber}. Reason: ${reason}` });
    plc.dormitoryName = newBed.dormitoryName; plc.roomNumber = newBed.roomNumber; plc.bedNumber = newBed.bedNumber;
    audit('Transferred placement', `${plc.studentName} to ${newBed.bedNumber}`); notify();
    return { ok: true };
  },
  withdrawPlacement(placementId: string, reason: string): { ok: boolean; error?: string } {
    const plc = state.placements.find((p) => p.id === placementId);
    if (!plc) return { ok: false, error: 'Placement not found.' };
    if (plc.status !== 'Active') return { ok: false, error: 'Only active placements can be withdrawn.' };
    plc.status = 'Withdrawn'; plc.endDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    plc.history.push({ date: plc.endDate, action: 'Withdrawn', actor: 'Matron Grace', note: reason });
    const bed = state.beds.find((b) => b.bedNumber === plc.bedNumber && b.roomNumber === plc.roomNumber);
    if (bed) { bed.status = 'Vacant'; bed.studentId = null; bed.studentName = null; }
    const room = state.rooms.find((r) => r.roomNumber === plc.roomNumber);
    if (room) { room.occupied--; if (room.status === 'Full') room.status = 'Available'; }
    audit('Withdrew placement', plc.studentName); notify();
    return { ok: true };
  },
  startRollCall(houseId: string, type: 'Morning' | 'After school' | 'Evening' | 'Lights-out' | 'Special'): { ok: boolean; error?: string } {
    const house = state.houses.find((h) => h.id === houseId);
    if (!house) return { ok: false, error: 'House not found.' };
    const residents = state.placements.filter((p) => p.houseName === house.name && p.status === 'Active');
    const onLeave = state.leaveRequests.filter((l) => l.studentId && residents.some((r) => r.studentId === l.studentId) && (l.status === 'Checked out' || l.status === 'Approved'));
    state.rollCalls.unshift({
      id: nextId('rc'), houseId, houseName: house.name, type, scheduledTime: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), actualTime: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), conductedBy: house.matronName, date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), status: 'In Progress', reviewNote: '', entries: residents.map((r) => ({
        studentId: r.studentId, studentName: r.studentName,
        status: onLeave.some((l) => l.studentId === r.studentId) ? 'On authorized leave' as RollCallStatus : 'Unaccounted' as RollCallStatus,
        note: onLeave.some((l) => l.studentId === r.studentId) ? 'Authorized leave' : '',
      })),
    });
    audit('Started roll call', `${house.name} ${type}`); notify();
    return { ok: true };
  },
  markRollCallEntry(rollCallId: string, studentId: string, status: RollCallStatus, note: string): { ok: boolean; error?: string } {
    const rc = state.rollCalls.find((r) => r.id === rollCallId);
    if (!rc) return { ok: false, error: 'Roll call not found.' };
    const entry = rc.entries.find((e) => e.studentId === studentId);
    if (!entry) return { ok: false, error: 'Student not in this roll call.' };
    entry.status = status; entry.note = note;
    notify();
    return { ok: true };
  },
  completeRollCall(rollCallId: string, reviewNote: string): { ok: boolean; error?: string } {
    const rc = state.rollCalls.find((r) => r.id === rollCallId);
    if (!rc) return { ok: false, error: 'Roll call not found.' };
    rc.status = 'Completed'; rc.reviewNote = reviewNote; rc.actualTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    audit('Completed roll call', `${rc.houseName} ${rc.type} — ${rc.date}`, rc.conductedBy); notify();
    return { ok: true };
  },
  requestLeave(studentId: string, studentName: string, className: string, houseName: string, reason: string, destination: string, departureDate: string, expectedReturn: string): { ok: boolean; error?: string } {
    if (!reason.trim()) return { ok: false, error: 'Reason is required.' };
    state.leaveRequests.unshift({ id: nextId('lv'), studentId, studentName, className, houseName, reason, destination, departureDate, expectedReturn, actualReturn: null, parentConsent: false, approvedBy: null, status: 'Requested', history: [{ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: 'Requested', actor: 'Matron Grace', note: reason }] });
    audit('Requested leave', `${studentName} — ${reason}`); notify();
    return { ok: true };
  },
  approveLeave(id: string, actor: string): { ok: boolean; error?: string } {
    const lv = state.leaveRequests.find((l) => l.id === id);
    if (!lv) return { ok: false, error: 'Leave request not found.' };
    if (lv.status !== 'Requested' && lv.status !== 'Awaiting consent') return { ok: false, error: `Cannot approve a ${lv.status} request.` };
    lv.status = 'Approved'; lv.approvedBy = actor; lv.parentConsent = true;
    lv.history.push({ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: 'Approved', actor, note: 'Leave approved' });
    audit('Approved leave', `${lv.studentName}`, actor); notify();
    return { ok: true };
  },
  rejectLeave(id: string, actor: string, reason: string): { ok: boolean; error?: string } {
    const lv = state.leaveRequests.find((l) => l.id === id);
    if (!lv) return { ok: false, error: 'Leave request not found.' };
    lv.status = 'Rejected';
    lv.history.push({ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: 'Rejected', actor, note: reason });
    audit('Rejected leave', lv.studentName, actor); notify();
    return { ok: true };
  },
  checkOutStudent(id: string): { ok: boolean; error?: string } {
    const lv = state.leaveRequests.find((l) => l.id === id);
    if (!lv) return { ok: false, error: 'Leave request not found.' };
    if (lv.status !== 'Approved') return { ok: false, error: 'Only approved leave can be checked out.' };
    lv.status = 'Checked out';
    lv.history.push({ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), action: 'Checked out', actor: 'Matron Grace', note: 'Student departed' });
    audit('Checked out student', lv.studentName); notify();
    return { ok: true };
  },
  checkInStudent(id: string): { ok: boolean; error?: string } {
    const lv = state.leaveRequests.find((l) => l.id === id);
    if (!lv) return { ok: false, error: 'Leave request not found.' };
    if (lv.status !== 'Checked out') return { ok: false, error: 'Only checked-out students can be checked in.' };
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    lv.actualReturn = today + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const isLate = new Date(today) > new Date(lv.expectedReturn);
    lv.status = isLate ? 'Late' : 'Returned';
    lv.history.push({ date: today, action: isLate ? 'Late return' : 'Returned', actor: 'Matron Grace', note: isLate ? 'Student returned late' : 'Student returned on time' });
    audit('Checked in student', `${lv.studentName}${isLate ? ' (LATE)' : ''}`); notify();
    return { ok: true };
  },
  recordWelfare(houseId: string, studentId: string | null, studentName: string | null, type: WelfareType, description: string, urgency: 'Low' | 'Medium' | 'High' | 'Critical', confidential: boolean, assignedTo: string): { ok: boolean; error?: string } {
    if (!description.trim()) return { ok: false, error: 'Description is required.' };
    const house = state.houses.find((h) => h.id === houseId);
    state.welfare.unshift({ id: nextId('wf'), houseId, houseName: house?.name ?? '', studentId, studentName, type, description, urgency, recordedBy: house?.matronName ?? 'Matron', date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), status: 'Open', confidential, followUp: '', assignedTo });
    audit('Recorded welfare', `${type} — ${studentName ?? 'General'}`); notify();
    return { ok: true };
  },
  advanceWelfare(id: string, newStatus: 'Open' | 'Actioned' | 'Escalated' | 'Closed', note: string, actor: string): { ok: boolean; error?: string } {
    const w = state.welfare.find((x) => x.id === id);
    if (!w) return { ok: false, error: 'Record not found.' };
    w.status = newStatus; if (note) w.followUp = note;
    audit(`${newStatus} welfare`, w.type, actor); notify();
    return { ok: true };
  },
  reportMaintenance(houseId: string, location: string, description: string, priority: 'Low' | 'Medium' | 'High', reportedBy: string): { ok: boolean; error?: string } {
    if (!description.trim()) return { ok: false, error: 'Description is required.' };
    const house = state.houses.find((h) => h.id === houseId);
    const ref = `MNT-${String(state.maintenance.length + 1).padStart(3, '0')}`;
    state.maintenance.unshift({ id: nextId('mnt'), reference: ref, houseId, houseName: house?.name ?? '', location, description, priority, reportedBy, reportedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), assignedTo: '', status: 'Reported', resolvedDate: null, verifiedBy: null });
    audit('Reported maintenance', `${ref} — ${description}`); notify();
    return { ok: true };
  },
  advanceMaintenance(id: string, newStatus: MaintenanceStatus, assignedTo: string): { ok: boolean; error?: string } {
    const m = state.maintenance.find((x) => x.id === id);
    if (!m) return { ok: false, error: 'Issue not found.' };
    m.status = newStatus; if (assignedTo) m.assignedTo = assignedTo;
    if (newStatus === 'Resolved') m.resolvedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    if (newStatus === 'Verified') m.verifiedBy = 'Matron Grace';
    audit(`${newStatus} maintenance`, m.reference); notify();
    return { ok: true };
  },
  acknowledgeHandover(id: string): void {
    const h = state.handovers.find((x) => x.id === id);
    if (h) { h.status = 'Acknowledged'; notify(); }
  },
  closeHandover(id: string): void {
    const h = state.handovers.find((x) => x.id === id);
    if (h) { h.status = 'Closed'; notify(); }
  },
  markNotificationRead(id: string): void {
    const n = state.notifications.find((x) => x.id === id);
    if (n) { n.unread = false; notify(); }
  },
  reset(): void { state = structuredClone(seed); notify(); },
};
