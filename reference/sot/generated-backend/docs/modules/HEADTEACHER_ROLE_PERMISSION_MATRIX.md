# Headteacher Role & Permission Matrix

## Roles Added

| Role | Purpose |
|------|---------|
| Headteacher | Executive portal access, oversight, approvals |
| Co-Curricular Coordinator | Co-curricular module administration |
| Lab Technician | Science lab inventory, preparation, safety |
| ICT Technician | Computer lab assets, software, technical tickets |

## Permissions Added

| Permission | Description | Granted To |
|------------|-------------|------------|
| `cocurricular.manage` | Full co-curricular module admin | Co-Curricular Coordinator, Super Admin |
| `science-lab.manage` | Science lab inventory + safety admin | Lab Technician, Super Admin |
| `computer-lab.manage` | Computer lab asset + ticket admin | ICT Technician, Super Admin |
| `headteacher.dashboard` | View executive dashboard + briefings | Headteacher, Super Admin |
| `headteacher.approvals` | Review and decide approval requests | Headteacher, Super Admin |
| `headteacher.reports` | Access executive report exports | Headteacher, Super Admin |

## Headteacher Permission Scope

The headteacher role has **oversight** permissions but does NOT automatically inherit:
- Super Administrator permissions
- Financial controller / payment processing permissions
- Unrestricted access to individual student medical/counselling records
- Staff payroll or confidential HR records

### What Headteacher CAN Do
- View executive dashboard with real aggregates
- Review and approve/reject approval requests (with maker-checker)
- View academic performance summaries
- View finance overview (outstanding fees, verified collections)
- View staff overview (attendance, workload — not payroll)
- Create and assign executive tasks
- Mark daily briefing items as reviewed
- Manage academic interventions
- Manage lesson observations

### What Headteacher CANNOT Do (without additional permissions)
- Process payments or execute refunds
- Access student medical records (ClinicController manages that)
- Edit staff salary or payroll data
- Bypass safeguarding access controls
- Approve own requests (maker-checker enforced)

## Maker-Checker Enforcement

The `ApprovalRequest.canBeReviewedBy(int $userId)` method checks:
1. The user has `headteacher.approvals` permission
2. The user is NOT the original requester (`requester_id != $userId`)

This is enforced server-side in `HeadteacherDashboardService::reviewApproval()`.
