import { useState, useCallback } from 'react';

export interface ComputerLab {
  id: string;
  name: string;
  code: string;
  capacity: number;
  status: 'Active' | 'Unavailable' | 'Maintenance' | 'Closed';
  technician: string;
}

export interface Workstation {
  id: string;
  labId: string;
  labName: string;
  workstationNumber: string;
  deviceStatus: 'Operational' | 'Faulty' | 'Under Repair' | 'Decommissioned' | 'Missing';
  workstationStatus: 'Available' | 'Assigned' | 'Unavailable';
  assetTag: string;
  manufacturer: string;
  model: string;
}

export interface IctAsset {
  id: string;
  assetTag: string;
  deviceType: 'Desktop' | 'Laptop' | 'Projector' | 'Printer' | 'Router' | 'Switch' | 'Other';
  manufacturer: string;
  model: string;
  serialNumber: string;
  status: 'Operational' | 'Faulty' | 'Under Repair' | 'Decommissioned' | 'Missing';
  labName: string;
}

export interface SoftwareProduct {
  id: string;
  name: string;
  version: string;
  category: 'Operating System' | 'Productivity' | 'Development' | 'Educational' | 'Security' | 'Utility';
  licencesTotal: number;
  licencesAllocated: number;
}

export interface SoftwareLicence {
  id: string;
  productId: string;
  productName: string;
  licenceType: 'Perpetual' | 'Subscription' | 'Open Source' | 'Volume' | 'OEM';
  seats: number;
  expiryDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
}

export interface ComputerLabBooking {
  id: string;
  labName: string;
  title: string;
  teacher: string;
  className: string;
  date: string;
  startTime: string;
  endTime: string;
  workstationsRequired: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
}

export interface ComputerPractical {
  id: string;
  title: string;
  subject: string;
  className: string;
  teacher: string;
  labName: string;
  date: string;
  status: 'Draft' | 'Submitted' | 'Reviewed' | 'Approved' | 'Scheduled' | 'Prepared' | 'In Progress' | 'Completed' | 'Assessed';
}

export interface TechnicalTicket {
  id: string;
  workstationNumber: string;
  labName: string;
  reportedBy: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Triaged' | 'Assigned' | 'In Progress' | 'Waiting for Info' | 'Waiting for Parts' | 'Resolved' | 'Verified' | 'Closed';
  reportedDate: string;
}

export interface AssetAudit {
  id: string;
  labName: string;
  auditor: string;
  date: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Discrepancy' | 'Reconciled';
  discrepancies: number;
}

const initialLabs: ComputerLab[] = [
  { id: 'cl1', name: 'ICT Lab 1', code: 'ICT-001', capacity: 30, status: 'Active', technician: 'Mr. Mwangi' },
  { id: 'cl2', name: 'ICT Lab 2', code: 'ICT-002', capacity: 25, status: 'Active', technician: 'Mr. Mwangi' },
];

const initialWorkstations: Workstation[] = Array.from({ length: 10 }, (_, i) => {
  const labId = i < 6 ? 'cl1' : 'cl2';
  const labName = i < 6 ? 'ICT Lab 1' : 'ICT Lab 2';
  const num = i < 6 ? i + 1 : i - 5;
  const isFaulty = i === 2 || i === 7;
  return {
    id: `ws${i + 1}`,
    labId,
    labName,
    workstationNumber: `WS-${num}`,
    deviceStatus: isFaulty ? 'Faulty' : 'Operational',
    workstationStatus: isFaulty ? 'Unavailable' : 'Available',
    assetTag: `AST-${String(1000 + i + 1).padStart(5, '0')}`,
    manufacturer: i % 2 === 0 ? 'Dell' : 'HP',
    model: i % 2 === 0 ? 'OptiPlex 7090' : 'ProDesk 600 G6',
  };
});

const initialAssets: IctAsset[] = [
  { id: 'ia1', assetTag: 'AST-PRJ-001', deviceType: 'Projector', manufacturer: 'Epson', model: 'EB-X51', serialNumber: 'SN-EPX-001', status: 'Operational', labName: 'ICT Lab 1' },
  { id: 'ia2', assetTag: 'AST-PRT-001', deviceType: 'Printer', manufacturer: 'HP', model: 'LaserJet Pro M404', serialNumber: 'SN-HP-001', status: 'Operational', labName: 'ICT Lab 2' },
  { id: 'ia3', assetTag: 'AST-RTR-001', deviceType: 'Router', manufacturer: 'Cisco', model: 'RV340', serialNumber: 'SN-CSC-001', status: 'Operational', labName: 'ICT Lab 1' },
];

const initialSoftware: SoftwareProduct[] = [
  { id: 'sp1', name: 'Microsoft Office 365', version: '2024', category: 'Productivity', licencesTotal: 60, licencesAllocated: 55 },
  { id: 'sp2', name: 'Windows 11 Pro', version: '23H2', category: 'Operating System', licencesTotal: 55, licencesAllocated: 52 },
  { id: 'sp3', name: 'Adobe Creative Cloud', version: '2024', category: 'Educational', licencesTotal: 10, licencesAllocated: 8 },
  { id: 'sp4', name: 'Visual Studio Code', version: '1.93', category: 'Development', licencesTotal: 0, licencesAllocated: 0 },
];

const initialLicences: SoftwareLicence[] = [
  { id: 'sl1', productId: 'sp1', productName: 'Microsoft Office 365', licenceType: 'Subscription', seats: 60, expiryDate: '2027-01-15', status: 'Active' },
  { id: 'sl2', productId: 'sp2', productName: 'Windows 11 Pro', licenceType: 'Volume', seats: 55, expiryDate: '2026-12-01', status: 'Expiring Soon' },
  { id: 'sl3', productId: 'sp3', productName: 'Adobe Creative Cloud', licenceType: 'Subscription', seats: 10, expiryDate: '2026-11-20', status: 'Expiring Soon' },
];

const initialBookings: ComputerLabBooking[] = [
  { id: 'cb1', labName: 'ICT Lab 1', title: 'Spreadsheets Practical', teacher: 'Mr. Samuel Kamau', className: 'Form 2 — Tana', date: '2026-10-18', startTime: '09:00', endTime: '10:30', workstationsRequired: 25, status: 'Confirmed' },
  { id: 'cb2', labName: 'ICT Lab 2', title: 'Programming Basics', teacher: 'Mr. Samuel Kamau', className: 'Form 3 — Sabaki', date: '2026-10-19', startTime: '11:00', endTime: '12:30', workstationsRequired: 20, status: 'Pending' },
];

const initialPracticals: ComputerPractical[] = [
  { id: 'cp1', title: 'Excel Formulas & Charts', subject: 'Computer Studies', className: 'Form 2 — Tana', teacher: 'Mr. Samuel Kamau', labName: 'ICT Lab 1', date: '2026-10-18', status: 'Scheduled' },
  { id: 'cp2', title: 'Python Loops & Conditionals', subject: 'Computer Studies', className: 'Form 4 — Athi', teacher: 'Mr. Samuel Kamau', labName: 'ICT Lab 2', date: '2026-10-20', status: 'Approved' },
  { id: 'cp3', title: 'Internet Safety Workshop', subject: 'Computer Studies', className: 'Year 8 — Acacia', teacher: 'Mr. Samuel Kamau', labName: 'ICT Lab 1', date: '2026-10-22', status: 'Draft' },
];

const initialTickets: TechnicalTicket[] = [
  { id: 'tt1', workstationNumber: 'WS-3', labName: 'ICT Lab 1', reportedBy: 'Mr. Samuel Kamau', description: 'Monitor not turning on', priority: 'High', status: 'Assigned', reportedDate: '2026-10-10' },
  { id: 'tt2', workstationNumber: 'WS-8', labName: 'ICT Lab 2', reportedBy: 'Ms. Mary Njoki', description: 'Keyboard unresponsive', priority: 'Medium', status: 'Open', reportedDate: '2026-10-14' },
  { id: 'tt3', workstationNumber: 'WS-3', labName: 'ICT Lab 1', reportedBy: 'Mr. Samuel Kamau', description: 'Blue screen error on startup', priority: 'Critical', status: 'In Progress', reportedDate: '2026-10-08' },
];

const initialAudits: AssetAudit[] = [
  { id: 'aa1', labName: 'ICT Lab 1', auditor: 'Mr. Mwangi', date: '2026-10-15', status: 'Completed', discrepancies: 0 },
  { id: 'aa2', labName: 'ICT Lab 2', auditor: 'Mr. Mwangi', date: '2026-10-29', status: 'Scheduled', discrepancies: 0 },
];

export function useComputerLabDemo() {
  const [labs, setLabs] = useState<ComputerLab[]>(initialLabs);
  const [workstations] = useState<Workstation[]>(initialWorkstations);
  const [assets] = useState<IctAsset[]>(initialAssets);
  const [software] = useState<SoftwareProduct[]>(initialSoftware);
  const [licences] = useState<SoftwareLicence[]>(initialLicences);
  const [bookings, setBookings] = useState<ComputerLabBooking[]>(initialBookings);
  const [practicals, setPracticals] = useState<ComputerPractical[]>(initialPracticals);
  const [tickets, setTickets] = useState<TechnicalTicket[]>(initialTickets);
  const [audits] = useState<AssetAudit[]>(initialAudits);

  const createLab = useCallback((name: string, code: string, capacity: number, technician: string) => {
    const newLab: ComputerLab = { id: `cl${Date.now()}`, name, code, capacity, status: 'Active', technician };
    setLabs((prev) => [...prev, newLab]);
    return { ok: true };
  }, []);

  const createBooking = useCallback((labName: string, title: string, teacher: string, className: string, date: string, startTime: string, endTime: string, workstationsRequired: number) => {
    const conflict = bookings.some((b) => b.labName === labName && b.date === date && b.status === 'Confirmed' && !(endTime <= b.startTime || startTime >= b.endTime));
    if (conflict) return { ok: false, error: 'Booking conflict: this lab is already booked for the selected time slot.' };
    const lab = labs.find((l) => l.name === labName);
    if (!lab || lab.status !== 'Active') return { ok: false, error: 'This lab is not available for booking.' };
    const operational = workstations.filter((w) => w.labName === labName && w.deviceStatus === 'Operational').length;
    if (workstationsRequired > operational) return { ok: false, error: `Only ${operational} operational workstations available in ${labName}.` };
    const newBooking: ComputerLabBooking = { id: `cb${Date.now()}`, labName, title, teacher, className, date, startTime, endTime, workstationsRequired, status: 'Pending' };
    setBookings((prev) => [...prev, newBooking]);
    return { ok: true };
  }, [bookings, labs, workstations]);

  const confirmBooking = useCallback((id: string) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: 'Confirmed' } : b));
    return { ok: true };
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: 'Cancelled' } : b));
    return { ok: true };
  }, []);

  const createTicket = useCallback((workstationNumber: string, labName: string, reportedBy: string, description: string, priority: TechnicalTicket['priority']) => {
    const newTicket: TechnicalTicket = { id: `tt${Date.now()}`, workstationNumber, labName, reportedBy, description, priority, status: 'Open', reportedDate: '2026-10-16' };
    setTickets((prev) => [...prev, newTicket]);
    return { ok: true };
  }, []);

  const advanceTicket = useCallback((id: string) => {
    const flow: TechnicalTicket['status'][] = ['Open', 'Triaged', 'Assigned', 'In Progress', 'Waiting for Info', 'Waiting for Parts', 'Resolved', 'Verified', 'Closed'];
    setTickets((prev) => prev.map((t) => {
      if (t.id !== id) return t;
      const idx = flow.indexOf(t.status);
      if (idx < flow.length - 1) return { ...t, status: flow[idx + 1] };
      return t;
    }));
    return { ok: true };
  }, []);

  const advancePractical = useCallback((id: string) => {
    const flow: ComputerPractical['status'][] = ['Draft', 'Submitted', 'Reviewed', 'Approved', 'Scheduled', 'Prepared', 'In Progress', 'Completed', 'Assessed'];
    setPracticals((prev) => prev.map((p) => {
      if (p.id !== id) return p;
      const idx = flow.indexOf(p.status);
      if (idx < flow.length - 1) return { ...p, status: flow[idx + 1] };
      return p;
    }));
    return { ok: true };
  }, []);

  return { labs, workstations, assets, software, licences, bookings, practicals, tickets, audits, createLab, createBooking, confirmBooking, cancelBooking, createTicket, advanceTicket, advancePractical };
}

export const computerLabDemo = { reset: () => {} };
