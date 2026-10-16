# KPI and data-source dictionary

| KPI | Calculation | Demo source | Production endpoint target |
|---|---|---|---|
| Students enrolled | Active enrollment rows | 1,248 synthetic students | `GET /api/v1/dashboard/kpis` |
| Attendance today | Present rows / expected rows | 1,176 / 1,248 | `GET /api/v1/attendance/summary` |
| Fees collected | Sum of posted payment allocations for selected term | KES 18.4M | `GET /api/v1/finance/collections` |
| Outstanding | Billed amount minus allocated payments | KES 4.8M | `GET /api/v1/finance/balances` |
| Payroll readiness | Validated payroll inputs / required inputs | 92% | `GET /api/v1/payroll/runs/current` |
| Timetable conflicts | Server validation conflicts in draft timetable | 3 | `GET /api/v1/timetables/{id}/conflicts` |

The demo interface labels all values as demo context and keeps related student, attendance and finance rows visually linked.
