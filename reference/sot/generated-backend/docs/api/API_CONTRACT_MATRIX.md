# API Contract Matrix

All endpoints are under `/api/v1/`. Authentication via Sanctum Bearer token.

## Authentication

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| POST | `auth/login` | AuthController@login | No | — | Login, returns token |
| POST | `auth/register` | AuthController@register | No | — | Register parent account |
| POST | `auth/logout` | AuthController@logout | Yes | — | Invalidate token |
| GET | `auth/me` | AuthController@me | Yes | — | Current user with roles/permissions |

## Students

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `students` | StudentController@index | Yes | students.view | List students (filtered by role) |
| POST | `students` | StudentController@store | Yes | students.create | Create student |
| GET | `students/{student}` | StudentController@show | Yes | students.view | Single student |
| PUT/PATCH | `students/{student}` | StudentController@update | Yes | students.update | Update student |
| DELETE | `students/{student}` | StudentController@destroy | Yes | students.delete | Soft-delete student |
| GET | `students/{student}/invoices` | StudentController@invoices | Yes | students.view | Student invoices |
| GET | `students/{student}/attendance` | StudentController@attendance | Yes | students.view | Student attendance |
| GET | `students/{student}/grades` | StudentController@grades | Yes | students.view | Student grades |

## Guardians

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `guardians` | GuardianController@index | Yes | guardians.view | List guardians |
| POST | `guardians` | GuardianController@store | Yes | guardians.create | Create guardian |
| GET | `guardians/{guardian}` | GuardianController@show | Yes | guardians.view | Single guardian |
| PUT/PATCH | `guardians/{guardian}` | GuardianController@update | Yes | guardians.update | Update guardian |
| DELETE | `guardians/{guardian}` | GuardianController@destroy | Yes | guardians.delete | Delete guardian |

## Staff

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `staff` | StaffController@index | Yes | staff.view | List staff |
| POST | `staff` | StaffController@store | Yes | staff.create | Create staff |
| GET | `staff/{staff}` | StaffController@show | Yes | staff.view | Single staff |
| PUT/PATCH | `staff/{staff}` | StaffController@update | Yes | staff.update | Update staff |
| DELETE | `staff/{staff}` | StaffController@destroy | Yes | staff.delete | Delete staff |

## Enrolments

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `enrolments` | EnrolmentController@index | Yes | enrolments.view | List enrolments |
| POST | `enrolments` | EnrolmentController@store | Yes | enrolments.create | Create enrolment |
| GET | `enrolments/{enrolment}` | EnrolmentController@show | Yes | enrolments.view | Single enrolment |
| PUT/PATCH | `enrolments/{enrolment}` | EnrolmentController@update | Yes | enrolments.update | Update enrolment |
| DELETE | `enrolments/{enrolment}` | EnrolmentController@destroy | Yes | enrolments.delete | Delete enrolment |

## Attendance

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `attendance-sessions` | AttendanceController@index | Yes | attendance.view | List sessions |
| POST | `attendance-sessions` | AttendanceController@store | Yes | attendance.create | Create session |
| GET | `attendance-sessions/{session}` | AttendanceController@show | Yes | attendance.view | Single session |
| POST | `attendance-sessions/{session}/records` | AttendanceController@storeRecords | Yes | attendance.create | Bulk attendance records |
| PATCH | `attendance-sessions/{session}/complete` | AttendanceController@complete | Yes | attendance.complete | Mark session complete |

## Assessments

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `assessments` | AssessmentController@index | Yes | assessments.view | List assessments |
| POST | `assessments` | AssessmentController@store | Yes | assessments.create | Create assessment |
| POST | `assessments/{assessment}/grades` | AssessmentController@storeGrades | Yes | assessments.grade | Record grades |
| PATCH | `assessments/{assessment}/publish` | AssessmentController@publish | Yes | assessments.publish | Publish grades |

## Timetable

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `timetable-versions` | TimetableController@index | Yes | timetable.view | List versions |
| POST | `timetable-versions` | TimetableController@store | Yes | timetable.create | Create version |
| POST | `timetable-versions/{version}/entries` | TimetableController@storeEntry | Yes | timetable.create | Add entry |
| POST | `timetable-versions/{version}/conflict-check` | TimetableController@conflictCheck | Yes | timetable.view | Check conflicts |
| POST | `timetable-versions/{version}/publish` | TimetableController@publish | Yes | timetable.publish | Publish version |

## Finance

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `invoices` | InvoiceController@index | Yes | invoices.view | List invoices |
| POST | `invoices` | InvoiceController@store | Yes | invoices.create | Create invoice |
| GET | `invoices/{invoice}` | InvoiceController@show | Yes | invoices.view | Single invoice |
| GET | `payments` | PaymentController@index | Yes | payments.view | List payments |
| POST | `payments` | PaymentController@store | Yes | payments.create | Record payment |
| POST | `payments/{payment}/verify` | PaymentController@verify | Yes | payments.verify | Verify payment |
| POST | `payments/{payment}/reverse` | PaymentController@reverse | Yes | payments.reverse | Reverse payment |

## Library

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `library-books` | LibraryController@index | Yes | library.view | List books |
| POST | `library-books` | LibraryController@store | Yes | library.manage | Add book |
| POST | `library-loans` | LibraryController@issueLoan | Yes | library.circulate | Issue loan |
| POST | `library-loans/{loan}/return` | LibraryController@returnLoan | Yes | library.circulate | Return loan |

## Transport

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `vehicles` | TransportController@index | Yes | transport.view | List vehicles |
| POST | `vehicles` | TransportController@store | Yes | transport.manage | Add vehicle |

## Boarding

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `boarding-houses` | BoardingController@index | Yes | boarding.view | List houses |
| POST | `boarding-placements` | BoardingController@placeStudent | Yes | boarding.manage | Place student |
| POST | `roll-calls` | BoardingController@startRollCall | Yes | boarding.manage | Start roll call |
| POST | `roll-calls/{rollCall}/entries` | BoardingController@markEntry | Yes | boarding.manage | Mark entry |
| POST | `roll-calls/{rollCall}/complete` | BoardingController@completeRollCall | Yes | boarding.manage | Complete roll call |

## Sports

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `sports` | SportsController@index | Yes | sports.view | List sports |
| POST | `teams/{team}/members` | SportsController@addMember | Yes | sports.manage | Add member |
| GET | `fixtures` | SportsController@index | Yes | sports.view | List fixtures |

## Clinic

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `clinic-visits` | ClinicController@index | Yes | clinic.view | List visits |
| POST | `clinic-visits` | ClinicController@store | Yes | clinic.manage | Record visit |

## Safeguarding

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `safeguarding-incidents` | SafeguardingController@index | Yes | safeguarding.view | List incidents |
| POST | `safeguarding-incidents` | SafeguardingController@store | Yes | safeguarding.manage | Report incident |
| POST | `safeguarding-incidents/{incident}/actions` | SafeguardingController@addAction | Yes | safeguarding.manage | Add action |

## HR

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `hr-leave-requests` | HrController@index | Yes | hr.view | List leave requests |
| POST | `hr-leave-requests/{leave}/approve` | HrController@approveLeave | Yes | hr.approve | Approve leave |

## Procurement

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `suppliers` | ProcurementController@index | Yes | procurement.view | List suppliers |
| GET | `purchase-orders` | ProcurementController@index | Yes | procurement.view | List POs |
| POST | `purchase-orders/{po}/approve` | ProcurementController@approvePO | Yes | procurement.approve | Approve PO |

## Inventory

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `inventory-items` | InventoryController@index | Yes | inventory.view | List items |
| POST | `inventory-items/{item}/stock-movements` | InventoryController@recordMovement | Yes | inventory.manage | Record movement |

## CMS

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `cms-pages` | CmsController@index | Yes | cms.view | List pages |
| GET | `cms-announcements` | CmsController@index | Yes | cms.view | List announcements |
| GET | `enquiries` | CmsController@index | Yes | enquiries.view | List enquiries |

## Notifications

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `notifications` | NotificationController@index | Yes | — | User notifications |
| PATCH | `notifications/{notification}/read` | NotificationController@markRead | Yes | — | Mark read |
| POST | `notifications/mark-all-read` | NotificationController@markAllRead | Yes | — | Mark all read |

## Audit

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `audit-entries` | AuditController@index | Yes | audit.view | List audit entries |

## Reports

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `reports/attendance` | ReportController@attendance | Yes | reports.view | Attendance report |
| GET | `reports/finance` | ReportController@finance | Yes | reports.finance | Finance report |
| GET | `reports/enrollment` | ReportController@enrollment | Yes | reports.view | Enrollment report |

## System

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `system/health` | SystemHealthController@health | Yes | system.health | Health check |

## Co-Curricular

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `cocurricular/dashboard` | CoCurricularController@dashboard | Yes | cocurricular.view | Dashboard stats |
| GET | `clubs` | CoCurricularController@clubsIndex | Yes | cocurricular.view | List clubs |
| POST | `clubs` | CoCurricularController@clubStore | Yes | cocurricular.manage | Create club |
| POST | `clubs/{club}/apply` | CoCurricularController@applyMembership | Yes | cocurricular.apply | Apply for membership |
| POST | `memberships/{membership}/approve` | CoCurricularController@approveMembership | Yes | cocurricular.manage | Approve application |
| POST | `clubs/{club}/events` | CoCurricularController@storeEvent | Yes | cocurricular.manage | Create event |
| POST | `events/{event}/attendance` | CoCurricularController@recordAttendance | Yes | cocurricular.attendance | Record attendance |
| POST | `clubs/{club}/competitions` | CoCurricularController@storeCompetition | Yes | cocurricular.manage | Create competition |
| POST | `achievements` | CoCurricularController@storeAchievement | Yes | cocurricular.manage | Record achievement |
| POST | `trips` | CoCurricularController@storeTrip | Yes | cocurricular.manage | Create trip |
| POST | `trips/{trip}/consent` | CoCurricularController@recordConsent | Yes | cocurricular.consent | Record guardian consent |

## Science Lab

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `science-labs/dashboard` | ScienceLabController@dashboard | Yes | lab.science.view | Dashboard stats |
| GET | `science-labs` | ScienceLabController@labIndex | Yes | lab.science.view | List labs |
| POST | `science-labs` | ScienceLabController@labStore | Yes | lab.science.manage | Create lab |
| POST | `science-labs/{lab}/bookings` | ScienceLabController@storeBooking | Yes | lab.science.book | Book lab |
| POST | `science-labs/bookings/{booking}/conflict-check` | ScienceLabController@checkBookingConflict | Yes | lab.science.view | Check conflicts |
| GET | `science-equipment` | ScienceLabController@equipmentIndex | Yes | lab.science.view | List equipment |
| POST | `science-equipment/{item}/movements` | ScienceLabController@recordMovement | Yes | lab.science.manage | Stock movement |
| GET | `chemicals` | ScienceLabController@chemicalIndex | Yes | lab.science.view | List chemicals |
| POST | `practical-lessons` | ScienceLabController@storePractical | Yes | lab.science.teach | Create practical |
| PATCH | `practical-lessons/{practical}/status` | ScienceLabController@updatePracticalStatus | Yes | lab.science.teach | Update lifecycle |
| POST | `safety-inspections` | ScienceLabController@storeInspection | Yes | lab.science.safety | Create inspection |
| POST | `lab-incidents` | ScienceLabController@storeIncident | Yes | lab.science.safety | Report incident |

## Computer Lab

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `computer-labs/dashboard` | ComputerLabController@dashboard | Yes | lab.computer.view | Dashboard stats |
| GET | `computer-labs` | ComputerLabController@labIndex | Yes | lab.computer.view | List labs |
| POST | `computer-labs` | ComputerLabController@labStore | Yes | lab.computer.manage | Create lab |
| GET | `workstations` | ComputerLabController@workstationIndex | Yes | lab.computer.view | List workstations |
| POST | `workstations` | ComputerLabController@workstationStore | Yes | lab.computer.manage | Create workstation |
| POST | `computer-labs/{lab}/bookings` | ComputerLabController@storeBooking | Yes | lab.computer.book | Book lab |
| GET | `software` | ComputerLabController@softwareIndex | Yes | lab.computer.view | List software |
| POST | `software` | ComputerLabController@softwareStore | Yes | lab.computer.manage | Add software |
| POST | `support-tickets` | ComputerLabController@storeTicket | Yes | lab.computer.support | Create ticket |
| PATCH | `support-tickets/{ticket}/status` | ComputerLabController@updateTicketStatus | Yes | lab.computer.support | Update ticket |

## Headteacher Portal

| Method | Route | Controller | Auth | Permission | Description |
|--------|-------|-----------|------|------------|-------------|
| GET | `headteacher/dashboard` | HeadteacherController@dashboard | Yes | headteacher.view | Executive dashboard |
| GET | `headteacher/daily-briefing` | HeadteacherController@dailyBriefing | Yes | headteacher.view | Daily briefing |
| GET | `headteacher/approvals` | HeadteacherController@approvals | Yes | headteacher.approve | Approval centre |
| POST | `headteacher/approvals/{approval}/decide` | HeadteacherController@decideApproval | Yes | headteacher.approve | Approve/reject |
| GET | `headteacher/academic-performance` | HeadteacherController@academicPerformance | Yes | headteacher.view | Academic overview |
| GET | `headteacher/attendance-overview` | HeadteacherController@attendanceOverview | Yes | headteacher.view | Attendance overview |
| GET | `headteacher/staff-overview` | HeadteacherController@staffOverview | Yes | headteacher.view | Staff overview |
| GET | `headteacher/finance-overview` | HeadteacherController@financeOverview | Yes | headteacher.finance | Finance overview |
| GET | `headteacher/boarding-overview` | HeadteacherController@boardingOverview | Yes | headteacher.view | Boarding overview |
| GET | `headteacher/reports/{type}` | HeadteacherController@report | Yes | headteacher.reports | Executive reports |
| POST | `headteacher/tasks` | HeadteacherController@storeTask | Yes | headteacher.view | Create task |
| PATCH | `headteacher/tasks/{task}` | HeadteacherController@updateTask | Yes | headteacher.view | Update task |
