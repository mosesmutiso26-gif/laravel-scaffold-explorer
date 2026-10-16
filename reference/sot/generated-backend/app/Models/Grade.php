<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = [
        'assessment_id', 'student_id', 'score', 'remark', 'status',
        'entered_by', 'moderated_by', 'moderated_at',
    ];

    protected function casts(): array
    {
        return [
            'score' => 'decimal:2',
            'status' => \App\Enums\GradeStatus::class,
            'moderated_at' => 'datetime',
        ];
    }

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
