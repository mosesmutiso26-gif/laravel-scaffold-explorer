<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Enums\IctDeviceStatus;
use App\Enums\WorkstationStatus;

class Workstation extends Model
{
    use HasFactory;

    protected $fillable = [
        'computer_lab_id', 'workstation_number', 'asset_tag', 'device_type',
        'manufacturer', 'model', 'serial_number', 'processor', 'ram_gb',
        'storage_gb', 'operating_system', 'hostname', 'device_status',
        'workstation_status', 'warranty_info', 'warranty_expires_at', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'ram_gb' => 'integer',
            'storage_gb' => 'integer',
            'warranty_expires_at' => 'date',
            'device_status' => IctDeviceStatus::class,
            'workstation_status' => WorkstationStatus::class,
        ];
    }

    public function computerLab(): BelongsTo
    {
        return $this->belongsTo(ComputerLab::class);
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(WorkstationAssignment::class);
    }

    public function isBookable(): bool
    {
        return $this->workstation_status === WorkstationStatus::Available
            && $this->device_status === IctDeviceStatus::Operational;
    }
}
