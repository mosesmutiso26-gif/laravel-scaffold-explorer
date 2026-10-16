<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\LabRoomStatus;

class ScienceLab extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'code', 'building', 'location', 'lab_type',
        'seating_capacity', 'workstation_capacity', 'technician_id',
        'assigned_teacher_ids', 'opening_time', 'closing_time',
        'status', 'safety_rules', 'required_ppe', 'emergency_instructions',
    ];

    protected function casts(): array
    {
        return [
            'seating_capacity' => 'integer',
            'workstation_capacity' => 'integer',
            'assigned_teacher_ids' => 'array',
            'status' => LabRoomStatus::class,
        ];
    }

    public function technician(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'technician_id');
    }

    public function equipment(): HasMany
    {
        return $this->hasMany(ScienceEquipment::class, 'lab_id');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(LabBooking::class);
    }

    public function practicals(): HasMany
    {
        return $this->hasMany(PracticalLesson::class, 'lab_id');
    }

    public function inspections(): HasMany
    {
        return $this->hasMany(SafetyInspection::class);
    }

    public function incidents(): HasMany
    {
        return $this->hasMany(LabIncident::class);
    }

    public function maintenanceRequests(): HasMany
    {
        return $this->hasMany(LabMaintenanceRequest::class);
    }
}
