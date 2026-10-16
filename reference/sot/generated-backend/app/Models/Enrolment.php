<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enrolment extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'class_id', 'stream_id', 'academic_year_id', 'status', 'enrolment_date', 'exit_date',
    ];

    protected function casts(): array
    {
        return [
            'enrolment_date' => 'date',
            'exit_date' => 'date',
            'status' => \App\Enums\EnrolmentStatus::class,
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

    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class);
    }
}
