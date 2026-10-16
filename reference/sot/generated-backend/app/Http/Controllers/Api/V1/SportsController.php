<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Sport;
use App\Models\Team;
use App\Models\Fixture;
use App\Models\SquadMember;
use Illuminate\Http\Request;

class SportsController extends BaseApiController
{
    public function index(Request $request)
    {
        $sports = Sport::query()->with(['teams'])->paginate($request->per_page ?? 20);
        return $this->success($sports->items());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'season' => ['nullable', 'string'],
            'teacher_id' => ['nullable', 'exists:staff,id'],
        ]);
        $validated['status'] = 'Active';
        $sport = Sport::create($validated);
        return $this->success($sport, 'Sport created', 201);
    }

    public function show(Sport $sport)
    {
        $sport->load(['teams.squadMembers.student', 'teams.fixtures', 'equipment']);
        return $this->success($sport);
    }

    public function addMember(Request $request, Team $team)
    {
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'position' => ['nullable', 'string'],
            'jersey_number' => ['nullable', 'integer'],
        ]);
        $member = SquadMember::firstOrCreate(
            ['team_id' => $team->id, 'student_id' => $validated['student_id']],
            $validated
        );
        return $this->success($member, 'Member added', 201);
    }

    public function destroy(Sport $sport)
    {
        $sport->delete();
        return $this->success(null, 'Sport deleted', 204);
    }
}
