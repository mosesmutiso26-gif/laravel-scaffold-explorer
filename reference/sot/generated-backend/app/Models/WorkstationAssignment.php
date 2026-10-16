<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkstationAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'computer_lab_booking_id', 'workstation_id', 'student_id',
        'condition_before', 'condition_after', 'student_reported_issue',
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(ComputerLabBooking::class);
    }

    public function workstation(): BelongsTo
    {
        return $this->belongsTo(Workstation::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
