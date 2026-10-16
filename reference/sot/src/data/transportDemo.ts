import { useSyncExternalStore } from 'react';

export type VehicleStatus = 'Available' | 'Assigned' | 'Under maintenance' | 'Out of service' | 'Retired';
export type VehicleType = 'Bus' | 'Van' | 'Minibus';
export type DriverStatus = 'Active' | 'On leave' | 'Suspended' | 'Inactive';
export type VerificationStatus = 'Verified' | 'Pending' | 'Expired';
export type RouteStatus = 'Active' | 'Inactive';
export type TripStatus = 'Scheduled' | 'Ready' | 'In progress' | 'Completed' | 'Cancelled' | 'Delayed' | 'Breakdown';
export type TripDirection = 'Morning pickup' | 'Afternoon drop-off' | 'Evening drop-off' | 'Event';
export type AllocationStatus = 'Active' | 'Pending' | 'Suspended' | 'Withdrawn';
export type AttendanceStatus = 'Expected' | 'Picked up' | 'Absent at stop' | 'Boarded' | 'Dropped off' | 'Not transported' | 'Exception';
export type IncidentType = 'Breakdown' | 'Delay' | 'Accident' | 'Student safety concern' | 'Missed pickup' | 'Missed drop-off' | 'Vehicle defect' | 'Lost property';
export type IncidentSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type IncidentStatus = 'Open' | 'Under review' | 'Resolved';
export type MaintenanceType = 'Scheduled service' | 'Inspection' | 'Repair' | 'Defect report';

export type Vehicle = {
  id: string;
  vehicleId: string;
  plate: string;
  make: string;
  model: string;
  type: VehicleType;
  capacity: number;
  year: number;
  status: VehicleStatus;
  assignedRouteId: string | null;
  inspectionDue: string;
  insuranceExpiry: string;
  odometer: number;
};

export type Driver = {
  id: string;
  name: string;
  initials: string;
  phone: string;
  status: DriverStatus;
  licenceClass: string;
  licenceExpiry: string;
  verification: VerificationStatus;
  assignedVehicleId: string | null;
  assignedRouteId: string | null;
};

export type RouteStop = {
  id: string;
  routeId: string;
  name: string;
  order: number;
  plannedPickup: string;
  plannedDropoff: string;
  active: boolean;
};

export type Route = {
  id: string;
  name: string;
  reference: string;
  direction: TripDirection;
  status: RouteStatus;
  operatingDays: string;
  vehicleId: string | null;
  driverId: string | null;
  stops: RouteStop[];
  capacity: number;
};

export type Allocation = {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  routeId: string;
  routeName: string;
  stopId: string;
  stopName: string;
  status: AllocationStatus;
  startDate: string;
  endDate: string | null;
};

export type TripAttendance = {
  studentId: string;
  studentName: string;
  stopName: string;
  status: AttendanceStatus;
  timestamp: string | null;
  note: string;
};

export type Trip = {
  id: string;
  routeId: string;
  routeName: string;
  vehicleId: string;
  vehiclePlate: string;
  driverId: string;
  driverName: string;
  date: string;
  direction: TripDirection;
  plannedDeparture: string;
  plannedArrival: string;
  actualStart: string | null;
  actualEnd: string | null;
  status: TripStatus;
  attendance: TripAttendance[];
  notes: string;
};

export type MaintenanceRecord = {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  type: MaintenanceType;
  date: string;
  odometer: number;
  description: string;
  cost: number;
  status: 'Completed' | 'In progress' | 'Scheduled';
  recordedBy: string;
};

export type Incident = {
  id: string;
  type: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  tripId: string | null;
  routeName: string;
  vehiclePlate: string;
  driverName: string;
  date: string;
  description: string;
  actionTaken: string;
  reportedBy: string;
};

export type FuelRecord = {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  date: string;
  litres: number;
  amount: number;
  odometer: number;
  supplier: string;
  recordedBy: string;
};

export type TransportNotification = {
  id: string;
  recipient: string;
  title: string;
  detail: string;
  unread: boolean;
  createdDate: string;
};

export type TransportAuditEntry = {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
};

export type TransportDemoState = {
  vehicles: Vehicle[];
  drivers: Driver[];
  routes: Route[];
  allocations: Allocation[];
  trips: Trip[];
  maintenance: MaintenanceRecord[];
  incidents: Incident[];
  fuelRecords: FuelRecord[];
  notifications: TransportNotification[];
  audit: TransportAuditEntry[];
};

const seed: TransportDemoState = {
  vehicles: [
    { id: 'veh-001', vehicleId: 'BUS-01', plate: 'KDA 001A', make: 'Toyota', model: 'Coaster', type: 'Bus', capacity: 30, year: 2020, status: 'Assigned', assignedRouteId: 'rt-001', inspectionDue: '15 Dec 2026', insuranceExpiry: '28 Feb 2027', odometer: 84200 },
    { id: 'veh-002', vehicleId: 'BUS-02', plate: 'KDA 002B', make: 'Nissan', model: 'Civilian', type: 'Bus', capacity: 28, year: 2019, status: 'Available', assignedRouteId: null, inspectionDue: '20 Nov 2026', insuranceExpiry: '10 Jan 2027', odometer: 96400 },
    { id: 'veh-003', vehicleId: 'VAN-01', plate: 'KDB 003C', make: 'Toyota', model: 'Hiace', type: 'Van', capacity: 14, year: 2021, status: 'Assigned', assignedRouteId: 'rt-002', inspectionDue: '05 Jan 2027', insuranceExpiry: '15 Mar 2027', odometer: 51800 },
    { id: 'veh-004', vehicleId: 'BUS-03', plate: 'KDA 004D', make: 'Isuzu', model: 'NPR', type: 'Bus', capacity: 33, year: 2018, status: 'Under maintenance', assignedRouteId: null, inspectionDue: 'Overdue', insuranceExpiry: '08 Dec 2026', odometer: 124000 },
    { id: 'veh-005', vehicleId: 'BUS-04', plate: 'KDA 005E', make: 'Toyota', model: 'Coaster', type: 'Bus', capacity: 30, year: 2022, status: 'Available', assignedRouteId: null, inspectionDue: '22 Jan 2027', insuranceExpiry: '30 Apr 2027', odometer: 31200 },
  ],
  drivers: [
    { id: 'drv-001', name: 'Peter Mwangi', initials: 'PM', phone: '0712 345 678', status: 'Active', licenceClass: 'B3', licenceExpiry: '14 Jun 2027', verification: 'Verified', assignedVehicleId: 'veh-001', assignedRouteId: 'rt-001' },
    { id: 'drv-002', name: 'John Kamau', initials: 'JK', phone: '0723 456 789', status: 'Active', licenceClass: 'B3', licenceExpiry: '02 Mar 2027', verification: 'Verified', assignedVehicleId: 'veh-003', assignedRouteId: 'rt-002' },
    { id: 'drv-003', name: 'Joseph Otieno', initials: 'JO', phone: '0734 567 890', status: 'On leave', licenceClass: 'B3', licenceExpiry: '18 Aug 2027', verification: 'Verified', assignedVehicleId: null, assignedRouteId: null },
    { id: 'drv-004', name: 'David Kimani', initials: 'DK', phone: '0745 678 901', status: 'Active', licenceClass: 'B3', licenceExpiry: '22 Sep 2026', verification: 'Expired', assignedVehicleId: null, assignedRouteId: null },
    { id: 'drv-005', name: 'Samuel Njoroge', initials: 'SN', phone: '0756 789 012', status: 'Active', licenceClass: 'B3', licenceExpiry: '10 Nov 2027', verification: 'Verified', assignedVehicleId: null, assignedRouteId: null },
  ],
  routes: [
    { id: 'rt-001', name: 'Karen Route', reference: 'RT-KRN', direction: 'Morning pickup', status: 'Active', operatingDays: 'Mon-Fri', vehicleId: 'veh-001', driverId: 'drv-001', capacity: 30, stops: [
      { id: 'sp-001', routeId: 'rt-001', name: 'Karen Shopping Centre', order: 1, plannedPickup: '06:30', plannedDropoff: '16:30', active: true },
      { id: 'sp-002', routeId: 'rt-001', name: 'Karen Grogan Road', order: 2, plannedPickup: '06:40', plannedDropoff: '16:20', active: true },
      { id: 'sp-003', routeId: 'rt-001', name: 'Karen Hardy Road', order: 3, plannedPickup: '06:50', plannedDropoff: '16:10', active: true },
      { id: 'sp-004', routeId: 'rt-001', name: 'Riverside Academy', order: 4, plannedPickup: '07:15', plannedDropoff: '16:00', active: true },
    ]},
    { id: 'rt-002', name: 'Westlands Route', reference: 'RT-WST', direction: 'Morning pickup', status: 'Active', operatingDays: 'Mon-Fri', vehicleId: 'veh-003', driverId: 'drv-002', capacity: 14, stops: [
      { id: 'sp-005', routeId: 'rt-002', name: 'Sarit Centre', order: 1, plannedPickup: '06:45', plannedDropoff: '16:30', active: true },
      { id: 'sp-006', routeId: 'rt-002', name: 'Waiyaki Way Junction', order: 2, plannedPickup: '06:55', plannedDropoff: '16:20', active: true },
      { id: 'sp-007', routeId: 'rt-002', name: 'Riverside Academy', order: 3, plannedPickup: '07:15', plannedDropoff: '16:00', active: true },
    ]},
    { id: 'rt-003', name: 'Lavington Route', reference: 'RT-LVG', direction: 'Morning pickup', status: 'Inactive', operatingDays: 'Mon-Fri', vehicleId: null, driverId: null, capacity: 28, stops: [
      { id: 'sp-008', routeId: 'rt-003', name: 'Lavington Mall', order: 1, plannedPickup: '06:35', plannedDropoff: '16:35', active: true },
      { id: 'sp-009', routeId: 'rt-003', name: 'James Gichuru Road', order: 2, plannedPickup: '06:45', plannedDropoff: '16:25', active: true },
      { id: 'sp-010', routeId: 'rt-003', name: 'Riverside Academy', order: 3, plannedPickup: '07:15', plannedDropoff: '16:00', active: true },
    ]},
  ],
  allocations: [
    { id: 'all-001', studentId: 'stu-001', studentName: 'Amani Wanjiku', className: 'Year 6 — Cedar', routeId: 'rt-001', routeName: 'Karen Route', stopId: 'sp-001', stopName: 'Karen Shopping Centre', status: 'Active', startDate: '01 Sep 2026', endDate: null },
    { id: 'all-002', studentId: 'stu-002', studentName: 'Brian Otieno', className: 'Year 8 — Acacia', routeId: 'rt-001', routeName: 'Karen Route', stopId: 'sp-002', stopName: 'Karen Grogan Road', status: 'Active', startDate: '01 Sep 2026', endDate: null },
    { id: 'all-003', studentId: 'stu-003', studentName: 'Chloe Njeri', className: 'Year 6 — Cedar', routeId: 'rt-001', routeName: 'Karen Route', stopId: 'sp-003', stopName: 'Karen Hardy Road', status: 'Active', startDate: '01 Sep 2026', endDate: null },
    { id: 'all-004', studentId: 'stu-004', studentName: 'Dylan Kamau', className: 'Year 8 — Acacia', routeId: 'rt-002', routeName: 'Westlands Route', stopId: 'sp-005', stopName: 'Sarit Centre', status: 'Active', startDate: '01 Sep 2026', endDate: null },
    { id: 'all-005', studentId: 'stu-005', studentName: 'Faith Achieng', className: 'Year 8 — Acacia', routeId: 'rt-002', routeName: 'Westlands Route', stopId: 'sp-006', stopName: 'Waiyaki Way Junction', status: 'Active', startDate: '01 Sep 2026', endDate: null },
    { id: 'all-006', studentId: 'stu-006', studentName: 'Gloria Wairimu', className: 'Year 5 — Baobab', routeId: '', routeName: 'Unallocated', stopId: '', stopName: '—', status: 'Pending', startDate: '10 Oct 2026', endDate: null },
  ],
  trips: [
    { id: 'trip-001', routeId: 'rt-001', routeName: 'Karen Route', vehicleId: 'veh-001', vehiclePlate: 'KDA 001A', driverId: 'drv-001', driverName: 'Peter Mwangi', date: '16 Oct 2026', direction: 'Morning pickup', plannedDeparture: '06:30', plannedArrival: '07:15', actualStart: '06:32', actualEnd: null, status: 'In progress', notes: '', attendance: [
      { studentId: 'stu-001', studentName: 'Amani Wanjiku', stopName: 'Karen Shopping Centre', status: 'Picked up', timestamp: '06:33', note: '' },
      { studentId: 'stu-002', studentName: 'Brian Otieno', stopName: 'Karen Grogan Road', status: 'Picked up', timestamp: '06:42', note: '' },
      { studentId: 'stu-003', studentName: 'Chloe Njeri', stopName: 'Karen Hardy Road', status: 'Expected', timestamp: null, note: '' },
    ]},
    { id: 'trip-002', routeId: 'rt-002', routeName: 'Westlands Route', vehicleId: 'veh-003', vehiclePlate: 'KDB 003C', driverId: 'drv-002', driverName: 'John Kamau', date: '16 Oct 2026', direction: 'Morning pickup', plannedDeparture: '06:45', plannedArrival: '07:15', actualStart: '06:45', actualEnd: '07:18', status: 'Completed', notes: 'Arrived 3 minutes late due to traffic.', attendance: [
      { studentId: 'stu-004', studentName: 'Dylan Kamau', stopName: 'Sarit Centre', status: 'Picked up', timestamp: '06:46', note: '' },
      { studentId: 'stu-005', studentName: 'Faith Achieng', stopName: 'Waiyaki Way Junction', status: 'Picked up', timestamp: '06:56', note: '' },
    ]},
    { id: 'trip-003', routeId: 'rt-001', routeName: 'Karen Route', vehicleId: 'veh-001', vehiclePlate: 'KDA 001A', driverId: 'drv-001', driverName: 'Peter Mwangi', date: '15 Oct 2026', direction: 'Afternoon drop-off', plannedDeparture: '16:00', plannedArrival: '16:45', actualStart: '16:02', actualEnd: '16:48', status: 'Completed', notes: '', attendance: [
      { studentId: 'stu-001', studentName: 'Amani Wanjiku', stopName: 'Karen Shopping Centre', status: 'Dropped off', timestamp: '16:48', note: '' },
      { studentId: 'stu-002', studentName: 'Brian Otieno', stopName: 'Karen Grogan Road', status: 'Dropped off', timestamp: '16:38', note: '' },
      { studentId: 'stu-003', studentName: 'Chloe Njeri', stopName: 'Karen Hardy Road', status: 'Dropped off', timestamp: '16:28', note: '' },
    ]},
  ],
  maintenance: [
    { id: 'mnt-001', vehicleId: 'veh-004', vehiclePlate: 'KDA 004D', type: 'Repair', date: '14 Oct 2026', odometer: 124000, description: 'Brake pad replacement and clutch adjustment', cost: 28000, status: 'In progress', recordedBy: 'Transport Admin' },
    { id: 'mnt-002', vehicleId: 'veh-001', vehiclePlate: 'KDA 001A', type: 'Scheduled service', date: '01 Oct 2026', odometer: 83500, description: 'Oil change, filter replacement, general inspection', cost: 12500, status: 'Completed', recordedBy: 'Transport Admin' },
    { id: 'mnt-003', vehicleId: 'veh-003', vehiclePlate: 'KDB 003C', type: 'Inspection', date: '28 Sep 2026', odometer: 51000, description: 'Routine safety inspection — passed', cost: 3500, status: 'Completed', recordedBy: 'Transport Admin' },
  ],
  incidents: [
    { id: 'inc-001', type: 'Delay', severity: 'Low', status: 'Resolved', tripId: 'trip-002', routeName: 'Westlands Route', vehiclePlate: 'KDB 003C', driverName: 'John Kamau', date: '16 Oct 2026', description: 'Traffic congestion on Waiyaki Way caused 3-minute delay', actionTaken: 'No action needed — delay within acceptable threshold', reportedBy: 'John Kamau' },
    { id: 'inc-002', type: 'Vehicle defect', severity: 'Medium', status: 'Open', tripId: null, routeName: '—', vehiclePlate: 'KDA 004D', driverName: '—', date: '12 Oct 2026', description: 'Driver reported grinding noise from front brakes', actionTaken: 'Vehicle pulled from service, repair scheduled', reportedBy: 'Transport Admin' },
  ],
  fuelRecords: [
    { id: 'fuel-001', vehicleId: 'veh-001', vehiclePlate: 'KDA 001A', date: '15 Oct 2026', litres: 60, amount: 9600, odometer: 84200, supplier: 'Total Kenya', recordedBy: 'Peter Mwangi' },
    { id: 'fuel-002', vehicleId: 'veh-003', vehiclePlate: 'KDB 003C', date: '14 Oct 2026', litres: 40, amount: 6400, odometer: 51800, supplier: 'Shell Kenya', recordedBy: 'John Kamau' },
    { id: 'fuel-003', vehicleId: 'veh-001', vehiclePlate: 'KDA 001A', date: '08 Oct 2026', litres: 55, amount: 8800, odometer: 83500, supplier: 'Total Kenya', recordedBy: 'Peter Mwangi' },
  ],
  notifications: [
    { id: 'tn-001', recipient: 'Parent of Amani Wanjiku', title: 'Pickup confirmed', detail: 'Amani was picked up at Karen Shopping Centre at 06:33', unread: true, createdDate: '16 Oct 2026' },
    { id: 'tn-002', recipient: 'Parent of Dylan Kamau', title: 'Trip completed', detail: 'Westlands Route arrived at school at 07:18', unread: true, createdDate: '16 Oct 2026' },
    { id: 'tn-003', recipient: 'Transport Admin', title: 'Vehicle defect reported', detail: 'BUS-03 front brake grinding noise — pulled from service', unread: false, createdDate: '12 Oct 2026' },
  ],
  audit: [
    { id: 'ta-001', actor: 'Transport Admin', action: 'Started trip', target: 'Karen Route · BUS-01 · 16 Oct 2026', timestamp: '16 Oct 2026, 06:32' },
    { id: 'ta-002', actor: 'John Kamau', action: 'Completed trip', target: 'Westlands Route · 16 Oct 2026', timestamp: '16 Oct 2026, 07:18' },
    { id: 'ta-003', actor: 'Transport Admin', action: 'Recorded maintenance', target: 'BUS-03 brake repair', timestamp: '14 Oct 2026, 10:15' },
    { id: 'ta-004', actor: 'Transport Admin', action: 'Reported incident', target: 'Vehicle defect · BUS-03', timestamp: '12 Oct 2026, 14:30' },
  ],
};

let state: TransportDemoState = structuredClone(seed);
const listeners = new Set<() => void>();
function notify(): void { listeners.forEach((l) => l()); }

export function useTransportDemo(): TransportDemoState {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => state, () => state);
}

function logAudit(actor: string, action: string, target: string): void {
  state = { ...state, audit: [{ id: `ta-${Date.now()}`, actor, action, target, timestamp: '16 Oct 2026, now' }, ...state.audit] };
}

export const transportDemo = {
  addVehicle(plate: string, make: string, model: string, type: VehicleType, capacity: number, year: number): { ok: boolean; error?: string } {
    if (!plate.trim()) return { ok: false, error: 'Registration plate is required.' };
    const existing = state.vehicles.find((v) => v.plate.toUpperCase() === plate.trim().toUpperCase());
    if (existing) return { ok: false, error: `Vehicle with plate ${plate.trim().toUpperCase()} already exists.` };
    const vehicle: Vehicle = { id: `veh-${Date.now()}`, vehicleId: `VEH-${String(state.vehicles.length + 1).padStart(2, '0')}`, plate: plate.trim().toUpperCase(), make, model, type, capacity, year, status: 'Available', assignedRouteId: null, inspectionDue: '—', insuranceExpiry: '—', odometer: 0 };
    state = { ...state, vehicles: [vehicle, ...state.vehicles] };
    logAudit('Transport Admin', 'Registered vehicle', `${vehicle.plate} · ${make} ${model}`);
    notify();
    return { ok: true };
  },

  setVehicleStatus(vehicleId: string, status: VehicleStatus): void {
    const vehicle = state.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;
    state = { ...state, vehicles: state.vehicles.map((v) => v.id === vehicleId ? { ...v, status } : v) };
    logAudit('Transport Admin', `Set vehicle ${status.toLowerCase()}`, vehicle.plate);
    notify();
  },

  addDriver(name: string, phone: string, licenceClass: string, licenceExpiry: string): { ok: boolean; error?: string } {
    if (!name.trim()) return { ok: false, error: 'Driver name is required.' };
    const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
    const driver: Driver = { id: `drv-${Date.now()}`, name: name.trim(), initials, phone, status: 'Active', licenceClass, licenceExpiry, verification: 'Pending', assignedVehicleId: null, assignedRouteId: null };
    state = { ...state, drivers: [driver, ...state.drivers] };
    logAudit('Transport Admin', 'Registered driver', name.trim());
    notify();
    return { ok: true };
  },

  setDriverStatus(driverId: string, status: DriverStatus): void {
    const driver = state.drivers.find((d) => d.id === driverId);
    if (!driver) return;
    state = { ...state, drivers: state.drivers.map((d) => d.id === driverId ? { ...d, status } : d) };
    logAudit('Transport Admin', `Set driver ${status.toLowerCase()}`, driver.name);
    notify();
  },

  verifyDriver(driverId: string): void {
    const driver = state.drivers.find((d) => d.id === driverId);
    if (!driver) return;
    state = { ...state, drivers: state.drivers.map((d) => d.id === driverId ? { ...d, verification: 'Verified' } : d) };
    logAudit('Transport Admin', 'Verified driver', driver.name);
    notify();
  },

  assignDriverRoute(driverId: string, routeId: string): { ok: boolean; error?: string } {
    const driver = state.drivers.find((d) => d.id === driverId);
    if (!driver) return { ok: false, error: 'Driver not found.' };
    if (driver.status !== 'Active') return { ok: false, error: 'Driver must be Active to assign.' };
    if (driver.verification !== 'Verified') return { ok: false, error: 'Driver must be Verified to assign.' };
    const route = state.routes.find((r) => r.id === routeId);
    if (!route) return { ok: false, error: 'Route not found.' };
    state = { ...state, drivers: state.drivers.map((d) => d.id === driverId ? { ...d, assignedRouteId: routeId } : d), routes: state.routes.map((r) => r.id === routeId ? { ...r, driverId } : r) };
    logAudit('Transport Admin', 'Assigned driver to route', `${driver.name} → ${route.name}`);
    notify();
    return { ok: true };
  },

  assignVehicleRoute(vehicleId: string, routeId: string): { ok: boolean; error?: string } {
    const vehicle = state.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return { ok: false, error: 'Vehicle not found.' };
    if (vehicle.status !== 'Available') return { ok: false, error: 'Vehicle must be Available to assign.' };
    const route = state.routes.find((r) => r.id === routeId);
    if (!route) return { ok: false, error: 'Route not found.' };
    state = { ...state, vehicles: state.vehicles.map((v) => v.id === vehicleId ? { ...v, status: 'Assigned', assignedRouteId: routeId } : v), routes: state.routes.map((r) => r.id === routeId ? { ...r, vehicleId } : r) };
    logAudit('Transport Admin', 'Assigned vehicle to route', `${vehicle.plate} → ${route.name}`);
    notify();
    return { ok: true };
  },

  addRoute(name: string, reference: string, direction: TripDirection, capacity: number): { ok: boolean; error?: string } {
    if (!name.trim()) return { ok: false, error: 'Route name is required.' };
    const route: Route = { id: `rt-${Date.now()}`, name: name.trim(), reference: reference.trim() || `RT-${Date.now().toString().slice(-3)}`, direction, status: 'Active', operatingDays: 'Mon-Fri', vehicleId: null, driverId: null, capacity, stops: [] };
    state = { ...state, routes: [route, ...state.routes] };
    logAudit('Transport Admin', 'Created route', name.trim());
    notify();
    return { ok: true };
  },

  addStop(routeId: string, name: string, plannedPickup: string, plannedDropoff: string): { ok: boolean; error?: string } {
    const route = state.routes.find((r) => r.id === routeId);
    if (!route) return { ok: false, error: 'Route not found.' };
    if (!name.trim()) return { ok: false, error: 'Stop name is required.' };
    const order = route.stops.length + 1;
    const stop: RouteStop = { id: `sp-${Date.now()}`, routeId, name: name.trim(), order, plannedPickup, plannedDropoff, active: true };
    state = { ...state, routes: state.routes.map((r) => r.id === routeId ? { ...r, stops: [...r.stops, stop] } : r) };
    logAudit('Transport Admin', 'Added stop', `${name.trim()} to ${route.name}`);
    notify();
    return { ok: true };
  },

  toggleRouteStatus(routeId: string): void {
    const route = state.routes.find((r) => r.id === routeId);
    if (!route) return;
    const newStatus: RouteStatus = route.status === 'Active' ? 'Inactive' : 'Active';
    state = { ...state, routes: state.routes.map((r) => r.id === routeId ? { ...r, status: newStatus } : r) };
    logAudit('Transport Admin', `Set route ${newStatus.toLowerCase()}`, route.name);
    notify();
  },

  allocateStudent(studentId: string, routeId: string, stopId: string): { ok: boolean; error?: string } {
    const student = state.allocations.find((a) => a.studentId === studentId && a.status === 'Active');
    if (student) return { ok: false, error: 'Student already has an active allocation. Withdraw first.' };
    const route = state.routes.find((r) => r.id === routeId);
    if (!route) return { ok: false, error: 'Route not found.' };
    if (route.status !== 'Active') return { ok: false, error: 'Route is not active.' };
    const stop = route.stops.find((s) => s.id === stopId);
    if (!stop) return { ok: false, error: 'Stop not found on this route.' };
    const currentCount = state.allocations.filter((a) => a.routeId === routeId && a.status === 'Active').length;
    if (currentCount >= route.capacity) return { ok: false, error: `Route is at full capacity (${route.capacity}). No more allocations allowed.` };
    const pending = state.allocations.find((a) => a.studentId === studentId && a.status === 'Pending');
    if (pending) {
      state = { ...state, allocations: state.allocations.map((a) => a.id === pending.id ? { ...a, routeId, routeName: route.name, stopId, stopName: stop.name, status: 'Active' as AllocationStatus, startDate: '16 Oct 2026' } : a) };
    } else {
      const existingRecord = state.allocations.find((a) => a.studentId === studentId);
      const allocation: Allocation = { id: `all-${Date.now()}`, studentId, studentName: existingRecord?.studentName ?? `Student ${studentId}`, className: existingRecord?.className ?? '—', routeId, routeName: route.name, stopId, stopName: stop.name, status: 'Active', startDate: '16 Oct 2026', endDate: null };
      state = { ...state, allocations: [allocation, ...state.allocations] };
    }
    state = { ...state, notifications: [{ id: `tn-${Date.now()}`, recipient: `Parent of ${state.allocations.find((a) => a.studentId === studentId)?.studentName ?? 'student'}`, title: 'Transport allocation confirmed', detail: `Assigned to ${route.name} at ${stop.name}`, unread: true, createdDate: '16 Oct 2026' }, ...state.notifications] };
    logAudit('Transport Admin', 'Allocated student to route', `${state.allocations.find((a) => a.studentId === studentId)?.studentName ?? studentId} → ${route.name}`);
    notify();
    return { ok: true };
  },

  withdrawAllocation(allocationId: string): void {
    const alloc = state.allocations.find((a) => a.id === allocationId);
    if (!alloc) return;
    state = { ...state, allocations: state.allocations.map((a) => a.id === allocationId ? { ...a, status: 'Withdrawn' as AllocationStatus, endDate: '16 Oct 2026' } : a) };
    logAudit('Transport Admin', 'Withdrew transport allocation', `${alloc.studentName} from ${alloc.routeName}`);
    notify();
  },

  suspendAllocation(allocationId: string): void {
    const alloc = state.allocations.find((a) => a.id === allocationId);
    if (!alloc) return;
    state = { ...state, allocations: state.allocations.map((a) => a.id === allocationId ? { ...a, status: 'Suspended' as AllocationStatus } : a) };
    logAudit('Transport Admin', 'Suspended transport allocation', `${alloc.studentName}`);
    notify();
  },

  reactivateAllocation(allocationId: string): void {
    const alloc = state.allocations.find((a) => a.id === allocationId);
    if (!alloc) return;
    state = { ...state, allocations: state.allocations.map((a) => a.id === allocationId ? { ...a, status: 'Active' as AllocationStatus, endDate: null } : a) };
    logAudit('Transport Admin', 'Reactivated transport allocation', `${alloc.studentName}`);
    notify();
  },

  startTrip(tripId: string): { ok: boolean; error?: string } {
    const trip = state.trips.find((t) => t.id === tripId);
    if (!trip) return { ok: false, error: 'Trip not found.' };
    if (trip.status !== 'Ready' && trip.status !== 'Scheduled') return { ok: false, error: `Trip is ${trip.status.toLowerCase()}, cannot start.` };
    const vehicle = state.vehicles.find((v) => v.id === trip.vehicleId);
    if (vehicle && vehicle.status !== 'Assigned' && vehicle.status !== 'Available') return { ok: false, error: `Vehicle ${vehicle.plate} is ${vehicle.status.toLowerCase()} and cannot be dispatched.` };
    state = { ...state, trips: state.trips.map((t) => t.id === tripId ? { ...t, status: 'In progress', actualStart: '06:35' } : t) };
    logAudit('Transport Admin', 'Started trip', `${trip.routeName} · ${trip.date}`);
    notify();
    return { ok: true };
  },

  readyTrip(tripId: string): { ok: boolean; error?: string } {
    const trip = state.trips.find((t) => t.id === tripId);
    if (!trip) return { ok: false, error: 'Trip not found.' };
    if (trip.status !== 'Scheduled') return { ok: false, error: `Trip is ${trip.status.toLowerCase()}, cannot mark ready.` };
    state = { ...state, trips: state.trips.map((t) => t.id === tripId ? { ...t, status: 'Ready' } : t) };
    logAudit('Transport Admin', 'Marked trip ready', `${trip.routeName} · ${trip.date}`);
    notify();
    return { ok: true };
  },

  completeTrip(tripId: string): { ok: boolean; error?: string } {
    const trip = state.trips.find((t) => t.id === tripId);
    if (!trip) return { ok: false, error: 'Trip not found.' };
    if (trip.status !== 'In progress') return { ok: false, error: `Trip is ${trip.status.toLowerCase()}, cannot complete.` };
    state = { ...state, trips: state.trips.map((t) => t.id === tripId ? { ...t, status: 'Completed', actualEnd: '07:20' } : t) };
    logAudit('Transport Admin', 'Completed trip', `${trip.routeName} · ${trip.date}`);
    notify();
    return { ok: true };
  },

  cancelTrip(tripId: string): void {
    const trip = state.trips.find((t) => t.id === tripId);
    if (!trip) return;
    state = { ...state, trips: state.trips.map((t) => t.id === tripId ? { ...t, status: 'Cancelled' } : t), notifications: [{ id: `tn-${Date.now()}`, recipient: 'Affected parents', title: 'Trip cancelled', detail: `${trip.routeName} on ${trip.date} has been cancelled`, unread: true, createdDate: '16 Oct 2026' }, ...state.notifications] };
    logAudit('Transport Admin', 'Cancelled trip', `${trip.routeName} · ${trip.date}`);
    notify();
  },

  markAttendance(tripId: string, studentId: string, status: AttendanceStatus): void {
    const trip = state.trips.find((t) => t.id === tripId);
    if (!trip) return;
    if (trip.status !== 'In progress') return;
    state = { ...state, trips: state.trips.map((t) => t.id === tripId ? { ...t, attendance: t.attendance.map((a) => a.studentId === studentId ? { ...a, status, timestamp: 'now', note: '' } : a) } : t) };
    const student = trip.attendance.find((a) => a.studentId === studentId);
    if (status === 'Picked up' || status === 'Dropped off') {
      state = { ...state, notifications: [{ id: `tn-${Date.now()}`, recipient: `Parent of ${student?.studentName ?? 'student'}`, title: status === 'Picked up' ? 'Pickup confirmed' : 'Drop-off confirmed', detail: `${student?.studentName} was ${status.toLowerCase()} at ${student?.stopName}`, unread: true, createdDate: '16 Oct 2026' }, ...state.notifications] };
    }
    logAudit(trip.driverName, `Marked ${status.toLowerCase()}`, `${student?.studentName} on ${trip.routeName}`);
    notify();
  },

  addMaintenance(vehicleId: string, type: MaintenanceType, description: string, cost: number): void {
    const vehicle = state.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;
    const record: MaintenanceRecord = { id: `mnt-${Date.now()}`, vehicleId, vehiclePlate: vehicle.plate, type, date: '16 Oct 2026', odometer: vehicle.odometer, description, cost, status: 'In progress', recordedBy: 'Transport Admin' };
    state = { ...state, maintenance: [record, ...state.maintenance] };
    logAudit('Transport Admin', 'Recorded maintenance', `${vehicle.plate} · ${type}`);
    notify();
  },

  resolveMaintenance(maintenanceId: string): void {
    const record = state.maintenance.find((m) => m.id === maintenanceId);
    if (!record) return;
    state = { ...state, maintenance: state.maintenance.map((m) => m.id === maintenanceId ? { ...m, status: 'Completed' } : m) };
    logAudit('Transport Admin', 'Completed maintenance', `${record.vehiclePlate} · ${record.type}`);
    notify();
  },

  addIncident(type: IncidentType, severity: IncidentSeverity, vehicleId: string, description: string): void {
    const vehicle = state.vehicles.find((v) => v.id === vehicleId);
    const incident: Incident = { id: `inc-${Date.now()}`, type, severity, status: 'Open', tripId: null, routeName: '—', vehiclePlate: vehicle?.plate ?? '—', driverName: '—', date: '16 Oct 2026', description, actionTaken: 'Under review', reportedBy: 'Transport Admin' };
    state = { ...state, incidents: [incident, ...state.incidents] };
    logAudit('Transport Admin', 'Reported incident', `${type} · ${vehicle?.plate ?? '—'}`);
    notify();
  },

  resolveIncident(incidentId: string): void {
    const incident = state.incidents.find((i) => i.id === incidentId);
    if (!incident) return;
    state = { ...state, incidents: state.incidents.map((i) => i.id === incidentId ? { ...i, status: 'Resolved', actionTaken: 'Resolved by transport admin' } : i) };
    logAudit('Transport Admin', 'Resolved incident', `${incident.type} · ${incident.vehiclePlate}`);
    notify();
  },

  addFuel(vehicleId: string, litres: number, amount: number, odometer: number, supplier: string): void {
    const vehicle = state.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;
    const record: FuelRecord = { id: `fuel-${Date.now()}`, vehicleId, vehiclePlate: vehicle.plate, date: '16 Oct 2026', litres, amount, odometer, supplier, recordedBy: 'Transport Admin' };
    state = { ...state, fuelRecords: [record, ...state.fuelRecords], vehicles: state.vehicles.map((v) => v.id === vehicleId ? { ...v, odometer } : v) };
    logAudit('Transport Admin', 'Recorded fuel', `${vehicle.plate} · ${litres}L · KES ${amount}`);
    notify();
  },

  markNotificationRead(id: string): void {
    state = { ...state, notifications: state.notifications.map((n) => n.id === id ? { ...n, unread: false } : n) };
    notify();
  },

  reset(): void { state = structuredClone(seed); notify(); },
};

export const TRANSPORT_POLICIES = {
  MAX_CAPACITY_DEFAULT: 30,
  DRIVER_MUST_BE_VERIFIED: true,
  VEHICLE_MUST_BE_AVAILABLE: true,
  PREVENT_OVERLAPPING: true,
};
