<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\ObservationStatus;

class LessonObservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id', 'observer_id', 'class_id', 'subject_id',
        'scheduled_at', 'lesson_objectives', 'rubric_scores',
        'strengths', 'improvement_areas', 'feedback',
        'teacher_response', 'follow_up_actions', 'status', 'closed_at',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_at' => 'datetime',
            'closed_at' => 'datetime',
            'status' => ObservationStatus::class,
            'rubric_scores' => 'array',
            'follow_up_actions' => 'array',
        ];
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class);
    }

    public function observer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'observer_id');
    }

    public function schoolClass(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }
}
