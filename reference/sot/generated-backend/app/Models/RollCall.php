<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RollCall extends Model
{
    use HasFactory;

    protected $fillable = ['house_id', 'date', 'conducted_at', 'conducted_by', 'status'];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'conducted_at' => 'datetime:H:i',
            'status' => \App\Enums\RollCallStatus::class,
        ];
    }

    public function house(): BelongsTo
    {
        return $this->belongsTo(BoardingHouse::class, 'house_id');
    }

    public function conductedBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'conducted_by');
    }

    public function entries(): HasMany
    {
        return $this->hasMany(RollCallEntry::class, 'roll_call_id');
    }
}
