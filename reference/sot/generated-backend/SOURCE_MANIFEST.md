# Source Manifest

## File Naming Conventions

- **Migrations:** `YYYY_MM_DD_HHMMSS_create_<table>_table.php` (timestamp determines execution order)
- **Models:** Singular PascalCase in `app/Models/`
- **Controllers:** PascalCase + `Controller` suffix in `app/Http/Controllers/Api/V1/`
- **Form Requests:** PascalCase + `Request` suffix in `app/Http/Requests/Api/V1/`
- **Resources:** PascalCase + `Resource` suffix in `app/Http/Resources/Api/V1/`
- **Services:** PascalCase + `Service` suffix in `app/Services/`
- **Enums:** Singular PascalCase in `app/Enums/`
- **Events:** Past-tense PascalCase in `app/Events/`
- **Listeners:** PascalCase in `app/Listeners/`
- **Jobs:** PascalCase + `Job` suffix in `app/Jobs/`
- **Policies:** Model name + `Policy` suffix in `app/Policies/`
- **Observers:** Model name + `Observer` suffix in `app/Observers/`

## Namespace Conventions

- Models: `App\Models`
- Controllers: `App\Http\Controllers\Api\V1`
- Requests: `App\Http\Requests\Api\V1`
- Resources: `App\Http\Resources\Api\V1`
- Services: `App\Services`
- Enums: `App\Enums`
- Events: `App\Events`
- Listeners: `App\Listeners`
- Jobs: `App\Jobs`
- Policies: `App\Policies`
- Observers: `App\Observers`
- Exceptions: `App\Exceptions`
- Middleware: `App\Http\Middleware`
- Providers: `App\Providers`

## Complete File Index

### Root Files (5)
| File | Purpose |
|------|---------|
| `.env.example` | Environment configuration template |
| `composer-requirements.md` | Exact package versions |
| `README.md` | Project overview |
| `GENERATION_STATUS.md` | Batch progress and cross-checks |
| `SOURCE_MANIFEST.md` | This file |

### Config (1)
| File | Purpose |
|------|---------|
| `config/permission.php` | Spatie permission configuration |

### Bootstrap (1)
| File | Purpose |
|------|---------|
| `bootstrap/app-registration-reference.php` | Middleware aliases, providers, scheduler reference |

### Enums (21)
| File | Purpose |
|------|---------|
| `app/Enums/AccountStatus.php` | User account statuses |
| `app/Enums/AssessmentStatus.php` | Assessment + grade + report card statuses |
| `app/Enums/AttendanceStatus.php` | Attendance record statuses |
| `app/Enums/BoardingEnums.php` | Boarding placement, bed, leave, roll call statuses |
| `app/Enums/CmsEnums.php` | CMS page + enquiry statuses |
| `app/Enums/CoCurricularEnums.php` | Club, membership, event, trip, achievement statuses |
| `app/Enums/EnrolmentStatus.php` | Enrolment statuses |
| `app/Enums/HeadteacherEnums.php` | Approval, task, intervention statuses |
| `app/Enums/HrEnums.php` | HR leave + payroll statuses |
| `app/Enums/InvoiceStatus.php` | Invoice statuses |
| `app/Enums/LabEnums.php` | Lab, practical, equipment, chemical, ticket statuses |
| `app/Enums/LibraryEnums.php` | Library copy, loan, fine statuses |
| `app/Enums/PaymentMethod.php` | Payment methods |
| `app/Enums/PaymentStatus.php` | Payment statuses |
| `app/Enums/ProcurementEnums.php` | PO, PR, stock movement statuses |
| `app/Enums/SafeguardingEnums.php` | Safeguarding incident statuses + severity |
| `app/Enums/SportsEnums.php` | Fixture result, training, equipment issue statuses |
| `app/Enums/StaffStatus.php` | Staff employment statuses |
| `app/Enums/StudentStatus.php` | Student enrolment statuses |
| `app/Enums/TimetableEnums.php` | Conflict type, severity, adjustment status |
| `app/Enums/TimetableVersionStatus.php` | Timetable version statuses |

### Models (~100)
All models in `app/Models/`. See `docs/database/ENTITY_RELATIONSHIP_MATRIX.md` for relationships.

Key model groups:
- **People:** User, Student, Guardian, Staff, Teacher
- **Academic:** AcademicYear, Term, Department, SchoolClass, Stream, Subject, ClassSubject, Enrolment
- **Attendance:** AttendanceSession, AttendanceRecord
- **Assessment:** Assessment, Grade, ReportCard
- **Timetable:** Room, TimetableVersion, TimetableEntry
- **Finance:** FeeStructure, Invoice, InvoiceItem, Payment, PaymentAllocation
- **Procurement:** Supplier, PurchaseRequest, PurchaseOrder, PurchaseOrderItem, GoodsReceipt, GoodsReceiptItem
- **Inventory:** InventoryItem, StockMovement
- **Library:** LibraryBook, LibraryCopy, LibraryLoan, LibraryFine, LibraryReservation
- **Transport:** Vehicle, TransportRoute, TransportAssignment
- **Boarding:** BoardingHouse, Dormitory, BoardingRoom, Bed, BoardingPlacement, RollCall, RollCallEntry, LeaveRequest
- **Sports:** Sport, Team, SquadMember, TrainingSession, Fixture, SportsEquipment, EquipmentIssue
- **Clinic:** ClinicVisit, ClinicMedication, ClinicRecord
- **Safeguarding:** SafeguardingIncident, SafeguardingAction
- **HR:** HrLeaveRequest, HrPayrollRun, HrPayslip
- **CMS:** CmsPage, CmsAnnouncement, Enquiry, Notification, Document
- **System:** AuditEntry, SchoolSetting
- **Co-Curricular:** ActivityCategory, Club, ClubMembership, ClubLeadership, ActivityEvent, EventAttendance, Competition, CompetitionEntry, StudentAchievement, EducationalTrip, TripParticipant, GuardianConsent, ActivityBudget, ResourceReservation, ActivityReport
- **Science Lab:** ScienceLab, ScienceEquipment, ChemicalBatch, PracticalLesson, LabBooking, PracticalRequirement, StockReservation, ScienceStockMovement, PracticalAttendance, PracticalAssessment, SafetyInspection, SafetyFinding, LabIncident, LabMaintenanceRequest
- **Computer Lab:** ComputerLab, Workstation, IctAsset, Software, SoftwareInstallation, SoftwareLicence, ComputerLabBooking, WorkstationAssignment, ComputerPractical, TechnicalTicket, AssetAudit
- **Headteacher:** ExecutiveTask, ApprovalRequest, DailyBriefingItem, LessonObservation, AcademicIntervention

### Controllers (28)
All in `app/Http/Controllers/Api/V1/`:

AuthController, StudentController, GuardianController, StaffController, EnrolmentController, AttendanceController, AssessmentController, TimetableController, InvoiceController, PaymentController, LibraryController, TransportController, BoardingController, SportsController, ClinicController, SafeguardingController, HrController, ProcurementController, InventoryController, CmsController, NotificationController, AuditController, ReportController, SystemHealthController, CoCurricularController, ScienceLabController, ComputerLabController, HeadteacherController

Plus: BaseApiController (abstract base class)

### Form Requests (4)
`app/Http/Requests/Api/V1/`: LoginRequest, RegisterRequest, StoreStudentRequest, UpdateStudentRequest

### API Resources (6)
`app/Http/Resources/Api/V1/`: UserResource, StudentResource, GuardianResource, InvoiceResource, InvoiceItemResource, PaymentResource

### Services (10)
`app/Services/`: InvoiceService, PaymentService, TimetableConflictService, BoardingService, LibraryCirculationService, InventoryMovementService, AuditLoggingService, CoCurricularService, LabBookingService, HeadteacherDashboardService

### Middleware (3)
`app/Http/Middleware/`: EnsureAccountIsActive, CheckPermission, TrackRequestCorrelation

### Events (5)
`app/Events/`: PaymentVerified, InvoiceIssued, StudentAdmitted, LibraryItemIssued, LibraryItemReturned

### Listeners (6)
`app/Listeners/`: RecordPaymentAudit, UpdateInvoiceBalance, NotifyStudentGuardians, SendInvoiceNotification, MarkCopyAsOnLoan, MarkCopyAsAvailable

### Observers (3)
`app/Observers/`: InvoiceObserver, PaymentObserver, StudentObserver

### Policies (4)
`app/Policies/`: StudentPolicy, InvoicePolicy, PaymentPolicy, StaffPolicy

### Jobs (4)
`app/Jobs/`: SendInvoiceNotificationJob, SendOverdueLibraryReminderJob, SendFeeReminderJob, GenerateReportCardJob

### Console Commands (4)
`app/Console/Commands/`: SendFeeReminders, CheckOverdueLibraryItems, CheckLowStock, MarkOverdueInvoices

### Providers (5)
`app/Providers/`: AppServiceProvider, AuthServiceProvider, EventServiceProvider, ObserverServiceProvider, RouteServiceProvider

### Exceptions (1)
`app/Exceptions/BusinessRuleException.php`

### Routes (1)
`routes/api.php` — all API v1 routes

### Migrations (32 files)
`database/migrations/` — see `MIGRATION_EXECUTION_PLAN.md` for full ordered list

### Factories (24)
`database/factories/`: UserFactory, StudentFactory, GuardianFactory, StaffFactory, InvoiceFactory, PaymentFactory, AcademicYearFactory, TermFactory, LibraryBookFactory, InventoryItemFactory, BoardingHouseFactory, SportFactory, SupplierFactory, VehicleFactory, ScienceLabFactory, ScienceEquipmentFactory, ChemicalBatchFactory, PracticalLessonFactory, ComputerLabFactory, WorkstationFactory, TechnicalTicketFactory, ClubFactory, ActivityCategoryFactory, ApprovalRequestFactory

### Seeders (1)
`database/seeders/DatabaseSeeder.php`

### Tests (11)
`tests/Feature/`: AuthAndFinanceTest, BoardingTest, LibraryTest, InventoryTest, TimetableConflictTest, CoCurricularTest, ScienceLabTest, ComputerLabTest, HeadteacherPortalTest
`tests/Unit/`: PaymentServiceTest, InventoryMovementTest

### Module Documentation (10)
| File | Purpose |
|------|---------|
| `docs/modules/CO_CURRICULAR_IMPLEMENTATION_REPORT.md` | Co-curricular module report, API matrix, state machines |
| `docs/modules/SCIENCE_LAB_MODULE_OVERVIEW.md` | Science lab module overview, API matrix, business rules |
| `docs/modules/COMPUTER_LAB_MODULE_OVERVIEW.md` | Computer lab module overview, API matrix, business rules |
| `docs/modules/HEADTEACHER_PORTAL_IMPLEMENTATION_REPORT.md` | Headteacher portal implementation report, phases, decisions |
| `docs/modules/HEADTEACHER_API_MATRIX.md` | All headteacher API endpoints with permissions and response shapes |
| `docs/modules/HEADTEACHER_ROLE_PERMISSION_MATRIX.md` | Headteacher role scope, maker-checker, permission boundaries |
| `docs/modules/HEADTEACHER_DASHBOARD_METRICS.md` | Every dashboard KPI definition, data source, and calculation |
| `docs/modules/HEADTEACHER_APPROVAL_WORKFLOWS.md` | Approval types, status machine, maker-checker, delegation rules |
| `docs/modules/HEADTEACHER_GAP_MATRIX.md` | Feature-by-feature gap analysis with status and next actions |
| `docs/modules/HEADTEACHER_TEST_RESULTS.md` | Test cases, preconditions, known test gaps |

### Architecture & Operations Documentation (21)
| File | Purpose |
|------|---------|
| `docs/architecture/SYSTEM_ARCHITECTURE.md` | Layered architecture, auth flow |
| `docs/architecture/MODULE_DEPENDENCIES.md` | Module dependency graph |
| `docs/database/DATABASE_DESIGN.md` | All table definitions |
| `docs/database/ENTITY_RELATIONSHIP_MATRIX.md` | FK and polymorphic relationships |
| `docs/database/MIGRATION_DEPENDENCY_ORDER.md` | Migration execution order |
| `docs/database/DATA_INTEGRITY_RULES.md` | Constraints and business invariants |
| `docs/operations/JOBS_AND_QUEUES.md` | Job queue configuration |
| `docs/operations/SCHEDULER_CATALOGUE.md` | Scheduled commands |
| `docs/operations/CRON_AND_WORKER_SETUP.md` | Cron and worker setup |
| `docs/operations/REDIS_CONFIGURATION.md` | Redis configuration |
| `docs/operations/HEALTH_AND_LOGGING.md` | Health checks and logging |
| `docs/api/API_CONTRACT_MATRIX.md` | All API endpoints |
| `docs/api/OPENAPI_IMPLEMENTATION_GUIDE.md` | OpenAPI generation guide |
| `docs/security/PERMISSION_MATRIX.md` | Role and permission matrix |
| `docs/security/SECURITY_REVIEW_CHECKLIST.md` | Security checklist |
| `docs/events/EVENT_LISTENER_MATRIX.md` | Event and listener mappings |
| `docs/events/OBSERVER_INVENTORY.md` | Observer registrations |
| `docs/testing/TEST_CATALOGUE.md` | All test descriptions |
| `docs/handoff/COPILOT_VERIFICATION_MATRIX.md` | Module to test mapping |
| `copilot-handoff/INSTALL_AND_BOOTSTRAP.md` | Installation guide |
| `copilot-handoff/FILE_PLACEMENT_MAP.md` | File to destination mapping |
| `copilot-handoff/DEPENDENCY_INSTALLATION.md` | Composer package installation |
| `copilot-handoff/MIGRATION_EXECUTION_PLAN.md` | Migration order and commands |
| `copilot-handoff/VERIFICATION_CHECKLIST.md` | Full verification checklist |
| `copilot-handoff/COPILOT_MASTER_PROMPT.md` | Copilot instructions |
