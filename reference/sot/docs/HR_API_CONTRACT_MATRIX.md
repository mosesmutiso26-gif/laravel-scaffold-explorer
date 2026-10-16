# HR API Contract Matrix

Base: `/api/v1`. Laravel must enforce role and record-level authorization; frontend navigation is not a security boundary.

| Resource | Methods | Endpoint family | Status |
|---|---|---|---|
| Dashboard/workforce | GET | `/hr/dashboard`, `/hr/staff`, `/hr/departments`, `/hr/designations` | Demo implemented; contract-only |
| Staff/contracts | GET/POST/PUT | `/hr/staff`, `/hr/staff/{staffId}`, `/hr/contracts`, `/hr/contracts/{contractId}`, `/renew` | Demo implemented; contract-only |
| Recruitment/onboarding | GET/POST/PUT | `/hr/recruitment/*`, `/hr/onboarding/*`, `/hr/offboarding/*` | Demo implemented; contract-only |
| Attendance/leave | GET/POST/PUT | `/hr/attendance`, `/hr/attendance/corrections`, `/hr/leave/*` | Demo implemented; contract-only |
| Overtime/claims | GET/POST/PUT | `/hr/overtime/*`, `/hr/claims/*` | Demo implemented; contract-only |
| Payroll | GET/POST | `/hr/payroll/periods`, `/hr/payroll/runs`, `/hr/payroll/runs/{runId}/calculate`, `/validate`, `/submit`, `/approve`, `/reject`, `/payment` | Demo implemented; contract-only |
| Payslips/documents | GET/POST | `/hr/payslips`, `/hr/payslips/{payslipId}`, `/publish`, `/hr/documents/*` | Demo implemented; contract-only |
| Reports/approvals/audit | GET | `/hr/reports/*`, `/hr/approvals`, `/hr/audit-logs` | Demo implemented; contract-only |
| Profile/preferences | GET/PUT | `/hr/profile`, `/hr/preferences`, `/hr/notifications` | Demo shell; contract-only |

Expected responses include typed resources and neutral errors for 401, 403, 404, 409, 422 and 500. Payroll calculations must use backend decimal arithmetic, effective-dated rules and idempotent state transitions. Approval never implies payment.
