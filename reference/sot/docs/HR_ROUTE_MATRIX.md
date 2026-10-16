# HR Route Matrix

| Route family | Frontend/demo status | API status |
|---|---|---|
| `/hr/dashboard` | Implemented with seeded workforce, leave, recruitment and payroll records | Contract-only |
| `/hr/staff/*`, `/hr/departments/*`, `/hr/designations/*` | Implemented directory, profile and create states | Contract-only |
| `/hr/contracts/*`, `/hr/recruitment/*`, `/hr/onboarding/*`, `/hr/offboarding/*` | Implemented workflow lists and state actions | Contract-only |
| `/hr/attendance/*`, `/hr/leave/*`, `/hr/overtime/*`, `/hr/claims/*` | Implemented with shared demo mutations for attendance, leave and approvals | Contract-only |
| `/hr/payroll/*`, `/hr/payslips/*` | Implemented simulated calculation, validation, approval/payment separation and payslip visibility | Contract-only |
| `/hr/documents/*`, `/hr/compliance` | Implemented document status and expiry states | Contract-only |
| `/hr/reports/*`, `/hr/approvals`, `/hr/audit-logs` | Implemented filterable report and approval views | Contract-only |
| `/hr/profile`, `/hr/account`, `/hr/security`, `/hr/notifications`, `/hr/preferences` | Implemented settings shell; backend-dependent account actions disabled honestly | Contract-only |
