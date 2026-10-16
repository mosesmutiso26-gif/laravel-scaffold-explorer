<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\LabMaintenanceStatus;

class LabMaintenanceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'lab_id', 'equipment_id', 'fault_description', 'priority', 'status',
        'assigned_technician', 'repair_notes', 'parts_used', 'cost_reference',
        'service_provider', 'downtime_start', 'downtime_end', 'resolved_at',
    ];

    protected function casts(): array
    {
        return [
            'cost_reference' => 'decimal:2',
            'downtime_start' => 'datetime',
            'downtime_end' => 'datetime',
            'resolved_at' => 'datetime',
            'status' => LabMaintenanceStatus::class,
        ];
    }

    public function lab(): BelongsTo
    {
        return $this->belongsTo(ScienceLab::class, 'lab_id');
    }

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(ScienceEquipment::class, 'equipment_id');
    }

    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_technician');
    }
}
