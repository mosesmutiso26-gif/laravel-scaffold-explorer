<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PracticalAttendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'practical_lesson_id', 'student_id', 'attendance_status',
        'observation_marks', 'technique_marks', 'safety_compliance_marks',
        'results', 'teacher_feedback', 'completion_status', 'recorded_by',
    ];

    public function practicalLesson(): BelongsTo
    {
        return $this->belongsTo(PracticalLesson::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function recorder(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
