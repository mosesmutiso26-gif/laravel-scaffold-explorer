<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\TimetableVersion;
use App\Models\TimetableEntry;
use App\Services\TimetableConflictService;
use App\Enums\TimetableVersionStatus;
use Illuminate\Http\Request;
use App\Exceptions\BusinessRuleException;

class TimetableController extends BaseApiController
{
    public function __construct(private TimetableConflictService $conflictService) {}

    public function index(Request $request)
    {
        $query = TimetableVersion::query()->with(['academicYear', 'term', 'entries']);
        if ($request->filled('academic_year_id')) $query->where('academic_year_id', $request->academic_year_id);
        if ($request->filled('status')) $query->where('status', $request->status);
        $versions = $query->paginate($request->per_page ?? 20);
        return $this->success($versions->items());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'academic_year_id' => ['required', 'exists:academic_years,id'],
            'term_id' => ['nullable', 'exists:terms,id'],
            'version_label' => ['required', 'string'],
        ]);
        $validated['created_by'] = auth()->user()->staff?->id ?? 1;
        $validated['status'] = TimetableVersionStatus::Draft->value;
        $version = TimetableVersion::create($validated);
        return $this->success($version, 'Timetable version created', 201);
    }

    public function show(TimetableVersion $timetableVersion)
    {
        $timetableVersion->load(['entries.schoolClass', 'entries.subject', 'entries.teacher.staff', 'entries.room']);
        return $this->success($timetableVersion);
    }

    public function storeEntry(Request $request, TimetableVersion $timetableVersion)
    {
        if ($timetableVersion->status === TimetableVersionStatus::Published) {
            throw new BusinessRuleException('Cannot add entries to a published version.');
        }
        $validated = $request->validate([
            'day_of_week' => ['required', 'in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday'],
            'period' => ['required', 'string'],
            'start_time' => ['required', 'string'],
            'end_time' => ['required', 'string'],
            'class_id' => ['required', 'exists:classes,id'],
            'subject_id' => ['required', 'exists:subjects,id'],
            'teacher_id' => ['nullable', 'exists:teachers,id'],
            'room_id' => ['nullable', 'exists:rooms,id'],
            'is_break' => ['boolean'],
        ]);
        $validated['version_id'] = $timetableVersion->id;
        $entry = TimetableEntry::create($validated);
        return $this->success($entry, 'Entry added', 201);
    }

    public function conflictCheck(TimetableVersion $timetableVersion)
    {
        $conflicts = $this->conflictService->detectConflicts($timetableVersion);
        return $this->success(['conflicts' => $conflicts, 'count' => count($conflicts)]);
    }

    public function publish(TimetableVersion $timetableVersion)
    {
        $published = $this->conflictService->publishDraft($timetableVersion);
        return $this->success($published, 'Timetable published');
    }

    public function destroy(TimetableVersion $timetableVersion)
    {
        $timetableVersion->delete();
        return $this->success(null, 'Version deleted', 204);
    }
}
