/**
 * DEMO DATA ADAPTER — synthetic, clearly labelled demonstration records.
 * Used only when the app is in "demo" mode. Mirrors the Laravel /api/v1
 * contract so screens behave the same in live mode. Never used as a silent
 * fallback for live mode.
 */
import { ApiError } from "./errors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = any;

const FIRST = ["Amina", "Brian", "Cynthia", "David", "Esther", "Felix", "Grace", "Hassan", "Irene", "James", "Kevin", "Linda", "Moses", "Naomi", "Otieno", "Purity", "Quincy", "Ruth", "Samuel", "Tabitha", "Umar", "Vivian", "Wanjiru", "Yusuf", "Zawadi"];
const LAST = ["Odhiambo", "Kamau", "Wanjiku", "Mutua", "Achieng", "Kiprop", "Njoroge", "Otieno", "Chebet", "Mwangi", "Barasa", "Onyango"];
const CLASSES = ["Form 1 East", "Form 1 West", "Form 2 East", "Form 2 West", "Form 3 East", "Form 3 West", "Form 4 East", "Form 4 West"];
const SUBJECTS = ["Mathematics", "English", "Kiswahili", "Biology", "Chemistry", "Physics", "History", "Geography", "Computer Studies"];

function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

type DemoState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections: any;
  leave: Row[];
  payroll: { id: number; period: string; status: "draft" | "prepared" | "approved" | "paid"; employees: Payslip[] };
  announcements: Row[];
};
export type PayLine = { id: number; label: string; qty: number; amount: number };
export type Payslip = { id: number; name: string; position: string; payments: PayLine[]; deductions: { id: number; label: string; amount: number }[] };

let state: DemoState | null = null;

function build(): DemoState {
  const rnd = seeded(42);
  const pick = <T,>(a: T[]): T => a[Math.floor(rnd() * a.length)] as T;
  const name = () => `${pick(FIRST)} ${pick(LAST)}`;
  const n = (min: number, max: number) => Math.floor(min + rnd() * (max - min));
  const list = (count: number, f: (i: number) => Row) => Array.from({ length: count }, (_, i) => ({ id: i + 1, ...f(i) }));
  const date = (i: number) => `2026-10-${String(1 + (i % 16)).padStart(2, "0")}`;

  const staffNames = Array.from({ length: 30 }, name);
  const sections: DemoState["sections"] = {
    students: list(64, (i) => ({ name: name(), admission_no: `RA/${2023 + (i % 4)}/${String(100 + i)}`, class: pick(CLASSES), status: i % 17 === 0 ? "Suspended" : "Active" })),
    staff: list(30, (i) => ({ name: staffNames[i] as string, department: pick(["Sciences", "Languages", "Humanities", "Administration", "Finance", "Boarding"]), position: i < 22 ? "Teacher" : pick(["Bursar", "Clerk", "Matron", "Driver"]), status: i % 11 === 0 ? "On leave" : "Active" })),
    attendance: list(24, (i) => { const p = n(36, 45); return { date: date(i), class: pick(CLASSES), present: p, absent: 45 - p, status: i < 3 ? "Open" : "Completed" }; }),
    assessments: list(18, (i) => ({ title: `${pick(["CAT", "Quiz", "Assignment", "Mid-term exam"])} ${1 + (i % 3)}`, subject: pick(SUBJECTS), class: pick(CLASSES), due: date(i), status: pick(["Draft", "Published", "Marking"]) })),
    invoices: list(40, (i) => { const a = pick([45000, 52000, 61000]); const b = i % 3 === 0 ? 0 : n(0, a); return { number: `INV-${3000 + i}`, student: name(), amount: a, balance: b, status: b === 0 ? "Paid" : b < a ? "Partially paid" : "Issued" }; }),
    payments: list(36, (i) => ({ reference: `MPESA${String(81000 + i * 37)}`, student: name(), amount: pick([5000, 10000, 15000, 25000]), method: pick(["M-Pesa", "Bank", "Cheque"]), status: i % 6 === 0 ? "Pending verification" : "Verified" })),
    library: list(30, () => { const c = n(2, 12); return { title: pick(["Blossoms of the Savannah", "A Doll's House", "Kifo Kisimani", "KLB Biology 3", "Longhorn Maths 4", "The Pearl", "Inheritance"]), author: pick(["H. R. Ole Kulet", "Henrik Ibsen", "K. W. Wamitila", "KLB", "Longhorn", "John Steinbeck"]), copies: c, on_loan: n(0, c) }; }),
    inventory: list(22, () => ({ name: pick(["Exercise books", "Chalk boxes", "Printer toner", "Maize flour (90kg)", "Cleaning detergent", "Lab coats", "Footballs"]), category: pick(["Stationery", "Kitchen", "Cleaning", "Sports", "Lab"]), quantity: n(2, 300), reorder_level: 20 })),
    "purchase-orders": list(14, (i) => ({ number: `PO-${700 + i}`, supplier: pick(["Text Book Centre", "Kenafric Supplies", "Unga Ltd", "Crown Paints"]), total: n(20, 400) * 1000, status: pick(["Draft", "Pending approval", "Approved", "Delivered"]) })),
    boarding: list(6, (i) => { const c = 80; return { name: ["Kilimanjaro", "Elgon", "Kenya", "Aberdare", "Longonot", "Suswa"][i] as string, capacity: c, occupied: n(55, 80), matron: name() }; }),
    transport: list(7, (i) => ({ name: ["Thika Road", "Ngong Road", "Mombasa Road", "Kiambu", "Rongai", "Ruaka", "Kitengela"][i] as string, vehicle: `KDA ${100 + i * 13}X`, students: n(18, 45), status: i === 4 ? "Under maintenance" : "Active" })),
    clinic: list(20, (i) => ({ date: date(i), student: name(), reason: pick(["Headache", "Fever", "Sports injury", "Stomach ache", "Allergy"]), outcome: pick(["Returned to class", "Sent home", "Observed", "Referred"]) })),
    safeguarding: list(6, (i) => ({ reference: `SG-${2026}-${String(i + 1).padStart(3, "0")}`, category: pick(["Bullying", "Welfare concern", "Online safety"]), severity: pick(["Low", "Medium", "High"]), status: pick(["Open", "Under review", "Closed"]) })),
    teams: list(10, () => ({ name: `${pick(["Senior", "Junior"])} ${pick(["Football", "Rugby", "Volleyball", "Basketball", "Hockey"])}`, sport: pick(["Football", "Rugby", "Volleyball", "Basketball", "Hockey"]), coach: pick(staffNames), members: n(12, 25) })),
    clubs: list(12, (i) => ({ name: ["Science Club", "Debate", "Drama", "Music", "Chess", "Wildlife", "Red Cross", "Journalism", "Robotics", "Christian Union", "YCS", "Environment"][i] as string, patron: pick(staffNames), members: n(15, 60), status: "Active" })),
    cms: list(8, (i) => ({ title: ["Home", "About Us", "Academics", "Admissions", "Facilities", "Boarding", "News", "Contact"][i] as string, author: pick(staffNames), updated: date(i), status: pick(["Published", "Draft", "In review", "Approved"]) })),
    enquiries: list(15, (i) => ({ name: name(), grade: pick(["Form 1", "Form 2", "Form 3"]), received: date(i), status: pick(["New", "Contacted", "Visit booked", "Applied"]) })),
    "science-equipment": list(16, () => ({ name: pick(["Microscope", "Bunsen burner", "Beaker set", "Test tube rack", "Digital balance"]), lab: pick(["Biology Lab", "Chemistry Lab", "Physics Lab"]), quantity: n(4, 40), condition: pick(["Good", "Good", "Needs repair"]) })),
    workstations: list(40, (i) => ({ tag: `ICT-${String(i + 1).padStart(3, "0")}`, lab: i < 20 ? "Lab A" : "Lab B", os: pick(["Windows 11", "Ubuntu 24.04"]), status: i % 9 === 0 ? "Faulty" : "Working" })),
    notifications: list(10, (i) => ({ title: pick(["Fee payment verified", "Leave request submitted", "New enquiry received", "Assessment published", "Low stock alert"]), module: pick(["Finance", "HR", "Admissions", "Academics", "Stores"]), date: date(i), read: i > 3 })),
  };

  const leave: Row[] = [
    { id: 1, staff: staffNames[0] as string, type: "Unpaid leave", start: "Tue 03 Sep", end: "Thu 05 Sep", days: 3, status: "Approved", detail: "" },
    { id: 2, staff: staffNames[0] as string, type: "Statutory sick pay", start: "Wed 16 Sep", end: "Fri 20 Sep", days: 5, status: "Approved", detail: "" },
    { id: 3, staff: staffNames[0] as string, type: "Overtime", start: "Thu 12 Sep 17:00", end: "20:00", days: 0, status: "Approved", detail: "3h 0m @ time and a half · Approved Mon 16 Sep by HR" },
    { id: 4, staff: staffNames[3] as string, type: "Annual leave", start: "Mon 20 Oct", end: "Fri 24 Oct", days: 5, status: "Pending", detail: "" },
    { id: 5, staff: staffNames[7] as string, type: "Compassionate leave", start: "Wed 22 Oct", end: "Thu 23 Oct", days: 2, status: "Pending", detail: "" },
  ];

  const employees: Payslip[] = staffNames.slice(0, 12).map((nm, i) => ({
    id: i + 1, name: nm, position: i < 9 ? "Teacher" : "Support staff",
    payments: [{ id: 1, label: "Basic salary", qty: 1, amount: 55000 + i * 2500 }, ...(i === 0 ? [
      { id: 2, label: "Unpaid leave 03/09 to 05/09", qty: 3, amount: -2500 },
      { id: 3, label: "Overtime 12/09", qty: 3, amount: 600 },
    ] : [{ id: 2, label: "House allowance", qty: 1, amount: 8000 }])],
    deductions: [],
  }));

  const announcements: Row[] = [
    { id: 1, title: "Science Exhibition 2026", date: "2026-10-10", excerpt: "Students showcased innovative projects at the county science fair.", image: "science" },
    { id: 2, title: "Inter-School Sports Meet", date: "2026-10-05", excerpt: "Our teams brought home five trophies from the zonal games.", image: "sports" },
    { id: 3, title: "Excellence Awards Ceremony", date: "2026-09-28", excerpt: "Honouring the achievements of outstanding students and staff.", image: "campus" },
  ];

  return { sections, leave, payroll: { id: 1, period: "October 2026", status: "draft", employees }, announcements };
}

const db = () => (state ??= build());
const sectionByEndpoint: Record<string, string> = {
  "/students": "students", "/staff": "staff", "/attendance-sessions": "attendance", "/assessments": "assessments",
  "/invoices": "invoices", "/payments": "payments", "/library-books": "library", "/inventory-items": "inventory",
  "/purchase-orders": "purchase-orders", "/boarding-houses": "boarding", "/transport-routes": "transport",
  "/clinic-visits": "clinic", "/safeguarding-incidents": "safeguarding", "/teams": "teams", "/clubs": "clubs",
  "/cms-pages": "cms", "/enquiries": "enquiries", "/science-equipment": "science-equipment", "/workstations": "workstations",
  "/notifications": "notifications",
};

export type Paginated<T> = { data: T[]; meta: { current_page: number; last_page: number; per_page: number; total: number } };

function paginate(rows: Row[], q: URLSearchParams): Paginated<Row> {
  const search = (q.get("search") ?? "").toLowerCase();
  const sort = q.get("sort");
  const dir = q.get("direction") === "desc" ? -1 : 1;
  let out = search ? rows.filter((r: Row) => Object.values(r).some((v) => String(v).toLowerCase().includes(search))) : [...rows];
  if (sort) out.sort((a, b) => (a[sort] > b[sort] ? dir : a[sort] < b[sort] ? -dir : 0));
  const per = Number(q.get("per_page") ?? 10);
  const page = Number(q.get("page") ?? 1);
  return { data: out.slice((page - 1) * per, page * per), meta: { current_page: page, last_page: Math.max(1, Math.ceil(out.length / per)), per_page: per, total: out.length } };
}

const sum = (rows: Row[], k: string): number => rows.reduce((t, r) => t + Number(r[k] ?? 0), 0);

function dashboard(role: string) {
  const s: Row = db().sections;
  const collected = sum(s.invoices, "amount") - sum(s.invoices, "balance");
  const billed = sum(s.invoices, "amount");
  const att = Math.round((sum(s.attendance, "present") / (sum(s.attendance, "present") + sum(s.attendance, "absent"))) * 100);
  const occ = Math.round((sum(s.boarding, "occupied") / sum(s.boarding, "capacity")) * 100);
  const base = [
    { label: "Students", value: String(s.students.length), source: "students" },
    { label: "Staff", value: String(s.staff.length), source: "staff" },
    { label: "Attendance", value: `${att}%`, source: "attendance-sessions" },
    { label: "Fees collected", value: `${Math.round((collected / billed) * 100)}%`, source: "invoices" },
  ];
  const perRole: Record<string, { label: string; value: string; source: string }[]> = {
    finance: [{ label: "Billed (KES)", value: billed.toLocaleString(), source: "invoices" }, { label: "Collected (KES)", value: collected.toLocaleString(), source: "invoices" }, { label: "Pending verification", value: String(s.payments.filter((p: Row) => p.status !== "Verified").length), source: "payments" }, { label: "Open POs", value: String(s["purchase-orders"].filter((p: Row) => p.status !== "Delivered").length), source: "purchase-orders" }],
    boarding: [{ label: "Houses", value: String(s.boarding.length), source: "boarding-houses" }, { label: "Occupancy", value: `${occ}%`, source: "boarding-houses" }, { label: "Boarders", value: String(sum(s.boarding, "occupied")), source: "boarding-houses" }, { label: "Clinic visits", value: String(s.clinic.length), source: "clinic-visits" }],
    librarian: [{ label: "Titles", value: String(s.library.length), source: "library-books" }, { label: "Copies", value: String(sum(s.library, "copies")), source: "library-books" }, { label: "On loan", value: String(sum(s.library, "on_loan")), source: "library-books" }, { label: "Students", value: String(s.students.length), source: "students" }],
    transport: [{ label: "Routes", value: String(s.transport.length), source: "transport-routes" }, { label: "Students carried", value: String(sum(s.transport, "students")), source: "transport-routes" }, { label: "In maintenance", value: String(s.transport.filter((t: Row) => t.status !== "Active").length), source: "vehicles" }, { label: "Attendance", value: `${att}%`, source: "attendance-sessions" }],
    procurement: [{ label: "Purchase orders", value: String(s["purchase-orders"].length), source: "purchase-orders" }, { label: "Awaiting approval", value: String(s["purchase-orders"].filter((p: Row) => p.status === "Pending approval").length), source: "purchase-orders" }, { label: "Stock items", value: String(s.inventory.length), source: "inventory-items" }, { label: "Below reorder", value: String(s.inventory.filter((i: Row) => Number(i.quantity) < 20).length), source: "inventory-items" }],
    health: [{ label: "Clinic visits", value: String(s.clinic.length), source: "clinic-visits" }, { label: "Sent home", value: String(s.clinic.filter((c: Row) => c.outcome === "Sent home").length), source: "clinic-visits" }, { label: "Referred", value: String(s.clinic.filter((c: Row) => c.outcome === "Referred").length), source: "clinic-visits" }, { label: "Students", value: String(s.students.length), source: "students" }],
    sports: [{ label: "Teams", value: String(s.teams.length), source: "teams" }, { label: "Athletes", value: String(sum(s.teams, "members")), source: "teams" }, { label: "Clubs", value: String(s.clubs.length), source: "clubs" }, { label: "Club members", value: String(sum(s.clubs, "members")), source: "clubs" }],
    admissions: [{ label: "Enquiries", value: String(s.enquiries.length), source: "enquiries" }, { label: "New", value: String(s.enquiries.filter((e: Row) => e.status === "New").length), source: "enquiries" }, { label: "Applied", value: String(s.enquiries.filter((e: Row) => e.status === "Applied").length), source: "enquiries" }, { label: "Enrolled", value: String(s.students.length), source: "students" }],
  };
  const byClass = CLASSES.map((c: Row) => ({ name: c.replace("Form ", "F"), value: s.students.filter((x: Row) => x.class === c).length }));
  const attTrend = s.attendance.slice(0, 10).reverse().map((a: Row) => ({ name: String(a.date).slice(5), value: Math.round((Number(a.present) / 45) * 100) }));
  return {
    kpis: perRole[role] ?? base,
    charts: [
      { title: "Enrolment by class", type: "bar", source: "students", series: byClass },
      { title: "Attendance trend (%)", type: "line", source: "attendance-sessions", series: attTrend },
    ],
  };
}

function teacherOverview() {
  const s: Row = db().sections;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = ["08:00", "09:00", "10:30", "11:30", "14:00"];
  const subjects = ["Mathematics", "Physics", "Computer Studies"];
  const lessons = days.flatMap((d, di) => slots.filter((_, si) => (di + si) % 2 === 0 || si === 0).map((t, si) => ({
    day: d, start: t, end: `${String(Number(t.slice(0, 2)) + 1).padStart(2, "0")}:${t.slice(3)}`,
    subject: subjects[(di + si) % 3], class: CLASSES[(di * 2 + si) % CLASSES.length], room: `Room ${10 + si}`,
  })));
  return {
    stats: { classes: 6, students: s.students.length, subjects: subjects.length },
    today: lessons.filter((l: Row) => l.day === "Thu").slice(0, 3),
    lessons,
    timeline: [
      { title: "Form 3 Mathematics CAT", detail: "Mathematics · Form 3 East", date: "2026-10-19 08:00", kind: "Quiz", color: "chart-4" },
      { title: "Departmental meeting", detail: "Sciences department", date: "2026-10-20 15:00", kind: "Event", color: "chart-5" },
      { title: "Parents meeting", detail: "Form 4 academic clinic", date: "2026-10-22 10:00", kind: "Meeting", color: "chart-3" },
      { title: "Form 4 Mock Exams", detail: "Mathematics paper 1", date: "2026-10-27 08:00", kind: "Exam", color: "chart-2" },
    ],
    subjects: subjects.map((sub, i) => ({ id: i + 1, name: sub, classes: CLASSES.slice(i * 2, i * 2 + 2).join(", ") })),
    announcements: db().announcements,
  };
}

const wait = () => new Promise((r) => setTimeout(r, 180));

export async function demoRequest<T>(method: string, fullPath: string, body?: unknown): Promise<T> {
  await wait();
  const [path = "", qs] = fullPath.split("?");
  const q = new URLSearchParams(qs ?? "");
  const d = db();
  let m: RegExpMatchArray | null;
  const b: Row = body ?? {};

  if (method === "GET" && (m = path.match(/^\/dashboards\/([\w-]+)$/))) return dashboard(m[1] ?? "") as T;
  if (method === "GET" && path === "/teacher/overview") return teacherOverview() as T;
  if (method === "GET" && path === "/cms-announcements") return d.announcements as T;
  if (method === "POST" && path === "/enquiries") {
    if (!b.name || !b.email) throw new ApiError(422, "Validation failed", { name: ["Name is required"], email: ["Email is required"] });
    d.sections.enquiries.unshift({ id: d.sections.enquiries.length + 1, name: String(b.name), grade: String(b.grade ?? "—"), received: "2026-10-17", status: "New" });
    return { ok: true } as T;
  }
  if (method === "GET" && path === "/hr-leave-requests") return d.leave as T;
  if (method === "POST" && (m = path.match(/^\/hr-leave-requests\/(\d+)\/(approve|reject)$/))) {
    const row = d.leave.find((l: Row) => l.id === Number(m![1]));
    if (!row) throw new ApiError(404, "Leave request not found");
    row.status = m[2] === "approve" ? "Approved" : "Rejected";
    return row as T;
  }
  if (method === "DELETE" && (m = path.match(/^\/hr-leave-requests\/(\d+)$/))) {
    d.leave = d.leave.filter((l: Row) => l.id !== Number(m![1]));
    return { ok: true } as T;
  }
  if (method === "GET" && path === "/hr-payroll-runs/current") {
    return { id: d.payroll.id, period: d.payroll.period, status: d.payroll.status, employees: d.payroll.employees.map((e: Payslip) => ({ id: e.id, name: e.name, position: e.position, gross: e.payments.reduce((t, p) => t + p.qty * p.amount, 0), deductions: e.deductions.reduce((t, x) => t + x.amount, 0) })) } as T;
  }
  if (method === "GET" && (m = path.match(/^\/hr-payroll-runs\/\d+\/employees\/(\d+)$/))) {
    const e = d.payroll.employees.find((x: Row) => x.id === Number(m![1]));
    if (!e) throw new ApiError(404, "Employee not in payroll run");
    return e as T;
  }
  if (method === "POST" && (m = path.match(/^\/hr-payroll-runs\/\d+\/employees\/(\d+)\/(payments|deductions)$/))) {
    if (d.payroll.status !== "draft") throw new ApiError(409, "Payroll period is locked after preparation.");
    const e = d.payroll.employees.find((x: Row) => x.id === Number(m![1]));
    if (!e) throw new ApiError(404, "Employee not found");
    if (!b.label || !Number(b.amount)) throw new ApiError(422, "Validation failed", { amount: ["Label and a non-zero amount are required"] });
    if (m[2] === "payments") e.payments.push({ id: e.payments.length + 1, label: String(b.label), qty: Number(b.qty ?? 1), amount: Number(b.amount) });
    else e.deductions.push({ id: e.deductions.length + 1, label: String(b.label), amount: Number(b.amount) });
    return e as T;
  }
  if (method === "POST" && (m = path.match(/^\/hr-payroll-runs\/\d+\/(prepare|approve|mark-paid)$/))) {
    const next = { prepare: ["draft", "prepared"], approve: ["prepared", "approved"], "mark-paid": ["approved", "paid"] }[m[1] as "prepare"];
    if (d.payroll.status !== next[0]) throw new ApiError(409, `Payroll must be ${next[0]} first.`);
    d.payroll.status = next[1] as DemoState["payroll"]["status"];
    return { status: d.payroll.status } as T;
  }
  if (method === "PATCH" && (m = path.match(/^\/notifications\/(\d+)\/read$/))) {
    const row = d.sections.notifications.find((x: Row) => x.id === Number(m![1]));
    if (row) row.read = true;
    return { ok: true } as T;
  }
  const secKey = sectionByEndpoint[path];
  if (method === "GET" && secKey) return paginate(d.sections[secKey], q) as T;

  throw new ApiError(404, `Demo data has no handler for ${method} ${path}`);
}
