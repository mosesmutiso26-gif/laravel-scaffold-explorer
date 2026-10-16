<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sport extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'season', 'teacher_id', 'status'];

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'teacher_id');
    }

    public function teams(): HasMany
    {
        return $this->hasMany(Team::class, 'sport_id');
    }

    public function equipment(): HasMany
    {
        return $this->hasMany(SportsEquipment::class, 'sport_id');
    }
}
