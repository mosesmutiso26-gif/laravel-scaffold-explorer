<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReportCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'term_id', 'class_id', 'overall_grade', 'overall_score',
        'position', 'teacher_remark', 'head_remark', 'status', 'generated_by',
    ];

    protected function casts(): array
    {
        return [
            'overall_score' => 'decimal:2',
            'status' => \App\Enums\ReportCardStatus::class,
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }

    public function schoolClass(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }
}
