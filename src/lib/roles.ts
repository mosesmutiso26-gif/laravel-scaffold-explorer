import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, Users, GraduationCap, CalendarCheck, ClipboardList, BookOpen, Wallet, Receipt,
  Briefcase, CalendarClock, Package, ShoppingCart, BedDouble, Bus, HeartPulse, ShieldAlert, Trophy,
  Music, Newspaper, FlaskConical, Monitor, Inbox, Bell, BarChart3, School,
} from "lucide-react";

export type Section = {
  key: string;
  title: string;
  endpoint: string; // Laravel /api/v1 path
  icon: LucideIcon;
  columns: { key: string; label: string }[];
};

export const SECTIONS: Record<string, Section> = {
  students: { key: "students", title: "Students", endpoint: "/students", icon: GraduationCap, columns: [
    { key: "name", label: "Name" }, { key: "admission_no", label: "Admission No." }, { key: "class", label: "Class" }, { key: "status", label: "Status" }] },
  staff: { key: "staff", title: "Staff", endpoint: "/staff", icon: Users, columns: [
    { key: "name", label: "Name" }, { key: "department", label: "Department" }, { key: "position", label: "Position" }, { key: "status", label: "Status" }] },
  attendance: { key: "attendance", title: "Attendance", endpoint: "/attendance-sessions", icon: CalendarCheck, columns: [
    { key: "date", label: "Date" }, { key: "class", label: "Class" }, { key: "present", label: "Present" }, { key: "absent", label: "Absent" }, { key: "status", label: "Status" }] },
  assessments: { key: "assessments", title: "Assessments", endpoint: "/assessments", icon: ClipboardList, columns: [
    { key: "title", label: "Title" }, { key: "subject", label: "Subject" }, { key: "class", label: "Class" }, { key: "due", label: "Due" }, { key: "status", label: "Status" }] },
  invoices: { key: "invoices", title: "Invoices", endpoint: "/invoices", icon: Receipt, columns: [
    { key: "number", label: "Invoice" }, { key: "student", label: "Student" }, { key: "amount", label: "Amount (KES)" }, { key: "balance", label: "Balance (KES)" }, { key: "status", label: "Status" }] },
  payments: { key: "payments", title: "Payments", endpoint: "/payments", icon: Wallet, columns: [
    { key: "reference", label: "Reference" }, { key: "student", label: "Student" }, { key: "amount", label: "Amount (KES)" }, { key: "method", label: "Method" }, { key: "status", label: "Status" }] },
  library: { key: "library", title: "Library books", endpoint: "/library-books", icon: BookOpen, columns: [
    { key: "title", label: "Title" }, { key: "author", label: "Author" }, { key: "copies", label: "Copies" }, { key: "on_loan", label: "On loan" }] },
  inventory: { key: "inventory", title: "Inventory", endpoint: "/inventory-items", icon: Package, columns: [
    { key: "name", label: "Item" }, { key: "category", label: "Category" }, { key: "quantity", label: "Qty" }, { key: "reorder_level", label: "Reorder at" }] },
  "purchase-orders": { key: "purchase-orders", title: "Purchase orders", endpoint: "/purchase-orders", icon: ShoppingCart, columns: [
    { key: "number", label: "PO" }, { key: "supplier", label: "Supplier" }, { key: "total", label: "Total (KES)" }, { key: "status", label: "Status" }] },
  boarding: { key: "boarding", title: "Boarding houses", endpoint: "/boarding-houses", icon: BedDouble, columns: [
    { key: "name", label: "House" }, { key: "capacity", label: "Capacity" }, { key: "occupied", label: "Occupied" }, { key: "matron", label: "Matron" }] },
  transport: { key: "transport", title: "Transport routes", endpoint: "/transport-routes", icon: Bus, columns: [
    { key: "name", label: "Route" }, { key: "vehicle", label: "Vehicle" }, { key: "students", label: "Students" }, { key: "status", label: "Status" }] },
  clinic: { key: "clinic", title: "Clinic visits", endpoint: "/clinic-visits", icon: HeartPulse, columns: [
    { key: "date", label: "Date" }, { key: "student", label: "Student" }, { key: "reason", label: "Reason" }, { key: "outcome", label: "Outcome" }] },
  safeguarding: { key: "safeguarding", title: "Safeguarding incidents", endpoint: "/safeguarding-incidents", icon: ShieldAlert, columns: [
    { key: "reference", label: "Reference" }, { key: "category", label: "Category" }, { key: "severity", label: "Severity" }, { key: "status", label: "Status" }] },
  teams: { key: "teams", title: "Sports teams", endpoint: "/teams", icon: Trophy, columns: [
    { key: "name", label: "Team" }, { key: "sport", label: "Sport" }, { key: "coach", label: "Coach" }, { key: "members", label: "Members" }] },
  clubs: { key: "clubs", title: "Clubs", endpoint: "/clubs", icon: Music, columns: [
    { key: "name", label: "Club" }, { key: "patron", label: "Patron" }, { key: "members", label: "Members" }, { key: "status", label: "Status" }] },
  cms: { key: "cms", title: "Website pages", endpoint: "/cms-pages", icon: Newspaper, columns: [
    { key: "title", label: "Page" }, { key: "author", label: "Author" }, { key: "updated", label: "Updated" }, { key: "status", label: "Workflow" }] },
  enquiries: { key: "enquiries", title: "Enquiries", endpoint: "/enquiries", icon: Inbox, columns: [
    { key: "name", label: "Parent" }, { key: "grade", label: "Grade sought" }, { key: "received", label: "Received" }, { key: "status", label: "Status" }] },
  "science-equipment": { key: "science-equipment", title: "Science equipment", endpoint: "/science-equipment", icon: FlaskConical, columns: [
    { key: "name", label: "Equipment" }, { key: "lab", label: "Lab" }, { key: "quantity", label: "Qty" }, { key: "condition", label: "Condition" }] },
  workstations: { key: "workstations", title: "Workstations", endpoint: "/workstations", icon: Monitor, columns: [
    { key: "tag", label: "Asset tag" }, { key: "lab", label: "Lab" }, { key: "os", label: "OS" }, { key: "status", label: "Status" }] },
  notifications: { key: "notifications", title: "Notifications", endpoint: "/notifications", icon: Bell, columns: [
    { key: "title", label: "Notification" }, { key: "module", label: "Module" }, { key: "date", label: "Date" }, { key: "read", label: "Read" }] },
};

export type RoleConfig = {
  key: string;
  label: string;
  dashboardPath: "/portal/teacher" | "/portal/hr" | "/portal/$role";
  sections: string[];
};

const r = (key: string, label: string, sections: string[], dashboardPath: RoleConfig["dashboardPath"] = "/portal/$role"): RoleConfig =>
  ({ key, label, sections: [...sections, "notifications"], dashboardPath });

export const ROLES: RoleConfig[] = [
  r("admin", "Super Admin", ["students", "staff", "invoices", "cms", "inventory"]),
  r("directors", "Directors & Board", ["invoices", "purchase-orders", "staff", "safeguarding"]),
  r("headteacher", "Headteacher", ["students", "staff", "attendance", "assessments", "safeguarding"]),
  r("deputy", "Deputy Headteacher", ["students", "attendance", "assessments"]),
  r("teacher", "Teacher", ["students", "attendance", "assessments", "library"], "/portal/teacher"),
  r("student", "Student", ["assessments", "library", "clubs"]),
  r("parent", "Parent / Guardian", ["invoices", "payments", "assessments"]),
  r("finance", "Finance & Bursary", ["invoices", "payments", "purchase-orders"]),
  r("hr", "HR & Payroll", ["staff"], "/portal/hr"),
  r("admissions", "Admissions", ["enquiries", "students"]),
  r("librarian", "Librarian", ["library", "students"]),
  r("sciencelab", "Science Laboratory", ["science-equipment", "inventory"]),
  r("computerlab", "Computer Laboratory", ["workstations", "inventory"]),
  r("health", "Health Centre", ["clinic", "students"]),
  r("boarding", "Boarding & Matron", ["boarding", "students"]),
  r("transport", "Transport", ["transport", "students"]),
  r("procurement", "Procurement & Stores", ["purchase-orders", "inventory"]),
  r("sports", "Sports & Co-curricular", ["teams", "clubs"]),
  r("cocurricular", "Co-Curricular", ["clubs"]),
  r("timetable", "Timetable Centre", ["attendance", "assessments"]),
  r("prefect", "Prefect", ["clubs", "attendance"]),
];

export const roleByKey = (k: string) => ROLES.find((x) => x.key === k);
export const DashboardIcon = LayoutDashboard;
export const ReportsIcon = BarChart3;
export const SchoolIcon = School;
export const HrIcon = Briefcase;
export const LeaveIcon = CalendarClock;
