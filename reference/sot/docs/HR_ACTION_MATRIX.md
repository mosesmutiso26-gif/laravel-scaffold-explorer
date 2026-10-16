# HR Action Matrix

| Action | Permission | Demo behavior | API target |
|---|---|---|---|
| Create staff profile | HR staff | Adds a synthetic employee to the shared directory | `POST /hr/staff` |
| Renew contract | HR staff with contract permission | Updates contract status/history and audit trail | `POST /hr/contracts/{contractId}/renew` |
| Advance candidate | HR recruitment permission | Moves candidate to the next stage | `PUT /hr/recruitment/candidates/{candidateId}` |
| Complete onboarding item | HR staff | Updates checklist progress | `PUT /hr/onboarding/{employeeId}` |
| Record/correct attendance | HR attendance permission | Updates register and exception summary | `POST /hr/attendance`, `POST /hr/attendance/corrections` |
| Approve/reject leave | HR leave approver | Updates request, approval queue and calendar | `POST /hr/leave/requests/{requestId}/approve|reject` |
| Create payroll run | Payroll permission | Creates a draft simulation only | `POST /hr/payroll/runs` |
| Calculate/validate payroll | Payroll permission | Recomputes synthetic totals and validation state | `POST /hr/payroll/runs/{runId}/calculate|validate` |
| Approve payroll | Authorized approver | Changes status to Approved, never Paid | `POST /hr/payroll/runs/{runId}/approve` |
| Record payment outcome | Explicit payroll payment permission | Changes Approved to Payment processing/Paid and audits it | `POST /hr/payroll/runs/{runId}/payment` |
| Publish payslip | Payroll permission | Publishes only the selected synthetic payslip | `POST /hr/payslips/{payslipId}/publish` |
| Verify document | HR compliance permission | Updates verification badge and compliance summary | `POST /hr/documents/{documentId}/verify` |
| Reset demo data | Demo administrator | Restores deterministic seeded state | No production endpoint |

All forms validate required fields and show success only after the shared demo mutation completes. Salary, contract and payslip access is intentionally restricted to the HR portal and is not exposed through teacher routes.
