<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\ClinicVisit;
use Illuminate\Http\Request;

class ClinicController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = ClinicVisit::query()->with(['student', 'attendedBy', 'medications']);
        if ($request->filled('student_id')) $query->where('student_id', $request->student_id);
        $visits = $query->paginate($request->per_page ?? 20);
        return $this->success($visits->items());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'visit_date' => ['required', 'date'],
            'complaint' => ['required', 'string'],
            'diagnosis' => ['nullable', 'string'],
            'treatment' => ['nullable', 'string'],
            'is_confidential' => ['boolean'],
        ]);
        $validated['attended_by'] = auth()->user()->staff?->id ?? 1;
        $validated['status'] = 'Open';
        $visit = ClinicVisit::create($validated);
        return $this->success($visit, 'Clinic visit created', 201);
    }

    public function show(ClinicVisit $clinicVisit)
    {
        $clinicVisit->load(['student', 'attendedBy', 'medications']);
        return $this->success($clinicVisit);
    }

    public function update(Request $request, ClinicVisit $clinicVisit)
    {
        $clinicVisit->update($request->only(['diagnosis', 'treatment', 'status', 'is_confidential']));
        return $this->success($clinicVisit, 'Visit updated');
    }

    public function destroy(ClinicVisit $clinicVisit)
    {
        $clinicVisit->delete();
        return $this->success(null, 'Visit deleted', 204);
    }
}
