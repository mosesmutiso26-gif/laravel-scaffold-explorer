import { useState, useCallback } from 'react';

export interface Club {
  id: string;
  name: string;
  code: string;
  category: string;
  patron: string;
  capacity: number;
  members: number;
  status: 'Active' | 'Draft' | 'Suspended' | 'Archived';
  meetingDay: string;
  venue: string;
}

export interface Membership {
  id: string;
  clubId: string;
  clubName: string;
  studentName: string;
  className: string;
  status: 'Applied' | 'Under Review' | 'Approved' | 'Active' | 'Withdrawn' | 'Rejected' | 'Waitlisted';
  appliedDate: string;
}

export interface ActivityEvent {
  id: string;
  title: string;
  club: string;
  date: string;
  time: string;
  venue: string;
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Scheduled' | 'Completed' | 'Cancelled';
  expectedAttendance: number;
}

export interface Competition {
  id: string;
  name: string;
  level: 'Internal' | 'Inter-Class' | 'Inter-House' | 'Inter-School' | 'County' | 'Regional' | 'National';
  date: string;
  venue: string;
  status: 'Registration Open' | 'Ongoing' | 'Completed';
  result: string;
}

export interface Achievement {
  id: string;
  studentName: string;
  club: string;
  title: string;
  level: 'School' | 'Sub-County' | 'County' | 'Regional' | 'National' | 'International';
  date: string;
  verified: boolean;
  visibility: 'Private' | 'Staff Only' | 'Published';
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  status: 'Draft' | 'Submitted' | 'Reviewed' | 'Approved' | 'Consent Collection' | 'Ready for Departure' | 'In Progress' | 'Returned' | 'Report Submitted' | 'Closed';
  participants: number;
  consentReceived: number;
  supervisor: string;
}

export interface CoCurricularNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

const initialClubs: Club[] = [
  { id: 'c1', name: 'Science & Innovation Club', code: 'SCI-001', category: 'STEM', patron: 'Mr. David Omondi', capacity: 40, members: 35, status: 'Active', meetingDay: 'Wednesday', venue: 'Science Lab 1' },
  { id: 'c2', name: 'Debate & Public Speaking', code: 'DEB-002', category: 'Humanities', patron: 'Mrs. Mary Njoki', capacity: 30, members: 28, status: 'Active', meetingDay: 'Thursday', venue: 'Main Hall' },
  { id: 'c3', name: 'Music & Choir', code: 'MUS-003', category: 'Creative Arts', patron: 'Ms. Faith Achieng', capacity: 50, members: 42, status: 'Active', meetingDay: 'Tuesday', venue: 'Music Room' },
  { id: 'c4', name: 'Computer & Coding Club', code: 'ICT-004', category: 'STEM', patron: 'Mr. Samuel Kamau', capacity: 35, members: 30, status: 'Active', meetingDay: 'Friday', venue: 'ICT Lab 1' },
  { id: 'c5', name: 'Environment & Wildlife', code: 'ENV-005', category: 'Service', patron: 'Ms. Sarah Wambui', capacity: 40, members: 22, status: 'Active', meetingDay: 'Saturday', venue: 'School Garden' },
  { id: 'c6', name: 'Drama & Theatre', code: 'DRA-006', category: 'Creative Arts', patron: 'Mrs. Rose Akinyi', capacity: 35, members: 0, status: 'Draft', meetingDay: 'Monday', venue: 'Drama Studio' },
];

const initialMemberships: Membership[] = [
  { id: 'm1', clubId: 'c1', clubName: 'Science & Innovation Club', studentName: 'Amani Wanjiku', className: 'Year 6 — Cedar', status: 'Active', appliedDate: '2026-01-15' },
  { id: 'm2', clubId: 'c2', clubName: 'Debate & Public Speaking', studentName: 'Brian Otieno', className: 'Year 8 — Acacia', status: 'Active', appliedDate: '2026-01-20' },
  { id: 'm3', clubId: 'c3', clubName: 'Music & Choir', studentName: 'Chloe Njeri', className: 'Form 2 — Tana', status: 'Applied', appliedDate: '2026-10-10' },
  { id: 'm4', clubId: 'c4', clubName: 'Computer & Coding Club', studentName: 'Dylan Kamau', className: 'Form 4 — Athi', status: 'Under Review', appliedDate: '2026-10-12' },
  { id: 'm5', clubId: 'c5', clubName: 'Environment & Wildlife', studentName: 'Eric Mwangi', className: 'Year 7 — Baobab', status: 'Approved', appliedDate: '2026-10-08' },
  { id: 'm6', clubId: 'c1', clubName: 'Science & Innovation Club', studentName: 'Fiona Wambui', className: 'Form 3 — Sabaki', status: 'Waitlisted', appliedDate: '2026-10-05' },
];

const initialEvents: ActivityEvent[] = [
  { id: 'e1', title: 'Science Fair Preparation', club: 'Science & Innovation Club', date: '2026-10-18', time: '15:00', venue: 'Science Lab 1', status: 'Scheduled', expectedAttendance: 35 },
  { id: 'e2', title: 'Inter-House Debate', club: 'Debate & Public Speaking', date: '2026-10-20', time: '14:00', venue: 'Main Hall', status: 'Approved', expectedAttendance: 60 },
  { id: 'e3', title: 'Choir Rehearsal', club: 'Music & Choir', date: '2026-10-17', time: '16:00', venue: 'Music Room', status: 'Completed', expectedAttendance: 42 },
  { id: 'e4', title: 'Coding Workshop', club: 'Computer & Coding Club', date: '2026-10-22', time: '15:30', venue: 'ICT Lab 1', status: 'Pending Approval', expectedAttendance: 30 },
];

const initialCompetitions: Competition[] = [
  { id: 'comp1', name: 'National Science & Engineering Fair', level: 'National', date: '2026-11-10', venue: 'KICC Nairobi', status: 'Registration Open', result: 'Pending' },
  { id: 'comp2', name: 'Inter-House Quiz Championship', level: 'Inter-House', date: '2026-10-25', venue: 'Main Hall', status: 'Ongoing', result: 'Pending' },
  { id: 'comp3', name: 'County Music Festival', level: 'County', date: '2026-09-28', venue: 'County Hall', status: 'Completed', result: '1st Place — Choir' },
  { id: 'comp4', name: 'Regional Debate Tournament', level: 'Regional', date: '2026-10-12', venue: 'Nakuru', status: 'Completed', result: '2nd Place — Team' },
];

const initialAchievements: Achievement[] = [
  { id: 'a1', studentName: 'Amani Wanjiku', club: 'Science & Innovation Club', title: 'Best Innovation Project', level: 'County', date: '2026-09-15', verified: true, visibility: 'Published' },
  { id: 'a2', studentName: 'Brian Otieno', club: 'Debate & Public Speaking', title: 'Best Speaker Award', level: 'Regional', date: '2026-10-12', verified: true, visibility: 'Published' },
  { id: 'a3', studentName: 'Chloe Njeri', club: 'Music & Choir', title: 'Outstanding Vocal Performance', level: 'County', date: '2026-09-28', verified: false, visibility: 'Staff Only' },
  { id: 'a4', studentName: 'Dylan Kamau', club: 'Computer & Coding Club', title: 'Hackathon Winner', level: 'School', date: '2026-10-05', verified: true, visibility: 'Published' },
];

const initialTrips: Trip[] = [
  { id: 't1', title: 'Geography Field Study — Rift Valley', destination: 'Naivasha', departureDate: '2026-11-05', returnDate: '2026-11-06', status: 'Consent Collection', participants: 40, consentReceived: 28, supervisor: 'Mr. James Miriti' },
  { id: 't2', title: 'Parliament Visit — Civic Education', destination: 'Parliament Buildings, Nairobi', departureDate: '2026-10-28', returnDate: '2026-10-28', status: 'Approved', participants: 30, consentReceived: 30, supervisor: 'Mrs. Mary Njoki' },
  { id: 't3', title: 'Science Museum Tour', destination: 'Nairobi National Museum', departureDate: '2026-11-15', returnDate: '2026-11-15', status: 'Draft', participants: 35, consentReceived: 0, supervisor: 'Mr. David Omondi' },
];

const initialNotifications: CoCurricularNotification[] = [
  { id: 'n1', title: 'New membership application', message: 'Chloe Njeri applied for Music & Choir', time: '2h ago', unread: true },
  { id: 'n2', title: 'Event pending approval', message: 'Coding Workshop requires coordinator approval', time: '5h ago', unread: true },
  { id: 'n3', title: 'Consent deadline approaching', message: 'Geography Field Study — 12 consent forms pending', time: '1d ago', unread: false },
  { id: 'n4', title: 'Competition result recorded', message: 'Regional Debate Tournament — 2nd Place', time: '3d ago', unread: false },
];

export function useCoCurricularDemo() {
  const [clubs, setClubs] = useState<Club[]>(initialClubs);
  const [memberships, setMemberships] = useState<Membership[]>(initialMemberships);
  const [events] = useState<ActivityEvent[]>(initialEvents);
  const [competitions] = useState<Competition[]>(initialCompetitions);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [notifications] = useState<CoCurricularNotification[]>(initialNotifications);

  const createClub = useCallback((name: string, code: string, category: string, patron: string, capacity: number, meetingDay: string, venue: string) => {
    const newClub: Club = { id: `c${Date.now()}`, name, code, category, patron, capacity, members: 0, status: 'Draft', meetingDay, venue };
    setClubs((prev) => [...prev, newClub]);
    return { ok: true };
  }, []);

  const approveMembership = useCallback((id: string) => {
    setMemberships((prev) => prev.map((m) => m.id === id ? { ...m, status: 'Active' } : m));
    return { ok: true };
  }, []);

  const rejectMembership = useCallback((id: string) => {
    setMemberships((prev) => prev.map((m) => m.id === id ? { ...m, status: 'Rejected' } : m));
    return { ok: true };
  }, []);

  const verifyAchievement = useCallback((id: string) => {
    setAchievements((prev) => prev.map((a) => a.id === id ? { ...a, verified: true } : a));
    return { ok: true };
  }, []);

  const advanceTrip = useCallback((id: string) => {
    const flow: Trip['status'][] = ['Draft', 'Submitted', 'Reviewed', 'Approved', 'Consent Collection', 'Ready for Departure', 'In Progress', 'Returned', 'Report Submitted', 'Closed'];
    setTrips((prev) => prev.map((t) => {
      if (t.id !== id) return t;
      const idx = flow.indexOf(t.status);
      if (idx < flow.length - 1) return { ...t, status: flow[idx + 1] };
      return t;
    }));
    return { ok: true };
  }, []);

  return { clubs, memberships, events, competitions, achievements, trips, notifications, createClub, approveMembership, rejectMembership, verifyAchievement, advanceTrip };
}

export const coCurricularDemo = {
  createClub: (name: string, code: string, category: string, patron: string, capacity: number, meetingDay: string, venue: string) => ({ ok: true }),
  reset: () => {},
};
