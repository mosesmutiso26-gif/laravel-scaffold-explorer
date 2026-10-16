# Frontend ↔ Laravel API integration

Base: `VITE_API_BASE_URL` + `/api/v1`, Sanctum bearer token. All calls go through `src/lib/api/client.ts`.
Demo mode (`src/lib/api/demo.ts`) mirrors these contracts with labelled synthetic data; live mode never falls back to it.

## Endpoints used that exist in reference/sot/generated-backend/routes/api.php
POST auth/login · GET students, staff, attendance-sessions, assessments, invoices, payments, library-books,
inventory-items, purchase-orders, boarding-houses, transport-routes, clinic-visits, safeguarding-incidents,
teams, clubs, cms-pages, enquiries, science-equipment, workstations, notifications, hr-leave-requests, cms-announcements ·
POST enquiries · POST hr-leave-requests/{id}/approve · DELETE hr-leave-requests/{id} · PATCH notifications/{id}/read

List endpoints are expected to accept `search, sort, direction, page, per_page` and return Laravel pagination `{data, meta}` — verify.

## Missing in the Laravel package (must be added)
| Endpoint | Used by |
|---|---|
| GET dashboards/{role} → `{kpis[], charts[]}` role-scoped | src/routes/portal.$role.tsx |
| GET teacher/overview | src/routes/portal.teacher.tsx |
| POST hr-leave-requests/{id}/reject | src/routes/portal.hr.tsx |
| GET hr-payroll-runs/current | src/routes/portal.hr.tsx |
| GET hr-payroll-runs/{run}/employees/{staff} | src/routes/portal.hr.tsx |
| POST hr-payroll-runs/{run}/employees/{staff}/payments, /deductions (draft only) | src/routes/portal.hr.tsx |
| POST hr-payroll-runs/{run}/prepare, /approve, /mark-paid (separate steps) | src/routes/portal.hr.tsx |
| auth/login response must include `user.roles` | src/routes/login.tsx |

Permissions are checked in the UI for navigation only; Laravel must enforce every rule server-side.
