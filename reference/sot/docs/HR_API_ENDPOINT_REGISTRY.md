# HR API Endpoint Registry

Contract families under `/api/v1`: `/hr/dashboard`; `/hr/staff`; `/hr/departments`; `/hr/designations`; `/hr/contracts`; `/hr/recruitment`; `/hr/onboarding`; `/hr/offboarding`; `/hr/attendance`; `/hr/leave`; `/hr/overtime`; `/hr/claims`; `/hr/payroll/periods`; `/hr/payroll/runs`; `/hr/payslips`; `/hr/documents`; `/hr/reports`; `/hr/approvals`; `/hr/audit-logs`; `/hr/profile`; `/hr/preferences`; `/hr/notifications`.

Every write must return the updated state or a typed error envelope. Payroll state transitions require authorization, effective scope, idempotency/concurrency handling and an audit event. No route is claimed as Laravel-integrated until a real route registry and authenticated response are available.
