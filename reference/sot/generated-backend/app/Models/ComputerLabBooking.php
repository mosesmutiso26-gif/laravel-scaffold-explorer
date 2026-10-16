<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Enums\LabBookingStatus;

class ComputerLabBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'computer_lab_id', 'booked_by', 'subject', 'class_id', 'booking_date',
        'start_time', 'end_time', 'expected_students', 'required_workstations',
        'software_requirements', 'hardware_requirements',
        'accessibility_requirements', 'status', 'cancellation_reason',
    ];

    protected function casts(): array
    {
        return [
            'booking_date' => 'date',
            'expected_students' => 'integer',
            'required_workstations' => 'integer',
            'status' => LabBookingStatus::class,
        ];
    }

    public function computerLab(): BelongsTo
    {
        return $this->belongsTo(ComputerLab::class);
    }

    public function bookedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'booked_by');
    }

    public function schoolClass(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(WorkstationAssignment::class);
    }

    public function hasConflict(): bool
    {
        return static::where('computer_lab_id', $this->computer_lab_id)
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
