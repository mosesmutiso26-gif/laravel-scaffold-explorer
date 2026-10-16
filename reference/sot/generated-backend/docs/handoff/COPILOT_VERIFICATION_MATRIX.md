# Copilot Verification Matrix

This matrix maps every generated module to its verification path: migration → model → controller → route → policy → test.

## Core Modules

| Module | Migration | Model(s) | Controller | Routes | Policy | Test File |
|--------|-----------|----------|-----------|--------|--------|-----------|
| Auth | users, roles, tokens | User | AuthController | auth/* | — | AuthAndFinanceTest |
| Students | students, guardians, student_guardians | Student, Guardian | StudentController, GuardianController | students/*, guardians/* | StudentPolicy | AuthAndFinanceTest |
| Staff | staff, teachers | Staff, Teacher | StaffController | staff/* | StaffPolicy | — |
| Enrolment | enrolments | Enrolment | EnrolmentController | enrolments/* | — | — |
| Attendance | attendance_sessions, attendance_records | AttendanceSession, AttendanceRecord | AttendanceController | attendance-sessions/* | — | — |
| Assessment | assessments, grades, report_cards | Assessment, Grade, ReportCard | AssessmentController | assessments/* | — | — |
| Timetable | rooms, timetable_versions, timetable_entries | TimetableVersion, TimetableEntry | TimetableController | timetable-versions/* | — | TimetableConflictTest |
| Finance | fee_structures, invoices, invoice_items, payments, payment_allocations | Invoice, InvoiceItem, Payment, PaymentAllocation | InvoiceController, PaymentController | invoices/*, payments/* | InvoicePolicy, PaymentPolicy | AuthAndFinanceTest, PaymentServiceTest |
| Library | library_books, copies, loans, fines, reservations | LibraryBook, LibraryCopy, LibraryLoan, LibraryFine | LibraryController | library-books/*, library-loans/* | — | LibraryTest |
| Transport | vehicles, routes, assignments | Vehicle, TransportRoute, TransportAssignment | TransportController | vehicles/* | — | — |
| Boarding | boarding_houses, dormitories, rooms, beds, placements, roll_calls | BoardingHouse, Dormitory, BoardingRoom, Bed, BoardingPlacement, RollCall | BoardingController | boarding-houses/*, boarding-placements, roll-calls/* | — | BoardingTest |
| Sports | sports, teams, squad_members, training, fixtures, equipment | Sport, Team, SquadMember, TrainingSession, Fixture, SportsEquipment | SportsController | sports/*, teams/*, fixtures/* | — | — |
| Clinic | clinic_visits, medications, records | ClinicVisit, ClinicMedication, ClinicRecord | ClinicController | clinic-visits/* | — | — |
| Safeguarding | safeguarding_incidents, actions | SafeguardingIncident, SafeguardingAction | SafeguardingController | safeguarding-incidents/* | — | — |
| HR | hr_leave_requests, payroll_runs, payslips | HrLeaveRequest, HrPayrollRun, HrPayslip | HrController | hr-leave-requests/*, hr-payroll-runs/* | — | — |
| Procurement | suppliers, purchase_requests, purchase_orders, goods_receipts | Supplier, PurchaseRequest, PurchaseOrder, GoodsReceipt | ProcurementController | suppliers/*, purchase-orders/* | — | — |
| Inventory | inventory_items, stock_movements | InventoryItem, StockMovement | InventoryController | inventory-items/* | — | InventoryTest, InventoryMovementTest |
| CMS | cms_pages, announcements, enquiries | CmsPage, CmsAnnouncement, Enquiry | CmsController | cms-pages/*, cms-announcements/*, enquiries/* | — | — |
| Notifications | notifications | Notification | NotificationController | notifications/* | — | — |
| Audit | audit_entries | AuditEntry | AuditController | audit-entries/* | — | — |

## New Modules

| Module | Migration | Model(s) | Controller | Routes | Policy | Test File |
|--------|-----------|----------|-----------|--------|--------|-----------|
| Co-Curricular | cocurricular_tables | ActivityCategory, Club, ClubMembership, ClubLeadership, ActivityEvent, EventAttendance, Competition, CompetitionEntry, StudentAchievement, EducationalTrip, TripParticipant, GuardianConsent, ActivityBudget, ResourceReservation, ActivityReport | CoCurricularController | clubs/*, memberships/*, events/*, competitions/*, achievements, trips/* | CoCurricularPolicy | CoCurricularTest |
| Science Lab | science_lab_tables | ScienceLab, ScienceEquipment, ChemicalBatch, PracticalLesson, LabBooking, PracticalRequirement, StockReservation, ScienceStockMovement, PracticalAttendance, PracticalAssessment, SafetyInspection, SafetyFinding, LabIncident, LabMaintenanceRequest | ScienceLabController | science-labs/*, science-equipment/*, chemicals/*, practical-lessons/*, safety-inspections/*, lab-incidents/* | ScienceLabPolicy | ScienceLabTest |
| Computer Lab | computer_lab_tables | ComputerLab, Workstation, IctAsset, Software, SoftwareInstallation, SoftwareLicence, ComputerLabBooking, WorkstationAssignment, ComputerPractical, TechnicalTicket, AssetAudit | ComputerLabController | computer-labs/*, workstations/*, software/*, support-tickets/* | ComputerLabPolicy | ComputerLabTest |
| Headteacher Portal | headteacher_portal_tables | ExecutiveTask, ApprovalRequest, DailyBriefingItem, LessonObservation, AcademicIntervention | HeadteacherController | headteacher/* | HeadteacherPolicy | HeadteacherPortalTest |

## Verification Steps Per Module

For each module, Copilot should verify:

1. **Migration runs** — table created with correct columns and constraints
2. **Model works** — can create, read, update, delete records via Eloquent
3. **Factory works** — factory generates valid test data
4. **Controller responds** — API endpoints return correct HTTP status and data
5. **Policy enforces** — unauthorized access returns 403, authorized access succeeds
6. **Route registered** — `php artisan route:list` shows the endpoint
7. **Test passes** — test file runs and passes
