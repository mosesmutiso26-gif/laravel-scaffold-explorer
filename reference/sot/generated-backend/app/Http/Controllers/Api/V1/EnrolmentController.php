<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Enrolment;
use App\Enums\EnrolmentStatus;
use Illuminate\Http\Request;

class EnrolmentController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Enrolment::query()->with(['student', 'schoolClass', 'academicYear']);
        if ($request->filled('student_id')) $query->where('student_id', $request->student_id);
        if ($request->filled('class_id')) $query->where('class_id', $request->class_id);
        if ($request->filled('academic_year_id')) $query->where('academic_year_id', $request->academic_year_id);
        $enrolments = $query->paginate($request->per_page ?? 20);
        return $this->success($enrolments->items(), 'Enrolments', 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'class_id' => ['required', 'exists:classes,id'],
            'stream_id' => ['nullable', 'exists:streams,id'],
            'academic_year_id' => ['required', 'exists:academic_years,id'],
            'enrolment_date' => ['required', 'date'],
        ]);
        $existing = Enrolment::where('student_id', $validated['student_id'])
            ->where('academic_year_id', $validated['academic_year_id'])
            ->where('status', EnrolmentStatus::Active)->exists();
        if ($existing) {
            return $this->error('Student already has an active enrolment for this academic year.', 409);
        }
        $validated['status'] = EnrolmentStatus::Active->value;
        $enrolment = Enrolment::create($validated);
        return $this->success($enrolment, 'Enrolment created', 201);
    }

    public function show(Enrolment $enrolment)
    {
        $enrolment->load(['student', 'schoolClass', 'academicYear']);
        return $this->success($enrolment);
    }

    public function update(Request $request, Enrolment $enrolment)
    {
        $enrolment->update($request->only(['stream_id', 'status', 'exit_date']));
        return $this->success($enrolment, 'Enrolment updated');
    }

    public function destroy(Enrolment $enrolment)
    {
        $enrolment->delete();
        return $this->success(null, 'Enrolment deleted', 204);
    }
}
