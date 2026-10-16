<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SportsEquipment extends Model
{
    use HasFactory;

    protected $table = 'sports_equipment';

    protected $fillable = ['sport_id', 'name', 'total_quantity', 'available_quantity', 'condition'];

    public function sport(): BelongsTo
    {
        return $this->belongsTo(Sport::class, 'sport_id');
    }

    public function issues(): HasMany
    {
        return $this->hasMany(EquipmentIssue::class, 'equipment_id');
    }
}
