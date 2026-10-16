<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\BoardingHouse;
use App\Models\RollCall;
use App\Models\LeaveRequest;
use App\Services\BoardingService;
use Illuminate\Http\Request;

class BoardingController extends BaseApiController
{
    public function __construct(private BoardingService $boardingService) {}

    public function index(Request $request)
    {
        $houses = BoardingHouse::query()->with(['matron', 'dormitories.rooms.beds'])->paginate($request->per_page ?? 20);
        return $this->success($houses->items());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'matron_staff_id' => ['nullable', 'exists:staff,id'],
            'capacity' => ['required', 'integer', 'min:1'],
            'gender' => ['nullable', 'in:Boys,Girls,Mixed'],
        ]);
        $house = BoardingHouse::create($validated);
        return $this->success($house, 'Boarding house created', 201);
    }

    public function show(BoardingHouse $boardingHouse)
    {
        $boardingHouse->load(['matron', 'dormitories.rooms.beds.placements.student']);
        return $this->success($boardingHouse);
    }

    public function placeStudent(Request $request)
    {
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'bed_id' => ['required', 'exists:beds,id'],
            'start_date' => ['required', 'date'],
        ]);
        $placement = $this->boardingService->placeStudent(
            $validated['student_id'], $validated['bed_id'],
            auth()->user()->staff?->id ?? 1, $validated['start_date']
        );
        return $this->success($placement, 'Student placed', 201);
    }

    public function startRollCall(Request $request)
    {
        $validated = $request->validate([
            'house_id' => ['required', 'exists:boarding_houses,id'],
            'date' => ['required', 'date'],
        ]);
        $rollCall = $this->boardingService->startRollCall(
            $validated['house_id'], $validated['date'],
            auth()->user()->staff?->id ?? 1
        );
        return $this->success($rollCall, 'Roll call started', 201);
    }

    public function markEntry(Request $request, RollCall $rollCall)
    {
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'status' => ['required', 'in:Present,Absent,On Leave,Sick'],
            'note' => ['nullable', 'string'],
        ]);
        $rollCall->entries()->where('student_id', $validated['student_id'])->update([
            'status' => $validated['status'],
            'note' => $validated['note'] ?? null,
        ]);
        return $this->success(null, 'Entry marked');
    }

    public function completeRollCall(RollCall $rollCall)
    {
        $rollCall->update(['status' => 'Completed']);
        return $this->success($rollCall, 'Roll call completed');
    }

    public function destroy(BoardingHouse $boardingHouse)
    {
        $boardingHouse->delete();
        return $this->success(null, 'Boarding house deleted', 204);
    }
}
