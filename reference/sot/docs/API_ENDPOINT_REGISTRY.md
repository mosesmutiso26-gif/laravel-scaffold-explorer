# API endpoint registry — Laravel target

Base URL: `VITE_API_BASE_URL/api/v1`

| ID | Method | Endpoint | Consumer | Status |
|---|---|---|---|---|
| AUTH-001 | GET | `/me` | Shell/profile | Contract-only |
| DASH-001 | GET | `/dashboard/kpis?term_id=` | Overview | Contract-only |
| DASH-002 | GET | `/dashboard/activity?term_id=` | Timeline/approvals | Contract-only |
| STUD-001 | GET | `/students` | Student directory | Contract-only |
| STUD-002 | GET | `/students/{student}` | Student detail | Contract-only |
| ATT-001 | GET | `/attendance/summary` | Attendance KPIs | Contract-only |
| ATT-002 | POST | `/attendance/sessions/{session}/records` | Take attendance | Contract-only |
| FIN-001 | GET | `/finance/accounts` | Finance table | Contract-only |
| FIN-002 | POST | `/finance/payments` | Record payment | Contract-only |
| FIN-003 | POST | `/finance/payments/{payment}/allocate` | Allocation | Contract-only |
| ACAD-001 | GET | `/assessments` | Assessment register | Contract-only |
| ACAD-002 | POST | `/assessments/{assessment}/marks` | Marks entry | Contract-only |
| PAY-001 | GET | `/payroll/runs/current` | HR dashboard | Contract-only |
| CMS-001 | GET | `/cms/pages/home` | CMS preview | Contract-only |
| CMS-002 | PATCH | `/cms/pages/{page}` | Save draft | Contract-only |
| CMS-003 | POST | `/cms/pages/{page}/publish` | Publishing | Contract-only |
| AUD-001 | GET | `/audit-logs` | Reports/audit | Contract-only |

All write endpoints require Laravel validation, permission checks, idempotency where payment-like, and auditable side effects. This registry is intentionally truthful: the current frontend is demo-only and no Laravel endpoint is claimed as integrated.
