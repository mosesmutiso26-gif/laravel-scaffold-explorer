<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BoardingRoom extends Model
{
    use HasFactory;

    protected $table = 'boarding_rooms';

    protected $fillable = ['dormitory_id', 'name', 'capacity'];

    public function dormitory(): BelongsTo
    {
        return $this->belongsTo(Dormitory::class, 'dormitory_id');
    }

    public function beds(): HasMany
    {
        return $this->hasMany(Bed::class, 'room_id');
    }
}
