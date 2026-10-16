<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\ChemicalHazardLevel;
use App\Enums\ChemicalDisposalStatus;

class ChemicalBatch extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'formula', 'concentration', 'grade', 'container_size',
        'quantity', 'unit', 'batch_number', 'expiry_date', 'supplier_id',
        'storage_location', 'compatibility_group', 'hazard_classification',
        'required_ppe', 'sds_reference', 'minimum_stock_level',
        'is_restricted', 'disposal_status', 'disposal_record',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'decimal:3',
            'minimum_stock_level' => 'decimal:3',
            'expiry_date' => 'date',
            'is_restricted' => 'boolean',
            'hazard_classification' => ChemicalHazardLevel::class,
            'disposal_status' => ChemicalDisposalStatus::class,
        ];
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function stockMovements(): HasMany
    {
        return $this->hasMany(ScienceStockMovement::class);
    }

    public function isExpired(): bool
    {
        return $this->expiry_date !== null && $this->expiry_date < now()->toDateString();
    }

    public function isApproachingExpiry(int $days = 30): bool
    {
        return $this->expiry_date !== null
            && $this->expiry_date >= now()->toDateString()
            && $this->expiry_date <= now()->addDays($days)->toDateString();
    }
}
