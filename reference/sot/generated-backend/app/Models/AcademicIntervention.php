<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\InterventionStatus;

class AcademicIntervention extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'class_id', 'subject_id', 'academic_year_id', 'term_id',
        'concern_description', 'supporting_evidence', 'responsible_staff_id',
        'goals', 'actions', 'review_date', 'success_criteria',
        'progress_notes', 'status', 'outcome_summary', 'closed_at',
    ];

    protected function casts(): array
    {
        return [
            'review_date' => 'date',
            'closed_at' => 'datetime',
            'status' => InterventionStatus::class,
            'goals' => 'array',
            'actions' => 'array',
            'progress_notes' => 'array',
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function schoolClass(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }

    public function responsibleStaff(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'responsible_staff_id');
    }
}
