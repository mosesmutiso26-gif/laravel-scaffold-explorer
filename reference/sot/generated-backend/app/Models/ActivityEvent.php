<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\ActivityEventStatus;

class ActivityEvent extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'description', 'club_id', 'organizer_id', 'supervising_staff_id',
        'event_date', 'start_time', 'end_time', 'venue', 'room_id',
        'target_class_ids', 'expected_attendance', 'equipment_requirements',
        'status', 'requires_guardian_consent', 'requires_transport', 'vehicle_id',
        'risk_assessment', 'cancellation_reason', 'academic_year_id', 'term_id',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
            'target_class_ids' => 'array',
            'expected_attendance' => 'integer',
            'requires_guardian_consent' => 'boolean',
            'requires_transport' => 'boolean',
            'status' => ActivityEventStatus::class,
        ];
    }

    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }

    public function organizer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function supervisingStaff(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'supervising_staff_id');
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }

    public function attendance(): HasMany
    {
        return $this->hasMany(EventAttendance::class);
    }

    public function budgets(): HasMany
    {
        return $this->hasMany(ActivityBudget::class);
    }

    public function resourceReservations(): HasMany
    {
        return $this->hasMany(ResourceReservation::class);
    }
}
