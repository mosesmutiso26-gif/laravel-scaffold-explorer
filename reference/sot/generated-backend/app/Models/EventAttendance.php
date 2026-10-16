<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventAttendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'activity_event_id', 'student_id', 'attendance_status',
        'arrival_time', 'departure_time', 'notes', 'recorded_by',
    ];

    protected function casts(): array
    {
        return [
            'arrival_time' => 'datetime:H:i',
            'departure_time' => 'datetime:H:i',
        ];
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(ActivityEvent::class);
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
