<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\StudentController;
use App\Http\Controllers\Api\V1\GuardianController;
use App\Http\Controllers\Api\V1\StaffController;
use App\Http\Controllers\Api\V1\InvoiceController;
use App\Http\Controllers\Api\V1\PaymentController;
use App\Http\Controllers\Api\V1\AttendanceController;
use App\Http\Controllers\Api\V1\AssessmentController;
use App\Http\Controllers\Api\V1\TimetableController;
use App\Http\Controllers\Api\V1\EnrolmentController;
use App\Http\Controllers\Api\V1\LibraryController;
use App\Http\Controllers\Api\V1\TransportController;
use App\Http\Controllers\Api\V1\BoardingController;
use App\Http\Controllers\Api\V1\SportsController;
use App\Http\Controllers\Api\V1\ClinicController;
use App\Http\Controllers\Api\V1\SafeguardingController;
use App\Http\Controllers\Api\V1\HrController;
use App\Http\Controllers\Api\V1\ProcurementController;
use App\Http\Controllers\Api\V1\InventoryController;
use App\Http\Controllers\Api\V1\CmsController;
use App\Http\Controllers\Api\V1\NotificationController;
use App\Http\Controllers\Api\V1\AuditController;
use App\Http\Controllers\Api\V1\ReportController;
use App\Http\Controllers\Api\V1\SystemHealthController;
use App\Http\Controllers\Api\V1\CoCurricularController;
use App\Http\Controllers\Api\V1\ScienceLabController;
use App\Http\Controllers\Api\V1\ComputerLabController;
use App\Http\Controllers\Api\V1\HeadteacherController;
use Illuminate\Support\Facades\Route;

// Auth routes (public)
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);

// Authenticated routes
Route::middleware(['auth:sanctum', 'active'])->group(function (): void {

    // Auth
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('auth/me', [AuthController::class, 'me']);

    // Students
    Route::apiResource('students', StudentController::class);
    Route::get('students/{student}/invoices', [StudentController::class, 'invoices']);
    Route::get('students/{student}/attendance', [StudentController::class, 'attendance']);
    Route::get('students/{student}/grades', [StudentController::class, 'grades']);

    // Guardians
    Route::apiResource('guardians', GuardianController::class);

    // Staff
    Route::apiResource('staff', StaffController::class);

    // Enrolments
    Route::apiResource('enrolments', EnrolmentController::class);

    // Attendance
    Route::apiResource('attendance-sessions', AttendanceController::class);
    Route::post('attendance-sessions/{session}/records', [AttendanceController::class, 'storeRecords']);
    Route::patch('attendance-sessions/{session}/complete', [AttendanceController::class, 'complete']);

    // Assessments
    Route::apiResource('assessments', AssessmentController::class);
    Route::post('assessments/{assessment}/grades', [AssessmentController::class, 'storeGrades']);
    Route::patch('assessments/{assessment}/publish', [AssessmentController::class, 'publish']);

    // Timetable
    Route::apiResource('timetable-versions', TimetableController::class);
    Route::post('timetable-versions/{version}/entries', [TimetableController::class, 'storeEntry']);
    Route::post('timetable-versions/{version}/conflict-check', [TimetableController::class, 'conflictCheck']);
    Route::post('timetable-versions/{version}/publish', [TimetableController::class, 'publish']);

    // Finance
    Route::apiResource('invoices', InvoiceController::class);
    Route::apiResource('payments', PaymentController::class);
    Route::post('payments/{payment}/verify', [PaymentController::class, 'verify']);
    Route::post('payments/{payment}/reverse', [PaymentController::class, 'reverse']);

    // Library
    Route::apiResource('library-books', LibraryController::class);
    Route::post('library-loans', [LibraryController::class, 'issueLoan']);
    Route::post('library-loans/{loan}/return', [LibraryController::class, 'returnLoan']);

    // Transport
    Route::apiResource('vehicles', TransportController::class);
    Route::apiResource('transport-routes', TransportController::class::class . '@routes']);

    // Boarding
    Route::apiResource('boarding-houses', BoardingController::class);
    Route::post('boarding-placements', [BoardingController::class, 'placeStudent']);
    Route::post('roll-calls', [BoardingController::class, 'startRollCall']);
    Route::post('roll-calls/{rollCall}/entries', [BoardingController::class, 'markEntry']);
    Route::post('roll-calls/{rollCall}/complete', [BoardingController::class, 'completeRollCall']);
    Route::apiResource('leave-requests', BoardingController::class::class . '@leaveRequests');

    // Sports
    Route::apiResource('sports', SportsController::class);
    Route::apiResource('teams', SportsController::class);
    Route::post('teams/{team}/members', [SportsController::class, 'addMember']);
    Route::apiResource('fixtures', SportsController::class);

    // Clinic
    Route::apiResource('clinic-visits', ClinicController::class);

    // Safeguarding
    Route::apiResource('safeguarding-incidents', SafeguardingController::class);
    Route::post('safeguarding-incidents/{incident}/actions', [SafeguardingController::class, 'addAction']);

    // HR
    Route::apiResource('hr-leave-requests', HrController::class);
    Route::post('hr-leave-requests/{leave}/approve', [HrController::class, 'approveLeave']);
    Route::apiResource('hr-payroll-runs', HrController::class);

    // Procurement
    Route::apiResource('suppliers', ProcurementController::class);
    Route::apiResource('purchase-orders', ProcurementController::class);
    Route::post('purchase-orders/{po}/approve', [ProcurementController::class, 'approvePO']);

    // Inventory
    Route::apiResource('inventory-items', InventoryController::class);
    Route::post('inventory-items/{item}/stock-movements', [InventoryController::class, 'recordMovement']);

    // CMS
    Route::apiResource('cms-pages', CmsController::class);
    Route::apiResource('cms-announcements', CmsController::class);
    Route::apiResource('enquiries', CmsController::class);

    // Notifications
    Route::get('notifications', [NotificationController::class, 'index']);
    Route::patch('notifications/{notification}/read', [NotificationController::class, 'markRead']);
    Route::post('notifications/mark-all-read', [NotificationController::class, 'markAllRead']);

    // Audit
    Route::get('audit-entries', [AuditController::class, 'index']);

    // Reports
    Route::get('reports/attendance', [ReportController::class, 'attendance']);
    Route::get('reports/finance', [ReportController::class, 'finance']);
    Route::get('reports/enrollment', [ReportController::class, 'enrollment']);

    // System
    Route::get('system/health', [SystemHealthController::class, 'health']);

    // Co-Curricular
    Route::get('co-curricular/dashboard', [CoCurricularController::class, 'dashboard']);
    Route::get('clubs', [CoCurricularController::class, 'clubsIndex']);
    Route::post('clubs', [CoCurricularController::class, 'clubStore']);
    Route::get('clubs/{club}', [CoCurricularController::class, 'clubShow']);
    Route::patch('clubs/{club}', [CoCurricularController::class, 'clubUpdate']);
    Route::post('clubs/{clubId}/apply', [CoCurricularController::class, 'applyMembership']);
    Route::post('memberships/{membershipId}/approve', [CoCurricularController::class, 'approveMembership']);
    Route::post('memberships/{membershipId}/reject', [CoCurricularController::class, 'rejectMembership']);
    Route::post('memberships/{membershipId}/withdraw', [CoCurricularController::class, 'withdrawMembership']);
    Route::get('memberships', [CoCurricularController::class, 'membershipsIndex']);
    Route::post('clubs/{clubId}/events', [CoCurricularController::class, 'storeEvent']);
    Route::get('activity-events', [CoCurricularController::class, 'eventsIndex']);
    Route::post('activity-events/{eventId}/attendance', [CoCurricularController::class, 'recordAttendance']);
    Route::post('clubs/{clubId}/competitions', [CoCurricularController::class, 'storeCompetition']);
    Route::get('competitions', [CoCurricularController::class, 'competitionsIndex']);
    Route::post('achievements', [CoCurricularController::class, 'storeAchievement']);
    Route::post('achievements/{achievementId}/verify', [CoCurricularController::class, 'verifyAchievement']);
    Route::get('achievements', [CoCurricularController::class, 'achievementsIndex']);
    Route::post('trips', [CoCurricularController::class, 'storeTrip']);
    Route::get('trips', [CoCurricularController::class, 'tripsIndex']);
    Route::post('trips/{tripId}/advance', [CoCurricularController::class, 'advanceTripStatus']);
    Route::post('trips/{tripId}/consent', [CoCurricularController::class, 'recordConsent']);
    Route::post('activity-events/{eventId}/reserve-resource', [CoCurricularController::class, 'reserveResource']);
    Route::post('resource-reservations/{reservationId}/return', [CoCurricularController::class, 'returnResource']);

    // Science Lab
    Route::get('science-labs/dashboard', [ScienceLabController::class, 'dashboard']);
    Route::get('science-labs', [ScienceLabController::class, 'labsIndex']);
    Route::post('science-labs', [ScienceLabController::class, 'labStore']);
    Route::get('science-labs/{lab}', [ScienceLabController::class, 'labShow']);
    Route::patch('science-labs/{lab}', [ScienceLabController::class, 'labUpdate']);
    Route::get('science-equipment', [ScienceLabController::class, 'equipmentIndex']);
    Route::post('science-equipment', [ScienceLabController::class, 'equipmentStore']);
    Route::get('chemical-batches', [ScienceLabController::class, 'chemicalBatchesIndex']);
    Route::post('chemical-batches', [ScienceLabController::class, 'chemicalBatchStore']);
    Route::get('practical-lessons', [ScienceLabController::class, 'practicalsIndex']);
    Route::post('practical-lessons', [ScienceLabController::class, 'practicalStore']);
    Route::post('practical-lessons/{practicalId}/advance', [ScienceLabController::class, 'advancePracticalStatus']);
    Route::get('lab-bookings', [ScienceLabController::class, 'bookingsIndex']);
    Route::post('lab-bookings', [ScienceLabController::class, 'bookingStore']);
    Route::post('lab-bookings/{bookingId}/confirm', [ScienceLabController::class, 'bookingConfirm']);
    Route::post('lab-bookings/{bookingId}/cancel', [ScienceLabController::class, 'bookingCancel']);
    Route::post('science-stock-movements', [ScienceLabController::class, 'stockMovementStore']);
    Route::post('chemical-batches/issue', [ScienceLabController::class, 'issueChemical']);
    Route::post('practical-lessons/{practicalId}/attendance', [ScienceLabController::class, 'practicalAttendance']);
    Route::get('safety-inspections', [ScienceLabController::class, 'inspectionsIndex']);
    Route::post('safety-inspections', [ScienceLabController::class, 'inspectionStore']);
    Route::get('lab-incidents', [ScienceLabController::class, 'incidentsIndex']);
    Route::post('lab-incidents', [ScienceLabController::class, 'incidentStore']);
    Route::get('lab-maintenance', [ScienceLabController::class, 'maintenanceIndex']);
    Route::post('lab-maintenance', [ScienceLabController::class, 'maintenanceStore']);

    // Computer Lab
    Route::get('computer-labs/dashboard', [ComputerLabController::class, 'dashboard']);
    Route::get('computer-labs', [ComputerLabController::class, 'labsIndex']);
    Route::post('computer-labs', [ComputerLabController::class, 'labStore']);
    Route::get('computer-labs/{lab}', [ComputerLabController::class, 'labShow']);
    Route::patch('computer-labs/{lab}', [ComputerLabController::class, 'labUpdate']);
    Route::get('workstations', [ComputerLabController::class, 'workstationsIndex']);
    Route::post('workstations', [ComputerLabController::class, 'workstationStore']);
    Route::patch('workstations/{workstation}', [ComputerLabController::class, 'workstationUpdate']);
    Route::get('ict-assets', [ComputerLabController::class, 'ictAssetsIndex']);
    Route::post('ict-assets', [ComputerLabController::class, 'ictAssetStore']);
    Route::get('software-products', [ComputerLabController::class, 'softwareProductsIndex']);
    Route::post('software-products', [ComputerLabController::class, 'softwareProductStore']);
    Route::get('software-licences', [ComputerLabController::class, 'softwareLicencesIndex']);
    Route::post('software-licences', [ComputerLabController::class, 'softwareLicenceStore']);
    Route::get('computer-lab-bookings', [ComputerLabController::class, 'bookingsIndex']);
    Route::post('computer-lab-bookings', [ComputerLabController::class, 'bookingStore']);
    Route::post('computer-lab-bookings/{bookingId}/confirm', [ComputerLabController::class, 'bookingConfirm']);
    Route::post('computer-lab-bookings/{bookingId}/cancel', [ComputerLabController::class, 'bookingCancel']);
    Route::get('computer-practicals', [ComputerLabController::class, 'practicalsIndex']);
    Route::post('computer-practicals', [ComputerLabController::class, 'practicalStore']);
    Route::post('computer-lab-bookings/{bookingId}/assignments', [ComputerLabController::class, 'workstationAssignments']);
    Route::get('technical-tickets', [ComputerLabController::class, 'ticketsIndex']);
    Route::post('technical-tickets', [ComputerLabController::class, 'ticketStore']);
    Route::post('technical-tickets/{ticketId}/advance', [ComputerLabController::class, 'ticketAdvance']);
    Route::get('asset-audits', [ComputerLabController::class, 'auditsIndex']);
    Route::post('asset-audits', [ComputerLabController::class, 'auditStore']);

    // Headteacher Portal
    Route::get('headteacher/dashboard', [HeadteacherController::class, 'dashboard']);
    Route::get('headteacher/daily-briefing', [HeadteacherController::class, 'dailyBriefing']);
    Route::get('headteacher/action-centre', [HeadteacherController::class, 'actionCentre']);
    Route::get('headteacher/academic-performance', [HeadteacherController::class, 'academicPerformance']);
    Route::get('headteacher/finance-overview', [HeadteacherController::class, 'financeOverview']);
    Route::get('headteacher/staff-overview', [HeadteacherController::class, 'staffOverview']);
    Route::get('headteacher/approval-centre', [HeadteacherController::class, 'approvalCentre']);
    Route::post('headteacher/approvals/{approvalId}/review', [HeadteacherController::class, 'reviewApproval']);
    Route::get('executive-tasks', [HeadteacherController::class, 'tasksIndex']);
    Route::post('executive-tasks', [HeadteacherController::class, 'taskStore']);
    Route::patch('executive-tasks/{task}', [HeadteacherController::class, 'taskUpdate']);
    Route::post('briefing-items/{itemId}/review', [HeadteacherController::class, 'briefingItemReview']);
    Route::get('academic-interventions', [HeadteacherController::class, 'interventionsIndex']);
    Route::post('academic-interventions', [HeadteacherController::class, 'interventionStore']);
    Route::patch('academic-interventions/{intervention}', [HeadteacherController::class, 'interventionUpdate']);
    Route::get('lesson-observations', [HeadteacherController::class, 'observationsIndex']);
    Route::post('lesson-observations', [HeadteacherController::class, 'observationStore']);
    Route::patch('lesson-observations/{observation}', [HeadteacherController::class, 'observationUpdate']);
});
