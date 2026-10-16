<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeaveRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'type', 'start_date', 'expected_return_date',
        'actual_return_date', 'destination', 'reason', 'status', 'approved_by',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'expected_return_date' => 'date',
            'actual_return_date' => 'date',
            'status' => \App\Enums\LeaveRequestStatus::class,
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'approved_by');
    }
}
