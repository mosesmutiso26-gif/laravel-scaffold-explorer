<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\PracticalStatus;

class PracticalLesson extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'learning_objectives', 'experiment_description', 'subject_id',
        'curriculum_topic', 'class_id', 'stream_id', 'academic_year_id',
        'term_id', 'teacher_id', 'lab_id', 'scheduled_date', 'start_time',
        'end_time', 'status', 'safety_precautions', 'risk_assessment',
        'student_grouping', 'expected_observations', 'assessment_rubric',
        'preparation_instructions', 'cancellation_reason',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_date' => 'date',
            'status' => PracticalStatus::class,
        ];
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function schoolClass(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    public function stream(): BelongsTo
    {
        return $this->belongsTo(Stream::class);
    }

    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'teacher_id');
    }

    public function lab(): BelongsTo
    {
        return $this->belongsTo(ScienceLab::class, 'lab_id');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(LabBooking::class);
    }

    public function requirements(): HasMany
    {
        return $this->hasMany(PracticalRequirement::class);
    }

    public function attendance(): HasMany
    {
        return $this->hasMany(PracticalAttendance::class);
    }
}
