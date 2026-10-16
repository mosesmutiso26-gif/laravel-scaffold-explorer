<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BoardingHouse extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'matron_staff_id', 'capacity', 'gender'];

    public function matron(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'matron_staff_id');
    }

    public function dormitories(): HasMany
    {
        return $this->hasMany(Dormitory::class, 'house_id');
    }

    public function rollCalls(): HasMany
    {
        return $this->hasMany(RollCall::class, 'house_id');
    }
}
