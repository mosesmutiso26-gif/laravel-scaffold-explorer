<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\EquipmentCondition;

class IctAsset extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'asset_tag', 'name', 'device_type', 'manufacturer', 'model',
        'serial_number', 'computer_lab_id', 'condition_status', 'status',
        'acquired_at', 'cost', 'warranty_info', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'acquired_at' => 'date',
            'cost' => 'decimal:2',
            'condition_status' => EquipmentCondition::class,
        ];
    }

    public function computerLab(): BelongsTo
    {
        return $this->belongsTo(ComputerLab::class);
    }
}
