<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Services\HeadteacherDashboardService;
use App\Models\ExecutiveTask;
use App\Models\ApprovalRequest;
use App\Models\DailyBriefingItem;
use App\Models\AcademicIntervention;
use App\Models\LessonObservation;
use Illuminate\Http\Request;

class HeadteacherController extends BaseApiController
{
    public function __construct(
        private readonly HeadteacherDashboardService $dashboardService,
    ) {}

    public function dashboard(Request $request)
    {
        $date = $request->input('date');
        return $this->success($this->dashboardService->executiveSummary($date));
    }

    public function dailyBriefing(Request $request)
    {
        $date = $request->input('date');
        return $this->success($this->dashboardService->dailyBriefing($date));
    }

    public function actionCentre(Request $request)
    {
        return $this->success($this->dashboardService->actionCentre($request->user()->id));
    }

    public function academicPerformance(Request $request)
    {
        $validated = $request->validate([
            'academic_year_id' => 'required|exists:academic_years,id',
            'term_id' => 'nullable|exists:terms,id',
        ]);
        return $this->success($this->dashboardService->academicPerformance(
            $validated['academic_year_id'],
            $validated['term_id'] ?? null,
        ));
    }

    public function financeOverview()
    {
        return $this->success($this->dashboardService->financeOverview());
    }

    public function staffOverview()
    {
        return $this->success($this->dashboardService->staffOverview());
    }

    public function approvalCentre()
    {
        return $this->success($this->dashboardService->approvalCentre(auth()->id()));
    }

    public function reviewApproval(Request $request, int $approvalId)
    {
        $validated = $request->validate([
            'decision' => 'required|string|in:approve,reject,return,more_info',
            'notes' => 'nullable|string',
        ]);
        $approval = $this->dashboardService->reviewApproval(
            $approvalId,
            $request->user()->id,
            $validated['decision'],
            $validated['notes'] ?? null,
        );
        return $this->success($approval, 'Approval reviewed');
    }

    public function tasksIndex(Request $request)
    {
        $query = ExecutiveTask::query()->with(['assignedByUser', 'assignedToUser', 'delegatedToUser']);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('priority')) $query->where('priority', $request->priority);
        if ($request->filled('assigned_to')) $query->where('assigned_to', $request->assigned_to);
        $query->orderBy('due_date', 'asc');
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function taskStore(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
            'delegated_to' => 'nullable|exists:users,id',
            'source_type' => 'nullable|string|max:255',
            'source_id' => 'nullable|integer',
            'priority' => 'nullable|string|in:low,medium,high,urgent',
            'due_date' => 'nullable|date',
        ]);
        $validated['assigned_by'] = $request->user()->id;
        $task = $this->dashboardService->createTask($validated);
        return $this->success($task, 'Task created', 201);
    }

    public function taskUpdate(Request $request, ExecutiveTask $task)
    {
        $validated = $request->validate([
            'status' => 'nullable|string|in:pending,in_progress,completed,overdue,delegated,cancelled',
            'priority' => 'nullable|string|in:low,medium,high,urgent',
            'assigned_to' => 'nullable|exists:users,id',
            'delegated_to' => 'nullable|exists:users,id',
            'due_date' => 'nullable|date',
            'completion_notes' => 'nullable|string',
        ]);
        if (($validated['status'] ?? null) === 'completed') {
            $validated['completed_at'] = now();
        }
        $task->update($validated);
        return $this->success($task, 'Task updated');
    }

    public function briefingItemReview(Request $request, int $itemId)
    {
        $validated = $request->validate([
            'assign_to' => 'nullable|exists:users,id',
        ]);
        $item = $this->dashboardService->markBriefingItemReviewed($itemId, $request->user()->id, $validated['assign_to'] ?? null);
        return $this->success($item, 'Briefing item reviewed');
    }

    public function interventionsIndex(Request $request)
    {
        $query = AcademicIntervention::query()->with(['student', 'schoolClass', 'subject', 'responsibleStaff']);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('student_id')) $query->where('student_id', $request->student_id);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function interventionStore(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'class_id' => 'nullable|exists:classes,id',
            'subject_id' => 'nullable|exists:subjects,id',
            'academic_year_id' => 'required|exists:academic_years,id',
            'term_id' => 'nullable|exists:terms,id',
            'concern_description' => 'required|string',
            'supporting_evidence' => 'nullable|string',
            'responsible_staff_id' => 'nullable|exists:staff,id',
            'goals' => 'nullable|array',
            'actions' => 'nullable|array',
            'review_date' => 'nullable|date',
            'success_criteria' => 'nullable|string',
        ]);
        $validated['status'] = 'proposed';
        $intervention = AcademicIntervention::create($validated);
        return $this->success($intervention, 'Intervention created', 201);
    }

    public function interventionUpdate(Request $request, AcademicIntervention $intervention)
    {
        $validated = $request->validate([
            'status' => 'nullable|string|in:proposed,active,under_review,escalated,closed',
            'progress_notes' => 'nullable|array',
            'outcome_summary' => 'nullable|string',
            'review_date' => 'nullable|date',
        ]);
        if (($validated['status'] ?? null) === 'closed') {
            $validated['closed_at'] = now();
        }
        $intervention->update($validated);
        return $this->success($intervention, 'Intervention updated');
    }

    public function observationsIndex(Request $request)
    {
        $query = LessonObservation::query()->with(['teacher', 'observer', 'schoolClass', 'subject']);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('teacher_id')) $query->where('teacher_id', $request->teacher_id);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function observationStore(Request $request)
    {
        $validated = $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'observer_id' => 'required|exists:users,id',
            'class_id' => 'nullable|exists:classes,id',
            'subject_id' => 'nullable|exists:subjects,id',
            'scheduled_at' => 'required|date',
            'lesson_objectives' => 'nullable|string',
            'rubric_scores' => 'nullable|array',
        ]);
        $validated['status'] = 'scheduled';
        $observation = LessonObservation::create($validated);
        return $this->success($observation, 'Lesson observation scheduled', 201);
    }

    public function observationUpdate(Request $request, LessonObservation $observation)
    {
        $validated = $request->validate([
            'status' => 'nullable|string|in:scheduled,completed,reviewed,closed',
            'strengths' => 'nullable|string',
            'improvement_areas' => 'nullable|string',
            'feedback' => 'nullable|string',
            'teacher_response' => 'nullable|string',
            'follow_up_actions' => 'nullable|array',
            'rubric_scores' => 'nullable|array',
        ]);
        $observation->update($validated);
        return $this->success($observation, 'Observation updated');
    }
}
