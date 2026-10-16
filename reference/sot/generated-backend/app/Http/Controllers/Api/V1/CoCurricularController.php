<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Services\CoCurricularService;
use App\Models\Club;
use App\Models\ClubMembership;
use App\Models\ActivityEvent;
use App\Models\Competition;
use App\Models\StudentAchievement;
use App\Models\EducationalTrip;
use App\Models\GuardianConsent;
use App\Models\ResourceReservation;
use App\Models\ActivityReport;
use Illuminate\Http\Request;

class CoCurricularController extends BaseApiController
{
    public function __construct(
        private readonly CoCurricularService $coCurricularService,
    ) {}

    public function dashboard(Request $request)
    {
        $academicYearId = (int) $request->input('academic_year_id', 1);
        return $this->success($this->coCurricularService->dashboardStats($academicYearId));
    }

    public function clubsIndex(Request $request)
    {
        $query = Club::query()->with(['category', 'teacherPatron', 'academicYear']);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('category_id')) $query->where('activity_category_id', $request->category_id);
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('code', 'like', "%{$request->search}%");
            });
        }
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function clubStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:clubs,code',
            'activity_category_id' => 'required|exists:activity_categories,id',
            'description' => 'nullable|string',
            'educational_objectives' => 'nullable|string',
            'eligibility_rules' => 'nullable|string',
            'membership_capacity' => 'nullable|integer|min:1',
            'teacher_patron_id' => 'nullable|exists:staff,id',
            'meeting_venue' => 'nullable|string|max:255',
            'meeting_schedule' => 'nullable|string|max:255',
            'academic_year_id' => 'required|exists:academic_years,id',
            'term_id' => 'nullable|exists:terms,id',
            'status' => 'nullable|string|in:draft,active,suspended,archived',
        ]);
        $club = Club::create($validated);
        return $this->success($club, 'Club created', 201);
    }

    public function clubShow(Club $club)
    {
        $club->load(['category', 'teacherPatron', 'memberships.student', 'leaderships.student', 'events']);
        return $this->success($club);
    }

    public function clubUpdate(Request $request, Club $club)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'eligibility_rules' => 'nullable|string',
            'membership_capacity' => 'nullable|integer|min:1',
            'teacher_patron_id' => 'nullable|exists:staff,id',
            'meeting_venue' => 'nullable|string|max:255',
            'meeting_schedule' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:draft,active,suspended,archived',
        ]);
        $club->update($validated);
        return $this->success($club, 'Club updated');
    }

    public function applyMembership(Request $request, int $clubId)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'application_reason' => 'nullable|string',
        ]);
        $membership = $this->coCurricularService->applyMembership($validated['student_id'], $clubId, $validated['application_reason'] ?? null);
        return $this->success($membership, 'Application submitted', 201);
    }

    public function approveMembership(Request $request, int $membershipId)
    {
        $membership = $this->coCurricularService->approveMembership($membershipId, $request->user()->id);
        return $this->success($membership, 'Membership ' . $membership->status->value);
    }

    public function rejectMembership(Request $request, int $membershipId)
    {
        $validated = $request->validate(['reason' => 'required|string']);
        $membership = $this->coCurricularService->rejectMembership($membershipId, $request->user()->id, $validated['reason']);
        return $this->success($membership, 'Membership rejected');
    }

    public function withdrawMembership(int $membershipId)
    {
        $membership = $this->coCurricularService->withdrawMembership($membershipId);
        return $this->success($membership, 'Membership withdrawn');
    }

    public function membershipsIndex(Request $request)
    {
        $query = ClubMembership::query()->with(['club', 'student']);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('club_id')) $query->where('club_id', $request->club_id);
        if ($request->filled('student_id')) $query->where('student_id', $request->student_id);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function storeEvent(Request $request, int $clubId)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'venue' => 'nullable|string|max:255',
            'room_id' => 'nullable|exists:rooms,id',
            'expected_attendance' => 'nullable|integer|min:1',
            'equipment_requirements' => 'nullable|string',
            'requires_guardian_consent' => 'boolean',
            'requires_transport' => 'boolean',
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'risk_assessment' => 'nullable|string',
            'academic_year_id' => 'required|exists:academic_years,id',
            'term_id' => 'nullable|exists:terms,id',
        ]);
        $validated['club_id'] = $clubId;
        $validated['organizer_id'] = $request->user()->id;
        $validated['status'] = 'draft';
        $event = ActivityEvent::create($validated);
        return $this->success($event, 'Event created', 201);
    }

    public function eventsIndex(Request $request)
    {
        $query = ActivityEvent::query()->with(['club', 'organizer', 'room']);
        if ($request->filled('club_id')) $query->where('club_id', $request->club_id);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('from_date')) $query->where('event_date', '>=', $request->from_date);
        if ($request->filled('to_date')) $query->where('event_date', '<=', $request->to_date);
        $query->orderBy('event_date', 'desc');
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function recordAttendance(Request $request, int $eventId)
    {
        $validated = $request->validate([
            'records' => 'required|array',
            'records.*.student_id' => 'required|exists:students,id',
            'records.*.attendance_status' => 'required|string|in:present,absent,late,excused,left_early',
            'records.*.arrival_time' => 'nullable|date_format:H:i',
            'records.*.departure_time' => 'nullable|date_format:H:i',
            'records.*.notes' => 'nullable|string',
        ]);
        $created = $this->coCurricularService->recordAttendance($eventId, $validated['records'], $request->user()->id);
        return $this->success($created, 'Attendance recorded', 201);
    }

    public function storeCompetition(Request $request, int $clubId)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'organizer' => 'nullable|string|max:255',
            'level' => 'required|string|in:internal,inter_class,inter_house,inter_school,sub_county,county,regional,national,international',
            'category' => 'nullable|string|max:255',
            'venue' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'supervising_staff_id' => 'nullable|exists:staff,id',
            'entry_requirements' => 'nullable|string',
            'registration_deadline' => 'nullable|date',
        ]);
        $validated['status'] = 'draft';
        $competition = Competition::create($validated);
        return $this->success($competition, 'Competition created', 201);
    }

    public function competitionsIndex(Request $request)
    {
        $query = Competition::query()->with(['entries.student']);
        if ($request->filled('level')) $query->where('level', $request->level);
        if ($request->filled('status')) $query->where('status', $request->status);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function storeAchievement(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'club_id' => 'nullable|exists:clubs,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'achievement_date' => 'required|date',
            'competition_name' => 'nullable|string|max:255',
            'level' => 'required|string|in:school,sub_county,county,regional,national,international',
            'position_or_award' => 'nullable|string|max:255',
            'evidence_path' => 'nullable|string',
            'certificate_path' => 'nullable|string',
            'visibility' => 'nullable|string|in:private,staff_only,published',
        ]);
        $validated['visibility'] = $validated['visibility'] ?? 'staff_only';
        $achievement = StudentAchievement::create($validated);
        return $this->success($achievement, 'Achievement recorded', 201);
    }

    public function verifyAchievement(int $achievementId, Request $request)
    {
        $achievement = $this->coCurricularService->verifyAchievement($achievementId, $request->user()->id);
        return $this->success($achievement, 'Achievement verified');
    }

    public function achievementsIndex(Request $request)
    {
        $query = StudentAchievement::query()->with(['student', 'club']);
        if ($request->filled('student_id')) $query->where('student_id', $request->student_id);
        if ($request->filled('verified')) {
            $request->boolean('verified') ? $query->whereNotNull('verified_at') : $query->whereNull('verified_at');
        }
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function storeTrip(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'educational_purpose' => 'nullable|string',
            'destination' => 'required|string|max:255',
            'departure_at' => 'required|date',
            'return_at' => 'required|date|after:departure_at',
            'supervisor_ids' => 'nullable|array',
            'supervisor_ids.*' => 'integer|exists:staff,id',
            'eligible_class_ids' => 'nullable|array',
            'eligible_class_ids.*' => 'integer|exists:classes,id',
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'itinerary' => 'nullable|string',
            'risk_assessment' => 'nullable|string',
            'emergency_plan' => 'nullable|string',
            'budget_estimate' => 'nullable|numeric|min:0',
            'required_documents' => 'nullable|string',
            'academic_year_id' => 'required|exists:academic_years,id',
            'term_id' => 'nullable|exists:terms,id',
        ]);
        $validated['organizer_id'] = $request->user()->id;
        $validated['status'] = 'draft';
        $trip = EducationalTrip::create($validated);
        return $this->success($trip, 'Trip created', 201);
    }

    public function tripsIndex(Request $request)
    {
        $query = EducationalTrip::query()->with(['organizer', 'vehicle', 'participants.student']);
        if ($request->filled('status')) $query->where('status', $request->status);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function advanceTripStatus(Request $request, int $tripId)
    {
        $validated = $request->validate(['status' => 'required|string']);
        $trip = $this->coCurricularService->advanceTripStatus($tripId, $validated['status'], $request->user()->id);
        return $this->success($trip, 'Trip status updated');
    }

    public function recordConsent(Request $request, int $tripId)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'guardian_id' => 'required|exists:guardians,id',
            'consent_status' => 'required|string|in:pending,granted,withdrawn,declined,expired',
            'consent_form_path' => 'nullable|string',
        ]);
        $consent = $this->coCurricularService->recordConsent(
            $tripId, $validated['student_id'], $validated['guardian_id'], $validated['consent_status'], $validated['consent_form_path'] ?? null
        );
        return $this->success($consent, 'Consent recorded');
    }

    public function reserveResource(Request $request, int $eventId)
    {
        $validated = $request->validate([
            'resource_name' => 'required|string|max:255',
            'resource_type' => 'nullable|string|max:255',
            'inventory_item_id' => 'nullable|exists:inventory_items,id',
            'quantity' => 'nullable|integer|min:1',
            'responsible_person_id' => 'nullable|exists:users,id',
            'reserved_from' => 'required|date',
            'reserved_to' => 'required|date|after:reserved_from',
        ]);
        $reservation = $this->coCurricularService->reserveResource($eventId, $validated);
        return $this->success($reservation, 'Resource reserved', 201);
    }

    public function returnResource(Request $request, int $reservationId)
    {
        $reservation = $this->coCurricularService->returnResource(
            $reservationId,
            $request->input('condition_after'),
            $request->input('damage_report')
        );
        return $this->success($reservation, 'Resource returned');
    }
}
