import { useSyncExternalStore } from 'react';

export type SportCategory = 'Football' | 'Netball' | 'Volleyball' | 'Basketball' | 'Athletics' | 'Rugby' | 'Hockey' | 'Swimming' | 'Badminton' | 'Table Tennis';
export type Division = 'Boys' | 'Girls' | 'Mixed';
export type TeamStatus = 'Active' | 'Inactive' | 'Trial';
export type TrainingStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';
export type FixtureStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'Postponed';
export type FixtureResult = 'Pending Result' | 'Won' | 'Lost' | 'Draw' | 'N/A';
export type EquipmentStatus = 'Available' | 'Issued' | 'Damaged' | 'Lost';
export type VenueStatus = 'Available' | 'Booked' | 'Maintenance' | 'Restricted';

export type Sport = {
  id: string; name: SportCategory; category: string; division: Division;
  ageGroup: string; coachId: string; coachName: string; season: string;
  status: TeamStatus;
};

export type Team = {
  id: string; sportId: string; sportName: string; division: Division;
  ageGroup: string; season: string; coachId: string; coachName: string;
  teamName: string; squadSize: number; status: TeamStatus;
  members: SquadMember[];
};

export type SquadMember = {
  studentId: string; studentName: string; className: string;
  position: string; squadNumber: number | null; joinDate: string;
  status: 'Active' | 'Injured' | 'Suspended' | 'Withdrawn';
  parentConsent: boolean;
};

export type TrainingSession = {
  id: string; teamId: string; teamName: string; sportName: string;
  date: string; startTime: string; endTime: string; venue: string;
  coach: string; objectives: string; requiredEquipment: string;
  status: TrainingStatus; attendance: TrainingAttendance[];
};

export type TrainingAttendance = {
  studentId: string; studentName: string; status: AttendanceStatus; note: string;
};

export type Fixture = {
  id: string; teamId: string; teamName: string; sportName: string;
  opponent: string; isHome: boolean; venue: string; date: string; time: string;
  travelArrangement: string; supervisor: string; status: FixtureStatus;
  result: FixtureResult; scoreFor: number | null; scoreAgainst: number | null;
  roster: string[];
};

export type Equipment = {
  id: string; name: string; category: string; sportName: string;
  totalQuantity: number; availableQuantity: number; condition: 'Good' | 'Fair' | 'Poor';
  status: EquipmentStatus;
};

export type EquipmentIssue = {
  id: string; equipmentId: string; equipmentName: string;
  issuedTo: string; issuedBy: string; issueDate: string; returnDate: string | null;
  condition: 'Good' | 'Fair' | 'Poor'; status: 'Issued' | 'Returned' | 'Damaged' | 'Lost';
};

export type Venue = {
  id: string; name: string; type: string; capacity: number;
  status: VenueStatus; notes: string;
};

export type SportsNotification = {
  id: string; recipient: string; title: string; detail: string; unread: boolean; date: string;
};

export type SportsAuditEntry = {
  id: string; actor: string; action: string; target: string; timestamp: string;
};

export type SportsDemoState = {
  sports: Sport[];
  teams: Team[];
  trainingSessions: TrainingSession[];
  fixtures: Fixture[];
  equipment: Equipment[];
  equipmentIssues: EquipmentIssue[];
  venues: Venue[];
  notifications: SportsNotification[];
  audit: SportsAuditEntry[];
};

export const SPORTS_POLICIES = {
  GAMES_TEACHER_SCOPED_ACCESS: true,
  TRAINING_SEPARATE_FROM_CLASS_ATTENDANCE: true,
  MEDICAL_DETAILS_NOT_EXPOSED: true,
  PENDING_RESULT_IF_NO_SCORE: true,
  VENUE_CONFLICT_DETECTION: true,
  PARENT_CONSENT_REQUIRED: true,
};

const seed: SportsDemoState = {
  sports: [
    { id: 'sp-001', name: 'Football', category: 'Field Sport', division: 'Boys', ageGroup: 'U16', coachId: 'coach-001', coachName: 'Coach Omondi', season: 'Term 3 2026', status: 'Active' },
    { id: 'sp-002', name: 'Netball', category: 'Court Sport', division: 'Girls', ageGroup: 'U16', coachId: 'coach-002', coachName: 'Coach Akinyi', season: 'Term 3 2026', status: 'Active' },
    { id: 'sp-003', name: 'Volleyball', category: 'Court Sport', division: 'Mixed', ageGroup: 'U14', coachId: 'coach-003', coachName: 'Coach Wanjiru', season: 'Term 3 2026', status: 'Active' },
    { id: 'sp-004', name: 'Athletics', category: 'Track & Field', division: 'Mixed', ageGroup: 'All', coachId: 'coach-001', coachName: 'Coach Omondi', season: 'Term 3 2026', status: 'Active' },
    { id: 'sp-005', name: 'Basketball', category: 'Court Sport', division: 'Boys', ageGroup: 'U18', coachId: 'coach-004', coachName: 'Coach Mwangi', season: 'Term 3 2026', status: 'Trial' },
  ],
  teams: [
    { id: 'tm-001', sportId: 'sp-001', sportName: 'Football', division: 'Boys', ageGroup: 'U16', season: 'Term 3 2026', coachId: 'coach-001', coachName: 'Coach Omondi', teamName: 'RA Boys U16 Football', squadSize: 5, status: 'Active', members: [
      { studentId: 'stu-014', studentName: 'Henry Kamau', className: 'Form 3 — Tana', position: 'Captain', squadNumber: 10, joinDate: '01 Sep 2026', status: 'Active', parentConsent: true },
      { studentId: 'stu-022', studentName: 'Henry Kamau', className: 'Form 3 — Tana', position: 'Forward', squadNumber: 9, joinDate: '01 Sep 2026', status: 'Active', parentConsent: true },
      { studentId: 'stu-023', studentName: 'Ibrahim Yusuf', className: 'Form 3 — Tana', position: 'Midfielder', squadNumber: 8, joinDate: '01 Sep 2026', status: 'Active', parentConsent: true },
      { studentId: 'stu-024', studentName: 'James Mutua', className: 'Form 3 — Tana', position: 'Defender', squadNumber: 4, joinDate: '01 Sep 2026', status: 'Active', parentConsent: true },
      { studentId: 'stu-025', studentName: 'Kevin Omondi', className: 'Form 3 — Tana', position: 'Goalkeeper', squadNumber: 1, joinDate: '01 Sep 2026', status: 'Injured', parentConsent: true },
    ]},
    { id: 'tm-002', sportId: 'sp-002', sportName: 'Netball', division: 'Girls', ageGroup: 'U16', season: 'Term 3 2026', coachId: 'coach-002', coachName: 'Coach Akinyi', teamName: 'RA Girls U16 Netball', squadSize: 4, status: 'Active', members: [
      { studentId: 'stu-030', studentName: 'Esther Nyambura', className: 'Form 4 — Athi', position: 'Goal Shooter', squadNumber: 7, joinDate: '01 Sep 2026', status: 'Active', parentConsent: true },
      { studentId: 'stu-031', studentName: 'Faith Achieng', className: 'Year 5 — Baobab', position: 'Wing Attack', squadNumber: 5, joinDate: '01 Sep 2026', status: 'Active', parentConsent: true },
      { studentId: 'stu-032', studentName: 'Grace Wanjiku', className: 'Form 2 — Tana', position: 'Centre', squadNumber: 6, joinDate: '01 Sep 2026', status: 'Active', parentConsent: true },
      { studentId: 'stu-033', studentName: 'Helen Atieno', className: 'Form 2 — Tana', position: 'Goal Keeper', squadNumber: 4, joinDate: '01 Sep 2026', status: 'Active', parentConsent: true },
    ]},
    { id: 'tm-003', sportId: 'sp-003', sportName: 'Volleyball', division: 'Mixed', ageGroup: 'U14', season: 'Term 3 2026', coachId: 'coach-003', coachName: 'Coach Wanjiru', teamName: 'RA Mixed U14 Volleyball', squadSize: 3, status: 'Active', members: [
      { studentId: 'stu-040', studentName: 'Alice Mwangi', className: 'Year 8 — Acacia', position: 'Setter', squadNumber: 3, joinDate: '01 Sep 2026', status: 'Active', parentConsent: true },
      { studentId: 'stu-041', studentName: 'Brian Otieno', className: 'Year 8 — Acacia', position: 'Spiker', squadNumber: 5, joinDate: '01 Sep 2026', status: 'Active', parentConsent: true },
      { studentId: 'stu-042', studentName: 'Cynthia Njeri', className: 'Year 8 — Acacia', position: 'Libero', squadNumber: 2, joinDate: '01 Sep 2026', status: 'Active', parentConsent: true },
    ]},
  ],
  trainingSessions: [
    { id: 'tr-001', teamId: 'tm-001', teamName: 'RA Boys U16 Football', sportName: 'Football', date: '16 Oct 2026', startTime: '16:00', endTime: '17:30', venue: 'Main Field', coach: 'Coach Omondi', objectives: 'Passing drills and positional play', requiredEquipment: 'Football, cones, bibs', status: 'Scheduled', attendance: [
      { studentId: 'stu-014', studentName: 'Henry Kamau', status: 'Present', note: '' },
      { studentId: 'stu-022', studentName: 'Henry Kamau', status: 'Present', note: '' },
      { studentId: 'stu-023', studentName: 'Ibrahim Yusuf', status: 'Present', note: '' },
      { studentId: 'stu-024', studentName: 'James Mutua', status: 'Late', note: 'Arrived 16:15' },
      { studentId: 'stu-025', studentName: 'Kevin Omondi', status: 'Excused', note: 'Injured — ankle' },
    ]},
    { id: 'tr-002', teamId: 'tm-002', teamName: 'RA Girls U16 Netball', sportName: 'Netball', date: '16 Oct 2026', startTime: '16:00', endTime: '17:00', venue: 'Netball Court', coach: 'Coach Akinyi', objectives: 'Shooting practice and court movement', requiredEquipment: 'Netballs, bibs', status: 'Scheduled', attendance: [
      { studentId: 'stu-030', studentName: 'Esther Nyambura', status: 'Present', note: '' },
      { studentId: 'stu-031', studentName: 'Faith Achieng', status: 'Present', note: '' },
      { studentId: 'stu-032', studentName: 'Grace Wanjiku', status: 'Present', note: '' },
      { studentId: 'stu-033', studentName: 'Helen Atieno', status: 'Absent', note: 'No reason given' },
    ]},
    { id: 'tr-003', teamId: 'tm-001', teamName: 'RA Boys U16 Football', sportName: 'Football', date: '14 Oct 2026', startTime: '16:00', endTime: '17:30', venue: 'Main Field', coach: 'Coach Omondi', objectives: 'Fitness and endurance training', requiredEquipment: 'Football, cones', status: 'Completed', attendance: [
      { studentId: 'stu-014', studentName: 'Henry Kamau', status: 'Present', note: '' },
      { studentId: 'stu-022', studentName: 'Henry Kamau', status: 'Present', note: '' },
      { studentId: 'stu-023', studentName: 'Ibrahim Yusuf', status: 'Present', note: '' },
      { studentId: 'stu-024', studentName: 'James Mutua', status: 'Present', note: '' },
      { studentId: 'stu-025', studentName: 'Kevin Omondi', status: 'Excused', note: 'Injured' },
    ]},
  ],
  fixtures: [
    { id: 'fx-001', teamId: 'tm-001', teamName: 'RA Boys U16 Football', sportName: 'Football', opponent: 'St. Mary\'s School', isHome: true, venue: 'Main Field', date: '19 Oct 2026', time: '15:00', travelArrangement: 'N/A — home match', supervisor: 'Coach Omondi', status: 'Scheduled', result: 'Pending Result', scoreFor: null, scoreAgainst: null, roster: ['Henry Kamau', 'Ibrahim Yusuf', 'James Mutua'] },
    { id: 'fx-002', teamId: 'tm-002', teamName: 'RA Girls U16 Netball', sportName: 'Netball', opponent: 'Greenwood Academy', isHome: false, venue: 'Greenwood Academy Court', date: '22 Oct 2026', time: '14:00', travelArrangement: 'School bus departing 13:00', supervisor: 'Coach Akinyi', status: 'Scheduled', result: 'Pending Result', scoreFor: null, scoreAgainst: null, roster: ['Esther Nyambura', 'Faith Achieng', 'Grace Wanjiku'] },
    { id: 'fx-003', teamId: 'tm-001', teamName: 'RA Boys U16 Football', sportName: 'Football', opponent: 'Hillcrest School', isHome: false, venue: 'Hillcrest Field', date: '12 Oct 2026', time: '15:00', travelArrangement: 'School bus departing 13:30', supervisor: 'Coach Omondi', status: 'Completed', result: 'Won', scoreFor: 3, scoreAgainst: 1, roster: ['Henry Kamau', 'Ibrahim Yusuf', 'James Mutua', 'Kevin Omondi'] },
    { id: 'fx-004', teamId: 'tm-003', teamName: 'RA Mixed U14 Volleyball', sportName: 'Volleyball', opponent: 'Braeside School', isHome: true, venue: 'School Hall', date: '10 Oct 2026', time: '15:30', travelArrangement: 'N/A — home match', supervisor: 'Coach Wanjiru', status: 'Completed', result: 'Lost', scoreFor: 1, scoreAgainst: 2, roster: ['Alice Mwangi', 'Brian Otieno', 'Cynthia Njeri'] },
  ],
  equipment: [
    { id: 'eq-001', name: 'Football', category: 'Balls', sportName: 'Football', totalQuantity: 15, availableQuantity: 12, condition: 'Good', status: 'Available' },
    { id: 'eq-002', name: 'Netball', category: 'Balls', sportName: 'Netball', totalQuantity: 10, availableQuantity: 8, condition: 'Good', status: 'Available' },
    { id: 'eq-003', name: 'Volleyball', category: 'Balls', sportName: 'Volleyball', totalQuantity: 8, availableQuantity: 6, condition: 'Fair', status: 'Available' },
    { id: 'eq-004', name: 'Training Bibs', category: 'Apparel', sportName: 'General', totalQuantity: 30, availableQuantity: 24, condition: 'Good', status: 'Available' },
    { id: 'eq-005', name: 'Training Cones', category: 'Equipment', sportName: 'General', totalQuantity: 50, availableQuantity: 45, condition: 'Good', status: 'Available' },
    { id: 'eq-006', name: 'Basketball', category: 'Balls', sportName: 'Basketball', totalQuantity: 6, availableQuantity: 4, condition: 'Fair', status: 'Available' },
  ],
  equipmentIssues: [
    { id: 'iss-001', equipmentId: 'eq-001', equipmentName: 'Football', issuedTo: 'Coach Omondi', issuedBy: 'Sports Store', issueDate: '16 Oct 2026', returnDate: null, condition: 'Good', status: 'Issued' },
    { id: 'iss-002', equipmentId: 'eq-002', equipmentName: 'Netball', issuedTo: 'Coach Akinyi', issuedBy: 'Sports Store', issueDate: '16 Oct 2026', returnDate: null, condition: 'Good', status: 'Issued' },
    { id: 'iss-003', equipmentId: 'eq-004', equipmentName: 'Training Bibs', issuedTo: 'Coach Omondi', issuedBy: 'Sports Store', issueDate: '14 Oct 2026', returnDate: '14 Oct 2026', condition: 'Good', status: 'Returned' },
  ],
  venues: [
    { id: 'vn-001', name: 'Main Field', type: 'Field', capacity: 500, status: 'Available', notes: 'Football and athletics' },
    { id: 'vn-002', name: 'Netball Court', type: 'Court', capacity: 200, status: 'Available', notes: 'Netball only' },
    { id: 'vn-003', name: 'School Hall', type: 'Indoor', capacity: 300, status: 'Available', notes: 'Volleyball and indoor activities' },
    { id: 'vn-004', name: 'Basketball Court', type: 'Court', capacity: 200, status: 'Maintenance', notes: 'Resurfacing in progress' },
    { id: 'vn-005', name: 'Swimming Pool', type: 'Pool', capacity: 100, status: 'Restricted', notes: 'Under repair — no access' },
  ],
  notifications: [
    { id: 'sn-001', recipient: 'Coach Omondi', title: 'Training session today', detail: 'Football training at 16:00 on Main Field — 5 squad members.', unread: true, date: '16 Oct 2026' },
    { id: 'sn-002', recipient: 'Coach Omondi', title: 'Fixture reminder', detail: 'Home match vs St. Mary\'s on 19 Oct at 15:00.', unread: true, date: '15 Oct 2026' },
    { id: 'sn-003', recipient: 'Coach Akinyi', title: 'Away fixture confirmed', detail: 'Netball vs Greenwood Academy on 22 Oct. Bus departs 13:00.', unread: true, date: '14 Oct 2026' },
    { id: 'sn-004', recipient: 'Coach Wanjiru', title: 'Venue available', detail: 'School Hall booked for volleyball on 10 Oct.', unread: false, date: '10 Oct 2026' },
  ],
  audit: [
    { id: 'sa-001', actor: 'Coach Omondi', action: 'Scheduled training', target: 'Football — 16 Oct 16:00', timestamp: '15 Oct 2026, 10:00' },
    { id: 'sa-002', actor: 'Coach Omondi', action: 'Recorded result', target: 'Football vs Hillcrest — Won 3-1', timestamp: '12 Oct 2026, 17:00' },
    { id: 'sa-003', actor: 'Coach Akinyi', action: 'Issued equipment', target: 'Netball to Coach Akinyi', timestamp: '16 Oct 2026, 15:55' },
  ],
};

let state: SportsDemoState = structuredClone(seed);
const listeners = new Set<() => void>();
function notify() { listeners.forEach((l) => l()); }
function subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l); }; }
function getSnapshot() { return state; }
export function useSportsDemo() { return useSyncExternalStore(subscribe, getSnapshot, getSnapshot); }
function audit(action: string, target: string, actor = 'Coach Omondi') {
  state.audit.unshift({ id: `sa-${Date.now()}`, actor, action, target, timestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) });
}
function nextId(prefix: string) { return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`; }

export const sportsDemo = {
  createTeam(sportId: string, teamName: string, coachId: string, coachName: string, division: Division, ageGroup: string): { ok: boolean; error?: string } {
    if (!teamName.trim()) return { ok: false, error: 'Team name is required.' };
    const sport = state.sports.find((s) => s.id === sportId);
    if (!sport) return { ok: false, error: 'Sport not found.' };
    state.teams.push({ id: nextId('tm'), sportId, sportName: sport.name, division, ageGroup, season: sport.season, coachId, coachName, teamName, squadSize: 0, status: 'Active', members: [] });
    audit('Created team', teamName); notify();
    return { ok: true };
  },
  addSquadMember(teamId: string, studentId: string, studentName: string, className: string, position: string, squadNumber: number | null): { ok: boolean; error?: string } {
    const team = state.teams.find((t) => t.id === teamId);
    if (!team) return { ok: false, error: 'Team not found.' };
    const existing = team.members.find((m) => m.studentId === studentId);
    if (existing) return { ok: false, error: 'Student is already a squad member.' };
    team.members.push({ studentId, studentName, className, position, squadNumber, joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), status: 'Active', parentConsent: true });
    team.squadSize++;
    audit('Added squad member', `${studentName} to ${team.teamName}`); notify();
    return { ok: true };
  },
  removeSquadMember(teamId: string, studentId: string): { ok: boolean; error?: string } {
    const team = state.teams.find((t) => t.id === teamId);
    if (!team) return { ok: false, error: 'Team not found.' };
    const m = team.members.find((x) => x.studentId === studentId);
    if (!m) return { ok: false, error: 'Member not found.' };
    m.status = 'Withdrawn'; team.squadSize--;
    audit('Removed squad member', `${m.studentName} from ${team.teamName}`); notify();
    return { ok: true };
  },
  createTraining(teamId: string, date: string, startTime: string, endTime: string, venue: string, objectives: string, requiredEquipment: string): { ok: boolean; error?: string } {
    const team = state.teams.find((t) => t.id === teamId);
    if (!team) return { ok: false, error: 'Team not found.' };
    const overlap = state.trainingSessions.find((ts) => ts.venue === venue && ts.date === date && ts.status === 'Scheduled' && ((startTime >= ts.startTime && startTime < ts.endTime) || (endTime > ts.startTime && endTime <= ts.endTime)));
    if (overlap) return { ok: false, error: `Venue conflict: ${overlap.venue} booked for ${overlap.teamName} (${overlap.startTime}–${overlap.endTime}).` };
    state.trainingSessions.unshift({ id: nextId('tr'), teamId, teamName: team.teamName, sportName: team.sportName, date, startTime, endTime, venue, coach: team.coachName, objectives, requiredEquipment, status: 'Scheduled', attendance: team.members.filter((m) => m.status === 'Active').map((m) => ({ studentId: m.studentId, studentName: m.studentName, status: 'Present' as AttendanceStatus, note: '' })) });
    audit('Scheduled training', `${team.teamName} — ${date} ${startTime}`); notify();
    return { ok: true };
  },
  markTrainingAttendance(trainingId: string, studentId: string, status: AttendanceStatus, note: string): { ok: boolean; error?: string } {
    const ts = state.trainingSessions.find((t) => t.id === trainingId);
    if (!ts) return { ok: false, error: 'Training session not found.' };
    const att = ts.attendance.find((a) => a.studentId === studentId);
    if (!att) return { ok: false, error: 'Student not in this session.' };
    att.status = status; att.note = note; notify();
    return { ok: true };
  },
  completeTraining(id: string): { ok: boolean; error?: string } {
    const ts = state.trainingSessions.find((t) => t.id === id);
    if (!ts) return { ok: false, error: 'Training session not found.' };
    ts.status = 'Completed';
    audit('Completed training', `${ts.teamName} — ${ts.date}`); notify();
    return { ok: true };
  },
  createFixture(teamId: string, opponent: string, isHome: boolean, venue: string, date: string, time: string, supervisor: string, travelArrangement: string): { ok: boolean; error?: string } {
    const team = state.teams.find((t) => t.id === teamId);
    if (!team) return { ok: false, error: 'Team not found.' };
    if (!opponent.trim()) return { ok: false, error: 'Opponent is required.' };
    state.fixtures.unshift({ id: nextId('fx'), teamId, teamName: team.teamName, sportName: team.sportName, opponent, isHome, venue, date, time, travelArrangement, supervisor, status: 'Scheduled', result: 'Pending Result', scoreFor: null, scoreAgainst: null, roster: team.members.filter((m) => m.status === 'Active').map((m) => m.studentName) });
    audit('Created fixture', `${team.teamName} vs ${opponent}`); notify();
    return { ok: true };
  },
  recordResult(id: string, result: FixtureResult, scoreFor: number, scoreAgainst: number): { ok: boolean; error?: string } {
    const fx = state.fixtures.find((f) => f.id === id);
    if (!fx) return { ok: false, error: 'Fixture not found.' };
    if (fx.status !== 'Completed') fx.status = 'Completed';
    fx.result = result; fx.scoreFor = scoreFor; fx.scoreAgainst = scoreAgainst;
    audit('Recorded result', `${fx.teamName} vs ${fx.opponent} — ${result}`, fx.supervisor); notify();
    return { ok: true };
  },
  issueEquipment(equipmentId: string, issuedTo: string, condition: 'Good' | 'Fair' | 'Poor'): { ok: boolean; error?: string } {
    const eq = state.equipment.find((e) => e.id === equipmentId);
    if (!eq) return { ok: false, error: 'Equipment not found.' };
    if (eq.availableQuantity <= 0) return { ok: false, error: 'No available quantity.' };
    eq.availableQuantity--;
    state.equipmentIssues.unshift({ id: nextId('iss'), equipmentId, equipmentName: eq.name, issuedTo, issuedBy: 'Sports Store', issueDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), returnDate: null, condition, status: 'Issued' });
    audit('Issued equipment', `${eq.name} to ${issuedTo}`); notify();
    return { ok: true };
  },
  returnEquipment(issueId: string, condition: 'Good' | 'Fair' | 'Poor'): { ok: boolean; error?: string } {
    const iss = state.equipmentIssues.find((i) => i.id === issueId);
    if (!iss) return { ok: false, error: 'Issue record not found.' };
    if (iss.status === 'Returned') return { ok: false, error: 'Already returned.' };
    iss.status = 'Returned'; iss.returnDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); iss.condition = condition;
    const eq = state.equipment.find((e) => e.id === iss.equipmentId);
    if (eq) eq.availableQuantity++;
    audit('Returned equipment', iss.equipmentName); notify();
    return { ok: true };
  },
  markNotificationRead(id: string): void {
    const n = state.notifications.find((x) => x.id === id);
    if (n) { n.unread = false; notify(); }
  },
  reset(): void { state = structuredClone(seed); notify(); },
};
