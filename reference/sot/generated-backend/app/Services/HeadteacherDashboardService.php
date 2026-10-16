<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Student;
use App\Models\Staff;
use App\Models\AttendanceSession;
use App\Models\AttendanceRecord;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\TimetableEntry;
use App\Models\TimetableVersion;
use App\Models\Enrolment;
use App\Models\Assessment;
use App\Models\Grade;
use App\Models\ExecutiveTask;
use App\Models\ApprovalRequest;
use App\Models\DailyBriefingItem;
use App\Models\AcademicIntervention;
use App\Models\LessonObservation;
use App\Models\SafeguardingIncident;
use App\Models\BoardingPlacement;
use App\Models\RollCall;
use App\Models\Fixture;
use App\Models\Enquiry;
use App\Models\LeaveRequest;
use App\Enums\ApprovalStatus;
use App\Enums\ExecutiveTaskStatus;
use App\Enums\BriefingItemStatus;
use App\Enums\InterventionStatus;
use App\Enums\InvoiceStatus;
use App\Enums\PaymentStatus;
use App\Enums\StudentStatus;
use App\Enums\StaffStatus;
use App\Enums\SafeguardingStatus;
use Illuminate\Support\Facades\DB;

class HeadteacherDashboardService
{
    public function executiveSummary(string $date = null): array
    {
        $date = $date ? \Carbon\Carbon::parse($date) : today();

        $enrolledStudents = Student::where('status', StudentStatus::Active)->count();

        $todaySession = AttendanceSession::where('session_date', $date)->pluck('id');
        $presentToday = AttendanceRecord::whereIn('attendance_session_id', $todaySession)
            ->where('attendance_status', 'present')->count();
        $absentToday = AttendanceRecord::whereIn('attendance_session_id', $todaySession)
            ->where('attendance_status', 'absent')->count();
        $totalAttendanceRecords = AttendanceRecord::whereIn('attendance_session_id', $todaySession)->count();
        $attendancePct = $totalAttendanceRecords > 0
            ? round(($presentToday / $totalAttendanceRecords) * 100, 1)
            : null;

        $activeStaff = Staff::where('status', StaffStatus::Active)->count();

        $lessonsToday = TimetableEntry::whereHas('timetableVersion', fn($q) => $q->where('is_published', true))
            ->where('day_of_week', strtolower($date->format('l')))
            ->count();

        $pendingApprovals = ApprovalRequest::where('status', ApprovalStatus::Pending)->count();
        $overdueTasks = ExecutiveTask::where('due_date', '<', today())
            ->whereNotIn('status', [ExecutiveTaskStatus::Completed, ExecutiveTaskStatus::Cancelled])
            ->count();
        $urgentTasks = ExecutiveTask::whereIn('status', [ExecutiveTaskStatus::Pending, ExecutiveTaskStatus::InProgress])
            ->where('due_date', '<=', today()->addDays(3))
            ->count();

        $outstandingInvoices = Invoice::where('status', '!=', InvoiceStatus::Paid)->sum('balance_due');
        $verifiedPayments = Payment::where('status', PaymentStatus::Verified)->sum('amount');

        $pendingInterventions = AcademicIntervention::whereNotIn('status', [InterventionStatus::Closed])->count();
        $openSafeguarding = SafeguardingIncident::whereNotIn('status', ['closed', 'resolved'])->count();

        $boardingOccupancy = BoardingPlacement::where('status', 'active')->count();

        $upcomingFixtures = Fixture::where('fixture_date', '>=', today())
            ->where('fixture_date', '<=', today()->addDays(7))->count();

        $pendingEnquiries = Enquiry::where('status', 'pending')->count();

        return [
            'enrolled_students' => $enrolledStudents,
            'students_present_today' => $presentToday,
            'students_absent_today' => $absentToday,
            'attendance_percentage' => $attendancePct,
            'active_staff' => $activeStaff,
            'lessons_scheduled_today' => $lessonsToday,
            'pending_approvals' => $pendingApprovals,
            'overdue_tasks' => $overdueTasks,
            'urgent_tasks' => $urgentTasks,
            'outstanding_fee_balance' => $outstandingInvoices,
            'verified_collections' => $verifiedPayments,
            'pending_academic_interventions' => $pendingInterventions,
            'open_safeguarding_cases' => $openSafeguarding,
            'boarding_occupancy' => $boardingOccupancy,
            'upcoming_fixtures' => $upcomingFixtures,
            'pending_enquiries' => $pendingEnquiries,
            'date' => $date->toDateString(),
        ];
    }

    public function dailyBriefing(string $date = null): array
    {
        $date = $date ? \Carbon\Carbon::parse($date) : today();

        $items = DailyBriefingItem::where('briefing_date', $date)
            ->orderBy('severity', 'desc')
            ->orderBy('created_at')
            ->get();

        return [
            'date' => $date->toDateString(),
            'items' => $items,
            'total' => $items->count(),
            'unreviewed' => $items->where('status', BriefingItemStatus::New)->count(),
        ];
    }

    public function actionCentre(int $userId): array
    {
        return [
            'requires_my_approval' => ApprovalRequest::where('status', ApprovalStatus::Pending)->count(),
            'assigned_to_me' => ExecutiveTask::where('assigned_to', $userId)
                ->whereIn('status', [ExecutiveTaskStatus::Pending, ExecutiveTaskStatus::InProgress])->count(),
            'overdue' => ExecutiveTask::where('due_date', '<', today())
                ->whereNotIn('status', [ExecutiveTaskStatus::Completed, ExecutiveTaskStatus::Cancelled])->count(),
            'delegated' => ExecutiveTask::where('delegated_to', '!=', null)
                ->where('status', ExecutiveTaskStatus::Delegated)->count(),
            'recently_completed' => ExecutiveTask::where('status', ExecutiveTaskStatus::Completed)
                ->where('completed_at', '>=', today()->subDays(7))->count(),
        ];
    }

    public function academicPerformance(int $academicYearId, ?int $termId = null): array
    {
        $assessments = Assessment::where('academic_year_id', $academicYearId)
            ->when($termId, fn($q) => $q->where('term_id', $termId))
            ->withCount('grades')
            ->get();

        $totalGrades = Grade::whereHas('assessment', fn($q) => $q->where('academic_year_id', $academicYearId)
            ->when($termId, fn($q2) => $q2->where('term_id', $termId)))
            ->count();

        $missingMarks = Assessment::where('academic_year_id', $academicYearId)
            ->when($termId, fn($q) => $q->where('term_id', $termId))
            ->whereDoesntHave('grades')
            ->count();

        $avgScore = Grade::whereHas('assessment', fn($q) => $q->where('academic_year_id', $academicYearId)
            ->when($termId, fn($q2) => $q2->where('term_id', $termId)))
            ->avg('marks');

        return [
            'total_assessments' => $assessments->count(),
            'total_grades_recorded' => $totalGrades,
            'missing_marks' => $missingMarks,
            'average_score' => $avgScore ? round((float) $avgScore, 2) : null,
            'assessment_completion' => $assessments->count() > 0
                ? round((($assessments->count() - $missingMarks) / $assessments->count()) * 100, 1)
                : null,
        ];
    }

    public function financeOverview(): array
    {
        return [
            'posted_charges' => Invoice::sum('total_amount'),
            'verified_collections' => Payment::where('status', PaymentStatus::Verified)->sum('amount'),
            'outstanding_balances' => Invoice::where('status', '!=', InvoiceStatus::Paid)->sum('balance_due'),
            'pending_payments' => Payment::where('status', PaymentStatus::Pending)->count(),
            'unallocated_payments' => Payment::where('status', PaymentStatus::Verified)
                ->whereDoesntHave('allocations')->count(),
        ];
    }

    public function staffOverview(): array
    {
        return [
            'active_teachers' => Staff::where('status', StaffStatus::Active)->where('category', 'teaching')->count(),
            'active_support_staff' => Staff::where('status', StaffStatus::Active)->where('category', 'support')->count(),
            'pending_leave_requests' => LeaveRequest::where('status', 'pending')->count(),
        ];
    }

    public function approvalCentre(int $userId): array
    {
        $pending = ApprovalRequest::where('status', ApprovalStatus::Pending)
            ->with(['requester'])
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get();

        return [
            'pending_approvals' => $pending,
            'total_pending' => $pending->count(),
        ];
    }

    public function reviewApproval(int $approvalId, int $reviewerId, string $decision, ?string $notes = null): ApprovalRequest
    {
        $approval = ApprovalRequest::findOrFail($approvalId);

        if (!$approval->canBeReviewedBy($reviewerId)) {
            throw new \App\Exceptions\BusinessRuleException('You cannot review this approval request. It may be your own request or already reviewed.');
        }

        $status = match ($decision) {
            'approve' => ApprovalStatus::Approved,
            'reject' => ApprovalStatus::Rejected,
            'return' => ApprovalStatus::ReturnedForCorrection,
            'more_info' => ApprovalStatus::MoreInfoRequested,
            default => throw new \App\Exceptions\BusinessRuleException('Invalid review decision.'),
        };

        $approval->update([
            'status' => $status,
            'reviewer_id' => $reviewerId,
            'review_decision' => $decision,
            'review_notes' => $notes,
            'reviewed_at' => now(),
        ]);

        return $approval->fresh();
    }

    public function createTask(array $data): ExecutiveTask
    {
        return ExecutiveTask::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'assigned_by' => $data['assigned_by'],
            'assigned_to' => $data['assigned_to'] ?? null,
            'delegated_to' => $data['delegated_to'] ?? null,
            'source_type' => $data['source_type'] ?? null,
            'source_id' => $data['source_id'] ?? null,
            'priority' => $data['priority'] ?? 'medium',
            'status' => ExecutiveTaskStatus::Pending,
            'due_date' => $data['due_date'] ?? null,
        ]);
    }

    public function markBriefingItemReviewed(int $itemId, int $reviewedBy, ?int $assignTo = null): DailyBriefingItem
    {
        $item = DailyBriefingItem::findOrFail($itemId);
        $item->update([
            'status' => $assignTo ? BriefingItemStatus::ActionAssigned : BriefingItemStatus::Reviewed,
            'reviewed_by' => $reviewedBy,
            'reviewed_at' => now(),
            'assigned_to' => $assignTo,
        ]);
        return $item->fresh();
    }
}
