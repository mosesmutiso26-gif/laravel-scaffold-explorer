# HR Permission Matrix

| Capability | HR officer | Payroll officer | HR approver | Teacher |
|---|---:|---:|---:|---:|
| View staff directory | Yes | Limited | Yes | No |
| View contracts and identity documents | Scoped | Limited | Yes | No |
| Manage recruitment/onboarding | Yes | No | Yes | No |
| Record staff attendance | Yes | No | Yes | No |
| Approve leave/corrections | If assigned | No | Yes | No |
| Create/calculate payroll | No | Yes | Yes | No |
| Approve payroll | No | No by default | Yes | No |
| Record payment outcome | No by default | Explicit permission | Explicit permission | No |
| View payslips/salary figures | Scoped | Yes | Yes | No |
| Verify compliance documents | Yes | No | Yes | No |
| View audit logs | Scoped | Payroll scope | Yes | No |
| Update own profile/preferences | Yes | Yes | Yes | Yes, through teacher portal |

Server-side Laravel policies must be the final authority. Demo role selection is a visual simulation and does not grant production access.
