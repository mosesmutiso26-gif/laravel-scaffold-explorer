<?php

namespace App\Services;

use App\Models\BoardingPlacement;
use App\Models\Bed;
use App\Models\RollCall;
use App\Models\RollCallEntry;
use App\Models\LeaveRequest;
use App\Enums\BoardingPlacementStatus;
use App\Enums\BedStatus;
use App\Enums\RollCallStatus;
use App\Enums\RollCallEntryStatus;
use App\Enums\LeaveRequestStatus;
use Illuminate\Support\Facades\DB;
use App\Exceptions\BusinessRuleException;

class BoardingService
{
    public function placeStudent(int $studentId, int $bedId, int $placedBy, string $startDate): BoardingPlacement
    {
        $bed = Bed::findOrFail($bedId);
        if ($bed->status === BedStatus::Occupied) {
            throw new BusinessRuleException('Bed is already occupied.');
        }
        $existing = BoardingPlacement::where('student_id', $studentId)
            ->where('status', BoardingPlacementStatus::Active)->exists();
        if ($existing) {
            throw new BusinessRuleException('Student already has an active placement.');
        }
        return DB::transaction(function () use ($studentId, $bedId, $placedBy, $startDate, $bed): BoardingPlacement {
            $placement = BoardingPlacement::create([
                'student_id' => $studentId,
                'bed_id' => $bedId,
                'start_date' => $startDate,
                'status' => BoardingPlacementStatus::Active,
                'placed_by' => $placedBy,
            ]);
            $bed->update(['status' => BedStatus::Occupied]);
            return $placement;
        });
    }

    public function transferBed(int $placementId, int $newBedId): BoardingPlacement
    {
        $placement = BoardingPlacement::findOrFail($placementId);
        $newBed = Bed::findOrFail($newBedId);
        if ($newBed->status === BedStatus::Occupied) {
            throw new BusinessRuleException('Target bed is occupied.');
        }
        return DB::transaction(function () use ($placement, $newBed): BoardingPlacement {
            $oldBed = $placement->bed;
            $oldBed->update(['status' => BedStatus::Vacant]);
            $placement->update(['status' => BoardingPlacementStatus::Transferred]);
            $newPlacement = BoardingPlacement::create([
                'student_id' => $placement->student_id,
                'bed_id' => $newBed->id,
                'start_date' => now(),
                'status' => BoardingPlacementStatus::Active,
                'placed_by' => $placement->placed_by,
            ]);
            $newBed->update(['status' => BedStatus::Occupied]);
            return $newPlacement;
        });
    }

    public function startRollCall(int $houseId, string $date, ?int $conductedBy): RollCall
    {
        return DB::transaction(function () use ($houseId, $date, $conductedBy): RollCall {
            $rollCall = RollCall::create([
                'house_id' => $houseId,
                'date' => $date,
                'conducted_by' => $conductedBy,
                'conducted_at' => now(),
                'status' => RollCallStatus::Open,
            ]);
            $activePlacements = BoardingPlacement::where('status', BoardingPlacementStatus::Active)
                ->whereHas('bed.room.dormitory', fn($q) => $q->where('house_id', $houseId))
                ->get();
            foreach ($activePlacements as $placement) {
                RollCallEntry::create([
                    'roll_call_id' => $rollCall->id,
                    'student_id' => $placement->student_id,
                    'status' => RollCallEntryStatus::Unaccounted,
                ]);
            }
            return $rollCall;
        });
    }

    public function checkOutStudent(int $leaveId): LeaveRequest
    {
        $leave = LeaveRequest::findOrFail($leaveId);
        if ($leave->status !== LeaveRequestStatus::Approved) {
            throw new BusinessRuleException('Leave must be approved before check-out.');
        }
        $leave->update(['status' => LeaveRequestStatus::CheckedOut]);
        return $leave->fresh();
    }

    public function checkInStudent(int $leaveId): LeaveRequest
    {
        $leave = LeaveRequest::findOrFail($leaveId);
        if ($leave->status !== LeaveRequestStatus::CheckedOut) {
            throw new BusinessRuleException('Student must be checked out before check-in.');
        }
        $status = $leave->actual_return_date && $leave->actual_return_date > $leave->expected_return_date
            ? LeaveRequestStatus::Late
            : LeaveRequestStatus::Returned;
        $leave->update([
            'status' => $status,
            'actual_return_date' => now(),
        ]);
        return $leave->fresh();
    }
}
