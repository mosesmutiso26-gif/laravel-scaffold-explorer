<?php

namespace App\Services;

use App\Models\TimetableEntry;
use App\Models\TimetableVersion;
use App\Enums\TimetableVersionStatus;
use App\Enums\ConflictType;
use App\Enums\ConflictSeverity;
use Illuminate\Support\Facades\DB;
use App\Exceptions\BusinessRuleException;

class TimetableConflictService
{
    public function detectConflicts(TimetableVersion $version): array
    {
        $entries = $version->entries()->with(['teacher', 'room', 'schoolClass'])->get();
        $conflicts = [];
        $grouped = $entries->groupBy(fn($e) => $e->day_of_week . '|' . $e->start_time);
        foreach ($grouped as $key => $group) {
            if ($group->count() < 2) continue;
            $teacherConflicts = $group->filter(fn($e) => $e->teacher_id)->groupBy('teacher_id')
                ->filter(fn($g) => $g->count() > 1);
            foreach ($teacherConflicts as $teacherId => $items) {
                $conflicts[] = [
                    'type' => ConflictType::TeacherConflict->value,
                    'severity' => ConflictSeverity::Hard->value,
                    'day' => $items->first()->day_of_week,
                    'period' => $items->first()->period,
                    'teacher_id' => $teacherId,
                    'entry_ids' => $items->pluck('id')->toArray(),
                ];
            }
            $roomConflicts = $group->filter(fn($e) => $e->room_id)->groupBy('room_id')
                ->filter(fn($g) => $g->count() > 1);
            foreach ($roomConflicts as $roomId => $items) {
                $conflicts[] = [
                    'type' => ConflictType::RoomConflict->value,
                    'severity' => ConflictSeverity::Hard->value,
                    'day' => $items->first()->day_of_week,
                    'period' => $items->first()->period,
                    'room_id' => $roomId,
                    'entry_ids' => $items->pluck('id')->toArray(),
                ];
            }
            $classConflicts = $group->filter(fn($e) => !$e->is_break)->groupBy('class_id')
                ->filter(fn($g) => $g->count() > 1);
            foreach ($classConflicts as $classId => $items) {
                $conflicts[] = [
                    'type' => ConflictType::ClassConflict->value,
                    'severity' => ConflictSeverity::Hard->value,
                    'day' => $items->first()->day_of_week,
                    'period' => $items->first()->period,
                    'class_id' => $classId,
                    'entry_ids' => $items->pluck('id')->toArray(),
                ];
            }
        }
        return $conflicts;
    }

    public function publishDraft(TimetableVersion $version): TimetableVersion
    {
        if ($version->status !== TimetableVersionStatus::Draft) {
            throw new BusinessRuleException('Only draft versions can be published.');
        }
        $conflicts = $this->detectConflicts($version);
        $hardConflicts = array_filter($conflicts, fn($c) => $c['severity'] === ConflictSeverity::Hard->value);
        if (count($hardConflicts) > 0) {
            throw new BusinessRuleException('Cannot publish: ' . count($hardConflicts) . ' hard conflict(s) detected.');
        }
        return DB::transaction(function () use ($version): TimetableVersion {
            TimetableVersion::where('academic_year_id', $version->academic_year_id)
                ->where('status', TimetableVersionStatus::Published)
                ->update(['status' => TimetableVersionStatus::Archived]);
            $version->update([
                'status' => TimetableVersionStatus::Published,
                'published_at' => now(),
            ]);
            return $version->fresh();
        });
    }
}
