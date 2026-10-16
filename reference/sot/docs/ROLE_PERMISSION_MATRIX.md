# Role and permission matrix

| Role | Primary access | Sensitive actions |
|---|---|---|
| Administrator | All modules and configuration | Publish CMS, manage roles, export, audit |
| Headteacher | School-wide operations and approvals | Approve academic/operational items |
| Academic | Academics, timetable and attendance exceptions | Moderate marks, publish timetable |
| Teacher | Assigned classes, lesson plans, assessments | Record attendance and marks for assigned classes |
| Bursar | Fees, receipts, reconciliation and expenditure | Record, allocate, reverse and reconcile payments |
| HR & Payroll | Staff, leave and payroll | Review payroll, approve leave, view salary data |
| Registrar | Admissions, enrollment and student records | Move applications through valid stages |
| Parent | Linked children only | View published records; no school-wide access |

The role switcher is a demonstration control. It does not replace Laravel authorization. Production permission checks must be enforced server-side and must not be inferred from hidden navigation.
