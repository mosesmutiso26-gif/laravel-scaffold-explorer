<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\AttendanceSession;
use App\Models\AttendanceRecord;
use App\Enums\AttendanceStatus;
use App\Enums\RollCallStatus;
use Illuminate\Http\Request;

class AttendanceController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = AttendanceSession::query()->with(['schoolClass', 'records.student', 'recordedBy']);
        if ($request->filled('class_id')) $query->where('class_id', $request->class_id);
        if ($request->filled('date')) $query->where('date', $request->date);
        $sessions = $query->paginate($request->per_page ?? 20);
        return $this->success($sessions->items());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'class_id' => ['required', 'exists:classes,id'],
            'date' => ['required', 'date'],
            'period' => ['nullable', 'string'],
        ]);
        $validated['recorded_by'] = auth()->user()->staff?->id ?? 1;
        $validated['status'] = 'Open';
        $session = AttendanceSession::create($validated);
        return $this->success($session, 'Attendance session created', 201);
    }

    public function show(AttendanceSession $session)
    {
        $session->load(['records.student', 'schoolClass', 'recordedBy']);
        return $this->success($session);
    }

    public function storeRecords(Request $request, AttendanceSession $session)
    {
        $validated = $request->validate([
            'records' => ['required', 'array'],
            'records.*.student_id' => ['required', 'exists:students,id'],
            'records.*.status' => ['required', 'in:Present,Absent,Late,Excused,Sick'],
            'records.*.arrival_time' => ['nullable', 'string'],
            'records.*.note' => ['nullable', 'string'],
        ]);
        foreach ($validated['records'] as $record) {
            AttendanceRecord::updateOrCreate(
                ['session_id' => $session->id, 'student_id' => $record['student_id']],
                [
                    'status' => $record['status'],
                    'arrival_time' => $record['arrival_time'] ?? null,
                    'note' => $record['note'] ?? null,
                ]
            );
        }
        return $this->success(null, 'Attendance records saved');
    }

    public function complete(AttendanceSession $session)
    {
        $session->update(['status' => 'Completed']);
        return $this->success($session, 'Attendance session completed');
    }

    public function destroy(AttendanceSession $session)
    {
        $session->delete();
        return $this->success(null, 'Session deleted', 204);
    }
}
