<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bed extends Model
{
    use HasFactory;

    protected $fillable = ['room_id', 'label', 'status'];

    protected function casts(): array
    {
        return ['status' => \App\Enums\BedStatus::class];
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(BoardingRoom::class, 'room_id');
    }

    public function placements(): HasMany
    {
        return $this->hasMany(BoardingPlacement::class, 'bed_id');
    }

    public function activePlacement(): ?BoardingPlacement
    {
        return $this->placements()->where('status', \App\Enums\BoardingPlacementStatus::Active)->latest()->first();
    }
}
