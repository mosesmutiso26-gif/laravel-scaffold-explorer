import { useState, useCallback } from 'react';

export interface StrategicKpi {
  id: string;
  pillar: string;
  objective: string;
  kpi: string;
  baseline: string;
  target: string;
  actual: string;
  period: string;
  owner: string;
  status: 'On Track' | 'At Risk' | 'Behind' | 'Exceeded' | 'No Target';
  evidence: string;
  correctiveAction: string;
  dueDate: string;
}

export interface InstitutionalRisk {
  id: string;
  ref: string;
  title: string;
  category: 'Financial' | 'Academic' | 'Operational' | 'Compliance' | 'Safeguarding' | 'Infrastructure' | 'Reputational';
  likelihood: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  rating: 'Low' | 'Medium' | 'High' | 'Critical';
  owner: string;
  mitigation: string;
  dueDate: string;
  status: 'Open' | 'Mitigating' | 'Monitoring' | 'Closed';
  reviewDate: string;
}

export interface ComplianceItem {
  id: string;
  requirement: string;
  authority: string;
  deadline: string;
  status: 'Compliant' | 'Pending' | 'Overdue' | 'In Progress';
  evidence: string;
  reviewedBy: string;
  reviewDate: string;
}

export interface StrategicProject {
  id: string;
  name: string;
  scope: string;
  owner: string;
  budget: string;
  spent: string;
  completion: number;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Completed' | 'Planning';
  milestones: string;
  risks: string;
  decisionNeeded: string;
}

export interface BoardMeeting {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  type: 'Regular' | 'Special' | 'AGM' | 'Emergency';
  status: 'Draft' | 'Scheduled' | 'Published' | 'In Progress' | 'Completed' | 'Minutes Pending' | 'Archived';
  attendees: number;
  agendaItems: number;
  resolutions: number;
  actionsOverdue: number;
}

export interface AgendaItem {
  id: string;
  meetingId: string;
  order: number;
  title: string;
  presenter: string;
  type: 'Report' | 'Decision' | 'Discussion' | 'Election' | 'Approval';
  duration: string;
  status: 'Pending' | 'Presented' | 'Deferred' | 'Adopted' | 'Rejected';
  attachments: number;
}

export interface BoardResolution {
  id: string;
  ref: string;
  title: string;
  originModule: string;
  type: 'Budget Approval' | 'Policy' | 'Procurement' | 'Appointment' | 'Capital Project' | 'Admission' | 'Strategic';
  submittedBy: string;
  justification: string;
  status: 'Pending Review' | 'Clarification Requested' | 'Approved' | 'Rejected' | 'Deferred' | 'Implemented';
  decisionDate: string;
  owner: string;
  deadline: string;
  voteFor: number;
  voteAgainst: number;
  abstentions: number;
  selfApproveBlocked: boolean;
}

export interface AuditEvent {
  id: string;
  actor: string;
  action: string;
  resource: string;
  timestamp: string;
  detail: string;
  severity: 'Info' | 'Warning' | 'Critical';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'Risk' | 'Meeting' | 'Decision' | 'Finance' | 'Compliance' | 'Academic' | 'Infrastructure';
  time: string;
  unread: boolean;
  severity: 'Info' | 'Warning' | 'Critical';
}

export interface ReportDefinition {
  id: string;
  title: string;
  description: string;
  source: string;
  lastGenerated: string;
  status: 'Ready' | 'Partial' | 'Unavailable';
  sections: number;
  availableSections: number;
}

export interface DirectorKpi {
  id: string;
  label: string;
  value: string;
  period: string;
  source: string;
  trend: 'up' | 'down' | 'flat' | 'none';
  trendValue: string;
  detail: string;
}

export interface FinancialSummary {
  id: string;
  category: string;
  budget: string;
  actual: string;
  variance: string;
  variancePct: string;
  status: 'Favourable' | 'Unfavourable' | 'On Budget';
  source: string;
}

export interface EnrollmentBreakdown {
  id: string;
  section: string;
  enrolled: number;
  capacity: number;
  retention: string;
  boarding: number;
  day: number;
}

export interface AcademicScorecard {
  id: string;
  subject: string;
  average: string;
  passRate: string;
  trend: 'up' | 'down' | 'flat';
  trendValue: string;
  completion: string;
  source: string;
}

export interface StaffingSummary {
  id: string;
  department: string;
  established: number;
  current: number;
  gap: number;
  appraisalCompletion: string;
  source: string;
}

export interface WelfareIndicator {
  id: string;
  area: string;
  indicator: string;
  value: string;
  status: 'Good' | 'Warning' | 'Critical' | 'Not Configured';
  source: string;
  detail: string;
}

const initialKpis: DirectorKpi[] = [
  { id: 'k1', label: 'Total enrolled students', value: '1,248', period: 'Term 3, 2026', source: 'Enrolment module', trend: 'up', trendValue: '+6.8%', detail: 'Target: 1,300 · 96% capacity' },
  { id: 'k2', label: 'Attendance rate', value: '94.2%', period: 'Week of 16 Oct 2026', source: 'Attendance module', trend: 'up', trendValue: '+1.4%', detail: '1,176 present · 30 absent · 14 unexplained' },
  { id: 'k3', label: 'Fee collection', value: 'KES 18.4M', period: 'Term 3 to date', source: 'Finance module — verified receipts only', trend: 'up', trendValue: '+8.4%', detail: 'Outstanding: KES 4.8M · 184 accounts' },
  { id: 'k4', label: 'Approved expenditure', value: 'KES 12.2M', period: 'Term 3 to date', source: 'Finance module — approved payments', trend: 'flat', trendValue: '67% of budget', detail: 'Budget: KES 18.2M · Variance: -KES 0.2M' },
  { id: 'k5', label: 'Teaching staff', value: '78', period: 'October 2026', source: 'HR module', trend: 'flat', trendValue: '0', detail: '6 subject gaps · 8 support staff' },
  { id: 'k6', label: 'Boarding occupancy', value: '96%', period: '16 Oct 2026', source: 'Boarding module', trend: 'down', trendValue: '-2%', detail: '180 of 188 beds occupied · 8 vacant' },
  { id: 'k7', label: 'Open strategic risks', value: '7', period: 'Q4 2026', source: 'Risk register', trend: 'down', trendValue: '-2', detail: '2 high · 3 medium · 2 low' },
  { id: 'k8', label: 'Pending board decisions', value: '4', period: 'Current cycle', source: 'Resolution centre', trend: 'none', trendValue: '', detail: '2 overdue · 1 clarification requested' },
];

const initialScorecard: StrategicKpi[] = [
  { id: 's1', pillar: 'Academic Excellence', objective: 'Improve mean score across all subjects', kpi: 'School mean score', baseline: '64.2%', target: '72%', actual: '68.4%', period: 'Term 3, 2026', owner: 'Academic Office', status: 'On Track', evidence: 'Assessment results — 1,840 grades recorded', correctiveAction: 'Continue targeted intervention in Maths and Sciences', dueDate: '2026-12-15' },
  { id: 's2', pillar: 'Enrollment & Retention', objective: 'Maintain enrollment above 95% capacity', kpi: 'Enrollment fill rate', baseline: '88%', target: '95%', actual: '96%', period: 'Term 3, 2026', owner: 'Admissions Office', status: 'Exceeded', evidence: 'Enrolment records — 1,248 of 1,300', correctiveAction: 'No action required', dueDate: '2026-12-31' },
  { id: 's3', pillar: 'Student Welfare', objective: 'Reduce chronic absenteeism', kpi: 'Chronic absenteeism rate', baseline: '5.8%', target: 'Below 3%', actual: '4.2%', period: 'Term 3, 2026', owner: 'Student Welfare', status: 'At Risk', evidence: 'Attendance module — 52 students flagged', correctiveAction: 'Increase guardian engagement for flagged students', dueDate: '2026-11-30' },
  { id: 's4', pillar: 'Financial Sustainability', objective: 'Achieve 85% fee collection rate', kpi: 'Collection rate', baseline: '71%', target: '85%', actual: '79.3%', period: 'Term 3 to date', owner: 'Bursary', status: 'On Track', evidence: 'Finance module — verified receipts only', correctiveAction: 'Send reminder cycle to 184 outstanding accounts', dueDate: '2026-11-15' },
  { id: 's5', pillar: 'Staff Effectiveness', objective: 'Complete all staff appraisals', kpi: 'Appraisal completion', baseline: '45%', target: '100%', actual: '62%', period: '2026 academic year', owner: 'HR Office', status: 'Behind', evidence: 'HR module — 53 of 86 appraisals logged', correctiveAction: 'Schedule remaining appraisals before November break', dueDate: '2026-11-10' },
  { id: 's6', pillar: 'Infrastructure', objective: 'Complete lab renovation project', kpi: 'Project completion', baseline: '0%', target: '100%', actual: '45%', period: 'Q3–Q4 2026', owner: 'Operations', status: 'At Risk', evidence: 'Project tracker — 4 of 9 milestones completed', correctiveAction: 'Resolve procurement delay for lab benches', dueDate: '2026-12-20' },
  { id: 's7', pillar: 'Governance & Compliance', objective: 'Close all overdue compliance items', kpi: 'Overdue compliance items', baseline: '5', target: '0', actual: '2', period: 'Q4 2026', owner: 'Board Secretary', status: 'At Risk', evidence: 'Compliance register — 2 items overdue', correctiveAction: 'Submit safety certification renewal and fire inspection report', dueDate: '2026-10-31' },
  { id: 's8', pillar: 'Digital Readiness', objective: 'Deploy school management system to all departments', kpi: 'Module adoption', baseline: '40%', target: '90%', actual: '78%', period: 'October 2026', owner: 'ICT Department', status: 'On Track', evidence: 'System audit — 14 of 18 modules active', correctiveAction: 'Onboard remaining 4 modules by November', dueDate: '2026-11-30' },
  { id: 's9', pillar: 'Parent & Community', objective: 'Increase parent portal usage', kpi: 'Active parent accounts', baseline: '320', target: '800', actual: '540', period: 'October 2026', owner: 'Communications', status: 'On Track', evidence: 'Parent portal analytics', correctiveAction: 'Send portal activation reminders during parent meetings', dueDate: '2026-12-15' },
  { id: 's10', pillar: 'Boarding & Welfare', objective: 'Maintain boarding occupancy above 90%', kpi: 'Boarding occupancy', baseline: '92%', target: '95%', actual: '96%', period: '16 Oct 2026', owner: 'Boarding Department', status: 'Exceeded', evidence: 'Boarding module — 180 of 188 beds', correctiveAction: 'No action required', dueDate: '2026-12-31' },
];

const initialRisks: InstitutionalRisk[] = [
  { id: 'r1', ref: 'RSK-001', title: 'Fee collection below target', category: 'Financial', likelihood: 'Medium', impact: 'High', rating: 'High', owner: 'Bursary', mitigation: 'Reminder cycle to 184 accounts · payment plans offered', dueDate: '2026-11-15', status: 'Mitigating', reviewDate: '2026-10-30' },
  { id: 'r2', ref: 'RSK-002', title: 'Science lab renovation delay', category: 'Infrastructure', likelihood: 'High', impact: 'Medium', rating: 'High', owner: 'Operations', mitigation: 'Procurement of lab benches expedited — supplier contacted', dueDate: '2026-11-10', status: 'Open', reviewDate: '2026-10-25' },
  { id: 'r3', ref: 'RSK-003', title: 'Safety certification expiring', category: 'Compliance', likelihood: 'High', impact: 'High', rating: 'Critical', owner: 'Board Secretary', mitigation: 'Inspection booked for 28 Oct · documentation being prepared', dueDate: '2026-10-31', status: 'Mitigating', reviewDate: '2026-10-28' },
  { id: 'r4', ref: 'RSK-004', title: 'Staff appraisal backlog', category: 'Operational', likelihood: 'Medium', impact: 'Medium', rating: 'Medium', owner: 'HR Office', mitigation: 'Appraisal schedule issued · November deadline set', dueDate: '2026-11-10', status: 'Mitigating', reviewDate: '2026-11-05' },
  { id: 'r5', ref: 'RSK-005', title: 'Chronic absenteeism — 52 students', category: 'Safeguarding', likelihood: 'Medium', impact: 'High', rating: 'High', owner: 'Student Welfare', mitigation: 'Guardian engagement programme · individual follow-up plans', dueDate: '2026-11-30', status: 'Monitoring', reviewDate: '2026-11-15' },
  { id: 'r6', ref: 'RSK-006', title: 'ICT system adoption gaps', category: 'Operational', likelihood: 'Low', impact: 'Medium', rating: 'Medium', owner: 'ICT Department', mitigation: 'Onboarding schedule for 4 remaining modules', dueDate: '2026-11-30', status: 'Monitoring', reviewDate: '2026-11-20' },
  { id: 'r7', ref: 'RSK-007', title: 'Boarding capacity underutilised', category: 'Operational', likelihood: 'Low', impact: 'Low', rating: 'Low', owner: 'Boarding Department', mitigation: 'Marketing boarding to day students considering conversion', dueDate: '2026-12-15', status: 'Open', reviewDate: '2026-12-01' },
  { id: 'r8', ref: 'RSK-008', title: 'Maths and Science performance gap', category: 'Academic', likelihood: 'Medium', impact: 'Medium', rating: 'Medium', owner: 'Academic Office', mitigation: 'Targeted intervention plans for 3 classes · tutoring programme', dueDate: '2026-12-15', status: 'Mitigating', reviewDate: '2026-11-20' },
];

const initialCompliance: ComplianceItem[] = [
  { id: 'c1', requirement: 'Fire safety certification', authority: 'County Fire Department', deadline: '2026-10-31', status: 'Overdue', evidence: 'Inspection booked — report pending', reviewedBy: 'Board Secretary', reviewDate: '2026-10-10' },
  { id: 'c2', requirement: 'MOE annual safety inspection', authority: 'Ministry of Education', deadline: '2026-11-15', status: 'In Progress', evidence: 'Inspection scheduled for 5 Nov', reviewedBy: 'Operations', reviewDate: '2026-10-08' },
  { id: 'c3', requirement: 'Staff TSC registration renewal', authority: 'Teachers Service Commission', deadline: '2026-09-30', status: 'Compliant', evidence: 'All 78 teaching staff renewed', reviewedBy: 'HR Office', reviewDate: '2026-09-28' },
  { id: 'c4', requirement: 'KNEC exam centre accreditation', authority: 'Kenya National Examinations Council', deadline: '2026-12-01', status: 'Compliant', evidence: 'Accreditation certificate on file', reviewedBy: 'Academic Office', reviewDate: '2026-08-15' },
  { id: 'c5', requirement: 'Boarding facility licensing', authority: 'County Government', deadline: '2026-10-31', status: 'Overdue', evidence: 'Application submitted — awaiting inspection', reviewedBy: 'Boarding Department', reviewDate: '2026-10-05' },
  { id: 'c6', requirement: 'Child protection policy review', authority: 'Board Policy Register', deadline: '2026-11-30', status: 'Pending', evidence: 'Draft policy under review by legal', reviewedBy: 'Board Secretary', reviewDate: '2026-10-12' },
];

const initialProjects: StrategicProject[] = [
  { id: 'p1', name: 'Science Lab Renovation', scope: 'Renovate 2 science labs — benches, fittings, ventilation', owner: 'Operations', budget: 'KES 3.2M', spent: 'KES 1.4M', completion: 45, status: 'At Risk', milestones: '4 of 9 completed', risks: 'Procurement delay on lab benches', decisionNeeded: 'Approve alternate supplier — KES 180,000 variance' },
  { id: 'p2', name: 'ICT Infrastructure Upgrade', scope: 'Replace 40 workstations, upgrade network, install UPS', owner: 'ICT Department', budget: 'KES 2.1M', spent: 'KES 1.8M', completion: 82, status: 'On Track', milestones: '7 of 9 completed', risks: 'Minor — 2 workstations delayed', decisionNeeded: 'None' },
  { id: 'p3', name: 'Dormitory B Roof Repair', scope: 'Replace roof, fix leaks, repaint interior', owner: 'Boarding Department', budget: 'KES 850,000', spent: 'KES 850,000', completion: 100, status: 'Completed', milestones: '5 of 5 completed', risks: 'None', decisionNeeded: 'None — project closed' },
  { id: 'p4', name: 'Library Expansion', scope: 'Extend library, add reading room, digital cataloguing', owner: 'Library', budget: 'KES 1.5M', spent: 'KES 0', completion: 0, status: 'Planning', milestones: '0 of 6 — awaiting board approval', risks: 'Budget approval pending', decisionNeeded: 'Approve project budget and scope' },
  { id: 'p5', name: 'Sports Field Drainage', scope: 'Install drainage system on main sports field', owner: 'Sports Department', budget: 'KES 680,000', spent: 'KES 420,000', completion: 60, status: 'Delayed', milestones: '3 of 5 completed', risks: 'Weather delays — rainy season', decisionNeeded: 'Approve 2-week extension and KES 45,000 contingency' },
];

const initialMeetings: BoardMeeting[] = [
  { id: 'm1', title: 'Q4 2026 Board Meeting', date: '2026-10-28', time: '09:00', venue: 'Board Room — Main Campus', type: 'Regular', status: 'Published', attendees: 9, agendaItems: 7, resolutions: 3, actionsOverdue: 2 },
  { id: 'm2', title: 'Emergency Finance Committee', date: '2026-10-20', time: '14:00', venue: 'Virtual — Zoom', type: 'Emergency', status: 'Completed', attendees: 5, agendaItems: 3, resolutions: 2, actionsOverdue: 1 },
  { id: 'm3', title: 'Annual General Meeting 2026', date: '2026-11-22', time: '10:00', venue: 'Main Hall', type: 'AGM', status: 'Scheduled', attendees: 0, agendaItems: 5, resolutions: 0, actionsOverdue: 0 },
  { id: 'm4', title: 'Strategic Planning Retreat', date: '2026-12-05', time: '08:30', venue: 'Off-site — TBA', type: 'Special', status: 'Draft', attendees: 0, agendaItems: 0, resolutions: 0, actionsOverdue: 0 },
  { id: 'm5', title: 'Q3 2026 Board Meeting', date: '2026-07-15', time: '09:00', venue: 'Board Room — Main Campus', type: 'Regular', status: 'Archived', attendees: 9, agendaItems: 6, resolutions: 4, actionsOverdue: 0 },
];

const initialAgenda: AgendaItem[] = [
  { id: 'a1', meetingId: 'm1', order: 1, title: 'Approval of Q3 minutes', presenter: 'Board Secretary', type: 'Approval', duration: '10 min', status: 'Pending', attachments: 1 },
  { id: 'a2', meetingId: 'm1', order: 2, title: 'Headteacher Term 3 report', presenter: 'Dr. Mwangi', type: 'Report', duration: '20 min', status: 'Pending', attachments: 2 },
  { id: 'a3', meetingId: 'm1', order: 3, title: 'Budget vs actual — Q3 review', presenter: 'Bursar', type: 'Decision', duration: '30 min', status: 'Pending', attachments: 3 },
  { id: 'a4', meetingId: 'm1', order: 4, title: 'Science lab renovation — supplier variance', presenter: 'Operations', type: 'Decision', duration: '15 min', status: 'Pending', attachments: 2 },
  { id: 'a5', meetingId: 'm1', order: 5, title: 'Risk register review', presenter: 'Board Secretary', type: 'Discussion', duration: '20 min', status: 'Pending', attachments: 1 },
  { id: 'a6', meetingId: 'm1', order: 6, title: 'Compliance deadlines — fire and boarding', presenter: 'Board Secretary', type: 'Discussion', duration: '10 min', status: 'Pending', attachments: 0 },
  { id: 'a7', meetingId: 'm1', order: 7, title: 'Library expansion project approval', presenter: 'Library', type: 'Approval', duration: '15 min', status: 'Pending', attachments: 1 },
];

const initialResolutions: BoardResolution[] = [
  { id: 'res1', ref: 'BR-2026-014', title: 'Approve science lab alternate supplier — KES 180,000 variance', originModule: 'Infrastructure Projects', type: 'Procurement', submittedBy: 'Operations', justification: 'Original supplier failed to deliver within 6 weeks. Alternate supplier available at KES 180,000 above budgeted cost. Lab renovation at 45% completion.', status: 'Pending Review', decisionDate: '', owner: 'Operations', deadline: '2026-10-28', voteFor: 0, voteAgainst: 0, abstentions: 0, selfApproveBlocked: true },
  { id: 'res2', ref: 'BR-2026-013', title: 'Approve library expansion project budget — KES 1.5M', originModule: 'Infrastructure Projects', type: 'Capital Project', submittedBy: 'Library', justification: 'Library at capacity — 1,248 students sharing 320 seats. Expansion adds 180 seats and digital cataloguing.', status: 'Pending Review', decisionDate: '', owner: 'Library', deadline: '2026-10-28', voteFor: 0, voteAgainst: 0, abstentions: 0, selfApproveBlocked: true },
  { id: 'res3', ref: 'BR-2026-012', title: 'Approve sports field drainage contingency — KES 45,000', originModule: 'Infrastructure Projects', type: 'Budget Approval', submittedBy: 'Sports Department', justification: 'Rainy season caused 3-week delay. Contingency covers resurfacing and additional drainage channels.', status: 'Clarification Requested', decisionDate: '', owner: 'Sports Department', deadline: '2026-11-05', voteFor: 0, voteAgainst: 0, abstentions: 0, selfApproveBlocked: true },
  { id: 'res4', ref: 'BR-2026-011', title: 'Ratify Q3 financial statements', originModule: 'Finance Module', type: 'Budget Approval', submittedBy: 'Bursar', justification: 'Q3 income KES 18.4M, expenditure KES 12.2M. Reconciled and verified by finance team.', status: 'Approved', decisionDate: '2026-10-20', owner: 'Bursary', deadline: '2026-10-20', voteFor: 5, voteAgainst: 0, abstentions: 0, selfApproveBlocked: false },
  { id: 'res5', ref: 'BR-2026-010', title: 'Approve child protection policy revision', originModule: 'Compliance Register', type: 'Policy', submittedBy: 'Board Secretary', justification: 'Updated policy aligns with 2025 safeguarding guidelines. Legal review completed.', status: 'Deferred', decisionDate: '', owner: 'Board Secretary', deadline: '2026-11-28', voteFor: 0, voteAgainst: 0, abstentions: 0, selfApproveBlocked: true },
  { id: 'res6', ref: 'BR-2026-009', title: 'Approve Maths intervention programme — KES 240,000', originModule: 'Academic Module', type: 'Budget Approval', submittedBy: 'Academic Office', justification: 'Targeted tutoring for 3 classes with declining Maths performance. Covers 12 weeks of after-school tutoring.', status: 'Approved', decisionDate: '2026-10-20', owner: 'Academic Office', deadline: '2026-10-20', voteFor: 5, voteAgainst: 0, abstentions: 0, selfApproveBlocked: false },
  { id: 'res7', ref: 'BR-2026-008', title: 'Reject proposal for external caterer change', originModule: 'Procurement', type: 'Procurement', submittedBy: 'Operations', justification: 'Proposal to switch catering supplier mid-contract. Contract runs until Dec 2026.', status: 'Rejected', decisionDate: '2026-07-15', owner: 'Operations', deadline: '2026-07-15', voteFor: 0, voteAgainst: 7, abstentions: 1, selfApproveBlocked: false },
];

const initialAuditEvents: AuditEvent[] = [
  { id: 'ae1', actor: 'Dr. James Mwangi (Director)', action: 'Viewed financial summary', resource: 'Finance Module', timestamp: '2026-10-16 09:42', detail: 'Q3 financial statements — read-only access', severity: 'Info' },
  { id: 'ae2', actor: 'Mrs. Wanjiku Kamau (Director)', action: 'Approved resolution BR-2026-011', resource: 'Resolution Centre', timestamp: '2026-10-20 14:15', detail: 'Q3 financial statements ratified — 5-0-0 vote', severity: 'Info' },
  { id: 'ae3', actor: 'Mr. David Otieno (Director)', action: 'Exported academic performance report', resource: 'Reports Module', timestamp: '2026-10-15 11:30', detail: 'PDF export — Term 3 academic summary', severity: 'Warning' },
  { id: 'ae4', actor: 'System', action: 'Blocked self-approval attempt', resource: 'Resolution Centre', timestamp: '2026-10-14 16:22', detail: 'Operations director attempted to approve BR-2026-014 (own submission) — blocked by policy', severity: 'Critical' },
  { id: 'ae5', actor: 'Mrs. Wanjiku Kamau (Director)', action: 'Viewed risk register', resource: 'Risk Register', timestamp: '2026-10-16 08:15', detail: 'Full risk register accessed — 8 risks visible', severity: 'Info' },
  { id: 'ae6', actor: 'Dr. James Mwangi (Director)', action: 'Published meeting pack', resource: 'Board Meetings', timestamp: '2026-10-12 10:00', detail: 'Q4 2026 board meeting pack — 7 agenda items distributed to 9 attendees', severity: 'Info' },
];

const initialNotifications: NotificationItem[] = [
  { id: 'n1', title: 'Safety certification overdue in 15 days', message: 'Fire safety certification expires 31 Oct. Inspection booked for 28 Oct.', category: 'Compliance', time: '2h ago', unread: true, severity: 'Critical' },
  { id: 'n2', title: '2 board resolutions overdue', message: 'BR-2026-014 and BR-2026-013 past their review deadline. Q4 board meeting on 28 Oct.', category: 'Decision', time: '5h ago', unread: true, severity: 'Warning' },
  { id: 'n3', title: 'Q4 board meeting pack published', message: '7 agenda items distributed. Meeting on 28 Oct at 09:00 in Board Room.', category: 'Meeting', time: '1d ago', unread: true, severity: 'Info' },
  { id: 'n4', title: 'Fee collection at 79.3%', message: 'KES 4.8M outstanding across 184 accounts. Reminder cycle initiated.', category: 'Finance', time: '1d ago', unread: false, severity: 'Warning' },
  { id: 'n5', title: 'Science lab renovation at risk', message: 'Procurement delay on lab benches. 45% complete — decision needed on alternate supplier.', category: 'Infrastructure', time: '2d ago', unread: false, severity: 'Warning' },
  { id: 'n6', title: 'Boarding facility licensing overdue', message: 'County licensing deadline 31 Oct. Inspection pending.', category: 'Compliance', time: '3d ago', unread: false, severity: 'Critical' },
];

const initialReports: ReportDefinition[] = [
  { id: 'rep1', title: 'Executive summary', description: 'Institutional overview — all pillars', source: 'All modules', lastGenerated: '2026-10-15', status: 'Ready', sections: 8, availableSections: 8 },
  { id: 'rep2', title: 'Academic performance', description: 'Assessments, grades, trends by class and subject', source: 'Academic module', lastGenerated: '2026-10-14', status: 'Ready', sections: 5, availableSections: 5 },
  { id: 'rep3', title: 'Enrollment and retention', description: 'Enrollment by section, retention, withdrawals', source: 'Enrolment module', lastGenerated: '2026-10-14', status: 'Ready', sections: 4, availableSections: 4 },
  { id: 'rep4', title: 'Finance and budget', description: 'Budget vs actual, collections, arrears aging', source: 'Finance module', lastGenerated: '2026-10-15', status: 'Ready', sections: 6, availableSections: 6 },
  { id: 'rep5', title: 'Staffing summary', description: 'Establishment, gaps, appraisal completion', source: 'HR module', lastGenerated: '2026-10-12', status: 'Partial', sections: 5, availableSections: 4 },
  { id: 'rep6', title: 'Risk and compliance', description: 'Risk register, compliance items, mitigation status', source: 'Risk register', lastGenerated: '2026-10-16', status: 'Ready', sections: 4, availableSections: 4 },
  { id: 'rep7', title: 'Infrastructure projects', description: 'Project portfolio, milestones, expenditure', source: 'Project tracker', lastGenerated: '2026-10-13', status: 'Ready', sections: 3, availableSections: 3 },
  { id: 'rep8', title: 'Board meeting minutes', description: 'Minutes, resolutions, action items', source: 'Board meetings', lastGenerated: '2026-10-12', status: 'Partial', sections: 4, availableSections: 3 },
  { id: 'rep9', title: 'Strategic scorecard', description: 'All 10 pillars with targets and actuals', source: 'Scorecard config', lastGenerated: '2026-10-15', status: 'Ready', sections: 10, availableSections: 10 },
  { id: 'rep10', title: 'Welfare and safeguarding', description: 'Aggregate welfare indicators — no individual cases', source: 'Welfare module', lastGenerated: '—', status: 'Unavailable', sections: 3, availableSections: 0 },
];

const initialFinancials: FinancialSummary[] = [
  { id: 'f1', category: 'Tuition fees', budget: 'KES 13.8M', actual: 'KES 11.2M', variance: '-KES 2.6M', variancePct: '-19%', status: 'Unfavourable', source: 'Finance module — verified receipts' },
  { id: 'f2', category: 'Boarding fees', budget: 'KES 2.9M', actual: 'KES 2.4M', variance: '-KES 0.5M', variancePct: '-17%', status: 'Unfavourable', source: 'Finance module — verified receipts' },
  { id: 'f3', category: 'Transport fees', budget: 'KES 1.7M', actual: 'KES 1.2M', variance: '-KES 0.5M', variancePct: '-29%', status: 'Unfavourable', source: 'Finance module — verified receipts' },
  { id: 'f4', category: 'Other income', budget: 'KES 4.0M', actual: 'KES 3.6M', variance: '-KES 0.4M', variancePct: '-10%', status: 'On Budget', source: 'Finance module — verified receipts' },
  { id: 'f5', category: 'Teaching salaries', budget: 'KES 5.42M', actual: 'KES 5.38M', variance: '+KES 0.04M', variancePct: '+0.7%', status: 'Favourable', source: 'HR payroll — approved' },
  { id: 'f6', category: 'Operations', budget: 'KES 2.8M', actual: 'KES 2.1M', variance: '+KES 0.7M', variancePct: '+25%', status: 'Favourable', source: 'Finance module — approved payments' },
  { id: 'f7', category: 'Capital projects', budget: 'KES 3.2M', actual: 'KES 1.4M', variance: '+KES 1.8M', variancePct: '+56%', status: 'Favourable', source: 'Project tracker — committed spend' },
  { id: 'f8', category: 'Procurement', budget: 'KES 2.0M', actual: 'KES 1.65M', variance: '+KES 0.35M', variancePct: '+18%', status: 'Favourable', source: 'Procurement module — approved POs' },
];

const initialEnrollment: EnrollmentBreakdown[] = [
  { id: 'e1', section: 'Early Years', enrolled: 142, capacity: 150, retention: '94%', boarding: 0, day: 142 },
  { id: 'e2', section: 'Primary (Y1–Y6)', enrolled: 486, capacity: 500, retention: '96%', boarding: 40, day: 446 },
  { id: 'e3', section: 'Junior Secondary (Y7–Y9)', enrolled: 312, capacity: 320, retention: '92%', boarding: 80, day: 232 },
  { id: 'e4', section: 'Senior Secondary (F1–F4)', enrolled: 308, capacity: 330, retention: '89%', boarding: 60, day: 248 },
];

const initialAcademic: AcademicScorecard[] = [
  { id: 'ac1', subject: 'Mathematics', average: '64.2%', passRate: '76%', trend: 'down', trendValue: '-2.3%', completion: '92%', source: 'Assessment module — 312 grades' },
  { id: 'ac2', subject: 'English', average: '71.8%', passRate: '88%', trend: 'up', trendValue: '+1.5%', completion: '96%', source: 'Assessment module — 298 grades' },
  { id: 'ac3', subject: 'Kiswahili', average: '73.5%', passRate: '90%', trend: 'up', trendValue: '+2.1%', completion: '94%', source: 'Assessment module — 285 grades' },
  { id: 'ac4', subject: 'Science', average: '65.8%', passRate: '78%', trend: 'down', trendValue: '-1.2%', completion: '89%', source: 'Assessment module — 340 grades' },
  { id: 'ac5', subject: 'Social Studies', average: '72.1%', passRate: '85%', trend: 'flat', trendValue: '0%', completion: '97%', source: 'Assessment module — 280 grades' },
  { id: 'ac6', subject: 'Religious Education', average: '78.4%', passRate: '93%', trend: 'up', trendValue: '+3.2%', completion: '95%', source: 'Assessment module — 225 grades' },
];

const initialStaffing: StaffingSummary[] = [
  { id: 'st1', department: 'Mathematics', established: 12, current: 10, gap: 2, appraisalCompletion: '70%', source: 'HR module' },
  { id: 'st2', department: 'Languages', established: 14, current: 14, gap: 0, appraisalCompletion: '65%', source: 'HR module' },
  { id: 'st3', department: 'Sciences', established: 11, current: 9, gap: 2, appraisalCompletion: '55%', source: 'HR module' },
  { id: 'st4', department: 'Humanities', established: 10, current: 10, gap: 0, appraisalCompletion: '80%', source: 'HR module' },
  { id: 'st5', department: 'Technical', established: 8, current: 7, gap: 1, appraisalCompletion: '50%', source: 'HR module' },
  { id: 'st6', department: 'Support Staff', established: 8, current: 8, gap: 0, appraisalCompletion: '40%', source: 'HR module' },
];

const initialWelfare: WelfareIndicator[] = [
  { id: 'w1', area: 'Boarding', indicator: 'Roll-call compliance', value: '98.5%', status: 'Good', source: 'Boarding module', detail: '180 boarders · 2 exceptions this week' },
  { id: 'w2', area: 'Transport', indicator: 'Route coverage', value: '12 of 14 routes active', status: 'Warning', source: 'Transport module', detail: '2 routes suspended — vehicle maintenance' },
  { id: 'w3', area: 'Health Centre', indicator: 'Clinic visits this week', value: '34 visits', status: 'Good', source: 'Health module', detail: '28 routine · 6 follow-up · 0 emergencies' },
  { id: 'w4', area: 'Safeguarding', indicator: 'Open cases', value: '2 cases', status: 'Warning', source: 'Safeguarding module', detail: '1 overdue follow-up · aggregate only — no individual data' },
  { id: 'w5', area: 'Safety', indicator: 'Outstanding inspections', value: '3 inspections', status: 'Critical', source: 'Operations', detail: 'Fire (overdue) · boarding (overdue) · MOE (scheduled)' },
  { id: 'w6', area: 'Emergency Preparedness', indicator: 'Drill completion', value: 'Not Configured', status: 'Not Configured', source: 'Not configured', detail: 'No drill records found — configuration required' },
];

export function useDirectorsDemo() {
  const [kpis] = useState<DirectorKpi[]>(initialKpis);
  const [scorecard] = useState<StrategicKpi[]>(initialScorecard);
  const [risks, setRisks] = useState<InstitutionalRisk[]>(initialRisks);
  const [compliance] = useState<ComplianceItem[]>(initialCompliance);
  const [projects] = useState<StrategicProject[]>(initialProjects);
  const [meetings, setMeetings] = useState<BoardMeeting[]>(initialMeetings);
  const [agenda] = useState<AgendaItem[]>(initialAgenda);
  const [resolutions, setResolutions] = useState<BoardResolution[]>(initialResolutions);
  const [auditEvents] = useState<AuditEvent[]>(initialAuditEvents);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [reports] = useState<ReportDefinition[]>(initialReports);
  const [financials] = useState<FinancialSummary[]>(initialFinancials);
  const [enrollment] = useState<EnrollmentBreakdown[]>(initialEnrollment);
  const [academic] = useState<AcademicScorecard[]>(initialAcademic);
  const [staffing] = useState<StaffingSummary[]>(initialStaffing);
  const [welfare] = useState<WelfareIndicator[]>(initialWelfare);

  const advanceMeeting = useCallback((id: string) => {
    const order: BoardMeeting['status'][] = ['Draft', 'Scheduled', 'Published', 'In Progress', 'Completed', 'Minutes Pending', 'Archived'];
    setMeetings((prev) => prev.map((m) => {
      if (m.id !== id) return m;
      const idx = order.indexOf(m.status);
      return { ...m, status: order[Math.min(idx + 1, order.length - 1)] };
    }));
  }, []);

  const decideResolution = useCallback((id: string, decision: 'Approved' | 'Rejected' | 'Deferred') => {
    setResolutions((prev) => prev.map((r) => {
      if (r.id !== id) return r;
      if (r.selfApproveBlocked && decision === 'Approved' && r.submittedBy === 'Operations') return r;
      return {
        ...r,
        status: decision,
        decisionDate: decision === 'Approved' || decision === 'Rejected' ? '2026-10-16' : '',
        voteFor: decision === 'Approved' ? r.voteFor + 1 : r.voteFor,
      };
    }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, unread: false } : n));
  }, []);

  return {
    kpis, scorecard, risks, compliance, projects, meetings, agenda,
    resolutions, auditEvents, notifications, reports, financials,
    enrollment, academic, staffing, welfare,
    advanceMeeting, decideResolution, markNotificationRead,
  };
}
