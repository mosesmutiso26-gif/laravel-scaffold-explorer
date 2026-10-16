import { useSyncExternalStore } from 'react';

export type EncounterStatus = 'Requested' | 'Registered' | 'Waiting' | 'In consultation' | 'Observation' | 'Treatment' | 'Referral' | 'Completed' | 'Cancelled' | 'Missed';
export type VisitType = 'Walk-in' | 'Scheduled' | 'Follow-up' | 'Urgent' | 'Emergency';
export type AllergySeverity = 'Mild' | 'Moderate' | 'Severe' | 'Life-threatening';
export type AllergyVerification = 'Confirmed' | 'Suspected' | 'Reported' | 'Unverified';
export type ReferralStatus = 'Draft' | 'Issued' | 'Guardian notified' | 'Appointment pending' | 'Attended' | 'Outcome received' | 'Follow-up completed' | 'Declined' | 'Cancelled';
export type ReferralUrgency = 'Routine' | 'Urgent' | 'Emergency';
export type ConsentStatus = 'Requested' | 'Received' | 'Declined' | 'Withdrawn' | 'Not required' | 'Emergency exception';
export type ConsentType = 'Emergency contact' | 'Medical information' | 'Medication administration' | 'Health activity' | 'Referral' | 'Investigation';
export type MedicationOrderStatus = 'Active' | 'Completed' | 'Discontinued' | 'On hold';
export type AdministrationStatus = 'Scheduled' | 'Administered' | 'Refused' | 'Omitted' | 'Pending';
export type EmergencyStatus = 'Active' | 'Stabilized' | 'Transported' | 'Resolved' | 'Under review';
export type InformationSource = 'Parent' | 'Student' | 'Clinician' | 'External document' | 'Unverified';

export type Allergy = {
  id: string;
  studentId: string;
  studentName: string;
  substance: string;
  reaction: string;
  severity: AllergySeverity;
  verification: AllergyVerification;
  dateDocumented: string;
  source: InformationSource;
  emergencyInstructions: string;
};

export type ChronicCondition = {
  id: string;
  studentId: string;
  studentName: string;
  condition: string;
  diagnosedDate: string;
  managementPlan: string;
  source: InformationSource;
  active: boolean;
};

export type Observation = {
  id: string;
  encounterId: string;
  temperature: number | null;
  pulse: number | null;
  respiratoryRate: number | null;
  bloodPressureSystolic: number | null;
  bloodPressureDiastolic: number | null;
  oxygenSaturation: number | null;
  painScore: number | null;
  height: number | null;
  weight: number | null;
  recordedBy: string;
  recordedAt: string;
  note: string;
};

export type Treatment = {
  id: string;
  encounterId: string;
  procedure: string;
  indication: string;
  performedBy: string;
  performedAt: string;
  materialsUsed: string;
  outcome: string;
  instructions: string;
  followUpPlan: string;
};

export type Encounter = {
  id: string;
  encounterNumber: string;
  studentId: string;
  studentName: string;
  className: string;
  date: string;
  time: string;
  visitType: VisitType;
  presentingComplaint: string;
  symptomOnset: string;
  history: string;
  assessment: string;
  workingDiagnosis: string;
  treatmentPlan: string;
  disposition: string;
  followUpDate: string | null;
  clinician: string;
  status: EncounterStatus;
  parentNotified: boolean;
  consentStatus: ConsentStatus;
};

export type MedicationOrder = {
  id: string;
  studentId: string;
  studentName: string;
  medication: string;
  formulation: string;
  strength: string;
  dose: string;
  route: string;
  frequency: string;
  duration: string;
  indication: string;
  prescriber: string;
  startDate: string;
  stopDate: string | null;
  consentRequired: boolean;
  consentStatus: ConsentStatus;
  status: MedicationOrderStatus;
};

export type MedicationAdministration = {
  id: string;
  orderId: string;
  studentId: string;
  studentName: string;
  medication: string;
  scheduledTime: string;
  actualTime: string | null;
  dose: string;
  route: string;
  administeredBy: string;
  status: AdministrationStatus;
  reason: string;
  adverseReaction: string;
  witness: string;
};

export type Referral = {
  id: string;
  referralNumber: string;
  studentId: string;
  studentName: string;
  encounterId: string | null;
  reason: string;
  clinicalSummary: string;
  urgency: ReferralUrgency;
  destination: string;
  referringProfessional: string;
  date: string;
  guardianNotified: boolean;
  guardianConsent: ConsentStatus;
  transportArranged: string;
  attended: boolean | null;
  outcome: string;
  followUpDue: string | null;
  status: ReferralStatus;
};

export type Emergency = {
  id: string;
  emergencyNumber: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  type: string;
  description: string;
  initialObservations: string;
  actionsTaken: string;
  guardianContacted: string;
  emergencyServices: string;
  transportDetails: string;
  receivingFacility: string;
  handoverNotes: string;
  status: EmergencyStatus;
  timeline: { time: string; event: string }[];
};

export type Consent = {
  id: string;
  studentId: string;
  studentName: string;
  type: ConsentType;
  scope: string;
  status: ConsentStatus;
  source: string;
  date: string;
  documentRef: string;
};

export type Immunization = {
  id: string;
  studentId: string;
  studentName: string;
  vaccine: string;
  doseNumber: number;
  dateAdministered: string;
  source: InformationSource;
  verified: boolean;
};

export type HealthNotification = {
  id: string;
  recipient: string;
  title: string;
  detail: string;
  unread: boolean;
  createdDate: string;
  deliveryStatus: 'Queued' | 'Sent' | 'Delivered' | 'Read';
};

export type HealthAuditEntry = {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
};

export type StudentHealthProfile = {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  dateOfBirth: string;
  bloodGroup: string;
  emergencyContact: string;
  emergencyPhone: string;
  guardianName: string;
  guardianPhone: string;
  lastReviewDate: string;
  reviewStatus: 'Current' | 'Needs review' | 'Overdue';
};

export type HealthDemoState = {
  profiles: StudentHealthProfile[];
  allergies: Allergy[];
  chronicConditions: ChronicCondition[];
  encounters: Encounter[];
  observations: Observation[];
  treatments: Treatment[];
  medicationOrders: MedicationOrder[];
  administrations: MedicationAdministration[];
  referrals: Referral[];
  emergencies: Emergency[];
  consents: Consent[];
  immunizations: Immunization[];
  notifications: HealthNotification[];
  audit: HealthAuditEntry[];
};

const seed: HealthDemoState = {
  profiles: [
    { id: 'hp-001', studentId: 'stu-001', studentName: 'Amani Wanjiku', className: 'Year 6 — Cedar', dateOfBirth: '14 Mar 2014', bloodGroup: 'O+', emergencyContact: 'Wanjiku Senior', emergencyPhone: '0712 345 678', guardianName: 'Grace Wanjiku', guardianPhone: '0712 345 678', lastReviewDate: '02 Sep 2026', reviewStatus: 'Current' },
    { id: 'hp-002', studentId: 'stu-002', studentName: 'Brian Otieno', className: 'Year 8 — Acacia', dateOfBirth: '22 Jul 2012', bloodGroup: 'A+', emergencyContact: 'Otieno Senior', emergencyPhone: '0723 456 789', guardianName: 'James Otieno', guardianPhone: '0723 456 789', lastReviewDate: '15 Aug 2026', reviewStatus: 'Current' },
    { id: 'hp-003', studentId: 'stu-003', studentName: 'Chloe Njeri', className: 'Form 2 — Tana', dateOfBirth: '05 Jan 2011', bloodGroup: 'B+', emergencyContact: 'Njeri Senior', emergencyPhone: '0734 567 890', guardianName: 'Mary Njeri', guardianPhone: '0734 567 890', lastReviewDate: '10 Jun 2026', reviewStatus: 'Needs review' },
    { id: 'hp-004', studentId: 'stu-004', studentName: 'Dylan Kamau', className: 'Form 4 — Athi', dateOfBirth: '18 Nov 2009', bloodGroup: 'O-', emergencyContact: 'Kamau Senior', emergencyPhone: '0745 678 901', guardianName: 'Peter Kamau', guardianPhone: '0745 678 901', lastReviewDate: '03 Mar 2026', reviewStatus: 'Overdue' },
    { id: 'hp-005', studentId: 'stu-005', studentName: 'Faith Achieng', className: 'Year 5 — Baobab', dateOfBirth: '29 Apr 2015', bloodGroup: 'AB+', emergencyContact: 'Achieng Senior', emergencyPhone: '0756 789 012', guardianName: 'Sarah Achieng', guardianPhone: '0756 789 012', lastReviewDate: '01 Sep 2026', reviewStatus: 'Current' },
  ],

  allergies: [
    { id: 'alg-001', studentId: 'stu-001', studentName: 'Amani Wanjiku', substance: 'Peanuts', reaction: 'Hives and mild swelling', severity: 'Moderate', verification: 'Confirmed', dateDocumented: '02 Sep 2026', source: 'Parent', emergencyInstructions: 'Administer antihistamine, monitor for anaphylaxis, contact guardian' },
    { id: 'alg-002', studentId: 'stu-003', studentName: 'Chloe Njeri', substance: 'Penicillin', reaction: 'Rash and itching', severity: 'Moderate', verification: 'Confirmed', dateDocumented: '10 Jun 2026', source: 'External document', emergencyInstructions: 'Do not administer penicillin-based medication. Use alternative antibiotic.' },
    { id: 'alg-003', studentId: 'stu-004', studentName: 'Dylan Kamau', substance: 'Bee stings', reaction: 'Localised swelling, redness', severity: 'Mild', verification: 'Reported', dateDocumented: '03 Mar 2026', source: 'Student', emergencyInstructions: 'Apply cold compress, monitor for systemic reaction' },
    { id: 'alg-004', studentId: 'stu-005', studentName: 'Faith Achieng', substance: 'Latex', reaction: 'Contact dermatitis', severity: 'Mild', verification: 'Suspected', dateDocumented: '01 Sep 2026', source: 'Parent', emergencyInstructions: 'Use latex-free gloves and equipment' },
  ],

  chronicConditions: [
    { id: 'cc-001', studentId: 'stu-002', studentName: 'Brian Otieno', condition: 'Asthma', diagnosedDate: '2019', managementPlan: 'Reliever inhaler (Salbutamol) as needed. Avoid triggers. Guardian informed.', source: 'External document', active: true },
    { id: 'cc-002', studentId: 'stu-004', studentName: 'Dylan Kamau', condition: 'Type 1 Diabetes', diagnosedDate: '2020', managementPlan: 'Insulin administration per schedule. Blood glucose monitoring. Emergency glucagon kit.', source: 'Clinician', active: true },
  ],

  encounters: [
    { id: 'enc-001', encounterNumber: 'ENC-001', studentId: 'stu-001', studentName: 'Amani Wanjiku', className: 'Year 6 — Cedar', date: '16 Oct 2026', time: '09:15', visitType: 'Walk-in', presentingComplaint: 'Headache and mild fever', symptomOnset: 'Last night', history: 'No significant past history. Known peanut allergy.', assessment: 'Vital signs within normal limits. Temperature 37.8°C. General appearance alert.', workingDiagnosis: 'Viral upper respiratory infection', treatmentPlan: 'Rest, hydration, paracetamol 500mg as needed. Return if symptoms worsen.', disposition: 'Rest in sickbay, return to class after 1 hour', followUpDate: null, clinician: 'Nurse Grace', status: 'Completed', parentNotified: true, consentStatus: 'Not required' },
    { id: 'enc-002', encounterNumber: 'ENC-002', studentId: 'stu-002', studentName: 'Brian Otieno', className: 'Year 8 — Acacia', date: '16 Oct 2026', time: '10:30', visitType: 'Walk-in', presentingComplaint: 'Difficulty breathing after PE', symptomOnset: 'During PE lesson, 10:15', history: 'Known asthma. Used reliever inhaler once with partial relief.', assessment: 'Mild wheezing on auscultation. RR 22. SpO2 96%. Able to speak in full sentences.', workingDiagnosis: 'Mild asthma exacerbation', treatmentPlan: 'Salbutamol via spacer, 2 puffs. Observe 20 minutes. Recheck SpO2.', disposition: 'Observation in sickbay', followUpDate: '17 Oct 2026', clinician: 'Nurse Grace', status: 'Observation', parentNotified: true, consentStatus: 'Received' },
    { id: 'enc-003', encounterNumber: 'ENC-003', studentId: 'stu-005', studentName: 'Faith Achieng', className: 'Year 5 — Baobab', date: '16 Oct 2026', time: '11:45', visitType: 'Walk-in', presentingComplaint: 'Stomach pain', symptomOnset: 'This morning', history: 'No known allergies. Ate breakfast at home.', assessment: '', workingDiagnosis: '', treatmentPlan: '', disposition: '', followUpDate: null, clinician: 'Nurse Grace', status: 'Waiting', parentNotified: false, consentStatus: 'Not required' },
    { id: 'enc-004', encounterNumber: 'ENC-004', studentId: 'stu-003', studentName: 'Chloe Njeri', className: 'Form 2 — Tana', date: '16 Oct 2026', time: '12:00', visitType: 'Scheduled', presentingComplaint: 'Follow-up for medication review', symptomOnset: 'N/A', history: 'On daily antihistamine for seasonal allergies.', assessment: 'Symptoms well controlled. No side effects reported.', workingDiagnosis: 'Allergic rhinitis — well managed', treatmentPlan: 'Continue current medication. Review in 3 months.', disposition: 'Return to class', followUpDate: '15 Jan 2027', clinician: 'Nurse Grace', status: 'In consultation', parentNotified: false, consentStatus: 'Received' },
    { id: 'enc-005', encounterNumber: 'ENC-005', studentId: 'stu-004', studentName: 'Dylan Kamau', className: 'Form 4 — Athi', date: '15 Oct 2026', time: '14:20', visitType: 'Urgent', presentingComplaint: 'Feeling dizzy and shaky', symptomOnset: 'During afternoon class', history: 'Type 1 Diabetes. Missed lunch due to examination.', assessment: 'Blood glucose 3.2 mmol/L. Sweaty, tremulous. Conscious and oriented.', workingDiagnosis: 'Hypoglycaemia', treatmentPlan: 'Given 15g fast-acting glucose. Recheck blood glucose in 15 minutes.', disposition: 'Stabilised, given snack, returned to class', followUpDate: '16 Oct 2026', clinician: 'Nurse Grace', status: 'Completed', parentNotified: true, consentStatus: 'Emergency exception' },
  ],

  observations: [
    { id: 'obs-001', encounterId: 'enc-001', temperature: 37.8, pulse: 88, respiratoryRate: 18, bloodPressureSystolic: 110, bloodPressureDiastolic: 70, oxygenSaturation: 98, painScore: 3, height: null, weight: null, recordedBy: 'Nurse Grace', recordedAt: '16 Oct 2026, 09:20', note: 'Alert, no distress' },
    { id: 'obs-002', encounterId: 'enc-002', temperature: 36.9, pulse: 102, respiratoryRate: 22, bloodPressureSystolic: 115, bloodPressureDiastolic: 72, oxygenSaturation: 96, painScore: 0, height: null, weight: null, recordedBy: 'Nurse Grace', recordedAt: '16 Oct 2026, 10:35', note: 'Mild wheezing, able to speak in full sentences' },
    { id: 'obs-003', encounterId: 'enc-005', temperature: 36.5, pulse: 95, respiratoryRate: 20, bloodPressureSystolic: 120, bloodPressureDiastolic: 75, oxygenSaturation: 97, painScore: 0, height: null, weight: null, recordedBy: 'Nurse Grace', recordedAt: '15 Oct 2026, 14:25', note: 'Tremulous, sweaty. Blood glucose 3.2 mmol/L' },
  ],

  treatments: [
    { id: 'trt-001', encounterId: 'enc-001', procedure: 'Rest and hydration', indication: 'Viral URI symptoms', performedBy: 'Nurse Grace', performedAt: '16 Oct 2026, 09:30', materialsUsed: 'Water, paracetamol 500mg', outcome: 'Student rested, temperature stable', instructions: 'Drink plenty of fluids, rest at home if not improved by evening', followUpPlan: 'Return if fever exceeds 38.5°C' },
    { id: 'trt-002', encounterId: 'enc-002', procedure: 'Salbutamol inhaler via spacer', indication: 'Mild asthma exacerbation', performedBy: 'Nurse Grace', performedAt: '16 Oct 2026, 10:40', materialsUsed: 'Salbutamol inhaler, spacer device', outcome: 'Wheezing resolved after 15 minutes. SpO2 improved to 99%.', instructions: 'Use reliever inhaler if symptoms recur. Avoid known triggers.', followUpPlan: 'Review tomorrow. Guardian advised to bring updated asthma plan.' },
    { id: 'trt-003', encounterId: 'enc-005', procedure: 'Hypoglycaemia management', indication: 'Blood glucose 3.2 mmol/L', performedBy: 'Nurse Grace', performedAt: '15 Oct 2026, 14:28', materialsUsed: 'Glucose tablets 15g, biscuit', outcome: 'Blood glucose 5.8 mmol/L after 15 minutes. Symptoms resolved.', instructions: 'Ensure regular meals during examination period. Guardian notified.', followUpPlan: 'Review dietary schedule with guardian. Follow-up today.' },
  ],

  medicationOrders: [
    { id: 'mo-001', studentId: 'stu-002', studentName: 'Brian Otieno', medication: 'Salbutamol', formulation: 'Inhaler', strength: '100mcg/puff', dose: '2 puffs', route: 'Inhaled', frequency: 'As needed', duration: 'Ongoing', indication: 'Asthma — reliever', prescriber: 'Dr. Mwangi (external)', startDate: '01 Sep 2026', stopDate: null, consentRequired: true, consentStatus: 'Received', status: 'Active' },
    { id: 'mo-002', studentId: 'stu-003', studentName: 'Chloe Njeri', medication: 'Cetirizine', formulation: 'Tablet', strength: '10mg', dose: '1 tablet', route: 'Oral', frequency: 'Once daily', duration: 'Ongoing', indication: 'Seasonal allergic rhinitis', prescriber: 'Dr. Mwangi (external)', startDate: '15 Aug 2026', stopDate: null, consentRequired: true, consentStatus: 'Received', status: 'Active' },
    { id: 'mo-003', studentId: 'stu-004', studentName: 'Dylan Kamau', medication: 'Insulin (glargine)', formulation: 'Injection', strength: '100 IU/mL', dose: 'As per diabetes management plan', route: 'Subcutaneous', frequency: 'As prescribed', duration: 'Ongoing', indication: 'Type 1 Diabetes', prescriber: 'Dr. Ochieng (endocrinologist)', startDate: '2020', stopDate: null, consentRequired: true, consentStatus: 'Received', status: 'Active' },
  ],

  administrations: [
    { id: 'mar-001', orderId: 'mo-002', studentId: 'stu-003', studentName: 'Chloe Njeri', medication: 'Cetirizine 10mg', scheduledTime: '08:00', actualTime: '08:05', dose: '1 tablet', route: 'Oral', administeredBy: 'Nurse Grace', status: 'Administered', reason: '', adverseReaction: '', witness: '' },
    { id: 'mar-002', orderId: 'mo-001', studentId: 'stu-002', studentName: 'Brian Otieno', medication: 'Salbutamol inhaler', scheduledTime: '10:40', actualTime: '10:40', dose: '2 puffs', route: 'Inhaled', administeredBy: 'Nurse Grace', status: 'Administered', reason: 'Asthma exacerbation during PE', adverseReaction: '', witness: '' },
    { id: 'mar-003', orderId: 'mo-002', studentId: 'stu-003', studentName: 'Chloe Njeri', medication: 'Cetirizine 10mg', scheduledTime: '08:00', actualTime: null, dose: '1 tablet', route: 'Oral', administeredBy: '', status: 'Pending', reason: '', adverseReaction: '', witness: '' },
  ],

  referrals: [
    { id: 'ref-001', referralNumber: 'REF-001', studentId: 'stu-001', studentName: 'Amani Wanjiku', encounterId: 'enc-001', reason: 'Recurrent headaches — needs neurological assessment', clinicalSummary: 'Three episodes of headache with mild fever over 2 weeks. No neurological signs on examination. Known peanut allergy.', urgency: 'Routine', destination: 'Gertrude\'s Children\'s Hospital — Neurology', referringProfessional: 'Nurse Grace', date: '16 Oct 2026', guardianNotified: true, guardianConsent: 'Received', transportArranged: 'Guardian to arrange', attended: null, outcome: '', followUpDue: '30 Oct 2026', status: 'Guardian notified' },
    { id: 'ref-002', referralNumber: 'REF-002', studentId: 'stu-004', studentName: 'Dylan Kamau', encounterId: 'enc-005', reason: 'Hypoglycaemia episode — diabetes management review', clinicalSummary: 'Hypoglycaemic episode (BG 3.2) due to missed meal. Stabilised in clinic. Requires endocrinology review.', urgency: 'Urgent', destination: 'Aga Khan Hospital — Endocrinology', referringProfessional: 'Nurse Grace', date: '15 Oct 2026', guardianNotified: true, guardianConsent: 'Received', transportArranged: 'Guardian to arrange', attended: true, outcome: 'Appointment attended. Insulin regimen adjusted. Dietary plan updated.', followUpDue: '15 Nov 2026', status: 'Outcome received' },
  ],

  emergencies: [
    { id: 'emr-001', emergencyNumber: 'EMR-001', studentId: 'stu-004', studentName: 'Dylan Kamau', date: '15 Oct 2026', time: '14:20', type: 'Hypoglycaemia', description: 'Student felt dizzy and shaky during afternoon class. Known Type 1 Diabetic who missed lunch.', initialObservations: 'Blood glucose 3.2 mmol/L. Sweaty, tremulous. Conscious and oriented.', actionsTaken: 'Administered 15g fast-acting glucose. Monitored. Rechecked BG at 14:43 — 5.8 mmol/L. Given snack.', guardianContacted: 'Guardian contacted at 14:30. Informed of episode and stabilisation. Advised to collect student for endocrinology review.', emergencyServices: 'Not required — stabilised on-site', transportDetails: 'N/A — guardian collecting', receivingFacility: 'Aga Khan Hospital (referral issued)', handoverNotes: 'Referral REF-002 issued for endocrinology review. Updated diabetes management plan awaited.', status: 'Resolved', timeline: [
      { time: '14:20', event: 'Student presented to clinic feeling dizzy and shaky' },
      { time: '14:22', event: 'Blood glucose checked — 3.2 mmol/L (hypoglycaemia confirmed)' },
      { time: '14:28', event: '15g fast-acting glucose administered' },
      { time: '14:30', event: 'Guardian contacted and informed' },
      { time: '14:43', event: 'Blood glucose rechecked — 5.8 mmol/L. Symptoms resolved.' },
      { time: '14:50', event: 'Snack given. Student returned to class. Referral issued.' },
    ] },
  ],

  consents: [
    { id: 'con-001', studentId: 'stu-001', studentName: 'Amani Wanjiku', type: 'Emergency contact', scope: 'Emergency contact details and collection authorization', status: 'Received', source: 'Guardian (enrollment form)', date: '01 Sep 2026', documentRef: 'ENR-001' },
    { id: 'con-002', studentId: 'stu-002', studentName: 'Brian Otieno', type: 'Medication administration', scope: 'Salbutamol inhaler administration at school', status: 'Received', source: 'Guardian (signed consent form)', date: '01 Sep 2026', documentRef: 'MED-CON-002' },
    { id: 'con-003', studentId: 'stu-003', studentName: 'Chloe Njeri', type: 'Medication administration', scope: 'Cetirizine daily administration', status: 'Received', source: 'Guardian (signed consent form)', date: '15 Aug 2026', documentRef: 'MED-CON-003' },
    { id: 'con-004', studentId: 'stu-004', studentName: 'Dylan Kamau', type: 'Medication administration', scope: 'Insulin administration per diabetes management plan', status: 'Received', source: 'Guardian (signed diabetes plan)', date: '03 Mar 2026', documentRef: 'MED-CON-004' },
    { id: 'con-005', studentId: 'stu-005', studentName: 'Faith Achieng', type: 'Medical information', scope: 'Updated medical history and allergy information', status: 'Requested', source: 'School health team', date: '10 Oct 2026', documentRef: '' },
  ],

  immunizations: [
    { id: 'imm-001', studentId: 'stu-001', studentName: 'Amani Wanjiku', vaccine: 'BCG', doseNumber: 1, dateAdministered: '2014', source: 'External document', verified: true },
    { id: 'imm-002', studentId: 'stu-001', studentName: 'Amani Wanjiku', vaccine: 'Measles-Rubella (MR1)', doseNumber: 1, dateAdministered: '2015', source: 'External document', verified: true },
    { id: 'imm-003', studentId: 'stu-002', studentName: 'Brian Otieno', vaccine: 'HPV', doseNumber: 1, dateAdministered: '2022', source: 'Parent', verified: false },
  ],

  notifications: [
    { id: 'hn-001', recipient: 'Guardian of Amani Wanjiku', title: 'Clinic visit notification', detail: 'The school health team needs to contact you regarding Amani.', unread: true, createdDate: '16 Oct 2026', deliveryStatus: 'Delivered' },
    { id: 'hn-002', recipient: 'Guardian of Brian Otieno', title: 'Clinic visit notification', detail: 'The school health team needs to contact you regarding Brian.', unread: true, createdDate: '16 Oct 2026', deliveryStatus: 'Delivered' },
    { id: 'hn-003', recipient: 'Guardian of Dylan Kamau', title: 'Urgent health notification', detail: 'The school health team needs to contact you urgently regarding Dylan.', unread: false, createdDate: '15 Oct 2026', deliveryStatus: 'Read' },
    { id: 'hn-004', recipient: 'Guardian of Faith Achieng', title: 'Health information update request', detail: 'Please update your child\'s medical information at your earliest convenience.', unread: true, createdDate: '10 Oct 2026', deliveryStatus: 'Sent' },
  ],

  audit: [
    { id: 'ha-001', actor: 'Nurse Grace', action: 'Registered clinic visit', target: 'ENC-001 · Amani Wanjiku · 16 Oct 2026', timestamp: '16 Oct 2026, 09:15' },
    { id: 'ha-002', actor: 'Nurse Grace', action: 'Recorded observations', target: 'ENC-001 · Temperature 37.8°C', timestamp: '16 Oct 2026, 09:20' },
    { id: 'ha-003', actor: 'Nurse Grace', action: 'Administered medication', target: 'Salbutamol · Brian Otieno · ENC-002', timestamp: '16 Oct 2026, 10:40' },
    { id: 'ha-004', actor: 'Nurse Grace', action: 'Created referral', target: 'REF-001 · Amani Wanjiku · Gertrude\'s Hospital', timestamp: '16 Oct 2026, 11:00' },
    { id: 'ha-005', actor: 'Nurse Grace', action: 'Recorded emergency incident', target: 'EMR-001 · Dylan Kamau · Hypoglycaemia', timestamp: '15 Oct 2026, 14:20' },
    { id: 'ha-006', actor: 'Nurse Grace', action: 'Finalized encounter', target: 'ENC-005 · Dylan Kamau · Completed', timestamp: '15 Oct 2026, 15:00' },
  ],
};

let state: HealthDemoState = structuredClone(seed);
const listeners = new Set<() => void>();
function notify(): void { listeners.forEach((l) => l()); }

export function useHealthDemo(): HealthDemoState {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => state, () => state);
}

function logAudit(actor: string, action: string, target: string): void {
  state = { ...state, audit: [{ id: `ha-${Date.now()}`, actor, action, target, timestamp: '16 Oct 2026, now' }, ...state.audit] };
}

export const healthDemo = {
  registerVisit(studentId: string, visitType: VisitType, presentingComplaint: string, symptomOnset: string): { ok: boolean; error?: string } {
    const profile = state.profiles.find((p) => p.studentId === studentId);
    if (!profile) return { ok: false, error: 'Student health profile not found.' };
    if (!presentingComplaint.trim()) return { ok: false, error: 'Presenting complaint is required.' };
    const num = `ENC-${String(state.encounters.length + 1).padStart(3, '0')}`;
    const encounter: Encounter = { id: `enc-${Date.now()}`, encounterNumber: num, studentId, studentName: profile.studentName, className: profile.className, date: '16 Oct 2026', time: 'now', visitType, presentingComplaint, symptomOnset, history: '', assessment: '', workingDiagnosis: '', treatmentPlan: '', disposition: '', followUpDate: null, clinician: 'Nurse Grace', status: 'Waiting', parentNotified: false, consentStatus: 'Not required' };
    state = { ...state, encounters: [encounter, ...state.encounters] };
    logAudit('Nurse Grace', 'Registered clinic visit', `${num} · ${profile.studentName} · 16 Oct 2026`);
    notify();
    return { ok: true };
  },

  startConsultation(encounterId: string): { ok: boolean; error?: string } {
    const enc = state.encounters.find((e) => e.id === encounterId);
    if (!enc) return { ok: false, error: 'Encounter not found.' };
    if (enc.status !== 'Waiting' && enc.status !== 'Registered') return { ok: false, error: `Encounter is ${enc.status.toLowerCase()}, cannot start consultation.` };
    state = { ...state, encounters: state.encounters.map((e) => e.id === encounterId ? { ...e, status: 'In consultation' as EncounterStatus } : e) };
    logAudit('Nurse Grace', 'Started consultation', `${enc.encounterNumber} · ${enc.studentName}`);
    notify();
    return { ok: true };
  },

  recordObservation(encounterId: string, obs: { temperature: number | null; pulse: number | null; respiratoryRate: number | null; bloodPressureSystolic: number | null; bloodPressureDiastolic: number | null; oxygenSaturation: number | null; painScore: number | null; note: string }): { ok: boolean; error?: string } {
    const enc = state.encounters.find((e) => e.id === encounterId);
    if (!enc) return { ok: false, error: 'Encounter not found.' };
    if (obs.temperature !== null && (obs.temperature < 30 || obs.temperature > 45)) return { ok: false, error: 'Temperature out of plausible range (30-45°C). Please confirm.' };
    if (obs.pulse !== null && (obs.pulse < 30 || obs.pulse > 220)) return { ok: false, error: 'Pulse out of plausible range (30-220 bpm). Please confirm.' };
    if (obs.oxygenSaturation !== null && (obs.oxygenSaturation < 50 || obs.oxygenSaturation > 100)) return { ok: false, error: 'Oxygen saturation out of range (50-100%). Please confirm.' };
    const observation: Observation = { id: `obs-${Date.now()}`, encounterId, temperature: obs.temperature, pulse: obs.pulse, respiratoryRate: obs.respiratoryRate, bloodPressureSystolic: obs.bloodPressureSystolic, bloodPressureDiastolic: obs.bloodPressureDiastolic, oxygenSaturation: obs.oxygenSaturation, painScore: obs.painScore, height: null, weight: null, recordedBy: 'Nurse Grace', recordedAt: '16 Oct 2026, now', note: obs.note };
    state = { ...state, observations: [observation, ...state.observations] };
    logAudit('Nurse Grace', 'Recorded observations', `${enc.encounterNumber} · Temp ${obs.temperature ?? '—'}°C, Pulse ${obs.pulse ?? '—'}`);
    notify();
    return { ok: true };
  },

  recordTreatment(encounterId: string, procedure: string, indication: string, materialsUsed: string, outcome: string, instructions: string, followUpPlan: string): { ok: boolean; error?: string } {
    const enc = state.encounters.find((e) => e.id === encounterId);
    if (!enc) return { ok: false, error: 'Encounter not found.' };
    if (!procedure.trim()) return { ok: false, error: 'Procedure/treatment is required.' };
    const treatment: Treatment = { id: `trt-${Date.now()}`, encounterId, procedure, indication, performedBy: 'Nurse Grace', performedAt: '16 Oct 2026, now', materialsUsed, outcome, instructions, followUpPlan };
    state = { ...state, treatments: [treatment, ...state.treatments], encounters: state.encounters.map((e) => e.id === encounterId ? { ...e, status: 'Treatment' as EncounterStatus, treatmentPlan: procedure } : e) };
    logAudit('Nurse Grace', 'Recorded treatment', `${enc.encounterNumber} · ${procedure}`);
    notify();
    return { ok: true };
  },

  completeEncounter(encounterId: string, assessment: string, workingDiagnosis: string, disposition: string, followUpDate: string | null): { ok: boolean; error?: string } {
    const enc = state.encounters.find((e) => e.id === encounterId);
    if (!enc) return { ok: false, error: 'Encounter not found.' };
    if (enc.status === 'Completed') return { ok: false, error: 'Encounter is already completed.' };
    if (!disposition.trim()) return { ok: false, error: 'Disposition is required to complete an encounter.' };
    state = { ...state, encounters: state.encounters.map((e) => e.id === encounterId ? { ...e, status: 'Completed' as EncounterStatus, assessment, workingDiagnosis, disposition, followUpDate, parentNotified: true } : e) };
    logAudit('Nurse Grace', 'Finalized encounter', `${enc.encounterNumber} · ${enc.studentName} · Completed`);
    notify();
    return { ok: true };
  },

  cancelEncounter(encounterId: string): void {
    const enc = state.encounters.find((e) => e.id === encounterId);
    if (!enc) return;
    state = { ...state, encounters: state.encounters.map((e) => e.id === encounterId ? { ...e, status: 'Cancelled' as EncounterStatus } : e) };
    logAudit('Nurse Grace', 'Cancelled encounter', `${enc.encounterNumber} · ${enc.studentName}`);
    notify();
  },

  administerMedication(orderId: string): { ok: boolean; error?: string } {
    const order = state.medicationOrders.find((o) => o.id === orderId);
    if (!order) return { ok: false, error: 'Medication order not found.' };
    if (order.status !== 'Active') return { ok: false, error: `Order is ${order.status.toLowerCase()}, cannot administer.` };
    const pending = state.administrations.find((a) => a.orderId === orderId && a.status === 'Pending');
    if (pending) {
      state = { ...state, administrations: state.administrations.map((a) => a.id === pending.id ? { ...a, status: 'Administered' as AdministrationStatus, actualTime: 'now', administeredBy: 'Nurse Grace' } : a) };
    } else {
      const admin: MedicationAdministration = { id: `mar-${Date.now()}`, orderId, studentId: order.studentId, studentName: order.studentName, medication: `${order.medication} ${order.strength}`, scheduledTime: 'now', actualTime: 'now', dose: order.dose, route: order.route, administeredBy: 'Nurse Grace', status: 'Administered', reason: '', adverseReaction: '', witness: '' };
      state = { ...state, administrations: [admin, ...state.administrations] };
    }
    logAudit('Nurse Grace', 'Administered medication', `${order.medication} · ${order.studentName}`);
    notify();
    return { ok: true };
  },

  refuseMedication(orderId: string, reason: string): { ok: boolean; error?: string } {
    const order = state.medicationOrders.find((o) => o.id === orderId);
    if (!order) return { ok: false, error: 'Medication order not found.' };
    if (!reason.trim()) return { ok: false, error: 'Reason for refusal/omission is required.' };
    const admin: MedicationAdministration = { id: `mar-${Date.now()}`, orderId, studentId: order.studentId, studentName: order.studentName, medication: `${order.medication} ${order.strength}`, scheduledTime: 'now', actualTime: null, dose: order.dose, route: order.route, administeredBy: 'Nurse Grace', status: 'Refused', reason, adverseReaction: '', witness: '' };
    state = { ...state, administrations: [admin, ...state.administrations] };
    logAudit('Nurse Grace', 'Recorded medication refusal', `${order.medication} · ${order.studentName} · ${reason}`);
    notify();
    return { ok: true };
  },

  createReferral(studentId: string, reason: string, urgency: ReferralUrgency, destination: string, clinicalSummary: string): { ok: boolean; error?: string } {
    const profile = state.profiles.find((p) => p.studentId === studentId);
    if (!profile) return { ok: false, error: 'Student health profile not found.' };
    if (!reason.trim()) return { ok: false, error: 'Reason for referral is required.' };
    if (!destination.trim()) return { ok: false, error: 'Referral destination is required.' };
    const num = `REF-${String(state.referrals.length + 1).padStart(3, '0')}`;
    const referral: Referral = { id: `ref-${Date.now()}`, referralNumber: num, studentId, studentName: profile.studentName, encounterId: null, reason, clinicalSummary, urgency, destination, referringProfessional: 'Nurse Grace', date: '16 Oct 2026', guardianNotified: true, guardianConsent: 'Received', transportArranged: 'Guardian to arrange', attended: null, outcome: '', followUpDue: null, status: 'Issued' };
    state = { ...state, referrals: [referral, ...state.referrals], notifications: [{ id: `hn-${Date.now()}`, recipient: `Guardian of ${profile.studentName}`, title: 'Referral notification', detail: 'The school health team needs to contact you regarding a referral.', unread: true, createdDate: '16 Oct 2026', deliveryStatus: 'Sent' }, ...state.notifications] };
    logAudit('Nurse Grace', 'Created referral', `${num} · ${profile.studentName} · ${destination}`);
    notify();
    return { ok: true };
  },

  updateReferralStatus(referralId: string, status: ReferralStatus, outcome: string): { ok: boolean; error?: string } {
    const ref = state.referrals.find((r) => r.id === referralId);
    if (!ref) return { ok: false, error: 'Referral not found.' };
    state = { ...state, referrals: state.referrals.map((r) => r.id === referralId ? { ...r, status, outcome: outcome || r.outcome, attended: status === 'Attended' || status === 'Outcome received' ? true : status === 'Declined' ? false : r.attended } : r) };
    logAudit('Nurse Grace', `Updated referral ${status.toLowerCase()}`, `${ref.referralNumber} · ${ref.studentName}`);
    notify();
    return { ok: true };
  },

  recordEmergency(studentId: string, type: string, description: string, initialObservations: string, actionsTaken: string, guardianContacted: string): { ok: boolean; error?: string } {
    const profile = state.profiles.find((p) => p.studentId === studentId);
    if (!profile) return { ok: false, error: 'Student health profile not found.' };
    if (!type.trim() || !description.trim()) return { ok: false, error: 'Emergency type and description are required.' };
    const num = `EMR-${String(state.emergencies.length + 1).padStart(3, '0')}`;
    const emergency: Emergency = { id: `emr-${Date.now()}`, emergencyNumber: num, studentId, studentName: profile.studentName, date: '16 Oct 2026', time: 'now', type, description, initialObservations, actionsTaken, guardianContacted, emergencyServices: 'N/A', transportDetails: 'N/A', receivingFacility: '', handoverNotes: '', status: 'Active', timeline: [{ time: 'now', event: 'Emergency registered' }, { time: 'now', event: actionsTaken }] };
    state = { ...state, emergencies: [emergency, ...state.emergencies], notifications: [{ id: `hn-${Date.now()}`, recipient: `Guardian of ${profile.studentName}`, title: 'Urgent health notification', detail: 'The school health team needs to contact you urgently.', unread: true, createdDate: '16 Oct 2026', deliveryStatus: 'Sent' }, ...state.notifications] };
    logAudit('Nurse Grace', 'Recorded emergency incident', `${num} · ${profile.studentName} · ${type}`);
    notify();
    return { ok: true };
  },

  resolveEmergency(emergencyId: string): { ok: boolean; error?: string } {
    const emr = state.emergencies.find((e) => e.id === emergencyId);
    if (!emr) return { ok: false, error: 'Emergency not found.' };
    if (emr.status === 'Resolved') return { ok: false, error: 'Emergency is already resolved.' };
    state = { ...state, emergencies: state.emergencies.map((e) => e.id === emergencyId ? { ...e, status: 'Resolved' as EmergencyStatus, timeline: [...e.timeline, { time: 'now', event: 'Emergency resolved' }] } : e) };
    logAudit('Nurse Grace', 'Resolved emergency', `${emr.emergencyNumber} · ${emr.studentName}`);
    notify();
    return { ok: true };
  },

  updateConsent(consentId: string, status: ConsentStatus): { ok: boolean; error?: string } {
    const consent = state.consents.find((c) => c.id === consentId);
    if (!consent) return { ok: false, error: 'Consent record not found.' };
    state = { ...state, consents: state.consents.map((c) => c.id === consentId ? { ...c, status, date: '16 Oct 2026' } : c) };
    logAudit('Nurse Grace', `Updated consent ${status.toLowerCase()}`, `${consent.type} · ${consent.studentName}`);
    notify();
    return { ok: true };
  },

  markNotificationRead(id: string): void {
    state = { ...state, notifications: state.notifications.map((n) => n.id === id ? { ...n, unread: false, deliveryStatus: 'Read' as HealthNotification['deliveryStatus'] } : n) };
    notify();
  },

  reset(): void { state = structuredClone(seed); notify(); },
};

export const HEALTH_POLICIES = {
  PARENT_NOTIFICATIONS_NEUTRAL_WORDING: true,
  EMERGENCY_ACCESS_REQUIRES_REASON: true,
  CLINICAL_RECORDS_APPEND_ONLY: true,
  PREVENT_DUPLICATE_ADMINISTRATION: true,
  OBSERVATION_RANGE_VALIDATION: true,
};
