<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\LabRoomStatus;

class ComputerLab extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'code', 'building', 'location', 'capacity', 'technician_id',
        'assigned_teacher_ids', 'status', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'capacity' => 'integer',
            'assigned_teacher_ids' => 'array',
            'status' => LabRoomStatus::class,
        ];
    }

    public function technician(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'technician_id');
    }

    public function workstations(): HasMany
    {
        return $this->hasMany(Workstation::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(ComputerLabBooking::class);
    }

    public function getOperationalWorkstationCount(): int
    {
        return $this->workstations()->where('workstation_status', 'available')->count();
    }
}
