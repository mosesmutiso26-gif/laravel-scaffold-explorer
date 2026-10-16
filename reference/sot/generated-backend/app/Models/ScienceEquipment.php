<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\EquipmentCondition;

class ScienceEquipment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'item_code', 'name', 'category', 'description', 'specification',
        'quantity_available', 'quantity_reserved', 'quantity_damaged',
        'storage_location', 'condition_status', 'lab_id', 'serial_number',
        'individually_tracked', 'reorder_threshold', 'supplier_id', 'acquired_at',
    ];

    protected function casts(): array
    {
        return [
            'quantity_available' => 'integer',
            'quantity_reserved' => 'integer',
            'quantity_damaged' => 'integer',
            'individually_tracked' => 'boolean',
            'reorder_threshold' => 'integer',
            'acquired_at' => 'date',
            'condition_status' => EquipmentCondition::class,
        ];
    }

    public function lab(): BelongsTo
    {
        return $this->belongsTo(ScienceLab::class, 'lab_id');
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function stockMovements(): HasMany
    {
        return $this->hasMany(ScienceStockMovement::class);
    }

    public function requirements(): HasMany
    {
        return $this->hasMany(PracticalRequirement::class);
    }

    public function maintenanceRequests(): HasMany
    {
        return $this->hasMany(LabMaintenanceRequest::class, 'equipment_id');
    }

    public function getAvailableQuantity(): int
    {
        return $this->quantity_available - $this->quantity_reserved;
    }
}
