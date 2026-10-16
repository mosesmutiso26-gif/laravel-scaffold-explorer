<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dormitory extends Model
{
    use HasFactory;

    protected $fillable = ['house_id', 'name', 'capacity'];

    public function house(): BelongsTo
    {
        return $this->belongsTo(BoardingHouse::class, 'house_id');
    }

    public function rooms(): HasMany
    {
        return $this->hasMany(BoardingRoom::class, 'dormitory_id');
    }
}
