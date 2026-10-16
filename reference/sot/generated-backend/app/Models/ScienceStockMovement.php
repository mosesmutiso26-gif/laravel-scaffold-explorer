<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\StockMovementCategory;

class ScienceStockMovement extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_type', 'science_equipment_id', 'chemical_batch_id',
        'movement_type', 'quantity', 'balance_after', 'practical_lesson_id',
        'reason', 'recorded_by',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'decimal:3',
            'balance_after' => 'decimal:3',
            'movement_type' => StockMovementCategory::class,
        ];
    }

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(ScienceEquipment::class);
    }

    public function chemicalBatch(): BelongsTo
    {
        return $this->belongsTo(ChemicalBatch::class);
    }

    public function practicalLesson(): BelongsTo
    {
        return $this->belongsTo(PracticalLesson::class);
    }

    public function recorder(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
