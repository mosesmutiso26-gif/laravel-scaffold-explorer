<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\SafeguardingIncident;
use App\Models\SafeguardingAction;
use Illuminate\Http\Request;

class SafeguardingController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = SafeguardingIncident::query()->with(['student', 'reportedBy', 'actions']);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('severity')) $query->where('severity', $request->severity);
        $incidents = $query->paginate($request->per_page ?? 20);
        return $this->success($incidents->items());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'type' => ['required', 'in:Bullying,Welfare,Behavioural,Safety,Medical'],
            'severity' => ['required', 'in:Low,Medium,High,Critical'],
            'description' => ['required', 'string'],
            'is_confidential' => ['boolean'],
        ]);
        $validated['reported_by'] = auth()->user()->staff?->id ?? 1;
        $validated['status'] = 'Reported';
        $validated['is_confidential'] = $validated['is_confidential'] ?? true;
        $incident = SafeguardingIncident::create($validated);
        return $this->success($incident, 'Incident reported', 201);
    }

    public function show(SafeguardingIncident $safeguardingIncident)
    {
        $safeguardingIncident->load(['student', 'reportedBy', 'assignedTo', 'actions.takenBy']);
        return $this->success($safeguardingIncident);
    }

    public function addAction(Request $request, SafeguardingIncident $incident)
    {
        $validated = $request->validate([
            'action' => ['required', 'string'],
            'outcome' => ['nullable', 'string'],
        ]);
        $validated['incident_id'] = $incident->id;
        $validated['taken_by'] = auth()->user()->staff?->id ?? 1;
        $action = SafeguardingAction::create($validated);
        return $this->success($action, 'Action recorded', 201);
    }

    public function update(Request $request, SafeguardingIncident $safeguardingIncident)
    {
        $safeguardingIncident->update($request->only(['status', 'assigned_to', 'is_confidential']));
        return $this->success($safeguardingIncident, 'Incident updated');
    }

    public function destroy(SafeguardingIncident $safeguardingIncident)
    {
        $safeguardingIncident->delete();
        return $this->success(null, 'Incident deleted', 204);
    }
}
