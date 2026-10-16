import { useState, useCallback } from 'react';

export interface ScienceLab {
  id: string;
  name: string;
  code: string;
  type: 'Chemistry' | 'Biology' | 'Physics' | 'General Science';
  capacity: number;
  status: 'Active' | 'Unavailable' | 'Maintenance' | 'Closed';
  technician: string;
}

export interface ScienceEquipment {
  id: string;
  labId: string;
  labName: string;
  itemCode: string;
  name: string;
  category: string;
  quantityAvailable: number;
  quantityReserved: number;
  condition: 'Good' | 'Fair' | 'Damaged' | 'Under Repair';
  reorderThreshold: number;
}

export interface ChemicalBatch {
  id: string;
  equipmentId: string;
  chemicalName: string;
  batchNumber: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  hazardLevel: 'Low' | 'Medium' | 'High' | 'Corrosive' | 'Flammable' | 'Toxic' | 'Restricted';
  disposalStatus: 'Not Required' | 'Pending' | 'Disposed';
  isExpired: boolean;
}

export interface PracticalLesson {
  id: string;
  title: string;
  subject: string;
  className: string;
  teacher: string;
  labName: string;
  date: string;
  status: 'Draft' | 'Submitted' | 'Reviewed' | 'Approved' | 'Scheduled' | 'Prepared' | 'In Progress' | 'Completed' | 'Assessed';
}

export interface LabBooking {
  id: string;
  labName: string;
  title: string;
  teacher: string;
  className: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
}

export interface SafetyInspection {
  id: string;
  labName: string;
  date: string;
  inspector: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue';
  findings: number;
}

export interface LabIncident {
  id: string;
  labName: string;
  date: string;
  severity: 'Minor' | 'Moderate' | 'Serious' | 'Critical';
  description: string;
  status: 'Open' | 'Under Review' | 'Action Assigned' | 'Resolved' | 'Closed';
}

export interface LabMaintenance {
  id: string;
  labName: string;
  equipment: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Reported' | 'Reviewed' | 'Approved' | 'Assigned' | 'In Progress' | 'Awaiting Parts' | 'External Service' | 'Resolved' | 'Verified' | 'Closed';
  reportedDate: string;
}

const initialLabs: ScienceLab[] = [
  { id: 'l1', name: 'Chemistry Lab A', code: 'LAB-CHEM-A', type: 'Chemistry', capacity: 36, status: 'Active', technician: 'Mr. Kiprono' },
  { id: 'l2', name: 'Biology Lab B', code: 'LAB-BIO-B', type: 'Biology', capacity: 32, status: 'Active', technician: 'Ms. Cherono' },
  { id: 'l3', name: 'Physics Lab C', code: 'LAB-PHY-C', type: 'Physics', capacity: 30, status: 'Maintenance', technician: 'Mr. Kiprono' },
];

const initialEquipment: ScienceEquipment[] = [
  { id: 'eq1', labId: 'l1', labName: 'Chemistry Lab A', itemCode: 'EQ-001', name: 'Beakers (250ml)', category: 'Glassware', quantityAvailable: 80, quantityReserved: 20, condition: 'Good', reorderThreshold: 20 },
  { id: 'eq2', labId: 'l1', labName: 'Chemistry Lab A', itemCode: 'EQ-002', name: 'Bunsen Burners', category: 'Instruments', quantityAvailable: 24, quantityReserved: 12, condition: 'Good', reorderThreshold: 10 },
  { id: 'eq3', labId: 'l2', labName: 'Biology Lab B', itemCode: 'EQ-003', name: 'Microscopes', category: 'Instruments', quantityAvailable: 15, quantityReserved: 0, condition: 'Good', reorderThreshold: 5 },
  { id: 'eq4', labId: 'l2', labName: 'Biology Lab B', itemCode: 'EQ-004', name: 'Prepared Slides', category: 'Specimens', quantityAvailable: 8, quantityReserved: 0, condition: 'Fair', reorderThreshold: 15 },
  { id: 'eq5', labId: 'l3', labName: 'Physics Lab C', itemCode: 'EQ-005', name: 'Multimeters', category: 'Instruments', quantityAvailable: 3, quantityReserved: 0, condition: 'Under Repair', reorderThreshold: 8 },
];

const initialChemicals: ChemicalBatch[] = [
  { id: 'cb1', equipmentId: 'eq1', chemicalName: 'Hydrochloric Acid 1M', batchNumber: 'BATCH-001', quantity: 500, unit: 'ml', expiryDate: '2027-06-30', hazardLevel: 'Corrosive', disposalStatus: 'Not Required', isExpired: false },
  { id: 'cb2', equipmentId: 'eq1', chemicalName: 'Sodium Hydroxide 0.1M', batchNumber: 'BATCH-002', quantity: 250, unit: 'ml', expiryDate: '2026-08-15', hazardLevel: 'Corrosive', disposalStatus: 'Pending', isExpired: true },
  { id: 'cb3', equipmentId: 'eq1', chemicalName: 'Ethanol 95%', batchNumber: 'BATCH-003', quantity: 1000, unit: 'ml', expiryDate: '2028-01-01', hazardLevel: 'Flammable', disposalStatus: 'Not Required', isExpired: false },
  { id: 'cb4', equipmentId: 'eq2', chemicalName: 'Silver Nitrate 0.1M', batchNumber: 'BATCH-004', quantity: 100, unit: 'ml', expiryDate: '2026-12-01', hazardLevel: 'Restricted', disposalStatus: 'Not Required', isExpired: false },
  { id: 'cb5', equipmentId: 'eq2', chemicalName: 'Sulphuric Acid Conc.', batchNumber: 'BATCH-005', quantity: 200, unit: 'ml', expiryDate: '2027-03-15', hazardLevel: 'Toxic', disposalStatus: 'Not Required', isExpired: false },
];

const initialPracticals: PracticalLesson[] = [
  { id: 'p1', title: 'Acid-Base Titration', subject: 'Chemistry', className: 'Form 3 — Sabaki', teacher: 'Mrs. Rose Akinyi', labName: 'Chemistry Lab A', date: '2026-10-18', status: 'Scheduled' },
  { id: 'p2', title: 'Cell Observation', subject: 'Biology', className: 'Form 2 — Tana', teacher: 'Ms. Sarah Wambui', labName: 'Biology Lab B', date: '2026-10-19', status: 'Prepared' },
  { id: 'p3', title: 'Ohm\'s Law Verification', subject: 'Physics', className: 'Form 4 — Athi', teacher: 'Mr. David Omondi', labName: 'Physics Lab C', date: '2026-10-20', status: 'Approved' },
  { id: 'p4', title: 'Photosynthesis Experiment', subject: 'Biology', className: 'Year 8 — Acacia', teacher: 'Ms. Sarah Wambui', labName: 'Biology Lab B', date: '2026-10-23', status: 'Draft' },
];

const initialBookings: LabBooking[] = [
  { id: 'b1', labName: 'Chemistry Lab A', title: 'Acid-Base Titration', teacher: 'Mrs. Rose Akinyi', className: 'Form 3 — Sabaki', date: '2026-10-18', startTime: '09:00', endTime: '10:30', status: 'Confirmed' },
  { id: 'b2', labName: 'Biology Lab B', title: 'Cell Observation', teacher: 'Ms. Sarah Wambui', className: 'Form 2 — Tana', date: '2026-10-19', startTime: '11:00', endTime: '12:30', status: 'Confirmed' },
  { id: 'b3', labName: 'Chemistry Lab A', title: 'Flame Tests', teacher: 'Mrs. Rose Akinyi', className: 'Form 4 — Athi', date: '2026-10-20', startTime: '14:00', endTime: '15:30', status: 'Pending' },
];

const initialInspections: SafetyInspection[] = [
  { id: 'si1', labName: 'Chemistry Lab A', date: '2026-10-15', inspector: 'Mr. Kiprono', status: 'Completed', findings: 2 },
  { id: 'si2', labName: 'Biology Lab B', date: '2026-10-22', inspector: 'Ms. Cherono', status: 'Scheduled', findings: 0 },
  { id: 'si3', labName: 'Physics Lab C', date: '2026-10-10', inspector: 'Mr. Kiprono', status: 'Overdue', findings: 0 },
];

const initialIncidents: LabIncident[] = [
  { id: 'inc1', labName: 'Chemistry Lab A', date: '2026-10-05', severity: 'Minor', description: 'Minor chemical spill — cleaned immediately', status: 'Resolved' },
  { id: 'inc2', labName: 'Physics Lab C', date: '2026-09-28', severity: 'Moderate', description: 'Equipment malfunction — faulty multimeter', status: 'Action Assigned' },
];

const initialMaintenance: LabMaintenance[] = [
  { id: 'mt1', labName: 'Physics Lab C', equipment: 'Multimeters (3 units)', priority: 'High', status: 'In Progress', reportedDate: '2026-09-28' },
  { id: 'mt2', labName: 'Chemistry Lab A', equipment: 'Fume Hood', priority: 'Medium', status: 'Reported', reportedDate: '2026-10-12' },
];

export function useScienceLabDemo() {
  const [labs, setLabs] = useState<ScienceLab[]>(initialLabs);
  const [equipment] = useState<ScienceEquipment[]>(initialEquipment);
  const [chemicals] = useState<ChemicalBatch[]>(initialChemicals);
  const [practicals, setPracticals] = useState<PracticalLesson[]>(initialPracticals);
  const [bookings, setBookings] = useState<LabBooking[]>(initialBookings);
  const [inspections] = useState<SafetyInspection[]>(initialInspections);
  const [incidents] = useState<LabIncident[]>(initialIncidents);
  const [maintenance] = useState<LabMaintenance[]>(initialMaintenance);

  const createLab = useCallback((name: string, code: string, type: ScienceLab['type'], capacity: number, technician: string) => {
    const newLab: ScienceLab = { id: `l${Date.now()}`, name, code, type, capacity, status: 'Active', technician };
    setLabs((prev) => [...prev, newLab]);
    return { ok: true };
  }, []);

  const createBooking = useCallback((labName: string, title: string, teacher: string, className: string, date: string, startTime: string, endTime: string) => {
    const conflict = bookings.some((b) => b.labName === labName && b.date === date && b.status === 'Confirmed' && !(endTime <= b.startTime || startTime >= b.endTime));
    if (conflict) return { ok: false, error: 'Booking conflict: this lab is already booked for the selected time slot.' };
    const lab = labs.find((l) => l.name === labName);
    if (lab && lab.status !== 'Active') return { ok: false, error: 'This lab is not available for booking.' };
    const newBooking: LabBooking = { id: `b${Date.now()}`, labName, title, teacher, className, date, startTime, endTime, status: 'Pending' };
    setBookings((prev) => [...prev, newBooking]);
    return { ok: true };
  }, [bookings, labs]);

  const confirmBooking = useCallback((id: string) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: 'Confirmed' } : b));
    return { ok: true };
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: 'Cancelled' } : b));
    return { ok: true };
  }, []);

  const advancePractical = useCallback((id: string) => {
    const flow: PracticalLesson['status'][] = ['Draft', 'Submitted', 'Reviewed', 'Approved', 'Scheduled', 'Prepared', 'In Progress', 'Completed', 'Assessed'];
    setPracticals((prev) => prev.map((p) => {
      if (p.id !== id) return p;
      const idx = flow.indexOf(p.status);
      if (idx < flow.length - 1) return { ...p, status: flow[idx + 1] };
      return p;
    }));
    return { ok: true };
  }, []);

  return { labs, equipment, chemicals, practicals, bookings, inspections, incidents, maintenance, createLab, createBooking, confirmBooking, cancelBooking, advancePractical };
}

export const scienceLabDemo = { reset: () => {} };
