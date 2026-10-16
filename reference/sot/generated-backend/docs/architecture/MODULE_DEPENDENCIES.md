# Module Dependencies

## Dependency Graph

```
School Settings
├── Academic Years / Terms
│   ├── Classes / Streams / Subjects
│   │   ├── Enrolments
│   │   ├── Attendance
│   │   ├── Assessment / Report Cards
│   │   └── Timetables
│   └── Fees / Invoices / Payments
├── Users / Auth / Roles
│   ├── Students / Guardians
│   ├── Staff / Teachers
│   └── All module-specific authorization
├── Students
│   ├── Admissions / Enrolment
│   ├── Boarding / Transport / Meals
│   ├── Health Clinic
│   ├── Safeguarding
│   └── Co-Curricular / Sports
├── Staff
│   ├── HR / Payroll / Leave
│   └── Department assignments
├── Finance
│   ├── Procurement / Inventory
│   └── Supplier payments
├── Library (standalone with student links)
├── Laboratories (standalone with class links)
├── Notifications (cross-module)
├── Documents (cross-module)
└── Audit (cross-module)
```

## Migration Order (Summary)

1. `users`, `roles`, `permissions` (auth foundation)
2. `school_settings` (school identity)
3. `academic_years`, `terms` (academic calendar)
4. `departments`, `staff`, `teachers` (HR foundation)
5. `students`, `guardians`, `student_guardians` (student foundation)
6. `classes`, `streams`, `subjects`, `enrolments` (academic structure)
7. `attendance` (depends on enrolments)
8. `assessments`, `grades`, `report_cards` (depends on enrolments, subjects)
9. `timetable_versions`, `timetable_entries` (depends on classes, teachers, rooms)
10. `fee_structures`, `invoices`, `payments`, `payment_allocations` (depends on students, terms)
11. `suppliers`, `purchase_requests`, `purchase_orders`, `goods_receipts`, `inventory_items`, `stock_movements`
12. `library_books`, `library_copies`, `library_loans`, `library_reservations`, `library_fines`
13. `vehicles`, `transport_routes`, `transport_assignments`, `transport_trips`
14. `boarding_houses`, `dormitories`, `rooms`, `beds`, `boarding_placements`, `roll_calls`, `leave_requests`
15. `sports`, `teams`, `squad_members`, `training_sessions`, `fixtures`, `equipment`, `equipment_issues`
16. `clinic_records`, `clinic_visits`, `clinic_medications`
17. `safeguarding_incidents`, `safeguarding_actions`
18. `hr_leave_requests`, `hr_payroll_runs`, `hr_payslips`
19. `cms_pages`, `cms_announcements`, `enquiries`
20. `notifications`, `documents`, `audit_entries`, `system_health_checks`

Full dependency details in `docs/database/MIGRATION_DEPENDENCY_ORDER.md`.
