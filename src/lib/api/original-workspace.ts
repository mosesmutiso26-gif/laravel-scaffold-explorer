import snapshots from "./original-demo-records.json";
import { WORKSPACE_PAGES } from "../workspace-pages";
import { ApiError } from "./errors";

export type WorkspaceData = { collections: { title: string; rows: Record<string, unknown>[] }[]; originalPlaceholder: boolean };
const data = snapshots as unknown as Record<string, Record<string, unknown>>;
const sources: Record<string, Record<string, string[]>> = {
  teacher: { timetable: ["lessons"], classes: ["students"], "lesson-plans": ["lessonPlans"], marking: ["assignments"], assessments: ["assignments"], analytics: ["students"], calendar: ["lessons"], announcements: ["notifications"] },
  hr: { staff: ["employees"], departments: ["employees"], recruitment: ["candidates"], onboarding: ["employees"], attendance: ["employees"], payslips: ["payroll"], approvals: ["leave"], "audit-logs": ["audit"] },
  librarian: { catalogue: ["books"], issue: ["copies", "borrowers"], returns: ["loans"], renewals: ["loans"], overdue: ["loans"], inventory: ["copies"] },
  finance: { structures: ["feeStructures"], receipts: ["payments"], arrears: ["charges"], statements: ["charges", "payments"], ledger: ["journalEntries", "charges", "payments"], balances: ["charges"], reconciliation: ["bankLines", "payments"], journal: ["journalEntries"] },
  procurement: { orders: ["purchaseOrders"], counts: ["stockCounts"] },
  health: { queue: ["encounters"], conditions: ["chronicConditions"], medications: ["medicationOrders"] },
  parent: { dashboard: ["parentAccounts", "studentBalances"], statements: ["statements", "ledger"], payments: ["statements", "ledger"], plan: ["paymentPlans"], receipts: ["ledger"], support: ["feeQueries"], notifications: ["parentNotifications"], profile: ["parentAccounts"] },
  prefect: { "duty-types": ["dutyTypes"], training: ["trainingSessions"] },
  boarding: { houses: ["houses", "dormitories"], rooms: ["rooms", "beds"], "roll-call": ["rollCalls"], leave: ["leaveRequests"], handover: ["handovers"] },
  sports: { squads: ["teams"], training: ["trainingSessions"] },
  transport: { attendance: ["trips"], fuel: ["fuelRecords"] },
  timetable: { grid: ["currentVersion.entries"], teacher: ["currentVersion.entries"], class: ["currentVersion.entries"], versions: ["draftVersion", "versions"], absences: ["teacherAbsences"] },
  headteacher: { "action-centre": ["tasks"] },
  computerlab: { software: ["software", "licences"] },
  directors: { risks: ["risks", "compliance"], finance: ["financials"], procurement: ["projects"], meetings: ["meetings", "agenda"], audit: ["auditEvents"] },
};

export const fieldLabel = (key: string) => key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ").replace(/^./, (c) => c.toUpperCase());

export function getOriginalWorkspace(role: string, page: string): WorkspaceData {
  const state = data[role];
  if (!state || !WORKSPACE_PAGES[role]?.some((p) => p.key === page)) throw new ApiError(404, "Unknown workspace page.");
  let keys = sources[role]?.[page] ?? [page];
  if (page === "reports" && !state.reports || page === "dashboard") keys = Object.keys(state).filter((k) => Array.isArray(state[k]));
  const collections = keys.flatMap((key) => {
    const value = key.split(".").reduce<unknown>((v, k) => v && typeof v === "object" ? (v as Record<string, unknown>)[k] : undefined, state);
    if (!value) return [];
    const rows = (Array.isArray(value) ? value : [value]).map((row, i) => typeof row === "object" && row !== null ? row as Record<string, unknown> : { id: i + 1, event: row });
    return [{ title: fieldLabel(key.replace(".entries", "")), rows }];
  });
  return { collections, originalPlaceholder: collections.length === 0 };
}