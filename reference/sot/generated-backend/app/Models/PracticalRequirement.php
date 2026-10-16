<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PracticalRequirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'practical_lesson_id', 'item_type', 'science_equipment_id',
        'chemical_batch_id', 'item_name', 'quantity_required', 'unit', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'quantity_required' => 'decimal:3',
        ];
    }

    public function practicalLesson(): BelongsTo
    {
        return $this->belongsTo(PracticalLesson::class);
    }

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(ScienceEquipment::class);
    }

    public function chemicalBatch(): BelongsTo
    {
        return $this->belongsTo(ChemicalBatch::class);
    }
}
