<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\LabBookingStatus;

class LabBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'lab_id', 'practical_lesson_id', 'booked_by', 'booking_date',
        'start_time', 'end_time', 'status', 'purpose', 'cancellation_reason',
    ];

    protected function casts(): array
    {
        return [
            'booking_date' => 'date',
            'status' => LabBookingStatus::class,
        ];
    }

    public function lab(): BelongsTo
    {
        return $this->belongsTo(ScienceLab::class, 'lab_id');
    }

    public function practicalLesson(): BelongsTo
    {
        return $this->belongsTo(PracticalLesson::class);
    }

    public function bookedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'booked_by');
    }

    public function hasConflict(): bool
    {
        return static::where('lab_id', $this->lab_id)
            ->where('booking_date', $this->booking_date)
            ->where('id', '!=', $this->id ?? 0)
            ->where('status', 'confirmed')
            ->where(function ($q): void {
                $q->whereBetween('start_time', [$this->start_time, $this->end_time])
                  ->orWhereBetween('end_time', [$this->start_time, $this->end_time])
                  ->orWhere(function ($q2): void {
                      $q2->where('start_time', '<=', $this->start_time)
                         ->where('end_time', '>=', $this->end_time);
                  });
            })
            ->exists();
    }
}
