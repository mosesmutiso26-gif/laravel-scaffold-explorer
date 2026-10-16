<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ComputerPractical extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'learning_objectives', 'instructions', 'subject_id',
        'curriculum_topic', 'class_id', 'academic_year_id', 'term_id',
        'teacher_id', 'computer_lab_id', 'scheduled_date', 'start_time',
        'end_time', 'required_software', 'assessment_rubric',
        'submission_deadline', 'status',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_date' => 'date',
            'submission_deadline' => 'date',
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

    public function computerLab(): BelongsTo
    {
        return $this->belongsTo(ComputerLab::class);
    }
}
